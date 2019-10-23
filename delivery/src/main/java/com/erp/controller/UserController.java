package com.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.model.UserBO;
import com.erp.service.UserService;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;

import java.util.List;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
       
    @RequestMapping(value="/getAll", method = RequestMethod.GET)
    public List<UserBO> listUser(){
        return userService.findAll();
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public Page<UserBO> postQuery(@RequestBody SearchRequestUtil pageable){
        return userService.getDataSearch(pageable);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public UserBO create(@RequestBody UserBO user){
        return userService.save(user);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public UserBO update(@RequestBody UserBO user){
        return userService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        userService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
