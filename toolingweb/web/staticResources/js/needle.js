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
    var needleCardData=[];
    var proberCardStatus=[];
    var IQCRecord=[];
    var maintainRecord=[];
    var TD=[];
    var tester=[];
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
        url:"/toolingweb/needleCard/getTd",
        success:function (data) {
            TD=data;
        }
    })
    $.ajax({
        type:"get",
        async: false,
        dataType:"json",
        url:"/toolingweb/needleCard/getAllIQCRecordByMinTime",
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
                $.each(TD,function (z,y) {
                    if(y.probercard==item.proberCardId){
                        item.TD=y.td;
                        item.tdTotal=y.tdTotal;
                        item.nextTD=y.remainTd;
                        if(y.remainTotal<=0){
                            item.remainingTD=null
                        }else {
                            item.remainingTD=y.remainTotal;
                        }


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
        pagination: true,                   //是否显示分页（*）
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 25,                       //每页的记录行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        pageList: [25, 50,100], //可供选择的每页的行数（*）
        strictSearch: false, //是否全局匹配,false模糊匹配
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: false, //是否启用点击选中行
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        cardView: false, //是否显示详细视图
        detailView: false, //是否显示父子表
        sortable: true, //是否启用排序
        fixedColumns:true,
        fixedNumber:1,
        height:580,
        uniqueId: "proberCardId",
        columns:[
            {title:"下载",formatter:function (value,row,index) {
                    return['<button id="btnPreview" type="button" class="btn btn-default">下载</button>'].join("");
                },events:{
                    "click #btnPreview":function (e,value,row,index) {
                        $("#previewTable>tbody").html("");
                        var proberCardId;
                        var rows=JSON.stringify(row).replace("{","").replace("}","").trim().split(",");
                        for(var k=0;k<rows.length;k++){
                            var rowIndex=rows[k].indexOf(":");
                            var title=rows[k].substring(1,rowIndex-1);
                            var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                            if(title=='proberCardId'){
                                proberCardId=field;
                            }
                        }
                        $.ajax({
                            type:"get",
                            async: false,
                            dataType:"json",
                            url:"/toolingweb/proberCard/"+proberCardId,
                            success:function (data) {
                                    for(var file of data){
                                        var fileName=file.split("\\")[3]
                                        var fileLink=proberCardId+"/"+fileName;
                                        var link='<a href="/toolingweb/download/'+fileLink+'">'+fileName+'</a>'
                                        $("#previewTable").append("<tr><td>"+link+"</td></tr>");
                                    }
                                }
                        })
                        $("#previewFile").modal('show');
                    }
                }
            },{
                title:"客户",field:"custName",
                visible:false
            },
            {
                title:"厂商",field:"vendorName",
                visible:false
            },
            {
                title:"型号",field:"cardModel",
                visible:false
            },
            {
                title:"编号",field:"proberCardId"
            },{
                title:"测试机台",field:"useEquipment"
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
                title:"TD",field:"TD",cellStyle:function (value,row,index,field) {
                    if(value>(row.pmTd)*0.82){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"TD Total",field:"tdTotal"
            },
            {
                title:"距下次PM可测TD",field:"nextTD"
            },
            {
                title:"预估可测TD",field:"remainingTD",cellStyle:function (value) {
                    if(value==undefined){
                        return {css:{'background-color':'blue'}}
                    }else {
                        return {};
                    }

                }
            },{
                title:"针长",field:"afterPinlen",cellStyle:function (value,row,index,field) {
                    if(value<parseFloat(row.pinlenSpec)){
                        return {css:{'background-color':'red'}}
                    }else if(value>parseFloat(row.pinlenSpec)&&value<parseFloat(row.pinlenSpec)+1.5){
                        return {css:{'background-color':'blue'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"针径",field:"afterPindiam",cellStyle:function (value,row,index,field) {
                    if(value>row.pindiamSpec){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"水平",field:"afterPinlevel",cellStyle:function (value,row,index,field) {
                    if(value>row.pinlevelSpec){
                        return {css:{'background-color':'red'}}
                    }else {
                        return {};
                    }
                }
            },
            {
                title:"柜位",field:"cabPosition",
                visible:false
            },{
                title:"财产单位",field:"belongDept",
                visible:false
            },
            {
                title:"PM时机",field:"pmTd",
                visible:false
            },
            {
                title:"开始针长",field:"pinMinlen",
                visible:false
            },
            {
                title:"开始针径",field:"pinMaxdiam",
                visible:false
            },{
                title:"开始水平",field:"pinLevel",
                visible:false
            },{
                title:"针长Spec",field:"pinlenSpec",
                visible:false
            },
            {
                title:"针径Spec",field:"pindiamSpec",
                visible:false
            },{
                title:"水平Spec",field:"pinlevelSpec",
                visible:false
            },
            {
                title:"客户编号",field:"custNo",
                visible:false
            },
            {
                title:"厂商编号",field:"vendorNo",
                visible:false
            },
            {
                title:"Rebuild次数",field:"rebuildCount",
                visible:false
            },
            {
                title:"GlassMask",field:"glassMask",
                visible:false
            },
            {
                title:"MylarMask",field:"mylarMask",
                visible:false
            },{
                title:"建档日期",field:"receiptTime",
                visible:false
            },
            {
                title:"建档人员",field:"creator",
                visible:false
            },{
                title:"确认人",field:"confirmer",
                visible:false
            },
            {
                title:"修改日期",field:"editTime",
                visible:false
            },
            {
                title:"修改人员",field:"editOperator",
                visible:false
            },
            {
                title:"备注",field:"note"
            }, {title:"操作",formatter:function (value,row,index) {
                    return['<button id="btnEdit" type="button" class="btn btn-default"> <span class="fa fa-edit" aria-hidden="true"></span>修改 </button>'].join("");
                },events:{
                    "click #btnEdit":function (e,value,row,index) {
                        $("#needCardModifyForm")[0].reset();
                        $("#myModal").modal('show');
                        $("#submit").attr("proberCardID",row.proberCardId);
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
                            '<option value="ReBuild_Back">重新制作返回IQC</option>'+
                            '<option value="Card_Check">针卡验收</option>'+
                            '<option value="Card_Release">针卡Release</option>'+
                            '<option value="Extension">展延</option>');
                        var rows=JSON.stringify(row).replace("{","").replace("}","").trim().split(",");
                        for(var k=0;k<rows.length;k++){
                            var rowIndex=rows[k].indexOf(":");
                            var title=rows[k].substring(1,rowIndex-1);
                            var field=rows[k].substring(rowIndex+2,rows[k].length-1);
                            if(title=="dutCount"||title=="glassMask"||title=="mylarMask"||title=="pinCount"){
                                field=rows[k].substring(rowIndex+1,rows[k].length).replace('"','').replace('"','');
                            }
                            if(title=="cardType"||title=="cleanType"||title=="state"){
                                $('#'+title).find('option[value='+field+']').attr("selected",true);
                                // $('#'+title).find('option:contains('+field+')').attr("selected",true);
                            }else if(title=='newOld'){
                                field=rows[k].substring(rowIndex+1,rows[k].length);
                                if(field=='"new"'){
                                    $('#newOld').find('option:contains("新")').attr("selected",true);
                                }else {
                                    $('#newOld').find('option:contains("旧")').attr("selected",true);
                                }
                            } else if(title=="releaseFlag"){
                                field=rows[k].substring(rowIndex+1,rows[k].length);
                                if(field=='"Release"'){
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
                    $(form).ajaxSubmit({
                        type:'post',
                        url:'/toolingweb/needleCard/updateProberCard',
                        data:$(form).serialize(),
                        error:function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest.status);
                            console.log(XMLHttpRequest.readyState);
                            console.log(textStatus);
                            alert("add failed!,please check your information again!")
                        },
                        success:function () {
                            $.ajax({
                                type:'post',
                                url:"/toolingweb/needleCard/updateSingleState?proberCardId="+proberCardId+"&currentProcess="+state
                            })
                            // if(isReleaseFlag=="Release"){
                            //
                            //     $.ajax({
                            //         type:'post',
                            //         url:"/toolingweb/needleCard/updateProberCardReleaseFlag?proberCardId="+proberCardId+"&releaseFlag=true"
                            //     })
                            // }else {
                            //     $.ajax({
                            //         type:'post',
                            //         url:"/toolingweb/needleCard/updateProberCardReleaseFlag?proberCardId="+proberCardId+"&releaseFlag=false"
                            //     })
                            // }
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
                        newData['editOperator']="v236";
                    })
                    $("#needleCardTable").bootstrapTable("updateByUniqueId",{id:id,row:newData});
                    $(form).resetForm();
                    $("#myModal").modal('hide');
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