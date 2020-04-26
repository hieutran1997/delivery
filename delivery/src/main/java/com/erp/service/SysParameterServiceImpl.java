/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.service;

import com.erp.dao.SysParameterDAO;
import com.erp.model.SystemParameterModel;
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
	public SystemParameterModel save(SystemParameterModel user) {
		return sysParameterDao.save(user);
	}

	@Override
	public PaginationUtil<SystemParameterModel> getDataSearch(SearchRequestUtil<SystemParameterModel> pageable) {
		return sysParameterDao.getDataPaging(pageable, vfData);
	}

	@Override
	public void delete(Long id) {
		SystemParameterModel user = sysParameterDao.findById(id).orElse(null);
		if (user != null)
			sysParameterDao.delete(user);
	}

	@Override
	public SystemParameterModel findById(Long id) {
		SystemParameterModel data = sysParameterDao.findById(id).orElse(null);
		return data;
	}

}
