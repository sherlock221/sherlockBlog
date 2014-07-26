var UserService = require("./../services/userService");
var userError = require("./../exceptions/userError");
//log
var log = require("./../log").logger("userRoute");

//初始化UserDao
var userService = new UserService();


//进入登录页面
var loginPage = function (req, res, next) {
    log.info("进入登录页面...");
    res.render("admin/login", {error:"wu"});
};

//注册页面
var registerPage = function (req, res, next) {
    log.info("进入register页面...");
    res.render("admin/register");
};

//登录
var login = function (req, res, next) {

    var userName = req.body.userName;
    var passWord = req.body.passWord;

    userService.login(userName,passWord, function (err, user) {
        //向下抛出异常
        if (err) {
            next(err);
        }
        else{
           //记录session 缓存信息
            req.session.user = user;
            log.info("登录成功...");
            res.charset = 'utf-8';

            //跳转首页显示
            res.render("index",{user:user});
        }

    });
};

//注册
var register = function (req, res) {
    log.info("开始注册...");
    var user = {};
    user.userName = req.body.userName;
    user.passWord = req.body.passWord;

    //设置创建时间
    user.crtTime = new Date();
    //设置数据状态
    user.delFlag = false;
    //设置是否被锁定
    user.isLock = false;
    //设置其角色

    userService.addUser(user, function (err, user) {
        if (err) next(err)

        if (!err && null != user) {
            log.info("新注册用户 : " + user.userName);
            res.json({result: "1"});
        }

    });
};


//根据ID查询用户 隐藏功能
var hidden_findUserByID = function (req, res, next) {
    var id = req.params.id;
    userService.findUserById(id, function (err, result) {
        console.log(result);
        if (err) next(err);
    });
};


exports.loginPage = loginPage;
exports.registerPage = registerPage;
exports.login = login;
exports.register = register;
exports.hidden_findUserByID = hidden_findUserByID;


