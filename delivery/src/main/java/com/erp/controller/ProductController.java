/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.model.ProductBO;
import com.erp.redis.repository.RedisRepository;
import com.erp.service.ProductService;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
@RequestMapping("/products")
public class ProductController {
    
    private static final String KEY = "Product";
    
    @Autowired
    private ProductService productService;
    
    @RequestMapping(value = "/postQuery", method = RequestMethod.POST)
    public Page<ProductBO> postQuery(@RequestBody SearchRequestUtil pageable){
        Page<ProductBO> result = productService.getDataSearch(pageable);
        return result;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ProductBO create(@RequestBody ProductBO user){
        return productService.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id){
        productService.delete(id);
        ResponseUtil<String> result = new ResponseUtil<String>();
        result.setError(false);
        result.setMessage("Thành công!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
