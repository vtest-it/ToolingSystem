package com.vtest.it.intercepters;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginIntercepter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session=request.getSession();
        if (null!=session.getAttribute("username")){
            return  true;
        }else {
            request.getRequestDispatcher("/").forward(request,response);
            return false;
        }
    }
}
