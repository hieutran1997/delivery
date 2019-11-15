/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.OrganizationModel;
import com.erp.service.OrganizationService;
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
@RequestMapping("/organizations")
public class OrganizationController {
    @Autowired
    private OrganizationService sysRoleService;
    
    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public ResponseEntity<?> getAll(@RequestBody SearchRequestUtil<OrganizationModel> pageable){
        return new ResponseEntity<>(sysRoleService.findAll(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<OrganizationModel> pageable){
        return new ResponseEntity<PaginationUtil<OrganizationModel>>(sysRoleService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public OrganizationModel create(@RequestBody OrganizationModel org){
        return sysRoleService.save(org);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public OrganizationModel update(@RequestBody OrganizationModel org){
        return sysRoleService.save(org);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        sysRoleService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
