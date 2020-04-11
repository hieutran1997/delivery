/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */

package com.viettel.storage.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viettel.storage.bo.FolderUploadBO;

/**
 * @author d2tsoftware
 * @since 12/11/2019
 * @version 1.0
 */
@Transactional
@Repository
public interface FolderUploadDAO extends CrudRepository<FolderUploadBO, Long> {
    /**
     * findConflictedCategoryType
     */
    @Query("SELECT fu FROM FolderUploadBO fu WHERE LOWER(fu.fileType) = :fileType AND LOWER(fu.serverName) = LOWER(:serverName) ")
    public FolderUploadBO getFolderUpload(@Param("fileType") Long fileType, @Param("serverName") String serverName);

}
