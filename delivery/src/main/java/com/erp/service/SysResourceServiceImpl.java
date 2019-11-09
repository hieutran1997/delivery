/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysResourceDAO;
import com.erp.model.SysResourceModel;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hieut
 */
@Service
public class SysResourceServiceImpl implements SysResourceService{
    
    @Autowired
    private SysResourceDAO sysResourceDao;


    @Override
    public SysResourceModel save(SysResourceModel user) {
        return sysResourceDao.save(user);
    }

    @Override
    public List<SysResourceModel> findAll() {
        List<SysResourceModel> list = new ArrayList<>();
        sysResourceDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(Long id) {
        sysResourceDao.delete(id);
    }
    
    
}
