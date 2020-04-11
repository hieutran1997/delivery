/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */

package com.viettel.storage.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author d2tsoftware
 * @since 12/11/2019
 * @version 1.0
 */
@Entity
@Table(name = "attachment_file")
public class AttachmentFileBO {

    @Id
    @Column(name = "attachment_file_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long attachmentFileId;

    @Column(name = "object_id")
    private Long objectId;

    @Column(name = "file_type")
    private Long fileType;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "path")
    private String path;
    
    @Column(name = "sys_language_code")
    private String sysLanguageCode;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "created_by")
    private String createdBy;

    /**
     * @return the attachmentFileId
     */
    public Long getAttachmentFileId() {
        return attachmentFileId;
    }

    /**
     * @param attachmentFileId the attachmentFileId to set
     */
    public void setAttachmentFileId(Long attachmentFileId) {
        this.attachmentFileId = attachmentFileId;
    }

    /**
     * @return the objectId
     */
    public Long getObjectId() {
        return objectId;
    }

    /**
     * @param objectId the objectId to set
     */
    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }



    /**
     * @return the fileName
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * @param fileName the fileName to set
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    /**
     * @return the path
     */
    public String getPath() {
        return path;
    }

    /**
     * @param path the path to set
     */
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * @return the createdDate
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * @param createdDate the createdDate to set
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * @return the createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * @param createdBy the createdBy to set
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * @return the sysLanguageCode
     */
    public String getSysLanguageCode() {
        return sysLanguageCode;
    }

    /**
     * @param sysLanguageCode the sysLanguageCode to set
     */
    public void setSysLanguageCode(String sysLanguageCode) {
        this.sysLanguageCode = sysLanguageCode;
    }

    /**
     * @return the fileType
     */
    public Long getFileType() {
        return fileType;
    }

    /**
     * @param fileType the fileType to set
     */
    public void setFileType(Long fileType) {
        this.fileType = fileType;
    }
}
