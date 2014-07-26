//引入User模型
var db        = require("./db");
var ProductModel =   function(){};




ProductModel.prototype.findByPage = function(uid,pageInde,pageSize,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_PRODUCT  P   WHERE P.USERID =? AND P.DELFLAG = 0    ORDER BY P.HOT DESC LIMIT ?,?",
        "args": [uid,pageInde,pageSize],
        "handler": callBack
    });
};
/**
 * 全部商品
 * @param uid
 * @param callBack
 */
ProductModel.prototype.findAll = function(uid,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_PRODUCT  P  WHERE P.USERID =? AND P.DELFLAG = 0",
        "args": [uid],
        "handler": callBack
    });
};


/**
 * 根据产品名称查询产品
 * @param name
 * @param callBack
 */
ProductModel.prototype.findByName = function(product,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_PRODUCT  P  WHERE  P.PRONAME=? AND P.USERID =? AND P.DELFLAG = 0 ",
        "args": [product.proName,product.userId],
        "handler": callBack
    });
};

/**
 * 根据id查询
 * @param id
 * @param callBack
 */
ProductModel.prototype.findById = function(id,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_PRODUCT  P  WHERE  P.ID=?",
        "args": [id],
        "handler": callBack
    });
};


/**
 * 模糊查询商品
 * @param id
 * @param callBack
 */
ProductModel.prototype.searchPro = function(uid,letters,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_PRODUCT  P  WHERE  P.USERID=? AND  P.DELFLAG = 0 AND  P.PROLETTERS LIKE  ? ORDER BY P.ID DESC",
        "args": [uid,letters+"%"],
        "handler": callBack
    });
};



/**
 * 添加产品
 * @param pro
 * @param callBack
 */
ProductModel.prototype.add = function(pro,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_PRODUCT(PRONAME, PROLETTERS, PROCONTENT, PROSTANDARD,CRTTIME,USERID) VALUES(?,?,?,?,NOW(),?)",
        "args": [pro.proName, pro.proLetters,pro.proContent,pro.proStandard,pro.userId],
        "handler": callBack
    });
};


/**
 * 删除
 * @param id
 * @param callBack
 */
ProductModel.prototype.remove = function(id,callBack){
    db.execQuery({
        "sql": "DELETE FROM T_PRODUCT  WHERE ID=?",
        "args": [id],
        "handler": callBack
    });
};

/**
 * 更新产品信息
 * @param callback
 */
ProductModel.prototype.update = function(pro,callBack){
    db.execQuery({
        "sql": "UPDATE T_PRODUCT  SET  PROCONTENT=?, PROSTANDARD=? WHERE id=?",
        "args": [pro.proContent,pro.proStandard,pro.proId],
        "handler": callBack
    });
};



module.exports = ProductModel;