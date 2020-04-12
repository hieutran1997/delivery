package com.erp.process.bo;

import java.io.Serializable;
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

@Entity
@Getter
@Setter
@Table(name = "growth_process")
public class GrowthProcessBO extends FileAttachment implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    @Column(name = "growth_process_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long growthProcessId;
	
	@Column(name ="process_type")
	private Long processType;
	
	@Column(name ="merchandise_id")
	private Long merchandiseId;

	@Column(name ="start_date")
	private Date startDate;
	
	@Column(name ="end_date")
	private Date endDate;
	
	@Column(name ="address")
	private String address;
	
	@Column(name ="client_ip")
	private String clientIp;
	
	@Column(name ="organization_id")
	private Long organizationId;
	
	@Column(name ="description")
	private String description;
}
