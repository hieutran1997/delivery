/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.erp.dao.ProductDAO;

/**
 *
 * @author hieut
 */
@Service(value = "productService")
public class ProductServiceImpl implements ProductService{
    
    @Autowired
    private ProductDAO productDao; 
    
    @Override
    public ProductModel save(ProductModel instance) {
        return productDao.save(instance);
    }
    
    @Override
    public void delete(ProductModel bo) {
        productDao.delete(bo);
    }
}
