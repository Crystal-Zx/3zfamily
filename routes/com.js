const express = require("express");
const router = express.Router();
const pool = require("../pool.js")

router.get("/getComList",(req,res)=>{
    // 接收排序方式
    var rankWay = req.query.rankWay;
    var pno = req.query.pno;
    var len = req.query.kword.length;
    if(len != 0){
        var kword = "%"+req.query.kword+"%";
    }
    var order = "";
    if(rankWay == "案例"){
        order = "case_num";
    }else if(rankWay == "好评"){
        order = "praise";
    }
    // 要发回前端的数据
    var output = {
        pno:pno,            // 用户当前点击的页号
        pageSize: 5,        // 每页显示数据条数
        count: 0,           // 查询结果记录数
        pageCount: 0,       // 总页数
        coms:[]             // 查询到的该页需显示的所有公司信息
    }
    var sql = `SELECT company_details.cid,cname,cicon_url,case_num,praise,tel,cx_activity,quan_activity,pic_url_1,pic_url_2,pic_url_3 FROM company_details,com_service_pic WHERE company_details.cid=com_service_pic.cid ${len == 0 ? '':`AND cname LIKE '${kword}'`} ORDER BY ${order} DESC`;
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        // 数据接收
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        output.coms = result.slice((output.pno-1)*5,(output.pno-1)*5+5);
                                // 第一页   [0,5)
                                // 第二页   [5,10)
                                // 第三页   [10,15)
        
                                res.writeHead(200,{
            "Content-Type":"application-json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(output));
        res.end();
    })
})

router.get("/getCarousel",(req,res)=>{
    var sql = "SELECT * FROM com_banner_carousel";
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-Type":"application-json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(result));
        res.end();
    })
})

router.get("/getRecomList",(req,res)=>{
    var sql = "SELECT cid,cname,cicon_url FROM company_details WHERE seq_recommended!=0 ORDER BY seq_recommended LIMIT 6";
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.writeHead(200,{
                "Content-Type":"application-json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(result));
            res.end();
        }
    })
})

router.get("/getComDetail",(req,res)=>{
    var $cid = req.query.cid;
    var sql = "SELECT company_details.*,pic_url_1,pic_url_2,pic_url_3,pic_url_4 FROM company_details,com_service_pic WHERE company_details.cid=com_service_pic.cid and company_details.cid = ?";
    pool.query(sql,[$cid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.writeHead(200,{
                "Content-Type":"application-json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(result[0]));
            res.end();
        }
    })
})

router.get("/getCaseList",(req,res)=>{
    var $cid = req.query.cid;
    var sql = "SELECT case_id,case_name,case_img,area,type,deco_style,deco_way FROM `case_details`,`house_details` WHERE `case_details`.hid=`house_details`.hid and cid=?"
    pool.query(sql,[$cid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.writeHead(200,{
                "Content-Type":"application-json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(result));
            res.end();
        }
    })
})

router.get("/getCaseDetail",(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application-json;charset=utf-8",
        "Access-Control-Allow-Orign":"*"
    });
    var $case_id = req.query.case_id;
    var output = {
        cpList:[],
        hsDetail:[]
    };
    var progress = 0;
    var sql1 = "SELECT bedroom_pic_1,bedroom_pic_2,res_pic,living_pic,toilet_pic,kitchen_pic FROM `case_pic` WHERE case_id = ?";
    var sql2 = "SELECT *,(SELECT case_name FROM case_details WHERE case_id=? LIMIT 1) as case_name FROM house_details WHERE hid = (SELECT hid FROM `case_details` WHERE case_id=?)";
    pool.query(sql1,[$case_id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            output.cpList = result[0];
            progress += 50;
            if(progress == 100){
                res.write(JSON.stringify(output));
                res.end();
            }
        }
    })
    pool.query(sql2,[$case_id,$case_id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            output.hsDetail = result[0];
            progress += 50;
            if(progress == 100){
                res.write(JSON.stringify(output));
                res.end();
            }
        }
    })
})

module.exports = router;