package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
	private Long productId;

	private String productCode;

	private String productName;

	private Date dateOfManufacture;

	private Long quantity;

	private Long merchandiseRegisterId;

	private Long orgnizationId;

	private String organizationPath;

	private Long typeOfManufacture;

	private Long status;

	private Long parentId;
	
	private List<MultipartFile> files;
}
