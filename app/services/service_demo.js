var mysql_utils = require('gmdf').init_gmdf().get_mysql_utils()

var app=require('../../app');
var appUtils = require('gmdf').init_gmdf().get_app_utils()


/**
 * 查询用户列表信息
 * @param res
 * @param params
 * @returns {Promise<any>}
 */
exports.getDemo = function (res, params) {
    return new Promise(async function (resolve, reject) {
        try {
            var sql = " select * from business_user_info ";
            var order = " order by username ";
            var where = " where 1 = 1 ";
            var countSql = " select count(1) as total from business_user_info ";
            var whereParam = [];

            if (params.search_text) {
                where += " and username like ? or phonenumber like ?";
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


exports.saveUserWithRom = function (mapEntity1, mapEntity2) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.save("business_user_info", mapEntity1).then(function (result1) {
                mysql_utils.save("business_recommendation", mapEntity2).then(function (resul2) {
                    resolve(resul2)
                });

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

/**
 * 保存无推荐人用户
 * @param mapEntity
 * @returns {Promise<any>}
 */

exports.saveUser = function (mapEntity) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.save("business_user_info", mapEntity).then(function (result) {
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

/**
 * 查询手机号
 * @param phonenumber
 * @returns {Promise<any>}
 */

exports.query_phonenumber = function (phonenumber) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.find("select count(*) as num from business_user_info where phonenumber=?", [phonenumber]).then(function (result) {
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

/**
 * 新增购买信息
 * @param mapEntity
 * @returns {Promise<any>}
 */

exports.add_buy_detail = function (mapEntity) {
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


/**
 * 查询购买人金额信息
 * @param phonenumber
 * @returns {Promise<any>}
 */
exports.query_buy_detail = function (phonenumber) {
    var local_money = 0;
    var rom_money = 0;
    var rom_num=0;
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.find("select count(*) as num from business_user_info where phonenumber=?", [phonenumber]).then(function (result) {
                /**
                 * 存在该会员
                 */
                if (result[0].num >= 1) {
                    /**
                     * 本人购买金额
                     */
                    mysql_utils.find("SELECT sum(buy_money) as loc_m FROM business_shopping_details WHERE buy_phonenumber=?", [phonenumber]).then(function (res2) {
                        console.log(res2);
                        if (res2[0].loc_m && res2[0].loc_m >= 0) {
                            local_money = res2[0].loc_m;

                        } else {
                            local_money = 0;

                        }
                        /**
                         * 推荐金额
                         */
                        mysql_utils.find("SELECT sum(buy_money) as rom_m,count(*)  as num FROM business_shopping_details WHERE buy_phonenumber in (SELECT cover_phonenumber FROM business_recommendation WHERE main_phonenumber=?)", [phonenumber]).then(function (res1) {
                            if (res1[0].rom_m && res1[0].rom_m >= 0) {
                                rom_money = res1[0].rom_m;
                                rom_num=res1[0].num;
                            } else {
                                local_money = 0;
                                rom_num=0;
                            }
                            /**
                             * 返回值
                             */
                            resolve({
                                local_money: local_money,
                                rom_money: rom_money,
                                rom_num:rom_num
                            })

                        });


                    })

                } else {
                    resolve({
                        local_money: -1,
                        rom_money: -1
                    })
                }
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

/**
 * 修改会员信息
 * @param conditions
 * @param mapEntity
 * @returns {Promise<any>}
 */

exports.updateUser = function (conditions, mapEntity) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.update("business_user_info", conditions, mapEntity).then(function (result) {
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

/**
 * 删除会员
 * @param conditions
 * @returns {Promise<any>}
 */

exports.deleteUser = function (conditions) {
    return new Promise(async function (resolve, reject) {
        try {
            await mysql_utils.delete("business_user_info", conditions).then(function (result) {
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


exports.query_info = function (user_id) {
    return new Promise(async function (resolve, reject) {
        try {
            var userinfo = await mysql_utils.find("select * from business_user_info where id=?", [user_id]);
            var id = userinfo[0].id;
            var username = userinfo[0].username;
            var pn = userinfo[0].phonenumber;

            var local_money = await mysql_utils.find("SELECT sum(buy_money) as local FROM business_shopping_details WHERE buy_phonenumber=?", [pn]);
            var rom_num = await mysql_utils.find("SELECT count(*) as num FROM business_recommendation WHERE main_phonenumber=?", [pn]);
            var rom_money = await mysql_utils.find("SELECT sum(buy_money) as rom FROM business_shopping_details where buy_phonenumber in (SELECT cover_phonenumber FROM business_recommendation WHERE main_phonenumber=?)", [pn]);
            resolve({
                id: id,
                username: username,
                phonenumber: pn,
                local_money: local_money[0].local ? local_money[0].local:0,
                rom_num: rom_num[0].num,
                rom_money: rom_money[0].rom ? rom_money[0].rom:0
            })
        } catch (err) {
            app.logger.info(err);
            reject(err)
        }
    })


}