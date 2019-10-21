/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.ProductDao;
import com.erp.model.ProductBO;
import com.erp.redis.repository.RedisRepository;
import com.erp.util.SearchRequestUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

/**
 *
 * @author hieut
 */
@Service(value = "productService")
public class ProductServiceImpl implements ProductService{
    
    @Autowired
    private ProductDao productDao; 
    
    @Autowired
    private RedisRepository redisRepository;
    
    @Override
    public ProductBO save(ProductBO instance) {
        return productDao.save(instance);
    }
    
    @Override
    public void delete(long id) {
        productDao.delete(id);
    }

    @Override
    public Page<ProductBO> getDataSearch(SearchRequestUtil pageable) {
        PageRequest request = new PageRequest(pageable.getCurrent()- 1, pageable.getPageSize());
        return productDao.findAll(request);
    }
}
