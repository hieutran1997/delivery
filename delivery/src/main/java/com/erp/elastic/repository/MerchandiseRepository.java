package com.erp.elastic.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.erp.elastic.index.MerchandiseIndex;

public interface MerchandiseRepository extends ElasticsearchRepository<MerchandiseIndex, String>{

}
