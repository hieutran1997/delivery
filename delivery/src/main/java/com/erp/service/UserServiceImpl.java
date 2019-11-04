package com.erp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.erp.dao.UserDao;
import com.erp.model.UserBO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserDao userDao;
    
    @Autowired
    private VfData vfData;

    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserBO user = userDao.findByUsername(userId);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    public List<UserBO> findAll() {
        List<UserBO> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }
    
    public PaginationUtil<UserBO> getDataSearch(SearchRequestUtil<UserBO> pageable){
        return userDao.getDataPaging(pageable, vfData);
    }

    @Override
    public void delete(long id) {
        userDao.delete(id);
    }

    @Override
    public UserBO save(UserBO user) {
        return userDao.save(user);
    }

    @Override
    public UserBO findUser(String userName) {
        UserBO user = userDao.findByUsername(userName);
        return user;
    }
}
