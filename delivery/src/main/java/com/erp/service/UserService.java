package com.erp.service;

import java.util.List;


import com.erp.model.User;

public interface UserService {
	User findUser(String userName);
    User save(User user);
    List<User> findAll();
    void delete(long id);
}
