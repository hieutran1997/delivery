package com.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.erp.model.User;
import com.erp.service.UserService;
import com.erp.util.ResponseUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
    private UserService userService;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Autowired
    private PasswordEncoder passwordEncoder;
	
	@RequestMapping(value="/signup", method = RequestMethod.POST)
    public ResponseEntity<ResponseUtil<User>> signup(@RequestBody User user){
    	ResponseUtil<User> result = new ResponseUtil<User>();
    	User data = new User();
    	data = this.userService.findUser(user.getUsername());
    	if(data==null) {
    		user.setPassword(passwordEncoder.encode(user.getPassword()));
        	data = userService.save(user);
        	if(data != null) {
        		result.setObject(data);
        		result.setError(false);
        		return new ResponseEntity<>(result, HttpStatus.OK);
        	}
        	result.setMessage("Không lưu được, đăng ký thật bại!");
    		result.setError(true);
        	return new ResponseEntity<>(result, HttpStatus.OK);
    	}
    	result.setMessage("Đã tồn tại người dùng!");
		result.setError(true);
    	return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
