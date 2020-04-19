/**
 * layui工具类
 * @author quanzm
 */

// 初始化表格
function initTable(param) {
    layui.use(['table'], function () {
        var table = layui.table;
        table.render({
            elem: '#' + param.id,
            height: param.height == null ? 'full-200' : param.height,
            width: param.width == null ? "" : param.width,
            url: param.url,
            data: param.data == null ? [] : param.data,
            where: param.where == null ? "" : param.where,
            page: param.page == null ? true : param.page,
            limit: param.limit == null ? 10 : param.limit,
            cols: [param.cols],
            done: param.done == null?function (res, curr, count) {
                againSelect($, param.id);
            }:param.done
        });
    });
}

// 刷新表格
function refreshTable(param) {
    layui.use(['table'], function () {
        var table = layui.table;
        table.reload(param.id, {
            where: param.where,
            data: param.data,
            page: param.page == null ? {
                curr: 1
            } : "" //默认从第一页开始
        });
    });
}

// 打开添加/修改 弹出框
function openAddOrUpdate(param) {
    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: param.title,
            content: param.content == null ? $('#addOrUpdate') : param.content
                //,skin: 'layui-layer-molv'
                ,
            maxmin: true,
            area: param.area,
            btn: param.btn,
            yes: function (index, layero) {
                layero.find('.save').click();
            },
            btn2: param.btn2,
            btn3: param.btn3,
            cancel: function (index, layero) {
                /*layer.confirm('确定要关闭么？', {
                    btn: ['确定', '取消']
                }, function (index, layero) {*/
                layer.closeAll();
                var reset = param.reset == null ? $('.reset') : param.reset;
                reset.click();
                /*}, function (index) {
                });*/
                return false;
            }
        })

    });
}

// 初始化树
function initTree(param) {
    $('#' + param.dom).html("");
    var nodes = buildTree(param.data, param.id, param.pid, param.name);
    for (var i = 0; i < nodes.length; i++) {
        //主目录是否默认打开
        nodes[i].spread = true;
        if (nodes[i].children && nodes[i].children.length > 0) {
            for (var j = 0; j < nodes[i].children.length; j++) {
                //子目录是否默认打开
                nodes[i].children[j].spread = true;
            }
        }
    }
    layui.use(['tree'], function () {
        var tree = layui.tree;
        tree({
            elem: '#' + param.dom //传入元素选择器
                ,
            nodes: nodes,
            click: param.click
            /*,click: function (node) {
                if (node.children && node.children.length > 0) {//叶子节点判断
                    var idArr = [];
                    for (var i = 0; i < node.children.length; i++) {
                        if (node.children[i].children && node.children[i].children.length > 0) {
                            var children = node.children[i].children;
                            for (var j = 0; j < children.length; j++) {
                                idArr.push(children[j].id);
                            }
                        } else {
                            idArr.push(node.children[i].id);
                        }
                    }
                    console.log("idArr",idArr);
                } else {
                    console.log("[node.id]",[node.id]);
                }
            }*/
        });
    });
}


function buildTree(nodes, id, pid, name) {
    var tree = new Array();
    if (null != nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var nodeItem = nodes[i];
            var json = nodeItem;
            if (!nodeItem[pid]) {
                var child = buildChildTree(nodeItem[id], nodes, id, pid, name);
                // 递归增加子节点
                if (child.length > 0) {
                    json.children = child;
                }
                json.id = nodeItem[id];
                json.name = nodeItem[name];
                tree.push(json);
            }
        }
    }
    return tree;
}

function buildChildTree(key, nodes, id, pid, name) {
    var child = new Array();

    for (var i = 0; i < nodes.length; i++) {
        var nodeItem = nodes[i];
        var json = nodeItem;
        if (key == nodeItem[pid]) {
            var cchild = buildChildTree(nodeItem[id], nodes, id, pid, name);
            if (cchild.length > 0) {
                json.children = cchild;
            }
            json.id = nodeItem[id];
            json.name = nodeItem[name];
            child.push(json);
        }
    }
    return child;
}

// 添加一行
function addRowButton(param) {
    layui.use(['table'], function () {
        var table = layui.table;
        var tableData = table.cache[param.table];
        if (tableData && tableData.length > 0) {
            for (var i = 0; i < tableData.length; i++) {
                if (!tableData[i][param.id]) {
                    layer.msg("已添加！", {
                        icon: 5
                    });
                    return false;
                }
            }
        }
        tableData.unshift(param.data);
        refreshTable({
            id: param.table,
            data: tableData,
            page: false
        });
    });
};

// 批量删除
function batchDelButton(param) {
    layui.use(['table'], function () {
        var table = layui.table;
        var tableData = table.cache[param.table];
        var selectedData = table.checkStatus([param.table]);
        if (!tableData || tableData.length < 1) {
            layer.msg("表格为空！", {
                icon: 5
            });
            return false;
        }
        if (!selectedData.data || selectedData.data.length < 1) {
            layer.msg("请至少选择一条数据！", {
                icon: 5
            });
            return false;
        }
        for (var i = 0; i < selectedData.data.length; i++) {
            for (var j = 0; j < tableData.length; j++) {
                if (selectedData.data[i][param.id] == tableData[j][param.id]) {
                    tableData.splice(j, 1);
                }
            }
        }

        refreshTable({
            id: param.table,
            data: tableData,
            page: false
        });
    });
};