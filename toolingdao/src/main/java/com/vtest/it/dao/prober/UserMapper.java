package com.vtest.it.dao.prober;

import com.vtest.it.pojo.PermissionBean;
import com.vtest.it.pojo.UserBean;
import org.apache.ibatis.annotations.Param;


public interface UserMapper {
    public int  register(UserBean user);
    public int  cancel(@Param("userName") String userName);
    public UserBean validate(@Param("userName") String userName);
    public PermissionBean getPermission(@Param("level") Integer level);
}
