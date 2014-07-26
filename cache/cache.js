/**
 * 缓存数据
 */

//log
var log = require("./../log").logger("cache");
var  RoleService = require("./../services/roleService");
var  roleService = new RoleService();

exports.use = function(){
    userCache();
};


//缓存用户相关数据
var  userCache = function(){
    //缓存角色
    roleService.findRoles(function(err,roles){
        if(err)
            log.err(err);
        else{
           // log.info("缓存角色数据...");
            global.ROLES = roles;
        }
    });
};

//数据字典
var  dictionaryCache = function(){


};

