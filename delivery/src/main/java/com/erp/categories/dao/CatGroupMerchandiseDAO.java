package com.erp.categories.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.CatGroupMerchandiseBO;
import com.erp.categories.dto.CatGroupMerchandiseDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Repository
public interface CatGroupMerchandiseDAO extends CrudRepository<CatGroupMerchandiseBO, Long> {

	public default PaginationUtil<CatGroupMerchandiseDTO> getDataPaging(SearchRequestUtil<CatGroupMerchandiseDTO> pageable, VfData vfData) {
        PaginationUtil<CatGroupMerchandiseDTO> results = new PaginationUtil<>();
        int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
        StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
        List<Object> paramList = new ArrayList<Object>();
        StringBuilder sql = new StringBuilder(" SELECT cgm.cat_group_mechandise_id catGroupMerchandiseId, cgm.`code` code, cgm.`name` name from cat_group_mechandise cgm ");
        if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getCode())) {
            strCondition.append(" AND LOWER(cgm.`code`) = LOWER(?) ");
            paramList.add(pageable.getData().getCode());
        }
        if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getName())) {
            strCondition.append(" AND LOWER(cgm.`name`) LIKE LOWER(?) ");
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
        vfData.setResultTransformer(query, CatGroupMerchandiseDTO.class);
        results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
        results.setCurPage(pageable.getCurrent());
        results.setPerPage(pageable.getPageSize());
        results.setData(query.list());
        return results;
    }
	
	public default List<SelectedFormDTO> getSelectedData(VfData vfData){
        String sql = " Select code value, name from cat_group_mechandise ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
}
