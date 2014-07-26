/**
 * 文件夹router
 * @type {*}
 */
var log = require("./../log").logger("FolderRouter");
var JString = require("./../util/jstring");
var Result = require("./result/result");

//业务


//文件夹页面
exports.folderPage = function(req,res){
    log.info("进入文件夹页面...");
    res.render("folder",{});
};





