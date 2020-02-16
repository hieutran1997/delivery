package com.erp.categories.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.LocationBO;

@Repository
public interface LocationDAO extends CrudRepository<LocationBO, Long> {

}
