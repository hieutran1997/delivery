package com.erp.service;

import java.util.List;

import com.erp.model.UserBO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;

public interface UserService {
    UserBO findUser(String userName);
    UserBO save(UserBO user);
    List<UserBO> findAll();
    void delete(long id);
    PaginationUtil<UserBO> getDataSearch(SearchRequestUtil<UserBO> pageable);
}
