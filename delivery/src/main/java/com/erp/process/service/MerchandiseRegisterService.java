package com.erp.process.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.categories.bo.DeliverSeqBO;
import com.erp.categories.dao.DeliverSeqDAO;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.process.bo.MerchandiseRegisterBO;
import com.erp.process.dao.MerchandiseRegisterDAO;
import com.erp.process.dto.MerchandiseRegisterDTO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class MerchandiseRegisterService {
	@Autowired
	private VfData vfData;
	
	@Autowired
	private MerchandiseRegisterDAO dao;
	
	@Autowired
	private DeliverSeqDAO deliverSeqDAO;
	
	public MerchandiseRegisterBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	public MerchandiseRegisterBO findByMerchandiseId(Long merchandiseId, Long orgId) {
		List<MerchandiseRegisterBO> result = dao.findData(merchandiseId, orgId);
		if(result != null && result.size() > 0)
			return result.get(0);
		return null;
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
    
    public List<SelectedFormDTO> getSelectedDataByOrgPath(String orgCode){
    	return dao.getSelectedDataByOrgPath(vfData, orgCode);
    }
    
    public ProductDTO getNewInstance(Long merchandiseRegId){
    	List<ProductDTO> result = dao.getNewInstance(vfData, merchandiseRegId);
    	if(result != null) {
    		ProductDTO data = result.get(0);
    		String newCode = data.getProductCode();
    		DeliverSeqBO seq = deliverSeqDAO.findByCode(newCode);
    		if(seq != null) {
        		String nextVal = String.valueOf(seq.getNextValue());
        		newCode += "_" + nextVal;
        		seq.setCurrentValue(seq.getNextValue());
        		seq.setNextValue(seq.getNextValue() + 1);
        		deliverSeqDAO.save(seq);
        	}
        	else {
        		seq = new DeliverSeqBO();
        		seq.setCode(newCode);
        		seq.setCurrentValue(1L);
        		seq.setNextValue(2L);
        		deliverSeqDAO.save(seq);
        		newCode += "_" + 1;
        	}
    		data.setProductCode(newCode);
    		return data;
    	}
    	return null;
    }
}
