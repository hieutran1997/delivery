/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.redis.repository;

import java.util.Map;

/**
 *
 * @author hieut
 */
public interface RedisRepository {
    /**
     * Return all docs
     */
    Map<Object, Object> findAll(String key);

    /**
     * Add key-value pair to Redis.
     */
    void add(String key, String id, String value);
    
    /**
     * Delete a key-value pair in Redis.
     */
    void delete(String key, String id);
    
    /**
     * find a docs
     */
    String find(String key, String id);
}
