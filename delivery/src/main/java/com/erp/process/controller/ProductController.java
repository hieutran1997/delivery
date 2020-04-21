package com.erp.process.controller;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.MediaType;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.erp.model.OrganizationModel;
import com.erp.process.bo.ProductBO;
import com.erp.process.dto.ProductDTO;
import com.erp.process.service.ProductService;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.BaseController;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.FileStorage;
import com.erp.util.PermissionException;

@RestController
@RequestMapping("/process/product")
public class ProductController extends BaseController{
	public ProductController() {
		LOGGER = LoggerFactory.getLogger(ProductController.class);
	}
	
	@Autowired
	private ServiceChecker serviceChecker;
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private UserService userService;
	
	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> create(HttpServletRequest req, ProductDTO dto) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.ADD)) {
			throw new PermissionException();
		}
		ProductBO bo = new ProductBO();
		if(dto.getProductId() != null && dto.getProductId() != 0) {
			bo = service.findById(dto.getMerchandiseRegisterId());
		}
		else {
			String userName = CommonUtil.getCurrentUser().getUsername();
			OrganizationModel org = userService.getOrganizationByUser(userName);
			bo.setDateOfManufacture(dto.getDateOfManufacture());
			bo.setMerchandiseRegisterId(dto.getMerchandiseRegisterId());
			bo.setOrganizationPath(org.getOrganizationPath());
			bo.setOrgnizationId(org.getId());
			bo.setProductCode(dto.getProductCode());
			bo.setProductName(dto.getProductName());
			bo.setStatus(dto.getStatus());
			bo.setTypeOfManufacture(dto.getTypeOfManufacture());
		}
		service.saveOrUpdate(bo);
		FileStorage.append(FileStorage.FILE_TYPE.PROCDUCT, bo.getProductId(), dto.getFiles());
		return new ResponseEntity<ProductBO>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		ProductBO bo = service.findById(id);
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
}
