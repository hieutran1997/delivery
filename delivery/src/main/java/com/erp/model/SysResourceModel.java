/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model;

import com.erp.util.JsonToMapConverter;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.Column;
import javax.persistence.Convert;
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
	/**
	 * 
	 */
	private static final long serialVersionUID = -9000347811104682533L;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name="code", length = 10, nullable = false)
    private String code;
    
    @Column(name="resource_name", length = 255, nullable = false)
    private String resourceName;
    
    @Column(name="parent_code", length = 10, nullable = true)
    private String parentCode;
    
    @Column(name="path_url", length = 50, nullable = true)
    private String pathUrl;
    
    @Column(name="component", length = 50, nullable = true)
    private String component;
    
    @Column(name="type_of_resource", length = 10, nullable = false)
    private Long typeOfResource;
    
    @Column(name="icon", length = 20, nullable = true)
    private String icon;
    
    @Column(name="key_tree", length = 20, nullable = true)
    private String keyTree;
    
    @Column(name = "orther_control")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, Object> ortherControls = new HashMap<>();

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

    public Map<String, Object> getOrtherControls() {
        return ortherControls;
    }

    public void setOrtherControls(Map<String, Object> ortherControls) {
        this.ortherControls = ortherControls;
    }
    
}
