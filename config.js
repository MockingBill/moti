var project_url_prefix = "";

var config = {
    project: {
        base: project_url_prefix,
        project_key: 'gmdf',
        project_title: '演示系统',
        project_name: '演示系统',
        project_copy_right: '© 2018 中国移动通信集团贵州公司  版权所有',
        captcha_login_enable: false, // 是否开启登陆验证码
        captcha_session_key: 'captcha_session_key',
        page_config: {
            height: 'full-190',
            theme: 'default',
            home_open_way: 'single',
            color: 'blue'
        },
        account: {
            sync: {
                status: false, // 是否开启同步
                catalog: [ // 账号同步定义(disabled:true & checked:true：表示默认选中且不可去除勾选; on:true：表示启用)
                    {
                        value: 'gitlab',
                        title: 'gitlab',
                        on: false,
                        disabled: false,
                        checked: false,
                        api_file: '../../app/utils/sync_util.js',
                        api_method: 'syncAccount2Gitlab'
                    },
                    {
                        value: 'zabbix',
                        title: 'zabbix',
                        on: false,
                        disabled: false,
                        checked: false,
                        api_file: '../../app/utils/sync_util.js',
                        api_method: 'syncAccount2Zabbix'
                    }
                ]
            }
        }
    },
    routes: {
        mount_path: '*/routes/*', // 路由挂载路径
        is_debug: true, // 是否开启调试模式
        super_users:["admin"],
        mappings: {
            //'/project/configManage/routes/': project_url_prefix + '/api/configManage/',//配置管理
        },
        // 不做权限检查url（支持通配符*，尽量少用）示例：'/aiops_logs.page'
        exclude_auth_check_urls: [
            '/login',
            '/login.do',
            '/captcha.do',
            '/insertAlarmInfo.do',
            '/dashboard_route/readData.do'
        ],
        // 登陆后就能访问的url（无需授权）（支持通配符*，尽量少用）,如：修改个人信息、注销等操作
        logged_can_access_urls: [
            '/public/*',
            '/',
            '/logout',
            '/console.page',
            '/getTaskStatus.do',
            '/visual_config.page',
            '/device_detail.page',
            '/maintain_tasking_detail.page',
            '/maintain_tasked_detail.page',
            '/test_detail.page',
            '/log_single.page',
            '/index.page',
            '/log_tab.page',
            '/zabbix_login.do',
            '/index_db.page',
            '/demo/*',
            '/buy/*',
            '/user_info.page',
            '/change_pwd.page',
        ]
    },
    mysql: {
        default: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'illidan@1994Dq',
            database: 'gmdf_demo',
            timezone:"SYSTEM",
            acquireTimeout: 2000,
            connectionLimit: 5
        }


    },
    session: {
        options: {
            secret: 'gmdp_secret_shk',
            key: 'gmdp_id', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 1 * 60 * 60 * 1000
            },
        },
        db: {
            connection: 'default', // session store mysql connection name
            options: {
                // How frequently expired sessions will be cleared; milliseconds:
                checkExpirationInterval: 900000,
                // The maximum age of a valid session; milliseconds:
                expiration: 86400000,
                // Whether or not to create the sessions database table, if one does not already exist:
                createDatabaseTable: true,
                // Number of connections when creating a connection pool:
                connectionLimit: 1,
                // Whether or not to end the database connection when the store is closed:
                //charset: 'utf8_general_ci',
                schema: {
                    tableName: 'common_user_sessions',
                    columnNames: {
                        session_id: 'session_id',
                        expires: 'session_expires',
                        data: 'session_data'
                    }
                }
            }
        }
    },
    auth: {
        auth_type: 'loc', // local：本地认证；cas：单点登录认证
        // cas服务端访问url
        cas_server_url: 'http://218.201.251.104:10080/cas',
        // cas服务端内网访问url（用于验证令牌，非必填，不填同cas_server_url）
        cas_lan_server_url: 'http://10.196.130.69:8089/cas',
        cas_server_version: '2.0',
        // 当前应用（client）访问url
        cas_client_service_url: 'http://127.0.0.1:3000',
        cas_client_session_name: 'cas_sso_user',

        cas_server_login_url:'http://117.187.6.14:5555/sso/cas/login',
        cas_server_validate_url:'http://117.187.6.14:5555/sso/cas/serviceValidate',
        cas_server_logout_url:'http://117.187.6.14:5555/sso/cas/logout',

        password: {
            key_1: 'ea5456ffa698a9d7b469bcdd768bc104',
            key_2: '180831b7e2e6daba6ee89dbdf7846293',
            key_3_prefix: 'cmcc_gz_'
        },
        password_daily_err_count: 5 // 密码每日允许错误次数
    }
}

module.exports = config