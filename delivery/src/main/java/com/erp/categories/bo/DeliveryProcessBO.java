package com.erp.categories.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "delivery_process")
public class DeliveryProcessBO {
	@Id
    @Column(name = "delivery_process_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long deliveryProcessId;
	
	@Column(name ="merchandise_id")
	private Long merchandiseId;

	@Column(name ="start_date")
	private Date startDate;
	
	@Column(name ="end_date")
	private Date endDate;
	
	@Column(name ="address")
	private String address;
	
	@Column(name ="organization_id")
	private Long organizationId;
	
	@Column(name ="verified_by")
	private String verifiedBy;
	
	@Column(name = "status")
	private Long status;
	
	@Column(name ="evaluation")
	private String evaluation;
	
	@Column(name ="description")
	private String description;
	
	@Column(name ="document_number")
	private String documentNumber;
}
