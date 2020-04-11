/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */

package com.viettel.storage.bo;

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
@Table(name = "folder_upload")
public class FolderUploadBO {

    @Id
    @Column(name = "folder_upload_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long folderUploadId;

    @Column(name = "server_name")
    private String serverName;

    @Column(name = "root_folder")
    private String rootFolder;

    @Column(name = "sub_folder")
    private String subFolder;

    @Column(name = "file_type")
    private Long fileType;

    @Column(name = "file_type_name")
    private String fileTypeName;

    /**
     * @return the folderUploadId
     */
    public Long getFolderUploadId() {
        return folderUploadId;
    }

    /**
     * @param folderUploadId the folderUploadId to set
     */
    public void setFolderUploadId(Long folderUploadId) {
        this.folderUploadId = folderUploadId;
    }

    /**
     * @return the serverName
     */
    public String getServerName() {
        return serverName;
    }

    /**
     * @param serverName the serverName to set
     */
    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    /**
     * @return the rootFolder
     */
    public String getRootFolder() {
        return rootFolder;
    }

    /**
     * @param rootFolder the rootFolder to set
     */
    public void setRootFolder(String rootFolder) {
        this.rootFolder = rootFolder;
    }

    /**
     * @return the subFolder
     */
    public String getSubFolder() {
        return subFolder;
    }

    /**
     * @param subFolder the subFolder to set
     */
    public void setSubFolder(String subFolder) {
        this.subFolder = subFolder;
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

    /**
     * @return the fileTypeName
     */
    public String getFileTypeName() {
        return fileTypeName;
    }

    /**
     * @param fileTypeName the fileTypeName to set
     */
    public void setFileTypeName(String fileTypeName) {
        this.fileTypeName = fileTypeName;
    }

}
