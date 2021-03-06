/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysResourceDAO;
import com.erp.model.SysResourceModel;
import com.erp.model.dto.ResourceDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hieut
 */
@Service("sysResourceService")
public class SysResourceServiceImpl implements SysResourceService{
    
    @Autowired
    private SysResourceDAO sysResourceDao;

    @Autowired
    private VfData vfData;

    @Override
    public SysResourceModel save(SysResourceModel user) {
        return sysResourceDao.save(user);
    }
    
    @Override
    public PaginationUtil<ResourceDTO> getDataSearch(SearchRequestUtil<SysResourceModel> pageable){
        return sysResourceDao.getDataPaging(pageable, vfData);
    }
    
    @Override
    public List<SysResourceModel> findAll() {
        List<SysResourceModel> list = new ArrayList<>();
        sysResourceDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(Long id) {
        SysResourceModel user = sysResourceDao.findById(id).orElse(null);
        sysResourceDao.delete(user);
    }
    
    @Override
    public boolean saveOrUpdateOrtherControl(SysResourceModel data){
        SysResourceModel source = sysResourceDao.findById(data.getId()).orElse(null);
        if(source == null){
            return false;
        }else{
            try {
                source.setOrtherControls(data.getOrtherControls());
                sysResourceDao.save(source);
            } catch (Exception e) {
                return false;
            }
            return true;
        }
    }
}
