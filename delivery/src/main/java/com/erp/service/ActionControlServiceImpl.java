/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.ActionControlDAO;
import com.erp.model.ActionsControlModel;
import com.erp.model.ResourceControlModel;
import com.erp.model.dto.ActionControlDTO;
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
@Service("actionControlService")
public class ActionControlServiceImpl implements ActionControlService{
    
    @Autowired
    private ActionControlDAO actionsControlDao;

    @Autowired
    private VfData vfData;

    @Override
    public ActionsControlModel save(ActionsControlModel user) {
        return actionsControlDao.save(user);
    }
    
    @Override
    public PaginationUtil<ActionsControlModel> getDataSearch(SearchRequestUtil<ActionsControlModel> pageable){
        return actionsControlDao.getDataPaging(pageable, vfData);
    }
    
    @Override
    public List<ActionsControlModel> findAll() {
        List<ActionsControlModel> list = new ArrayList<>();
        actionsControlDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(Long id) {
        ActionsControlModel model = actionsControlDao.getOne(id);
        actionsControlDao.delete(model);
    }
    
    @Override
    public List<SelectedFormDTO> getSeletedData(){
        return actionsControlDao.getSelectedData(vfData);
    }
    
    @Override
    public List<ActionControlDTO> getControl(String resourceCode){
        List<ActionControlDTO> result = new ArrayList<>();
        return result;
    }
    
    @Override
    public void mapResource(ResourceControlModel control){
        
    }
}
