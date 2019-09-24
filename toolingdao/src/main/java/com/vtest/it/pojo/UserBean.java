package com.vtest.it.pojo;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class UserBean {
    private Integer id;
    @NotEmpty(message = "用户名不能为空")
    private String username;
    @NotEmpty(message = "密码不能为空")
    private String password;
    private String email;
    private Date registerTime;
    private List<RoleBean> roleBeanList;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }
    @ManyToMany
    @JoinTable(name="vt_user_role",joinColumns={@JoinColumn(name="user_id")},inverseJoinColumns={@JoinColumn(name="role_id")})
    public List<RoleBean> getRoleBeanList() {
        return roleBeanList;
    }

    public void setRoleBeanList(List<RoleBean> roleBeanList) {
        this.roleBeanList = roleBeanList;
    }
    @Transient
    public Set<String> getRolesName(){
        List<RoleBean> roleList=getRoleBeanList();
        Set<String> set=new HashSet<String>();
        for (RoleBean roleBean:roleList) {
            set.add(roleBean.getName());
        }
        return set;
    }
}
