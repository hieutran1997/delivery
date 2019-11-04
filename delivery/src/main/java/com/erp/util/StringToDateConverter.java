/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.util;

import org.apache.commons.beanutils.Converter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author vietlv2
 * @since Jul, 2018
 * @version 1.0
 */
public class StringToDateConverter implements Converter {

    public static final Logger LOGGER = LoggerFactory.getLogger(StringToDateConverter.class);

    @Override
    public Object convert(Class type, Object value) {
        if (value == null) {
            return null;
        } else if (value instanceof String) {
            try {
                return CommonUtil.convertStringToDate(value.toString());
            } catch (Exception e) {
                LOGGER.error("loi xay ra:", e);
                return null;
            }
        } else {
            return value;
        }
    }
}