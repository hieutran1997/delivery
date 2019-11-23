/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.OrganizationDAO;
import com.erp.dao.SysRoleDAO;
import com.erp.model.OrganizationModel;
import com.erp.model.dto.SelectedFormDTO;
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
@Service("organizationService")
public class OrganizationServiceImpl implements OrganizationService{
    
    @Autowired
    private OrganizationDAO organizationDao;

    @Autowired
    private VfData vfData;

    @Override
    public OrganizationModel save(OrganizationModel user) {
        return organizationDao.save(user);
    }
    
    @Override
    public PaginationUtil<OrganizationModel> getDataSearch(SearchRequestUtil<OrganizationModel> pageable){
        return organizationDao.getDataPaging(pageable, vfData);
    }
    
    @Override
    public List<OrganizationModel> findAll() {
        List<OrganizationModel> list = new ArrayList<>();
        organizationDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(Long id) {
        organizationDao.delete(id);
    }
    
    @Override
    public List<SelectedFormDTO> getSeletedData(){
        return organizationDao.getSelectedData(vfData);
    }
}
