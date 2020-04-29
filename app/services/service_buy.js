var mysql_utils = require('gmdf').init_gmdf().get_mysql_utils();
var appUtils = require('gmdf').init_gmdf().get_app_utils();
var app=require('../../app');


/**
 * 查询用户列表信息
 * @param res
 * @param params
 * @returns {Promise<any>}
 */
exports.getList = function (res, params) {
    return new Promise(async function (resolve, reject) {
        try {
            var sql = " select u.username as username," +
                "buy_phonenumber,buy_money,buy_datetime from  business_shopping_details as s,business_user_info as u";
            var where = " where 1 = 1 and u.phonenumber=s.buy_phonenumber";
            var countSql = " select count(1) as total from business_shopping_details as s,business_user_info as u";
            var order = " order by buy_phonenumber ";
            var whereParam = [];

            if (params.search_text) {
                where += " and  buy_phonenumber like ?";
                whereParam.push("%" + params.search_text + "%");
                whereParam.push("%" + params.search_text + "%");
            }
            var result = await mysql_utils.pagingQuery(sql + where + order, countSql + where, whereParam, params.page, params.limit);
            resolve(appUtils.respJsonData(res, result))
        } catch (err) {
            app.logger.info(err);
            reject(err)
        }
    })
};

exports.save = function (mapEntity) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.save("business_shopping_details", mapEntity).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                app.logger.info(err);
                reject(err)
            })
        } catch (err) {
            app.logger.info(err);
            reject(err)
        }
    })
};

exports.update = function (conditions, mapEntity) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.update("business_shopping_details", conditions, mapEntity).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                app.logger.info(err);
                reject(err)
            })
        } catch (err) {
            app.logger.info(err);
            reject(err)
        }
    })
};

exports.delete = function (conditions) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.delete("business_shopping_details", conditions).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                app.logger.info(err);
                reject(err)
            })
        } catch (err) {
            app.logger.info(err);
            reject(err)
        }
    })
};
