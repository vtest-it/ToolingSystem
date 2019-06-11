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
var setCookie=function (name,value,day) {
    var expires=day*24*60*60*1000;
    var exp=new Date();
    exp.setTime(exp.getTime()+expires);
    document.cookie=name+"="+value+";expires="+exp.toUTCString();
}
var flag=false;
function formClean(){
    $("#custName").val("");
    $("#custNo").val("");
    $("#receiptTime").val("");
    $("#vendorName").val("");
    $("#vendorNo").val("");
    $("#useEquipment").val("");
    $("#dutCount").val("");
    $("#pinCount").val("");
    $("#cabPosition").val("");
    $("#belongDept").val("");
    $("#pmTd").val("");
    $("#pinMaxlen").val("");
    $("#pinMaxdiam").val("");
    $("#pinLevel").val("");
    $("#pinMinlen").val("");
    $("#pinMindiam").val("");
    $("#pinDepth").val("");
    $("#updateOperator").val("");
    $("#note").val("");
}
function selectChange(value){
    var lendingData=[]
    var lendFlag=false;
    var state="";
    $.ajax({
        type:'get',
        dataType:"json",
        async: false,
        url:"/toolingweb/needleCard/getSingletonProberCard?proberCardId="+value,
        success:function (data) {
            if(data==null){
                lendFlag=false;
            }else {
                lendFlag=true;
                lendingData=data;
            }

        }
    })
    $.ajax({
        type:'get',
        async: false,
        url:"/toolingweb/needleCard/getProberCardStatus?proberCardId="+value,
        success:function (data) {
            state=data;
        }
    })
        var rows=JSON.stringify(lendingData).replace("{","").replace("}","").trim().split(",");
        if(state=="IQC"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                if(title=="dutCount"||title=="pinCount"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                }
                if(title=="receiptTime"){
                    field=new Date(parseInt(rows[k].substring(rowIndex+1,rows[k].length),10)).format("yyyy-MM-dd hh:mm:ss");
                }
                $('#'+title).val(field);
            }
            $("#lastStation").val("");
            $("#lastStation").val(state);
            $("#nextStation").html("");
            $("#nextStation").append('<option value="IQC_PASS">IQC_PASS</option>'+
            '<option value="IQC_FAIL">IQC_FAIL</option>');
            flag=true;

        }
        else if(state=="Re_IQC"&&lendFlag==true){
        for(var k=0;k<rows.length;k++){
            var rowIndex=rows[k].indexOf(":");
            var title=rows[k].substring(1,rowIndex-1);
            var field=rows[k].substring(rowIndex+2,rows[k].length-1);
            if(title=="dutCount"||title=="pinCount"){
                field=rows[k].substring(rowIndex+1,rows[k].length);
            }
            if(title=="receiptTime"){
                field=new Date(parseInt(rows[k].substring(rowIndex+1,rows[k].length),10)).format("yyyy-MM-dd hh:mm:ss");
            }
            $('#'+title).val(field);
        }
        $("#lastStation").val("");
        $("#lastStation").val(state);
        $("#nextStation").html("");
        $("#nextStation").append('<option value="ReIQC_PASS">维修后IQC PASS</option>'+
            '<option value="ReIQC_FAIL">维修后IQC FAIL</option>');
        flag=true;

    }
   else if(state=="Back_Fixing"&&lendFlag==true){
        for(var k=0;k<rows.length;k++){
            var rowIndex=rows[k].indexOf(":");
            var title=rows[k].substring(1,rowIndex-1);
            var field=rows[k].substring(rowIndex+2,rows[k].length-1);
            if(title=="dutCount"||title=="pinCount"){
                field=rows[k].substring(rowIndex+1,rows[k].length);
            }
            if(title=="receiptTime"){
                field=new Date(parseInt(rows[k].substring(rowIndex+1,rows[k].length),10)).format("yyyy-MM-dd hh:mm:ss");
            }
            $('#'+title).val(field);
        }
        $("#lastStation").val("");
        $("#lastStation").val(state);
        $("#oldStatus").val(state);
        $("#nextStation").html("");
        $("#nextStation").append('<option value="IQC_PASS">IQC_PASS</option>'+
            '<option value="IQC_FAIL">IQC_FAIL</option>'+'<option value="ReIQC_PASS">维修后IQC PASS</option>'+
            '<option value="ReIQC_FAIL">维修后IQC FAIL</option>');
        flag=true;
    }
        else if(state=="ReBuild_Back"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                if(title=="dutCount"||title=="pinCount"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                }
                if(title=="receiptTime"){
                    field=new Date(parseInt(rows[k].substring(rowIndex+1,rows[k].length),10)).format("yyyy-MM-dd hh:mm:ss");
                }
                $('#'+title).val(field);
            }
            $("#lastStation").val("");
            $("#lastStation").val(state);
            $("#oldStatus").val(state);
            $("#nextStation").html("");
            $("#nextStation").append('<option value="IQC_PASS">IQC_PASS</option>'+
                '<option value="IQC_FAIL">IQC_FAIL</option>');
            flag=true;
        }
        else if(lendFlag==true&&state!="IQC"&&state!="Re_IQC"&&state!="ReBuild_Back"&&state!="Back_Fixing"){
            formClean();
            $("#error").html("");
            $("#error").html("存在这个针卡编号，但不在IQC,维修后IQC,重新制作返回待IQC，厂外维修返回这四种状态");
            $("#myModal").modal('show');
            flag=false;
        }
        else if(lendFlag==false){
            formClean();
            $("#error").html("");
            $("#error").html("不存在这个针卡编号");
            $("#myModal").modal('show');
            flag=false;
        }
}
$(document).ready(function () {
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
        if(minute>=0&&minute<=9){
            minute="0"+minute;
        }
        $("#date").html("日期："+year+"-"+month+"-"+day+"&nbsp;"+hour+":"+minute+"&nbsp;星期"+week)

    }
    getTime();
    setInterval(getTime,1000);
    var warning='<i class="fa fa-exclamation-triangle" style="color: red"></i>';
    jQuery.validator.addMethod("isOperator",function (value,element) {
        var operator=/^[a-z||A-Z]{1}\d{3}$]*|^\d{4}$/;
        return this.optional(element)||(operator.test(value));
    },warning+"v111或1111");
    jQuery.validator.addMethod("isPercent",function (value,element) {
        var percent= /^\d+\.?\d{0,2}%$/;
        return this.optional(element)||(percent.test(value));
    },warning+"格式（90%)");
    jQuery.validator.addMethod("isNumber",function (value,element) {
        //var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/;
        var number=/^^\d+(\.\d+)?$/;
        return this.optional(element)||(number.test(value));
    },warning+"非负数");
    jQuery.validator.addMethod("isPositiveInteger",function (value,element) {
        var positiveInteger=/^[1-9]\d*$/;
        return this.optional(element)||(positiveInteger.test(value));
    },warning+"请填写正整数");
    jQuery.validator.addMethod("isNumberOrLetter",function (value,element) {
        var numberOrLetter=/^[a-zA-Z\u4e00-\u9fa5]+$/;
        return this.optional(element)||(numberOrLetter.test(value));
    },warning+"中文加英文");

    jQuery.validator.addMethod("isNumberAndLetter",function (value,element) {
        var numberAndLetter=/^[a-zA-Z0-9_\\-]+$/;
        return this.optional(element)||(numberAndLetter.test(value));
    },warning+"英文数字-_");
    jQuery.validator.addMethod("isNumberD",function (value,element) {
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+(\+-(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+)*|0$/;
        return this.optional(element)||(number.test(value));
    },warning+"数字+-");
    $("#needleCardIQCForm").validate({
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
            pinMaxlen:{
                required: true,
                isNumber:true
            },
            pinMaxdiam:{
                required: true,
                isNumberD:true
            },
            pinLevel:{
                required: true,
                isNumber:true
            },
            pinMinlen:{
                required: true,
                isNumber:true
            },
            pinMindiam:{
                required: true,
                isNumberD:true
            },
            pinDepth:{
                required: true,
                isNumber:true
            },
            updateOperator:{
                required:true,
                isOperator:true
            }

        },submitHandler:function (form) {
            if(flag){
                var confirmFlag=confirm("请再次确认");
                if(confirmFlag==true){
                    $(form).ajaxSubmit(
                        {
                            type:"post",
                            url:"/toolingweb/needleCard/iqcRelease",
                            data:$(form).serialize(),
                            error:function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest.status);
                                console.log(XMLHttpRequest.readyState);
                                console.log(textStatus);
                                alert("add failed!,please check your information again!")
                            },
                            success:function () {
                                alert("IQC Release success!")
                                document.getElementById("needleCardIQCForm").reset();
                            }
                        }

                    );
                }
            }else {
                $("#error").html("");
                $("#error").html("不存在该针卡编号或不在IQC,维修后IQC,重新制作返回,厂外维修返回这四种状态");
                $("#myModal").modal('show');
            }

            return false;

        }
    });
})