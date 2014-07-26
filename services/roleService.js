//引入Role模型
var RoleModel = require("./../models/roleModel");


var RoleService = function(){};

var roleModel = new RoleModel();


/**
 * 添加角色
 * @param callBack
 */
RoleService.prototype.add = function(role,callBack){
    roleModel.add(role,callBack);
};



module.exports = RoleService;