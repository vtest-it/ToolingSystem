package com.vtest.it.pojo;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class PermissionBean {
    private Integer id;
    private String permissionName;
    private RoleBean roleBean;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }
    @ManyToOne
    public RoleBean getRoleBean() {
        return roleBean;
    }

    public void setRoleBean(RoleBean roleBean) {
        this.roleBean = roleBean;
    }
}
