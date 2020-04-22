package com.erp.process.controller;

import javax.servlet.http.HttpServletRequest;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.erp.process.bo.ManufactureProcessBO;
import com.erp.process.dto.ManufactureProcessDTO;
import com.erp.process.service.ManufactureProcessService;
import com.erp.service.ServiceChecker;
import com.erp.util.BaseController;
import com.erp.util.Constants;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.PermissionException;
import com.erp.util.Response;
import com.erp.util.SearchRequestUtil;
import com.erp.util.SysException;


@Controller
@RequestMapping("/process/manuafacture")
public class ManufactureProcessController extends BaseController {
	
	@Autowired
	private ManufactureProcessService service;
	
	@Autowired
	private ServiceChecker serviceChecker;
	
	@RequestMapping(value = "/postQuery", method = RequestMethod.POST)
	public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<ManufactureProcessDTO> pageable) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MANUFACTURE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		return new ResponseEntity<PaginationUtil<ManufactureProcessDTO>>(service.getDataSearch(pageable), HttpStatus.OK);
	}

	/**
	 * saveOrUpdate WorkProcessBO
	 * 
	 * @param req
	 * @param form
	 * @return
	 * @throws Exception
	 * @throws SysException
	 */
	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON)
	public @ResponseBody Response saveOrUpdate(HttpServletRequest req, ManufactureProcessDTO dto) throws Exception, SysException {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MANUFACTURE, Constants.PERMISSION.ADD)) {
			throw new PermissionException();
		}
		ManufactureProcessBO bo = service.saveOrUpdate(dto);
		FileStorage.append(FileStorage.FILE_TYPE.MANUFACTURE_PROCESS, bo.getManufactureProcessId(), dto.getFiles());
		return Response.success(Constants.RESPONSE_CODE.SUCCESS).withData(bo);
	}
	
	@RequestMapping(value = "/find-by-merid/{productCode}", method = RequestMethod.GET)
	public ResponseEntity<?> findBtMerId(@PathVariable(value = "productCode") String productCode) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MANUFACTURE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		return new ResponseEntity<>(service.findByMerchandiseId(productCode), HttpStatus.OK);
	}
	
}
