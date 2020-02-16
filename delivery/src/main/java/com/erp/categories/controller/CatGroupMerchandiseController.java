package com.erp.categories.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;

import com.erp.categories.bo.CatGroupMerchandiseBO;
import com.erp.categories.dto.CatGroupMerchandiseDTO;
import com.erp.categories.service.CatGroupMerchandiseService;
import com.erp.service.ServiceChecker;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.DataTableResults;
import com.erp.util.PermissionException;
import com.erp.util.ResponseUtil;

@RestController
@RequestMapping("/cat/group-merchandise")
public class CatGroupMerchandiseController {
	@Autowired
    private ServiceChecker serviceChecker;
	@Autowired
    private CatGroupMerchandiseService service;
	
	@RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public DataTableResults<CatGroupMerchandiseDTO> postQuery(@RequestBody CatGroupMerchandiseDTO form, HttpServletRequest req){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.VIEW)) {
    		throw new PermissionException();
    	}
    	return service.processSearch(form, req);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody CatGroupMerchandiseBO entity){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.ADD)) {
    		throw new PermissionException();
    	}
    	entity.setCreatedBy(CommonUtil.getCurrentUser().getUsername());
    	entity.setCreatedDate(new Date());
    	service.saveOrUpdate(entity);
        return new ResponseEntity<CatGroupMerchandiseBO>(HttpStatus.OK);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody CatGroupMerchandiseBO entity){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.EDIT)) {
    		throw new PermissionException();
    	}
    	entity.setUpdatedBy(CommonUtil.getCurrentUser().getUsername());
        entity.setUpdatedDate(new Date());
        service.saveOrUpdate(entity);
        return new ResponseEntity<CatGroupMerchandiseBO>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
    	ResponseUtil<String> result = new ResponseUtil<String>();
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.RESOURCE, Constants.PERMISSION.DELETE)) {
    		throw new PermissionException();
    	}
        service.delete(id);
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getSelectedData", method = RequestMethod.GET)
    public ResponseEntity<?> getSelectedData(){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.CAT_MERCHANDISE_GROUP, Constants.PERMISSION.VIEW)) {
    		throw new PermissionException();
    	}
        return new ResponseEntity<>(service.getSelectedData(), HttpStatus.OK);
    }
    
    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<?> handlePermissionException(PermissionException ex, HttpServletRequest req, HandlerMethod handlerMethod) {
    	return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    }
}
