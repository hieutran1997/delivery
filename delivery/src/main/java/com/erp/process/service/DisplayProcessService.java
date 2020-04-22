package com.erp.process.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.process.bo.DisplayProcessBO;
import com.erp.process.dao.DisplayProcessDAO;
import com.erp.process.dto.DisplayProcessDTO;
import com.erp.service.UserService;
import com.erp.util.CommonUtil;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class DisplayProcessService {
	public static Logger LOGGER = LoggerFactory.getLogger(DisplayProcessService.class);
	@Autowired
	private DisplayProcessDAO dao;

	@Autowired
	private UserService userService;

	@Autowired
	private VfData vfData;

	@Transactional
	public DisplayProcessBO saveOrUpdate(DisplayProcessDTO dto) {
		DisplayProcessBO bo = new DisplayProcessBO();
		
		dao.finishPreviousProcess(vfData, dto.getMerchandiseId());
		dao.save(bo);

		return bo;
	}

	public void delete(Long id) {
		dao.deleteById(id);
	}

	public PaginationUtil<DisplayProcessDTO> getDataSearch(SearchRequestUtil<DisplayProcessDTO> pageable) {
		PaginationUtil<DisplayProcessDTO> result = dao.getDataPaging(pageable, vfData);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "displayProcessId", FileStorage.FILE_TYPE.DISPLAY_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

	public List<DisplayProcessDTO> findByMerchandiseId(String productCode) {
		List<DisplayProcessDTO> result = dao.findByMerchandiseId(vfData, productCode);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result, "displayProcessId", FileStorage.FILE_TYPE.DISPLAY_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}
}
