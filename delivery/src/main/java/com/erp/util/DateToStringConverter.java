/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.util;

import java.util.Date;
import org.apache.commons.beanutils.Converter;

/**
 * @author vietlv2
 * @since Jul, 2018
 * @version 1.0
 */
public class DateToStringConverter implements Converter {

	@Override
	public Object convert(Class type, Object value) {
		if (value == null) {
			return null;
		} else if (value instanceof Date) {
			return CommonUtil.convertDateToString((Date) value);
		} else if (value instanceof Double) {
			return CommonUtil.formatNumber((Double) value);
		} else if (value instanceof Long) {
			return CommonUtil.formatNumber((Long) value);
		} else {
			return value.toString();
		}
	}
}
