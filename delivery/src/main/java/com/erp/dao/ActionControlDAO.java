/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.ActionsControlModel;
import com.erp.model.ResourceControlModel;
import com.erp.model.dto.ActionControlDTO;
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

/**
 *
 * @author hieut
 */
public interface ActionControlDAO extends JpaRepository<ActionsControlModel, Long>{
    public default PaginationUtil<ActionsControlModel> getDataPaging(SearchRequestUtil<ActionsControlModel> pageable, VfData vfData){
        PaginationUtil<ActionsControlModel> results = new PaginationUtil<>();
        int start = (pageable.getCurrent()-1) * pageable.getPageSize();
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder("  SELECT syr.id, syr.code, syr.action_name actionName, text_html textHtml FROM sys_actions_control syr ");
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getCode())){
            strCondition.append(" AND LOWER(syr.code) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
        }
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getActionName())){
            strCondition.append(" AND LOWER(syr.action_name) LIKE LOWER(?) ");
            paramList.add("%" + pageable.getData().getActionName()+ "%");
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
            if(paramList.size() > 2){
                if(paramList.size() - i > 2){
                    queryCount.setParameter(i, paramList.get(i));
                }
            }
        }
        vfData.setResultTransformer(query, ActionsControlModel.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
    
    public default List<SelectedFormDTO> getSelectedData(VfData vfData){
        String sql = " Select code value, action_name name from sys_actions_control ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
    
    public default List<ActionControlDTO> getControl(VfData vfData, String resourceCode){
        String sql = " select rc.control_code controlCode, ac.text_html htmlCode from sys_actions_control ac "
                   + " inner join sys_resource_control rc on ac.`code` = rc.control_code where rc.resource_code = ?";
        SQLQuery query = vfData.createSQLQuery(sql);
        query.setParameter(0, resourceCode);
        vfData.setResultTransformer(query, ActionControlDTO.class);
        return query.list();
    }
    
    public default void mapResource(VfData vfData, ResourceControlModel control){
        
    }
}
