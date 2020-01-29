/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 *
 * @author hieut
 */
@Entity
@Table(name = "organization")
public class OrganizationModel{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "code", nullable = false, length = 10, unique = true)
    private String code;
    
    @Column(name = "organization_path", nullable = false, length = 500)
    private String organizationPath;
    
    @Column(name = "organization_name", nullable = false, length = 1000)
    private String organizationName;
    
    @Column(name = "parent_code", nullable = true, length = 10) 
    private String parentCode;
    
    @Column(name="address")
    private String address;
    
    @Column(name="effective_time", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date effectiveTime;
    
    @Column(name="expire_time", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expireTime;
    
    @Column(name="created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    
    @Column(name="created_by", length = 255)
    private String createdBy;
    
    @Column(name="created_by_group", length = 255)
    private String createdByGroup;
    
    @Column(name="updated_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;
    
    @Column(name="updated_by")
    private String updatedBy;
    
    @Transient
    private int isLeaf;
    
    @Transient
    private Long effectiveTimeNumber;
    
    @Transient
    private Long expireTimeNumber;
    /**
     * true = isUse, false = isDelete
     */
    @Column(name="status")
    private boolean status; 

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getOrganizationPath() {
        return organizationPath;
    }

    public void setOrganizationPath(String organizationPath) {
        this.organizationPath = organizationPath;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getEffectiveTime() {
		return effectiveTime;
	}

	public void setEffectiveTime(Date effectiveTime) {
		this.effectiveTime = effectiveTime;
	}

	public Date getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(Date expireTime) {
		this.expireTime = expireTime;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreatedByGroup() {
		return createdByGroup;
	}

	public void setCreatedByGroup(String createdByGroup) {
		this.createdByGroup = createdByGroup;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public int getIsLeaf() {
		return isLeaf;
	}

	public void setIsLeaf(int isLeaf) {
		this.isLeaf = isLeaf;
	}

	public Long getEffectiveTimeNumber() {
		return effectiveTimeNumber;
	}

	public void setEffectiveTimeNumber(Long effectiveTimeNumber) {
		this.effectiveTimeNumber = effectiveTimeNumber;
	}

	public Long getExpireTimeNumber() {
		return expireTimeNumber;
	}

	public void setExpireTimeNumber(Long expireTimeNumber) {
		this.expireTimeNumber = expireTimeNumber;
	}
    
}
