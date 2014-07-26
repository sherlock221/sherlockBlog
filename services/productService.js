//引入User模型
var ProductModel = require("./../models/productModel");
var baseError = require("./../exceptions/baseError");
var productError = require("./../exceptions/productError");
//引入undersorce js
var  _ = require("underscore");

var ProductService = function () {
};

var productModel = new ProductModel();


/**
 * 查询全部商品
 * @param uid
 * @param callBack
 */
ProductService.prototype.findAll = function(uid,callBack){
    productModel.findAll(uid,function(err,result){
        if(!err && result.length > 0){
            result = _.groupBy(result,function(obj){
                var firstLetter =  _.first(obj.PROLETTERS);
                console.log(firstLetter);
                obj.PROSTANDARD = obj.PROSTANDARD.split(",");
                return firstLetter;
            });

            var newRes = [];
            for(var obj in result){
                newRes.push({"firstLetter":obj, "array" : result[obj]});
            }
            result = {result : newRes};
        }
        callBack(err,result);
    });
};

/**
 * 分页查询商品(crtTime desc)
 * @param uid
 * @param callBack
 */
ProductService.prototype.findByPage = function (uid, pageIndex,pageSize,callBack) {
    productModel.findByPage(uid,pageIndex,pageSize,callBack);
};


/**
 * 查询总记录数
 */
ProductService.prototype.count = function (param, callBack) {
};


/**
 * 添加商品
 * @param json
 * @param callBack
 */
ProductService.prototype.add = function (product, callBack) {
    this.findByName(product, function (err, res) {
        //不存在
        if (err == null && res.length <= 0) {
            productModel.add(product,function(err,result){
                  callBack(err,result);
            });
            return;
        }
        else if(err == null && res.length > 0){
            err = new baseError.NameIsExistException("商品名称已存在!");
        }
            callBack(err, res);

    });
};


/**
 * 根据名称查找商品
 * @param userName
 * @param callBack
 */
ProductService.prototype.findByName = function (name, callBack) {
    productModel.findByName(name,function(err,result){
        callBack(err, result);
    });
};



/**
 * 模糊查询商品
 */
ProductService.prototype.searchPro = function(uid,letter,callBack){
    productModel.searchPro(uid,letter,function(err,result){
        var res = {result : result};
        callBack(err,res);
    });
};


/**
 * 根据id商品
 * @param id
 * @param callBack
 */
ProductService.prototype.findById = function (id, callBack) {
    productModel.findById(id,callBack);
};


/**
 * 删除商品
 * @param id
 * @param callBack
 */
ProductService.prototype.remove = function (id, callBack) {
    //检查id是否存在
    this.findById(id, function (err, result) {
        if (err == null && result.length == 0) {
            err =  new baseError.IdNotFoundException();
        }
        else if(err == null && result.length > 0){
            productModel.remove(id, callBack);
        }
        callBack(err,result);
    });
};


/**
 * 更新商品
 * @param json
 * @param callback
 */
ProductService.prototype.update = function (product, callBack) {
    //检查id是否存在
    this.findById(product.proId, function (err, result) {
        if (err == null && result.length == 0) {
            err =  new baseError.IdNotFoundException();
        }
        else if(err == null && result.length > 0){
            productModel.update(product, callBack);
        }
        callBack(err,result);
    });
};



module.exports = ProductService;