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
import com.erp.util.SysException;
import com.erp.util.VfData;

@Service("GrowthProcessService")
public class GrowthProcessService {
	public static Logger LOGGER = LoggerFactory.getLogger(GrowthProcessService.class);
	@Autowired
	private GrowthProcessDAO dao;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private VfData vfData;
	
	@Transactional
	public GrowthProcessBO saveOrUpdate(GrowthProcessDTO dto) {
		if(!checkBeforeSave(dto)) {
			return null;
		}
		GrowthProcessBO bo = new GrowthProcessBO();
		bo.setAddress(dto.getAddress());
		bo.setDescription(dto.getDescription());
		bo.setStartDate(new Date());
		bo.setMerchandiseId(dto.getMerchandiseId());
		try {
			String userName = CommonUtil.getCurrentUser().getUsername();
			OrganizationModel org = userService.getOrganizationByUser(userName);
			if(org != null) {
				bo.setOrganizationId(org.getId());
			}
		}
		catch(Exception ex) {
			System.out.println("lỗi");
		}
		dao.finishPreviousProcess(vfData, dto.getMerchandiseId());
		dao.save(bo);
		
		return bo;
	}

	public void delete(Long id) {
		dao.deleteById(id);
	}

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

	private boolean checkBeforeSave(GrowthProcessDTO dto) throws SysException{
		GrowthProcessDTO data = dao.getLastestData(vfData, dto.getMerchandiseId());
		if(data == null) {
			return true;
		}
		else {
			if(dto.getStartDate() == null) {
				return false;
			}
			if(dto.getStartDate().after(data.getStartDate()) && (dto.getEndDate() != null && dto.getStartDate().before(dto.getEndDate()))) {
				return false;
			}
			else if(dto.getStartDate().before(data.getStartDate())) {
				if(dto.getEndDate() == null) {
					return false;
				}
			}
		}
		return true;
	}
}
