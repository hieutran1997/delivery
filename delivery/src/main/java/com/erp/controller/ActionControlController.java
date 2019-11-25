/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.ActionsControlModel;
import com.erp.model.ResourceControlModel;
import com.erp.service.ActionControlService;
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
@RequestMapping("/actioncontrol")
public class ActionControlController {
    @Autowired
    private ActionControlService actionControlService;
    
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(actionControlService.findAll(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<ActionsControlModel> pageable){
        return new ResponseEntity<PaginationUtil<ActionsControlModel>>(actionControlService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ActionsControlModel create(@RequestBody ActionsControlModel control){
        return actionControlService.save(control);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ActionsControlModel update(@RequestBody ActionsControlModel control){
        return actionControlService.save(control);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        actionControlService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getSelectedData", method = RequestMethod.GET)
    public ResponseEntity<?> getSelectedData(){
        return new ResponseEntity<>(actionControlService.getSeletedData(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getSelectedData/{resoureCode}", method = RequestMethod.GET)
    public ResponseEntity<?> getControl(@PathVariable(value = "resoureCode") String resoureCode){
        return new ResponseEntity<>(actionControlService.getControl(resoureCode), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/mapResource", method = RequestMethod.POST)
    public ResponseEntity<?> mapResource(@RequestBody ResourceControlModel control){
        actionControlService.mapResource(control);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }
}