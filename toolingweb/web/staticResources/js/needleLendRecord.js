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
    var needleCardData=[];
    var proberCardInfos=[];
    var IQCRecord=[];
    var maintainRecord=[];
    var outProberCardRecord=[];
    var backProberCardRecord=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllProberCardInfos",
        success:function (data) {
            proberCardInfos=data;
        }
    })
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllIQCRecord",
        success:function (data) {
            IQCRecord=data;
        }
    })
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllMaintainRecord",
        success:function (data) {
            maintainRecord=data;
        }
    })
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getOutProberCard",
        success:function (data) {
            $.each(data,function (i,item) {
                $.each(proberCardInfos,function (j,issues) {
                    if(item.proberCardId==issues.proberCardId){
                        item.custName=issues.custName;
                        item.vendorName=issues.vendorName;
                        item.cardModel=issues.cardModel;
                        item.custNo=issues.custNo;
                        item.vendorNo=issues.vendorNo;
                        item.useEquipment=issues.useEquipment;
                        item.cabPosition=issues.cabPosition;
                        item.belongDept=issues.belongDept;
                        item.pmTd=issues.pmTd;
                    }
                })
            })
        }
    })
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getBackProberCard",
        success:function (data) {
            backProberCardRecord=data;
        }
    })
    $('#needleCardTable').bootstrapTable({
        data:needleCardData,
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
                title:"开始针长",field:"pinMinlen"
            },
            {
                title:"开始针径",field:"pinMaxdiam"
            },{
                title:"开始水平",field:"pinLevel"
            },{
                title:"目前针长",field:"afterPinlen"
            },
            {
                title:"目前针径",field:"afterPindiam"
            },
            {
                title:"目前水平",field:"afterPinlevel"
            },
            {
                title:"建档日期",field:"receiptTime"
            },
            {
                title:"建档人员",field:"creator"
            },{
                title:"借出用途",field:"outUsing"
            },{
                title:"归还状态",field:"backStatus"
            },{
                title:"借出日期",field:"outTime"
            },
            {
              title:"归还日期",field:"BackTime"
            },
            {
                title:"借出/归还人员",field:"changeOperator"
            },
            {
                title:"作业人员",field:"operator"
            },
            {
                title:"备注",field:"note"
            }]
    })
})