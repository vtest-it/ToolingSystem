<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2019/3/26
  Time: 11:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
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
                <li class="sidebar-search">
                    <span id="date"></span>
                </li>
                <li>
                    <a href="#"><i class="fa fa-book fa-fw"></i>档案管理<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="needleCardRecord">针卡档案</a>
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
                <li>
                    <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 进出管制<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
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
                            <a href="needleCardRelease">針卡Release</a>
                        </li>
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
                    </ul>
                </li>
                <%--<li>--%>
                    <%--<a href="#"><i class="fa fa-table fa-fw"></i> 针卡保养<span class="fa arrow"></span></a>--%>
                    <%--<ul class="nav nav-second-level">--%>
                        <%--<li>--%>
                            <%--<a href="#">针卡保养</a>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a href="#">针卡保养纪录</a>--%>
                        <%--</li>--%>
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
</body>
</html>
