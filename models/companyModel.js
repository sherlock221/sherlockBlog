//引入User模型
var db        = require("./db");
var CompanyModel =   function(){};


/**
 * 查询公司列表
 * @param uid
 * @param callBack
 */
CompanyModel.prototype.findAll = function(uid,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_COMPANY  C  WHERE  C.USERID=?  AND C.DELFLAG = 0 ORDER BY C.ID DESC",
        "args": [uid],
        "handler": callBack
    });
};


/**
 * 根据产品名称查询公司
 * @param name
 * @param callBack
 */
CompanyModel.prototype.findByName = function(company,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_COMPANY  C  WHERE  C.CNAME=? AND C.USERID =? AND C.DELFLAG = 0",
        "args": [company.cName,company.userId],
        "handler": callBack
    });
};

/**
 * 根据id查询
 * @param id
 * @param callBack
 */
CompanyModel.prototype.findById = function(id,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_COMPANY  C  WHERE  C.ID=? AND C.DELFLAG =0 ",
        "args": [id],
        "handler": callBack
    });
};


/**
 * 添加
 * @param pro
 * @param callBack
 */
CompanyModel.prototype.add = function(company,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_COMPANY(CNAME, CCONTENT, CTYPE, CRTTIME,USERID) VALUES(?,?,?,NOW(),?)",
        "args": [company.cName,company.cContent,company.cType,company.userId],
        "handler": callBack
    });
};


/**
 * 删除
 * @param id
 * @param callBack
 */
CompanyModel.prototype.remove = function(id,callBack){
    db.execQuery({
        "sql": "DELETE FROM T_COMPANY WHERE ID = ?",
        "args": [id],
        "handler": callBack
    });
};

/**
 * 更新
 * @param callback
 */
CompanyModel.prototype.update = function(pro,callBack){
    db.execQuery({
//        "sql": "UPDATE T_USERS  SET  PASSWORD=?, DELFLAG=?, ISLOCK=?, LOGINNUM=?, LASTLOGINTIME=?, CRTTIME=?, ROLEID=? WHERE id=?",
        "args": [user.passWord,user.delFlag,user.isLock,user.loginNum,user.lastLoginNum,user.crtTime,user.roleId,user.id],
        "handler": callBack
    });
};



module.exports = CompanyModel;