//log
var log = require("./../log").logger("indexRouter");

//首页
exports.homePage = function(req,res){
    log.info("进入首页...");
    res.render("home/index");
};




