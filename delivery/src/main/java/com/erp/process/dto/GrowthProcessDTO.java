package com.erp.process.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GrowthProcessDTO {
	private Long growthProcessId;
	
	private Long processType;
	
	private Long merchandiseId;

	private Date startDate;
	
	private Date endDate;
	
	private String address;
	
	private String clientIp;
	
	private Long organizationId;
	
	private String description;
	
	private MultipartFile file;
}
