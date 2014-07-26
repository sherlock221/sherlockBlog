var InventoryModel = require("./../models/inventModel");
var UserModel = require("./../models/userModel");
var baseError = require("./../exceptions/baseError");

//引入undersorce js
var _ = require("underscore");

var InventService = function () {
};

var inventModel = new InventoryModel();


/**
 * 查询每日清单
 * @param uid
 * @param companyId
 * @param date
 * @param callBack
 */
InventService.prototype.findByDay = function (uid, companyId, date, callBack) {
    var param = {
        userId: uid,
        iCompany: companyId,
        iCrtDate: date
    };

    inventModel.findByDate(param,function(err,result){
        if (!err && result.length> 0) {
            var newRes = result;
            //进行单价sum
            var totalArray = _.pluck(result, "ITOTAL");
            var total = _.reduce(totalArray, function (memo, num) {
                var p =  parseFloat(memo) + parseFloat(num);
                return p;
            }, 0);
            result = { result: newRes, total: total.toFixed(2)};
        }
        callBack(err, result);
    });

};


/**
 * 快速查询单价
 * @param uid
 * @param letter 首字母
 */
InventService.prototype.superSearch = function(uid,letter,itype,callBack){
    var param = {
        userId :uid,
        proLetters : letter,
        iType      : itype
    };

    inventModel.findPriceByLetters (param,function(err,result){
        var res = {result : result};
        callBack(err,res);
    });
};

/**
 * 商品名称查询清单
 * @param uid
 * @param type
 * @param proName
 * @param callBack
 */
InventService.prototype.findByProName = function(uid,itype,pid,index,size,callBack){
    var param = {
        userId: uid,
        iType: itype,
        pid : pid,
        index : index,
        size  : size
    };

    inventModel.findByProName(param,function(err,result){
        var res = {result : result};
        callBack(err,res);
    });
};

/**
 * 添加清单
 * @param json
 * @param callBack
 */
InventService.prototype.add = function (invent, callBack) {
    inventModel.add(invent,callBack);
};



/**
 * 根据id获得清单
 * @param id
 * @param callBack
 */
InventService.prototype.findById = function (id, callBack) {
    inventModel.findById(id, function (err, result) {
        //不存在
        if (!err && result == null) {
            err = new baseError.IdNotFoundException();
        }
        callBack(err, result);
    });
};


/**
 * 删除清单
 * @param id
 * @param callBack
 */
InventService.prototype.remove = function (id, callBack) {
    //检查id是否存在
    this.findById(id, function (err, result) {
        if (err) {
            callBack(err, result);
        }
        else {
            inventModel.remove(id, callBack);
        }
    });

};


/**
 * 更新清单
 * @param json
 * @param callback
 */
InventService.prototype.update = function (json, callBack) {
    var imodel = new InventoryModel(json);
    imodel.update(function (err, result) {
        callBack(err, result);
    });
};




module.exports = InventService;