/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.SysRoleModel;
import com.erp.model.UserRoleModel;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.model.dto.UserRoleDTO;
import com.erp.model.form.RolePermissionForm;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author hieut
 */
public interface SysRoleDAO extends JpaRepository<SysRoleModel, Long> {
    public default PaginationUtil<SysRoleModel> getDataPaging(SearchRequestUtil<SysRoleModel> pageable, VfData vfData){
        PaginationUtil<SysRoleModel> results = new PaginationUtil<>();
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
        if(!CommonUtil.isNullOrEmpty(pageable.getData().getSysRoleName())){
            strCondition.append(" AND LOWER(syr.resource_name) LIKE LOWER(?) ");
            paramList.add("%" + pageable.getData().getSysRoleName()+ "%");
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
        vfData.setResultTransformer(query, SysRoleModel.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
    
    public default List<SelectedFormDTO> getSelectedData(VfData vfData){
        String sql = " Select code value, sys_role_name name from sys_role ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
    
    public default void saveUserRole(VfData vfData, UserRoleDTO userRole){
        //Xóa hết vai trò của username
        String sqlDelete = " delete from user_role where username = ? ";
        SQLQuery queryDelete = vfData.createSQLQuery(sqlDelete);
        queryDelete.setParameter(0, userRole.getUsername());
        queryDelete.executeUpdate();
        //Thêm mới vai trò của user
        for(SelectedFormDTO item : userRole.getPickList()){
            String sql = " insert into user_role(created_by, created_date, role_code, username) value(?, ?, ?, ?)";
            SQLQuery query = vfData.createSQLQuery(sql);
            query.setParameter(0, "admin");
            query.setParameter(1, new Date());
            query.setParameter(2, item.getValue());
            query.setParameter(3, userRole.getUsername());
            query.executeUpdate();
        }
    }
    
    public default List<SelectedFormDTO> getUserRole(VfData vfData, String username){
        String sql = " select role_code value from user_role where username = ? ";
        SQLQuery query = vfData.createSQLQuery(sql);
        query.setParameter(0, username);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
    
    public default void saveRolePermission(VfData vfData, RolePermissionForm rolePer){
        //Xóa hết quyền của vai trò
        String sqlDelete = " delete from sys_role_permission where role_code = ? ";
        SQLQuery queryDelete = vfData.createSQLQuery(sqlDelete);
        queryDelete.setParameter(0, rolePer.getRoleCode());
        queryDelete.executeUpdate();
         //Thêm mới quyền của vai trò
        for(RolePermissionDTO item : rolePer.getTarget()){
            String sql = " insert into sys_role_permission(has_add, has_edit, has_delete, has_approve, resource_code, role_code)"
                   + " value(?, ?, ?, ?, ?, ?)";
            SQLQuery query = vfData.createSQLQuery(sql);
            query.setParameter(0, item.isHasAdd());
            query.setParameter(1, item.isHasEdit());
            query.setParameter(2, item.isHasDelete());
            query.setParameter(3, item.isHasApprove());
            query.setParameter(4, item.getResourceCode());
            query.setParameter(5, rolePer.getRoleCode());
            query.executeUpdate();
        }
    }
    
    public default List<RolePermissionDTO> getRolePermission(VfData vfData, String roleCode){
        String sql = " select resource_code resourceCode, has_add hasAdd, has_edit hasEdit, has_delete hasDelete, has_approve hasApprove from sys_role_permission where role_code = ? ";
        SQLQuery query = vfData.createSQLQuery(sql);
        query.setParameter(0, roleCode);
        vfData.setResultTransformer(query, RolePermissionDTO.class);
        return query.list();
    }
}
