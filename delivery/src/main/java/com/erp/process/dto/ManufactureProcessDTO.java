package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManufactureProcessDTO extends FileAttachment{
	private Long manufactureProcessId;
	
	private Long merchandiseId;
	
	private Long orgnizationId;
	
	private Date startDate;
	
	private Date endDate;
	
	private String description;
	
	private String peopleProcessing;
	
	private String factory;
	
	private String createdBy;
	
	private Long createdDate;
	
	private List<MultipartFile> files;
	
	private String productCode;
	
	private String productName;
}
