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
    
    private boolean hasAdd;
    
    private boolean hasEdit;
    
    private boolean hasDelete;
    
    private boolean hasApprove;

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
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

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }
    
}
