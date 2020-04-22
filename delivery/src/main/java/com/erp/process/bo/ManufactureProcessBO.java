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
@Table(name = "manufacture_process")
public class ManufactureProcessBO extends FileAttachment{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "manufacture_process_id")
	private Long manufactureProcessId;
	
	@Column(name = "merchandise_id")
	private Long merchandiseId;
	
	@Column(name = "orgnization_id")
	private Long orgnizationId;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "people_processing")
	private String peopleProcessing;
	
	@Column(name = "factory")
	private String factory;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name ="created_date")
	private Long createdDate;
}
