package com.erp.process.service;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.process.bo.ProductBO;
import com.erp.process.dao.ProductDAO;
import com.erp.process.dto.ProcessDTO;
import com.erp.process.dto.ProductDTO;
import com.erp.util.AES;
import com.erp.util.CommonUtil;
import com.erp.util.FileInfoBean;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

@Service
public class ProductService {
	public static Logger LOGGER = LoggerFactory.getLogger(ProductService.class);
	@Autowired
	private VfData vfData;

	@Autowired
	private ProductDAO dao;

	public ProductBO findById(Long sysActionId) {
		return dao.findById(sysActionId).orElse(null);
	}
	
	public ProductBO findByProductCode(String code) {
		List<ProductBO> data = dao.findByProductCode(code);
		if(data != null && data.size() > 0)
			return data.get(0);
		return null;
	}

	@Transactional
	public void saveOrUpdate(ProductBO entity) {
		vfData.saveOrUpdate(entity);
		vfData.flushSession();
	}

	@Transactional
	public void delete(Long id) {
		dao.deleteById(id);
	}

	public ProductDTO findByCode(String code) {
		return dao.findByCode(vfData, code);
	}

	/**
	 * @param form
	 * @return
	 */
	public PaginationUtil<ProductDTO> processSearch(SearchRequestUtil<ProductDTO> pageable, String orgCode) {
		PaginationUtil<ProductDTO> result = dao.getDataPagingWithOrgpath(pageable, vfData, orgCode);
		for (ProductDTO item : result.getData()) {
			item.setProductEncrypt(AES.encrypt(item.getProductCode()));
		}
		// Xu ly doc file
		try {
			CommonUtil.loadFileAttachment(result.getData(), "productId", FileStorage.FILE_TYPE.PROCDUCT);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}

	public List<ProcessDTO> getProcessByCodeWithoutSecure(String code) {
		List<ProcessDTO> result = dao.getProcessByCode(vfData, code);
		// Xu ly doc file
		try {
			loadFileAttachment(result);
		} catch (Exception e) {
			LOGGER.info("Loi doc file");
		}
		return result;
	}
	
	public List<ProductDTO> getProductByUsername(String username) {
		return dao.getAllProduct(vfData, username);
	}

	private void loadFileAttachment(List<ProcessDTO> lstData) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		if (CommonUtil.isNullOrEmpty(lstData)) {
			return;
		}
		List<String> lstGrowthUpProcessId = new ArrayList<>();
		List<String> lstManufactureId = new ArrayList<>();
		List<String> lstDeliveryId = new ArrayList<>();
		List<String> lstDisplayId = new ArrayList<>();

		Map<Long, List<FileInfoBean>> mapFile = new HashMap<>();
		for (ProcessDTO bean : lstData) {
			if (bean.getTypeProcess() == 1) { // Quá trình phát triển
				String objectId = BeanUtils.getProperty(bean, "objectId");
				lstGrowthUpProcessId.add(objectId);
			} else if (bean.getTypeProcess() == 2) { // Quá trình sản xuất
				String objectId = BeanUtils.getProperty(bean, "objectId");
				lstManufactureId.add(objectId);
			} else if (bean.getTypeProcess() == 3) { // Quá trình vận chuyển
				String objectId = BeanUtils.getProperty(bean, "objectId");
				lstDeliveryId.add(objectId);
			} else { // Quá trình bày bán
				String objectId = BeanUtils.getProperty(bean, "objectId");
				lstDisplayId.add(objectId);
			}
		}
		List<FileInfoBean> lstFileMP = new ArrayList<FileInfoBean>();
		List<FileInfoBean> lstFileGP = new ArrayList<FileInfoBean>();
		List<FileInfoBean> lstFileDEP = new ArrayList<FileInfoBean>();
		List<FileInfoBean> lstFileDIP = new ArrayList<FileInfoBean>();
		if (lstManufactureId != null && lstManufactureId.size() > 0) {
			lstFileMP = FileStorage.getListFileInfo(FileStorage.FILE_TYPE.MANUFACTURE_PROCESS, lstManufactureId);
		}
		if (lstGrowthUpProcessId != null && lstGrowthUpProcessId.size() > 0) {
			lstFileGP = FileStorage.getListFileInfo(FileStorage.FILE_TYPE.GROWTH_UP_PROCESS, lstGrowthUpProcessId);
		}
		if (lstDeliveryId != null && lstDeliveryId.size() > 0) {
			lstFileDEP = FileStorage.getListFileInfo(FileStorage.FILE_TYPE.DELIVERY_PROCESS, lstDeliveryId);
		}
		if (lstDisplayId != null && lstDisplayId.size() > 0) {
			lstFileDIP = FileStorage.getListFileInfo(FileStorage.FILE_TYPE.DISPLAY_PROCESS, lstDisplayId);
		}

		if (!CommonUtil.isNullOrEmpty(lstFileMP)) {
			for (FileInfoBean file : lstFileMP) {
				if (mapFile.get(file.getObjectId()) == null) {
					List<FileInfoBean> listFile = new ArrayList<>();
					listFile.add(file);
					mapFile.put(file.getObjectId(), listFile);
				} else {
					List<FileInfoBean> listFile = mapFile.get(file.getObjectId());
					listFile.add(file);
				}
			}
		}

		if (!CommonUtil.isNullOrEmpty(lstFileGP)) {
			for (FileInfoBean file : lstFileGP) {
				if (mapFile.get(file.getObjectId()) == null) {
					List<FileInfoBean> listFile = new ArrayList<>();
					listFile.add(file);
					mapFile.put(file.getObjectId(), listFile);
				} else {
					List<FileInfoBean> listFile = mapFile.get(file.getObjectId());
					listFile.add(file);
				}
			}
		}

		if (!CommonUtil.isNullOrEmpty(lstFileDEP)) {
			for (FileInfoBean file : lstFileDEP) {
				if (mapFile.get(file.getObjectId()) == null) {
					List<FileInfoBean> listFile = new ArrayList<>();
					listFile.add(file);
					mapFile.put(file.getObjectId(), listFile);
				} else {
					List<FileInfoBean> listFile = mapFile.get(file.getObjectId());
					listFile.add(file);
				}
			}
		}

		if (!CommonUtil.isNullOrEmpty(lstFileDIP)) {
			for (FileInfoBean file : lstFileDIP) {
				if (mapFile.get(file.getObjectId()) == null) {
					List<FileInfoBean> listFile = new ArrayList<>();
					listFile.add(file);
					mapFile.put(file.getObjectId(), listFile);
				} else {
					List<FileInfoBean> listFile = mapFile.get(file.getObjectId());
					listFile.add(file);
				}
			}
		}

		for (ProcessDTO bean : lstData) {
			String objectId = "";
			objectId = BeanUtils.getProperty(bean, "objectId");
			List<FileInfoBean> listFile = mapFile.get(Long.valueOf(objectId));
			Map<String, List<FileInfoBean>> fileAttachment = new HashMap<>();
			fileAttachment.put("file", listFile);
			BeanUtils.setProperty(bean, "fileAttachment", fileAttachment);
		}

	}

	public boolean validateBeforeSave(Long merchandiseRegisterId, Long orgId) {
		List<ProductBO> data = dao.findData(merchandiseRegisterId, orgId);
		if (data.size() > 0) {
			return false;
		}
		return true;
	}
}
