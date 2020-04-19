var cpro_id = "u1331261";

function btnFan() {
    //获取参数中表达式的值
    var txt = $("#cron").val();
    if (txt) {
        var regs = txt.split(' ');
        $("input[name=v_second]").val(regs[0]);
        $("input[name=v_min]").val(regs[1]);
        $("input[name=v_hour]").val(regs[2]);
        $("input[name=v_day]").val(regs[3]);
        $("input[name=v_mouth]").val(regs[4]);
        $("input[name=v_week]").val(regs[5]);

        initObj(regs[0], "second");
        initObj(regs[1], "min");
        initObj(regs[2], "hour");
        initDay(regs[3]);
        initMonth(regs[4]);
        initWeek(regs[5]);

        if (regs.length > 6) {
            $("input[name=v_year]").val(regs[6]);
            initYear(regs[6]);
        }
    }
}


function initObj(strVal, strid) {
    var ary = null;
    var objRadio = $("input[name='" + strid + "'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(1).attr("checked", "checked");
        $("#" + strid + "Start_0").numberspinner('setValue', ary[0]);
        $("#" + strid + "End_0").numberspinner('setValue', ary[1]);
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(2).attr("checked", "checked");
        $("#" + strid + "Start_1").numberspinner('setValue', ary[0]);
        $("#" + strid + "End_1").numberspinner('setValue', ary[1]);
    } else {
        objRadio.eq(3).attr("checked", "checked");
        if (strVal != "?") {
            ary = strVal.split(",");
            for (var i = 0; i < ary.length; i++) {
                $("." + strid + "List input[value='" + ary[i] + "']").attr("checked", "checked");
            }
        }
    }
}

function initDay(strVal) {
    var ary = null;
    var objRadio = $("input[name='day'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } 
    /* else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
    }  */
    else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#dayStart_0").numberspinner('setValue', ary[0]);
        $("#dayEnd_0").numberspinner('setValue', ary[1]);
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(3).attr("checked", "checked");
        $("#dayStart_1").numberspinner('setValue', ary[0]);
        $("#dayEnd_1").numberspinner('setValue', ary[1]);
    } else if (strVal.split('W').length > 1) {
        ary = strVal.split('W');
        objRadio.eq(4).attr("checked", "checked");
        $("#dayStart_2").numberspinner('setValue', ary[0]);
    } else if (strVal == "L") {
        objRadio.eq(5).attr("checked", "checked");
    } else {
        objRadio.eq(6).attr("checked", "checked");
        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".dayList input[value='" + ary[i] + "']").attr("checked", "checked");
        }
    }
}

function initMonth(strVal) {
    var ary = null;
    var objRadio = $("input[name='mouth'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } 
    /* else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
    }  */
    else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#mouthStart_0").numberspinner('setValue', ary[0]);
        $("#mouthEnd_0").numberspinner('setValue', ary[1]);
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(3).attr("checked", "checked");
        $("#mouthStart_1").numberspinner('setValue', ary[0]);
        $("#mouthEnd_1").numberspinner('setValue', ary[1]);

    } else {
        objRadio.eq(4).attr("checked", "checked");

        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".mouthList input[value='" + ary[i] + "']").attr("checked", "checked");
        }
    }
}

function initWeek(strVal) {
    var ary = null;
    var objRadio = $("input[name='week'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } 
    /* else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
    }  */
    else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(2).attr("checked", "checked");
        $("#weekStart_0").numberspinner('setValue', ary[0]);
        $("#weekEnd_0").numberspinner('setValue', ary[1]);
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(3).attr("checked", "checked");
        $("#weekStart_1").numberspinner('setValue', ary[0]);
        $("#weekEnd_1").numberspinner('setValue', ary[1]);
    } else if (strVal.split('L').length > 1) {
        ary = strVal.split('L');
        objRadio.eq(4).attr("checked", "checked");
        $("#weekStart_2").numberspinner('setValue', ary[0]);
    } else {
        objRadio.eq(5).attr("checked", "checked");
        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".weekList input[value='" + ary[i] + "']").attr("checked", "checked");
        }
    }
}

function initYear(strVal) {
    var ary = null;
    var objRadio = $("input[name='year'");
    if (strVal == "*") {
        objRadio.eq(1).attr("checked", "checked");
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#yearStart_0").numberspinner('setValue', ary[0]);
        $("#yearEnd_0").numberspinner('setValue', ary[1]);
    }
}