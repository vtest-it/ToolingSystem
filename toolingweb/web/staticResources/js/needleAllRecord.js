$(document).ready(function() {
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    function getSmpFormatDate(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return getFormatDate(date, pattern);
    }
    function getSmpFormatNowDate(isFull) {
        return getSmpFormatDate(new Date(), isFull);
    }
    function getSmpFormatDateByLong(l, isFull) {
        return getSmpFormatDate(new Date(l), isFull);
    }
    function getFormatDateByLong(l, pattern) {
        return getFormatDate(new Date(l), pattern);
    }
    function getFormatDate(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    }
    function getTime(){
        var now=new Date();
        var year=now.getFullYear(),
            month=now.getMonth()+1,
            day=now.getDate(),
            hour=now.getHours(),
            minute=now.getMinutes(),
            week=now.getDay();
        if(week==7){
            week="日";
        }else if(week==6){
            week="六";
        }else if(week==5){
            week="五";
        }else if(week==4){
            week="四";
        }else if(week==3){
            week="三";
        }else if(week==2){
            week="二";
        }else if(week==1){
            week="一";
        }
        if(month>=1&&month<=9){
            month="0"+month;
        }
        if(day>=1&&day<=9){
            day="0"+day;
        }
        if(minute>=1&&minute<=9){
            minute="0"+minute;
        }
        $("#date").html("日期："+year+"-"+month+"-"+day+"&nbsp;"+hour+":"+minute+"&nbsp;星期"+week)

    }
    getTime();
    setInterval(getTime,1000);
    var custNameSet=new Set();
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllProberCardInfos",
        success:function (data) {
            $.each(data,function (i,item) {
                $("#needleCardSelect").append('<option value="'+item.proberCardId+'">'+item.proberCardId+'</option>');
                custNameSet.add(item.custName);
            })
        }
    });
    $.each(custNameSet,function(data){
        $("#custNameSelect").append('<option value="'+data+'">'+data+'</option>');
    })
    $("#confirm").click(function () {
        $("#tableBody").html("");
        var dataList=new Array();
        var nameList=new Array();
        var infoFlag=false;
        var iqcFlag=false;
        var outFlag=false;
        var backFlag=false;
        var maintainFlag=false;
        var releaseFlag=false;
        $("#needleCardSelect option:selected").each(function () {
            dataList.push($(this).val());
        })
        $("#custNameSelect option:selected").each(function () {
            nameList.push($(this).val());
        })
       if(dataList.length<1&&nameList.length>0){

        }
        $("#typeSelect option:selected").each(function () {
            if($(this).val()=="info"){
                infoFlag=true;
            }
            if($(this).val()=="iqc"){
                iqcFlag=true;
            }
            if($(this).val()=="out"){
                outFlag=true;
            }
            if($(this).val()=="back"){
                backFlag=true;
            }
            if($(this).val()=="maintain"){
                maintainFlag=true;
            }
            if($(this).val()=="release"){
                releaseFlag=true;
            }
        })
        if(backFlag){
            $("#tableBody").append('<table id="needleCardBackTable"></table>');
            var backProberCardRecord=[];
            $.ajax({
                type:"get",
                async: false,
                dataType:"json",
                url:"/toolingweb/needleCard/getBackProberCard?proberCardIdArrays="+dataList.toString(),
                success:function (data) {
                    $.each(data,function (i,item) {
                         item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
                    })
                    backProberCardRecord=data;
                }
            })
            $('#needleCardBackTable').bootstrapTable({
                data:backProberCardRecord,
                toolbar: '.scroll',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 25,                       //每页的记录行数（*）
                pageList: [25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                height:420,
                uniqueId: "proberCardId",
                showExport: true,  //是否显示导出按钮
                buttonsAlign:"right",  //按钮位置
                exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
                Icons:'glyphicon glyphicon-export', //导出图标
                exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
                exportOptions:{
                    // ignoreColumn: [0,1],  //忽略某一列的索引
                    fileName: 'backProberCardRecord',  //文件名称设置
                    worksheetName: 'backProberCardRecord',  //表格工作区名称
                    tableName: 'backProberCardRecord',
                    // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
                },
                columns:[
                    {
                        title:"针卡编号",field:"proberCardId"
                    },
                    {
                        title:"归还机台",field:"backuseEquipment"
                    },
                    {
                        title:"归还状态",field:"backStatus"
                    },{
                        title:"归还人员",field:"backOperator"
                    },
                    {
                        title:"是否异常",field:"issueFlag"
                    },
                    {
                        title:"异常描述",field:"issueDesc"
                    }
                    ,
                    {
                        title:"下一站",field:"nextStation"
                    }
                    ,
                    {
                        title:"备注",field:"note"
                    },
                    {
                        title:"建档时间",field:"loadTime"
                    }]
            })
        }
        if(outFlag){
            $("#tableBody").append('<table id="needleCardOutTable"></table>');
            var outProberCardRecord=[];
            $.ajax({
                type:"get",
                async: false,
                dataType:"json",
                url:"/toolingweb/needleCard/getOutProberCard?proberCardIdArrays="+dataList.toString(),
                success:function (data) {
                    $.each(data,function (i,item) {
                        item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
                    })
                    outProberCardRecord=data;
                }
            })
            $('#needleCardOutTable').bootstrapTable({
                data:outProberCardRecord,
                toolbar: '.scroll',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 25,                       //每页的记录行数（*）
                pageList: [25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                height:420,
                uniqueId: "proberCardId",
                showExport: true,  //是否显示导出按钮
                buttonsAlign:"right",  //按钮位置
                exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
                Icons:'glyphicon glyphicon-export', //导出图标
                exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
                exportOptions:{
                    // ignoreColumn: [0,1],  //忽略某一列的索引
                    fileName: 'outProberCardRecord',  //文件名称设置
                    worksheetName: 'outProberCardRecord',  //表格工作区名称
                    tableName: 'outProberCardRecord',
                    // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
                },
                columns:[
                    {
                        title:"针卡编号",field:"proberCardId"
                    },
                    {
                        title:"借出机台",field:"outUseEquipment"
                    },
                    {
                        title:"借出用途",field:"outUsing"
                    },{
                        title:"借出人员",field:"outOperator"
                    },
                    {
                        title:"下一站",field:"nextStation"
                    },
                    {
                        title:"备注",field:"note"
                    },
                    {
                        title:"建档时间",field:"loadTime"
                    }]
            })
        }
        if(infoFlag){
            $("#tableBody").append('<table id="needleCardInfoTable"></table>');
            var proberCardInfos=[];
            $.ajax({
                type:"get",
                async: false,
                dataType:"json",
                url:"/toolingweb/needleCard/getInfoProberCard?proberCardIdArrays="+dataList.toString(),
                success:function (data) {
                    $.each(data,function (i,item) {
                        item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
                    })
                    proberCardInfos=data;
                }
            })
            $('#needleCardInfoTable').bootstrapTable({
                data:proberCardInfos,
                toolbar: '.scroll',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 25,                       //每页的记录行数（*）
                pageList: [25, 50, 100],        //可供选择的每页的行数（*）
                search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                fixedColumns:true,
                fixedNumber:1,
                height:420,
                uniqueId: "proberCardId",
                showExport: true,  //是否显示导出按钮
                buttonsAlign:"right",  //按钮位置
                exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
                Icons:'glyphicon glyphicon-export', //导出图标
                exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
                exportOptions:{
                    // ignoreColumn: [0,1],  //忽略某一列的索引
                    fileName: 'proberCardInfos',  //文件名称设置
                    worksheetName: 'proberCardInfos',  //表格工作区名称
                    tableName: 'proberCardInfos',
                    // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
                },
                columns:[
                    {
                        title:"客户",field:"custName"
                    },
                    {
                        title:"厂商",field:"vendorName"
                    },
                    {
                        title:"型号",field:"cardModel"
                    },
                    {
                        title:"编号",field:"proberCardId"
                    },
                    {
                        title:"客户编号",field:"custNo"
                    },
                    {
                        title:"厂商编号",field:"vendorNo"
                    },{
                        title:"测试机台",field:"useEquipment"
                    },
                    {
                        title:"Dut数",field:"dutCount"
                    },{
                        title:"Pin数",field:"pinCount"
                    },
                    {
                        title:"柜位",field:"cabPosition"
                    },{
                        title:"财产单位",field:"belongDept"
                    },
                    {
                        title:"PM时机",field:"pmTd"
                    },
                    {
                        title:"新旧",field:"newOld"
                    },
                    {
                        title:"cleanType",field:"cleanType"
                    },{
                        title:"针长Spec",field:"pinlenSpec"
                    },{
                        title:"针径Spec",field:"pindiamSpec"
                    },
                    {
                        title:"水平Spec",field:"pinlevelSpec"
                    },
                    {
                        title:"depth",field:"pindepthSpec"
                    },
                    {
                        title:"TDTotal",field:"tdTotal"
                    },
                    {
                        title:"cardModel",field:"cardModel"
                    },{
                        title:"rebuildCount",field:"rebuildCount"
                    },{
                        title:"是否Release",field:"releaseFlag"
                    },{
                        title:"glassMask",field:"glassMask"
                    },
                    {
                        title:"mylarMask",field:"mylarMask"
                    },
                    {
                        title:"建档人员",field:"creator"
                    },
                    {
                        title:"确认人",field:"confirmer"
                    },
                    {
                        title:"备注",field:"note"
                    },{
                        title:"建档时间",field:"loadTime"
                    }]
            })
        }
        if(iqcFlag){
            $("#tableBody").append('<table id="needleCardIQCTable"></table>');
    var IQCRecord=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getIQCProberCard?proberCardIdArrays="+dataList.toString(),
        success:function (data) {
            $.each(data,function (i,item) {
                item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
            })
            IQCRecord=data;
        }
    })
    $('#needleCardIQCTable').bootstrapTable({
        data:IQCRecord,
        toolbar: '.scroll',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 25,                       //每页的记录行数（*）
        pageList: [25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height:420,
        uniqueId: "proberCardId",
        showExport: true,  //是否显示导出按钮
        buttonsAlign:"right",  //按钮位置
        exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
        Icons:'glyphicon glyphicon-export', //导出图标
        exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
        exportOptions:{
            // ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: 'IQCRecord',  //文件名称设置
            worksheetName: 'IQCRecord',  //表格工作区名称
            tableName: 'IQCRecord',
            // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
        },
        columns:[
            {
                title:"针卡编号",field:"proberCardId"
            },
            {
                title:"最大针长",field:"pinMaxlen"
            },
            {
                title:"最小针长",field:"pinMinlen"
            },{
                title:"最大针径",field:"pinMaxdiam"
            },
            {
                title:"最小针径",field:"pinMindiam"
            },{
                title:"水平",field:"pinLevel"
            },
            {
                title:"深度",field:"pinDepth"
            },{
                title:"更新人员",field:"updateOperator"
            },
            {
                title:"下一站",field:"nextStation"
            },
            {
                title:"备注",field:"note"
            },
            {
                title:"建档时间",field:"loadTime"
            }]
    })
}
if(maintainFlag){
    $("#tableBody").append('<table id="needleCardMaintainTable"></table>');
    var maintainRecord=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getMaintainProberCard?proberCardIdArrays="+dataList.toString(),
        success:function (data) {
            $.each(data,function (i,item) {
                item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
            })
            maintainRecord=data;
        }
    })
    $('#needleCardMaintainTable').bootstrapTable({
        data:maintainRecord,
        toolbar: '.scroll',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 25,                       //每页的记录行数（*）
        pageList: [25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        fixedColumns:true,
        fixedNumber:1,
        height:420,
        uniqueId: "proberCardId",
        showExport: true,  //是否显示导出按钮
        buttonsAlign:"right",  //按钮位置
        exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
        Icons:'glyphicon glyphicon-export', //导出图标
        exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
        exportOptions:{
            // ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: 'maintainRecord',  //文件名称设置
            worksheetName: 'maintainRecord',  //表格工作区名称
            tableName: 'maintainRecord',
            // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
        },
        columns:[
            {
                title:"针卡编号",field:"proberCardId"
            },
            {
                title:"维修前针长",field:"beforePinlen"
            },
            {
                title:"维修前针径",field:"beforePindiam"
            },{
                title:"维修前水平",field:"beforePinlevel"
            },
            {
                title:"维修后针长",field:"afterPinlen"
            },
            {
                title:"维修后针径",field:"afterPindiam"
            },
            {
                title:"维修后水平",field:"afterPinlevel"
            }
            ,
            {
                title:"清针量测",field:"cleanFlag"
            },
            {
                title:"是否磨针",field:"grindingFlag"
            },{
                title:"是否腐蚀",field:"corrosionFlag"
            },
            {
                title:"是否调针",field:"adjustmentFlag"
            },
            {
                title:"是否烘烤",field:"bakeFlag"
            },
            {
                title:"手磨针径",field:"handgrindFlag"
            }
            ,
            {
                title:"检查焊点",field:"handgrindFlag"
            },
            {
                title:"整理焊点",field:"handgrindFlag"
            }
            ,
            {
                title:"检查零件",field:"handgrindFlag"
            },
            {
                title:"零件更换",field:"handgrindFlag"
            }
            ,
            {
                title:"是否跳线",field:"handgrindFlag"
            } ,
            {
                title:"更新人员",field:"updateOperator"
            }
            ,
            {
                title:"下一站",field:"nextStation"
            },
            {
                title:"rebuildCount",field:"rebuildCount"
            }
            ,
            {
                title:"备注",field:"note"
            },
            {
                title:"建档时间",field:"loadTime"
            }]
    })
}
if(releaseFlag){
    $("#tableBody").append('<table id="needleCardReleaseTable"></table>');
    var releaseRecord=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getReleaseProberCard?proberCardIdArrays="+dataList.toString(),
        success:function (data) {
            $.each(data,function (i,item) {
                item.loadTime=getSmpFormatDateByLong(item.loadTime,true);
            })
            releaseRecord=data;
        }
    })
    $('#needleCardReleaseTable').bootstrapTable({
        data:releaseRecord,
        toolbar: '.scroll',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 25,                       //每页的记录行数（*）
        pageList: [25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height:420,
        uniqueId: "proberCardId",
        showExport: true,  //是否显示导出按钮
        buttonsAlign:"right",  //按钮位置
        exportDataType: 'all',   //导出的方式 all全部 selected已选择的  basic', 'all', 'selected'.
        Icons:'glyphicon glyphicon-export', //导出图标
        exportTypes:[ 'excel','doc','xlsx'],  //导出文件类型 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'
        exportOptions:{
            // ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: 'releaseRecord',  //文件名称设置
            worksheetName: 'releaseRecord',  //表格工作区名称
            tableName: 'releaseRecord',
            // excelstyles: ['background-color', 'color', 'font-size', 'font-weight'], 设置格式
        },
        columns:[
            {
                title:"针卡编号",field:"proberCardId"
            },
            {
                title:"工程验收",field:"pteOperator"
            },
            {
                title:"良率",field:"cardYield"
            },{
                title:"针痕验收",field:"cardOperator"
            },
            {
                title:"针痕",field:"pinMarks"
            },
            {
                title:"客戶是否同意release",field:"releaseFlag"
            },
            {
                title:"作业人员",field:"updateOperator"
            }
            ,
            {
                title:"备注",field:"note"
            },
            {
                title:"建档时间",field:"loadTime"
            }]
    })
}

    })

})