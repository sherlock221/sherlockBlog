//引入User模型
var CompanyModel = require("./../models/companyModel");
var baseError = require("./../exceptions/baseError");
//引入undersorce js
var _ = require("underscore");


var companyModel = new CompanyModel();

var CompanyService = function () {
};


/**
 * 查询全部公司
 * @param uid
 * @param callBack
 */
CompanyService.prototype.findAll = function (uid, callBack) {
    companyModel.findAll(uid, function (err, result) {
        if (!err) {
            var res = {result: []};
            if(result.length > 0){
                //进行分组
                var gp = _.groupBy(result, function (rm) {
                    return rm.CTYPE;
                });

                //重新封装属性
                for (var c in gp) {
                    var t = {"c_type": c, "array": gp[c]};
                    res.result.push(t);
                }
            }
            else{

            }
        }
        callBack(err, res);
    });
};


/**
 * 添加公司
 * @param json
 * @param callBack
 */
CompanyService.prototype.add = function (company, callBack) {
    this.findByName(company, function (err, res) {
        //不存在
        if (err == null && res.length <= 0) {
            companyModel.add(company, function (err, result) {
                callBack(err, result);
            });
            return;
        }
        else if (err == null && res.length > 0) {
            err = new baseError.NameIsExistException("公司名称已经存在!!");
        }
            callBack(err, res);
    });
};


/**
 * 根据名称查找公司
 * @param userName
 * @param callBack
 */
CompanyService.prototype.findByName = function (company, callBack) {
    companyModel.findByName(company, function (err, result) {
        callBack(err, result);
    });
};


/**
 * 根据id公司
 * @param id
 * @param callBack
 */
CompanyService.prototype.findById = function (id, callBack) {
    companyModel.findById(id, function (err, result) {
        callBack(err, result);
    });
};


/**
 * 删除公司
 * @param id
 * @param callBack
 */
CompanyService.prototype.remove = function (id, callBack) {
    //检查id是否存在
    this.findById(id, function (err, result) {
        if (!err && result.length  > 0 ) {
            companyModel.remove(id, callBack);
            return;
        }
        else if (err == null && result.length == 0) {
            err = new baseError.IdNotFoundException("公司ID不存在");
        }
        else{
            callBack(err,result);
        }
    });

};


/**
 * 更新公司
 * @param json
 * @param callback
 */
CompanyService.prototype.update = function (json, callBack) {
    var company = new CompanyModel(json);
    company.update(function (err, result) {
        callBack(err, result);
    });
};


/**
 * 查询需要更新公司数据
 * @param upTime  更新时间
 * @param callback
 */
CompanyService.prototype.findSync = function (uid, upTime, callBack) {
    var query = CompanyModel.find({user_id: uid}).where("up_time").gt(upTime);
    query.exec(function (err, result) {
        callBack(err, result);
    });
};


module.exports = CompanyService;