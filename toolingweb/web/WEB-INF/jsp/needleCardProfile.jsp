<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019\2\27 0027
  Time: 17:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>TMS</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/metisMenu.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/sb-admin-2.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/font-awesome.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-dataTables-min.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap-table.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/objects.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/button.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap-datetimepicker.min.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap-table-fixed-columns.css"/> "/>
    <script src="<c:url value="/js/jquery.min.js"/> "></script>
    <script src="<c:url value="/js/sb-admin-2.js"/> "></script>
    <script src="<c:url value="/js/metisMenu.min.js"/> "></script>
    <script src="<c:url value="/js/jquery.validate.min.js"/> "></script>
    <script src="<c:url value="/js/messages_zh.js"/> "></script>
    <script src="<c:url value="/js/bootstrap/bootstrap.min.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-table.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-table-fixed-columns.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-datetimepicker.min.js"/>"></script>
    <script src="<c:url value="/js/bootstrap-datetimepicker.zh-CN.js"/> "></script>
    <script src="<c:url value="/js/jquery.form.min.js"/> "></script>
</head>

<body>
<div id="wrapper">
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" id="home" href="needleCard">TMS管理系统</a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li>
                        <a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li>
                        <a href="#"><i class="fa fa-book fa-fw"></i>档案管理<span class="fa arrow"></span></a>
                        <ul class="nav">
                            <li>
                                <a href="needleCardRecord">针卡档案</a>
                            </li>
                            <li>
                                <a href="needleCardBuildRecord">针卡建档</a>
                            </li>
                            <li>
                                <a href="needleCardIQC">针卡IQC</a>
                            </li>
                            <li>
                                <a href="needleCardLend">针卡借出 </a>
                            </li>
                            <li>
                                <a href="needleCardReturn">针卡归还</a>
                            </li>
                            <li>
                                <a href="needleCardCheck">针卡验收</a>
                            </li>
                            <li>
                                <a href="needleCardRelease">针卡Release</a>
                            </li>
                            <li>
                                <a href="needleCardMaintain">针卡保养</a>
                            </li>
                            <li>
                                <a href="needleCardAllRecord">针卡全记录</a>
                            </li>
                            <%--<li>--%>
                            <%--<a href="#">tooling档案</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                            <%--<a href="#">Correlation wafer档案</a>--%>
                            <%--</li>--%>

                            <%--<li>--%>
                            <%--<a href="#">消耗品档案</a>--%>
                            <%--</li>--%>
                        </ul>
                    </li>
                    <%--<li>--%>
                    <%--<a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 进出管制<span class="fa arrow"></span></a>--%>
                    <%--<ul class="nav nav-second-level">--%>
                    <%--<li>--%>
                    <%--<a href="needleCardIQC">针卡IQC</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="needleCardLend">针卡借出 </a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="needleCardReturn">针卡归还</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="needleCardRelease">針卡Release</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="">tooling借出 </a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">tooling归还</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Correlation wafer借出</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Correlation wafer归还 </a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">INK領出</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">INK归还</a>--%>
                    <%--</li>--%>
                    <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#"><i class="fa fa-table fa-fw"></i> 针卡保养<span class="fa arrow"></span></a>--%>
                    <%--<ul class="nav nav-second-level">--%>
                    <%--<li>--%>
                    <%--<a href="needleCardMaintain">针卡保养</a>--%>
                    <%--</li>--%>
                    <%--&lt;%&ndash;<li>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<a href="#">针卡保养纪录</a>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                    <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#"><i class="fa fa-edit fa-fw"></i> 进出纪录<span class="fa arrow"></span></a>--%>
                    <%--<ul class="nav nav-second-level">--%>
                    <%--<li>--%>
                    <%--<a href="#">针卡借出归还纪录</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">tooling借出归还纪录</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Correlation wafer借出归还纪录</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">消耗品借出归还纪录</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#"> 檔案修改紀錄</a>--%>
                    <%--</li>--%>
                    <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#"><i class="fa fa-wrench fa-fw"></i> UI Elements<span class="fa arrow"></span></a>--%>
                    <%--<ul class="nav nav-second-level">--%>
                    <%--<li>--%>
                    <%--<a href="#">Panels and Wells</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Buttons</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Notifications</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Typography</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#"> Icons</a>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                    <%--<a href="#">Grid</a>--%>
                    <%--</li>--%>
                    <%--</ul>--%>
                    <%--</li>--%>
                </ul>
            </div>
        </div>
    </nav>
    <div id='page-wrapper'>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        简介
                    </div>
                    <div class="panel-body">
                        <div class="row col-lg-6 col-xlg-7 col-md-5" >
                            <form role="form" id="profileForm">
                                 <div class="form-group">
                                  <p class="col-lg-12">
                                     <label for="userName">用户名</label>
                                      <input type="text" name="userName" id="userName" class="form-control" disabled>
                                  </p>
                                 </div>
                                <div class="form-group">
                                    <p class="col-lg-12">
                                        <label for="email">邮箱</label>
                                        <input type="email" name="email" id="email" class="form-control">
                                    </p>
                                </div>
                                <div class="form-group">
                                    <p class="col-lg-12">
                                        <label for="password">密码</label>
                                        <input type="password" name="password" id="password" class="form-control">
                                    </p>
                                </div>
                                <input class="button  button-primary button-pill  button-3d pull-right"  type="submit" value="提交">
                            </form>

                        </div>
                        <div class="row col-lg-6 col-xlg-7 col-md-5">
                           <table id="profileTable">

                           </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
