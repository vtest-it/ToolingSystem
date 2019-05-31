$(document).ready(function() {
    // var link = document.querySelector('link[rel="import"]');
    // var content = link.import;
    // var el = content.querySelector('.navbar');
    // document.getElementById("wrapper").prepend(el.cloneNode(true));
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
    $("#btnAdd").on('click',function () {
        $("#cardType").find("option:selected").attr("selected",false);
        $("#newOld").find("option:selected").attr("selected",false);
        $("#cleanType").find("option:selected").attr("selected",false);
        $("#releaseFlag").empty();
        $("#releaseFlag").append(' <option value="Unreleased">Unreleased</option>')
        $("#state").empty();
        $("#state").append(' <option value="New_Prod">新品入库</option>')
        $("#needCardModifyForm")[0].reset();
        $("#myModalLabel").text("针卡建档");
        $("#myModal").modal('show');
        $("#releaseFlag").parent().hide();
        $("#submit").show();
        $("#editBtn").hide();

    })
    var needleCardData=[];
    var proberCardStatus=[];
    var IQCRecord=[];
    var maintainRecord=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllProberCardStatus",
        success:function (data) {
            proberCardStatus=data;
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
        url:"/toolingweb/needleCard/getAllProberCardInfos",
        success:function (data) {
            $.each(data,function (i,item) {
                var time=getSmpFormatDateByLong(item.receiptTime,true);
                if(item.releaseFlag){
                    item.releaseFlag="Release";
                }else {
                    item.releaseFlag="Unreleased";
                }
                if(item.newOld){
                    item.newOld="new";
                }else {
                    item.newOld="old";
                }
                item.receiptTime=time;
                $.each(proberCardStatus,function (j,issure) {
                    if(issure.proberCardId==item.proberCardId){
                        item.state=issure.currentProcess;
                    }
                })
                $.each(IQCRecord,function (k,m) {
                    if(m.proberCardId==item.proberCardId){
                        item.pinMinlen=m.pinMinlen;
                        item.pinMaxdiam=m.pinMaxdiam;
                        item.pinLevel=m.pinLevel;
                    }
                })
                $.each(maintainRecord,function (t,d) {
                    if(d.proberCardId==item.proberCardId){
                        item.afterPinlen=d.afterPinlen;
                        item.afterPindiam=d.afterPindiam;
                        item.afterPinlevel=d.afterPinlevel;
                    }
                })
            })
            needleCardData=data;


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
            {title:"操作",formatter:function (value,row,index) {
                    return['<button id="btnEdit" type="button" class="btn btn-default"> <span class="fa fa-edit" aria-hidden="true"></span>修改 </button>'].join("");
                },events:{
                    "click #btnEdit":function (e,value,row,index) {
                        $("#submit").attr('value','修改');
                        $("#needCardModifyForm")[0].reset();
                        $("#submit").attr("proberCardID",row.proberCardId);
                        $("#myModalLabel").text("针卡档案修改");
                        $("#myModal").modal('show');
                        $("#releaseFlag").parent().show();
                        $("#releaseFlag").empty();
                        $("#releaseFlag").append('<option value="Release">Release</option><option value="Unreleased">Unreleased</option>')
                        $("#state").empty();
                        $("#state").append( '<option value="New_Prod">新品入库</option>'+
                            '<option value="IQC">IQC</option>'+
                            '<option value="IQC_PASS">IQC PASS</option>'+
                            '<option value="IQC_FAIL">IQC FAIL</option>'+
                            '<option value="Re_IQC">维修后IQC</option>'+
                            '<option value="ReIQC_PASS">维修后IQC PASS</option>'+
                            '<option value="ReIQC_FAIL">维修后IQC FAIL</option>'+
                            '<option value="Production_Verify">测试/验证中</option>'+
                            '<option value="In_Engineering">工程中</option>'+
                            '<option value="Inner_Back">内部归还</option>'+
                            '<option value="Final">归还客户</option>'+
                            '<option value="Card_PM">保养中 PM</option>'+
                            '<option value="Inner_Repair">维修清针</option>'+
                            '<option value="Out_Fixing">厂外维修</option>'+
                            '<option value="Back_Fixing">厂外维修返回</option>'+
                            '<option value="Cust_Lending">客户借出</option>'+
                            '<option value="Cust_Lending">客户借出返回</option>'+
                            '<option value="Card_Idle">针卡待料 </option>'+
                            '<option value="Un_Sealed">待拆版</option>'+
                            '<option value="Re_Build">重新制作</option>'+
                            '<option value="ReBuild_Back">重新制作返回</option>'+
                            '<option value="Card_Check">针卡验收</option>'+
                            '<option value="Card_Release">针卡Release</option>');
                        var rows=JSON.stringify(row).replace("{","").replace("}","").trim().split(",");
                        for(var k=0;k<rows.length;k++){
                            var rowIndex=rows[k].indexOf(":");
                            var title=rows[k].substring(1,rowIndex-1);
                            var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                            if(title=="dutCount"||title=="glassMask"||title=="mylarMask"||title=="pinCount"){
                                field=rows[k].substring(rowIndex+1,rows[k].length);
                            }
                            if(title=="cardType"||title=="cleanType"||title=="state"){
                                $('#'+title).find('option[value='+field+']').attr("selected",true);
                                // $('#'+title).find('option:contains('+field+')').attr("selected",true);
                            }else if(title=='newOld'){
                                field=rows[k].substring(rowIndex+1,rows[k].length);
                                if(field=='true'){
                                    $('#newOld').find('option:contains("新")').attr("selected",true);
                                }else {
                                    $('#newOld').find('option:contains("旧")').attr("selected",true);
                                }
                            } else if(title=="releaseFlag"){
                                field=rows[k].substring(rowIndex+1,rows[k].length);
                                if(field=='true'){
                                    $('#releaseFlag').find('option:contains("Release")').attr("selected",true);
                                }else {
                                    $('#releaseFlag').find('option:contains("Unreleased")').attr("selected",true);
                                }
                            }else{
                                $('#'+title).val(field)
                            }

                        }

                    }
                }
            },{
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
            },{
                title:"通用机台",field:"useEquipment"
            },
            {
                title:"当前状态",field:"state"
            },
            {
                title:"是否Release",field:"releaseFlag"
            },
            {
                title:"Dut数",field:"dutCount"
            },{
                title:"Pin数",field:"pinCount"
            },
            {
                title:"新旧",field:"newOld"
            },
            {
                title:"clean type",field:"cleanType"
            },
            {
                title:"类型",field:"cardType"
            },{
                title:"TD",field:"TD"
            },
            {
                title:"TD Total",field:"tdTotal"
            },
            {
                title:"距下次PM可測TD",field:"nextTD"
            },
            {
                title:"剩餘可測TD",field:"remainingTD"
            },{
                title:"针长",field:"afterPinlen",cellStyle:function (value,row,index,field) {
                    if(value<row.pinlenSpec){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"針徑",field:"afterPindiam",cellStyle:function (value,row,index,field) {
                    if(value>row.pindiamSpec){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"水平",field:"afterPinlevel",cellStyle:function (value,row,index,field) {
                    if(value!=row.pinlevelSpec){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
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
                title:"開始針長",field:"pinMinlen"
            },
            {
                title:"開始針徑",field:"pinMaxdiam"
            },{
                title:"開始水平",field:"pinLevel"
            },{
                title:"針長Spec",field:"pinlenSpec"
            },
            {
                title:"針徑Spec",field:"pindiamSpec"
            },{
                title:"水平Spec",field:"pinlevelSpec"
            },
            {
                title:"客戶編號",field:"custNo"
            },
            {
                title:"廠商編號",field:"vendorNo"
            },
            {
                title:"Rebuild次數",field:"rebuildCount"
            },
            {
                title:"GlassMask",field:"glassMask"
            },
            {
                title:"MylarMask",field:"mylarMask"
            },{
                title:"建檔日期",field:"receiptTime"
            },
            {
                title:"建檔人員",field:"operator"
            },
            {
                title:"修改日期",field:"editTime"
            },
            {
                title:"修改人員",field:"editOperator"
            },
            {
                title:"備註",field:"note"
            }],
        // selectItemName: 'parentItem'
    })
    var warning='<i class="fa fa-exclamation-triangle" style="color: red"></i>';
    jQuery.validator.addMethod("isNumber",function (value,element) {
        //var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/;
        var number=/^^\d+(\.\d+)?$/;
        return this.optional(element)||(number.test(value));
    },warning+"非负数");
    jQuery.validator.addMethod("isPositiveInteger",function (value,element) {
        var positiveInteger=/^[0-9]\d*$/;
        return this.optional(element)||(positiveInteger.test(value));
    },warning+"非负整数");
    jQuery.validator.addMethod("isNumberOrLetter",function (value,element) {
        var numberOrLetter=/^[a-zA-Z\u4e00-\u9fa5]+$/;
        return this.optional(element)||(numberOrLetter.test(value));
    },warning+"中文加英文");

    jQuery.validator.addMethod("isNumberAndLetter",function (value,element) {
        var numberAndLetter=/^[a-zA-Z0-9_\\-]+$/;
        return this.optional(element)||(numberAndLetter.test(value));
    },warning+"英文数字-_");

    jQuery.validator.addMethod("isOperator",function (value,element) {
        var operator=/^[a-z||A-Z]{1}\d{1,6}]*$/;
        return this.optional(element)||(operator.test(value));
    },warning+"格式（V900)");
    jQuery.validator.addMethod("isNumberD",function (value,element) {
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+(\+-(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+)*|0$/;
        return this.optional(element)||(number.test(value));
    },warning+"数字+-");
    jQuery.validator.addMethod("isCustomer",function (value,element) {
        var customer=/^([a-zA-Z]{3}|NA)*$/;
        return this.optional(element)||(customer.test(value));
    },warning+"三位字母或NA")
    $("#needCardModifyForm").validate({
        errorPlacement: function(error, element) {
            error.css({width:"30%",float:"right",color:"#DAA520"})
            error.appendTo(element.parent() );
        },
        errorElement:"div",
        rules: {
            proberCardId: {
                required: true,
                isNumberAndLetter:true
            },
            custName:{
                required:true,
                isCustomer:true
            },
            custNo:{
                isNumberAndLetter:true
            },
            vendorNo:{
                isNumberAndLetter:true
            },
            vendorName:{
                required:true,
                isNumberOrLetter:true
            },
            useEquipment:{
                required:true,
                isNumberAndLetter:true
            },
            cabPosition:{
                isNumberAndLetter:true
            },
            cardSource:{
                isNumberOrLetter:true
            },
            dutCount:{
                required:true,
                isPositiveInteger:true
            },
            pmTd:{
                required: true,
                isPositiveInteger:true
            },
            pinCount:{
                isPositiveInteger:true
            },
            pinlenSpec:{
                isNumber:true
            },
            receiptTime:{
                required: true
            },
            pinlevelSpec:{
                isNumber:true
            },
            pindepthSpec:{
                required:true,
                isNumber:true
            },
            cardModel:{
                required:true,
                isNumberAndLetter:true
            },
            pindiamSpec:{
                isNumberD:true
            },
            belongDept:{
                required:true,
                isNumberOrLetter:true
            },glassMask:{
                required:true,
                isPositiveInteger:true
            },
            mylarMask:{
                required:true,
                isPositiveInteger:true
            }
        },
        submitHandler:function (form) {
            var confirmFlag=confirm("请再次确认");
            if(confirmFlag==true) {
                var proberCardId;
                var state;
                var isReleaseFlag;
                var data= $(form).serializeArray();
                $.each(data,function (i,item) {
                    if(item.name=="proberCardId"){
                        proberCardId=item.value;
                    }
                    if(item.name=="state"){
                        state=item.value;
                    }
                    if(item.name=="releaseFlag"){
                        isReleaseFlag=item.value;
                    }
                })
                if($("#submit").attr("value")=="提交"){
                    $(form).ajaxSubmit({
                        type:'post',
                        url:'/toolingweb/needleCard/addNewNeedleCard',
                        data:$(form).serialize(),
                        error:function () {
                            alert("add failed!,please check your information again!")
                        }
                    });
                    var date=new Date();
                    var month=date.getMonth()+1;
                    var day=date.getDate();
                    if(month>=1&&month<=9){
                        month="0"+month;
                    }
                    if(day>=1&&day<=9){
                        day="0"+day;
                    }
                    var data= $(form).serializeArray();
                    var newDatas=[];
                    var newData=new Object();
                    $.each(data,function (i,item) {
                        newData[item.name]=item.value;
                    })
                    newDatas.push(newData);
                    $('#needleCardTable').bootstrapTable("append",newDatas);
                    $(form).resetForm();
                    $("#myModal").modal('hide');
                }else {
                    $(form).ajaxSubmit({
                        type:'post',
                        url:'/toolingweb/needleCard/updateProberCard',
                        data:$(form).serialize(),
                        error:function () {
                            alert("add failed!,please check your information again!")
                        },
                        success:function () {
                            $.ajax({
                                type:'post',
                                url:"/toolingweb/needleCard/updateSingleState?proberCardId="+proberCardId+"&currentProcess="+state
                            })
                            if(isReleaseFlag=="Release"){

                                $.ajax({
                                    type:'post',
                                    url:"/toolingweb/needleCard/updateProberCardReleaseFlag?proberCardId="+proberCardId+"&releaseFlag=true"
                                })
                            }else {
                                $.ajax({
                                    type:'post',
                                    url:"/toolingweb/needleCard/updateProberCardReleaseFlag?proberCardId="+proberCardId+"&releaseFlag=false"
                                })
                            }
                            alert("Update Success!")
                        }
                    });
                    $("#needleCardTable").bootstrapTable('refresh')
                    var data= $(form).serializeArray();
                    var id=$("#submit").attr("proberCardID");
                    var newData=new Object();
                    var editTime=new Date().format("yyyy-MM-dd hh:mm:ss");
                    $.each(data,function (i,item) {
                        newData[item.name]=item.value;
                        newData['editTime']=editTime;
                    })
                    $("#needleCardTable").bootstrapTable("updateByUniqueId",{id:id,row:newData});
                    $(form).resetForm();
                    $("#myModal").modal('hide');
                }

            }
            return false;
        }

    });
    $("#receiptTime").prop("readonly",true).datetimepicker({
        minView: "hour",
        todayBtn : "true",
        format: "yyyy-mm-dd hh:ii:ss",
        language: 'zh-CN',
        autoclose : true,
        startDate:new Date(new Date()-2000 * 60 * 60 * 24* 365),
        endDate:new Date()
    });
})