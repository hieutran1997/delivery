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
    
    private String roleCode;
    
    private String resourceCode;
    
    private String resourceName;
    
    private Long hasView;
    
    private Long hasAdd;
    
    private Long hasEdit;
    
    private Long hasDelete;
    
    private Long hasApprove;
    
    private String ortherControlsOfResource;
    
    private String ortherControls;

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }
    
    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public Long getHasView() {
        return hasView;
    }

    public void setHasView(Long hasView) {
        this.hasView = hasView;
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

    public String getOrtherControls() {
        return ortherControls;
    }

    public void setOrtherControls(String ortherControls) {
        this.ortherControls = ortherControls;
    }

    public String getOrtherControlsOfResource() {
        return ortherControlsOfResource;
    }

    public void setOrtherControlsOfResource(String ortherControlsOfResource) {
        this.ortherControlsOfResource = ortherControlsOfResource;
    }
}
