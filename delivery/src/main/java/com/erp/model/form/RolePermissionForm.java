/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model.form;

import com.erp.model.dto.RolePermissionDTO;
import java.util.List;

/**
 *
 * @author hieut
 */
public class RolePermissionForm {
    private List<RolePermissionDTO> data;
    private String roleCode;

    public List<RolePermissionDTO> getData() {
        return data;
    }

    public void setData(List<RolePermissionDTO> data) {
        this.data = data;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }
    
}
