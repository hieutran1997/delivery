/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.OrganizationModel;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import java.util.List;

/**
 *
 * @author hieut
 */
public interface OrganizationService {
    PaginationUtil<OrganizationModel> getDataSearch(SearchRequestUtil<OrganizationModel> pageable);
    OrganizationModel save(OrganizationModel sysResource);
    List<OrganizationModel> findAll();
    void delete(Long id);
    List<SelectedFormDTO> getSeletedData();
}

