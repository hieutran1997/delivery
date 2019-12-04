/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.SysResourceModel;
import com.erp.model.dto.ResourceDTO;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author hieut
 */
public interface SysResourceDAO extends CrudRepository<SysResourceModel, Long> {

    public default PaginationUtil<ResourceDTO> getDataPaging(SearchRequestUtil<SysResourceModel> pageable, VfData vfData) {
        PaginationUtil<ResourceDTO> results = new PaginationUtil<>();
        int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
        int end = start + pageable.getPageSize();

        String limit = " Limit ?, ?";
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder(" SELECT syr.id, syr.code, syr.component, syr.icon, syr.parent_code parentCode"
                                            + " , syr.path_url pathUrl, syr.resource_name resourceName"
                                            + " , syr.type_of_resource typeOfResource, syr.orther_control ortherControls"
                                            + " FROM sys_resource syr ");
        if (!CommonUtil.isNullOrEmpty(pageable.getData().getCode())) {
            strCondition.append(" AND LOWER(syr.code) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
        }
        if (!CommonUtil.isNullOrEmpty(pageable.getData().getResourceName())) {
            strCondition.append(" AND LOWER(syr.resource_name) LIKE LOWER(?) ");
            paramList.add("%" + pageable.getData().getResourceName() + "%");
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
        vfData.setResultTransformer(query, ResourceDTO.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }

    public default List<RolePermissionDTO> getSelectedData(VfData vfData) {
        String sql = " select code resourceCode, resource_name resourceName from sys_resource ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, RolePermissionDTO.class);
        return query.list();
    }

    public default List<RolePermissionDTO> getSelectedPermission(VfData vfData, String roleCode) {
        String sql = " SELECT res.code resourceCode, res.resource_name resourceName, per.has_view hasView, per.has_add hasAdd, per.has_edit hasEdit, per.has_delete hasDelete"
                + " , per.has_approve hasApprove, res.orther_control ortherControlsOfResource, per.orther_control ortherControls "
                + " FROM sys_resource res LEFT JOIN sys_role_permission per ON res.code = per.resource_code "
                + " WHERE per.role_code = :role_code OR per.role_code IS NULL ";
        SQLQuery query = vfData.createSQLQuery(sql);
        query.setParameter("role_code", roleCode);
        vfData.setResultTransformer(query, RolePermissionDTO.class);
        return query.list();
    }
}
