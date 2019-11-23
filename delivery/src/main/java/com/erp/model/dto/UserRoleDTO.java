/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model.dto;

import java.util.List;

/**
 *
 * @author hieut
 */
public class UserRoleDTO {
    private String username;
    private List<SelectedFormDTO> pickList;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<SelectedFormDTO> getPickList() {
        return pickList;
    }

    public void setPickList(List<SelectedFormDTO> pickList) {
        this.pickList = pickList;
    }
    
}
