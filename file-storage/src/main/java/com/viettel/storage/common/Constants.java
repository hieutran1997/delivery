/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.storage.common;

/**
 * @author d2tsoftware
 * @since Nov 20, 2018
 * @version 1.0
 */
public class Constants {

    /**
     * RESPONSE_TYPE
     * 
     * @author d2tsoftware
     * @since Nov 27, 2018
     * @version 1.0
     */
    public static class RESPONSE_TYPE {

        public static final String SUCCESS = "SUCCESS";
        public static final String ERROR = "ERROR";
        public static final String WARNING = "WARNING";
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
        public static final String ERROR = "error";
        public static final String WARNING = "warning";
        public static final String RECORD_DELETED = "record.deleted";
        public static final String RECORD_INUSED = "record.inUsed";
    }

    public interface CORS_FILTER {
        public static final String ALLOW_METHODS = "POST, PUT, GET, OPTIONS, DELETE";
        public static final String ALLOW_HEADERS = "X-CACHEABLE, Authorization, Content-Type, Current-Language, Current-Market, viettel-api-key, sso-two-factor-ticket";
    }

}
