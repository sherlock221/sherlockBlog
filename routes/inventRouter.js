var log = require("./../log").logger("inventRouter");
var InventService = require("./../services/inventService");
var Result = require("./result/result");
var JString = require("./../util/jstring");
var inventService = new InventService();
var uid = 1;


/**
 * 查询当日清单
 * @param req
 * @param res
 * @param next
 */
exports.findByDay = function(req,res,next){
    //模拟userid
    var companyId = req.query.companyId;
    var date =  req.query.date || JString.getYYMMDD();

    inventService.findByDay(uid,companyId,date,function(err,result){
        if (err) {
            next(err);
        }
        else{
            //输出json数据
            res.json(result);
        }
    });
};


//添加清单
exports.add = function(req,res,next){

    var result = Result.SUCCESS;

    //获得参数
    var i_product  = req.body.i_product;
    var i_price = req.body.i_price;
    var i_number = req.body.i_num;
    var i_company = req.body.i_company;
    var i_type = req.body.i_type;

    var i_time = req.body.i_time;

    //商品规格特殊字段
    var i_standard = req.body.i_standard;

    //获得当前年月日
   // var newDate = JString.getYYMMDD();

    //计算总额
    var i_total = parseInt(i_number) *  parseFloat(i_price);
    console.log(i_total);

    console.log(i_time);

    var product = {
        i_product : i_product,
        i_price : i_price,
        i_number : i_number,
        i_total  : i_total,
        i_company : i_company,
        i_standard : i_standard,
        i_type    : i_type,
        i_crtDate : i_time,
        user_id    : uid,
        del_flag    : false
    };
    inventService.add(product,function(err,resObj){
        if(err){
            next(err);
        }
        else{
            res.json({ result : result});
        }
    });
};


//更新清单
exports.update = function(req,res,next){
};

//删除清单
exports.remove = function(req,res,next){
    var cid = req.body._id;
    console.log(cid );
    if(JString.isEmpty(cid)){
        result = Result.PARAM_ERROR;
        res.json({code:Result.PARAM_ERROR});
    }
    else{
        inventService.remove(parseInt(cid),function(err,result){
            if(err){
                next(err);
            }
            else{
                res.json({code:Result.SUCCESS});
            }
        });
    }

};


//速查清单
exports.superSearch = function(req,res,next){
    var letter = req.query.letter;
    var itype  = req.query.itype;

    inventService.superSearch(uid,letter,itype,function(err,result){
        if (err) {
            next(err);
        }
        else{
            //输出json数据
            res.json(result);
        }
    });
};


//清单名称查询
exports.findByProName = function(req,res,next){
    var pid = req.query.pid;
    var iType  = req.query.iType;
    var indexPage  = req.query.indexPage;
    var totalCount = req.query.totalCount;

    //每页显示8条
    var size = 8;

    //计算总页数
    var totalPage =  totalCount % size == 0 ? totalCount / size : parseInt(totalCount / size) +1;

    if(indexPage > totalPage){
        console.log("没有了最后了",totalPage);
        res.json({result : Result.LAST_PAGE});
    }
    else{

        var index = (indexPage -1)*size;
        inventService.findByProName(uid,iType,pid,index,size,function(err,result){
            if (err) {
                next(err);
            }
            else{
                //输出json数据
                res.json(result);
            }
        });
    }



};