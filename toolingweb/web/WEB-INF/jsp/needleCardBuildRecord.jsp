<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019\3\25 0025
  Time: 14:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>needleCardRecordBuild</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/metisMenu.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/sb-admin-2.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/font-awesome.min.css"/> ">
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/jquery-dataTables-min.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap-table.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/objects.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/button.css"/> "/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/fileinput.min.css"/> "/>
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
    <script src="<c:url value="/js/needleBuild.js"/> "></script>
    <style>
        td {
            white-space: nowrap;
        }
    </style>
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
                        <%--<a href="#"><i class="fa fa-book fa-fw"></i>档案管理<span class="fa arrow"></span></a>--%>
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
        <div class="row" id="needleCardSearchPage">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        针卡档案建立
                    </div>
                    <div class="panel-body">
                        <form role="form" id="needCardModifyForm">
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-4">针卡编号</label>
                                    <input class="form-control" name="proberCardId" id="proberCardId" style="width: 35%;" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">客户</label>
                                    <input class="form-control" name="custName" id="custName" style="width: 30%" type="text">

                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">客户编号</label>
                                    <input class="form-control" name="custNo" id="custNo" style="width: 35%" type="text">

                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-4">来源日期</label>
                                    <input class="form-control" name="receiptTime" id="receiptTime" style="width: 35%"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">厂商</label>
                                    <input class="form-control" name="vendorName" id="vendorName" style="width: 45%"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">厂商编号</label>
                                    <input class="form-control" name="vendorNo" id="vendorNo" style="width: 35%"type="text">
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-4">测试机台</label>
                                    <input class="form-control" name="useEquipment" id="useEquipment" style="width: 35%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">Dut 数</label>
                                    <input class="form-control" name="dutCount" id="dutCount" style="width: 45%;margin: 0px"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">Pin 数</label>
                                    <input class="form-control" name="pinCount" id="pinCount" style="width: 35%"type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">柜位</label>
                                    <input class="form-control" name="cabPosition"  id="cabPosition" style="width: 45%"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">來源</label>
                                    <input class="form-control" name="cardSource" id="cardSource" style="width: 45%"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">PM时机</label>
                                    <input class="form-control" name="pmTd" id="pmTd" style="width: 35%" type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">类 型</label>
                                    <select  class="form-control" name="cardType" id="cardType" style="width: 35%">
                                        <option value="CANTILEVER">CANTILEVER</option>
                                        <option value="COBRA">COBRA</option>
                                        <option value="POGO_PIN">POGO PIN</option>
                                        <option value="MEMS">MEMS</option>
                                        <option value="MEMBRAME">MEMBRAME</option>

                                    </select>
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">新旧</label>
                                    <select  class="form-control" name="newOld" id="newOld" style="width: 35%">
                                        <option value="new">新</option>
                                        <option value="old">旧</option>
                                    </select>
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">cleanType</label>
                                    <select  class="form-control" name="cleanType" id="cleanType" style="width: 35%">
                                        <option value="3M_3um">3M 3um</option>
                                        <option value="MIPOX_GC8000">MIPOX GC8000</option>
                                        <option value="MIPOX_SI10000">MIPOX SI10000</option>
                                        <option value="MIPOX_WA6000">MIPOX WA6000</option>
                                        <option value="ITS_PP150">ITS PP150</option>

                                    </select>
                                </p>

                            </div>
                            <div class="form-group">
                                <div class="col-lg-4">
                                    <label class="col-lg-4">针长spec</label>
                                    <input class="form-control" name="pinlenSpec" id="pinlenSpec" type="text" style="width: 35%">
                                    mil
                                </div>
                                <div class="col-lg-4">
                                    <label class="col-lg-4">针径spec</label>
                                    <input class="form-control" name="pindiamSpec" id="pindiamSpec" type="text" style="width: 35%">mil
                                </div>
                                <div class="col-lg-4">
                                    <label class="col-lg-4" >水平spec</label>
                                    <input class="form-control" name="pinlevelSpec"  id="pinlevelSpec"  type="text" style="width: 35%">mil
                                </div>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">状态</label>
                                    <select  class="form-control" name="state"  id="state" style="width:35%;">
                                        <option value="New_Prod">新品入库</option>
                                    </select>
                                </p>

                                <p class="col-lg-4">
                                    <label class="col-lg-3">DEPTH</label>
                                    <input class="form-control" name="pindepthSpec"  id="pindepthSpec" style="width: 35%" type="text">mil
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">作业人员</label>
                                    <input class="form-control" name="creator" id="creator" style="width: 35%" type="text">
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">型号</label>
                                    <input class="form-control" name="cardModel"  id="cardModel" style="width: 35%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">财产单位</label>
                                    <input class="form-control" name="belongDept" id="belongDept" style="width: 35%"type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">确认人</label>
                                    <input class="form-control" name="confirmer" id="confirmer" style="width: 35%"type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-6">
                                    <label class="col-lg-3">Glass Mask</label>
                                    <input class="form-control" name="glassMask"  id="glassMask" style="width: 40%" type="text">
                                </p>
                                <p class="col-lg-6">
                                    <label class="col-lg-3">Mylar Mask</label>
                                    <input class="form-control" name="mylarMask" id="mylarMask" style="width: 35%"type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-12"style="display: none">
                                    <label class="col-lg-2">Rebuild次數</label>
                                    <input class="form-control" name="rebuildCount"  id="rebuildCount" style="width: 35%" value="0" type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-12">
                                    <label class="col-lg-1">备注</label>
                                    <textarea class="form-control" name="note" id="note" style="width: 90%" rows="3"></textarea>
                                </p>
                            </div>
                            <input class="button  button-primary button-pill  button-3d pull-right" type="submit"
                                   value="提交" id="submit">
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</body>
</html>
