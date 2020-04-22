package com.erp.process.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.model.OrganizationModel;
import com.erp.process.bo.GrowthProcessBO;
import com.erp.process.dao.GrowthProcessDAO;
import com.erp.process.dto.GrowthProcessDTO;
import com.erp.service.UserService;
import com.erp.util.CommonUtil;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service("GrowthProcessService")
public class GrowthProcessServiceImpl implements GrowthProcessService{
	public static Logger LOGGER = LoggerFactory.getLogger(GrowthProcessServiceImpl.class);
	@Autowired
	private GrowthProcessDAO dao;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private VfData vfData;
	
	@Override
	@Transactional
	public GrowthProcessBO saveOrUpdate(GrowthProcessDTO dto) {
		GrowthProcessBO bo = new GrowthProcessBO();
		bo.setAddress(dto.getAddress());
		bo.setDescription(dto.getDescription());
		bo.setStartDate(new Date());
		bo.setMerchandiseId(dto.getMerchandiseId());
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		if(org != null) {
			bo.setOrganizationId(org.getId());
		}
		dao.finishPreviousProcess(vfData, dto.getMerchandiseId());
		dao.save(bo);
		
		return bo;
	}

	@Override
	public void delete(Long id) {
		dao.deleteById(id);
	}

	@Override
	public PaginationUtil<GrowthProcessDTO> getDataSearch(SearchRequestUtil<GrowthProcessDTO> pageable) {
		PaginationUtil<GrowthProcessDTO> result = dao.getDataPaging(pageable, vfData);
	    // Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "growthProcessId", FileStorage.FILE_TYPE.GROWTH_UP_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

	@Override
	public List<GrowthProcessDTO> findByMerchandiseId(String productCode) {
		List<GrowthProcessDTO> result = dao.findByMerchandiseId(vfData, productCode);
		 // Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result, "growthProcessId", FileStorage.FILE_TYPE.GROWTH_UP_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

}
