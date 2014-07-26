//log
var log = require("./../log").logger("router");

/**
 * 路由
 * @type {exports}
 */
var userRouter = require("./userRouter");
var articleRouter = require("./articleRouter");
var indexRouter = require("./indexRouter");


//转发
module.exports.use = function(app){


    /**
     * 页面跳转
     */
    //主页
    app.get("/homePage",indexRouter.home);
    //文章页面
    app.get("/articlePage",articleRouter.article);
    //文章列表页面



    /*
     * 商品
     */

    //全部商品
    app.get("/product", productRouter.findAll);
    //增删改
    app.post("/product", productRouter.add);
    app.delete("/product",productRouter.remove);
    app.put("/product",productRouter.update);

    //模糊查询
    app.get("/product/search",productRouter.searchPro);
    //查询最热商品
    app.get("/product/hot",productRouter.findHot);
    //根据ID查询商品
    app.get("/product/id",productRouter.searchPro);


    /*
     *  公司
     */

   //查询全部
   app.get("/company", companyRouter.findAll);
   //增删改
   app.post("/company", companyRouter.add);
   app.delete("/company",companyRouter.remove);
   app.put("/company",companyRouter.update);
   //获得同步数据
   //app.get("/company/sync",companyRouter.findSync);



    /*
     * 清单
     */
    app.get("/invent", inventRouter.findByDay);

    //速查
    app.get("/invent/search", inventRouter.superSearch);
    app.get("/invent/searchRes", inventRouter.findByProName);
    app.post("/invent", inventRouter.add);
    app.delete("/invent",inventRouter.remove);
    app.put("/invent",inventRouter.update);



};

//隐藏功能
module.exports.hidden = function(app){

};
