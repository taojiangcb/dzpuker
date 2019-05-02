var cy;
(function (cy) {
    cy.logMaskConfig = 0
        | 1 /* SEND */ //所有发送的消息号打印
        | 2 /* RECV */ //所有接收的消息号打印
        | 4 /* GS_SEND */ //游戏内发送的消息号打印
        | 8 /* GS_RECV */ //游戏内接收的消息号打印
        | 16 /* ROOM */ //进出房间关键点打印
        | 32 /* UNDEFINE */ //没有完成的开发打印提示
        | 64 /* ERROR */; //错误提示
    function log(str, id) {
        if (id === void 0) { id = 0; }
        // if(DEBUG) {
        var date = new Date();
        var logStr = DateUtils.dateFormat(date, "hh:mm:ss") + " " + str;
        console.log(logStr);
        // if (id & cy.logMaskConfig) console.log(logStr);
        app.debug.log(logStr);
        // } 
        // else {
        //     if (id & logMaskConfig) console.log(str);
        //     app.debug.log(str);
        // }
    }
    cy.log = log;
    cy.unwatch = ["72-6", "72-7", "2", "72-9", "73-12", "1-11079", "1-11200", "1-11201"];
    cy.continuousId = "";
    cy.continuousCount = 1;
    function recvLog(id, pocs) {
        if (pocs === void 0) { pocs = 0; }
        var xyId = (pocs > 0 ? pocs + app.NetAction.PROCESS_CUT : "") + id;
        var notificationId = pocs == 11 || pocs == 12 || pocs == 72 || pocs == 73 ? xyId : String(id);
        if (cy.continuousId == xyId) {
            ++cy.continuousCount;
        }
        else {
            var cuntInfo = cy.continuousCount > 1 ? (cy.continuousId + " x" + cy.continuousCount) : "";
            if (cy.unwatch.indexOf(cy.continuousId) == -1) {
                if (cuntInfo != "")
                    cy.log('recv:' + cuntInfo, 2 /* RECV */);
                if (__HAS_NOTIFICATION(notificationId)) {
                    cy.log('recv:' + xyId, 2 /* RECV */);
                }
                else {
                    cy.log('recv:' + xyId + " (忽略)", 32 /* UNDEFINE */);
                }
            }
            cy.continuousId = xyId;
            cy.continuousCount = 1;
        }
    }
    cy.recvLog = recvLog;
    function sendLog(id, pocs) {
        if (pocs === void 0) { pocs = 0; }
        var logStr = (pocs > 0 ? (pocs + "-") : "") + id;
        if (cy.unwatch.indexOf(logStr) == -1) {
            cy.log('send:' + logStr, 1 /* SEND */);
        }
    }
    cy.sendLog = sendLog;
    function logHeartChange() {
        var hearts = cy.srsServer.heartList;
        var len = hearts.length;
        var str = "heart change:";
        for (var i = 0; i < len; ++i) {
            var heartVO = hearts[i];
            str += " " + heartVO.xyId + "(" + heartVO.appId + ")";
        }
        console.log(str);
    }
    cy.logHeartChange = logHeartChange;
})(cy || (cy = {}));
//# sourceMappingURL=SrsLogger.js.map