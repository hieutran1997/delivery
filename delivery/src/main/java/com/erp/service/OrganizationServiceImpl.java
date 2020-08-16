/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.OrganizationDAO;
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
    public OrganizationModel save(OrganizationModel org) {
    	String path = "";
    	if(org.getParentCode() != null) {
    		OrganizationModel parent = organizationDao.getOrgByCode(vfData, org.getParentCode());
    		if(parent != null) {
    			path = parent.getOrganizationPath() + org.getCode() + "/";
    		}else {
    			path = "/" + org.getCode() + "/";
    		}
    	}else {
    		path = "/" + org.getCode() + "/";
    	}
    	org.setOrganizationPath(path);
    	org.setStatus(true);
        return organizationDao.save(org);
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
        OrganizationModel model = organizationDao.getOne(id);
        organizationDao.delete(model);
    }
    
    @Override
    public List<SelectedFormDTO> getSeletedData(){
        return organizationDao.getSelectedData(vfData);
    }
    
    @Override
    public List<OrganizationModel> getListChild(String parentCode){
    	return organizationDao.getListChild(vfData, parentCode);
    }
    
    @Override
    public OrganizationModel findOne(Long id) {
    	OrganizationModel result = organizationDao.findById(id).orElse(null);
    	if(result != null) {
    		if(result.getEffectiveTime() != null) {
    			result.setEffectiveTimeNumber(result.getEffectiveTime().getTime());
    		}
    		if(result.getExpireTime() != null) {
    			result.setExpireTimeNumber(result.getExpireTime().getTime());
    		}
    	}
    	return result;
    }
    
    @Override
    public List<SelectedFormDTO> getSeletedData(String code){
    	return organizationDao.getSelectedData(vfData, code);
    }
}
