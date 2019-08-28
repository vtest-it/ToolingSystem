$().ready(function() {
    $("#signupForm").validate({
        rules: {
            usernamesignup: {
                required: true,
                minlength: 2
            },
            passwordsignup: {
                required: true,
                minlength: 5
            },
            passwordsignup_confirm: {
                required: true,
                minlength: 5,
                equalTo: "#passwordsignup"
            },
            emailsignup: {
                required: true,
                email: true
            }
        },
        messages: {
            usernamesignup: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成"
            },
            passwordsignup: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            },
            passwordsignup_confirm: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母",
                equalTo: "两次密码输入不一致"
            },
            emailsignup: "请输入一个正确的邮箱"
        }
    });
});
function rememberPassword() {
    //存储变量
    this.userName = $('#userName').val();
    this.password = $('#password').val();
    this.cookie;
    if (!!$.cookie('user')) {
        this.cookie = eval($.cookie('user'));
    } else {
        $.cookie('user', '[]');
        this.cookie = eval($.cookie('user'));
    };
}
rememberPassword.prototype = {
    cookieInit: function() { //初始化
        var temp = this.cookie,
            userName = this.userName,
            start = false;
        console.log(temp);
        if (temp.length > 0) {
            $.each(temp, function(i, item) {
                if (item.first == true) {
                    $('#userName').val(item.userName);
                    $('#password').val(item.password);
                    $('#loginkeeping').attr('checked', true)
                }
            });
        }
        $('#userName').blur(function() {
            console.log('失去焦点');
            //检查是否存在该用户名,存在则赋值，不存在则不做任何操作
            $.each(temp, function(i, item) {
                if (item.userName == $('#userName').val()) {
                    $('#userName').val(item.userName);
                    $('#password').val(item.password);
                    $('#loginkeeping').attr('checked', true)
                    start = true;
                    return false;
                } else {
                    $('#password').val('');
                }

            });
        });
    },
    //记住密码
    cookieRemeber: function() {
        var temp = this.cookie,
            userName = this.userName,
            password = this.password,
            start = false;
        //检测用户是否存在
        $.each(temp, function(i, item) {
            if (item.userName == userName) {
                //记录最后一次是谁登录的
                item.first = true;
                $('#password').val(item.password);
                start = true;
                return;
            } else {
                item.first = false;
            }
        });
        //不存在就把用户名及密码保存到cookie中
        if (!start) {
            temp.push({
                userName: userName,
                password: password,
                first: true
            });
        }
        //存储到cookie中
        $.cookie('user', JSON.stringify(temp));
    },
    //删除密码
    cookieDelete: function() {
        var temp = this.cookie,
            userName = this.userName,
            num = 0;
        //检测用户是否存在
        $.each(temp, function(i, item) {
            if (item.userName === userName) {
                num = i;
            }
        });
        //删除里面的密码
        temp.splice(num, 1);
        //存储到cookie中
        $.cookie('user', JSON.stringify(temp));
    }
}
var cookie = new rememberPassword();
cookie.cookieInit();