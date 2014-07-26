//引入User模型
var db        = require("./db");
var UserModel =   function(){};


/**
 * 根据用户名查找用户信息
 * @param userName
 * @param callBack
 */
UserModel.prototype.findByName = function(name,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_USERS  U  WHERE  U.USERNAME=? AND  U.DELFLAG = 0",
        "args": [name],
        "handler": callBack
    });
};

/**
 * 根据id查询用户
 * @param id
 * @param callBack
 */
UserModel.prototype.findById = function(id,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_USERS  U  WHERE  U.ID=?",
        "args": [id],
        "handler": callBack
    });
};


/**
 * 添加用户
 * @param userJson
 * @param callBack
 */
UserModel.prototype.addUser = function(user,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_USERS(USERNAME, PASSWORD, CRTTIME, ROLEID) VALUES(?, ?, NOW(),?)",
        "args": [user.userName, user.passWord,user.roleId],
        "handler": callBack
    });
};

/**
 * 删除
 * @param userJson
 * @param callBack
 */
UserModel.prototype.removeUser = function(id,callBack){
    db.execQuery({
        "sql": "DELETE FROM T_USERS WHERE ID=?",
        "args": [id],
        "handler": callBack
    });
};

/**
 * 更新用户
 * @param userJson
 * @param callback
 */
UserModel.prototype.updateUser = function(user,callBack){
    db.execQuery({
        "sql": "UPDATE T_USERS  SET  PASSWORD=?, DELFLAG=?, ISLOCK=?, LOGINNUM=?, LASTLOGINTIME=?, CRTTIME=?, ROLEID=? WHERE id=?",
        "args": [user.passWord,user.delFlag,user.isLock,user.loginNum,user.lastLoginNum,user.crtTime,user.roleId,user.id],
        "handler": callBack
    });
};


module.exports = UserModel;