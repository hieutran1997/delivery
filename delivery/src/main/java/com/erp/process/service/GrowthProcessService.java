package com.erp.process.service;

import java.util.List;

import com.erp.process.bo.GrowthProcessBO;
import com.erp.process.dto.GrowthProcessDTO;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;

public interface GrowthProcessService {
	GrowthProcessBO saveOrUpdate(GrowthProcessDTO dto);
	void delete(Long id);
	PaginationUtil<GrowthProcessDTO> getDataSearch(SearchRequestUtil<GrowthProcessDTO> pageable);
	List<GrowthProcessDTO> findByMerchandiseId(String productCode);
}
