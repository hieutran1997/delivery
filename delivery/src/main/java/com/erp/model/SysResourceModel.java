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
@Table(name = "sys_resource")
public class SysResourceModel extends BaseModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name="code", length = 10, nullable = false)
    private String code;
    
    @Column(name="resource_name", length = 255, nullable = false)
    private String resourceName;
    
    @Column(name="parent_code", length = 10, nullable = true)
    private String parentCode;
    
    @Column(name="path_url", length = 10, nullable = true)
    private String pathUrl;
    
    @Column(name="component", length = 20, nullable = true)
    private String component;
    
    @Column(name="type_of_resource", length = 10, nullable = false)
    private ConstantCommon.TYPEOFRESOURCE typeOfResource;
    
    @Column(name="icon", length = 20, nullable = true)
    private String icon;
    
    @Column(name="icon", length = 20, nullable = true)
    private String keyTree;

    public String getKeyTree() {
        return keyTree;
    }

    public void setKeyTree(String keyTree) {
        this.keyTree = keyTree;
    }
    
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

    public ConstantCommon.TYPEOFRESOURCE getTypeOfResource() {
        return typeOfResource;
    }

    public void setTypeOfResource(ConstantCommon.TYPEOFRESOURCE typeOfResource) {
        this.typeOfResource = typeOfResource;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
