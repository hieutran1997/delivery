/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SysResourceModel;
import java.util.List;

/**
 *
 * @author hieut
 */
public interface SysResourceService {
    SysResourceModel save(SysResourceModel user);
    List<SysResourceModel> findAll();
    void delete(Long id);
}

