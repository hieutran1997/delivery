package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryProcessDTO  extends FileAttachment{
	private Long deliveryProcessId;

	private Long merchandiseId;

	private Date startDate;

	private Date endDate;

	private Long organizationDescId;

	private Long organizationSourceId;

	private String verified_by;

	private Long status;

	private String evaluation;

	private String description;

	private String deliveryBy;

	private String documentNumber;

	private String createdBy;

	private Long createdDate;
	
	private List<MultipartFile> files;
	
	private String productCode;
	
	private String productName;
}
