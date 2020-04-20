package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MerchandiseRegisterDTO {
	private Long merchandiseRegisterId;

	private Long merchandiseId;

	private Date startDate;

	private Date endDate;

	private Long status;

	private Long organizationId;

	private String organizationPath;

	private String createdBy;

	private Date createdDate;

	private String description;
	
	private List<MultipartFile> files;
}
