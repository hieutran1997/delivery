package com.erp.process.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product")
public class ProductBO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "product_id")
	private Long productId;
	
	@Column(name = "product_code")
	private String productCode;
	
	@Column(name = "product_name")
	private String productName;
	
	@Column(name = "date_of_manufacture")
	private Date dateOfManufacture;
	
	@Column(name = "quantity")
	private Long quantity;
	
	@Column(name = "merchandise_register_id")
	private Long merchandiseRegisterId;
	
	@Column(name = "orgnization_id")
	private Long orgnizationId;
	
	@Column(name = "organization_path")
	private String organizationPath;
	
	@Column(name = "type_of_manufacture")
	private Long typeOfManufacture;
	
	@Column(name ="status")
	private Long status;
	
	@Column(name ="parent_id")
	private Long parentId;
}
