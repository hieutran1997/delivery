package com.erp.elastic.index;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import lombok.Getter;
import lombok.Setter;

@Document(indexName = "merchandise", type = "merchandiseinfo")
@Getter
@Setter
public class MerchandiseIndex {
	@Id
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
