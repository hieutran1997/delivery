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
@Table(name = "merchandise")
public class MerchandiseBO {
	@Id
    @Column(name = "merchandise_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long merchandise_id;
	
	@Column(name= "merchandise_code")
	private String merchandiseCode;
	
	@Column(name= "merchandise_name")
	private String merchandiseName;
	
	@Column(name= "cat_group_merchandise_id")
	private Long catGroupMerchandiseId;
	
	@Column(name= "cat_type_merchandise_id")
	private Long catTypeMerchandiseId;
	
	@Column(name= "cat_unit_id")
	private Long catUnitId;
	
	@Column(name = "effective_date")
	private Date effectiveDate;
	
	@Column(name = "expired_date")
	private Date expiredDate;
	
	@Column(name = "status")
	private Long status;
	
	@Column(name ="organization_id")
	private Long organizationId;
	
	@Column(name= "description")
	private String description;
	
	@Column(name= "url_qr_code")
	private String urlQRCode;

	@Column(name= "created_by")
	private String createdBy;

	@Column(name= "created_date")
	private Date createdDate;
}
