const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
// 引入文件模块
const fs = require('fs');
// node.js后台接收前端form data数据的插件
const multiparty = require('multiparty');

// 判断手机号是否注册
router.get("/isPhoneRepeat",(req,res)=>{
    // console.log("接收到一个手机号的后台验证请求！");
    var $phone = req.query.phone;
    var sql = "SELECT * FROM user_info WHERE phone = ?";
    pool.query(sql,[$phone],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            // 定义内容类型：json数据格式，中文采用utf-8
            "Content-Type": "application/json;charset=utf-8",
            // 允许跨域请求
            "Access-Control-Allow-Origin": "*"
        });
        // 如果找到该手机的数据则表示占用，若result为空则表示没有被占用，可以进行注册
        if(result.length > 0){
            res.write(JSON.stringify({code:0,msg:"该手机号已被占用！"}));
        }else{
            res.write(JSON.stringify({code:1,msg:"注册成功！"}));
        }
        res.end();
    })
});

// 判断用户名是否注册
router.get("/isUnameRepeat",(req,res)=>{
    var $uname = req.query.uname;
    var sql = "SELECT * FROM user_info WHERE uname = ?";
    pool.query(sql,[$uname],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
          // 定义内容类型：json数据格式，中文采用utf-8
          "Content-Type": "application/json;charset=utf-8",
          // 允许跨域请求
          "Access-Control-Allow-Origin": "*"
        });
        // 如果找到该手机的数据则表示占用，若result为空则表示没有被占用，可以进行注册
        if(result.length > 0){
            res.write(JSON.stringify({code:0,msg:"该用户名已被占用！"}));
        }else{
            res.write(JSON.stringify({code:1,msg:"注册成功！"}));
        }
        res.end();
    })
});

// 用户注册检测：将通过验证的新用户信息注册到数据库中并返回成功与否
router.post("/signin",(req,res)=>{
    var $phone = req.body.phone;
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    var sql = "INSERT INTO user_info(phone,uname,upwd) VALUES(?,?,md5(?))";
    pool.query(sql,[$phone,$uname,$upwd],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
          // 定义内容类型：json数据格式，中文采用utf-8
          "Content-Type": "application/json;charset=utf-8",
          // 允许跨域请求
          "Access-Control-Allow-Origin": "*"
        });
        if(result.affectedRows > 0){
            res.write(JSON.stringify({code:1,msg:"恭喜您，注册成功！即将返回原页面！"}));
        }else{
            res.write(JSON.stringify({code:0,msg:"啊哦，注册失败了"}));
        }
        res.end();
    })
});

// 用户登录检测
router.post("/login",(req,res)=>{
    // 此处的uname可能是用户名也可能是手机号
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    // 只要传入的$uname值与手机号或用户名其中之一匹配且密码正确，就会有查询结果
    var sql = "SELECT * FROM user_info WHERE uname = ? OR phone = ? AND upwd = md5(?)";
    pool.query(sql,[$uname,$uname,$upwd],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
          // 定义内容类型：json数据格式，中文采用utf-8
          "Content-Type": "application/json;charset=utf-8",
          // 允许跨域请求
          "Access-Control-Allow-Origin": "*"
        });
        // 查询成功且有结果
        if(result.length > 0){
            user = result[0];
            // vue版本
            var output = {};
            output.user = user;
            output.sessionID = req.sessionID;
            // jq版本
            req.session.uid = user.uid;
            res.write(JSON.stringify({code:1,output,msg:"登录成功，点击确定返回原页面！"}));
        }else{
            res.write(JSON.stringify({code:-1,output,msg:"啊哦，您输入的账号信息有误，请重新输入！"}))
        }
        res.end();
    })
})

// 用户是否登录检测
router.get("/islogin",(req,res)=>{
    // console.log(req.session); //cookie&uid
    res.writeHead(200,{
        "Content-Type":"application:json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
    });
    if(req.session == undefined){
        res.write(JSON.stringify({code:0}));
        res.end();
    }else{
        var uid = req.session.uid;
        var sql = "SELECT * FROM user_info WHERE uid = ?";
        pool.query(sql,[uid],(err,result)=>{
            // session.uid有值且存在该用户
            if(err) throw err;
            if(result.length > 0){
                var user = result[0];
                res.write(JSON.stringify({
                    code:1,
                    uname:user.uname
                }));
            }
            res.end();
        })
    }
})

// 用户退出登录
router.get("/signout",(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application:json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
    });
    req.session.uid = undefined;
    res.write(JSON.stringify({
        code:1,
        msg:"退出登录成功！"
    }))
    res.end();
})

// vue:根据uid获取用户信息
router.get('/getUserInfo',(req,res)=>{
  var $uid = req.query.uid;
  var sql = "SELECT * FROM user_info WHERE uid = ?";
  pool.query(sql,[$uid],(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.writeHead(200,{
        "Content-Type":"application:json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
      });
      res.write(JSON.stringify(result[0]));
      res.end();
    }
  })
})

// 更改用户头像
router.post('/changeAvatar',(req,res)=>{
  var form = new multiparty.Form();
  form.uploadDir = './public/img/avatar';
  form.keepExtensions = true; //保留后缀 
  form.maxFieldsSize = 2*1024*1024; //内存大小 
  form.maxFilesSize= 5*1024*1024;//文件字节大小限制，超出会报错err 
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    if(err) throw err;
    // fields是一个对象，存储着FormData里的字段信息。files存储的是文件信息。
    var uid = fields['uid'][0];
    // path：写到磁盘上文件的具体路径
    var oldPath = files['avatar'][0].path;
    if(fs.existsSync(`./public/img/avatar/${uid}.jpg`)){
      // 若用户存在自定义头像，则先删除原有的头像
      fs.unlinkSync(`./public/img/avatar/${uid}.jpg`,(err)=>{
        if(err) throw err;
        // console.log('删除成功！');
      });
      // 重命名上传头像
      fs.renameSync(oldPath,`./public/img/avatar/${uid}.jpg`,(err)=>{
        if(err) throw err;
      });
    }else{
      // 若用户未上传过头像
      var sql = `UPDATE user_info SET avatar='img/avatar/${uid}.jpg' WHERE uid=${uid}`;
      pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
          // 重命名上传头像
          fs.renameSync(oldPath,`./public/img/avatar/${uid}.jpg`,(err)=>{
            if(err) throw err;
          });
        }
      })
    }
    res.writeHead(200,{
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify({ code: 1,msg:'上传头像成功！'}));
    res.end();
  });
})

// 用户点击收藏/取消收藏公司
router.get('/collect',(req,res)=>{
  var $cid = req.query.cid;
  var $uid = req.query.uid;
  res.writeHead(200,{
    "Content-Type":"application:json;charset=utf-8",
    "Access-Control-Allow-Origin":"*"
  });
  // var $cname = '',$cicon_url = '',$case_num='',$praise='',$tel='';
  // 1.查询收藏列表中该用户收藏有无该公司
  var sql1 = 'SELECT COUNT(*) AS num FROM collect_list WHERE cid = ? AND uid = ?';
  pool.query(sql1,[$cid,$uid],(err,result)=>{
    if(err) throw err;
    var num = result[0]['num'];
    // 该用户需收藏该公司
    if(num == 0){
      // 查询该公司基本信息
      var sql2 = 'SELECT cname,cicon_url,case_num,praise,tel FROM company_details WHERE cid = ?';
      // 添加该公司到收藏列表
      pool.query(sql2,[$cid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
          var {cname,cicon_url,case_num,praise,tel} = result[0];
          var sql3 = 'INSERT INTO collect_list VALUES (NULL,?,?,?,?,?,?,?)';
          pool.query(sql3,[$cid,cname,cicon_url,case_num,praise,tel,$uid],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows > 0){
              res.write(JSON.stringify({code: 1,msg:'收藏成功！'}));
              res.end();
            }else{
              res.write(JSON.stringify({code: -1,msg:'添加收藏失败！'}));
              res.end();
            }
          })
        }
      })
    // 该用户需取消收藏该公司
    }else{
      var sql4 = 'DELETE FROM collect_list WHERE cid = ?';
      pool.query(sql4,[$cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
          res.write(JSON.stringify({code: 2,msg:'取消收藏成功！'}));
          res.end();
        }else{
          res.write(JSON.stringify({code: -2,msg:'取消收藏失败！'}));
          res.end();
        }
      })
    }
  })
})

// 判断用户是否收藏该公司
router.get('/isCollected',(req,res)=>{
  var $cid = req.query.cid;
  var $uid = req.query.uid;
  res.writeHead(200,{
    "Content-Type":"application:json;charset=utf-8",
    "Access-Control-Allow-Origin":"*"
  });
  // 查询收藏列表中该用户收藏有无该公司
  var sql = 'SELECT * FROM collect_list WHERE cid = ? AND uid = ?';
  pool.query(sql,[$cid,$uid],(err,result)=>{
    if(err) throw err;
    // 该用户的收藏列表中该公司已收藏
    if(result.length > 0){
      res.write(JSON.stringify({code: 1}));
    }else{
      res.write(JSON.stringify({code: 0}));
    }
    res.end();
  })
})

// 查询该用户的收藏列表
router.get('/getCollectList',(req,res)=>{
  var $uid = req.query.uid;
  res.writeHead(200,{
    "Content-Type":"application:json;charset=utf-8",
    "Access-Control-Allow-Origin":"*"
  });
  // 查询收藏列表中该用户收藏有无该公司
  var sql = 'SELECT * FROM collect_list WHERE uid = ?';
  pool.query(sql,[$uid],(err,result)=>{
    if(err) throw err;
    // 该用户的收藏列表中该公司已收藏
    if(result.length > 0){
      res.write(JSON.stringify({code: 1,
        collectList:result
      }));
    }else{
      res.write(JSON.stringify({code: 0}));
    }
    res.end();
  })
})

module.exports = router;