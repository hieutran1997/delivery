/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.SysParameterModel;
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
import org.springframework.stereotype.Repository;

/**
 *
 * @author hieut
 */
@Repository
@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public interface SysParameterDAO extends JpaRepository<SysParameterModel, Long> {

    public default PaginationUtil<SysParameterModel> getDataPaging(SearchRequestUtil<SysParameterModel> pageable, VfData vfData) {
        PaginationUtil<SysParameterModel> results = new PaginationUtil<>();
        int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder(" SELECT sp.sys_parameter_id sysParameterId, sp.`code`, sp.`name`, sp.`value`, sp.description, sp.status FROM sys_parameter sp ");
        if (!CommonUtil.isNullOrEmpty(pageable.getData().getCode())) {
            strCondition.append(" AND LOWER(sp.code) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
        }
        if (!CommonUtil.isNullOrEmpty(pageable.getData().getName())) {
            strCondition.append(" AND LOWER(sp.name) like LOWER(?) ");
            paramList.add("%" + pageable.getData().getName() + "%");
        }
        sql.append(strCondition);
        StringBuilder sqlCount = new StringBuilder("SELECT COUNT(*) FROM (");
        sqlCount.append(sql.toString());
        sqlCount.append(") r ");
        SQLQuery queryCount = vfData.createSQLQuery(sqlCount.toString());
        SQLQuery query = vfData.createSQLQuery(sql.toString());
        query.setFirstResult(CommonUtil.NVL(start));
		query.setMaxResults(CommonUtil.NVL(pageable.getPageSize(), 10));
        for (int i = 0; i < paramList.size(); i++) {
            query.setParameter(i, paramList.get(i));
            queryCount.setParameter(i, paramList.get(i));
        }
        vfData.setResultTransformer(query, SysParameterModel.class);
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

    List<SysParameterModel> findAll();

    @Query("SELECT t FROM SysParameterModel t where LOWER(t.code) = LOWER(:code) ")
    List<SysParameterModel> findConflictedCode(@Param("code") String paramString);
    
    @Query("SELECT t FROM SysParameterModel t where LOWER(t.code) = LOWER(:code) ")
    List<SysParameterModel> findByCode(@Param("code") String paramString);

    @Query("SELECT t FROM SysParameterModel t where LOWER(t.code) = LOWER(:code) AND t.sysParameterId != :systemParameterId ")
    List<SysParameterModel> findConflictedCode(@Param("code") String paramString, @Param("systemParameterId") Long paramLong);

}
