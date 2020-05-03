/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SysParameterModel;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;

/**
 *
 * @author hieut
 */
public interface SysParameterService {
    PaginationUtil<SysParameterModel> getDataSearch(SearchRequestUtil<SysParameterModel> pageable);
    SysParameterModel save(SysParameterModel sysResource);
    void delete(Long id);
    SysParameterModel findById(Long id);
    boolean checkBeforeSave(String code);
    SysParameterModel findByCode(String code);
}