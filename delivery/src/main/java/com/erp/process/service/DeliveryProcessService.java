package com.erp.process.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.process.bo.DeliveryProcessBO;
import com.erp.process.dao.DeliveryProcessDAO;
import com.erp.process.dto.DeliveryProcessDTO;
import com.erp.util.CommonUtil;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class DeliveryProcessService {
	public static Logger LOGGER = LoggerFactory.getLogger(DeliveryProcessService.class);
	@Autowired
	private DeliveryProcessDAO dao;

	@Autowired
	private VfData vfData;

	@Transactional
	public DeliveryProcessBO saveOrUpdate(DeliveryProcessDTO dto) {
		DeliveryProcessBO bo = new DeliveryProcessBO();
		String userName = CommonUtil.getCurrentUser().getUsername();
		bo.setCreatedBy(userName);
		bo.setCreatedDate(new Date());
		bo.setDeliveryBy(dto.getDeliveryBy());
		bo.setDescription(dto.getDescription());
		bo.setDocumentNumber(dto.getDocumentNumber());
		bo.setEvaluation(dto.getEvaluation());
		bo.setMerchandiseId(dto.getMerchandiseId());
		bo.setOrganizationDescId(dto.getOrganizationDescId());
		bo.setOrganizationSourceId(dto.getOrganizationSourceId());
		bo.setStartDate(dto.getStartDate());
		bo.setStatus(dto.getStatus());
		bo.setVerifiedBy(dto.getVerifiedBy());
		dao.finishPreviousProcess(vfData, dto.getMerchandiseId());
		dao.save(bo);

		return bo;
	}

	public void delete(Long id) {
		dao.deleteById(id);
	}

	public PaginationUtil<DeliveryProcessDTO> getDataSearch(SearchRequestUtil<DeliveryProcessDTO> pageable) {
		PaginationUtil<DeliveryProcessDTO> result = dao.getDataPaging(pageable, vfData);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "deliveryProcessId", FileStorage.FILE_TYPE.DELIVERY_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

	public List<DeliveryProcessDTO> findByMerchandiseId(String productCode) {
		List<DeliveryProcessDTO> result = dao.findByMerchandiseId(vfData, productCode);
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result, "deliveryProcessId", FileStorage.FILE_TYPE.DELIVERY_PROCESS);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}
}
