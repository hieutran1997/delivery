package com.erp.categories.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.CatUnitBO;

@Repository
public interface CatUnitDAO extends CrudRepository<CatUnitBO, Long> {

}
