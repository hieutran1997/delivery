/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.dao;

import com.erp.model.OrganizationModel;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

import io.lettuce.core.dynamic.annotation.Param;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author hieut
 */
public interface OrganizationDAO extends JpaRepository<OrganizationModel, Long> {
	public default PaginationUtil<OrganizationModel> getDataPaging(SearchRequestUtil<OrganizationModel> pageable,
			VfData vfData) {
		PaginationUtil<OrganizationModel> results = new PaginationUtil<>();
		int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
		int end = start + pageable.getPageSize();

		String limit = " Limit ?, ?";
		StringBuilder strCondition = new StringBuilder(" Where 1 = 1 AND org.parent_code IS NULL ");
		List<Object> paramList = new ArrayList<Object>();
		StringBuilder sql = new StringBuilder(
				"  SELECT org.id, org.code, org.organization_name organizationName, org.address address"
				+ ", org.parent_code parentCode "
				+ ", IFNULL((SELECT DISTINCT 0 FROM organization org1 WHERE org1.parent_code = org.code), 1) isLeaf FROM organization org ");
		if (!CommonUtil.isNullOrEmpty(pageable.getData().getCode())) {
			strCondition.append(" AND LOWER(org.code) = LOWER(?) ");
			paramList.add(pageable.getData().getCode());
		}
		if (!CommonUtil.isNullOrEmpty(pageable.getData().getOrganizationName())) {
			strCondition.append(" AND LOWER(org.organizationName) LIKE LOWER(?) ");
			paramList.add("%" + pageable.getData().getOrganizationName() + "%");
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
		vfData.setResultTransformer(query, OrganizationModel.class);
		results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
		results.setCurPage(pageable.getCurrent());
		results.setPerPage(pageable.getPageSize());
		results.setData(query.list());
		return results;
	}
	
	public default List<OrganizationModel> getListChild(VfData vfData, String pcode){
		String sql = " SELECT org.id, org.code, org.organization_name organizationName, org.address address, org.parent_code parentCode"
					+", IFNULL((SELECT DISTINCT 0 FROM organization org1 WHERE org1.parent_code = org.code), 1) isLeaf "
					+ "FROM organization org WHERE org.parent_code = :code ";
		SQLQuery query = vfData.createSQLQuery(sql);
		query.setParameter("code", pcode);
		vfData.setResultTransformer(query, OrganizationModel.class);
		return query.list();
	}

	public default List<SelectedFormDTO> getSelectedData(VfData vfData) {
		String sql = " Select code value, organization_name name from organization ";
		SQLQuery query = vfData.createSQLQuery(sql);
		vfData.setResultTransformer(query, SelectedFormDTO.class);
		return query.list();
	}
	
	public default OrganizationModel getOrgByCode(VfData vfData, String code){
		String sql = " SELECT code, organization_name organizationName, organization_path organizationPath FROM organization org WHERE org.code = :code ";
		SQLQuery query = vfData.createSQLQuery(sql);
		query.setParameter("code", code);
		vfData.setResultTransformer(query, OrganizationModel.class);
		return (OrganizationModel) query.uniqueResult();
	}
}
