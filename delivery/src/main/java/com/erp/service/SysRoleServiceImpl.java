/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysResourceDAO;
import com.erp.dao.SysRoleDAO;
import com.erp.model.SysRoleModel;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.model.dto.UserRoleDTO;
import com.erp.model.form.RolePermissionForm;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hieut
 */
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {
	
	@Autowired
	private SysRoleDAO sysRoleDao;
	@Autowired
	private SysResourceDAO sysResourceDao;

	@Autowired
	private VfData vfData;

	@Override
	public SysRoleModel save(SysRoleModel user) {
		return sysRoleDao.save(user);
	}

	@Override
	public PaginationUtil<SysRoleModel> getDataSearch(SearchRequestUtil<SysRoleModel> pageable) {
		return sysRoleDao.getDataPaging(pageable, vfData);
	}

	@Override
	public List<SysRoleModel> findAll() {
		List<SysRoleModel> list = new ArrayList<>();
		sysRoleDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(Long id) {
		SysRoleModel user = sysRoleDao.findById(id).orElse(null);
		if (user != null)
			sysRoleDao.delete(user);
	}

	@Override
	public List<SelectedFormDTO> getSeletedData() {
		return sysRoleDao.getSelectedData(vfData);
	}

	@Override
	public void saveUserRole(UserRoleDTO userRole) {
		sysRoleDao.saveUserRole(vfData, userRole);
	}

	@Override
	public UserRoleDTO getUserRole(String username) {
		UserRoleDTO result = new UserRoleDTO();
		List<SelectedFormDTO> source = sysRoleDao.getSelectedData(vfData);
		List<SelectedFormDTO> target = sysRoleDao.getUserRole(vfData, username);
		List<SelectedFormDTO> sourceDelete = new ArrayList<>();
		if (source.size() > 0) {
			if (target.size() > 0) {
				for (SelectedFormDTO item : source) {
					SelectedFormDTO exist = target.stream().filter(x -> x.getValue().equals(item.getValue()))
							.findFirst().orElse(null);
					if (exist != null) {
						result.pushTarget(item);
						sourceDelete.add(item);
					}
				}
				for (SelectedFormDTO item : sourceDelete) {
					source.remove(item);
				}
				result.setSource(source);
			} else {
				result.setSource(source);
			}
		}
		return result;
	}

	@Override
	public void saveRolePermission(RolePermissionForm rolePer) {
		sysRoleDao.saveRolePermission(vfData, rolePer);
	}

	@Override
	public List<RolePermissionDTO> getRolePermission(String roleCode) {
		List<RolePermissionDTO> source = sysResourceDao.getSelectedPermission(vfData, roleCode);
		return source;
	}

	@Override
	public List<String> getListMenus(String userName) {
		List<String> menu = sysRoleDao.getListMenus(vfData, userName);
		return menu;
	}

	@Override
	public List<RolePermissionDTO> getListPermission(String userName) {
		List<RolePermissionDTO> lstScope = sysRoleDao.getListPermission(vfData, userName);
		return lstScope;
	}
}
