package com.erp.categories.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.categories.bo.MerchandiseBO;
import com.erp.categories.dao.MerchandiseDAO;
import com.erp.categories.dto.MerchandiseDTO;
import com.erp.elastic.index.MerchandiseIndex;
import com.erp.elastic.repository.MerchandiseRepository;
import com.erp.model.dto.SelectedFormDTO;
import com.erp.util.CommonUtil;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class MerchandiseService {
	@Autowired
	private VfData vfData;
	
	@Autowired
	private MerchandiseDAO dao;
	
	@Autowired
	private MerchandiseRepository repository;
	
	public MerchandiseBO findById(Long merchandiseId) {
		return dao.findById(merchandiseId).orElse(null);
	}
	
	@Transactional
	public void saveOrUpdate(MerchandiseBO entity) {
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
    public PaginationUtil<MerchandiseDTO> processSearch(SearchRequestUtil<MerchandiseDTO> pageable) {
        return dao.getDataPaging(pageable, vfData);
    }
    
    public List<SelectedFormDTO> getSelectedData(){
    	return dao.getSelectedData(vfData);
    }
    
    public void saveToElastic(MerchandiseBO entity) {
    	MerchandiseIndex instance = new MerchandiseIndex();
    	try {
			CommonUtil.copyProperties(instance, entity);
			repository.save(instance);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
}
