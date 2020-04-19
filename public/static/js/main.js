function buildMenu(strData){
    var data;
    if(typeof(strData) == "string"){
        var data = JSON.parse(strData); //部分用户解析出来的是字符串，转换一下
    }else{
        data = strData;
    }
    var ulHtml = '<ul class="layui-nav layui-nav-tree" lay-filter="leftMenu">';
    for(var i=0;i<data.length;i++){
        if(data[i].spread){
            ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
        }else{
            ulHtml += '<li class="layui-nav-item">';
        }
        if(data[i].children != undefined && data[i].children.length > 0){
            ulHtml += '<a href="javascript:;">';
            if(data[i].icon != undefined && data[i].icon != ''){
                if(data[i].icon.indexOf("icon-") != -1){
                    ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
                }else{
                    ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
                }
            }
            ulHtml += '<cite>'+data[i].title+'</cite>';
            ulHtml += '<span class="layui-nav-more"></span>';
            ulHtml += '</a>';
            ulHtml += '<dl class="layui-nav-child">';
            for(var j=0;j<data[i].children.length;j++){
                if(data[i].children[j].target == "blank"){
                    ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[j].href+'" target="_blank" data-code="'+data[i].children[j].code+'" data-nav="'+data[i].children[j].nav+'" data-open-way="'+data[i].children[j].target+'">';
                }else{
                    ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[j].href+'" data-code="'+data[i].children[j].code+'" data-nav="'+data[i].children[j].nav+'" data-open-way="'+data[i].children[j].target+'">';
                }
                if(data[i].children[j].icon != undefined && data[i].children[j].icon != ''){
                    if(data[i].children[j].icon.indexOf("icon-") != -1){
                        ulHtml += '<i class="iconfont '+data[i].children[j].icon+'" data-icon="'+data[i].children[j].icon+'"></i>';
                    }else{
                        ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[j].icon+'">'+data[i].children[j].icon+'</i>';
                    }
                }
                ulHtml += '<cite>'+data[i].children[j].title+'</cite></a></dd>';
            }
            ulHtml += "</dl>";
        }else{
            if(data[i].target == "blank"){
                ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'" target="_blank" data-code="'+data[i].code+'" data-nav="'+data[i].nav+'" data-open-way="'+data[i].target+'">';
            }else{
                ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'" data-code="'+data[i].code+'" data-nav="'+data[i].nav+'" data-open-way="'+data[i].target+'">';
            }
            if(data[i].icon != undefined && data[i].icon != ''){
                if(data[i].icon.indexOf("icon-") != -1){
                    ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
                }else{
                    ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
                }
            }
            ulHtml += '<cite>'+data[i].title+'</cite></a>';
        }
        ulHtml += '</li>';
    }
    ulHtml += '</ul>';
    return ulHtml;
}

function toHome() {
    var url = $(this).attr('data-url');
    var open_way = $(this).attr('data-open-way');
    var page_nav = $(this).attr('data-nav');
    var page_code = $(this).attr('data-code');
    if(url) {
        window.sessionStorage.setItem("current_page_url", url);
        window.sessionStorage.setItem("current_page_nav", page_nav);
        window.sessionStorage.setItem("current_page_open_way", open_way);
        window.sessionStorage.setItem("current_page_code", page_code);
        if(open_way == 'single') { // 单页打开
            loadSinglePage(url);
        }
        else if(open_way == 'iframe') {
            loadIframePage(url);
        }

        setPageNav(page_nav);

        $(this).parent("li").siblings().removeClass("layui-nav-itemed");
    }
}

var $, tab, skyconsWeather;
layui.config({
    base: "static/layui/2.4.5"
}).use(['form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = layui.layer,
        element = layui.element;
    $ = layui.jquery;

    function loadMenu(cur_nav_id) {
        $.ajax({
            url: "menus.do?nav_id="+cur_nav_id,
            method: 'get',
            success: function (res) {
                var menu_html = buildMenu(res);
                $('.navBar').html(menu_html);
                element.render('nav', 'leftMenu');

                // 设置菜单选中
                var tcurrentPageCode = window.sessionStorage.getItem("current_page_code");
                if(tcurrentPageCode) {
                    var tcrrrentPage = $(".navBar").find("a[data-code='"+tcurrentPageCode+"']");
                    tcrrrentPage.parent().addClass('layui-this');
                    if(tcrrrentPage.parent().length > 0 && tcrrrentPage.parent()[0].tagName == "DD"){
                        tcrrrentPage.parent().parent().parent().addClass('layui-nav-itemed');
                    }
                }
            },
            error: function () {
                layer.msg("加载系统菜单失败", {icon: 5});
            }
        });
    }
    function loadIframePage(url) {
        $('#page_model_body').html('');
        $('.page-body').html("<iframe scrolling='no' frameborder='0'  style='width:100%;height:100%;' src='" + url + "'></frame>");
    }
    function loadSinglePage(url) {
        $.ajax({
            url: url,
            method: 'get',
            success: function (html, textStatus, request) {
                //console.log(request);
                //console.log(request.getAllResponseHeaders().toString());
                //console.log($(html).find('#gmdf_page_body'));
                //return false;
                var res = $(html).find('#gmdf_page_body');
                //element.render('nav', 'leftMenu');
                $('.page-body').html('');
                $('#page_model_body').html('');
                $('.page-body').html(res);
                var page_models = $('.page_model');
                $('.page_model').remove();
                $('#page_model_body').html(page_models);
                //alert('init');
                //element.init();
                element.render('', 'page-body');
            },
            error: function (e) {console.log(e);
                layer.msg("加载单页面失败", {icon: 5});
            }
        });
    }

    function setPageNav(nav) {
        $('.page-nav').html(nav);
    }

    // 获取第一个导航ID
    var tcurrent_nav_id = window.sessionStorage.getItem("current_nav_id");
    var default_nav_id = tcurrent_nav_id ? tcurrent_nav_id : $('.df_sys_nav')[0].id;
    loadMenu(default_nav_id);
    if($('.df_sys_nav').find('.layui-nav-child').children().length == 0) {
        $('.df_sys_nav').find('.layui-nav-child').remove();
        $('.df_sys_nav').find('a>span').remove();
    }
    // 设置导航选中
    var tcrrrentNav = $("li[id='"+default_nav_id+"']");
    !tcrrrentNav.hasClass('layui-this') ? tcrrrentNav.addClass('layui-this') : '';

    $(".loadMenu").click(function () {
        var cur_nav_target = $(this).attr('target');
        if(cur_nav_target != '_blank') {
            var cur_nav_id = $(this).attr('id');
            window.sessionStorage.setItem("current_nav_id", cur_nav_id);
            loadMenu(cur_nav_id);
        }
    });
    // 加载页面
    $("body").on("click", ".layui-nav .layui-nav-item a", function () {
        var url = $(this).attr('data-url');
        var open_way = $(this).attr('data-open-way');
        var page_nav = $(this).attr('data-nav');
        var page_code = $(this).attr('data-code');
        if(url) {
            if(open_way == 'blank') {
                window.open(url, '_blank');
            }
            else {
                window.sessionStorage.setItem("current_page_url", url);
                window.sessionStorage.setItem("current_page_nav", page_nav);
                window.sessionStorage.setItem("current_page_open_way", open_way);
                window.sessionStorage.setItem("current_page_code", page_code);
                if(open_way == 'single') { // 单页打开
                    //loadSinglePage(url);
                    location.reload();
                }
                else if(open_way == 'iframe') {
                    loadIframePage(url);
                }
                setPageNav(page_nav);
                $(this).parent("li").siblings().removeClass("layui-nav-itemed");
            }
        }
    });
    $(".pageHome").on("click", function () {
        /*var curNavObj = $(".loadMenu");
        if(!curNavObj.attr('data-url')) {
            curNavObj = $(this);
        }
        var url = curNavObj.attr('data-url');
        var open_way = curNavObj.attr('data-open-way');
        var page_nav = curNavObj.attr('data-nav');
        var page_code = curNavObj.attr('data-code');*/
        var url = $(this).attr('data-url');
        var open_way = $(this).attr('data-open-way');
        var page_nav = $(this).attr('data-nav');
        var page_code = $(this).attr('data-code');
        if(url) {
            window.sessionStorage.setItem("current_page_url", url);
            window.sessionStorage.setItem("current_page_nav", page_nav);
            window.sessionStorage.setItem("current_page_open_way", open_way);
            window.sessionStorage.setItem("current_page_code", page_code);
            if(open_way == 'single') { // 单页打开
                //loadSinglePage(url);
                location.reload();
            }
            else if(open_way == 'iframe') {
                loadIframePage(url);
            }

            setPageNav(page_nav);

            $(this).parent("li").siblings().removeClass("layui-nav-itemed");
        }
    });

    $(".pageRefresh").on("click", function () {
        if (window.sessionStorage.getItem("current_page_url") != null) {
            //alert(window.sessionStorage.getItem("current_page_url"));
            var open_way = window.sessionStorage.getItem("current_page_open_way");
            if(open_way == 'single') { // 单页打开
                loadSinglePage(window.sessionStorage.getItem("current_page_url"));
            }
            else if(open_way == 'iframe') {
                loadIframePage(window.sessionStorage.getItem("current_page_url"));
            }
            setPageNav(window.sessionStorage.getItem("current_page_nav"));
        }
    });

    //更换皮肤
    function skins() {
        var skin = window.sessionStorage.getItem("skin");
        if (skin) {  //如果更换过皮肤
            if (window.sessionStorage.getItem("skinValue") != "自定义") {
                $("body").addClass(window.sessionStorage.getItem("skin"));
            } else {
                $(".layui-layout-admin .layui-header").css("background-color", skin.split(',')[0]);
                $(".layui-bg-black").css("background-color", skin.split(',')[1]);
                $(".hideMenu").css("background-color", skin.split(',')[2]);
            }
        }
    }
    skins();
    $(".changeSkin").click(function () {
        layer.open({
            title: "更换皮肤",
            area: ["350px", "200px"],
            type: "1",
            content: '<div class="skins_box">' +
            '<form class="layui-form">' +
            '<div class="layui-form-item">' +
            '<input type="radio" name="skin" value="默认" title="默认" lay-filter="default" checked="">' +
            '<input type="radio" name="skin" value="橙色" title="橙色" lay-filter="orange">' +
            '<input type="radio" name="skin" value="黑色" title="黑色" lay-filter="black">' +
            '</div>' +
            '<div class="layui-form-item skinBtn">' +
            '<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-normal" lay-submit="" lay-filter="changeSkin">确定</a>' +
            '<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-primary" lay-submit="" lay-filter="noChangeSkin">取消</a>' +
            '</div>' +
            '</form>' +
            '</div>',
            success: function (index, layero) {
                var skin = window.sessionStorage.getItem("skin");
                if (window.sessionStorage.getItem("skinValue")) {
                    $(".skins_box input[value=" + window.sessionStorage.getItem("skinValue") + "]").attr("checked", "checked");
                };
                if ($(".skins_box input[value=自定义]").attr("checked")) {
                    $(".skinCustom").css("visibility", "inherit");
                    $(".topColor").val(skin.split(',')[0]);
                    $(".leftColor").val(skin.split(',')[1]);
                    $(".menuColor").val(skin.split(',')[2]);
                };
                form.render();
                $(".skins_box").removeClass("layui-hide");
                $(".skins_box .layui-form-radio").on("click", function () {
                    var skinColor;
                    if ($(this).find("span").text() == "橙色") {
                        skinColor = "orange";
                    } else if ($(this).find("span").text() == "黑色") {
                        skinColor = "";
                    } else if ($(this).find("span").text() == "默认") {
                        skinColor = "blue";
                    }
                    if ($(this).find("span").text() != "自定义") {
                        $(".topColor,.leftColor,.menuColor").val('');
                        $("body").removeAttr("class").addClass("main_body " + skinColor + "");
                        $(".skinCustom").removeAttr("style");
                        $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                    } else {
                        $(".skinCustom").css("visibility", "inherit");
                    }
                })
                var skinStr, skinColor;
                $(".topColor").blur(function () {
                    $(".layui-layout-admin .layui-header").css("background-color", $(this).val());
                })
                $(".leftColor").blur(function () {
                    $(".layui-bg-black").css("background-color", $(this).val());
                })
                $(".menuColor").blur(function () {
                    $(".hideMenu").css("background-color", $(this).val());
                })

                form.on("submit(changeSkin)", function (data) {
                    if (data.field.skin != "自定义") {
                        if (data.field.skin == "橙色") {
                            skinColor = "orange";
                        } else if (data.field.skin == "黑色") {
                            skinColor = "";
                        } else if (data.field.skin == "默认") {
                            skinColor = "blue";
                        }
                        window.sessionStorage.setItem("skin", skinColor);
                    } else {
                        skinStr = $(".topColor").val() + ',' + $(".leftColor").val() + ',' + $(".menuColor").val();
                        window.sessionStorage.setItem("skin", skinStr);
                        $("body").removeAttr("class").addClass("main_body");
                    }
                    window.sessionStorage.setItem("skinValue", data.field.skin);
                    layer.closeAll("page");
                });
                form.on("submit(noChangeSkin)", function () {
                    $("body").removeAttr("class").addClass("main_body " + window.sessionStorage.getItem("skin") + "");
                    $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                    skins();
                    layer.closeAll("page");
                });
            },
            cancel: function () {
                $("body").removeAttr("class").addClass("main_body " + window.sessionStorage.getItem("skin") + "");
                $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                skins();
            }
        })
    })

    //退出
    $(".signOut").click(function () {
        window.sessionStorage.removeItem("menu");
        menu = [];
        window.sessionStorage.removeItem("curmenu");
    })

    //隐藏左侧导航
    $(".hideMenu").click(function () {
        $(".layui-layout-admin").toggleClass("showMenu");
        //渲染顶部窗口
        //tab.tabMove();
    })
    $(".hideMenu2").click(function () {
        $(".layui-layout-admin").toggleClass("showMenu");
        //渲染顶部窗口
        //tab.tabMove();
    })
    // 设置页面刷新
    if (window.sessionStorage.getItem("current_page_url") != null) {
        //alert(window.sessionStorage.getItem("current_page_url"));
        var open_way = window.sessionStorage.getItem("current_page_open_way");
        if(open_way == 'single') { // 单页打开
            loadSinglePage(window.sessionStorage.getItem("current_page_url"));
        }
        else if(open_way == 'iframe') {
            loadIframePage(window.sessionStorage.getItem("current_page_url"));
        }
        setPageNav(window.sessionStorage.getItem("current_page_nav"));
    }
    else { // 加载主页面
        $(".pageHome").click();
    }
})



