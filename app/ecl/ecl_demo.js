var desp = {
    app_id: 'demo_list',// 模块编码
    app_author: 'yanghang',// 模块开发人员，gitlib账号名
    app_issueid:'', //开发任务ID ，如 #128
    app_biz_map: {// 功能列表
        '10': {// 功能编号
            app_biz_desp: '显示列表数据', // 功能描述
            app_biz_modifier: '', // 功能修改人（非必填）
            app_issueid:'', //开发任务ID ，如 #128
            app_biz_code_map: {
                //-------------------调试和info代码---------------------------
                1101: {sdesp: '我的debug1', desp: '我的debug1'},
                //-------------------成功的代码---------------------------
                2000: {sdesp: '查询列表数据成功', desp: '查询列表数据成功'},
                //-------------------路由层代码51xx---------------------------
                5100: {sdesp: '查询列表数据异常', desp: '查询列表数据异常'},
                //-------------------业务层/JOB/其他服务代码52xx---------------------------
            }
        },
        '11': {// 功能编号
            app_biz_desp: '保存数据', // 功能描述
            app_biz_modifier: '', // 功能修改人（非必填）
            app_issueid:'', //开发任务ID ，如 #128
            app_biz_code_map: {
                //-------------------调试和info代码---------------------------
                1101: {sdesp: '我的debug1', desp: '我的debug1'},
                //-------------------成功的代码---------------------------
                2000: {sdesp: '保存用户信息成功', desp: '保存用户信息成功'},
                //-------------------路由层代码51xx---------------------------
                5100: {sdesp: '保存用户信息异常', desp: '保存用户信息异常'},
                //-------------------业务层/JOB/其他服务代码52xx---------------------------
            }
        },
        '12': {// 功能编号
            app_biz_desp: '修改用户数据', // 功能描述
            app_biz_modifier: '', // 功能修改人（非必填）
            app_issueid:'', //开发任务ID ，如 #128
            app_biz_code_map: {
                //-------------------调试和info代码---------------------------
                1101: {sdesp: '我的debug1', desp: '我的debug1'},
                //-------------------成功的代码---------------------------
                2000: {sdesp: '修改用户信息成功', desp: '修改用户信息成功'},
                //-------------------路由层代码51xx---------------------------
                5100: {sdesp: '修改用户信息异常', desp: '修改用户信息异常'},
                //-------------------业务层/JOB/其他服务代码52xx---------------------------
            }
        },
        '13': {// 功能编号
            app_biz_desp: '删除用户数据', // 功能描述
            app_biz_modifier: '', // 功能修改人（非必填）
            app_issueid:'', //开发任务ID ，如 #128
            app_biz_code_map: {
                //-------------------调试和info代码---------------------------
                1101: {sdesp: '我的debug1', desp: '我的debug1'},
                //-------------------成功的代码---------------------------
                2000: {sdesp: '删除用户信息成功', desp: '删除用户信息成功'},
                //-------------------路由层代码51xx---------------------------
                5100: {sdesp: '删除用户信息异常', desp: '删除用户信息异常'},
                //-------------------业务层/JOB/其他服务代码52xx---------------------------
            }
        },
    }
};

module.exports = desp;
