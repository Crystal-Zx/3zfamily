const express = require("express");
const router = express.Router();
const pool = require("../pool.js")

router.get("/getCarousel",(req,res)=>{``
    var sql = "SELECT * FROM index_banner_carousel";
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

router.get("/getComponies",(req,res)=>{
    var sql = "SELECT cid,bg_img,cicon_url,cname,case_num,praise,tel FROM company_details WHERE seq_recommended!=0 ORDER BY seq_recommended LIMIT 6";
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        // 查询出的需要进行首页推荐的公司信息
        if(result.length > 0){
            res.writeHead(200,{
                "Content-Type":"application-json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(result));
            res.end();
            // console.log(result);
        }
    })
})

router.get("/getDesignPic",(req,res)=>{
    var sql = "SELECT * FROM index_design_pic ORDER BY style";
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
module.exports = router;