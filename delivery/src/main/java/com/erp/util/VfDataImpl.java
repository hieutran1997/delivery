/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.erp.util;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.ReplicationMode;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.hibernate.type.BooleanType;
import org.hibernate.type.DoubleType;
import org.hibernate.type.IntegerType;
import org.hibernate.type.LongType;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.StringType;
import org.hibernate.type.TimestampType;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

/**
 * @author vietlv2
 * @since Jul, 2018
 * @version 1.0
 */
@Component
public class VfDataImpl implements VfData {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private HttpServletRequest req;

    private static final Logger LOGGER = LoggerFactory.getLogger(VfDataImpl.class);

    public VfDataImpl() {
        super();
    }

    @Override
    public SessionFactory getSessionFactory() {
        return entityManager.getEntityManagerFactory().unwrap(SessionFactory.class);
    }

    @Override
    public <T> T get(Class dataModel, Serializable id) {
        return (T) getSession().get(dataModel, id);
    }

    @Override
    public Session getSession() {
        return entityManager.unwrap(Session.class);
    }

    @Override
    public String getTableName(Class dataModel) {
        Class<?> modelClass = dataModel;
        Table table = modelClass.getAnnotation(Table.class);
        String tableName = table.name();
        return tableName;
    }

    @Override
    public String getNameId(Class dataModel) {
        String name = "";
        for (Method m : dataModel.getDeclaredMethods()) {
            Id a = m.getAnnotation(Id.class);
            Column col = m.getAnnotation(Column.class);
            if (a != null && col != null) {
                name = col.name();
                break;
            }
        }
        return columnName(name);
    }

    @Override
    public String columnName(String input) {
        try {
            String output = "";
            for (int i = 0; i < input.length(); i++) {
                if (input.charAt(i) == '_') {
                    i++;
                    output += Character.toUpperCase(input.charAt(i));
                } else {
                    output += Character.toLowerCase(input.charAt(i));
                }
            }
            return output;
        } catch (Exception ex) {
            LOGGER.error("ERROR: ", ex);
            return "ABC";
        }
    }

    @Override
    public void saveOrUpdate(Object dataObject) {
        getSession().saveOrUpdate(dataObject);
    }

    @Override
    public void save(Object dataObject) {
        getSession().save(dataObject);
    }
    
    @Override
    public void saveWithId(Object dataObject) {
        getSession().replicate(dataObject, ReplicationMode.EXCEPTION);
    }

    @Override
    public void delete(Object entity) {
        getSession().delete(entity);
    }

    @Override
    public void deleteByIds(List<Long> arrId, Class className, String idColumn) {
        if ((arrId != null) && !arrId.isEmpty()) {
            String hql = " DELETE FROM " + className.getName() + " t WHERE :idColumn" + " IN (:arrId) ";
            Query query = getSession().createQuery(hql);
            query.setParameter("idColumn", "t." + idColumn);
            query.setParameterList("arrId", arrId);
            query.executeUpdate();
        }
    }

    @Override
    public List<String> getLstUserSequence() throws Exception {
        String sql = "SELECT lower(sequence_name) FROM USER_SEQUENCES";
        SQLQuery query = getSession().createSQLQuery(sql);
        return query.list();
    }

    @Override
    public void deleteByIds(Long[] arrId, Class className, String idColumn) {
        if ((arrId != null) && (arrId.length > 0)) {
            String hql = " DELETE FROM " + className.getName() + " t WHERE :idColumn" + " IN (:arrId) ";
            Query query = getSession().createQuery(hql);
            query.setParameterList("arrId", arrId);
            query.setParameter("idColumn", "t." + idColumn);
            query.executeUpdate();
        }
    }

    @Override
    public void deleteById(Long id, Class className, String idColumn) {
        String hql = " DELETE FROM " + className.getName() + " t WHERE t." + idColumn + " = ? ";
        Query query = getSession().createQuery(hql);
        query.setParameter(0, id);
        query.executeUpdate();

    }

    @Override
    public <T> List<T> getAll(Class<T> tableName, String orderColumn) {
        Session session = getSession();
        String hql = " FROM " + tableName.getName() + " t ORDER BY " + "t." + orderColumn;
        Query query = session.createQuery(hql);
        return query.list();
    }

    @Override
    public <T> List<T> findByProperty(Class<T> tableName, String propertyName, Object value, String orderClause) {
        if (value == null) {
            String hql = " FROM " + tableName.getName() + " t WHERE t." + propertyName + " IS NULL  ORDER BY "
                    + orderClause;
            Query query = getSession().createQuery(hql);
            return query.list();
        } else {
            String hql = " FROM " + tableName.getName() + " t WHERE t." + propertyName + " = ? ORDER BY " + orderClause;
            Query query = getSession().createQuery(hql);
            query.setParameter(0, value);
            return query.list();
        }
    }

    @Override
    public <T> List<T> findByProperties(Class<T> tableName, Object... pairs) {
        String hql = " FROM " + tableName.getName() + " t WHERE 1 = 1 ";
        List<Object> lstParam = new ArrayList<Object>();

        if (pairs != null && pairs.length % 2 == 0) {
            int index = 0;
            for (Object obj : pairs) {
                if (index % 2 == 0) {
                    hql += " AND t." + (String) obj + " = ?";
                } else {
                    lstParam.add(obj);
                }
                index++;
            }
        }
        Query query = getSession().createQuery(hql);
        for (Integer pos = 0; pos < lstParam.size(); pos++) {
            query.setParameter(pos, lstParam.get(pos));
        }
        return query.list();
    }

    @Override
    public <T> List<T> findByIds(Class<T> tableName, String idColumn, String ids, String orderColumn) {
        StringBuilder hql = new StringBuilder(" FROM " + tableName.getName() + " t ");
        if (!ids.isEmpty()) {
            hql.append(" WHERE t.").append(idColumn).append(" IN ( ").append(ids).append(" ) ");
        }
        hql.append(" ORDER BY ").append("t.").append(orderColumn);
        Query query = getSession().createQuery(hql.toString());
        return query.list();
    }

    @Override
    public void flushSession() {
        getSession().flush();

    }

    @Override
    public void clear() {
        getSession().clear();

    }

    @Override
    public Query createQuery(String hql) {
        return getSession().createQuery(hql);
    }

    @Override
    public SQLQuery createSQLQuery(String sql) {
        return getSession().createSQLQuery(sql);
    }

    @Override
    public CallableStatement prepareCall(String sql) {
        TempWork temp = new TempWork(sql);
        getSession().doWork(temp);
        return temp.getCall();
    }

    @Override
    public Long getSequence(String sequenceName) {
        String sql = "SELECT " + sequenceName + ".nextval" + " FROM dual";
        Query query = getSession().createSQLQuery(sql);
        BigDecimal bigDecimal = (BigDecimal) query.uniqueResult();
        return bigDecimal.longValue();
    }

    @Override
    public Long getAutoIncrement(String tableName) {
        String sql = " SELECT AUTO_INCREMENT " + " FROM information_schema.TABLES "
                + " WHERE TABLE_SCHEMA = DATABASE() " + " AND UPPER(TABLE_NAME) = :tableName";
        SQLQuery query = createSQLQuery(sql);
        query.setParameter("tableName", " '" + tableName.toUpperCase() + "' ");
        query.addScalar("AUTO_INCREMENT", StandardBasicTypes.LONG);
        query.setMaxResults(1);
        return (Long) query.uniqueResult();
    }

    @Override
    public boolean duplicate(Class className, String idColumn, Long idValue, String codeColumn, String codeValue) {
        String hql = " SELECT COUNT(*) FROM " + className.getName() + " t WHERE LOWER(t." + codeColumn + ") = ? ";
        if (idValue != null) {
            hql += " AND t." + idColumn + " != ? ";
        }
        Query query = createQuery(hql);
        query.setParameter(0, codeValue.trim().toLowerCase());
        if (idValue != null) {
            query.setParameter(1, idValue);
        }
        query.setMaxResults(1);
        Long count = (Long) query.uniqueResult();
        return count > 0;
    }

    @Override
    public boolean hasConstraint(Class className, String idColumn, Long idValue) {
        String hql = " SELECT COUNT(*) FROM " + className.getName() + " t WHERE t." + idColumn + " = ? ";
        Query query = createQuery(hql);
        query.setParameter(0, idValue);
        query.setMaxResults(1);
        Long count = (Long) query.uniqueResult();
        return count > 0;
    }

    @Override
    public String getOrderByClause(HttpServletRequest req, String defaultColumn, String... whitelist) {
        String inputColumn = req.getParameter("sort");
        String direction = req.getParameter("dir");
        String finalColumn = null;
        if (inputColumn == null || inputColumn.isEmpty()) {
            finalColumn = defaultColumn;
        } else {
            if (whitelist == null || whitelist.length == 0) {
                finalColumn = defaultColumn;
            } else {
                for (String s : whitelist) {
                    if (inputColumn.equals(s)) {
                        finalColumn = inputColumn;
                        break;
                    }
                }
                if (finalColumn == null) {
                    finalColumn = defaultColumn;
                }
            }
        }
        return " ORDER BY " + finalColumn + (direction == null || direction.isEmpty() ? "" : " " + direction);
    }

    @Override
    public void setResultTransformer(SQLQuery query, Class obj) {
        Field[] fileds = obj.getDeclaredFields();
        Map<String, String> mapFileds = new HashMap();
        for (Field filed : fileds) {
            mapFileds.put(filed.getName(), filed.getGenericType().toString());
        }
        List<String> aliasColumns = getReturnAliasColumns(query);
        for (String aliasColumn : aliasColumns) {
            String dataType = mapFileds.get(aliasColumn);
            if (dataType == null) {
                LOGGER.debug(aliasColumn + " is not defined");
            } else {
                Type hbmType = null;
                if ("class java.lang.Long".equals(dataType) || "long".equals(dataType)) {
                    hbmType = LongType.INSTANCE;
                } else if ("class java.lang.Integer".equals(dataType) || "int".equals(dataType)) {
                    hbmType = IntegerType.INSTANCE;
                } else if ("class java.lang.Double".equals(dataType)) {
                    hbmType = DoubleType.INSTANCE;
                } else if ("class java.lang.String".equals(dataType)) {
                    hbmType = StringType.INSTANCE;
                } else if ("class java.lang.Boolean".equals(dataType)) {
                    hbmType = BooleanType.INSTANCE;
                } else if ("class java.util.Date".equals(dataType)) {
                    hbmType = TimestampType.INSTANCE;
                }
                if (hbmType == null) {
                    LOGGER.debug(dataType + " is not supported");
                } else {
                    query.addScalar(aliasColumn, hbmType);
                }
            }
        }
        query.setResultTransformer(Transformers.aliasToBean(obj));

    }

    @Override
    public List<String> getReturnAliasColumns(SQLQuery query) {
        List<String> aliasColumns = new ArrayList();
        String sqlQuery = query.getQueryString();
        sqlQuery = sqlQuery.replace("\n", " ");
        sqlQuery = sqlQuery.replace("\t", " ");
        int numOfRightPythis = 0;
        int startPythis = -1;
        int endPythis = 0;
        boolean hasRightPythis = true;
        while (hasRightPythis) {
            char[] arrStr = sqlQuery.toCharArray();
            hasRightPythis = false;
            int idx = 0;
            for (char c : arrStr) {
                if (idx > startPythis) {
                    if ("(".equalsIgnoreCase(String.valueOf(c))) {
                        if (numOfRightPythis == 0) {
                            startPythis = idx;
                        }
                        numOfRightPythis++;
                    } else if (")".equalsIgnoreCase(String.valueOf(c))) {
                        if (numOfRightPythis > 0) {
                            numOfRightPythis--;
                            if (numOfRightPythis == 0) {
                                endPythis = idx;
                                break;
                            }
                        }
                    }
                }
                idx++;
            }
            if (endPythis > 0) {
                sqlQuery = sqlQuery.substring(0, startPythis) + " # " + sqlQuery.substring(endPythis + 1);
                hasRightPythis = true;
                endPythis = 0;
            }
        }
        String arrStr[] = sqlQuery.substring(0, sqlQuery.toUpperCase().indexOf(" FROM ")).split(",");
        for (String str : arrStr) {
            String[] temp = str.trim().split(" ");
            String alias = temp[temp.length - 1].trim();
            if (alias.contains(".")) {
                alias = alias.substring(alias.lastIndexOf(".") + 1).trim();
            }
            if (alias.contains(",")) {
                alias = alias.substring(alias.lastIndexOf(",") + 1).trim();
            }
            if (alias.contains("`")) {
                alias = alias.replace("`", "");
            }
            if (!aliasColumns.contains(alias)) {
                aliasColumns.add(alias);
            }
        }
        return aliasColumns;
    }

    @Override
    public List<String> getSelectColumns(SQLQuery query) {
        List<String> columns = new ArrayList();
        String sqlQuery = query.getQueryString();
        sqlQuery = sqlQuery.replace("\n", " ");
        sqlQuery = sqlQuery.replace("\t", " ");
        int numOfRightPythis = 0;
        int startPythis = -1;
        int endPythis = 0;
        boolean hasRightPythis = true;
        while (hasRightPythis) {
            char[] arrStr = sqlQuery.toCharArray();
            hasRightPythis = false;
            int idx = 0;
            for (char c : arrStr) {
                if (idx > startPythis) {
                    if ("(".equalsIgnoreCase(String.valueOf(c))) {
                        if (numOfRightPythis == 0) {
                            startPythis = idx;
                        }
                        numOfRightPythis++;
                    } else if (")".equalsIgnoreCase(String.valueOf(c))) {
                        if (numOfRightPythis > 0) {
                            numOfRightPythis--;
                            if (numOfRightPythis == 0) {
                                endPythis = idx;
                                break;
                            }
                        }
                    }
                }
                idx++;
            }
            if (endPythis > 0) {
                sqlQuery = sqlQuery.substring(0, startPythis) + " # " + sqlQuery.substring(endPythis + 1);
                hasRightPythis = true;
                endPythis = 0;
            }
        }
        sqlQuery = sqlQuery.substring(0, sqlQuery.toUpperCase().indexOf(" FROM "));
        sqlQuery = sqlQuery.substring(sqlQuery.toUpperCase().indexOf("SELECT") + 6, sqlQuery.length());
        String arrStr[] = sqlQuery.split(",");
        for (String str : arrStr) {
            String[] temp = str.trim().split(" ");
            String column = temp[0].trim();
            if (column.contains(".")) {
                column = column.substring(column.lastIndexOf(".") + 1).trim();
            }
            if (column.contains(",")) {
                column = column.substring(column.lastIndexOf(",") + 1).trim();
            }
            if (column.contains("`")) {
                column = column.replace("`", "");
            }
            if (!columns.contains(column)) {
                columns.add(column);
            }
        }
        return columns;
    }

    @Override
    public void commitTransaction() {
        Session session = getSession();
        if (session != null && session.isOpen()) {
            session.getTransaction().commit();
        }
    }

    @Override
    public <T> Page<T> listAll(Class dataModel, Pageable pageable) {
        // TODO Auto-generated method stub
        String hql = " FROM " + dataModel.getName() + " t";
        String countHsql = "SELECT count(*) ";
        hql = QueryUtils.applySorting(hql, pageable.getSort());
        Query objectQuery = getSession().createQuery(hql);
        Query countQuery = getSession().createQuery(countHsql + hql);
        objectQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        objectQuery.setMaxResults(pageable.getPageSize());
        return new PageImpl<T>(objectQuery.list(), pageable, (long) countQuery.uniqueResult());
    }

    @Override
    public <T> VfDataTable<T> find(Map<String, Object> paramList, Query countQuery, Query objectQuery) {
        VfDataTable<T> data = new VfDataTable<>();
        if (paramList != null && !paramList.isEmpty()) {
            Set<String> keys = paramList.keySet();
            for (String key : keys) {
                countQuery.setParameter(key, paramList.get(key));
                objectQuery.setParameter(key, paramList.get(key));
            }
        }
        Long totalRecord = (Long) countQuery.uniqueResult();
        String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }
        objectQuery.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        objectQuery.setMaxResults(CommonUtil.NVL(searchParams.getRows(), 10));

        List dataList = objectQuery.list();

        data.setData(dataList);
        data.setRecordsFiltered(totalRecord);
        data.setRecordsTotal(totalRecord);
        data.setFirst(CommonUtil.NVL(searchParams.getFirst()));

        return data;
    }

    @Override
    public <T> VfDataTable<T> findHqlPaginationQuery(Map<String, Object> paramList, String select, String from) {
        String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }
        Query objectQuery = createQuery(select + from + searchParams.getOrderByClause());
        Query countQuery = createQuery("SELECT COUNT(*) " + from);

        VfDataTable<T> data = new VfDataTable<>();
        if (paramList != null && !paramList.isEmpty()) {
            Set<String> keys = paramList.keySet();
            for (String key : keys) {
                countQuery.setParameter(key, paramList.get(key));
                objectQuery.setParameter(key, paramList.get(key));
            }
        }
        Long totalRecord = (Long) countQuery.uniqueResult();
        objectQuery.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        objectQuery.setMaxResults(CommonUtil.NVL(searchParams.getRows(), 10));

        List dataList = objectQuery.list();

        data.setData(dataList);
        data.setRecordsFiltered(totalRecord);
        data.setRecordsTotal(totalRecord);
        data.setFirst(CommonUtil.NVL(searchParams.getFirst()));

        return data;
    }

    @Override
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, Map<String, Object> paramList, Class obj) {

        String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }

        String paginatedQuery = CommonUtil.buildPaginatedQuery(nativeQuery, orderBy, searchParams);
        String countStrQuery = CommonUtil.buildCountQuery(nativeQuery);

        SQLQuery query = createSQLQuery(paginatedQuery);
        setResultTransformer(query, obj);
        // pagination
        query.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        query.setMaxResults(CommonUtil.NVL(searchParams.getRows(), 10));
        SQLQuery countQuery = createSQLQuery(countStrQuery);

        if (paramList != null && !paramList.isEmpty()) {
            Set<String> keys = paramList.keySet();
            for (String key : keys) {
                countQuery.setParameter(key, paramList.get(key));
                query.setParameter(key, paramList.get(key));
            }
        }

        List<T> userList = query.list();
        Object totalRecords = countQuery.uniqueResult();

        DataTableResults<T> dataTableResult = new DataTableResults<T>();
        dataTableResult.setData(userList);
        if (!CommonUtil.isEmpty(userList)) {
            dataTableResult.setRecordsTotal(String.valueOf(totalRecords));
            dataTableResult.setRecordsFiltered(String.valueOf(totalRecords));
            dataTableResult.setFirst(String.valueOf(CommonUtil.NVL(searchParams.getFirst())));
        } else {
            dataTableResult.setRecordsFiltered("0");
            dataTableResult.setRecordsTotal("0");
        }

        return dataTableResult;
    }

    @Override
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, List<Object> paramList, Class obj) {
        return findPagination(nativeQuery, orderBy, paramList, obj, 10);
    }

    private <T> DataTableResults<T> findPagination(String nativeQuery, String orderBy, List<Object> paramList, Class obj, int limit) {
        Date _date = new Date();
    	String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }

        String paginatedQuery = CommonUtil.buildPaginatedQuery(nativeQuery, orderBy, searchParams);
        String countStrQuery = CommonUtil.buildCountQuery(nativeQuery);
        LOGGER.info("paginatedQuery: "+ paginatedQuery);
        LOGGER.info("countStrQuery: "+ countStrQuery);
        SQLQuery query = createSQLQuery(paginatedQuery);
        setResultTransformer(query, obj);
        // pagination
        query.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        query.setMaxResults(CommonUtil.NVL(searchParams.getRows(), limit));
        SQLQuery countQuery = createSQLQuery(countStrQuery);

        if (!CommonUtil.isNullOrEmpty(paramList)) {
            int paramSize = paramList.size();
            for (int i = 0; i < paramSize; i++) {
                countQuery.setParameter(i, paramList.get(i));
                query.setParameter(i, paramList.get(i));
            }
        }

        List<T> userList = query.list();
        Object totalRecords = countQuery.uniqueResult();

        DataTableResults<T> dataTableResult = new DataTableResults<T>();
        dataTableResult.setData(userList);
        if (!CommonUtil.isEmpty(userList)) {
            dataTableResult.setRecordsTotal(String.valueOf(totalRecords));
            dataTableResult.setRecordsFiltered(String.valueOf(totalRecords));
            dataTableResult.setFirst(String.valueOf(CommonUtil.NVL(searchParams.getFirst())));
        } else {
            dataTableResult.setRecordsFiltered("0");
            dataTableResult.setRecordsTotal("0");
        }
        
        LOGGER.info("time query: "+ (new Date().getTime() - _date.getTime()));
        return dataTableResult;
    }

    @Override
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, List<Object> paramList, Class obj, int limit) {
        return findPagination(nativeQuery, orderBy, paramList, obj, limit);
    }
    /**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    @Override
    public <T> DataTableResults<T> findPaginationQuery(String nativeQuery, String orderBy, Map<String, Object> mapParams, Class obj, int limit) {
        return findPagination(nativeQuery, orderBy, mapParams, obj, limit);
    }
    private <T> DataTableResults<T> findPagination(String nativeQuery, String orderBy, Map<String, Object> mapParams, Class obj, int limit) {
        String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }

        String paginatedQuery = CommonUtil.buildPaginatedQuery(nativeQuery, orderBy, searchParams);
        String countStrQuery = CommonUtil.buildCountQuery(nativeQuery);

        SQLQuery query = createSQLQuery(paginatedQuery);
        setResultTransformer(query, obj);
        // pagination
        query.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        query.setMaxResults(CommonUtil.NVL(searchParams.getRows(), limit));
        SQLQuery countQuery = createSQLQuery(countStrQuery);

        if (mapParams != null && !mapParams.isEmpty()) {
            countQuery.setProperties(mapParams);
            query.setProperties(mapParams);
        }

        List<T> userList = query.list();
        Object totalRecords = countQuery.uniqueResult();

        DataTableResults<T> dataTableResult = new DataTableResults<T>();
        dataTableResult.setData(userList);
        if (!CommonUtil.isEmpty(userList)) {
            dataTableResult.setRecordsTotal(String.valueOf(totalRecords));
            dataTableResult.setRecordsFiltered(String.valueOf(totalRecords));
            dataTableResult.setFirst(String.valueOf(CommonUtil.NVL(searchParams.getFirst())));
        } else {
            dataTableResult.setRecordsFiltered("0");
            dataTableResult.setRecordsTotal("0");
        }

        return dataTableResult;
    }
    /**
     * @param list
     * @param obj
     * @return
     */
    @Override
    public <T> List<T> list(String nativeQuery, List<Object> paramList, Class obj) {
        SQLQuery query = createSQLQuery(nativeQuery);
        setResultTransformer(query, obj);

        if (!CommonUtil.isNullOrEmpty(paramList)) {
            int paramSize = paramList.size();
            for (int i = 0; i < paramSize; i++) {
                query.setParameter(i, paramList.get(i));
            }
        }
        return query.list();
    }

    /**
     * @param list
     * @param obj
     * @return
     */
    @Override
    public <T> List<T> list(String nativeQuery, Map<String, Object> mapParams, Class obj) {
        SQLQuery query = createSQLQuery(nativeQuery);
        setResultTransformer(query, obj);

        if (mapParams != null && !mapParams.isEmpty()) {
            query.setProperties(mapParams);
        }
        return query.list();
    }

    /**
     * @param get
     * @param obj
     * @return
     */
    @Override
    public <T> T get(String nativeQuery, List<Object> paramList, Class obj) {
        SQLQuery query = createSQLQuery(nativeQuery);
        setResultTransformer(query, obj);

        if (!CommonUtil.isNullOrEmpty(paramList)) {
            int paramSize = paramList.size();
            for (int i = 0; i < paramSize; i++) {
                query.setParameter(i, paramList.get(i));
            }
        }
        query.setMaxResults(1);
        return (T) query.uniqueResult();
    }

    /**
     * @param get
     * @param obj
     * @return
     */
    @Override
    public <T> T get(String nativeQuery, Map<String, Object> mapParams, Class obj) {
        SQLQuery query = createSQLQuery(nativeQuery);
        setResultTransformer(query, obj);

        if (mapParams != null && !mapParams.isEmpty()) {
            query.setProperties(mapParams);
        }
        query.setMaxResults(1);
        return (T) query.uniqueResult();
    }
    /**
     * 
     * @param findPaginationQuery
     * @param obj
     * @return
     */
    @Override
    public DataTableResults findPaginationQueryMap(String countStrQuery, String nativeQuery, String orderBy, List<Object> paramList, int limit) {
        Date _date = new Date();
        String _search = req.getParameter("_search");
        SearchParams searchParams = new SearchParams();
        if (!CommonUtil.isNullOrEmpty(_search)) {
            searchParams = new Gson().fromJson(_search, SearchParams.class);
        }

        String paginatedQuery = CommonUtil.buildPaginatedQuery(nativeQuery, orderBy, searchParams);
        LOGGER.info("paginatedQuery: "+ paginatedQuery);
        LOGGER.info("countStrQuery: "+ countStrQuery);
        SQLQuery query = createSQLQuery(paginatedQuery);
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);

        query.setFirstResult(CommonUtil.NVL(searchParams.getFirst()));
        query.setMaxResults(CommonUtil.NVL(searchParams.getRows(), limit));
        SQLQuery countQuery = createSQLQuery(countStrQuery);

        if (!CommonUtil.isNullOrEmpty(paramList)) {
            int paramSize = paramList.size();
            for (int i = 0; i < paramSize; i++) {
                countQuery.setParameter(i, paramList.get(i));
                query.setParameter(i, paramList.get(i));
            }
        }

        List userList = query.list();
        Object totalRecords = countQuery.uniqueResult();

        DataTableResults dataTableResult = new DataTableResults();
        dataTableResult.setData(userList);
        if (!CommonUtil.isEmpty(userList)) {
            dataTableResult.setRecordsTotal(String.valueOf(totalRecords));
            dataTableResult.setRecordsFiltered(String.valueOf(totalRecords));
            dataTableResult.setFirst(String.valueOf(CommonUtil.NVL(searchParams.getFirst())));
        } else {
            dataTableResult.setRecordsFiltered("0");
            dataTableResult.setRecordsTotal("0");
        }

        LOGGER.info("time query: "+ (new Date().getTime() - _date.getTime()));
        return dataTableResult;
    }
}
