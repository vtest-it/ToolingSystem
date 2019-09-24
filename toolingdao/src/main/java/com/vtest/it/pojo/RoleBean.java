package com.vtest.it.pojo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RoleBean {
    private Integer id;
    private String name;
    private String description;
    private List<PermissionBean> permissionBeanList;
    private List<UserBean> userBeanList;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "role")
    public List<PermissionBean> getPermissionBeanList() {
        return permissionBeanList;
    }

    public void setPermissionBeanList(List<PermissionBean> permissionBeanList) {
        this.permissionBeanList = permissionBeanList;
    }
    @ManyToMany
    public List<UserBean> getUserBeanList() {
        return userBeanList;
    }

    public void setUserBeanList(List<UserBean> userBeanList) {
        this.userBeanList = userBeanList;
    }
    @Transient
    public  List<String> getPermissionName(){
        List<String> list=new ArrayList<String>();
        List<PermissionBean> perlist=getPermissionBeanList();
        for (PermissionBean per: perlist) {
            list.add(per.getName());
        }
        return  list;
    }
}
