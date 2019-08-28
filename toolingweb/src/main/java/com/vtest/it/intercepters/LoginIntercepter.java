package com.vtest.it.intercepters;

import com.vtest.it.pojo.UserBean;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginIntercepter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        HttpSession session=request.getSession();
//        UserBean user=(UserBean)session.getAttribute("SYSTEM_USER");
//        if (null!=user)
//        {
//            return true;
//        }
//        request.getRequestDispatcher("/system/login").forward(request,response);
//        return false;
        return true;

    }
}
