//log
var log = require("./../log").logger("indexRouter");

//进入登录页面
exports.home = function(req,res){
    log.info("进入首页...");
    res.render("index",{});
};




