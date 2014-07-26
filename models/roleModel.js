//引入User模型
var db        = require("./db");
var RoleModel =   function(){};


/**
 * 添加角色
 * @param callBack
 */
RoleModel.prototype.add = function(role,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_ROLE(ROLENAME, ROLENUM, CRTTIME) VALUES(?, ?, NOW())",
        "args": [role.roleName, role.roleNum],
        "handler": callBack
    });
};


module.exports = RoleModel;