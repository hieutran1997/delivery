/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.model.dto;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author hieut
 */
public class UserRoleDTO {
    private String username;
    private List<SelectedFormDTO> pickList;
    private List<SelectedFormDTO> source;
    private List<SelectedFormDTO> target;

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

    public List<SelectedFormDTO> getSource() {
        return source;
    }

    public void setSource(List<SelectedFormDTO> source) {
        this.source = source;
    }

    public List<SelectedFormDTO> getTarget() {
        return target;
    }

    public void setTarget(List<SelectedFormDTO> target) {
        this.target = target;
    }
    
    public void pushTarget(SelectedFormDTO data){
        if(target != null){
            this.target.add(data);
        }
        else{
            this.target = new ArrayList<>();
            this.target.add(data);
        }
    }
    
}
