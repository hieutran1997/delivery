package com.erp.categories.dto;

public class CatGroupMerchandiseDTO {
	private Long catGroupMerchandiseId;
	
	private String typeCode;
	
	private String code;

	private String name;

	public Long getCatGroupMerchandiseId() {
		return catGroupMerchandiseId;
	}

	public void setCatGroupMerchandiseId(Long catGroupMerchandiseId) {
		this.catGroupMerchandiseId = catGroupMerchandiseId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
}
