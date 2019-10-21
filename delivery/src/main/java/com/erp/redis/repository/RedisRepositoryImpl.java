/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.redis.repository;

import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hieut
 */
@Repository
public class RedisRepositoryImpl implements RedisRepository {

    private RedisTemplate<String, Object> redisTemplate;
    private HashOperations hashOperations;

    @Autowired
    public RedisRepositoryImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    private void init() {
        hashOperations = redisTemplate.opsForHash();
    }

    @Override
    public Map<Object, Object> findAll(String key) {
        return hashOperations.entries(key);
    }

    @Override
    public void add(String key, String id, String value) {
        hashOperations.put(key, id, value);
    }

    @Override
    public void delete(String key, String id) {
        hashOperations.delete(key, id);
    }

    @Override
    public String find(String key, String id) {
        return (String) hashOperations.get(key, id);
    }
}
