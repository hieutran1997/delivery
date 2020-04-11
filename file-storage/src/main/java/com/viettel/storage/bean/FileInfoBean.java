/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.storage.bean;

import java.util.Date;

/**
 * DataPickerBean
 * 
 * @author quanvh
 */
public class FileInfoBean {

    private String id;
    private String fileName;
    private Long uploadDate;
    private Long fileType;
    private Long objectId;
    private String sysLanguageCode;
    private String path;

    // Getter and Setter
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public Long getUploadDate() {
        return uploadDate;
    }
    public void setUploadDate(Date uploadDate) {
        if (uploadDate != null) {
            this.uploadDate = uploadDate.getTime();
        } else {
            this.uploadDate = null;
        }
    }
    public Long getFileType() {
        return fileType;
    }
    public void setFileType(Long fileType) {
        this.fileType = fileType;
    }
    public Long getObjectId() {
        return objectId;
    }
    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }
    public String getSysLanguageCode() {
        return sysLanguageCode;
    }
    public void setSysLanguageCode(String sysLanguageCode) {
        this.sysLanguageCode = sysLanguageCode;
    }
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
}