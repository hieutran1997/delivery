/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model.dto;

/**
 *
 * @author hieut
 */
public class RolePermissionDTO {
    
    private String resourceCode;
    
    private String resourceName;
    
    private Long hasAdd;
    
    private Long hasEdit;
    
    private Long hasDelete;
    
    private Long hasApprove;

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public Long getHasAdd() {
        return hasAdd;
    }

    public void setHasAdd(Long hasAdd) {
        this.hasAdd = hasAdd;
    }

    public Long getHasEdit() {
        return hasEdit;
    }

    public void setHasEdit(Long hasEdit) {
        this.hasEdit = hasEdit;
    }

    public Long getHasDelete() {
        return hasDelete;
    }

    public void setHasDelete(Long hasDelete) {
        this.hasDelete = hasDelete;
    }

    public Long getHasApprove() {
        return hasApprove;
    }

    public void setHasApprove(Long hasApprove) {
        this.hasApprove = hasApprove;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }
    
}
