<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019\2\27 0027
  Time: 14:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>

    <meta charset="UTF-8" />
    <title>404</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/errorStyle.css"/>" />

</head>



<body bgcolor="#494949">
<div class="head404"></div>
<div class="txtbg404">

<div class="txtbox">

    <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

    <p class="paddingbox">请点击以下链接继续浏览网页</p>

    <p><a style="cursor:pointer" onclick="history.back()">返回上一页面</a></p>

    <p><a href="<c:url value="/"/> ">返回网站首页</a></p>

</div>

</div>

</body>

</html>
