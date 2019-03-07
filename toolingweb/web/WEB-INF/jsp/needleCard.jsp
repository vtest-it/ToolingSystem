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
    <script src="<c:url value="/js/jquery.min.js"/> "></script>
    <script src="<c:url value="/js/sb-admin-2.js"/> "></script>
    <script src="<c:url value="/js/metisMenu.min.js"/> "></script>
    <script src="<c:url value="/js/jquery.validate.min.js"/> "></script>
    <script src="<c:url value="/js/messages_zh.js"/> "></script>
    <script src="<c:url value="/js/bootstrap/bootstrap.min.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-table.js"/> "></script>
    <script src="<c:url value="/js/bootstrap-datetimepicker.min.js"/>"></script>
    <script src="<c:url value="/js/bootstrap-datetimepicker.zh-CN.js"/> "></script>
    <script src="<c:url value="/js/needle.js"/> "></script>
    <script src="<c:url value="/js/jquery.form.min.js"/> "></script>
    <script>
        $("#needCardModifyForm").on("submit",function () {
            dataPost();
            event.preventDefault();
        })
        function dataPost() {
            $.ajax({
                type:"post",
                dataType:"json",
                url:"/toolingweb/needleCard/addNewNeedleCard",
                data:$("#needCardModifyForm").serialize(),
                success:function (result) {
                    if(result.resultCode==200){
                        alert(result);
                    }
                },
                error:function(){
                    alert(result);
                }
            })
        }
    </script>
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
            <a class="navbar-brand" id="home" href="javacript:void(0);">TMS管理系统</a>
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
                                <a href="javacript:void(0);" id="needleCard">针卡档案</a>
                            </li>
                            <li>
                                <a href="#">tooling档案</a>
                            </li>
                            <li>
                                <a href="#">Correlation wafer档案</a>
                            </li>

                            <li>
                                <a href="#">消耗品档案</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 进出管制<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#">针卡IQC</a>
                            </li>
                            <li>
                                <a href="#">针卡借出 </a>
                            </li>
                            <li>
                                <a href="#">针卡归还</a>
                            </li>
                            <li>
                                <a href="#">針卡Release</a>
                            </li>
                            <li>
                                <a href="#">tooling借出 </a>
                            </li>
                            <li>
                                <a href="#">tooling归还</a>
                            </li>
                            <li>
                                <a href="#">Correlation wafer借出</a>
                            </li>
                            <li>
                                <a href="#">Correlation wafer归还 </a>
                            </li>
                            <li>
                                <a href="#">INK領出</a>
                            </li>
                            <li>
                                <a href="#">INK归还</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-table fa-fw"></i> 针卡保养<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#">针卡保养</a>
                            </li>
                            <li>
                                <a href="#">针卡保养纪录</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-edit fa-fw"></i> 进出纪录<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#">针卡借出归还纪录</a>
                            </li>
                            <li>
                                <a href="#">tooling借出归还纪录</a>
                            </li>
                            <li>
                                <a href="#">Correlation wafer借出归还纪录</a>
                            </li>
                            <li>
                                <a href="#">消耗品借出归还纪录</a>
                            </li>
                            <li>
                                <a href="#"> 檔案修改紀錄</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-wrench fa-fw"></i> UI Elements<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#">Panels and Wells</a>
                            </li>
                            <li>
                                <a href="#">Buttons</a>
                            </li>
                            <li>
                                <a href="#">Notifications</a>
                            </li>
                            <li>
                                <a href="#">Typography</a>
                            </li>
                            <li>
                                <a href="#"> Icons</a>
                            </li>
                            <li>
                                <a href="#">Grid</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1200px;left: -300px">
                <div class="panel-default panel">
                    <div class="panel-heading">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">针卡建档</h4>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="needCardModifyForm" method="post" action="<c:url value="/needleCard/addNewNeedleCard"/> ">
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">针卡编号</label>
                                    <input class="form-control" name="needleCardNumber" id="needleCardNumber"
                                           style="width: 45%;" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">客户</label>
                                    <input class="form-control" name="customer" id="customer" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">客户编号</label>
                                    <input class="form-control" name="customerCode" id="customerCode" style="width: 45%"
                                           type="text">

                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">来源日期</label>
                                    <input class="form-control" name="incomingDate" id="incomingDate" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">厂商</label>
                                    <input class="form-control" name="factory" id="factory" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">厂商编号</label>
                                    <input class="form-control" name="factoryNumber" id="factoryNumber"
                                           style="width: 45%" type="text">
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">适用机台</label>
                                    <input class="form-control" name="applicableMachine" id="applicableMachine"
                                           style="width: 45%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">Dut 数</label>
                                    <input class="form-control" name="dutNumber" id="dutNumber" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">Pin 数</label>
                                    <input class="form-control" name="pinNumber" id="pinNumber" style="width: 45%"
                                           type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">柜位</label>
                                    <input class="form-control" name="counter" id="counter" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">來源</label>
                                    <input class="form-control" name="source" id="source" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">PM时机</label>
                                    <input class="form-control" name="pmTime" id="pmTime" style="width: 45%"
                                           type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">类 型</label>
                                    <select class="form-control" name="type" id="type" style="width: 45%">
                                        <option value="CAMTILEVER">CAMTILEVER</option>
                                        <option value="COBRA">COBRA</option>
                                        <option value="POGO_PIN">POGO PIN</option>
                                        <option value="MEMS">MEMS</option>
                                        <option value="MEMBRAME">MEMBRAME</option>

                                    </select>
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">新旧</label>
                                    <select class="form-control" name="newOld" id="newOld" style="width: 45%">
                                        <option value="new">新</option>
                                        <option value="old">旧</option>
                                    </select>
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">cleanType</label>
                                    <select class="form-control" name="cleanType" id="cleanType" style="width: 45%">
                                        <option value="3M_3um">3M 3um</option>
                                        <option value="MIPOX_GC8000">MIPOX GC8000</option>
                                        <option value="MIPOX_SI10000">MIPOX SI10000</option>
                                        <option value="MIPOX_WA6000">MIPOX WA6000</option>
                                        <option value="ITS PP150">ITS PP150</option>

                                    </select>
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-4">针长spec</label>
                                    <input class="form-control" name="needleLengthSpec" id="needleLengthSpec"
                                           style="width: 35%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">针径spec</label>
                                    <input class="form-control" name="needleDiameterSpec" id="needleDiameterSpec"
                                           style="width: 35%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-4">水平spec</label>
                                    <input class="form-control" name="levelSpec" id="levelSpec" style="width: 35%"
                                           type="text">
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-4">
                                    <label class="col-lg-3">状态</label>
                                    <select class="form-control" name="state" id="state" style="width:45%;">
                                        <option value="newProject">新品入库</option>
                                        <option value="remake">重新制作</option>
                                        <option value="IQC">IQC</option>
                                        <option value="IQC_pass">IQC pass</option>
                                        <option value="IQC_fail">IQC fail</option>
                                        <option value="repairedIQC">维修后IQC</option>
                                        <option value="repairedIQC_fail">维修后IQC fail</option>
                                        <option value="testing">测试中</option>
                                        <option value="Engineering">工程中</option>
                                        <option value="return">归还</option>
                                        <option value="usable">堪用</option>
                                        <option value="maintainingPM">保养中PM</option>
                                        <option value="repairing">维修中</option>
                                        <option value="offSiteMaintenance">厂外维修</option>
                                        <option value="offSiteMaintenanceReturn">厂外维修返回</option>
                                        <option value="customerLend">客户借出</option>
                                        <option value="customerLendReturn">客户借出返回</option>
                                        <option value="disuse">停用</option>
                                        <option value="waitingPlate">待拆板</option>
                                    </select>
                                </p>

                                <p class="col-lg-4">
                                    <label class="col-lg-3">DEPTH</label>
                                    <input class="form-control" name="depth" id="depth" style="width: 45%" type="text">
                                </p>
                                <p class="col-lg-4">
                                    <label class="col-lg-3">作业人员</label>
                                    <input class="form-control" name="operator" id="operator" style="width: 45%"
                                           type="text" disabled>
                                </p>

                            </div>
                            <div class="form-group">
                                <p class="col-lg-6">
                                    <label class="col-lg-2">型号</label>
                                    <input class="form-control" name="cardModel" id="cardModel" style="width: 45%"
                                           type="text">
                                </p>
                                <p class="col-lg-6">
                                    <label class="col-lg-3">财产单位</label>
                                    <input class="form-control" name="propertyUnit" id="propertyUnit" style="width: 45%"
                                           type="text">
                                </p>
                            </div>
                            <div class="form-group">
                                <p class="col-lg-6" style="display: none">
                                    <label class="col-lg-3">是否release</label>
                                    <select class="form-control" name="isRelease" id="isRelease" style="width: 45%;">
                                        <option value="Release">Release</option>
                                        <option value="Unreleased">Unreleased</option>
                                    </select>
                                </p>
                            </div>
                            <div class="form-group">

                                <p class="col-lg-12">
                                    <label class="col-lg-1">备注</label>
                                    <textarea class="form-control" name="remarks" id="remarks" style="width: 90%"
                                              rows="3"></textarea>
                                </p>
                            </div>
                            <input class="button  button-primary button-pill  button-3d pull-right" type="submit"
                                   value="Submit" id="submit">
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id='page-wrapper'>
        <div class="row" id="needleCardSearchPage" style="display: none;">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        针卡档案搜寻
                    </div>
                </div>
                <div class="panel-body">
                    <div id="toolbar" class="btn-group" style="float: left;">
                        <button id="btnAdd" type="button" class="btn btn-default">
                            <span class="fa fa-plus" aria-hidden="true"></span>针卡建档
                        </button>
                    </div>
                    <table id="needleCardTable">
                    </table>
                </div>
            </div>
        </div>
        <div class="row" id="homePage">
            <div id="ordinaryPage">
                <img src="<c:url value="/image/logo-font.png"/> " style="width: 90%;">
            </div>
            <div id="adminPage">
                <div class="row">
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-file fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">26</div>
                                        <div>档案</div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="dropdown">
                                    <a data-toggle="dropdown" href="#">
                                        <div><span class="pull-left">View Details</span>
                                            <span class="pull-right"><i class="fa fa-bars"></i></span>
                                            <div class="clearfix"></div>
                                        </div>
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li>
                                            <a href="#">针卡档案</a>
                                        </li>
                                        <li>
                                            <a href="#">tooling档案</a>
                                        </li>
                                        <li>
                                            <a href="#">Correlation wafer档案</a>
                                        </li>
                                        <li>
                                            <a href="#">消耗品檔案</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-send fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">12</div>
                                        <div>借出归还</div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="dropdown">
                                    <a data-toggle="dropdown" href="#">
                                        <div><span class="pull-left">View Details</span>
                                            <span class="pull-right"><i class="fa fa-bars"></i></span>
                                            <div class="clearfix"></div>
                                        </div>
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li>
                                            <a href="transferRecord.html?N">针卡借出归还纪录</a>
                                        </li>
                                        <li>
                                            <a href="transferRecord.html?T">tooling借出归还纪录</a>
                                        </li>
                                        <li>
                                            <a href="transferRecord.html?M">Correlation wafer借出归还纪录</a>
                                        </li>
                                        <li>
                                            <a href="transferRecord.html?S">消耗品借出归还纪录</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-recycle fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">13</div>
                                        <div>针卡保养</div>
                                    </div>
                                </div>
                            </div>
                            <a href="needleCardMaintain.html?R">
                                <div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-edit fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">13</div>
                                        <div>档案修改</div>
                                    </div>
                                </div>
                            </div>
                            <a href="transferRecord.html?A">
                                <div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-user fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">13</div>
                                        <div>人员变更</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="fa fa-bar-chart-o fa-fw"></i>Chart1
                            </div>
                            <div class="panel-body">
                                <div id="chart1"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="fa fa-bar-chart-o fa-fw"></i>Chart2
                            </div>
                            <div class="panel-body">
                                <div id="chart2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
