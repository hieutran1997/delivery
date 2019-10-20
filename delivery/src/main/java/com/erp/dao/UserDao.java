package com.erp.dao;

import org.springframework.stereotype.Repository;

import com.erp.model.UserBO;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserDao extends JpaRepository<UserBO, Long> {
    UserBO findByUsername(String username);
}
