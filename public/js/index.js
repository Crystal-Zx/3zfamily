$(function(){
    // 首页轮播图数据获取
    $.ajax({
        url: "index/getCarousel",
        type: "get",
        success: function(res){
            // 循环添加html片段
            var html = "";
            // 循环取出首页轮播图片信息
            for(var pic of res){
                // console.log(div);
                var {title,img_url,href} = pic;
                html += `<div class="carousel-item"><a href="${href}"><img src="${img_url}" alt="${title}" class="w-100"></a></div>`;
            }
            $("#main .carousel .carousel-inner").html(html);
            // 坑1：要给第一章轮播图片添加active类，bootstrap的轮播组件才会开始工作
            $("#main .carousel .carousel-inner .carousel-item:first-child").addClass("active");
        }
    })
    // 找装修楼层数据获取
    $.ajax({
        url: "index/getComponies",
        type: "get",
        success: function(res){
            // 循环取出首页公司推荐所需公司信息
            // count控制循环次数，三次加载一次DOM树(一个ul下三个li，共两个ul)
            var html = "",count = 0;
            for(var com of res){
                var {cid,bg_img,cicon_url,cname,case_num,praise,tel} = com;
                html += `<a href="/company_details.html?cid=${cid}"><li class="com_recommended animation">
                <div class="com_recommeded_box"><img src="${bg_img}" class="com_bg_img"></div>
                <div class="com_cicon_box m-auto"><img src="${cicon_url}" class="com_cicon m-auto"></div>
                <div class="com_details">
                    <div class="d-flex justify-content-center">
                        <p class="md_font font-weight-bold">${cname}</p>
                    </div>
                    <ul class="d-flex justify-content-around ml-5 mr-5 mt-3">
                        <li>设计案例：<span class="orange_font">${case_num}</span></li>
                        <li>好评率：<span class="orange_font">${praise}</span></li>
                    </ul>
                    <div class="com_tel d-flex justify-content-center mt-3">免费预约：<span class="orange_font">${tel}</span></div>
                </div>
                </li></a>` ;
                count++;
                if(count == 3){
                    // 将前三个li的内容加载到第一个ul下
                    $("#main #floor_1 ul:nth-child(3)").html(html);
                    // 清空html内容，准备接受第二个ul中li的内容
                    html = ``;
                }else if(count == 6){
                    $("#main #floor_1 ul:last-child").html(html);
                }
            }
            
            
        }
    })
    // 找设计楼层数据获取
    $.ajax({
        url: "index/getDesignPic",
        type: "get",
        success: function(res){
            // 参数解构
            var html = "",count = 3;
            // 创建二维数组，顺序存储四种风格对应的三张图片
            var xdjy = [],gdzs = [],flos = [],gdfg = [];
            var arr = [xdjy,gdzs,flos,gdfg];
            // 顺序存储四种风格对应的三张图片
            for(var pic of res){
                var {style,pic_url} = pic;
                switch(style){
                    case "现代简约":
                        xdjy.push(pic_url);break;
                    case "古典中式":
                        gdzs.push(pic_url);break;
                    case "富丽欧式":
                        flos.push(pic_url);break;
                    case "更多风格>>":
                        gdfg.push(pic_url);break;
                }
            }
            for(var st of arr){
                // 获取一个风格的三张展示图片
                for(var i in st){
                    html += `<li class="animation"><img src="${st[i]}" class="img-fluid"></li>`
                }
                // 将三张图片添加到对应风格层
                $(`#floor_2 div:nth-child(${count}) ul li:first-child`).after($(html));
                // 添加完一个风格的三张图片后，再次进行初始化
                html = "";count++;
            }
        }
    })
})