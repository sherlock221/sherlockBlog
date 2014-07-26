var db        = require("./db");
var InventModel =   function(){};




InventModel.prototype.findPriceByLetters = function(param,callBack){
    var array = [];
    var args = [param.userId];

    array.push(" SELECT ");
    array.push(" TP.PRONAME,");
    array.push(" TP.PROLETTERS,");
    array.push(" TP.ID AS 'PID',");
    array.push(" TI.ITYPE,");
    array.push(" TI.ID AS 'ID',");
    array.push(" count(TP.PRONAME) AS 'NUM'");
    array.push(" FROM");
    array.push(" T_INVENTORY TI");
    array.push(" LEFT JOIN");
    array.push(" T_PRODUCT TP ON TI.IPRODUCT = TP.ID");
    array.push(" WHERE");
    array.push(" TI.DELFLAG = 0 AND TP.DELFLAG = 0");
    array.push(" AND TI.USERID = ? ");

    if(param.iType){
        array.push(" AND TI.ITYPE = ? ");
        args.push(param.iType);
    }

    array.push(" AND TP.PROLETTERS LIKE  ? ");
    array.push(" GROUP BY");
    array.push(" TP.PRONAME,TI.ITYPE ");
    array.push(" ORDER BY");
    array.push(" TP.HOT,TP.ID");

    args.push(param.proLetters+"%");

    db.execQuery({
        "sql": array.join(""),
        "args": args,
        "handler": callBack
    });

};

/**
 * 查询每日清单
 * @param userId
 * @param date
 * @param callBack
 */
InventModel.prototype.findByDate = function(param,callBack){

    var array = [];

    array.push("SELECT");
    array.push(" TI.*, TP.PRONAME");
    array.push(" FROM");
    array.push(" T_INVENTORY TI");
    array.push(" INNER JOIN");
    array.push(" T_PRODUCT TP ON TI.IPRODUCT = TP.ID");
    array.push(" WHERE  TI.DELFLAG = 0  AND TI.ICOMPANY = ?  AND TP.DELFLAG = 0 AND TI.ICRTDATE = ? AND TI.USERID = ?");

    db.execQuery({
        "sql": array.join(""),
        "args": [param.iCompany,param.iCrtDate,param.userId],
        "handler": callBack
    });
};


/**
 * 商品名称查询清单
 * @param param
 * @param callBack
 */
InventModel.prototype.findByProName = function(param,callBack){

    var array  = [];
    var args = [];
    args.push(param.userId);

    array.push(" SELECT ");
    array.push(" TP.PRONAME, TY.CNAME,TI . *");
    array.push(" FROM");
    array.push(" T_INVENTORY TI");
    array.push(" LEFT JOIN");
    array.push(" T_PRODUCT TP ON TI.IPRODUCT = TP.ID");
    array.push(" LEFT JOIN");
    array.push(" T_COMPANY TY ON TI.ICOMPANY  = TY.ID");
    array.push(" WHERE");
    array.push(" TI.DELFLAG = 0 AND TP.DELFLAG = 0  AND TY.DELFLAG =0 ");
    array.push(" AND TI.USERID = ?");
    if(param.iType){
        array.push(" AND TI.ITYPE = ?");
        args.push(param.iType);
    }

    array.push(" AND TI.IPRODUCT = ?");
    array.push(" ORDER BY");
    array.push(" TI.ID DESC");
    array.push(" LIMIT ?,?");

    args.push(param.pid);
    args.push(param.index);
    args.push(param.size);
    db.execQuery({
        "sql": array.join(""),
        "args": args,
        "handler": callBack
    });
};

/**
 * 根据id查询
 * @param id
 * @param callBack
 */
InventModel.prototype.findById = function(id,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_INVENTORY TI  WHERE  TI.ID=? AND TI.DELFLAG = 0",
        "args": [id],
        "handler": callBack
    });
};


/**
 * 添加清单
 * @param pro
 * @param callBack
 */
InventModel.prototype.add = function(invent,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_INVENTORY(USERID,IPRODUCT, ITYPE, ICOMPANY, ICRTDATE,INUMBER,IPRICE,ITOTAL,ISTANDARD) VALUES(?,?,?,?,?,?,?,?,?)",
        "args": [invent.user_id, invent.i_product,invent.i_type, invent.i_company,invent.i_crtDate,invent.i_number,invent.i_price,invent.i_total,invent.i_standard],
        "handler": callBack
    });
};


/**
 * 删除
 * @param id
 * @param callBack
 */
InventModel.prototype.remove = function(id,callBack){
    db.execQuery({
        "sql": "DELETE FROM T_INVENTORY WHERE ID=?",
        "args": [id],
        "handler": callBack
    });
};

/**
 * 更新产品信息
 * @param callback
 */
InventModel.prototype.update = function(invent,callBack){

};



module.exports = InventModel;