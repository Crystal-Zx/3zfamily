$(function(){
    // 在导入页面的head里引入header.html的css样式表
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    // 向服务器请求header.html文件
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res);
            $(".nav a.nav-link").each(function(){
                if($(this)[0].href.split("_")[0] == window.location.href.split("_")[0]){
                    $(".nav a.nav-link").removeClass("nav_active");
                    $(this).addClass("nav_active");
                }
            })
            // 搜索框功能实现
            var $btnSearch = $("#header .floor_2 .row div:last-child div:last-child");
            $btnSearch.click(function(){
                var $kw = $(this).prev().val().trim();
                if($kw)
                    location.href = `company_list.html?kword=${$kw}`;
            })
            $btnSearch.prev().keyup(function(e){
                if(e.keyCode == 13){
                    $btnSearch.click()
                }
            })
            // 点击注册/登录按钮时，记住跳转前的页面
            $(".signout li a").click(function(){
                if($(this).html() == "登录"){
                    var url = "login.html";
                }else if($(this).html() == "注册"){
                    var url = "register.html";
                }
                location.href = url + "?back=" +location.href;
            })
            // header.html被加载时，判断用户是否登录
            $.ajax({
                url:"user/islogin",
                type:"get",
                dataType: "json",
                success: function(res){
                    // 用户未登录：signin添加hidden
                    if(res.code == 0){
                        $(".signout").removeClass("hidden")
                        .next().addClass("hidden");
                    }else if(res.code == 1){
                        $(".signin #uname").html(res.uname);
                        $(".signin").removeClass("hidden")
                        .prev().addClass("hidden");
                    }
                }
            })
            // 当用户点击注销按钮时，退出登录
            $(".signin #signout").click(function(){
                $.ajax({
                    url: "user/signout",
                    type: "get",
                    success: function(res){
                        if(res.code == 1){
                            alert(res.msg);
                            // header的ul标签恢复为未登录的状态
                            // ——> 浏览器重新加载
                            // 强制刷新：跳过浏览器本地缓存，总是从服务器端下载新资源
                            location.reload();
                        }
                    }
                })
            })
        }
    })

    
})