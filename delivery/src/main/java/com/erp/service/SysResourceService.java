/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SysResourceModel;
import com.erp.model.dto.ResourceDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import java.util.List;

/**
 *
 * @author hieut
 */
public interface SysResourceService {
    PaginationUtil<ResourceDTO> getDataSearch(SearchRequestUtil<SysResourceModel> pageable);
    SysResourceModel save(SysResourceModel sysResource);
    List<SysResourceModel> findAll();
    void delete(Long id);
    boolean saveOrUpdateOrtherControl(SysResourceModel data);
}

