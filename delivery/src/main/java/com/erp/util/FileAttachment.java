package com.erp.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Transient;

public class FileAttachment {

    @Transient
    private Map<String, List<FileInfoBean>> fileAttachment;

    /**
     * @return the fileAttachment
     */
    public Map<String, List<FileInfoBean>> getFileAttachment() {
        return fileAttachment;
    }

    /**
     * @param fileAttachment
     *            the fileAttachment to set
     */
    public void setFileAttachment(Map<String, List<FileInfoBean>> fileAttachment) {
        this.fileAttachment = fileAttachment;
    }

    /**
     * setMapFiles
     * 
     * @param name
     * @param mapFiles
     */
    public void setFileAttachment(String name, List<FileInfoBean> listFiles) {
        if (this.fileAttachment == null) {
            this.fileAttachment = new HashMap<>();
        }
        this.fileAttachment.put(name, listFiles);
    }

}
