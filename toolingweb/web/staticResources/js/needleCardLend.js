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
var oldState="";
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
    $("#outuseEquipment").val("");
    $("#outOperator").val("");
    $("#operator").val("");
    $("#note").val("");
}
function selectChange(value){
    var lendingData=[]
    var lendFlag=true;
    var state="";
    $.ajax({
        type:'get',
        dataType:"json",
        async: false,
        // url:"/toolingweb/needleCard/getSingletonProberCard?"+value,
        url:"js/singleton.json",
        success:function (data) {
            if(data==null){
                lendFlag=false;
            }else {
                $.each(data,function (i,item) {
                    var time=getSmpFormatDateByLong(item.receiptTime,true);
                    item.receiptTime=time.substring(0,11);
                })
                lendingData=data;
            }

        }
    })
    // $.ajax({
    //     type:'get',
    //     dataType:"json",
    //     async: false,
    //     url:"/toolingweb/needleCard/?"+value,
    //     success:function (data) {
    //         state=JSON.stringify(data);
    //         oldState=JSON.stringify(data);
    //     }
    // })
    state="In_Engineering"
    oldState="In_Engineering"
    $.each(lendingData,function (i,item) {
        var rows=JSON.stringify(item).replace("{","").replace("}","").trim().split(",");
        if(state=="In_Engineering"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                $('#'+title).val(field);
            }
            $("#nextStation").html("");
            $("#nextStation").append('<option value="Out_Fixing">场外维修</option>'+
                '<option value="Inner_Repair">维修清针</option>'+
                '<option value="Card_housing">针卡在库</option>');
            flag=true;

        }else if(state=="Card_housing"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                $('#'+title).val(field);
            }
            $("#nextStation").html("");
            $("#nextStation").append('<option value="Out_Fixing">场外维修</option>'+
                '<option value="Production_Verify">测试/验证中</option>'+
                '<option value="Final">归还客户</option>'+
                '<option value="Card_Scarp">报废</option>'+
                '<option value="Cust_Lending">客户借出</option>');
            flag=true;
        }else if(state=="Card_Scarp"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                $('#'+title).val(field);
            }
            $("#nextStation").html("");
            $("#nextStation").append('<option value="Re_Build">重新制作</option>');
            flag=true;
        }
        else if(id==proberCardId&&state!="Card_Scarp"&&state!="Card_housing"&&state!="In_Engineering"){
            formClean();
            $("#error").html("");
            $("#error").html("存在这个针卡编号，但不在工程中，报废和针卡在库这三种状态");
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
    })
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
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/;
        return this.optional(element)||(number.test(value));
    },warning+"请填写正数");
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

    jQuery.validator.addMethod("isOperator",function (value,element) {
        var operator=/^[a-z||A-Z]{1}\d{1,6}]*$/;
        return this.optional(element)||(operator.test(value));
    },warning+"格式（V900)");
    jQuery.validator.addMethod("isNumberD",function (value,element) {
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+(\+-(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+)*$/;
        return this.optional(element)||(number.test(value));
    },warning+"数字+-");
    $("#needleCardLendForm").validate({
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
            outuseEquipment:{
                required:true,
                isNumberAndLetter:true
            },
            outOperator:{
                required:true,
                isOperator:true
            },
            operator:{
                required:true,
                isOperator:true
            }

        },submitHandler:function (form) {
            if(flag){
                var confirmFlag=confirm("请再次确认");
                if(confirmFlag==true){
                    var data=$(form).serialize()+"&oldStatus="+oldState;
                    $(form).ajaxSubmit(
                        {
                            type:"post",
                            dataType:"json",
                            url:"/toolingweb/needleCard/",
                            data:data,
                            error:function () {
                                alert("add failed!,please check your information again!")
                            }
                        }

                    );
                }

            }else {
                $("#error").html("");
                $("#error").html("不存在该针卡编号或不在NEW_IQC状态");
                $("#myModal").modal('show');
            }

            return false;

        }
    });
})