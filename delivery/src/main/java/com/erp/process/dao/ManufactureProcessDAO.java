package com.erp.process.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.process.bo.ManufactureProcessBO;
import com.erp.process.dto.ManufactureProcessDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Repository
@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public interface ManufactureProcessDAO extends CrudRepository<ManufactureProcessBO, Long>{
	public default List<ManufactureProcessDTO> findByMerchandiseId(VfData vfData, String productCode){
		StringBuilder sql = new StringBuilder(" SELECT gp.manufacture_process_id manufactureProcessId, pd.product_code productCode, pd.product_name productName"
				+ " , gp.start_date startDate, gp.end_date endDate, gp.people_processing peopleProcessing, gp.description, gp.factory factory "
				+ " FROM manufacture_process gp, product pd "
				+ " WHERE gp.merchandise_id = pd.product_id AND pd.product_code = ? ");
		SQLQuery query = vfData.createSQLQuery(sql.toString());
		query.setParameter(0, productCode);
        vfData.setResultTransformer(query, ManufactureProcessDTO.class);
        return query.list();
	}
	
	public default void finishPreviousProcess(VfData vfData, Long merchandiseId){
		StringBuilder sql = new StringBuilder(" UPDATE manufacture_process gp SET gp.end_date = SYSDATE() WHERE gp.merchandise_id = ? ");
		SQLQuery query = vfData.createSQLQuery(sql.toString());
		query.setParameter(0, merchandiseId);
		query.executeUpdate();
	}
	
	public default PaginationUtil<ManufactureProcessDTO> getDataPaging(SearchRequestUtil<ManufactureProcessDTO> pageable, VfData vfData) {
		PaginationUtil<ManufactureProcessDTO> results = new PaginationUtil<>();
		int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
		StringBuilder strCondition = new StringBuilder(" Where gp.merchandise_id = pd.product_id AND pd.product_code = ?");
		List<Object> paramList = new ArrayList<Object>();
		StringBuilder sql = new StringBuilder(" SELECT gp.manufacture_process_id manufactureProcessId, pd.product_code productCode, pd.product_name productName"
				+ ", gp.start_date startDate, gp.end_date endDate, gp.people_processing peopleProcessing, gp.description, gp.factory factory "
				+ " FROM manufacture_process gp, product pd ");
		if(pageable.getData() != null ) {
			paramList.add(pageable.getData().getProductCode());
		}
		else {
			paramList.add(0L);
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
		vfData.setResultTransformer(query, ManufactureProcessDTO.class);
		results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
		results.setCurPage(pageable.getCurrent());
		results.setPerPage(pageable.getPageSize());
		results.setData(query.list());
		return results;
	}
}
