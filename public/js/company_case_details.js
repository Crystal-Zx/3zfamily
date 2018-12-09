$(function(){
    // 加载页面内容
    if(location.search.indexOf("case_id=") != -1){
        // console.log("hhh")
        var case_id = location.search.split("case_id=")[1];
        console.log(case_id);
        $.ajax({
            url: "/com/getCaseDetail",
            type: "get",
            data: {case_id},
            dataType: "json",
            success: function(output){
                var {cpList,hsDetail} = output;
                // 填充房屋信息
                var {case_name,type,deco_style,area,cost,deco_way,deco_time,location} = hsDetail;
                var html = "";
                // 案例名称
                html = `<p class="case_title">${case_name}</p>`;
                var $div = $("#main .container");
                $div.prepend($(html));
                // 房屋信息
                html = "";
                html = `<tr>
                        <td>户型：${type}</td>
                        <td>风格：${deco_style}</td>
                        <td>面积：${area}m&sup2;</td>
                        <td>造价：${cost}</td>
                    </tr>
                    <tr>
                        <td>装修方式：${deco_way}</td>
                        <td>装修工期：${deco_time}</td>
                        <td>位置：${location}</td>
                        <td></td>
                    </tr>`
                var $table = $(".case_house_details_box>table");
                $table.html(html);
                html = "";
                // 案例图片
                for(var pic in cpList){
                    if(cpList[pic]){
                       html += `<div class="room_style text-center mt-3 mb-3"><img src="/img/case_pic/${pic}.png"><img src="${cpList[pic]}" class="mt-3"></div>` 
                    }
                }
                var $casePic = $(".container .case_pic");
                $casePic.html(html);
            }
        })
    }
})