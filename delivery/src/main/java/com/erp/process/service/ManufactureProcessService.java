package com.erp.process.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.model.OrganizationModel;
import com.erp.process.bo.ManufactureProcessBO;
import com.erp.process.dao.ManufactureProcessDAO;
import com.erp.process.dto.ManufactureProcessDTO;
import com.erp.service.UserService;
import com.erp.util.CommonUtil;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class ManufactureProcessService {
	public static Logger LOGGER = LoggerFactory.getLogger(ManufactureProcessService.class);
	@Autowired
	private ManufactureProcessDAO dao;

	@Autowired
	private UserService userService;

	@Autowired
	private VfData vfData;

	@Transactional
	public ManufactureProcessBO saveOrUpdate(ManufactureProcessDTO dto) {
		checkBeforeSave(dto);
		ManufactureProcessBO bo = new ManufactureProcessBO();
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		bo.setCreatedBy(userName);
		bo.setCreatedDate(new Date());
		bo.setDescription(dto.getDescription());
		bo.setEndDate(dto.getEndDate());
		bo.setFactory(dto.getFactory());
		bo.setMerchandiseId(dto.getMerchandiseId());
		bo.setOrgnizationId(org.getId());
		bo.setPeopleProcessing(dto.getPeopleProcessing());
		bo.setStartDate(dto.getStartDate());
		dao.finishPreviousProcess(vfData, dto.getMerchandiseId());
		dao.save(bo);
		return bo;
	}

	public void delete(Long id) {
		dao.deleteById(id);
	}

	public PaginationUtil<ManufactureProcessDTO> getDataSearch(SearchRequestUtil<ManufactureProcessDTO> pageable) {
		PaginationUtil<ManufactureProcessDTO> result = dao.getDataPaging(pageable, vfData);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "manufactureProcessId", FileStorage.FILE_TYPE.MANUFACTURE_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

	public List<ManufactureProcessDTO> findByMerchandiseId(String productCode) {
		List<ManufactureProcessDTO> result = dao.findByMerchandiseId(vfData, productCode);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result, "manufactureProcessId", FileStorage.FILE_TYPE.MANUFACTURE_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}
	
	public void checkBeforeSave(ManufactureProcessDTO dto) {
		ManufactureProcessDTO data = dao.getLastestData(vfData, dto.getMerchandiseId());
//		if(data == null) {
//			return;
//		}
//		else {
//			if(dto.getStartDate().after(data.getStartDate()) && dto.getStartDate().before(dto.getEndDate())) {
//				
//			}
//			else if(dto.getStartDate().before(data.getStartDate())) {
//				if(dto.getEndDate() != null) {
//					throw new WarningException();
//				}
//			}
//		}
	}
}
