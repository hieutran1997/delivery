package com.erp.process.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.MediaType;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.erp.model.OrganizationModel;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.process.bo.MerchandiseRegisterBO;
import com.erp.process.service.MerchandiseRegisterService;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.BaseController;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.FileStorage;
import com.erp.util.PermissionException;

@Controller
@RequestMapping("/process/merchandise-register")
public class MerchandiseRegisterController extends BaseController {
	public MerchandiseRegisterController() {
		LOGGER = LoggerFactory.getLogger(MerchandiseRegisterController.class);
	}
	
	@Autowired
	private ServiceChecker serviceChecker;
	
	@Autowired
	private MerchandiseRegisterService service;
	
	@Autowired
	private UserService userService;
	
	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> create(HttpServletRequest req, MerchandiseRegisterBO entity) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.ADD)) {
			throw new PermissionException();
		}
		MerchandiseRegisterBO bo = new MerchandiseRegisterBO();
		if(entity.getMerchandiseRegisterId() != null || entity.getMerchandiseRegisterId() != 0) {
			bo = service.findById(entity.getMerchandiseRegisterId());
			bo.setDescription(entity.getDescription());
		}
		else {
			bo = entity;
			String userName = CommonUtil.getCurrentUser().getUsername();
			OrganizationModel org = userService.getOrganizationByUser(userName);
			bo.setCreatedBy(userName);
			bo.setCreatedDate(new Date());
			bo.setOrganizationId(org.getId());
			bo.setOrganizationPath(org.getOrganizationPath());
			
		}
		service.saveOrUpdate(bo);
		FileStorage.append(FileStorage.FILE_TYPE.MERCHANDISE_REGIS, bo.getMerchandiseRegisterId(), entity.getFiles());
		return new ResponseEntity<MerchandiseRegisterBO>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		MerchandiseRegisterBO bo = service.findById(id);
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/find-by-merchandise-id/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findByMerchandiseId(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		MerchandiseRegisterBO bo = service.findByMerchandiseId(id);
		bo.setFileAttachment("file", FileStorage.getListFileInfo(
				FileStorage.FILE_TYPE.MERCHANDISE_REGIS, bo.getMerchandiseRegisterId()));
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/get-selected-data-by-orgPath", method = RequestMethod.GET)
	public ResponseEntity<?> getSelectedDataByOrgPath() {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		List<SelectedFormDTO> bo = service.getSelectedDataByOrgPath(org.getOrganizationPath());
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
}
