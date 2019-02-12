const express = require("express");
const router = express.Router();
const pool = require("../pool.js")

// 1.获取公司列表
router.get("/getComList",(req,res)=>{
    // 接收排序方式
    var rankWay = req.query.rankWay;
    var pno = req.query.pno;
    var len = req.query.kword.length;
    if(len != 0){
        var kword = "%"+req.query.kword+"%";  // 进行模糊匹配
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

// 2.获取列表页轮播图列表
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

// 3.获取公司推荐排名
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

// 4.获取公司详细信息
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

// 5.获取指定公司所属案例表
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

// 6.获取案例详细信息
router.get("/getCaseDetail",(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application-json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
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

// 以下为vue移动端补充的后台接口
// 7.获取首页推荐公司背景图
router.get("/getBgImg",(req,res)=>{
  var sql = "SELECT cid,cname,bg_img FROM `company_details` WHERE cid<=4";
  pool.query(sql,[],(err,result)=>{
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

// 8
// 8.1 获取首页所需案例图(在推荐名单中的公司所属案例列表，仅显示推荐排名前四的公司)
// 8.2 获取公司详情页中的案例图及相关信息
router.get("/getCase",(req,res)=>{
  var $cid = req.query.cid;
  var sql = "";
  // 没有传cid过来，即为首页的后台请求，完成8.1的功能
  if($cid == undefined){
    sql = "SELECT cid,case_id,case_name,case_img,type,deco_style,area FROM case_details,house_details WHERE case_details.hid=house_details.hid AND cid<=4";
  }else{
    sql = `SELECT cid,case_id,case_name,case_img,type,deco_style,area FROM case_details,house_details WHERE case_details.hid=house_details.hid AND cid=${$cid}`;
  }
  pool.query(sql,[],(err,result)=>{
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

// 针对第1个请求的拆分简化
// 9.获取发现页（公司列表页）数据
router.get('/getCom',(req,res)=>{
  var rankWay = req.query.rankWay;
  var sql = `SELECT cid,cname,cicon_url,case_num,praise,tel,address FROM company_details ORDER BY ${rankWay} DESC`;
  pool.query(sql,[],(err,result)=>{
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

// 10.获取设计师列表
// 10.1 该公司cid 所有设计师的头像，经验年限和案例数
// 10.2 该案例case_id所属设计师did的所有信息
router.get('/getDesigner',(req,res)=>{  
  var $cid = req.query.cid;
  var $case_id = req.query.case_id;
  var sql = "";
  // 10.1
  if($cid != undefined){
    sql = `SELECT did,photo,rank,years,d_case_num FROM designer_details WHERE cid=${$cid}`;
  // 10.2
  }else if($case_id != undefined){
    sql = `SELECT * from designer_details WHERE did = (SELECT did FROM case_details WHERE case_id = ${$case_id})`;
  }
  pool.query(sql,[],(err,result)=>{ 
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

// 11.关键词搜索
router.get('/search',(req,res)=>{
  var $kw = req.query.kw;
  var progress = 0;
  // 要返回给前端页面的数据 
  var output = {
    comList: [],
    caseList: []
  };
  res.writeHead(200,{
    "Content-Type":"application-json;charset=utf-8",
    "Access-Control-Allow-Origin":"*"
  });
  // 查询关键词匹配的公司信息（匹配公司名称）
  var sql1 = `SELECT cid,cname,cicon_url,case_num,praise,tel FROM company_details WHERE cname LIKE '%${$kw}%'`;
  // 查询关键词匹配的案例（匹配装修风格）
  var sql2 = `SELECT case_id,case_name,case_img,type,deco_style,area FROM case_details,house_details WHERE case_details.hid = house_details.hid AND deco_style LIKE '%${$kw}%'`;
  pool.query(sql1,[],(err,result)=>{
    if(err) throw err;
    if(result.length>=0){
      if(result.length > 0)
        output.comList = result;
      // else if(result.length == 0)
      //   output.comList = [];
      progress += 50; 
      if(progress == 100){
          res.write(JSON.stringify(output));
          res.end();
      }
    }
  })
  pool.query(sql2,[],(err,result)=>{
      if(err) throw err;
      if(result.length>=0){
        if(result.length > 0)
          output.caseList = result;
        progress += 50;
        if(progress == 100){
            res.write(JSON.stringify(output));
            res.end();
        }
      }
  })
})

module.exports = router;