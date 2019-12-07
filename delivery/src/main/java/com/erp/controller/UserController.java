package com.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.model.UserModel;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
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
    
    @Autowired
    private ServiceChecker serviceChecker;
       
    @RequestMapping(value="/getAll", method = RequestMethod.GET)
    public List<UserModel> listUser(){
        return userService.findAll();
    }
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<UserModel> pageable){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.USER, Constants.PERMISSION.VIEW)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        return new ResponseEntity<PaginationUtil<UserModel>>(userService.getDataSearch(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody UserModel user){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.USER, Constants.PERMISSION.ADD)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
        user.setPassword(passwordEncoder.encode(PASSWORD_DEFAULT));
        return new ResponseEntity<UserModel>(userService.save(user), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody UserModel user){
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.USER, Constants.PERMISSION.EDIT)) {
    		return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    	}
    	UserModel instance = userService.findUser(user.getUsername());
    	if(instance != null) {
    		user.setPassword(instance.getPassword());
    		return new ResponseEntity<UserModel>(userService.save(user), HttpStatus.OK);
    	}
    	return new ResponseEntity<UserModel>(userService.save(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
    	ResponseUtil<String> result = new ResponseUtil<String>();
    	if(!serviceChecker.permissionChecker(Constants.RESOURCE.USER, Constants.PERMISSION.EDIT)) {
    		result.setError(true);
            result.setMessage("Bạn không có quyền truy cập");
    		return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
    	}
        userService.delete(id);
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
