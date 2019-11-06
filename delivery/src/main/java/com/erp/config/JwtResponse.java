/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erp.config;

import java.io.Serializable;

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

    public JwtResponse(String jwttoken, String userName, String lastName, String firstName) {
        this.jwttoken = jwttoken;        
        this.userName = userName;
        this.lastName = lastName;
        this.firstName = firstName;
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
}
