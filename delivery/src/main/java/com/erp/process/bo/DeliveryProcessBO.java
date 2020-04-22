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
@Table(name = "delivery_process")
public class DeliveryProcessBO extends FileAttachment{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "delivery_process_id")
	private Long deliveryProcessId;
	
	@Column(name = "merchandise_id")
	private Long merchandiseId;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "organization_desc_id")
	private Long organizationDescId;
	
	@Column(name = "organization_source_id")
	private Long organizationSourceId;
	
	@Column(name = "verified_by")
	private String verified_by;
	
	@Column(name = "status")
	private Long status;
	
	@Column(name = "evaluation")
	private String evaluation;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "delivery_by")
	private String deliveryBy;
	
	@Column(name = "document_number")
	private String documentNumber;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name ="created_date")
	private Long createdDate;
}
