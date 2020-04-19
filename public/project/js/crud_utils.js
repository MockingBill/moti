/**
 * 增删查改工具类
 * @author quanzm
 */
/**
 * 添加/修改 保存
 * @param param
 */
function saveOrUpdate(param) {
    $.ajax({
        url: param.url,
        type: "POST",
        data: param.data,
        async: param.async == null ? true : param.async,
        success: function (data) {
            if (data.success) {
                param.success
                refreshTable({
                    id: param.tableId,
                    where: param.where == null ? "" : param.where,
                    page: param.page == null ? null : false
                });
                var reset = param.reset == null ? $('.reset') : param.reset;
                reset.click();
                if (param.isClose) {
                    layer.closeAll('page');
                }
                layer.msg(data.msg, {
                    icon: 1
                });
            } else {
                layer.msg(data.msg, {
                    icon: 5
                });
            }
        },
        error: function (data) {
            layer.msg('保存失败', {
                icon: 5
            });
        }
    });
}

/**
 * 删除
 * @param param
 */
function del(param) {
    layer.msg('确定删除？', {
        time: 0,
        btn: ['确定', '取消'],
        yes: function (index) {
            $.ajax({
                url: param.url,
                data: param.data,
                type: 'POST',
                async: param.async == null ? true : param.async,
                success: function (data) {
                    if (data.success) {
                        param.success
                        refreshTable({
                            id: param.tableId,
                            where: param.where == null ? "" : param.where
                        });
                        var reset = param.reset == null ? $('.reset') : param.reset;
                        reset.click();
                        layer.msg(data.msg, {
                            icon: 1
                        });
                        layer.close(index);
                    } else {
                        layer.msg(data.msg, {
                            icon: 5
                        });
                    }
                }
            });
        }
    });
}