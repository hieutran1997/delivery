package com.erp.process.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.erp.process.bo.ProductBO;
import com.erp.process.dto.ProcessDTO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Repository
@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
public interface ProductDAO extends CrudRepository<ProductBO, Long> {
	public default PaginationUtil<ProductDTO> getDataPagingWithOrgpath(SearchRequestUtil<ProductDTO> pageable,
			VfData vfData, String orgCode) {
		PaginationUtil<ProductDTO> results = new PaginationUtil<>();
		int start = (pageable.getCurrent() - 1) * pageable.getPageSize();
		StringBuilder strCondition = new StringBuilder(" Where 1 = 1");
		List<Object> paramList = new ArrayList<Object>();
		StringBuilder sql = new StringBuilder(
				"SELECT pd.product_id productId, pd.product_code productCode, pd.product_name productName, pd.date_of_manufacture dateOfManufacture, pd.status"
						+ "	, (SELECT DISTINCT org.organization_name FROM organization org WHERE org.id = pd.orgnization_id) organizationName, pd.type_of_manufacture typeOfManufacture FROM product pd ");
		if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(orgCode)) {
			strCondition.append(" AND LOWER(pd.`organization_path`) LIKE LOWER(?) ");
			paramList.add("%/" + orgCode + "/%");
		}
		if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getProductCode())) {
			strCondition.append(" AND LOWER(pd.`product_code`) LIKE LOWER(?) ");
			paramList.add("%" + pageable.getData().getProductCode() + "%");
		}
		if (pageable.getData() != null && !CommonUtil.isNullOrEmpty(pageable.getData().getProductName())) {
			strCondition.append(" AND LOWER(pd.`product_name`) LIKE LOWER(?) ");
			paramList.add("%" + pageable.getData().getProductName() + "%");
		}
		if (pageable.getData() != null && pageable.getData().getStatus() != null) {
			strCondition.append(" AND pd.status = ? ");
			paramList.add(pageable.getData().getStatus());
		}
		if (pageable.getData() != null && pageable.getData().getMerchandiseRegisterId() != null) {
			strCondition.append(" AND pd.merchandise_register_id = ? ");
			paramList.add(pageable.getData().getMerchandiseRegisterId());
		}
		if (pageable.getData() != null && pageable.getData().getOrgnizationId() != null) {
			strCondition.append(" AND pd.orgnization_id = ? ");
			paramList.add(pageable.getData().getOrgnizationId());
		}
		if (pageable.getData() != null && pageable.getData().getTypeOfManufacture() != null) {
			strCondition.append(" AND pd.type_of_manufacture = ? ");
			paramList.add(pageable.getData().getTypeOfManufacture());
		}
		if (pageable.getData() != null && pageable.getData().getDateOfManufacture() != null) {
			strCondition.append(" AND pd.date_of_manufacture >= ? ");
			paramList.add(pageable.getData().getDateOfManufacture());
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
		vfData.setResultTransformer(query, ProductDTO.class);
		results.setTotal(((BigInteger) queryCount.uniqueResult()).intValue());
		results.setCurPage(pageable.getCurrent());
		results.setPerPage(pageable.getPageSize());
		results.setData(query.list());
		return results;
	}
	
	List<ProductBO> findByProductCode(String code);

	@Query(value = "SELECT * FROM product WHERE merchandise_register_id = ?1 AND orgnization_id = ?2 AND `status` = 1", nativeQuery = true)
	List<ProductBO> findData(Long merchandiseRegisterId, Long orgId);
	
	public default ProductDTO findByCode(VfData vfData, String code) {
		List<Object> params = new ArrayList<Object>();
		String sql = "SELECT pd.product_id productId, pd.product_code productCode, pd.product_name productName, "
				+ " (SELECT organization_name FROM organization org WHERE org.id = pd.orgnization_id) organizationName "
				+ " FROM product pd WHERE pd.product_code = ?";
		params.add(code);
        return vfData.get(sql, params, ProductDTO.class);
	}
	
	public default List<ProcessDTO> getProcessByCode(VfData vfData, String code) {
		List<Object> params = new ArrayList<Object>();
		String sql = "SELECT vp.objectId, vp.startDate, vp.endDate, vp.organizationName, vp.peopleProcessing, vp.factory, vp.organizationDescName, vp.organizationSourceName"
				+ " , vp.evaluation, vp.documentNumber, vp.description, vp.typeProcess, vp.productId "
				+ " FROM v_product_process vp, product pd "
				+ " WHERE vp.productId = pd.product_id AND pd.product_code = ? "
				+ " ORDER by vp.typeProcess DESC";
		params.add(code);
        return vfData.list(sql, params, ProcessDTO.class);
	}
	
	public default List<ProductDTO> getAllProduct(VfData vfData, String username) {
		List<Object> params = new ArrayList<Object>();
		String sql = "SELECT pd.product_code productCode, pd.product_name productName FROM product pd, user us WHERE pd.organization_path like CONCAT('%',us.organization_code,'%') AND username = ?";
		params.add(username);
        return vfData.list(sql, params, ProductDTO.class);
	}
}
