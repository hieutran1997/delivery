package com.erp.model;

import javax.persistence.*;

@Entity
@Table(name = "User")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "salary")
    private long salary;

    @Column(name = "age")
    private int age;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;
    
    @Column(name = "organization_code")
    private String organizationCode;
    
    @Column(name = "type_of_user")
    private Integer typeOfUser;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getSalary() {
        return salary;
    }

    public void setSalary(long salary) {
        this.salary = salary;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getOrganizationCode() {
        return organizationCode;
    }

    public void setOrganizationCode(String organizationCode) {
        this.organizationCode = organizationCode;
    }

    public Integer getTypeOfUser() {
        return typeOfUser;
    }

    public void setTypeOfUser(Integer typeOfUser) {
        this.typeOfUser = typeOfUser;
    }
}
