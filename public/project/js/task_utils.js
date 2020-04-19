var log_message_list = new Array();
var checkTaskStatusTimer = null;
var checkTaskStatus_timer = null;
function updateTaskStatus(taskid) {

    if (taskid) {
        var flush_status = true;
        clearInterval(checkTaskStatusTimer);
        clearInterval(checkTaskStatus_timer);

        checkTaskStatusTimer = setInterval(function () {

            if (flush_status == true) {
                flush_status = false;
                $("#log").text(log_message_list.join("") + "aiops> |\r\n");
            }
            else {
                flush_status = true;
                $("#log").text(log_message_list.join("") + "aiops> \r\n");

            }

        }, 500);

        var checkStatus_count = 0;
        checkTaskStatus_timer = setInterval(function () {

            console.log('检查状态...' + checkStatus_count);
            checkStatus_count++;

            checkTaskStatus(function (checkTaskStatus_retcode, output_message) {
                if (checkTaskStatus_retcode == 1) {
                    console.log('继续检查状态' + checkTaskStatus_retcode);
                }
                else {
                    console.log('停止检查任务状态' + checkTaskStatus_retcode);
                    clearInterval(checkTaskStatusTimer);
                    clearInterval(checkTaskStatus_timer);
                   // $("#log").text(log_message_list.join("") + output_message + "\r\n");
                    $("#log").text(log_message_list.join(""));
                };

            }, taskid, checkStatus_count);

        }, 3000);
    } else {
        $("#log").text("");
        $("#status").val("");
    }
};

function checkTaskStatus(cb, taskid, count) {
    $.ajax({
        url: basurl + '/task/getTaskStatus.do',//查询任务状态
        type: 'post',
        data: { 'taskid': taskid, "times": count },
        success: function (data) {
            $("#task_status").text(data.msg);
            $("#status").val(data.status);
            task_status = data.status;
            cb(data.status, data.output)
        }
    });
};

function pullTaskLog(taskid) {
    var socket_server = location.protocol + "//" + location.hostname + ":" + location.port;
    var socket = io.connect(socket_server);
    log_message_list.splice(0, log_message_list.length);
    socket.on('log', function (data) {
        log_message_list.push(data);
        $("#log").text(log_message_list.join(""));
        $("#log").scrollTop = $("#log").scrollHeight;
        //el.innerHTML = log_message_list.join("");
        //el.scrollTop = el.scrollHeight;
    });
    socket.on('message', function (data) {
        if (log_message_list.length > 100) {
            log_message_list.splice(0, 1);
        }
        log_message_list.push(data);
        if (task_status == 1) {
            $("#log").text(log_message_list.join("") + "aiops> |\r\n");
        }
        else {
            $("#log").text(log_message_list.join("") + "\r\n");
        }
        //$("#log").scrollTop = $("#log").scrollHeight;
        var log_console = document.getElementById('log');
        log_console.scrollTop = log_console.scrollHeight;
    });
    var opt = {
        debug: '0',
        topic: 'proxy/+/ansbile/' + taskid
    };
    socket.emit("hello", opt);

};



