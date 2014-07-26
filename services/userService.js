//引入User模型
var UserModel = require("./../models/userModel");
var baseError = require("./../exceptions/baseError");
var userError = require("./../exceptions/userError");
var MD5 = require("./../util/md5");
var UserService = function () {
};

var userModel = new UserModel();

/**
 * 用户登录
 * @param userName
 * @param passWord
 * @param callBack
 */
UserService.prototype.login = function (userName, passWord, callBack) {
    this.findByName(userName, function (err, user) {
        if (err ==null && user.length > 0) {
            err = MD5.base64(passWord) == user.passWord ? err : new userError.UserPassError();
        }
        callBack(err, user);
    });
};

/**
 * 根据用户名查找用户信息
 * @param userName
 * @param callBack
 */
UserService.prototype.findByName = function (uname, callBack) {
    userModel.findByName(uname, function (err, result) {
        callBack(err, result);
    });
};


/**
 * 根据id查询用户
 * @param id
 * @param callBack
 */
UserService.prototype.findUserById = function (id, callBack) {
    userModel.findById(id,function(err,result){
        callBack(err,result);
    });
};


/**
 * 查询用户下的角色信息
 * @param id
 * @param callBack
 */
UserService.prototype.findUserRoles = function (id, callBack) {
    this.findUserById(id, function (err, user) {
        if (!err && user != null) {
            var where = {_id: id};
            var columns = ["roles"];
            var options = {};
            UserModel.find(where, columns, options, function (err, result) {
                callBack(err, result);
            });
            return;
        }
        callBack(err, user);
    });
};


/**
 * 添加用户
 * @param userJson
 * @param callBack
 */
UserService.prototype.addUser = function (userJson, callBack) {
    this.findByName(userJson.userName, function (err, result) {
        //结果集0
        if (err == null && result.length == 0) {
            userJson.passWord = MD5.base64(userJson.passWord);
            userModel.addUser(userJson, function (err, result) {
                callBack(err, result);
            });
        }
        //出现异常
        else if (err) {
            callBack(err, result);
        }
        //结果集  > 0
        else {
            console.log("用户名已经存在...");
            err = new userError.UserIsExists();
            callBack(err, result);
        }
    });
};

/**
 * 删除
 * @param userJson
 * @param callBack
 */
UserService.prototype.removeUser = function (id, callBack){

    this.findById(id,function(err,result){

        if(err == null && result.length  <= 0){
            err = new baseError.IdNotFoundException();
        }
        else if(err == null && result.length > 0){
            userModel.removeUser(id,callBack);
            return;
        }
        callBack(err,result);

    });
};

/**
 * 更新用户
 * @param userJson
 * @param callback
 */
UserService.prototype.updateUser = function (userJson, callBack) {
    userModel.updateUser(userJson,function(err,result){
        callBack(err,result);
    });
};

module.exports = UserService;