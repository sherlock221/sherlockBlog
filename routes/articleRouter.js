/**
 * 文章router
 * @type {*}
 */
var log = require("./../log").logger("companyRouter");
var JString = require("./../util/jstring");
var Result = require("./result/result");

//业务


//文章页面
exports.article = function(req,res){
    log.info("进入文章页面...");
    res.render("article",{});
};





