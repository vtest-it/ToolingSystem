package com.vtest.it.pojo;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
public class PermissionBean {
    private Integer id;
    private String name;
    private String description;
    private RoleBean roleBean;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name="role_id")
    public RoleBean getRoleBean() {
        return roleBean;
    }

    public void setRoleBean(RoleBean roleBean) {
        this.roleBean = roleBean;
    }
}
