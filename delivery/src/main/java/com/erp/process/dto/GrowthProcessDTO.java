package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GrowthProcessDTO extends FileAttachment {
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
	
	private List<MultipartFile> files;
	
	private String productCode;
	
	private String productName;
}
