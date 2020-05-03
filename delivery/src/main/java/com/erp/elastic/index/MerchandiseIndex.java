package com.erp.elastic.index;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Getter;
import lombok.Setter;

@Document(indexName = "merchandise", type = "merchandiseinfo")
@Getter
@Setter
public class MerchandiseIndex {
	@Id
	private Long merchandiseId;

	@Field(type = FieldType.text)
	private String merchandiseCode;

	@Field(type = FieldType.text)
	private String merchandiseName;

	@Field(type = FieldType.Long)
	private Long catGroupMerchandiseId;
	
	@Field(type = FieldType.Long)
	private Long catTypeMerchandiseId;

	@Field(type = FieldType.Date)
	private Long catUnitId;

	@Field(type = FieldType.Date)
	private Date effectiveDate;

	@Field(type = FieldType.Date)
	private Date expiredDate;

	@Field(type = FieldType.Long)
	private Long status;

	@Field(type = FieldType.Long)
	private Long organizationId;

	@Field(type = FieldType.text)
	private String description;

	@Field(type = FieldType.text)
	private String urlQRCode;

	@Field(type = FieldType.text)
	private String createdBy;

	@Field(type = FieldType.Date)
	private Date createdDate;

	@Field(type = FieldType.text)
	private String organizationPath;

	public MerchandiseIndex() {
	};

	public MerchandiseIndex(Long merchandise_id, String merchandiseCode, String merchandiseName,
			Long catGroupMerchandiseId, Long catTypeMerchandiseId, Long catUnitId, Date effectiveDate, Date expiredDate,
			Long status, Long organizationId, String description, String urlQRCode, String createdBy, Date createdDate,
			String organizationPath) {
		super();
		this.merchandiseId = merchandise_id;
		this.merchandiseCode = merchandiseCode;
		this.merchandiseName = merchandiseName;
		this.catGroupMerchandiseId = catGroupMerchandiseId;
		this.catTypeMerchandiseId = catTypeMerchandiseId;
		this.catUnitId = catUnitId;
		this.effectiveDate = effectiveDate;
		this.expiredDate = expiredDate;
		this.status = status;
		this.organizationId = organizationId;
		this.description = description;
		this.urlQRCode = urlQRCode;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.organizationPath = organizationPath;
	}

	@Override
	public String toString() {
		return "Merchandises{" + "id='" + merchandiseId + '\'' + ", merchandiseCode='" + merchandiseCode + '\''
				+ ", merchandiseName='" + merchandiseName + '\'' + ", catGroupMerchandiseId='" + catGroupMerchandiseId + '\''
				+ ", catTypeMerchandiseId='" + catTypeMerchandiseId + '\'' + ", catUnitId='" + catUnitId + '\''
				+ ", effectiveDate='" + effectiveDate + '\'' + ", organizationId='" + organizationId + '\'' 
				+ ", description='" + description + '\'' + ", expiredDate='" + expiredDate + '\'' 
				+ ", urlQRCode='" + urlQRCode + '\'' + ", organizationPath='" + organizationPath + '\'' + 
				'}';
	}

}
