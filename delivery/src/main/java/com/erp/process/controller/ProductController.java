package com.erp.process.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.MediaType;

import org.apache.http.ParseException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.erp.model.OrganizationModel;
import com.erp.process.bo.ProductBO;
import com.erp.process.dto.ProcessDTO;
import com.erp.process.dto.ProductDTO;
import com.erp.process.service.ProductService;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.AES;
import com.erp.util.BaseController;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.FileStorage;
import com.erp.util.PaginationUtil;
import com.erp.util.PermissionException;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;

@RestController
@RequestMapping("/process/product")
public class ProductController extends BaseController {
	public ProductController() {
		LOGGER = LoggerFactory.getLogger(ProductController.class);
	}

	@Autowired
	private ServiceChecker serviceChecker;

	@Autowired
	private ProductService service;

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/postQuery", method = RequestMethod.POST)
	public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<ProductDTO> pageable) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.PRODUCT, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		return new ResponseEntity<PaginationUtil<ProductDTO>>(service.processSearch(pageable, org.getCode()),
				HttpStatus.OK);
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> create(HttpServletRequest req, ProductDTO dto) {
		ProductBO bo = new ProductBO();
		if (dto.getProductId() != null && dto.getProductId() != 0) {
			if (!serviceChecker.permissionChecker(Constants.RESOURCE.PRODUCT, Constants.PERMISSION.ADD)) {
				throw new PermissionException();
			}
			bo = service.findById(dto.getProductId());
		} else {
			if (!serviceChecker.permissionChecker(Constants.RESOURCE.PRODUCT, Constants.PERMISSION.EDIT)) {
				throw new PermissionException();
			}
			String userName = CommonUtil.getCurrentUser().getUsername();
			OrganizationModel org = userService.getOrganizationByUser(userName);
			if (!service.validateBeforeSave(dto.getMerchandiseRegisterId(), org.getId())) {
				return new ResponseEntity<ProductBO>(HttpStatus.BAD_REQUEST);
			}
			bo.setMerchandiseRegisterId(dto.getMerchandiseRegisterId());
			bo.setOrganizationPath(org.getOrganizationPath());
			bo.setOrgnizationId(org.getId());
			bo.setProductCode(dto.getProductCode());
		}
		bo.setDateOfManufacture(dto.getDateOfManufacture());
		bo.setProductName(dto.getProductName());
		bo.setStatus(dto.getStatus());
		bo.setTypeOfManufacture(dto.getTypeOfManufacture());
		service.saveOrUpdate(bo);
		FileStorage.append(FileStorage.FILE_TYPE.PROCDUCT, bo.getProductId(), dto.getFiles());
		FileStorage.append(FileStorage.FILE_TYPE.AVATAR_PRODUCT, bo.getProductId(), dto.getAvatar());
		return new ResponseEntity<ProductBO>(HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.PRODUCT, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		ProductBO bo = service.findById(id);
		bo.setFileAttachment("file", FileStorage.getListFileInfo(FileStorage.FILE_TYPE.PROCDUCT, bo.getProductId()));
		bo.setFileAttachment("avatar", FileStorage.getListFileInfo(FileStorage.FILE_TYPE.AVATAR_PRODUCT, bo.getProductId()));
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}

	@DeleteMapping(path = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id)
			throws ParseException, IOException {
		ResponseUtil<String> result = new ResponseUtil<String>();
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.UNIT, Constants.PERMISSION.DELETE)) {
			throw new PermissionException();
		}
		List<Long> idsDelete = new ArrayList<>();
		service.delete(id);
		idsDelete.add(id);
		FileStorage.deleteByObjectIds(FileStorage.FILE_TYPE.PROCDUCT, idsDelete);
		FileStorage.deleteByObjectIds(FileStorage.FILE_TYPE.AVATAR_PRODUCT, idsDelete);
		result.setError(false);
		result.setMessage("Thành công!");
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "find-by-code/{code}", method = RequestMethod.GET)
	public ResponseEntity<?> findByCode(@PathVariable(value = "code") String code) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.PRODUCT, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		ProductDTO bo = service.findByCode(code);
		bo.setFileAttachment("file", FileStorage.getListFileInfo(FileStorage.FILE_TYPE.PROCDUCT, bo.getProductId()));
		bo.setFileAttachment("avatar", FileStorage.getListFileInfo(FileStorage.FILE_TYPE.AVATAR_PRODUCT, bo.getProductId()));
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}

	@RequestMapping(value = "find-by-code-without-secure", method = RequestMethod.GET)
	public ResponseEntity<?> findByCodeWithoutSecure(@RequestParam(value = "encryptCode") String encryptCode) {
		String code = AES.decrypt(encryptCode);
		ProductDTO bo = service.findByCode(code);
		bo.setFileAttachment("file", FileStorage.getListFileInfo(FileStorage.FILE_TYPE.PROCDUCT, bo.getProductId()));
		bo.setFileAttachment("avatar",
				FileStorage.getListFileInfo(FileStorage.FILE_TYPE.AVATAR_PRODUCT, bo.getProductId()));
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}

	@RequestMapping(value = "get-process-by-code-without-secure", method = RequestMethod.GET)
	public ResponseEntity<?> getProcessByCodeWithoutSecure(@RequestParam(value = "encryptCode") String encryptCode) {
		String code = AES.decrypt(encryptCode);
		List<ProcessDTO> bo = service.getProcessByCodeWithoutSecure(code);
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
}
