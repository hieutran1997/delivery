/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.SystemParameterModel;
import com.erp.service.ServiceChecker;
import com.erp.service.SysParameterService;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.PaginationUtil;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/sys-parameter")
public class SysParameterController {
    @Autowired
    private SysParameterService sysParameterService;
    @Autowired
    private ServiceChecker serviceChecker;
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<SystemParameterModel> pageable){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<PaginationUtil<SystemParameterModel>>(sysParameterService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody SystemParameterModel resource){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.ADD)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        resource.setCreatedBy(CommonUtil.getCurrentUser().getUsername());
        resource.setCreatedDate(new Date());
        return new ResponseEntity<SystemParameterModel>(sysParameterService.save(resource), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody SystemParameterModel resource){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.EDIT)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        resource.setUpdatedBy(CommonUtil.getCurrentUser().getUsername());
        resource.setUpdatedDate(new Date());
        return new ResponseEntity<SystemParameterModel>(sysParameterService.save(resource), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
    	ResponseUtil<String> result = new ResponseUtil<String>();
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.DELETE)) {
    		result.setMessage("Bạn không có quyền truy cập");
    		result.setError(true);
    		return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
    	}
    	sysParameterService.delete(id);
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
