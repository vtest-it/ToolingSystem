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
    $("#editBtn").on('click',function () {
        var date=new Date();
        var month=date.getMonth()+1;
        var day=date.getDate();
        if(month>=1&&month<=9){
            month="0"+month;
        }
        if(day>=1&&day<=9){
            day="0"+day;
        }
        var data= $("#needCardModifyForm").serializeArray();
        var index=$("#editBtn").attr("index");
        var newDatas=[];
        var newData=new Object();
        $.each(data,function (i,item) {
            newData[item.name]=item.value;
        })
        newData["editTime"]=date.getFullYear()+"-"+month+"-"+day;
        newDatas.push(newData);
        $('#needleCardTable').bootstrapTable("updateRow",{index:index,row:newData});
        $.ajax({
            type:"post",
            url:"",
            data:newDatas
        })
    })
    var columns=[
        {title:"操作",formatter:function (value,row,index) {
                return['<button id="btnEdit" type="button" class="btn btn-default"> <span class="fa fa-edit" aria-hidden="true"></span>修改 </button>'].join("");
            },events:{
                "click #btnEdit":function (e,value,row,index) {
                    $("#needCardModifyForm")[0].reset();
                    $("#formSubmit").attr("index",index);
                    $("#myModalLabel").text("针卡档案修改");
                    $("#myModal").modal('show');
                    $("#releaseFlag").parent().show();
                    $("#releaseFlag").attr("disabled",false);
                    $("#state").empty();
                    $("#state").append( '<option value="newProject">新品入库</option>'+
                        '<option value="remake">重新制作</option>'+
                        '<option value="IQC">IQC</option>'+
                        '<option value="IQC_pass">IQC pass</option>'+
                        '<option value="IQC_fail">IQC fail</option>'+
                        '<option value="repairedIQC">维修后IQC</option>'+
                        '<option value="repairedIQC_fail">维修后IQC fail</option>'+
                        '<option value="testing">测试中</option>'+
                        '<option value="Engineering">工程中</option>'+
                        '<option value="return">归还</option>'+
                        '<option value="usable">堪用</option>'+
                        '<option value="maintainingPM">保养中PM</option>'+
                        '<option value="repairing">维修中</option>'+
                        '<option value="offSiteMaintenance">厂外维修</option>'+
                        '<option value="offSiteMaintenanceReturn">厂外维修返回</option>'+
                        '<option value="customerLend">客户借出</option>'+
                        '<option value="customerLendReturn">客户借出返回</option>'+
                        '<option value="disuse">停用</option>'+
                        '<option value="waitingPlate">待拆板</option>');
                    var rows=JSON.stringify(row).replace("{","").replace("}","").trim().split(",");
                    $("#submit").hide();
                    for(var k=0;k<rows.length;k++){
                        var rowIndex=rows[k].indexOf(":");
                        var title=rows[k].substring(1,rowIndex-1);
                        var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                        if(title=="cardType"||title=="cleanType"||title=="state"||title=="releaseFlag"){
                            $('#'+title).find('option[value='+field+']').attr("selected",true);
                            // $('#'+title).find('option:contains('+field+')').attr("selected",true);
                        }else if(title=='newOld'){
                            field=rows[k].substring(rowIndex+1,rows[k].length);
                            if(field=='true'){
                                $('#newOld').find('option:contains("新")').attr("selected",true);
                            }else {
                                $('#newOld').find('option:contains("旧")').attr("selected",true);
                            }
                        } else{
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
            title:"状态",field:"state"
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
            title:"针长",field:"pinlen"
        },
        {
            title:"針徑",field:"pindiam"
        },
        {
            title:"水平",field:"pinlevel"
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
            title:"開始針長",field:"pinlenSpec"
        },
        {
            title:"開始針徑",field:"pindiamSpec"
        },{
            title:"開始水平",field:"pinlevelSpec"
        },
        {
            title:"客戶編號",field:"custNo"
        },
        {
            title:"廠商編號",field:"vendorNo"
        },
        {
            title:"Rebuild次數",field:"rebuildTime"
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
        }];
    $("#submit").on('click',function () {

        // $.ajax({
        //     type: "get",
        //     url: "js/needleCard.json",
        //     async: false,
        //     dataType: 'json',
        //     success: function(data) {
        //         $.each(data,function (i,item) {
        //                 needleCardData.push(item);
        //                 var needleCard=JSON.stringify(item).replace("{","").replace("}","").trim().split(",");
        //                 for(var k=0;k<needleCard.length;k++){
        //                     var column=new Object();
        //                     var index=needleCard[k].indexOf(":")
        //                     column.field=needleCard[k].substring(1,index-1);
        //
        //                     columns.push(column);
        //                 }
        //
        //
        //         })
        //     }
        // });
        // $.each(columns,function (i,item) {
        //     $.each(name,function (k,issue) {
        //         if(i==k+1){
        //             item.title=issue;
        //         }
        //     })
        // })
    })
    $("#btnAdd").on('click',function () {
        $("#cardType").find("option:selected").attr("selected",false);
        $("#cardType").find('option:contains("...")').attr("selected",true);
        $("#newOld").find("option:selected").attr("selected",false);
        $("#newOld").find('option:contains("...")').attr("selected",true);
        $("#cleanType").find("option:selected").attr("selected",false);
        $("#cleanType").find('option:contains("...")').attr("selected",true);
        $("#releaseFlag").find("option:selected").attr("selected",false);
        $("#releaseFlag").find('option:contains("...")').attr("selected",true);
        $("#state").empty();
        $("#state").append(' <option value="newProject">新品入库</option>')
        $("#needCardModifyForm")[0].reset();
        $("#myModalLabel").text("针卡建档");
        $("#myModal").modal('show');
        $("#releaseFlag").parent().hide();
        $("#submit").show();
    })
    var needleCardData=[];
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllProberCardInfos",
        success:function (data) {
            $.each(data,function (i,item) {
                var time=getSmpFormatDateByLong(item.receiptTime,true);
                item.receiptTime=time.substring(0,11);
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
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        columns:columns
    })
    var warning='<i class="fa fa-exclamation-triangle" style="color: red"></i>';
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
                required:true,
                isNumberAndLetter:true
            },
            vendorNo:{
                required:true,
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
                required:true,
                isNumberAndLetter:true
            },
            cardSource:{
                required:true,
                isNumberOrLetter:true
            },
            dutCount:{
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
                required: true,
                isNumber:true
            },
            receiptTime:{
                required: true,
                dateISO:true
            },
            pinlevelSpec:{
                required: true,
                isNumber:true
            },
            pindepthSpec:{
                required: true,
                isNumber:true
            },
            cardModel:{
                required:true,
                isNumberAndLetter:true
            },
            pindiamSpec:{
                required:true,
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
            return false;
        }

    });
    $("#receiptTime").prop("readonly",true).datetimepicker({
        minView: "month",
        todayBtn : "true",
        format: "yyyy-mm-dd",
        language: 'zh-CN',
        autoclose : true,
        startDate:new Date(new Date()-2000 * 60 * 60 * 24* 365),
        endDate:new Date()
    });
})