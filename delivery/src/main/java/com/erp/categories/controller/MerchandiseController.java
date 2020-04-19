package com.erp.categories.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.erp.categories.bo.MerchandiseBO;
import com.erp.categories.dto.MerchandiseDTO;
import com.erp.categories.service.MerchandiseService;
import com.erp.elastic.index.MerchandiseIndex;
import com.erp.model.OrganizationModel;
import com.erp.service.ServiceChecker;
import com.erp.service.UserService;
import com.erp.util.BaseController;
import com.erp.util.CommonUtil;
import com.erp.util.Constants;
import com.erp.util.PaginationUtil;
import com.erp.util.PermissionException;
import com.erp.util.ResponseUtil;
import com.erp.util.SearchRequestUtil;

import java.util.Date;

import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/cat/merchandise")
public class MerchandiseController extends BaseController {
	
	public MerchandiseController() {
		LOGGER = LoggerFactory.getLogger(MerchandiseController.class);
	}
	
	@Autowired
	private ElasticsearchOperations elasticsearchTemplate;
	
	@Autowired
	private ServiceChecker serviceChecker;
	
	@Autowired
	private MerchandiseService service;
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/postQuery", method = RequestMethod.POST)
	public ResponseEntity<?> postQuery(@RequestBody SearchRequestUtil<MerchandiseDTO> pageable) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		return new ResponseEntity<PaginationUtil<MerchandiseDTO>>(service.processSearch(pageable), HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody MerchandiseBO entity) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.ADD)) {
			throw new PermissionException();
		}
		String userName = CommonUtil.getCurrentUser().getUsername();
		OrganizationModel org = userService.getOrganizationByUser(userName);
		entity.setCreatedBy(userName);
		entity.setCreatedDate(new Date());
		entity.setStatus(Constants.STATUS_MERCHANDISE.NEW);
		entity.setOrganizationId(org.getId());
		entity.setOrganizationPath(org.getOrganizationPath());
		service.saveOrUpdate(entity);
		return new ResponseEntity<MerchandiseBO>(HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@RequestBody MerchandiseDTO dto) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.EDIT)) {
			throw new PermissionException();
		}
		MerchandiseBO instance = service.findById(dto.getMerchandiseId());
		if(instance == null) {
			return new ResponseEntity<MerchandiseBO>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		instance.setCatGroupMerchandiseId(dto.getCatGroupMerchandiseId());
		instance.setMerchandiseName(dto.getMerchandiseName());
		instance.setCatTypeMerchandiseId(dto.getCatTypeMerchandiseId());
		instance.setCatUnitId(dto.getCatUnitId());
		instance.setDescription(dto.getDescription());
		instance.setEffectiveDate(dto.getEffectiveDate());
		instance.setExpiredDate(dto.getExpiredDate());
		instance.setStatus(dto.getStatus());
		service.saveOrUpdate(instance);
		return new ResponseEntity<MerchandiseBO>(HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseUtil<String>> delete(@PathVariable(value = "id") Long id) {
		ResponseUtil<String> result = new ResponseUtil<String>();
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.DELETE)) {
			throw new PermissionException();
		}
		service.delete(id);
		result.setError(false);
		result.setMessage("Thành công!");
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		MerchandiseBO bo = service.findById(id);
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/approve/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> approve(@PathVariable(value = "id") Long id) {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		MerchandiseBO bo = service.findById(id);
		bo.setStatus(Constants.STATUS_MERCHANDISE.APPROVED);
		service.saveOrUpdate(bo);
		return new ResponseEntity<>(bo, HttpStatus.OK);
	}

	@RequestMapping(value = "/getSelectedData", method = RequestMethod.GET)
	public ResponseEntity<?> getSelectedData() {
		if (!serviceChecker.permissionChecker(Constants.RESOURCE.MERCHANDISE, Constants.PERMISSION.VIEW)) {
			throw new PermissionException();
		}
		return new ResponseEntity<>(service.getSelectedData(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/get-new-code/{typeCode}", method = RequestMethod.GET)
	public ResponseEntity<?> getNewCode(@PathVariable(value = "typeCode") String typeCode) {
		return new ResponseEntity<>(service.generateCode(typeCode), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create-index", method = RequestMethod.GET)
	public ResponseEntity<?> createIndex() {
		elasticsearchTemplate.createIndex(MerchandiseIndex.class);
		return new ResponseEntity<>("Thành công", HttpStatus.OK);
	}
}
