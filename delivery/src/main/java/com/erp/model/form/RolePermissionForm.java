/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model.form;

import com.erp.model.dto.RolePermissionDTO;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author hieut
 */
public class RolePermissionForm {
    private List<RolePermissionDTO> source;
    private List<RolePermissionDTO> target;
    private String roleCode;

    public List<RolePermissionDTO> getSource() {
        return source;
    }

    public void setSource(List<RolePermissionDTO> source) {
        this.source = source;
    }

    public List<RolePermissionDTO> getTarget() {
        return target;
    }

    public void setTarget(List<RolePermissionDTO> target) {
        this.target = target;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public void pushTarget(RolePermissionDTO data){
        if(this.target != null){
            this.target = new ArrayList<>();
        } 
        this.target.add(data);
    }
}
