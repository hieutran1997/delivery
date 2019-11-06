/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.ProductModel;
import com.erp.util.SearchRequestUtil;
import org.springframework.data.domain.Page;

/**
 *
 * @author hieut
 */
public interface ProductService {
    ProductModel save(ProductModel instance);
    void delete(ProductModel bo);
}
