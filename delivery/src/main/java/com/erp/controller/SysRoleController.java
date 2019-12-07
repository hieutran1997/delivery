/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.SysRoleModel;
import com.erp.model.dto.UserRoleDTO;
import com.erp.model.form.RolePermissionForm;
import com.erp.service.ServiceChecker;
import com.erp.service.SysRoleService;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.PaginationUtil;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hieut
 */
@RestController
@RequestMapping("/roles")
public class SysRoleController {

    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private ServiceChecker serviceChecker;

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public ResponseEntity<?> getAll(@RequestBody SearchRequestUtil<SysRoleModel> pageable) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<>(sysRoleService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<SysRoleModel> pageable) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<PaginationUtil<SysRoleModel>>(sysRoleService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody SysRoleModel role) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.ADD)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        role.setCreatedBy(CommonUtil.getCurrentUser().getUsername());
        role.setCreatedDate(new Date());
        return new ResponseEntity<SysRoleModel>(sysRoleService.save(role), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody SysRoleModel role) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.EDIT)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        role.setUpdatedBy(CommonUtil.getCurrentUser().getUsername());
        role.setUpdatedDate(new Date());
        return new ResponseEntity<SysRoleModel>(sysRoleService.save(role), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id) {
    	ResponseUtil<String> result = new ResponseUtil<String>();
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.DELETE)) {
    		result.setError(true);
    		result.setMessage("Bạn không có quyền truy cập");
    		return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
    	}
        sysRoleService.delete(id);
       
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/getSelectedData", method = RequestMethod.GET)
    public ResponseEntity<?> getSelectedData() {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<>(sysRoleService.getSeletedData(), HttpStatus.OK);
    }

    @RequestMapping(value = "/adduserrole", method = RequestMethod.POST)
    public ResponseEntity<String> addUserRole(@RequestBody UserRoleDTO userRole) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, "addUserRole")) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        sysRoleService.saveUserRole(userRole);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @RequestMapping(value = "/getUserRole/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserRole(@PathVariable(value = "username") String username) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<>(sysRoleService.getUserRole(username), HttpStatus.OK);
    }

    @RequestMapping(value = "/addPermission", method = RequestMethod.POST)
    public ResponseEntity<String> addPermission(@RequestBody RolePermissionForm rolePer) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, "addPermission")) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        sysRoleService.saveRolePermission(rolePer);
        this.template.convertAndSend("/topic/permission/"+rolePer.getRoleCode(), "Ok");
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @RequestMapping(value = "/getRolePermission/{role}", method = RequestMethod.GET)
    public ResponseEntity<?> getRolePermission(@PathVariable(value = "role") String roleCode) {
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.ROLE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<>(sysRoleService.getRolePermission(roleCode), HttpStatus.OK);
    }

    @RequestMapping(value = "/getPermission", method = RequestMethod.GET)
    public ResponseEntity<?> getPermission() {
        return new ResponseEntity<>(sysRoleService.getListPermission(CommonUtil.getCurrentUser().getUsername()), HttpStatus.OK);
    }
}
