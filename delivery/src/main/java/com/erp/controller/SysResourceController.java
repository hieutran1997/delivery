/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.SysResourceModel;
import com.erp.service.SysResourceService;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;
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
@RequestMapping("/resources")
public class SysResourceController {
    @Autowired
    private SysResourceService sysResourceService;
    
    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<SysResourceModel> pageable){
        return new ResponseEntity<>(sysResourceService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public SysResourceModel create(@RequestBody SysResourceModel user){
        return sysResourceService.save(user);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public SysResourceModel update(@RequestBody SysResourceModel user){
        return sysResourceService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        sysResourceService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
