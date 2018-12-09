/*导入必须模块*/
const express = require("express");
const bodyParser = require("body-parser");
//引入session
const session = require('express-session');
/*引入路由模块*/
const user = require("./routes/user.js");
const index = require("./routes/index.js");
const com = require("./routes/com.js");

/*创建web服务器*/
var app = express();
app.listen(3000,()=>{
    console.log("web服务器创建成功！")
});
/*使用body-parser中间件*/
app.use(bodyParser.urlencoded({
    extended:false
}));
/*托管静态资源文件夹*/
app.use(express.static('public'));
//配置session
app.use(session({
    secret:'128位随机字符串',
    resave:false,
    saveUninitialized:true,
}))

/*使用路由器来管理路由*/
app.use("/user",user);
app.use("/index",index);
app.use("/com",com);