package com.erp.categories.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "location")
public class LocationBO {
	
	@Id
    @Column(name = "location_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long locationId;
	
    @Column(name = "code")
    private String code;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "nation_id")
    private Long nationId;
    
    @Column(name = "type")
    private Long type;
    
    @Column(name = "parent_id")
    private Long parentId;
    
    @Column(name = "status")
    private Long status;

	/**
	 * @return the locationId
	 */
	public Long getLocationId() {
		return locationId;
	}

	/**
	 * @param locationId the locationId to set
	 */
	public void setLocationId(Long locationId) {
		this.locationId = locationId;
	}

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the nationId
	 */
	public Long getNationId() {
		return nationId;
	}

	/**
	 * @param nationId the nationId to set
	 */
	public void setNationId(Long nationId) {
		this.nationId = nationId;
	}

	/**
	 * @return the type
	 */
	public Long getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(Long type) {
		this.type = type;
	}

	/**
	 * @return the parentId
	 */
	public Long getParentId() {
		return parentId;
	}

	/**
	 * @param parentId the parentId to set
	 */
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	/**
	 * @return the status
	 */
	public Long getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(Long status) {
		this.status = status;
	}
}