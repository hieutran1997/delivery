package com.erp.categories.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.MerchandiseBO;
import com.erp.categories.dto.MerchandiseDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Repository
@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public interface MerchandiseDAO extends CrudRepository<MerchandiseBO, Long> {
	public default PaginationUtil<MerchandiseDTO> getDataPaging(SearchRequestUtil<MerchandiseDTO> pageable, VfData vfData, String orgPath) {
        PaginationUtil<MerchandiseDTO> results = new PaginationUtil<>();
        int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder("SELECT md.merchandise_id merchandiseId, md.merchandise_code merchandiseCode, md.merchandise_name merchandiseName" 
        		+", md.effective_date effectiveDate, md.expired_date expiredDate, md.status" 
        		+", (SELECT ctm.name FROM cat_type_mechandise ctm WHERE ctm.cat_type_mechandise_id = md.cat_type_merchandise_id ) typeMerchandise" 
        		+", (SELECT cgm.name FROM cat_group_mechandise cgm WHERE cgm.cat_group_mechandise_id = md.cat_group_merchandise_id ) groupMerchandise" 
        		+", (SELECT unit.name FROM cat_unit unit WHERE unit.cat_unit_id = md.cat_unit_id ) unit"
        		+", (SELECT CASE COUNT(*) when 1 then 1 ELSE 0 end  from merchandise_register mr where mr.organization_path like ? and md.merchandise_id = mr.merchandise_id) isRegistered" 
        		+" FROM merchandise md");
        paramList.add("%"+orgPath+"%");
        if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getMerchandiseCode())) {
            strCondition.append(" AND LOWER(md.`merchandise_code`) = LOWER(?) ");
            paramList.add(pageable.getData().getMerchandiseCode());
        }
        if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getMerchandiseName())) {
            strCondition.append(" AND LOWER(md.`merchandise_name`) LIKE LOWER(?) ");
            paramList.add("%" + pageable.getData().getMerchandiseName() + "%");
        }
        if(pageable.getData() != null && pageable.getData().getCatTypeMerchandiseId() != null) {
        	strCondition.append(" AND LOWER(md.`cat_type_merchandise_id`) = ? ");
            paramList.add(pageable.getData().getCatTypeMerchandiseId());
        }
        if(pageable.getData() != null && pageable.getData().getCatGroupMerchandiseId() != null) {
        	strCondition.append(" AND LOWER(md.`cat_group_merchandise_id`) = ? ");
            paramList.add(pageable.getData().getCatGroupMerchandiseId());
        }
        if(pageable.getData() != null && pageable.getData().getCatUnitId() != null) {
        	strCondition.append(" AND LOWER(md.`cat_unit_id`) = ? ");
            paramList.add(pageable.getData().getCatUnitId());
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
        vfData.setResultTransformer(query, MerchandiseDTO.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
	
	public default List<SelectedFormDTO> getSelectedData(VfData vfData){
        String sql = " Select merchandise_code value, merchandise_name name from merchandise ";
		SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
}
