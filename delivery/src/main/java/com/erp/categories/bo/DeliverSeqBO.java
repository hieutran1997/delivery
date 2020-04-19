package com.erp.categories.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="deliver_seq")
public class DeliverSeqBO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "deliver_seq_id")
	private Long deliverSeqId;
	
	@Column(name = "code")
	private String code;
	
	@Column(name = "current_value")
	private Long currentValue;
	
	@Column(name = "next_value")
	private Long nextValue;
}
