/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author hieut
 */
@Entity
@Table(name = "sys_role_permission")
public class SysRolePermissionModel {
      
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name="resource_code", length = 10)
    private String resourceCode;
    
    @Column(name="role_code", length = 10)
    private String roleCode;
    
    @Column(name="has_add")
    private boolean hasAdd;
    
    @Column(name="has_edit")
    private boolean hasEdit;
    
    @Column(name="has_delete")
    private boolean hasDelete;
    
    @Column(name="has_approve")
    private boolean hasApprove;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public boolean isHasAdd() {
        return hasAdd;
    }

    public void setHasAdd(boolean hasAdd) {
        this.hasAdd = hasAdd;
    }

    public boolean isHasEdit() {
        return hasEdit;
    }

    public void setHasEdit(boolean hasEdit) {
        this.hasEdit = hasEdit;
    }

    public boolean isHasDelete() {
        return hasDelete;
    }

    public void setHasDelete(boolean hasDelete) {
        this.hasDelete = hasDelete;
    }

    public boolean isHasApprove() {
        return hasApprove;
    }

    public void setHasApprove(boolean hasApprove) {
        this.hasApprove = hasApprove;
    }
}
