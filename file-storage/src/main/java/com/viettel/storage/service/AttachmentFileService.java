/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.storage.service;

import java.io.IOException; 
import java.nio.file.*; 
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.viettel.storage.bean.FileInfoBean;
import com.viettel.storage.bo.AttachmentFileBO;
import com.viettel.storage.bo.FolderUploadBO;
import com.viettel.storage.dao.AttachmentFileDAO;
import com.viettel.storage.dao.FolderUploadDAO;

@Service
public class AttachmentFileService {
    public static final Logger LOGGER = LoggerFactory.getLogger(AttachmentFileService.class);
    @Value("${fileStorage.serverName}")
    private String serverName;
    @Autowired
    private AttachmentFileDAO attachmentFileDAO;
    @Autowired
    private FolderUploadDAO folderUploadDAO;

    /**
     * Lay attachment file theo id
     * 
     * @param attachmentFileId id attchment file
     * @return {@link AttachmentFileBO}
     */
    public AttachmentFileBO findByAttachmentFileId(Long attachmentFileId) {
        return attachmentFileDAO.findByAttachmentFileId(attachmentFileId);
    }

    /**
     * ham thuc hien luu file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IllegalStateException 
     * @throws IOException
     */
    public Long replace(Long fileType, Long objectId, MultipartFile file, String sysLanguageCode) throws IllegalStateException, IOException {
        List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(fileType, objectId);
        if (listAttachmentFileBO != null && !listAttachmentFileBO.isEmpty()) {
            for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
                deleteFile(attachmentFileBO);
            }
        }
        return saveFile(fileType, objectId, file, sysLanguageCode);
    }
    /**
     * ham thuc hien luu them file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IllegalStateException 
     * @throws IOException
     */
    public String append(Long fileType, Long objectId, List<MultipartFile> files, String sysLanguageCode) throws IllegalStateException, IOException {
        if (files == null || files.isEmpty()) {
            return null;
        }
        List<Long> appendResult = new ArrayList<>();
        for (MultipartFile multipartFile: files) {
            appendResult.add(saveFile(fileType, objectId, multipartFile, sysLanguageCode));
        }
        return StringUtils.join(appendResult, ",");
    }
    

    /**
     * saveFile
     * @param fileType
     * @param objectId
     * @param multipartFile
     * @throws IOException 
     * @throws IllegalStateException 
     */
    private Long saveFile(Long fileType, Long objectId, MultipartFile multipartFile , String sysLanguageCode) throws IllegalStateException, IOException {
        AttachmentFileBO attachmentFileBO = new AttachmentFileBO();
        attachmentFileBO.setObjectId(objectId);
        attachmentFileBO.setFileType(fileType);
        attachmentFileBO.setFileName(multipartFile.getOriginalFilename());
        attachmentFileBO.setCreatedDate(new Date());
//        attachmentFileBO.setCreatedBy(createdBy);
        attachmentFileBO.setSysLanguageCode(sysLanguageCode);
        attachmentFileDAO.save(attachmentFileBO);
        String filePath = getFilePath(attachmentFileBO.getFileType(), attachmentFileBO.getAttachmentFileId());
        attachmentFileBO.setPath(filePath);
        attachmentFileDAO.save(attachmentFileBO);
        storeFile(filePath, multipartFile);
        return attachmentFileBO.getAttachmentFileId();
    }
    /**
     * ham thuc hien luu them file len server file
     * 
     * @param bo
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public List<FileInfoBean> getListFileInfo(Long fileType, Long objectId) {
        List<FileInfoBean> listFileInfo = new ArrayList<>();
        List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(fileType, objectId);
        for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
            listFileInfo.add(toFileInfoBean(attachmentFileBO));
        }
        return listFileInfo;
    }

    public List<FileInfoBean> getListFileInfoByObjectIdList(Long fileType, List<Long> objectIdList) {
        List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfoByObjectIdList(fileType, objectIdList);
        List<FileInfoBean> listFileInfo = new ArrayList<>();
        for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
            listFileInfo.add(toFileInfoBean(attachmentFileBO));
        }
        return listFileInfo;
    }
    public List<FileInfoBean> getListFileInfoSysLanguageCode(Long fileType, Long objectId, String sysLanguageCode) {
        List<FileInfoBean> listFileInfo = new ArrayList<>();
        List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(fileType, objectId, sysLanguageCode);
        for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
            listFileInfo.add(toFileInfoBean(attachmentFileBO));
        }
        return listFileInfo;
    }

    /**
     * **
     * ham thuc hien luu them file len server file
     * 
     * @param bo
     * @param objectId: id đối tượng lưu
     * @return
     */
    public List<FileInfoBean> getListFileInfo( Long objectId) {
        List<FileInfoBean> listFileInfo = new ArrayList<FileInfoBean>();
        List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(objectId);
        for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
            listFileInfo.add(toFileInfoBean(attachmentFileBO));
        }
        return listFileInfo;
    }
    /**
     * Lay noi dung file theo id file
     * @param fileId
     * @return
     */
    /**
     * Lay noi dung file theo id file
     * @param fileId
     * @return
     */
    public InputStream getContentFile(Long attachmentFileId) {
        AttachmentFileBO attachmentFileBO = attachmentFileDAO.findByAttachmentFileId(attachmentFileId);
        if (attachmentFileBO == null) {
            return null;
        }
        String filePath = getFilePath(attachmentFileBO.getFileType(), attachmentFileId);
        try {
            return new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            LOGGER.error("error", e);
            return null;
        }
    }
    /**
     * getFileInfo
     * @param fileId
     * @return
     */
    public FileInfoBean getFileInfo(Long fileId) {
        AttachmentFileBO attachmentFileBO = attachmentFileDAO.findByAttachmentFileId(fileId);
        return toFileInfoBean(attachmentFileBO);
    }
    /**
     * toFileInfoBean
     * @param attachmentFileBO
     * @return
     */
    public static FileInfoBean toFileInfoBean(AttachmentFileBO attachmentFileBO) {
        if (attachmentFileBO == null) {
            return null;
        }
        FileInfoBean bean = new FileInfoBean();
        bean.setId(attachmentFileBO.getAttachmentFileId().toString());
        bean.setFileName(attachmentFileBO.getFileName());
        bean.setUploadDate(attachmentFileBO.getCreatedDate());
        bean.setFileType(attachmentFileBO.getFileType());
        bean.setObjectId(attachmentFileBO.getObjectId());
        bean.setPath(attachmentFileBO.getPath());
        bean.setSysLanguageCode(attachmentFileBO.getSysLanguageCode());
        return bean;
    }
    /**
     * getFolderUpload
     * @param type
     * @return
     */
    public String getFolderUpload(Long type) {
        FolderUploadBO folderUploadBO = folderUploadDAO.getFolderUpload(type, serverName);
        if (folderUploadBO == null) {
            return null;
        }
        return String.format("%s%s", folderUploadBO.getRootFolder(), folderUploadBO.getSubFolder());
    }
    /**
     * getFilePath
     * @param type
     * @param attachmentFileId
     * @return
     */
    public String getFilePath(Long type, Long attachmentFileId) {
        String uploadPath = getFolderUpload(type);
        if (uploadPath == null) {
            return null;
        }
        return String.format("%s%s", uploadPath, attachmentFileId);
    }
    /**
     * storeFile
     * @param type
     * @param attachmentFileId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
    public String storeFile(String filePath, MultipartFile multipartFile) throws IllegalStateException, IOException {
        multipartFile.transferTo(new File(filePath));
        return filePath;
    }
    /**
     * deleteFile
     * @param type
     * @param attachmentFileId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
    public boolean deleteFile(AttachmentFileBO attachmentFileBO) {
        String filePath = getFilePath(attachmentFileBO.getFileType(), attachmentFileBO.getAttachmentFileId());
        if (filePath != null) {
            try
            { 
                Files.deleteIfExists(Paths.get(filePath));
                attachmentFileDAO.delete(attachmentFileBO);
                return true;
            } 
            catch(NoSuchFileException e) 
            { 
                System.out.println("No such file/directory exists"); 
            } 
            catch(DirectoryNotEmptyException e) 
            { 
                System.out.println("Directory is not empty."); 
            } 
            catch(IOException e) 
            { 
                System.out.println("Invalid permissions."); 
            } 
              
            System.out.println("Deletion successful."); 
        }
        return false;
    }
    /**
     * deleteFile
     * @param type
     * @param objectId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
        public boolean deleteByObjectIds(Long fileType, Long objectId) throws IllegalStateException, IOException {
            List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(fileType, objectId);
            if (listAttachmentFileBO != null && !listAttachmentFileBO.isEmpty()) {
                for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
                    deleteFile(attachmentFileBO);
                }
                return true;
            }
        return false;
    }
    /**
     * deleteFile
     * @param type
     * @param objectId
     * @return
     * @throws IOException 
     * @throws IllegalStateException 
     */
        public boolean deleteByObjectIds2(Long fileType, Long objectId, String sysLanguageCode ) throws IllegalStateException, IOException {
            List<AttachmentFileBO> listAttachmentFileBO = attachmentFileDAO.getListFileInfo(fileType, objectId, sysLanguageCode);
            if (listAttachmentFileBO != null && !listAttachmentFileBO.isEmpty()) {
                for (AttachmentFileBO attachmentFileBO: listAttachmentFileBO) {
                    deleteFile(attachmentFileBO);
                }
                
                return true;
            }
        return false;
    }

    /**
     * Luu danh sach file theo file type va object id
     * 
     * @param fileType file type
     * @param objectId object id
     * @param fileInfoList danh sach file can luu
     * @throws IOException
     */
    @Transactional
    public void saveFileList(Long fileType, Long objectId, List<FileInfoBean> fileInfoList) throws IOException {
        if (CollectionUtils.isEmpty(fileInfoList)) {
            return;
        }
        for (FileInfoBean fromFile : fileInfoList) {
            if (StringUtils.isEmpty(fromFile.getPath())) {
                continue;
            }

            AttachmentFileBO attachmentFileBO = new AttachmentFileBO();
            attachmentFileBO.setCreatedDate(new Date());
            attachmentFileBO.setFileName(fromFile.getFileName());
            attachmentFileBO.setFileType(fileType);
            attachmentFileBO.setObjectId(objectId);
            attachmentFileBO.setSysLanguageCode(fromFile.getSysLanguageCode());
            attachmentFileDAO.save(attachmentFileBO);

            File source = new File(fromFile.getPath());
            if (source.exists()) {
                String newFilePath = getFilePath(attachmentFileBO.getFileType(),
                        attachmentFileBO.getAttachmentFileId());
                File dest = new File(newFilePath);
                FileUtils.copyFile(source, dest);
                attachmentFileBO.setPath(newFilePath);
                attachmentFileDAO.save(attachmentFileBO);
            }
        }
    }
}