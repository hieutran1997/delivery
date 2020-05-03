package com.erp.elastic.index;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Getter;
import lombok.Setter;

@Document(indexName = "product", type = "productIndex")
@Getter
@Setter
public class ProductIndex {
	
	@Id
	private Long productId;

	@Field(type = FieldType.text)
	private String productCode;

	@Field(type = FieldType.text)
	private String productName;

	@Field(type = FieldType.Date)
	private Date dateOfManufacture;

	@Field(type = FieldType.Long)
	private Long quantity;

	@Field(type = FieldType.Long)
	private Long merchandiseRegisterId;

	@Field(type = FieldType.Long)
	private Long orgnizationId;
	
	@Field(type = FieldType.text)
	private String organizationPath;

	@Field(type = FieldType.Long)
	private Long typeOfManufacture;

	@Field(type = FieldType.Long)
	private Long status;

	@Field(type = FieldType.Long)
	private Long parentId;
	
	@Field(type = FieldType.text)
	private String organizationName;
	
	@Field(type = FieldType.text)
	private String productEncrypt;
	    
}
