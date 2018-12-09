const express = require("express");
const router = express.Router();
const pool = require("../pool.js");

// 判断手机号是否注册
router.get("/isPhoneRepeat",(req,res)=>{
    // console.log("接收到一个手机号的后台验证请求！");
    var $phone = req.query.phone;
    var sql = "SELECT * FROM user_info WHERE phone = ?";
    pool.query(sql,[$phone],(err,result)=>{
        if(err) throw err;
        // console.log(result.length);
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
        // 如果找到该手机的数据则表示占用，若result为空则表示没有被占用，可以进行注册
        if(result.length > 0){
            res.send(JSON.stringify({code:0,msg:"该用户名已被占用！"}));
        }else{
            res.send(JSON.stringify({code:1,msg:"注册成功！"}));
        }
    })
});

// 用户注册检测：将通过验证的新用户信息注册到数据库中并返回成功与否
router.post("/signin",(req,res)=>{
    var $phone = req.body.phone;
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    var sql = "INSERT INTO user_info VALUES(null,?,?,md5(?));"
    pool.query(sql,[$phone,$uname,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send(JSON.stringify({code:1,msg:"恭喜您，注册成功！即将返回原页面！"}));
        }else{
            res.send(JSON.stringify({code:0,msg:"啊哦，注册失败了"}));
        }
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
        // 查询成功且有结果
        if(result.length > 0){
            user = result[0];
            req.session.uid = user.uid;
            res.send(JSON.stringify({code:1,msg:"登录成功，点击确定返回原页面！"}));
        }else{
            res.send(JSON.stringify({code:-1,msg:"啊哦，您输入的账号信息有误，请重新输入！"}))
        }
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

module.exports = router;