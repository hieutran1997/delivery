package com.erp.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.HandlerMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public abstract class BaseController {
	public static Logger LOGGER = LoggerFactory.getLogger(BaseController.class);
	/**
     * handlePermissionException
     * 
     * @param ex
     * @param request
     * @return
     */
    @ExceptionHandler(PermissionException.class)
    public @ResponseBody ResponseEntity<?> handlePermissionException(PermissionException ex, HttpServletRequest req,
            HandlerMethod handlerMethod) {
    	return new ResponseEntity<>("Bạn không có quyền truy cập", HttpStatus.FORBIDDEN);
    }
}
