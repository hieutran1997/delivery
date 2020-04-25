package com.erp.process.dto;

import java.util.Date;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessDTO extends FileAttachment{
	private Date startDate;
	private Date endDate;
	private String organizationName;
	private String peopleProcessing;
	private String factory;
	private String organizationDescName;
	private String organizationSourceName;
	private String evaluation;
	private String documentNumber;
	private String description;
	private Long typeProcess;
	private Long productId;
	private Long objectId;
}
