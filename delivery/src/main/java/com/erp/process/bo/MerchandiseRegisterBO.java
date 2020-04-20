package com.erp.process.bo;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "merchandise_register")
public class MerchandiseRegisterBO extends FileAttachment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "merchandise_register_id")
	private Long merchandiseRegisterId;
	
	@Column(name = "merchandise_id")
	private Long merchandiseId;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "status")
	private Long status;
	
	@Column(name = "organization_id")
	private Long organizationId;
	
	@Column(name = "organization_path")
	private String organizationPath;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "description")
	private String description;
	
	@Transient
	private List<MultipartFile> files;
}
