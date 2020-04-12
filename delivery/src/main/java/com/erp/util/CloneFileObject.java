package com.erp.util;

public class CloneFileObject {
	private Long fromFileType;
    private Long fromObjectId;
    private Long toFileType;
    private Long toObjectId;
    
    /**
     * @return the fromFileType
     */
    public Long getFromFileType() {
        return fromFileType;
    }
    
    /**
     * @param fromFileType the fromFileType to set
     */
    public void setFromFileType(Long fromFileType) {
        this.fromFileType = fromFileType;
    }
    
    /**
     * @return the fromObjectId
     */
    public Long getFromObjectId() {
        return fromObjectId;
    }
    
    /**
     * @param fromObjectId the fromObjectId to set
     */
    public void setFromObjectId(Long fromObjectId) {
        this.fromObjectId = fromObjectId;
    }
    
    /**
     * @return the toFileType
     */
    public Long getToFileType() {
        return toFileType;
    }
    
    /**
     * @param toFileType the toFileType to set
     */
    public void setToFileType(Long toFileType) {
        this.toFileType = toFileType;
    }
    
    /**
     * @return the toObjectId
     */
    public Long getToObjectId() {
        return toObjectId;
    }
    
    /**
     * @param toObjectId the toObjectId to set
     */
    public void setToObjectId(Long toObjectId) {
        this.toObjectId = toObjectId;
    }
}
