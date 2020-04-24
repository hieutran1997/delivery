package com.erp.process.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DisplayProcessDTO extends FileAttachment {
	private Long displayProcessId;

	private Long merchandiseId;

	private Date startDate;

	private Date endDate;

	private Long organizationId;

	private String description;

	private String peopleProcessing;

	private String factory;

	private String createdBy;

	private Date createdDate;

	private List<MultipartFile> files;

	private String productCode;

	private String productName;
}
