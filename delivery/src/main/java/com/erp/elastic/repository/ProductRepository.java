package com.erp.elastic.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.erp.elastic.index.ProductIndex;

public interface ProductRepository extends ElasticsearchRepository<ProductIndex, String>{

}
