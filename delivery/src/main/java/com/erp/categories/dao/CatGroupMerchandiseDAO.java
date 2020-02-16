package com.erp.categories.dao;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SQLQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.categories.bo.CatGroupMerchandiseBO;
import com.erp.categories.dto.CatGroupMerchandiseDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.DataTableResults;
import com.erp.util.VfData;

@Repository
public interface CatGroupMerchandiseDAO extends CrudRepository<CatGroupMerchandiseBO, Long> {

	/**
	 * get data by datatable
	 * 
	 * @param vfData
	 * @param AllowanceTypeForm
	 * @return
	 */
	public default DataTableResults<CatGroupMerchandiseDTO> processSearch(VfData vfData, CatGroupMerchandiseDTO formData, HttpServletRequest req) {
		List<Object> paramList = new ArrayList();
		String nativeSQL = " SELECT cgm.cat_group_mechandise_id catGroupMerchandiseId, cgm.`code` code, cgm.`name` name from cat_group_mechandise cgm ";
		StringBuilder strCondition = new StringBuilder(" WHERE 1 = 1 ");
		CommonUtil.filter(formData.getCode(), strCondition, paramList, "cgm.code");
		CommonUtil.filter(formData.getName(), strCondition, paramList, "cgm.name");
		String orderBy = " ORDER BY cgm.cat_group_mechandise_id DESC ";
		return vfData.findPaginationQuery(nativeSQL + strCondition.toString(), orderBy, paramList, CatGroupMerchandiseDTO.class);
	}
	
	public default List<SelectedFormDTO> getSelectedData(VfData vfData){
        String sql = " Select code value, name from cat_group_mechandise ";
        SQLQuery query = vfData.createSQLQuery(sql);
        vfData.setResultTransformer(query, SelectedFormDTO.class);
        return query.list();
    }
}
