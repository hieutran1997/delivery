package com.erp.process.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.process.bo.ProductBO;
import com.erp.process.dao.ProductDAO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class ProductService {
	@Autowired
	private VfData vfData;
	
	@Autowired
	private ProductDAO dao;
	
	public ProductBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	@Transactional
	public void saveOrUpdate(ProductBO entity) {
		vfData.saveOrUpdate(entity);
        vfData.flushSession();
	}
	
	@Transactional
    public void delete(Long id) {
		dao.deleteById(id);
    }
	
	 /**
     * @param form
     * @return
     */
    public PaginationUtil<ProductDTO> processSearch(SearchRequestUtil<ProductDTO> pageable) {
        return dao.getDataPaging(pageable, vfData);
    }
}
