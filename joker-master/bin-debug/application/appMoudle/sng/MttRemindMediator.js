var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttRemindMediator = (function (_super) {
        __extends(MttRemindMediator, _super);
        function MttRemindMediator(view) {
            var _this = _super.call(this, MttRemindMediator.NAME, null) || this;
            _this.intervalId = -1;
            _this.sec = -1;
            return _this;
        }
        MttRemindMediator.prototype.listNotificationInterests = function () {
            var mConst = app.constant.AppMediatorConst;
            var nConst = app.NetAction;
            return [
                mConst.UPDATE_MTT_TIME_STEP,
                mConst.UPDATE_MTT_TIMESUP,
                nConst.MATCH_S_START
            ];
        };
        MttRemindMediator.prototype.handleNotification = function (notification) {
            var mConst = app.constant.AppMediatorConst;
            var nConst = app.NetAction;
            var name = notification.getName();
            var mttList = match.getProxy().getMyMttList();
            var len = mttList.length;
            var evtData = notification.getBody();
            var evtMatchVO = evtData.data; //报名的比赛
            var currMatchVO = match.getProxy().currentMatchVO; //参与的比赛
            switch (name) {
                case mConst.UPDATE_MTT_TIME_STEP:
                    var sec = Math.floor((evtMatchVO.startTime - match.getSvrTime()) / 1000);
                    // console.log("matchId="+evtMatchVO.matchId+" sec="+sec);
                    //当前已进入比赛，并且与提醒的是同一场
                    if (currMatchVO != null && currMatchVO == evtMatchVO && room.getProxy().currentType == 5 /* MTT */ && playcards.getProxy().isPlayCard) {
                        if (sec < 0) {
                            //比赛已经开始，界面要删除
                            match.getProxy().cancelMttRemind(evtMatchVO);
                            this.clearTimesup(evtMatchVO);
                            return;
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS, null); //删除中间的字
                        var minNum = Math.floor(sec / 60);
                        var minStr = (minNum < 10 ? "0" : "") + minNum;
                        var secNum = sec % 60;
                        var secStr = (secNum < 10 ? "0" : "") + secNum;
                        tip.popSysCenterTimeTooltip("img_word_win_dengdaikaijuzhong_2_png", minStr, secStr);
                        tip.clearSysTopTimeTooltip();
                        currMatchVO.wasRemind = true;
                    }
                    else {
                        if (sec > 0 && sec < 60 && !evtMatchVO.wasRemind) {
                            var str = gameabc.getMessage("MTT_REMIND1", evtMatchVO.name, "{sec}");
                            var val = str.replace("{sec}", String(sec));
                            tip.popSysTopTimeTooltip(val, this.enterMatch, this, evtMatchVO);
                            if (this.intervalId != -1)
                                egret.clearInterval(this.intervalId);
                            this.sec = sec;
                            egret.setInterval(this.topTipTimerStep, this, 1000, str);
                            evtMatchVO.wasRemind = true;
                        }
                    }
                    return;
                case nConst.MATCH_S_START:
                    tip.clearSysCenterTimeTooltip();
                    return;
                case mConst.UPDATE_MTT_TIMESUP:
                    this.clearTimesup(evtMatchVO);
                    return;
            }
        };
        MttRemindMediator.prototype.clearTimesup = function (evtMatchVO) {
            tip.clearSysCenterTimeTooltip();
            if (this.intervalId != -1)
                egret.clearInterval(this.intervalId);
            tip.changeTopTimeTipStr(gameabc.getMessage("MTT_REMIND2", evtMatchVO.name));
        };
        MttRemindMediator.prototype.enterMatch = function (matchVO) {
            mc2sdk.event(50092 /* MTT_JOIN2 */);
            match.getProxy().reConnectMatch(matchVO);
        };
        MttRemindMediator.prototype.setInterval = function (val, sec) {
            if (this.intervalId != -1)
                return;
            this.sec = sec;
            egret.setInterval(this.topTipTimerStep, 1000, val);
        };
        MttRemindMediator.prototype.topTipTimerStep = function (val) {
            if (--this.sec < 0) {
                if (this.intervalId != -1)
                    egret.clearInterval(this.intervalId);
            }
            else {
                tip.SysTemTopTimeTooltip.changeTip(val.replace("{sec}", String(this.sec)));
            }
        };
        return MttRemindMediator;
    }(app.mvc.AbstractMediator));
    MttRemindMediator.NAME = "MttRemindMediator";
    match.MttRemindMediator = MttRemindMediator;
    __reflect(MttRemindMediator.prototype, "match.MttRemindMediator");
})(match || (match = {}));
//# sourceMappingURL=MttRemindMediator.js.map