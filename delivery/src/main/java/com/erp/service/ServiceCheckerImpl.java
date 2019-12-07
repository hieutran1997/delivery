package com.erp.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.dao.SysRoleDAO;
import com.erp.model.UserModel;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.JsonToMapConverter;
import com.erp.util.VfData;

@Service(value = "checkerService")
public class ServiceCheckerImpl implements ServiceChecker {

	@Autowired
	private SysRoleDAO sysRoleDao;

	@Autowired
	private VfData vfData;

	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceCheckerImpl.class);

	@Override
	public boolean permissionChecker(String resource, String action) {
		JsonToMapConverter converter = new JsonToMapConverter();
		UserModel currentUser = CommonUtil.getCurrentUser();
		if(currentUser.getTypeOfUser() == 1)
			return true;
		List<RolePermissionDTO> lstScope = sysRoleDao.permissionChecker(vfData, currentUser.getUsername(), resource);
		if (lstScope == null || lstScope.size() == 0) {
			return false;
		} else {
			switch (action) {
			case Constants.PERMISSION.VIEW:
				for (RolePermissionDTO item : lstScope) {
					if (item.getHasView() > 0)
						return true;
				}
				return false;
			case Constants.PERMISSION.ADD:
				for (RolePermissionDTO item : lstScope) {
					if (item.getHasAdd() > 0)
						return true;
				}
				return false;
			case Constants.PERMISSION.EDIT:
				for (RolePermissionDTO item : lstScope) {
					if (item.getHasEdit() > 0)
						return true;
				}
				return false;
			case Constants.PERMISSION.DELETE:
				for (RolePermissionDTO item : lstScope) {
					if (item.getHasDelete() > 0)
						return true;
				}
				return false;
			case Constants.PERMISSION.APPROVE:
				for (RolePermissionDTO item : lstScope) {
					if (item.getHasApprove() > 0)
						return true;
				}
				return false;
			default:
				for (RolePermissionDTO item : lstScope) {
					Map<String, Object> ortherControl = converter.convertToEntityAttribute(item.getOrtherControls());
					if (ortherControl != null) {
						try {
							Long value = Long.parseLong(ortherControl.get(action).toString());
							return value > 0;
						} catch (Exception e) {
							LOGGER.error("Khong cast duoc value của action: " + action, e);
						}
					}
				}
				return false;
			}
		}
	}
}
