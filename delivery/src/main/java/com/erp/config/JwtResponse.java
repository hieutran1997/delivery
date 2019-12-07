/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.config;

import com.erp.model.dto.RolePermissionDTO;
import com.erp.model.dto.SelectedFormDTO;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author hieut
 */
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final String userName;
   
    private final String firstName;
    private final String lastName;
    private final List<SelectedFormDTO> lstRole;
    
    private final Integer typeOfUser;
    
    private final List<RolePermissionDTO> scope;

    public JwtResponse(String jwttoken, String userName, String lastName, String firstName, List<RolePermissionDTO> scope, Integer typeOfUser, List<SelectedFormDTO> lstRole) {
        this.jwttoken = jwttoken;        
        this.userName = userName;
        this.lastName = lastName;
        this.firstName = firstName;
        this.scope = scope;
        this.typeOfUser = typeOfUser;
        this.lstRole = lstRole;
    }

    public String getToken() {
        return this.jwttoken;
    }
    
     public String getUsername() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public List<RolePermissionDTO> getScope() {
        return scope;
    }

    public Integer getTypeOfUser() {
        return typeOfUser;
    }

    public List<SelectedFormDTO> getLstRole() {
        return lstRole;
    }
}
