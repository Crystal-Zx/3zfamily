$(function(){
    // 注册方式选择交互效果
    $(".container .reg_box li a.reg_method_title").click(function(){
        if(!$(this).hasClass("active")){
            $(this).addClass("active").parent().siblings().children().removeClass("active");
        }
        // 若此a标签是微信登录
        if(!$(this).parent().prev().length){
            $(this).parent().parent().next().children().first().removeClass("hide")
            .next().addClass("hide");
        }
        // 若此a标签是微信登录
        if(!$(this).parent().next().length){
            $(this).parent().parent().next().children().last().removeClass("hide")
            .prev().addClass("hide");
        }
    })
    // 微信注册页，使用帮助
    $(".reg_content a.user_help").mouseover(function(){
        $(this).prev().prev().replaceWith($("<img src='../img/login/user_help.png' alt=''>"));
    })
    $(".reg_content a.user_help").mouseout(function(){
        $(this).prev().prev().replaceWith($("<img src='../img/login/login_ewm.png' alt=''>"));
    })
    // 以下均为账号注册方式的功能代码
    // 本页要获取到的发送给后台的数据
    var phone = "",uname = "",upwd = "";
    // 分别用数组来保存各表单信息的验证结果(前端+后台)
    // 前端：验证格式是否正确；后台：验证该用户是否已存在
    // regResult = ["手机号前端验证结果","用户名前端验证结果","密码前端验证结果","确认密码前端验证结果"]
    // resResult = ["手机号后台验证结果","用户名后台验证结果"]
    var regResult = [],resResult = [];
    // 封装正则验证函数
    function regStyle(t,str,reg){
        if(t == null) return false;
        else if(!(reg.test(str))){      //正则失败
            $(t).addClass("error_border");
            $(t).next().removeClass("hint_hide")
            .addClass("error_hint");
            return false;
        }else{
            $(t).removeClass("error_border");
            $(t).next().addClass("hint_hide")
            .removeClass("error_hint");
            return true;
        }
    }
    // 1.验证手机号：满足一般手机号码格式
    $("input[name='phone']").blur(function(){
        // 1.1 获取页面相应数据，进行前端正则验证，并取得验证结果
        phone = $(this).val();
        var reg = /^1[34578]\d{9}$/;
        regResult[0] = regStyle($(this),phone,reg);
        // 1.2 向服务器发送请求，进行后台数据库验证——该手机号是否被占用
        $.ajax({
            url: "http://127.0.0.1:3000/user/isPhoneRepeat",
            type: "get",
            dataType: "json",
            data: {phone},
            async: false,
            success: function(result){
                // 1.2.1 将后台返回的查询结果放入数组中对应位置
                resResult[0] = result.code;
                // 1.2.2 查询返回1，表示该手机号未注册过，可以使用
                if(result.code == 1){
                    $("input[name='phone']").next().children().next().html("手机号格式不正确！");
                // 1.2.2 查询返回0，表明该手机号已注册过 ，被占用不能使用
                }else if(result.code == 0){
                    $("input[name='phone']").next().children().next().html(result.msg);
                    $("input[name='phone']").addClass("error_border")
                    .next().removeClass("hint_hide")
                    .addClass("error_hint");
                }
            }
        })
    });
    // 2.验证用户名：4-16位,可选择包含字母，数字，下划线
    $("input[name='uname']").blur(function(){
        // 2.1 获取页面相应数据，进行前端正则验证，并取得验证结果
        uname = $(this).val();
        var reg = /^[\w\u4e00-\u9fa5]{4,16}$/;
        regResult[1] = regStyle($(this),uname,reg);
        // 2.2 向服务器发送请求，进行后台数据库验证——该用户名是否被占用
        $.ajax({
            url: "http://127.0.0.1:3000/user/isUnameRepeat",
            type: "get",
            dataType: "json",
            data: {uname},
            async: false,
            success: function(result){
                // 2.2.1 将后台返回的查询结果放入数组中对应位置
                resResult[1] = result.code;
                // 2.2.2 查询返回1，表示该用户名未注册过，可以使用
                if(result.code == 1){
                    $("input[name='uname']").next().children().next().html("4-16位(字母，数字，下划线)");
                // 2.2.2 查询返回0，表明该用户名已注册过 ，被占用不能使用
                }else if(result.code == 0){
                    $("input[name='uname']").next().children().next().html(result.msg);
                    $("input[name='uname']").addClass("error_border")
                    .next().removeClass("hint_hide")
                    .addClass("error_hint");
                }
            }
        })
    });
    // 3.验证密码强度：6-16位，其中必须含有数字、字母和特殊符号
    $("input[name='upwd']").blur(function(){
        // 3.1 获取页面相应数据
        upwd = $(this).val();
        // 3.2 正则表达式：在符号“(?=” 和 “)” 之间加入一个表达式，它就是一个先行断言，用以说明圆括号内的表达式必须正确匹配。比如：/Java(?=\:)/ 只能匹配Java且后面有冒号的。
        var reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?\(\)\.]).*$/;
        // 3.3 保存正则验证结果
        regResult[2] = regStyle($(this),upwd,reg);
    });
    // 4.验证两次密码是否一致
    $("input[name='upwdAgain']").blur(function(){
        // 4.1 获取页面相应数据——两次密码
        upwd = $(this).prev().prev().val();
        var upwdAgain = $(this).val();
        // 4.2 保存两次密码是否一致的验证结果
        regResult[3] = (upwd == upwdAgain);
        // 4.3 改变页面显示样式
        if(upwd !== upwdAgain){
            $(this).addClass("error_border");
            $(this).next().removeClass("hint_hide")
            .addClass("error_hint");
        }else{
            $(this).removeClass("error_border");
            $(this).next().addClass("hint_hide")
            .removeClass("error_hint");
        }
    });
    // 5.点击注册按钮向服务器发送请求，将用户信息数据存入数据库
    $(".zh_reg a.signin_btn").click(function(){
        // 5.1 是否勾选同意条款复选框
        var isAgree = $("input[type='checkbox']").prop("checked");
        // 5.2 点击注册按钮，使上面的表单(除复选框外)全部失去焦点，再次进行判断
        //     可拦截用户什么都不填直接点击注册的行为
        var inputArr = $("input.reg_info");
        for(var input of inputArr){
            $(input).blur();
            console.log("在此使各input失去焦点了！");
        }
        // 5.3 获取前端正则验证结果
        var reg = true,res = true;
        for(var g of regResult){
            if(!g){
                reg = false;
                break;
            }
        }
        // 5.4 获取后台数据库验证结果
        for(var s of resResult){
            if(!s){
                res = false;
                break;
            }
        }
        // 5.5 根据验证结果输出提示
        if(!reg || !res){
            // 坑2：alert函数是window自带函数，为同步CPU代码，会先于DOM渲染(异步)先执行
            // 使用定时器延时函数将其变为异步函数，放入事件队列，就可以在DOM渲染完成之后才触发执行
            setTimeout("alert('正确填写注册信息后才能注册喔~')",0);
        }else if(!isAgree){
            setTimeout("alert('如您同意我站的服务条款，请勾选同意喔~')",0);
        }else{
            $.ajax({
                url: "http://127.0.0.1:3000/user/signin",
                dataType: "json",
                data: {phone,uname,upwd},
                type: "post",
                async: false,
                success: function(result){
                    // 注册成功返回登录页面
                    if(result.code == 1){
                        setTimeout(function(){
                            alert(result.msg);
                            location.replace("login.html");
                        },0);
                    }
                    else{
                        alert(result.msg);
                    }
                }
            })
        }
    })
})