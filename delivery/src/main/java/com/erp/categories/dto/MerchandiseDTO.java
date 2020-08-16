package com.erp.categories.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MerchandiseDTO {
    private Long merchandiseId;
	
	private String merchandiseCode;
	
	private String merchandiseName;
	
	private Long catGroupMerchandiseId;
	
	private Long catTypeMerchandiseId;
	
	private Long catUnitId;
	
	private Date effectiveDate;
	
	private Date expiredDate;
	
	private Long status;
	
	private Long organizationId;
	
	private String description;
	
	private String urlQRCode;

	private String createdBy;

	private Date createdDate;
	
	private String organizationPath;
	
	private String typeMerchandise;
	
	private String groupMerchandise;
	
	private String unit;
	
	private long isRegistered;
}
