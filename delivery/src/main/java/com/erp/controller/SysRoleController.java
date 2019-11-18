/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.SysRoleModel;
import com.erp.service.SysRoleService;
import com.erp.util.PaginationUtil;
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
@RequestMapping("/roles")
public class SysRoleController {
    @Autowired
    private SysRoleService sysRoleService;
    
    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public ResponseEntity<?> getAll(@RequestBody SearchRequestUtil<SysRoleModel> pageable){
        return new ResponseEntity<>(sysRoleService.findAll(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<SysRoleModel> pageable){
        return new ResponseEntity<PaginationUtil<SysRoleModel>>(sysRoleService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public SysRoleModel create(@RequestBody SysRoleModel role){
        return sysRoleService.save(role);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public SysRoleModel update(@RequestBody SysRoleModel role){
        return sysRoleService.save(role);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        sysRoleService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Th�nh c�ng!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getSelectedData", method = RequestMethod.GET)
    public ResponseEntity<?> getSelectedData(){
        return new ResponseEntity<>(sysRoleService.getSeletedData(), HttpStatus.OK);
    }
}
