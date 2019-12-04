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
public class ResourceDTO {
    
    private Long id;
    
    private String code;
    
    private String resourceName;
    
    private String parentCode;
    
    private String pathUrl;
    
    private String component;
    
    private Long typeOfResource;
    
    private String icon;
    
    private String keyTree;
    
    private String ortherControls;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public String getPathUrl() {
        return pathUrl;
    }

    public void setPathUrl(String pathUrl) {
        this.pathUrl = pathUrl;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Long getTypeOfResource() {
        return typeOfResource;
    }

    public void setTypeOfResource(Long typeOfResource) {
        this.typeOfResource = typeOfResource;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getKeyTree() {
        return keyTree;
    }

    public void setKeyTree(String keyTree) {
        this.keyTree = keyTree;
    }

    public String getOrtherControls() {
        return ortherControls;
    }

    public void setOrtherControls(String ortherControls) {
        this.ortherControls = ortherControls;
    }
    
    
}
