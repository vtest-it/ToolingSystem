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
    $("#TD").val("");
    $("#TDTotal").val("");
    $("#pmTd").val("");
    $("#pinlenSpec").val("");
    $("#pindiamSpec").val("");
    $("#pinlevelSpec").val("");
    $("#beforePinlen").val("");
    $("#beforePindiam").val("");
    $("#beforePinlevel").val("");
    $("#afterPinlen").val("");
    $("#afterPindiam").val("");
    $("#afterPinlevel").val("");
    $("#testerID").val("");
    $("#updateOperator").val("");
    $("#note").val("");
}
function selectChange(value){
    var lendingData=[]
    var lendFlag=false;
    var state="";
    var releaseFlag=false;
    var TD=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getTd",
        success:function (data) {
            TD=data;
        }
    })
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
                $.each(data,function (i,item) {
                    var time=getSmpFormatDateByLong(item.receiptTime,true);
                    item.receiptTime=time.substring(0,11);
                    $.each(TD,function (y,issue) {
                        if(value==issue.probercard){
                            data["TD"]=issue.td;
                            data["TDTotal"]=issue.tdTotal;
                        }
                    })
                })
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
        if(state=="Card_PM"&&lendFlag==true){
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                if(title=="dutCount"||title=="pinCount"||title=="TD"||title=="TDTotal"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                }
                $('#'+title).val(field);
            }
            $("#rebuildCount").val(1);
            $("#lastStation").val("");
            $("#lastStation").val(state);
            $("#oldStatus").val("");
            $("#oldStatus").val(state);
            $("#nextStation").html("");
            if(releaseFlag){
                $("#nextStation").append('<option value="Card_Idle">针卡待料</option>');
                flag=true;
            }else {
                alert("此卡尚未release");
            }

        } else if(state=="Inner_Repair"&&lendFlag==true){
            $("#backUse").show();
            for(var k=0;k<rows.length;k++){
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                if(title=="dutCount"||title=="pinCount"||title=="TD"||title=="TDTotal"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                }
                if(title=="receiptTime"){
                    field=new Date(parseInt(rows[k].substring(rowIndex+1,rows[k].length),10)).format("yyyy-MM-dd hh:mm:ss");
                }
                $('#'+title).val(field);
            }
            $("#lastStation").val("");
            $("#lastStation").val(state);
            $("#oldStatus").val("");
            $("#oldStatus").val(state);
            $("#nextStation").html("");
            if(releaseFlag){
                $("#nextStation").append('<option value="Card_Idle">针卡待料</option>'+
                    '<option value="ReIQC_PASS">维修后IQC PASS</option>'+
                    '<option value="IQC_PASS">IQC PASS</option>'+
                    '<option value="Extension">展延</option>');
            }else {
                $("#nextStation").append('<option value="IQC_PASS">IQC PASS</option>');
                alert("此卡尚未release");
            }
            flag=true;
        }

        else if(lendFlag==true&&state!="Card_PM"&&state!="Inner_Repair"){
            formClean();
            $("#error").html("");
            $("#error").html("存在这个针卡编号，但不在保养中和维修清针两种状态");
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
    $("#password").val("");
    $("#login").modal('show');
    $("#loginForm").validate({
        submitHandler:function (form) {
            $(form).ajaxSubmit({
                type:"post",
                data:$(form).serialize(),
                url:"/toolingweb/needleCard/checkPMPassword",
                success:function (message) {
                    console.log(message);
                    $("#pmFlag").html("");
                    $("#pmFlag").html('<option value="false">否</option><option value="true">是</option>')
                    $("#login").modal('hide');
                },
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                    $("#error").html("");
                    $("#error").html("账号或者密码错误！");
                    $("#myModal").modal('show');
                }
            })
            return false;
        }
    })
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
    $("#needleCardMaintain").validate({
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
            beforePinlen:{
                required: true,
                isNumber:true
            },
            beforePindiam:{
                required: true,
                isNumberD:true
            },
            beforePinlevel:{
                required: true,
                isNumber:true
            },
            afterPinlen:{
                required: true,
                isNumber:true
            },
            afterPindiam:{
                required: true,
                isNumberD:true
            },
            afterPinlevel:{
                required: true,
                isNumber:true
            },
            testerID:{
                required: true,
                isNumberAndLetter:true
            },
            updateOperator:{
                required:true,
                isOperator:true
            },
            confirmer:{
                required:true,
                isOperator:true
            }

        },submitHandler:function (form) {
            if (flag) {
                var confirmFlag = confirm("请再次确认");
                if (confirmFlag == true) {
                    var pmFlag;
                    var cardid;
                    var ownerid;
                    var data= $(form).serializeArray();
                    $.each(data,function (i,item) {
                        if(item.name=="pmFlag"){
                            pmFlag=item.value;
                        }
                        if(item.name=="proberCardId"){
                            cardid=item.value;
                        }
                        if(item.name=="confirmer"){
                            ownerid=item.value;
                        }
                    })
                    $(form).ajaxSubmit(
                        {
                            type: "post",
                            url: "/toolingweb/needleCard/ProberCardMaintain",
                            data: $(form).serialize(),
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest.status);
                                console.log(XMLHttpRequest.readyState);
                                console.log(textStatus);
                                alert("add failed!,please check your information again!")
                            },
                            success: function () {
                                if(pmFlag){
                                    $.ajax({
                                        type:"post",
                                        url:"/toolingweb/needleCard/cleanPM?cardid="+cardid+"&ownerid="+ownerid,
                                        success:function (message) {
                                            console.log(message)
                                        }
                                    })
                                }
                                alert("Maintain success!")
                                document.getElementById("needleCardMaintain").reset();
                            }
                        }
                    );
                } else {
                    $("#error").html("");
                    $("#error").html("不存在该针卡编号或不在保养中和维修清针这两种状态");
                    $("#myModal").modal('show');
                }

                return false;

            }
        }
    });
})