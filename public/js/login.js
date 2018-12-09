$(function(){
    // 1.动态切换登录方式的内容和样式
    $(".container .login_box li a.login_method_title").click(function(){
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
    // 2.用户名/手机号+密码后台验证
    $(".zh_login a.login_btn").click(function(){
        // 获取输入框数据
        var uname = $(".zh_login input[name='uname']").val();
        var upwd = $(".zh_login input[name='upwd']").val();
        console.log(uname,upwd);
        $.ajax({
            url: "http://127.0.0.1:3000/user/login",
            type: "post",
            dataType: "json",
            data: {uname,upwd},
            xhrFields:{withCredentials: true},
            success: function(res){
                alert(res.msg);
                // 登录成功进行跳转
                if(res.code == 1){
                    if(location.search.startsWith("?back=")){
                        var url = location.search.slice(6);
                    }else{
                        var url = "index.html";
                    }
                    location.replace(url);
                }
            }
        });
    });
})