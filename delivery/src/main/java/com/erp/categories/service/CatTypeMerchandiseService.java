package com.erp.categories.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.categories.bo.CatTypeMerchandiseBO;
import com.erp.categories.dao.CatTypeMerchandiseDAO;
import com.erp.categories.dto.CatTypeMerchandiseDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class CatTypeMerchandiseService {
	@Autowired
	private VfData vfData;
	
	@Autowired
	private CatTypeMerchandiseDAO dao;
	
	public CatTypeMerchandiseBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	@Transactional
	public void saveOrUpdate(CatTypeMerchandiseBO entity) {
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
    public PaginationUtil<CatTypeMerchandiseDTO> processSearch(SearchRequestUtil<CatTypeMerchandiseDTO> pageable) {
        return dao.getDataPaging(pageable, vfData);
    }
    
    public List<SelectedFormDTO> getSelectedData(){
    	return dao.getSelectedData(vfData);
    }
}
