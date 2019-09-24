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
    $("#useEquipment").val("");
    $("#dutCount").val("");
    $("#pinCount").val("");
    $("#currTd").val("");
    $("#tdTotal").val("");
    $("#cardType").val("");
    $("#pinLen").val("");
    $("#pinDiam").val("");
    $("#pinLevel").val("");
    $("#extenCount").val("");
    $("#lastProcess").val("");
    $("#marksFlag").val("");
    $("#cardYield").val("");
    $("#currentProcess").val("");
    $("#extenFlag").val("");
    $("#creator").val("");
    $("#note").val("");
}
function selectChange(value){
    var extensionData=[];
    var releaseFlag=false;
    var state=[];
    exData="";
    $.ajax({
        type:'get',
        async: false,
        url:"/toolingweb/needleCard/getProberCardStatus?proberCardId="+value,
        success:function (data) {
            state=data;
        }
    })
    formClean();
        if(value!="choose"){
            $.ajax({
                type:'get',
                async: false,
                url:"/toolingweb/needleCard/getProberCardReleaseFlag?proberCardId="+value,
                success:function (data) {
                    releaseFlag=data;
                }
            })
            $.ajax({
                type:"get",
                async: false,
                dataType:"json",
                url:"/toolingweb/needleCard/getEXInfoSingle?proberCardId="+value,
                success:function (data) {
                    extensionData=data;
                }
            })
            var rows=JSON.stringify(extensionData).replace("{","").replace("}","").replace("]","").replace("[","").trim().split(",");
            for(var k=0;k<rows.length;k++){
                alert(rows[k])
                var rowIndex=rows[k].indexOf(":");
                var title=rows[k].substring(1,rowIndex-1);
                var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                if(title=="dutCount"||title=="pinCount"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                }
                if(title=="marksFlag"||title=="extenFlag"){
                    field=rows[k].substring(rowIndex+1,rows[k].length);
                    $('#'+title).find('option[value='+field+']').attr("selected",true);
                }
                $('#'+title).val(field);
            }
            $("#lastProcess").val("");
            $("#lastProcess").val(state);
            $("#currentProcess").html("");
            if(releaseFlag){
                $("#currentProcess").append('<option value="Production_Verify">测试/验证中</option>'+
                    '<option value="Card_PM">保养中</option>'+
                '<option value="Un_Sealed">待拆版</option>');
                flag=true;
            }else {
                $("#currentProcess").append('<option value="Out_Fixing">场外维修</option>');
                flag=true;
                alert("此卡尚未release");
            }
        }else{
            flag=false;
        }
}
$(document).ready(function () {
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getProberCardEX",
        success:function (data) {
            $.each(data,function (i,item) {
                $("#proberCardId").append('<option value="'+item+'">'+item+'</option>');
            })
        }
    })
    var warning='<i class="fa fa-exclamation-triangle" style="color: red"></i>';
    jQuery.validator.addMethod("isOperator",function (value,element) {
        var operator=/^[a-z||A-Z]{1}\d{3}$]*|^\d{4}$/;
        return this.optional(element)||(operator.test(value));
    },warning+"v111或1111");
    jQuery.validator.addMethod("isPercent",function (value,element) {
        var percent= /^\d+\.?\d{0,2}$/;
        return this.optional(element)||(percent.test(value));
    },warning+"格式（90)");
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
    $("#needleCardExtensionForm").validate({
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
            cardYield:{
                required: true,
                isPercent:true
            },
            updateOperator:{
                required:true,
                isOperator:true
            },
            pinLen:{
                required:true,
            isNumber:true
            },
            pinDiam:{
                required:true,
                isNumber:true
            },
            pinLevel:{
                required:true,
                isNumber:true
            },
            creator:{
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
                            url:"/toolingweb/needleCard/addProberCardEX",
                            data:$(form).serialize(),
                            error:function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest.status);
                                console.log(XMLHttpRequest.readyState);
                                console.log(textStatus);
                                alert("add failed!,please check your information again!")
                            },
                            success:function () {
                                alert("Extension success!")
                                document.getElementById("needleCardExtensionForm").reset();
                            }
                        }

                    );
                }
            }else {
                $("#error").html("");
                $("#error").html("该针卡不符合要求或不在维修清针这个状态");
                $("#myModal").modal('show');
            }

            return false;

        }
    });
})