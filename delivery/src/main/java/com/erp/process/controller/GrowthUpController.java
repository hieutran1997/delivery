package com.erp.process.controller;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.erp.process.bo.GrowthProcessBO;
import com.erp.process.dto.GrowthProcessDTO;
import com.erp.process.service.GrowthProcessService;
import com.erp.util.Constants;
import com.erp.util.FileStorage;
import com.erp.util.Response;
import com.erp.util.SysException;

@RestController
@RequestMapping("/growth-up")
public class GrowthUpController {
	
	@Autowired
	private GrowthProcessService service;
	
	/**
	 * saveOrUpdate WorkProcessBO
	 * 
	 * @param req
	 * @param form
	 * @return
	 * @throws Exception
	 * @throws SysException
	 */
	@RequestMapping(value = "/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON)
	@Transactional
	public @ResponseBody Response saveOrUpdate(HttpServletRequest req, GrowthProcessDTO dto)
			throws Exception, SysException {
		GrowthProcessBO bo = service.saveOrUpdate(dto);
		FileStorage.append(FileStorage.FILE_TYPE.GROWTH_UP_PROCESS,
				bo.getGrowthProcessId(), dto.getFile());
		return Response.success(Constants.RESPONSE_CODE.SUCCESS).withData(bo);
	}
}
