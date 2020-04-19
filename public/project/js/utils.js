// 多选 行选中
function againSelect($, id) {
    $('#' + id).next().find('.layui-table tr').click(function () {
        var checkCell = $(this).find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
        for (var i = 0; i < checkCell.length; i++) {
            checkCell[i].click();
        }
    });
}

/**
 * js时间格式化类库
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function openSelectTree() {
    $(".layui-form-select").not($('.downpanel .layui-select-title').parents(".layui-form-select")).removeClass("layui-form-selected");
    $('.downpanel .layui-select-title').parents(".downpanel").toggleClass("layui-form-selected");
}

function togglerSelectTree(obj){
    event.stopPropagation(); 
    var parent = $(obj).parent();
    if(parent.hasClass('layui-form-selected')){
        parent.removeClass('layui-form-selected');
    }else{
        parent.addClass('layui-form-selected');
    }
    return false;
}