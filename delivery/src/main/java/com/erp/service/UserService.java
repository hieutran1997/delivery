package com.erp.service;

import java.util.List;


import com.erp.model.UserBO;
import com.erp.util.SearchRequestUtil;
import org.springframework.data.domain.Page;

public interface UserService {
    UserBO findUser(String userName);
    UserBO save(UserBO user);
    List<UserBO> findAll();
    void delete(long id);
    Page<UserBO> getDataSearch(SearchRequestUtil pageable);
}
