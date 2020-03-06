/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.erp.util;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author vietlv2
 * @since Jul, 2018
 * @version 1.0
 */
public interface VfData {
	/**
	 * Get session factory.
	 *
	 * @return
	 */
	public SessionFactory getSessionFactory();

	/**
	 * Get object by ID.
	 *
	 * @param dataModel
	 * @param id
	 * @return
	 */
	public <T> T get(Class dataModel, Serializable id);

	/**
	 * Get session.
	 *
	 * @return
	 */
	public Session getSession();

	/**
	 * Get table name from Entity object.
	 *
	 * @return
	 */
	public String getTableName(Class dataModel);

	/**
	 * Get name of column id.
	 *
	 * @return
	 */
	public String getNameId(Class dataModel);

	/**
	 * Chuyen xau kieu CSDL sang xau kieu Java, ky tu dau tien viet thuong.
	 *
	 * @param input
	 *            Xau dang ABC_DEF
	 * @return Xau dang abcDef
	 */
	public String columnName(String input);

	/**
	 * Save or update data object.
	 *
	 * @param dataObject
	 */
	public void saveOrUpdate(Object dataObject);

	/**
	 * Save data Object.
	 *
	 * @param dataObject
	 */
	public void save(Object dataObject);
	
	/**
	 * Save data Object with ID.
	 *
	 * @param dataObject
	 */
	public void saveWithId(Object dataObject);

	/**
	 * Delete object.
	 *
	 * @param entity
	 */
	public void delete(Object entity);

	/**
	 * Delete lisst object.
	 *
	 * @param arrId
	 * @param className
	 * @param idColumn
	 */
	public void deleteByIds(List<Long> arrId, Class className, String idColumn);

	/**
	 * Get sequnce name.
	 *
	 * @return
	 * @throws Exception
	 */
	public List<String> getLstUserSequence() throws Exception;

	/**
	 * Delete object data by list ID.
	 *
	 * @param arrId
	 * @param className
	 * @param idColumn
	 */
	public void deleteByIds(Long[] arrId, Class className, String idColumn);

	/**
	 * Delete object data by ID.
	 *
	 * @param id
	 * @param className
	 * @param idColumn
	 */
	public void deleteById(Long id, Class className, String idColumn);

	/**
	 * List all data by table.
	 *
	 * @param tableName
	 * @param orderColumn
	 * @return
	 */
	public <T> List<T> getAll(Class<T> tableName, String orderColumn);

	/**
	 * List all data by table with pagination.
	 *
	 * @param tableName
	 * @param orderColumn
	 * @return
	 */
	public <T> Page<T> listAll(Class dataModel, Pageable pageable);

	/**
	 * Find data by property.
	 *
	 * @param tableName
	 * @param propertyName
	 * @param value
	 * @param orderClause
	 * @return
	 */
	public <T> List<T> findByProperty(Class<T> tableName, String propertyName, Object value, String orderClause);

	/**
	 * Find data by list property.
	 *
	 * @param tableName
	 * @param pairs
	 * @return
	 */
	public <T> List<T> findByProperties(Class<T> tableName, Object... pairs);

	/**
	 * Find data by list ID.
	 *
	 * @param tableName
	 * @param idColumn
	 * @param ids
	 * @param orderColumn
	 * @return
	 */
	public <T> List<T> findByIds(Class<T> tableName, String idColumn, String ids, String orderColumn);

	/**
	 * Flush session.
	 */
	public void flushSession();

	/**
	 * Clear session.
	 */
	public void clear();

	/**
	 * Create HQL query.
	 *
	 * @param hql
	 * @return
	 */
	public Query createQuery(String hql);

	/**
	 * Create navtive SQL.
	 *
	 * @param sql
	 * @return
	 */
	public SQLQuery createSQLQuery(String sql);

	/**
	 * Excute function, proceduce.
	 *
	 * @param sql
	 * @return
	 */
	public CallableStatement prepareCall(String sql);

	/**
	 * Get sequence name.
	 *
	 * @param sequenceName
	 * @return
	 */
	public Long getSequence(String sequenceName);

	/**
	 * Increment seq.
	 *
	 * @param tableName
	 * @return
	 */
	public Long getAutoIncrement(String tableName);

	/**
	 * Check object duplicate.
	 *
	 * @param className
	 * @param idColumn
	 * @param idValue
	 * @param codeColumn
	 * @param codeValue
	 * @return
	 */
	public boolean duplicate(Class className, String idColumn, Long idValue, String codeColumn, String codeValue);

	/**
	 * Check contrains.
	 *
	 * @param className
	 * @param idColumn
	 * @param idValue
	 * @return
	 */
	public boolean hasConstraint(Class className, String idColumn, Long idValue);

	/**
	 * Menh de ORDER, khong dung StringEscapeUtils.
	 *
	 * @param req
	 *            HttpServletRequest. De lay 'sort', 'dir' tu nguoi dung nhap
	 *            vao.
	 * @param defaultColumn
	 *            Cot mac dinh
	 * @param whitelist
	 *            Danh sach cho phep
	 * @return
	 */
	public String getOrderByClause(HttpServletRequest req, String defaultColumn, String... whitelist);

	/**
	 * ham set result transformer cua cau query
	 *
	 * @param query
	 *            cau query
	 * @param obj
	 *            doi tuong
	 */
	public void setResultTransformer(SQLQuery query, Class obj);

	/**
	 * Get list alias column.
	 *
	 * @param query
	 * @return
	 */
	public List<String> getReturnAliasColumns(SQLQuery query);

   /**
     * Get list alias column.
     *
     * @param query
     * @return
     */
    public List<String> getSelectColumns(SQLQuery query);

	/**
	 * Commit transaction.
	 */
	public void commitTransaction();

	/**
	 * Query pagination.
	 * 
	 * @param paramList
	 * @param countQuery
	 * @param objectQuery
	 * @return
	 */
	public <T> VfDataTable<T> find(Map<String, Object> paramList, Query countQuery, Query objectQuery);
	/**
	 * Query pagination.
	 * 
	 * @param paramList
	 * @param countQuery
	 * @param objectQuery
	 * @return
	 */
	public <T> VfDataTable<T> findHqlPaginationQuery(Map<String, Object> paramList, String select, String from);

	/**
	 * 
	 * @param findPaginationQuery
	 * @param obj
	 * @return
	 */
	public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy,
			Map<String, Object> paramList, Class obj);
	
	/**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, List<Object> paramList, Class obj);
    /**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, List<Object> paramList, Class obj, int limit);
    /**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, Map<String, Object> mapParams, Class obj, int limit);
    /**
     * 
     * @param list
     * @param obj
     * @return
     */
    public <T> List<T> list(String nativeQuery, List<Object> paramList, Class obj);
    /**
     * 
     * @param list
     * @param obj
     * @return
     */
    public <T> List<T> list(String nativeQuery, Map<String, Object> mapParams, Class obj);
    /**
     * 
     * @param list
     * @param obj
     * @return
     */
    public <T> T get(String nativeQuery, List<Object> paramList, Class obj);
    /**
     * 
     * @param list
     * @param obj
     * @return
     */
    public <T> T get(String nativeQuery, Map<String, Object> mapParams, Class obj);
    /**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    public DataTableResults findPaginationQueryMap(String countQuery, String selectQuery, String orderBy, List<Object> paramList, int limit);
    
}
