package com.erp.process.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.process.bo.GrowthProcessBO;

@Repository
public interface GrowthProcessDAO extends CrudRepository<GrowthProcessBO, Long>{

}
