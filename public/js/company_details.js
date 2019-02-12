$(function(){
    // 1.页面初始化
    if(location.search.indexOf("cid=") != -1){
        var cid = location.search.split("=")[1];
        // 1.1 顶部公司信息
        $.ajax({
            url: "/com/getComDetail",
            data:{cid},
            dataType:"json",
            type: "get",
            success: function(result){
                var {pic_url_1,pic_url_2,pic_url_3,pic_url_4,cname,bs_license,rz_license,deposit,case_num,praise,tel,address,bs_time,price_range,service_range,spec_style} = result;
                // 1.1.1 填充左侧展示图片
                var html = ""
                html = `<div class="big_img">
                    <img src="${pic_url_1}">
                    </div>
                    <ul class="sm_img d-flex justify-content-between mt-2">
                    <li class="sm_img_border"><img src="${pic_url_1}"></li>
                    <li><img src="${pic_url_2}" alt=""></li>
                    <li><img src="${pic_url_3}" alt=""></li>
                    <li><img src="${pic_url_4}" alt=""></li>
                    </ul>`
                var $leftSwiper = $(".com_details_box .left_swiper");
                $leftSwiper.html(html);
                html = "";
                // 鼠标悬停动态切换展示图片激活样式
                $(".com_details_box .left_swiper .sm_img li").hover(function(){
                    // 展示图片动态样式
                    if($(this).hasClass("sm_img_border"))
                        $(this).siblings().removeClass("sm_img_border");
                    $(this).toggleClass("sm_img_border");
                    $(this).parent().prev().children().first()
                    .attr("src",
                        $(this).children().first().attr("src")
                    )
                })
                // 1.1.2 顶部公司详细信息
                html = `<div class="row_1">
                    <span class="com_name mr-2">${cname}</span>
                    <!-- 营业执照图标 -->
                    <span class="license bs_icon mr-2">${bs_license==true ? '营':''}</span>
                    <!-- 认证公司图标 -->
                    <span class="license rz_icon mr-2">${rz_license==true ? '认':''}</span>
                    <span>保证金：<b>￥${deposit}</b></span>
                    <!-- 是否收藏：需设置可点击 -->
                    <a href="#" class="collect_box"><span class="collect">收藏</span></a>
                    </div>
                    <!-- 第二行 -->
                    <div class="row_2 d-flex">
                    <div class="case mr-5">
                        <p class="number"><b>${case_num}</b></p>
                        <p class="label">设计案例</p>
                    </div>
                    <div class="recommond">
                        <p class="number"><b>${praise}</b></p>
                        <p class="label">好评数</p>
                    </div>
                    </div>
                    <div class="row_3">
                    <!-- 电话图标 -->
                    <img src="http://127.0.0.1:3000/img/company_details/tel.png" />
                    <!-- 公司联系电话 -->
                    <span>${tel}</span>
                    </div>
                    <div class="row_4">
                    <p class="com_addr">地址：
                        <span>${address}</span>
                    </p>
                    </div>
                    <div class="row_5">
                        <!-- 预约按钮 -->
                        <a href="#">免费预约</a>
                    </div>`
                var $comDetails = $(".com_details_box .com_details");
                $comDetails.html(html);
                html = "";
                // 1.1.3 服务概况
                html = `<p class="service_title">服务概况</p>
                    <div class="s_info mt-2">
                        <p>营业时间</p>
                        <p>${bs_time}</p>
                    </div>
                    <div class="s_info mt-2">
                        <p>承接价位</p>
                        <p>${price_range}</p>
                    </div>
                    <div class="s_info mt-2">
                        <p>服务范围</p>
                        <p>${service_range}</p>
                    </div>
                    <div class="s_info mt-2">
                        <p>专长风格</p>
                        <p>${spec_style}</p>
                    </div>`
                var $service = $(".bottom .service");
                $service.html(html);

            }

        })
        // 1.2 公司案例信息(6个)
        $.ajax({
            url: "/com/getCaseList",
            type: "get",
            data: {cid},
            dataType: "json",
            success: function(result){
                console.log(result);
                var html = "";
                if(cid == 1){
                    html = `<a href="#" class="arrow float-right">全部${result.length}套</a>`
                    // 填充查询结果记录数
                    $(".bottom .case_list>a").replaceWith($(html));
                }
                html = ""
                // 一页只显示六条数据
                for(var i=0;i<6;i++){
                    var {case_id,case_name,case_img,area,type,deco_style,deco_way} = result[i];
                    html += `<li class="animation">
                        <a href="/company_case_details.html?case_id=${case_id}">
                            <div class="animation_box"><img src="${case_img}" class="animation_amplify"></div>
                            <p class="case_title pt-2 ml-1">${case_name}</p>
                            <p class="case_details pt-1 pb-3 ml-1">
                                <span>${area}</span>m&sup2;/${type}/${deco_style}/${deco_way}
                            </p>  
                        </a>
                        </li>`
                }
                var $ul = $(".bottom .case_list ul");
                if(cid == 1){
                    $ul.html(html);
                }
                
            }
        })
    }
    
    
    
    
    
})