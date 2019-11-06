/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.controller;

import com.erp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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
    
}
