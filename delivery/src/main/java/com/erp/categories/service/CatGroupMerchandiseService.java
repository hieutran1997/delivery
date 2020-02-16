package com.erp.categories.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.categories.bo.CatGroupMerchandiseBO;
import com.erp.categories.dao.CatGroupMerchandiseDAO;
import com.erp.categories.dto.CatGroupMerchandiseDTO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.DataTableResults;
import com.erp.util.VfData;

@Service
public class CatGroupMerchandiseService {

	@Autowired
	private VfData vfData;
	
	@Autowired
	private CatGroupMerchandiseDAO dao;
	
	public CatGroupMerchandiseBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	@Transactional
	public void saveOrUpdate(CatGroupMerchandiseBO entity) {
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
    public DataTableResults<CatGroupMerchandiseDTO> processSearch(CatGroupMerchandiseDTO form, HttpServletRequest req) {
        return dao.processSearch(vfData, form, req);
    }
    
    public List<SelectedFormDTO> getSelectedData(){
    	return dao.getSelectedData(vfData);
    }
}
