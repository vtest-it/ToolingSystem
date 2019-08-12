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
        var operator=/^[a-z||A-Z]{1}\d{3}$]*|^\d{4}$/;
        return this.optional(element)||(operator.test(value));
    },warning+"v111或1111");
    jQuery.validator.addMethod("isNumberD",function (value,element) {
        var number=/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+(\+-(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)+)*|0$/;
        return this.optional(element)||(number.test(value));
    },warning+"数字+-");
    jQuery.validator.addMethod("isCustomer",function (value,element) {
        var customer=/^([a-zA-Z]{3}|NA)*$/;
        return this.optional(element)||(customer.test(value));
    },warning+"字母或NA")
    $("#needCardModifyForm").validate({
        errorPlacement: function(error, element) {
            error.css({width:"25%",float:"right",color:"#DAA520"})
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
            },creator:{
                required:true,
                isOperator:true
            },
            confirmer:{
                required:true,
                isOperator:true
            }
        },
        submitHandler:function (form) {
            var confirmFlag=confirm("请再次确认");
            if(confirmFlag==true) {
                    $(form).ajaxSubmit({
                        type:'post',
                        url:'/toolingweb/needleCard/addNewNeedleCard',
                        data:$(form).serialize(),
                        error:function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest.status);
                            console.log(XMLHttpRequest.readyState);
                            console.log(textStatus);
                            alert("add failed!please check your information again!")
                        },
                        success:function () {
                            alert("add Success!")
                        }
                    });
                $(form).resetForm();
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