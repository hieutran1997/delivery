/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */

package com.viettel.storage.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viettel.storage.bo.AttachmentFileBO;

/**
 * @author d2tsoftware
 * @since 12/11/2019
 * @version 1.0
 */
@Transactional
@Repository
public interface AttachmentFileDAO extends CrudRepository<AttachmentFileBO, Long> {
    /**
     * findConflictedCategoryType
     */
    @Query("SELECT at FROM AttachmentFileBO at WHERE LOWER(at.fileType) = :fileType AND at.objectId = :objectId ORDER BY at.createdDate ASC ")
    public List<AttachmentFileBO> getListFileInfo(@Param("fileType") Long fileType, @Param("objectId") Long objectId);
    
    /**
     * findConflictedCategoryType
     */
    @Query("SELECT at FROM AttachmentFileBO at WHERE LOWER(at.fileType) = :fileType AND at.objectId IN (:objectIdList) ORDER BY at.createdDate ASC ")
    public List<AttachmentFileBO> getListFileInfoByObjectIdList(@Param("fileType") Long fileType, @Param("objectIdList") List<Long> objectIdList);
    
    @Query("SELECT at FROM AttachmentFileBO at WHERE at.objectId = :objectId ORDER BY at.createdDate ASC ")
    public List<AttachmentFileBO> getListFileInfo( @Param("objectId") Long objectId);
    
    @Query("SELECT at FROM AttachmentFileBO at WHERE at.sysLanguageCode = :sysLanguageCode ORDER BY at.createdDate ASC ")
    public List<AttachmentFileBO> getListFileInfo( @Param("sysLanguageCode") String sysLanguageCode);
    
    @Query("SELECT at FROM AttachmentFileBO at WHERE LOWER(at.fileType) = :fileType AND at.objectId = :objectId AND at.sysLanguageCode = :sysLanguageCode ORDER BY at.createdDate ASC ")
    public List<AttachmentFileBO> getListFileInfo(@Param("fileType") Long fileType, @Param("objectId") Long objectId, @Param("sysLanguageCode") String sysLanguageCode );
    /**
     * findByAttachmentFileId
     * @param attachmentFileId
     * @return
     */
    public AttachmentFileBO findByAttachmentFileId(Long attachmentFileId);
}
