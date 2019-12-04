package com.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.model.UserModel;
import com.erp.service.UserService;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/users")
public class UserController {
    
    private static final String PASSWORD_DEFAULT = "admin@123";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;
       
    @RequestMapping(value="/getAll", method = RequestMethod.GET)
    public List<UserModel> listUser(){
        return userService.findAll();
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<UserModel> pageable){
        return new ResponseEntity<PaginationUtil<UserModel>>(userService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public UserModel create(@RequestBody UserModel user){
        user.setPassword(passwordEncoder.encode(PASSWORD_DEFAULT));
        return userService.save(user);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public UserModel update(@RequestBody UserModel user){
    	UserModel instance = userService.findUser(user.getUsername());
    	if(instance != null) {
    		user.setPassword(instance.getPassword());
    		return userService.save(user);
    	}
    	return userService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        userService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Th�nh c�ng!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
