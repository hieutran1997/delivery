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
@Table(name="sys_parameter")
public class SysParameterModel extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1852469087858252721L;
	
	@Id
    @Column(name = "sys_parameter_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sysParameterId;
	
    @Column(name = "code")
    private String code;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "value")
    private String value;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "status")
    private Long status;
    
    public Long getSysParameterId() {
		return sysParameterId;
	}

	public void setSysParameterId(Long sysParameterId) {
		this.sysParameterId = sysParameterId;
	}

	public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}
    
}