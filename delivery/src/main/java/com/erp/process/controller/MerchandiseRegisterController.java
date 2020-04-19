package com.erp.process.controller;

import java.util.Date;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.erp.model.OrganizationModel;
import com.erp.process.bo.MerchandiseRegisterBO;
import com.erp.process.service.MerchandiseRegisterService;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.BaseController;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.PermissionException;

@RestController
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
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody MerchandiseRegisterBO entity) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.ADD)) {
			throw new PermissionException();
		}
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		entity.setCreatedBy(userName);
		entity.setCreatedDate(new Date());
		entity.setOrganizationId(org.getId());
		entity.setOrganizationPath(org.getOrganizationPath());
		service.saveOrUpdate(entity);
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
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
}
