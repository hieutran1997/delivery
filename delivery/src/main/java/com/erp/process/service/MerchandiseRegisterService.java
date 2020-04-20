package com.erp.process.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.model.dto.SelectedFormDTO;
import com.erp.process.bo.MerchandiseRegisterBO;
import com.erp.process.dao.MerchandiseRegisterDAO;
import com.erp.process.dto.MerchandiseRegisterDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class MerchandiseRegisterService {
	@Autowired
	private VfData vfData;
	
	@Autowired
	private MerchandiseRegisterDAO dao;
	
	public MerchandiseRegisterBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	public MerchandiseRegisterBO findByMerchandiseId(Long merchandiseId) {
		return dao.findByMerchandiseId(merchandiseId);
	}
	
	@Transactional
	public void saveOrUpdate(MerchandiseRegisterBO entity) {
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
    public PaginationUtil<MerchandiseRegisterDTO> processSearch(SearchRequestUtil<MerchandiseRegisterDTO> pageable) {
        return dao.getDataPaging(pageable, vfData);
    }
    
    public List<SelectedFormDTO> getSelectedDataByOrgPath(String orgPath){
    	return dao.getSelectedDataByOrgPath(vfData, orgPath);
    }
    
}
