package com.erp.process.service;

import com.erp.process.bo.GrowthProcessBO;
import com.erp.process.dto.GrowthProcessDTO;

public interface GrowthProcessService {
	GrowthProcessBO saveOrUpdate(GrowthProcessDTO dto);
	void delete(Long id);
}
