function signleSelect($, id) {
    $('#'+id).next().find('.layui-table tr').click(function () {
        //操作   例如行变色
        //$(this).css('background', 'yellow');
        var checkCellT = $(this).parent().find("td div.laytable-cell-checkbox div.layui-form-checked I");
        for(var i = 0; i < checkCellT.length; i++) {
            checkCellT[i].click();
        }
        var checkCell = $(this).find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
        if (checkCell.length > 0) {
            checkCell[0].click();
        }
    });
}

function openLayer(layer, option, submit_btn_tag) {

    var defaultOption = {
        type: 1,                //弹窗类型
        //shade: [0.8, '#393D49'],
        //offset: '200px',
        closeBtn: 1,         //是否显示关闭按钮
        shadeClose: false, //是否点击遮罩关闭
        resize: false,
        btn:['确定','取消'],
        yes: function(index, layero) {
            // 触发表单提交按钮
            layero.find(submit_btn_tag).click();
        },
        cancel: function (index, layero) {
            $('.page_model').hide();
            layer.close(index);
        },
        success: function(layero, index) {

        }
    };
    if(option) {
        for(var key in option){
            defaultOption[key] = option[key];
        }
    }

    return layer.open(defaultOption);
}

function openSelectTree() {
    $(".layui-form-select").not($('.downpanel .layui-select-title').parents(".layui-form-select")).removeClass("layui-form-selected");
    $('.downpanel .layui-select-title').parents(".downpanel").toggleClass("layui-form-selected");
}

function logout(url) {
    layer.confirm('确定注销本次登陆？', {icon: 3, title:'提示'}, function(index){
        window.sessionStorage.clear();
        window.location = url;
    });
}