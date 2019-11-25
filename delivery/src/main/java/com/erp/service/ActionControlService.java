/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.ActionsControlModel;
import com.erp.model.ResourceControlModel;
import com.erp.model.dto.ActionControlDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import java.util.List;

/**
 *
 * @author hieut
 */
public interface ActionControlService {
    PaginationUtil<ActionsControlModel> getDataSearch(SearchRequestUtil<ActionsControlModel> pageable);
    ActionsControlModel save(ActionsControlModel sysResource);
    List<ActionsControlModel> findAll();
    void delete(Long id);
    List<SelectedFormDTO> getSeletedData();
    List<ActionControlDTO> getControl(String resourceCode);
    void mapResource(ResourceControlModel control);
}

