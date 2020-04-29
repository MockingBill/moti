var express = require('express');
var router = express.Router();
var service = require('../services/service_demo');
var buy_service = require('../services/service_buy');
var app=require('../../app');

var appUtils = require('gmdf').init_gmdf().get_app_utils()

var ecl = require("../ecl/ecl_demo");

router.get('/list', async function (req, res, next) {
    try {
        await service.getDemo(res, req.query);
        app.logger.info(req.session.current_user.user_name+"执行列表查询刷新操作成功");
    } catch (err) {
        appUtils.respMsg(res, false, ecl, 10, 5100, err);
        app.logger.info(req.session.current_user.user_name+"执行列表查询刷新操作失败");
    }
});


/**
 * 新增会员
 * @type {v4|*}
 */
var UUID = require("uuid");
router.post('/save', async function (req, res, next) {
    try {
        var username = req.body.username;
        var phonenumber = req.body.phonenumber;
        var new_id = UUID.v4();
        var rom_phonenumber = req.body.rom_phonenumber;
        rom_phonenumber = rom_phonenumber.replace(/\s*/g, "");
        var mapEntity1 = {
            id: new_id,
            username: username,
            phonenumber: phonenumber
        };
        if (rom_phonenumber != "" && rom_phonenumber != undefined && rom_phonenumber != null) {
            var mapEntity2 = {
                main_phonenumber: rom_phonenumber,
                cover_phonenumber: phonenumber,
            };
            await service.saveUserWithRom(mapEntity1, mapEntity2);
        } else {
            var result = await service.saveUser(mapEntity1)
        }
        app.logger.info(req.session.current_user.user_name+"执行会员新增操作成功");
        appUtils.returnEclMsg(res, true, ecl, 11, 2000, result)

    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行会员新增操作失败");
        appUtils.returnEclMsg(res, false, ecl, 11, 5100, err)
    }
});

/**
 * 查询是否是正确是会员
 */
router.post("/query_phonenumber", async function (req, res, next) {
    var rom_phonenumber = req.body.rom_phonenumber;
    try {
        var result = await service.query_phonenumber(rom_phonenumber);

        if (result && result[0].num >= 1) {
            appUtils.respJsonData(res, {code: "001"})
        } else {
            appUtils.respJsonData(res, {code: "000"})
        }

    } catch (err) {

        appUtils.respJsonData(res, {code: "000"})
    }
});

/**
 * 查询购买信息
 */

router.post("/query_buy_detail", async function (req, res, next) {
    var phonenumber = req.body.phonenumber;
    try {
        var result = await service.query_buy_detail(phonenumber);
        app.logger.info(req.session.current_user.user_name+"查询购买信息成功");
        appUtils.respJsonData(res, result)

    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"查询购买信息失败");
        appUtils.respJsonData(res, {code: "000"})
    }
});

/**
 * 新增购买信息
 */
router.post("/add_buy_detail", async function (req, res, next) {

    var phonenumber = req.body.phonenumber;
    var currnt_buy_money = req.body.currnt_buy_money;

    var mapEntity = {
        buy_phonenumber: phonenumber,
        buy_money: currnt_buy_money,
        buy_datetime: (new Date()).Format("yyyy-MM-dd hh:mm:ss")
    };

    try {
        var result = await service.add_buy_detail(mapEntity);
        app.logger.info(req.session.current_user.user_name+"执行新增购买信息成功");
        appUtils.respJsonData(res, result)

    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行新增购买信息失败");
        appUtils.respJsonData(res, {code: "000"})
    }
});


router.post('/update', async function (req, res, next) {
    try {


        var id = req.body.id;
        var username = req.body.username;
        var phonenumber = req.body.phonenumber;

        var conditions = {
            id: id,
        };

        var mapEntity = {
            username: username,
            phonenumber: phonenumber
        };

        var result = await service.updateUser(conditions, mapEntity);
        app.logger.info(req.session.current_user.user_name+"执行用户修改成功");
        appUtils.returnEclMsg(res, true, ecl, 12, 2000, result)
    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行用户修改失败");
        appUtils.returnEclMsg(res, false, ecl, 12, 5100, err)
    }
});

router.post('/delete', async function (req, res, next) {
    try {
        var id = req.body.id;
        var conditions = {
            id: id
        }
        var result = await service.deleteUser(conditions);
        app.logger.info(req.session.current_user.user_name+"执行用户删除成功");
        appUtils.returnEclMsg(res, true, ecl, 13, 2000, result)
    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行用户删除失败");
        appUtils.returnEclMsg(res, false, ecl, 13, 5100, err)
    }
});

router.post('/info', async function (req, res, next) {
    try {
        var id = req.body.id;
        var result = await service.query_info(id);
        app.logger.info(req.session.current_user.user_name+"执行用户单独查询成功");
        appUtils.returnEclMsg(res, true, ecl, 13, 2000, result)
    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行用户单独查询失败");
        appUtils.returnEclMsg(res, false, ecl, 13, 5100, err)
    }
});


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

router.get('/buy_list', async function (req, res, next) {

    try {
      await buy_service.getList(res, req.query);

    } catch (err) {

        appUtils.respMsg(res, false, ecl, 10, 5100, err)
    }
});

router.post('/buy_save', async function (req, res, next) {
    try {
        var buy_phonenumber = req.body.buy_phonenumber;
        var buy_money = req.body.buy_money;
        var mapEntity = {
            buy_phonenumber: buy_phonenumber,
            buy_money: buy_money,
            buy_datetime: (new Date()).Format("yyyy-MM-dd hh:mm:ss")
        };
        var result = await buy_service.save(mapEntity);
        app.logger.info(req.session.current_user.user_name+"执行管理员端手动新增购买信息成功");
        appUtils.returnEclMsg(res, true, ecl, 11, 2000, result)
    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行管理员端手动新增购买信息失败");
        appUtils.returnEclMsg(res, false, ecl, 11, 5100, err)
    }
});


router.post('/buy_update', async function (req, res, next) {
    try {
        console.log(req.body);
        var buy_phonenumber = req.body.buy_phonenumber;
        var buy_money = req.body.buy_money;
        var conditions = {
            buy_phonenumber: buy_phonenumber,
        };
        var mapEntity = {
            buy_money: buy_money
        };
        var result = await buy_service.update(conditions, mapEntity);
        app.logger.info(req.session.current_user.user_name+"执行修改购买信息成功");
        app.logger.info(conditions);
        appUtils.returnEclMsg(res, true, ecl, 12, 2000, result)
    } catch (err) {
        console.log(err);
        app.logger.info(req.session.current_user.user_name+"执行修改购买信息失败");
        app.logger.info(conditions);
        appUtils.returnEclMsg(res, false, ecl, 12, 5100, err)
    }
});



router.post('/buy_delete', async function (req, res, next) {
    try {
        var buy_phonenumber = req.body.buy_phonenumber;
        var buy_money = req.body.buy_money;
        var buy_datetime = req.body.buy_datetime;
        var conditions = {
            buy_phonenumber:buy_phonenumber,
            buy_money:buy_money,
            buy_datetime:buy_datetime,
        }
        var result = await buy_service.delete(conditions);
        app.logger.info(req.session.current_user.user_name+"执行删除购买信息成功");
        app.logger.info(conditions);
        appUtils.returnEclMsg(res, true, ecl, 13, 2000, result)
    } catch (err) {
        app.logger.info(req.session.current_user.user_name+"执行删除购买信息失败");
        app.logger.info(conditions);
        appUtils.returnEclMsg(res, false, ecl, 13, 5100, err)
    }
});


module.exports = router;