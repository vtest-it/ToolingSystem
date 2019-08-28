<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2019/8/15
  Time: 14:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/demo.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/animate-custom.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap-select.min.css"/> ">
    <script src="<c:url value="/js/jquery.min.js"/>"></script>
    <script src="<c:url value="/js/bootstrap/bootstrap.min.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-select.js"/>"></script>
    <script src="<c:url value="/js/jquery.validate.min.js"/>"></script>
    <script src="<c:url value="/js/jquery.cookie.js"/>"></script>
    <script src="<c:url value="/js/loginPart.js"/>"></script>
</head>
<body>
<div class="container">
    <header>
    </header>
    <section>
        <div id="container_demo" >
            <a class="hiddenanchor" id="toregister"></a>
            <a class="hiddenanchor" id="tologin"></a>
            <div id="wrapper">
                <div id="login" class="animate form">
                    <form  action="<c:url value="/login"/>" method="post"autocomplete="on">
                        <h1>TMS管理系统</h1>
                        <p>
                            <label for="userName" class="uname" data-icon="u" > 你的账号 </label>
                            <input id="userName" name="userName" required="required" type="text" placeholder="工号（比如：V200）"/>
                        </p>
                        <p>
                            <label for="password" class="youpasswd" data-icon="p"> 你的密码</label>
                            <input id="password" name="password" required="required" type="password" placeholder="密码" />
                        </p>
                        <p class="keeplogin">
                            <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                            <label for="loginkeeping">下次自动登录</label>
                        </p>
                        <p class="login button">
                            <input type="submit" value="登录" onclick="javascript:location.href='needleCard'"/>
                        </p>
                        <p class="change_link">
                            没有账号？
                            <a href="#toregister" class="to_register">现在就注册</a>
                        </p>
                    </form>
                </div>

                <div id="register" class="animate form">
                    <form  method="post" action="<c:url value="/login"/>" id="signupForm" autocomplete="on">
                        <h1> 注册 </h1>
                        <p>
                            <label for="userName" class="uname" data-icon="u">你的用户名</label>
                            <input id="usernamesignup" name="userName" required="required" type="text" placeholder="工号（比如：V200）" />
                        </p>
                        <p>
                            <label for="email" class="youmail" data-icon="e" > 你的邮箱</label>
                            <input id="email" name="email" required="required" type="email" placeholder="个人公司邮箱"/>
                        </p>
                        <p>
                            <label for="password" class="youpasswd" data-icon="p">你的密码 </label>
                            <input id="passwordsignup" name="password" required="required" type="password" placeholder="密码"/>
                        </p>
                        <p>
                            <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">再次输入密码 </label>
                            <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="再次输入密码"/>
                        </p>
                        <p class="signin button">
                            <input type="submit" value="Sign up"/>
                        </p>
                        <p class="change_link">
                            已经有账号 ?
                            <a href="#tologin" class="to_register"> 马上登录！ </a>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    </section>
</div>
</body>
</html>
