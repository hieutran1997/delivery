/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.util;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author hieut
 */
public class Constants {
    /**
     * RESPONSE_TYPE
     * @author d2tsoftware
     * @since Nov 27, 2018
     * @version 1.0
     */
    
    public static class PERMISSION {
        public static final String ADD = "ADD";
        public static final String EDIT = "EDIT";
        public static final String DELETE = "DELETE";
        public static final String VIEW = "VIEW";
        public static final String APPROVE = "APPROVE";
        public static final String ORTHER = "ORTHER";
    }
    
    public static class RESOURCE {
        public static final String USER = "user";
        public static final String ROLE = "role";
        public static final String RESOURCE = "resource";
        public static final String ORGANIZATION = "org";
        public static final String CAT_MERCHANDISE_GROUP = "group_merchandise";
    }
    
    public interface CORS_FILTER {
        public static final String ALLOW_METHODS = "POST, PUT, GET, OPTIONS, DELETE";
        public static final String ALLOW_HEADERS = "X-CACHEABLE, Authorization, Content-Type, Current-Language, Current-Market, viettel-api-key, sso-two-factor-ticket";
    }
    private static HttpServletRequest req;
    public static String SCHEMA_PAYROLL="vhcm_report";
    public static class RESPONSE_TYPE {
        public static final String SUCCESS = "SUCCESS";
        public static final String ERROR = "ERROR";
        public static final String WARNING = "WARNING";
        public static final String CONFIRM = "CONFIRM";
        public static final String invalidPermission = "invalidPermission";
    }
    public static class MARKET_COMPANY_ID {
        public static final Long VIETTEL = 1L;
        public static final Long VTC = 2L;
        public static final Long MOV = 4L;
    }
    /**
     * RESPONSE_TYPE
     * @author d2tsoftware
     * @since Nov 27, 2018
     * @version 1.0
     */
    public static class RESPONSE_CODE {
        public static final String SUCCESS = "success";
        public static final String DELETE_SUCCESS = "deleteSuccess";
        public static final String UPDATE_STATUS_SUCCESS = "updateStatusSuccess";
        public static final String UPDATE_SUCCESS = "updateSuccess";
        public static final String ERROR = "error";
        public static final String WARNING = "warning";
        public static final String RECORD_DELETED = "record.deleted";
        public static final String EMAIL_ADDRESS_DELETED = "emailAddress.deleted";
        public static final String RECORD_INUSED = "record.inUsed";
        public static final String RECORD_NOT_EXISTED = "recordNotExits";
        public static final String POSITION_EXISTED = "positionExits";
        public static final String DOCUMENT_TYPE_EXISTED = "documentTypeExits";
        public static final String NOT_ALLOWED_ADD_EMPLOYEE = "employee.notAllowedAddEmployee";
        public static final String NOT_ALLOWED_DELETE_EMPLOYEE = "employee.notAllowedDeleteEmployee";
        public static final String DUPICATE_DATA_REDUCTION = "taxReduction.duplicateData";
        public static final String PARAMETER_USED = "parameterUsed";
        public static final String SYS_CAT_TYPE_USED = "sysCatTypeUsed";
        public static final String ORG_DUPLICATE_CODE = "organization.duplicateCode";
        public static final String ORG_DUPLICATE_NAME = "organization.duplicateName";
        public static final String NATION_CONFIG_TYPE_USED = "nationConfigTypeUsed";
        public static final String EMP_WORK_SCHEDULE_SUCCESS = "empWorkSchedule.success";
        public static final String NOT_ALLOWED_DELETE_DATA_TYPE = "dataType.recordInUsed";
        public static final String NOT_ALLOWED_DELETE_FORMULA = "formula.config.cannotDelete";
        public static final String NOT_ALLOWED_CHANGE_STATUS_FORMULA = "formula.config.cannotChange";
        public static final String NOT_ALLOWED_EVALUATION = "evaluation.cannotEvaluation";
        public static final String NO_RECORDS = "evaluation.noRecords";
        public static final String LOCK_UNIT = "evaluation.orglocked";
        public static final String NO_DATA_EVALUATION = "evaluation.noData";
      
    }
    
    public interface COMMON {
        String FONT_FOLDER = CommonUtil.getConfig("fontFolder");
        String MARKET_COMPANY_ID = "MARKET_COMPANY_ID";
        String EXPORT_FOLDER = CommonUtil.getConfig("exportFolder");
        //Thu muc chua file tam de import
        String IMPORT_FOLDER = "/share/import/";
        String DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
    }
}
