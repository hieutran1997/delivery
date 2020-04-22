package com.erp.process.service;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.process.bo.ProductBO;
import com.erp.process.dao.ProductDAO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.CommonUtil;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class ProductService {
	public static Logger LOGGER = LoggerFactory.getLogger(ProductService.class);
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
	
	public ProductDTO findByCode(String code) {
		return dao.findByCode(vfData, code);
	}
	
	 /**
     * @param form
     * @return
     */
    public PaginationUtil<ProductDTO> processSearch(SearchRequestUtil<ProductDTO> pageable, String orgCode) {
    	PaginationUtil<ProductDTO> result = dao.getDataPagingWithOrgpath(pageable, vfData, orgCode);
	    // Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "productId", FileStorage.FILE_TYPE.PROCDUCT);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
    }
    
    public boolean validateBeforeSave(Long merchandiseRegisterId, Long orgId) {
    	List<ProductBO> data = dao.findData(merchandiseRegisterId, orgId);
    	if(data.size() > 0) {
    		return false;
    	}
    	return true;
    }
}
