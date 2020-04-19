package com.erp.service;

import java.util.List;

import com.erp.model.OrganizationModel;
import com.erp.model.UserModel;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;

public interface UserService {
    UserModel findUser(String userName);
    UserModel save(UserModel user);
    List<UserModel> findAll();
    void delete(Long id);
    PaginationUtil<UserModel> getDataSearch(SearchRequestUtil<UserModel> pageable);
    OrganizationModel getOrganizationByUser(String userName);
}
