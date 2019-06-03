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
    $("#backuseEquipment").val("");
    $("#backOperator").val("");
    $("#createOperator").val("");
    $("#note").val("");
}
function issueChange(value) {
    if(value=="false"){
        $('#issueDesc').html("");
        $("#issueDesc").append('<option value="noAbnormity">无异常</option>')
    }else {
        $('#issueDesc').html("");
        $("#issueDesc").append('<option value="markAbnormity">针痕异常</option>' +
             '<option value="fixedSiteFail">固定site連續FAIL</option>' +
            '<option value="crashCard">撞卡</option>' +
            '<option value="lowYield">低良</option>' +
            '<option value="partDamage">零件損壞</option>' +
            '<option value="cleaning">清潔</option>')
    }
}
function selectChange(value){
    var lendingData=[]
    var lendFlag=true;
    var state="";
    var releaseFlag=false;
    $.ajax({
        type:'get',
        dataType:"json",
        async: false,
        url:"/toolingweb/needleCard/getSingletonProberCard?proberCardId="+value,
        success:function (data) {
            if(data==null){
                lendFlag=false;
            }else {
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
    $.ajax({
        type:'get',
        async: false,
        url:"/toolingweb/needleCard/getProberCardReleaseFlag?proberCardId="+value,
        success:function (data) {
            releaseFlag=data;
        }
    })
        var rows=JSON.stringify(lendingData).replace("{","").replace("}","").trim().split(",");
    if(state=="In_Engineering"&&lendFlag==true){
        $("#backUse").show();
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
        $("#nextStation").append('<option value="Out_Fixing">厂外维修</option>'+
            '<option value="Inner_Back">内部归还</option>'+
            '<option value="Card_Check">针卡验收</option>');
        flag=true;
    }
    else if(state=="Out_Fixing"&&lendFlag==true){
        $("#backUse").show();
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
        $("#nextStation").append('<option value="Back_Fixing">厂外维修返回</option>');
        flag=true;
    }
    else if(state=="Inner_Repair"&&lendFlag==true){
        $("#backUse").show();
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
        if(releaseFlag){
            $("#nextStation").append('<option value="Card_Idle">针卡待料</option>'+
                '<option value="ReIQC_PASS">维修后IQC PASS</option>'+
                '<option value="IQC_PASS">IQC PASS</option>');
        }else {
            $("#nextStation").append('<option value="ReIQC_PASS">维修后IQC PASS</option>'+
                '<option value="IQC_PASS">IQC PASS</option>');
            alert("此卡尚未release");
        }
        flag=true;
    }
    else if(state=="Production_Verify"&&lendFlag==true){
        $("#backUse").show();
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
        $("#nextStation").append('<option value="Inner_Back">内部归还</option>');
        flag=true;
    }
    else if(state=="Cust_Lending"&&lendFlag==true){
        $("#backUse").show();
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
        $("#nextStation").append('<option value="Cust_Back">客户借出返回</option>');
        flag=true;
    }
    else if(state=="RE_Build"&&lendFlag==true){
        $("#backUse").hide();
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
        if(releaseFlag){
            $("#nextStation").append('<option value="ReBuild_Back">重新制作返回待IQC</option>');
            flag=true;
        }else {
            alert("此卡尚未release");
        }
    }
        else if(lendFlag==true&&state!="In_Engineering"&&state!="Out_Fixing"&&state!="Inner_Repair"&&state!="Production_Verify"&&state!="Cust_Lending"&&state!="RE_Build"){
        $("#backUse").show();
            formClean();
            $("#error").html("");
            $("#error").html("存在这个针卡编号，但不在厂外维修，工程中,维修清针,测试/验证中,归还客户,客户借出和重新制作这七种状态");
            $("#myModal").modal('show');
           flag=false;
        }
        else if(lendFlag==false){
        $("#backUse").show();
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
        var operator=/^[a-z||A-Z]{1}\d{1,6}]*$/;
        return this.optional(element)||(operator.test(value));
    },warning+"格式（V900)");
    jQuery.validator.addMethod("isPercent",function (value,element) {
        var percent= /^\d+\.?\d{0,2}%$/;
        return this.optional(element)||(percent.test(value));
    },warning+"格式（90%)");
    jQuery.validator.addMethod("isNumber",function (value,element) {
        var number=/^^\d+(\.\d+)?$/;
        //var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/;
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
    jQuery.validator.addMethod("isNumberD",function (value,element) {
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+(\+-(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+)*|0$/;
        return this.optional(element)||(number.test(value));
    },warning+"数字+-");
    $("#needleCardReturnForm").validate({
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
            createOperator:{
                required:true,
                isOperator:true
            },
            backuseEquipment:{
                required:true,
                isNumberAndLetter:true
            }
            ,backOperator:{
                required:true,
                isOperator:true
            }
        },submitHandler:function (form) {
            if(flag){
                var confirmFlag=confirm("请再次确认");
                if($('#issueFlag option:selected') .val()=="false"){
                    $('#issueDesc').find('option[value="noAbnormity"]').attr("selected",true);
                }
                if(confirmFlag==true){
                    $(form).ajaxSubmit(
                        {
                            type:"post",
                            url:"/toolingweb/needleCard/backProberCard",
                            data:$(form).serialize(),
                            error:function () {
                                alert("add failed!,please check your information again!")
                            },
                            success:function () {
                                if($("#oldStatus").val()=="RE_Build"){
                                    var rebuildCount=0;
                                    $.ajax({
                                        type:'get',
                                        url:"/toolingweb/needleCard/getInfoRebuildCount?proberCardId="+$("#proberCardId").val(),
                                        success:function (data) {
                                            rebuildCount=data;
                                        }
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:"/toolingweb/needleCard/updateProberCardReleaseFlag?proberCardId="+$("#proberCardId").val()+"&releaseFlag=false",
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:"/toolingweb/needleCard/updateProberCardInfoReleaseFlag?proberCardId="+$("#proberCardId").val()+"&releaseFlag=false",
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:"/toolingweb/needleCard/updateProberCardItem?proberCardId="+$("#proberCardId").val()+"&pinlenSpec='0'&pindiamSpec='0'&pinlevelSpec='0'&rebuildCount="+rebuildCount,
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:"/toolingweb/needleCard/updateMaintainItem?proberCardId="+$("#proberCardId").val()+"&afterPinlen=0&afterPindiam=0&afterPinlevel=0",
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:"/toolingweb/needleCard/updateIQCItem?proberCardId="+$("#proberCardId").val()+"&pinMinlen=0&pinMaxdiam=0&pinLevel=0",
                                    })
                                }
                                document.getElementById("needleCardReturnForm").reset();
                                alert("Return success!");
                            }
                        }

                    );
                }

            }else {
                $("#error").html("");
                $("#error").html("不存在该针卡编号或不在厂外维修，工程中,维修清针,测试/验证中,归还客户,客户借出和重新制作这七种状态");
                $("#myModal").modal('show');
            }

            return false;

        }
    });
})