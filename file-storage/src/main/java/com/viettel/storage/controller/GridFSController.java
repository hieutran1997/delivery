/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.storage.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.viettel.storage.bean.FileInfoBean;
import com.viettel.storage.bo.AttachmentFileBO;
import com.viettel.storage.common.Response;
import com.viettel.storage.form.CloneFileObject;
import com.viettel.storage.form.SearchForm;
import com.viettel.storage.service.AttachmentFileService;
import com.viettel.storage.common.Constants;

/**
 * @author quanvh
 * @since FEB, 2020
 * @version 1.0
 */
@Controller
@RequestMapping("/file")
public class GridFSController {
    public static final Logger LOGGER = LoggerFactory.getLogger(GridFSController.class);

    @Autowired
    private AttachmentFileService attachmentFileService;

    /**
     * save lưu thêm file theo loại file và object id
     * 
     * @param fileType
     * @param objectId
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/append/{objectId}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> append(@PathVariable Long fileType, @PathVariable Long objectId
                                , @RequestParam(name = "file") MultipartFile file)
            throws IOException {
        String id = attachmentFileService.append(fileType, objectId, Arrays.asList(file), null);
        LOGGER.info(String.format("GridFSController.append : {'fileType': %s, 'objectId': %s, 'file': '%s'}", fileType,
                objectId, file.getOriginalFilename()));
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * save lưu thêm file theo loại file và object id va sysLanguageCode
     * 
     * @param fileType
     * @param objectId
     * @param sysLanguageCode
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/append/{objectId}/{sysLanguageCode}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> append(@PathVariable Long fileType, @PathVariable Long objectId, 
                                 @RequestParam(name = "file") MultipartFile file, @PathVariable String sysLanguageCode)
            throws IOException {
        String id = attachmentFileService.append(fileType, objectId, Arrays.asList(file), sysLanguageCode);
        LOGGER.info(String.format(
                "GridFSController.append : {'fileType': %s, 'objectId': %s, 'file': '%s', 'sysLanguageCode': '%s'}",
                fileType, objectId, file.getOriginalFilename(), sysLanguageCode));
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * save lưu thêm file theo loại file và object id
     * 
     * @param fileType
     * @param objectId
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/append_all/{objectId}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> appendAll(@PathVariable Long fileType, @PathVariable Long objectId
            , @RequestParam(name = "file") List<MultipartFile> files)
                    throws IOException {
        String ids = attachmentFileService.append(fileType, objectId, files, null);
        LOGGER.info(String.format("GridFSController.appendAll : {'fileType': %s, 'objectId': %s, 'file': '%s'}",
                fileType, objectId, files));
        return new ResponseEntity<>(ids, HttpStatus.OK);
    }

    /**
     * save lưu thêm file theo loại file và object id Va sysLanguageCode
     * 
     * @param fileType
     * @param objectId
     * @param sysLanguageCode
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/append_all/{objectId}/{sysLanguageCode}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> appendAll(@PathVariable Long fileType, @PathVariable Long objectId
            , @RequestParam(name = "file") List<MultipartFile> files, @PathVariable String sysLanguageCode)
                    throws IOException {
        String ids = attachmentFileService.append(fileType, objectId, files, sysLanguageCode);
        LOGGER.info(String.format(
                "GridFSController.appendAll : {'fileType': %s, 'objectId': %s, 'file': '%s', 'sysLanguageCode': '%s'}",
                fileType, objectId, files, sysLanguageCode));
        return new ResponseEntity<>(ids, HttpStatus.OK);
    }

    /**
     * save-or-update lưu file:
     * nếu file đã tồn tại thì thực hiện xóa file cũ trước khi lưu
     * @param fileType
     * @param objectId
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/save-or-update/{objectId}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> replace(@PathVariable Long fileType, @PathVariable Long objectId,
            @RequestParam(name = "file", required = false) MultipartFile file) throws IOException {
        Long id = attachmentFileService.replace(fileType, objectId, file, null);
        LOGGER.info(String.format("GridFSController.replace : {'fileType': %s, 'objectId': %s}", fileType, objectId));
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * save-or-update lưu file:
     * nếu file đã tồn tại thì thực hiện xóa file cũ trước khi lưu
     * @param fileType
     * @param objectId
     * @param sysLanguageCode
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping(value = "/{fileType}/save-or-update/{objectId}/{sysLanguageCode}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> replace(@PathVariable Long fileType, @PathVariable Long objectId,
            @RequestParam(name = "file", required = false) MultipartFile file, @PathVariable String sysLanguageCode)
            throws IOException {

        Long id = attachmentFileService.replace(fileType, objectId, file, sysLanguageCode);
        LOGGER.info(String.format("GridFSController.replace : {'fileType': %s, 'objectId': %s, 'sysLanguageCode': %s}",
                fileType, objectId, file, sysLanguageCode));
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * deleteById
     * @param fileId
     * @return
     */
    @DeleteMapping("/delete/{fileId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteById(@PathVariable Long fileId) {
        AttachmentFileBO attachmentFileBO = attachmentFileService.findByAttachmentFileId(fileId);
        attachmentFileService.deleteFile(attachmentFileBO);
        LOGGER.info(String.format("GridFSController.deleteById : {'fileId': %s}", fileId));
        return new ResponseEntity<Response>(Response.success(Constants.RESPONSE_CODE.DELETE_SUCCESS), HttpStatus.OK);
    }

    /**
     * get file data
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
    @GetMapping(value = {"/download/{fileId}", "/avatar/image/{fileId}"})
    public @ResponseBody byte[] downloadFile(@PathVariable Long fileId) throws IllegalStateException, IOException {
        AttachmentFileBO attachmentFileBO = attachmentFileService.findByAttachmentFileId(fileId);
        if (attachmentFileBO != null) {
            InputStream is = attachmentFileService.getContentFile(fileId);
            return IOUtils.toByteArray(is);
        }
        return null;
    }

    /**
     * get content file by fileId & objectId
     * @param fileType
     * @param objectId
     * @return List<InputStream>
     * @throws IllegalStateException
     * @throws IOException
     */
    @GetMapping(value = "/{fileType}/get-contents/{objectId}")
    public ResponseEntity<?> getContents(@PathVariable Long fileType, @PathVariable Long objectId)
            throws IllegalStateException, IOException {
        List<FileInfoBean> listFileInfo = attachmentFileService.getListFileInfo(fileType, objectId);
        if (!CollectionUtils.isEmpty(listFileInfo)) {
            InputStream is = attachmentFileService.getContentFile(Long.parseLong(listFileInfo.get(0).getId()));
            InputStreamResource resource = new InputStreamResource(is);
            return ResponseEntity.ok().body(resource);
        }
        return new ResponseEntity<Response>(Response.success(), HttpStatus.NO_CONTENT);
    }

    /**
     * get content file by fileId & objectId & sysLanguageCode
     * @param fileType
     * @param objectId
     * @param sysLanguageCode
     * @return List<InputStream>
     * @throws IllegalStateException
     * @throws IOException
     */
    @GetMapping(value = "/{fileType}/get-contents/{objectId}/{sysLanguageCode}")
    public ResponseEntity<?> getContents(@PathVariable Long fileType, @PathVariable Long objectId,
            @PathVariable String sysLanguageCode) throws IllegalStateException, IOException {
        List<FileInfoBean> listFileInfo = attachmentFileService.getListFileInfoSysLanguageCode(fileType, objectId,
                sysLanguageCode);
        if (!CollectionUtils.isEmpty(listFileInfo)) {
            InputStream is = attachmentFileService.getContentFile(Long.parseLong(listFileInfo.get(0).getId()));
            InputStreamResource resource = new InputStreamResource(is);
            return ResponseEntity.ok().body(resource);
        }
        return new ResponseEntity<Response>(Response.success(), HttpStatus.NO_CONTENT);
    }

    /**
     * deleteById
     * @param fileId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
    @PostMapping(value = "/{fileType}/delete-by-object-ids", produces = MediaType.APPLICATION_JSON)
    public Response deleteByObjectIds(@PathVariable Long fileType, Long[] objectIds) throws IllegalStateException, IOException {
        for (Long objectId: objectIds) {
            //Xoa file cu theo dieu kien
            attachmentFileService.deleteByObjectIds(fileType, objectId);
            LOGGER.info(String.format("GridFSController.delete : {'fileType': %s, 'objectId': %s}", fileType, objectId));
        }
        return Response.success(Constants.RESPONSE_CODE.DELETE_SUCCESS); 
    }

    /**
     * deleteById
     * @param fileId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
    @PostMapping(value = "/{fileType}/{sysLanguageCode}/delete-by-object-ids", produces = MediaType.APPLICATION_JSON)
    public Response deleteByObjectIds(@PathVariable Long fileType, Long[] objectIds, @PathVariable String sysLanguageCode)
            throws IllegalStateException, IOException {
        for (Long objectId: objectIds) {
            //Xoa file cu theo dieu kien
            attachmentFileService.deleteByObjectIds2(fileType, objectId, sysLanguageCode);
            LOGGER.info(String.format("GridFSController.delete : {'fileType': %s, 'objectId': %s, 'sysLanguageCode': %s}",
                    fileType, objectId, sysLanguageCode));
        }
       
        return Response.success(Constants.RESPONSE_CODE.DELETE_SUCCESS);
    }

    /**
     * get file data
     * @return
     */
    @GetMapping(value = "/{fileType}/get-info/{objectId}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getInfo(@PathVariable Long fileType, @PathVariable Long objectId) {
        List<FileInfoBean> listFileInfo = attachmentFileService.getListFileInfo(fileType, objectId);
        return new ResponseEntity<List<FileInfoBean>>(listFileInfo, HttpStatus.OK);
    }

    /**
     * get file data
     * @return
     */
    @GetMapping(value = "/{fileType}/get-info", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getInfo(@PathVariable Long fileType, SearchForm form) {
        List<FileInfoBean> listFileInfo = attachmentFileService.getListFileInfoByObjectIdList(fileType,
                form.getObjectList());
        return new ResponseEntity<List<FileInfoBean>>(listFileInfo, HttpStatus.OK);
    }

    /**
     * get file data
     * @return
     */
    @GetMapping(value = "/{fileType}/get-info/{objectId}/{sysLanguageCode}", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getInfo(@PathVariable Long fileType, @PathVariable Long objectId,
            @PathVariable String sysLanguageCode) {
        List<FileInfoBean> listFileInfo = attachmentFileService.getListFileInfoSysLanguageCode(fileType, objectId,
                sysLanguageCode);
        return new ResponseEntity<List<FileInfoBean>>(listFileInfo, HttpStatus.OK);
    }

    /**
     * Ham xu ly clone file
     * @throws IOException 
     */
    @PostMapping(value = "/process-clone-all")
    public Response processCloneAll(@RequestBody List<CloneFileObject> cloneData) throws IOException {
        if (CollectionUtils.isEmpty(cloneData)) {
            return Response.warning("GridFS.cloneDataIsEmpty");
        }
        for (CloneFileObject obj : cloneData) {
            List<FileInfoBean> fileInfoList = attachmentFileService.getListFileInfo(obj.getFromFileType(),
                    obj.getFromObjectId());
            attachmentFileService.saveFileList(obj.getToFileType(), obj.getToObjectId(), fileInfoList);
        }
        return Response.success(Constants.RESPONSE_CODE.SUCCESS);
    }
}
