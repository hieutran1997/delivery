/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysParameterDAO;
import com.erp.model.SysParameterModel;
import com.erp.util.PaginationUtil;
import com.erp.util.SearchRequestUtil;
import com.erp.util.VfData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hieut
 */
@Service("SysParameterService")
public class SysParameterServiceImpl implements SysParameterService {
	
	@Autowired
	private SysParameterDAO sysParameterDao;

	@Autowired
	private VfData vfData;

	@Override
	public SysParameterModel save(SysParameterModel user) {
		return sysParameterDao.save(user);
	}

	@Override
	public PaginationUtil<SysParameterModel> getDataSearch(SearchRequestUtil<SysParameterModel> pageable) {
		return sysParameterDao.getDataPaging(pageable, vfData);
	}

	@Override
	public void delete(Long id) {
		SysParameterModel user = sysParameterDao.findById(id).orElse(null);
		if (user != null)
			sysParameterDao.delete(user);
	}

	@Override
	public SysParameterModel findById(Long id) {
		SysParameterModel data = sysParameterDao.findById(id).orElse(null);
		return data;
	}

}
