package com.erp.categories.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.CatTypeMerchandiseBO;

@Repository
public interface CatTypeMerchandiseDAO extends CrudRepository<CatTypeMerchandiseBO, Long> {

}
