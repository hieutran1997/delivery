/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysRoleDAO;
import com.erp.model.SysRoleModel;
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
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService{
    
    @Autowired
    private SysRoleDAO sysRoleDao;

    @Autowired
    private VfData vfData;

    @Override
    public SysRoleModel save(SysRoleModel user) {
        return sysRoleDao.save(user);
    }
    
    @Override
    public PaginationUtil<SysRoleModel> getDataSearch(SearchRequestUtil<SysRoleModel> pageable){
        return sysRoleDao.getDataPaging(pageable, vfData);
    }
    
    @Override
    public List<SysRoleModel> findAll() {
        List<SysRoleModel> list = new ArrayList<>();
        sysRoleDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(Long id) {
        sysRoleDao.delete(id);
    }
}
