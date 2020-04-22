package com.erp.process.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.erp.util.FileAttachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "display_process")
public class DisplayProcessBO extends FileAttachment{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "display_process_id")
	private Long displayProcessId;
	
	@Column(name = "merchandise_id")
	private Long merchandiseId;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "organization_id")
	private Long organizationId;

	@Column(name = "description")
	private String description;
	
	@Column(name = "people_processing")
	private String peopleProcessing;
	
	@Column(name = "factory")
	private String factory;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_date")
	private String createdDate;
}
