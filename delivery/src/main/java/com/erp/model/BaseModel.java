/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author hieut
 */
public class BaseModel implements Serializable{
    
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
    
    /**
     * true = isUse, false = isDelete
     */
    @Column(name="status")
    private boolean status; 
    
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
    
}
