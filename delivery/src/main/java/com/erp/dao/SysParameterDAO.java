/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.SystemParameterModel;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author hieut
 */
public interface SysParameterDAO extends JpaRepository<SystemParameterModel, Long> {

    public default PaginationUtil<SystemParameterModel> getDataPaging(SearchRequestUtil<SystemParameterModel> pageable, VfData vfData) {
        PaginationUtil<SystemParameterModel> results = new PaginationUtil<>();
        int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
        int end = start + pageable.getPageSize();

        String limit = " Limit ?, ?";
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder("  SELECT syr.id, syr.code, syr.sys_role_name sysRoleName FROM sys_role syr ");
        if (!CommonUtil.isNullOrEmpty(pageable.getData().getCode())) {
            strCondition.append(" AND LOWER(syr.code) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
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
            if (paramList.size() > 2) {
                if (paramList.size() - i > 2) {
                    queryCount.setParameter(i, paramList.get(i));
                }
            }
        }
        vfData.setResultTransformer(query, SystemParameterModel.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }

    public default List<SelectedFormDTO> getSelectedData(VfData vfData) {
        String sql = " Select code value, name name from sys_parameter ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }

    @Query(nativeQuery = true, value = "SELECT sp.value FROM sys_parameter sp WHERE sp.code = :code LIMIT 0,1 ")
    String select(@Param("code") String paramString);

    List<SystemParameterModel> findAll();

    @Query("SELECT t FROM SystemParameterModel t where LOWER(t.code) = LOWER(:code) ")
    List<SystemParameterModel> findConflictedCode(@Param("code") String paramString);

    @Query("SELECT t FROM SystemParameterModel t where LOWER(t.code) = LOWER(:code) AND t.systemParameterId != :systemParameterId ")
    List<SystemParameterModel> findConflictedCode(@Param("code") String paramString, @Param("systemParameterId") Long paramLong);

}
