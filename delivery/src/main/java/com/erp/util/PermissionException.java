package com.erp.util;

public class PermissionException extends SysException {
    private String code;
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    /**
     * ValidateException
     * @param code
     */
    public PermissionException() {
        this.code = "invalidPermission";
    }
    /**
     * @return the code
     */
    public String getCode() {
        return code;
    }
    
    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }
}
