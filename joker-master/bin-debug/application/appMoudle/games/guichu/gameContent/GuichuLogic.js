var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var guichu;
(function (guichu) {
    var loginc;
    function gameLogic() {
        if (loginc == null) {
            loginc = new GuiChuLogic();
        }
        return loginc;
    }
    guichu.gameLogic = gameLogic;
    function destoryGamelogic() {
        if (loginc)
            loginc.dispose();
        loginc = null;
    }
    guichu.destoryGamelogic = destoryGamelogic;
    var GuiChuLogic = (function () {
        function GuiChuLogic() {
        }
        /**
         * 游戏开始
         */
        GuiChuLogic.prototype.gameStart = function () {
            var obj = utils.NativeUtils.getURLObj();
            if (obj["userid"] != null) {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.GUICHU_AUTO_LOGIN);
            }
            else {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN);
            }
        };
        /**
         * 同步服务器时间并服返回延迟时间
         */
        GuiChuLogic.prototype.syncServerTime = function (time) {
            var msec = time * 1000;
            var localTimer = app.SystemTimer.getServerTime();
            var offsetTime = localTimer - msec;
            if (offsetTime <= 0) {
                app.SystemTimer.systemTime = msec;
                return 0;
            }
            else if (offsetTime > 0) {
                app.SystemTimer.serverTimeOffset = -offsetTime;
                return offsetTime;
            }
        };
        /**
         * 获取倒计时，排除网络延迟
         */
        GuiChuLogic.prototype.fiexDownTime = function (nowTime, overTime) {
            this.syncServerTime(nowTime);
            var downTime = overTime * 1000 - app.SystemTimer.getServerTime();
            return Math.max(0, downTime);
        };
        /**
         * 进入房间之后向服务器端发送心跳请求
         */
        GuiChuLogic.prototype.beginHeart = function () {
            if (this.heartInterval > 0) {
                egret.clearInterval(this.heartInterval);
            }
            this.heartInterval = egret.setInterval(function () {
                __PVO().to(app.NetAction.GUICHU_REQ_HEART_BEAT);
            }, this, 10000);
        };
        GuiChuLogic.prototype.openBanks = function () {
            __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
        };
        /**
         * 游戏币不足，退出当前游戏进入钱庄
         */
        GuiChuLogic.prototype.openBankRemaining = function () {
            var _this = this;
            tip.Alert.show("你要退出当前游戏前往前庄吗?", "钱庄", tip.CONFIRM, function (type) {
                if (type == tip.YES) {
                    _this.leaveOpenBank();
                }
            }, null, this);
        };
        /**
         * 离开房间之后打开钱庄
         */
        GuiChuLogic.prototype.leaveOpenBank = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_BANK);
        };
        /**
         * 停止心跳请求
         */
        GuiChuLogic.prototype.stopHeart = function () {
            if (this.heartInterval > 0) {
                egret.clearInterval(this.heartInterval);
            }
        };
        GuiChuLogic.prototype.dispose = function () {
            this.stopHeart();
        };
        return GuiChuLogic;
    }());
    guichu.GuiChuLogic = GuiChuLogic;
    __reflect(GuiChuLogic.prototype, "guichu.GuiChuLogic", ["games.IGameLogic", "gameabc.IDisposer"]);
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuLogic.js.map