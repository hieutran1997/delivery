/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SystemParameterModel;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;

/**
 *
 * @author hieut
 */
public interface SysParameterService {
    PaginationUtil<SystemParameterModel> getDataSearch(SearchRequestUtil<SystemParameterModel> pageable);
    SystemParameterModel save(SystemParameterModel sysResource);
    void delete(Long id);
    SystemParameterModel findById(Long id);
}