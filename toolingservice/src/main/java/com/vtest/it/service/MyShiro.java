package com.vtest.it.service;

import com.vtest.it.pojo.PermissionBean;
import com.vtest.it.pojo.RoleBean;
import com.vtest.it.pojo.UserBean;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

@Service
@Transactional
public class MyShiro extends AuthorizingRealm {
    @Inject
    private UserService userService;
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        String loginName=(String)principalCollection.fromRealm(getName()).iterator().next();
        UserBean userBean=userService.findByName(loginName);
        if(userBean!=null){
            SimpleAuthorizationInfo info =new SimpleAuthorizationInfo();
            List<RoleBean> roleBeanList =userBean.getRoleBeanList();
            for (RoleBean role: roleBeanList) {
                info.addStringPermissions(role.getPermissionName());
            }
            return  info;
        }
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken token =(UsernamePasswordToken)authenticationToken;
        UserBean userBean=userService.findByName(token.getUsername());
        if(userBean!=null){
            return  new SimpleAuthenticationInfo(userBean.getUserName(),userBean.getPassword(),getName());
        }
        return null;
    }
}
