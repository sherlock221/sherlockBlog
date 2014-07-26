//log
var log = require("./../log").logger("router");

/**
 * 路由
 * @type {exports}
 */
var userRouter = require("./userRouter");
var articleRouter = require("./articleRouter");
var indexRouter = require("./indexRouter");
var folderRouter = require("./folderRouter");


//转发
module.exports.use = function(app){


    /**
     * 页面跳转
     */
    //主页
    app.get("/home",indexRouter.homePage);
    //文章页面
    app.get("/articlePage",articleRouter.articlePage);
    //文章列表页面
    app.get("/folder",folderRouter.folderPage);
    //登陆页面
    app.get("/login",userRouter.loginPage);







};

//隐藏功能
module.exports.hidden = function(app){

};
