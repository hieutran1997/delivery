package com.erp.categories.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.DeliverSeqBO;

@Repository
public interface DeliverSeqDAO extends CrudRepository<DeliverSeqBO, Long>{
	DeliverSeqBO findByCode(String code);
}
