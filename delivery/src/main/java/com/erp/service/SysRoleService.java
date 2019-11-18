/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SysRoleModel;
import com.erp.model.dto.SeletedFormDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import java.util.List;

/**
 *
 * @author hieut
 */
public interface SysRoleService {
    PaginationUtil<SysRoleModel> getDataSearch(SearchRequestUtil<SysRoleModel> pageable);
    SysRoleModel save(SysRoleModel sysResource);
    List<SysRoleModel> findAll();
    void delete(Long id);
    List<SeletedFormDTO> getSeletedData();
}

