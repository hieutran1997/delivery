package com.erp.process.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.model.dto.SelectedFormDTO;
import com.erp.process.bo.MerchandiseRegisterBO;
import com.erp.process.dto.MerchandiseRegisterDTO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Repository
@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public interface MerchandiseRegisterDAO extends CrudRepository<MerchandiseRegisterBO, Long> {
	public default PaginationUtil<MerchandiseRegisterDTO> getDataPaging(
			SearchRequestUtil<MerchandiseRegisterDTO> pageable, VfData vfData) {
		PaginationUtil<MerchandiseRegisterDTO> results = new PaginationUtil<>();
		int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
		StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
		List<Object> paramList = new ArrayList<Object>();
		StringBuilder sql = new StringBuilder(" SELECT cgm.cat_group_mechandise_id MerchandiseRegisterId, cgm.`type_code` typeCode, cgm.`code` code, cgm.`name` name from merchandise_register md ");

		if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getOrganizationPath())) {
			strCondition.append(" AND LOWER(md.`organization_path`) LIKE LOWER(?) ");
			paramList.add("%" + pageable.getData().getOrganizationPath() + "%");
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
		vfData.setResultTransformer(query, MerchandiseRegisterDTO.class);
		results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
		results.setCurPage(pageable.getCurrent());
		results.setPerPage(pageable.getPageSize());
		results.setData(query.list());
		return results;
	}
	
	MerchandiseRegisterBO findByMerchandiseId(Long merchandiseId);
	
	public default List<SelectedFormDTO> getSelectedDataByOrgPath(VfData vfData, String orgCode){
		String sql = "SELECT " + 
				" md.merchandise_register_id id" + 
				", (SELECT m.merchandise_code FROM merchandise m WHERE m.merchandise_id = md.merchandise_id) value" + 
				", (SELECT m.merchandise_name FROM merchandise m WHERE m.merchandise_id = md.merchandise_id) name" + 
				" FROM merchandise_register md WHERE md.organization_path LIKE ? AND status = 1";
		SQLQuery query = vfData.createSQLQuery(sql);
		query.setParameter(0, "%/" + orgCode + "/%");
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
	
	public default List<ProductDTO> getNewInstance(VfData vfData, Long merchandiseRegId){
		String sql = " SELECT md.merchandise_code productCode, md.merchandise_name productName FROM merchandise_register mr, merchandise md "
					+" WHERE md.merchandise_id = mr.merchandise_id AND mr.merchandise_register_id = ? ";
		SQLQuery query = vfData.createSQLQuery(sql);
		query.setParameter(0, merchandiseRegId);
        vfData.setResultTransformer(query, ProductDTO.class);
        return query.list();
    }
}
