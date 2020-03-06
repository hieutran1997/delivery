package com.erp.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.erp.model.UserModel;
import com.erp.model.UserRoleModel;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserDao extends JpaRepository<UserModel, Long> {
    
    UserModel findByUsername(String username);
    
    public default PaginationUtil<UserModel> getDataPaging(SearchRequestUtil<UserModel> pageable, VfData vfData){
        PaginationUtil<UserModel> results = new PaginationUtil<>();
        int start = (pageable.getCurrent()-1) * pageable.getPageSize();
        
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder(" SELECT id, username, first_name firstname, last_name lastname, age, organization_code organizationCode, type_of_user typeOfUser FROM user ");
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getFirstname())){
            strCondition.append(" AND LOWER(first_name) LIKE ? ");
            paramList.add("%" + pageable.getData().getFirstname() + "%");
        }
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getLastname())){
            strCondition.append(" AND LOWER(last_name) LIKE ? ");
            paramList.add("%" + pageable.getData().getLastname()+ "%");
        }
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getOrganizationCode())){
            strCondition.append(" AND organization_code = ? ");
            paramList.add(pageable.getData().getOrganizationCode());
        }
        sql.append(strCondition);
        StringBuilder sqlCount = new StringBuilder("SELECT COUNT(*) FROM (");
        sqlCount.append(sql.toString());
        sqlCount.append(") u ");
        SQLQuery queryCount = vfData.createSQLQuery(sqlCount.toString());
        SQLQuery query = vfData.createSQLQuery(sql.toString());
        query.setFirstResult(CommonUtil.NVL(start));
		query.setMaxResults(CommonUtil.NVL(pageable.getPageSize(), 10));
        for (int i = 0; i < paramList.size(); i++) {
            query.setParameter(i, paramList.get(i));
            if(paramList.size() > 2){
                if(paramList.size() - i > 2){
                    queryCount.setParameter(i, paramList.get(i));
                }
            }
        }
        vfData.setResultTransformer(query, UserModel.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
    
    @Transactional
    public default Long addRole(UserRoleModel data, VfData vfData){
        UserRoleModel instance = new UserRoleModel();
        StringBuilder sql = new StringBuilder("insert into user_role (created_by, created_date, role_code, username) ");
        String values = " values (?, ?, ?, ?)";
        sql.append(values);
        SQLQuery query = vfData.createSQLQuery(sql.toString());
        //query.setParameter(0, sql)
        return (long) query.executeUpdate();
        
    }
    
}
