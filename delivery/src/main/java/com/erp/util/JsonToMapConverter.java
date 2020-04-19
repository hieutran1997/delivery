/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author hieut
 */
@Converter
public class JsonToMapConverter
        implements AttributeConverter<Map<String, Object>, String> {

    private static final Logger logger = LoggerFactory.getLogger(JsonToMapConverter.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String convertToDatabaseColumn(Map<String, Object> customerInfo) {
        String customerInfoJson = null;
        try {
            customerInfoJson = objectMapper.writeValueAsString(customerInfo);
        } catch (JsonProcessingException jsonProcessingException) {
             logger.error("Json value khong cast duoc sang String!", jsonProcessingException);
        }
        return customerInfoJson;
    }

    @SuppressWarnings("unchecked")
	public Map<String, Object> convertToEntityAttribute(String customerInfoJSON) {
        Map<String, Object> customerInfo = null;
        try {
            customerInfo = (Map<String, Object>) objectMapper.readValue(customerInfoJSON, Map.class);
        } catch (IOException iOException) {
            logger.error("Json value khong cast duoc sang map!", iOException);
        }
        return customerInfo;
    }
}
