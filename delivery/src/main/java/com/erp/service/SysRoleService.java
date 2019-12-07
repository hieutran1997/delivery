/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.model.SysRoleModel;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.model.dto.UserRoleDTO;
import com.erp.model.form.RolePermissionForm;
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
    List<SelectedFormDTO> getSeletedData();
    void saveUserRole(UserRoleDTO userRole);
    UserRoleDTO getUserRole(String username);
    void saveRolePermission(RolePermissionForm rolePer);
    List<RolePermissionDTO> getRolePermission(String roleCode);
    List<String> getListMenus(String userName);
    List<RolePermissionDTO> getListPermission(String userName);
}

