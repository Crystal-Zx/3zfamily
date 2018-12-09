$(function(){
    // 1.页面初始化：
    // 1.1 页面默认加载的排序顺序和页数：默认按案例排、从第一页开始
    var rankWay = "案例",pno = 1,kword = "";
    if(location.search.indexOf("kword=") != -1){
        kword = decodeURI(location.search.split("=")[1]);
    }
    loadPage({rankWay,no:1,kword});
        // loadPage({rankWay:"案例",no:1,kword});
        // loadPage({kword});
    // }else{
    //     kword = ""
    //     // loadPage({rankWay:"案例",no:1,kword:""});
    // }
    
    // 1.2 定义加载页面的函数
    /**
     * 
     * @param {*} rankWay 排序方式
     * @param {*} pno 当前页号
     * @param {*} kword 关键词查询
     */
    function loadPage({rankWay,no,kword}){
        pno = no;
        $.ajax({
            url: "com/getComList",
            type: "get",
            dataType: "json",
            data:{ rankWay,pno,kword },
            success: function(output){
                // console.log(output);
                var {coms,pno,pageCount} = output;
                var html = "";
                // 3.分页功能：
                // 3.1 加载分页项个数及相应内容到html变量
                var $ul = $("#main .container .left nav ul");
                for(var i=1;i<=pageCount;i++){
                    html += `<li class="page-item ${i == pno ? 'active':''}"><a class="page-link ${i == pno ? 'border':'bg-transparent'}" href="#">${i}</a></li>`
                }
                // 3.2 删除ul中间的li
                $ul.children(":not(:first-child):not(:last-child)").remove();
                $ul.children().first().after(html);
                // 3.3 完成加载后分页项的激活与禁用样式
                if(pno == 1){
                    $ul.children().first().addClass("disabled");
                }else{
                    $ul.children().first().removeClass("disabled");
                }
                if(pno == pageCount){
                    $ul.children().last().addClass("disabled")
                }else{
                    $ul.children().last().removeClass("disabled")
                }
                html = "";
                // 4.处理当前页的公司信息
                // 4.1 填充信息
                for(var i=0;i<coms.length;i++){
                    var {cid,cname,cicon_url,case_num,praise,tel,cx_activity,quan_activity,pic_url_1,pic_url_2,pic_url_3} = coms[i];
                    html += `<div class="com_details_box d-flex justify-content-start mt-4" data-cid=${cid}>
                        <div class="com_icon_box">
                            <img src="${cicon_url}" />
                        </div>
                        <div class="com_details pb-4">
                        <a href="company_details.html?cid=${cid}">
                            <p class="com_name">${cname}</p>
                            <div class="tel float-right mt-3">
                                <img src="img/company_list/tel.png">
                                <span>${tel}</span>
                            </div>
                            <div class="base_info mt-2">
                                <span>设计案例:</span>
                                <span>${case_num}</span>
                                <span>好评数：</span>
                                <span>${praise}</span>
                            </div>
                            <div class="mt-2">
                                <p>
                                    <img src="img/company_list/cx.png" class="mb-1">
                                    <span>${cx_activity}</span>
                                </p>
                                <p class="mt-2">
                                    <img src="img/company_list/quan.png" class="mb-1">
                                    <span>${quan_activity}</span>
                                </p>
                            </div>
                            <ul class="d-flex mt-2">
                                <li class="pr-3"><img src="${pic_url_1}" alt="" class="img-fluid"></li>
                                <li class="pr-3"><img src="${pic_url_2}" alt="" class="img-fluid"></li>
                                <li><img src="${pic_url_3}" alt="" class="img-fluid"></li>
                            </ul>
                        </a>
                        </div>
                    </div>`
                }
                $("#main .container .left .com_info").html(html);
                // 坑：绑定单击事件必须在上述标签创建之后，不然click没有效果
                // 4.2 点击公司跳转到对应详情页
                // var $comDetails = $(".left .com_info .com_details_box");
                // $comDetails.on("click","a",function(e){
                //     // e.preventDefault();
                //     var cid = $(this).parent().parent().attr("data-cid");
                //     console.log(cid);
                //     // 跳转
                // })
            }
        })
    }
    // 1.3 页面首次加载时默认rankWay=案例，no默认值1
    // loadPage({rankWay:"案例",no:1,kword:""});
    // 1.4 加载轮播图数据
    $.ajax({
        url: "com/getCarousel",
        success: function(result){
            // 循环添加html片段
            var html = "";
            // 循环取出首页轮播图片信息
            for(var pic of result){
                // console.log(div);
                var {title,img_url,href} = pic;
                html += `<div class="carousel-item"><a href="${href}"><img src="${img_url}" alt="${title}" class="w-100"></a></div>`;
            }
            $("#main .carousel .carousel-inner").html(html);
            // 坑1：要给第一章轮播图片添加active类，bootstrap的轮播组件才会开始工作
            $("#main .carousel .carousel-inner .carousel-item:first-child").addClass("active");
        }
    })
    // 1.5 加载本月推荐数据
    $.ajax({
        url: "com/getRecomList",
        success: function(result){
            var html = "";
            for(var i=0;i<result.length;i++){
                var {cid,cname,cicon_url} = result[i];
                html += `<a href="/company_details.html?cid=${cid}"><div class="com d-flex align-items-center p-2">
                <span class="rank ${i==0 ? 'rank_st':(i==1 ? 'rank_nd':(i==2 ? 'rank_rd':'rank_normal'))} mr-md-1 mr-lg-3">${i+1}</span>
                <div class="rank_icon_box ${i==0 ? 'rank_border_st':(i==1 ? 'rank_border_nd':(i==2 ? 'rank_border_rd':'rank_border_normal'))} mr-md-1 mr-lg-3">
                    <img src="${cicon_url}" />
                </div>
                <span class="com_name">${cname}</span>
                </div></a>`
            }
            var $comTitle = $(".right .com_rank .rank_title");
            $comTitle.after($(html));
            // 给本月推荐最后一家公司去掉border-bottom
            $("#main .container .right .com_rank div:last-child").css("border-bottom","0")
        }
    })
    
    // 2.排序功能：样式及重新加载页面
    var $rankWay = $("#main .container .left .rank_way");
    $rankWay.on("click","a",function(e){
        e.preventDefault();
        rankWay = $(this).children().text().trim();
        var html = `<a href="#">
            <span class="text-center ${rankWay=='案例' ? 'rank_active':''}">案例
                <img src="${rankWay=='案例' ? 'img/company_list/arrow_active.png':'img/company_list/arrow_normal.png'}" class="pl-1">
            </span>
            </a>
            <a href="#">
                <span class="text-center ${rankWay=='好评' ? 'rank_active':''}">好评
                    <img src="${rankWay=='好评' ? 'img/company_list/arrow_active.png':'img/company_list/arrow_normal.png'}" class="pl-1">
                </span>
            </a>`;
        // 重新加载排序选择的按钮样式(替换以前的) 
        $rankWay.html($(html));
        loadPage({rankWay,no:1,kword});
    })

    // 3.分页功能:动态更改pno
    var $ul = $("#main .container .left nav ul");
    $ul.on("click","a",function(e){
        e.preventDefault();
        var $a = $(this);
        // .is()内是一个选择器，意思是判断$a是否为该选择器选中的元素
        // 除了禁用和激活状态的按钮之外，才可以被点击
        if(!$a.parent().is(".disabled,.active")){
            if($a.parent().is(":first-child")){
                pno--;
            }else if($a.parent().is(":last-child")){
                pno++;
            }else{
                pno = $a.html();
            }
        }
        loadPage({rankWay,no:pno,kword});
    })

    
})