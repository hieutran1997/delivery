/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.OrganizationModel;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author hieut
 */
public interface OrganizationDAO extends JpaRepository<OrganizationModel, Long> {
    public default PaginationUtil<OrganizationModel> getDataPaging(SearchRequestUtil<OrganizationModel> pageable, VfData vfData){
        PaginationUtil<OrganizationModel> results = new PaginationUtil<>();
        int start = (pageable.getCurrent()-1) * pageable.getPageSize();
        int end = start+ pageable.getPageSize();
        
        String limit = " Limit ?, ?";
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder("  SELECT syr.id, syr.code, syr.sys_role_name sysRoleName FROM sys_role syr ");
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getCode())){
            strCondition.append(" AND LOWER(syr.code) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
        }
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getOrganizationName())){
            strCondition.append(" AND LOWER(syr.resource_name) LIKE LOWER(?) ");
            paramList.add("%" + pageable.getData().getOrganizationName()+ "%");
        }
        sql.append(strCondition);
        StringBuilder sqlCount = new StringBuilder("SELECT COUNT(*) FROM (");
        sqlCount.append(sql.toString());
        sqlCount.append(") r ");
        SQLQuery queryCount = vfData.createSQLQuery(sqlCount.toString());
        sql.append(limit);
        SQLQuery query = vfData.createSQLQuery(sql.toString());
        paramList.add(start);
        paramList.add(end);
        for (int i = 0; i < paramList.size(); i++) {
            query.setParameter(i, paramList.get(i));
            if(paramList.size() > 2){
                if(paramList.size() - i > 2){
                    queryCount.setParameter(i, paramList.get(i));
                }
            }
        }
        vfData.setResultTransformer(query, OrganizationModel.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
}
