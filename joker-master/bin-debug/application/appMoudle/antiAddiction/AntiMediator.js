var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/6/24.
 */
var antiSystem;
(function (antiSystem) {
    var AntiMediator = (function (_super) {
        __extends(AntiMediator, _super);
        function AntiMediator(viewComp) {
            if (viewComp === void 0) { viewComp = null; }
            var _this = _super.call(this, AntiMediator.NAME, viewComp) || this;
            _this.second = 0;
            return _this;
        }
        AntiMediator.prototype.listNotificationInterests = function () {
            return [
                AntiMediator.VERIFICATION_NAME,
                AntiMediator.TOP_TIP_1HOUR,
                AntiMediator.ALERT_3HOUR,
                AntiMediator.ALERT_3HOUR_IN,
                AntiMediator.ANTI_BEGIN
            ];
        };
        AntiMediator.prototype.handleNotification = function (notification) {
            _super.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                case AntiMediator.VERIFICATION_NAME:
                    if (antiSystem.needAnti()) {
                        this.verification_name();
                    }
                    break;
                case AntiMediator.TOP_TIP_1HOUR:
                    if (antiSystem.needAnti()) {
                        tip.popSysTopTip(gameabc.getMessage("GAME_1HOUR_TIP"));
                    }
                    break;
                case AntiMediator.ALERT_3HOUR:
                    var hour = antiSystem.getProxy().getHour();
                    if (antiSystem.needAnti() && hour >= 3) {
                        var msg = gameabc.getMessage("GAME_3HOUR_TIP");
                        tip.Alert.show(msg, "防沉迷提示", tip.ALERT);
                        playcards.getProxy().outbakfun();
                    }
                    break;
                case AntiMediator.ALERT_3HOUR_IN:
                    var hour = antiSystem.getProxy().getHour();
                    if (antiSystem.needAnti() && hour >= 3) {
                        var msg = gameabc.getMessage("GAME_3HOUR_TIP");
                        tip.Alert.show(msg, "防沉迷提示", tip.ALERT);
                    }
                    break;
                case AntiMediator.ANTI_BEGIN:
                    if (antiSystem.needAnti()) {
                        this.timeBegin();
                    }
                    break;
            }
        };
        AntiMediator.prototype.verification_name = function () {
            var msg = gameabc.getMessage("RNV_ALERT");
            tip.Alert.show(msg, "", tip.ALERT, function () {
                __OPEN_PRE_MOUDLE(AppReg.APP_RELAN_NAME);
            }, null, this, true);
        };
        /**
         * 防沉迷开始
         */
        AntiMediator.prototype.timeBegin = function () {
            __TIMER.removeEventListener(__TIMER.TIME_UPDATED, this.timeChange, this);
            __TIMER.addEventListener(__TIMER.TIME_UPDATED, this.timeChange, this);
        };
        /**
         * 防沉迷
         */
        AntiMediator.prototype.timeChange = function (event) {
            this.second += 1000;
            if (playcards.getProxy().isPlayNetCard) {
                if (this.second == 10000) {
                    antiSystem.getProxy().totalRunTime += this.second;
                    this.validateTime();
                    antiSystem.getProxy().saveTimer();
                    this.second = 0;
                }
            }
            else {
                if (this.second == 10000) {
                    var outHour = antiSystem.getProxy().totalOutTime / 1000 / 36000;
                    //满5小之后全部清0
                    if (outHour >= 5) {
                        antiSystem.getProxy().initAnti();
                    }
                    else {
                        var nowTime = new Date().getTime();
                        if (antiSystem.getProxy().lastTime > 0) {
                            var outTime = nowTime - antiSystem.getProxy().lastTime;
                            antiSystem.getProxy().totalOutTime += outTime;
                            antiSystem.getProxy().lastTime = nowTime;
                        }
                        else {
                            antiSystem.getProxy().lastTime = nowTime;
                            antiSystem.getProxy().totalOutTime += this.second;
                        }
                        antiSystem.getProxy().saveTimer();
                    }
                    this.second = 0;
                }
            }
        };
        AntiMediator.prototype.validateTime = function () {
            var hour = antiSystem.getProxy().getHour();
            if (hour >= 1 && !antiSystem.getProxy().hour1Flag) {
                // getProxy().hour1Flag = true;
                __SEND_NOTIFICATION(AntiMediator.TOP_TIP_1HOUR);
                antiSystem.getProxy().saveTimer();
            }
            else if (hour >= 2 && !antiSystem.getProxy().hour2Flag) {
                // getProxy().hour2Flag = true;
                __SEND_NOTIFICATION(AntiMediator.TOP_TIP_1HOUR);
                antiSystem.getProxy().saveTimer();
            }
        };
        AntiMediator.prototype.dispose = function () {
            __TIMER.removeEventListener(__TIMER.TIME_UPDATED, this.timeChange, this);
            _super.prototype.dispose.call(this);
        };
        return AntiMediator;
    }(app.mvc.AbstractMediator));
    AntiMediator.NAME = "__ANTI_MEDIATOR__";
    AntiMediator.VERIFICATION_NAME = "VERIFICATION_NAME"; //验证实名登记
    AntiMediator.TOP_TIP_1HOUR = "TOP_TIP_HOUR"; //1小游戏提示
    AntiMediator.ALERT_3HOUR = "ALERT_3HOUR"; //3小游戏提示结算时提示
    AntiMediator.ALERT_3HOUR_IN = "ALERT_3HOUR_IN"; //5小游戏提示 进入牌桌时提示
    AntiMediator.ANTI_BEGIN = "antiBegin"; //防沉迷计时开始
    antiSystem.AntiMediator = AntiMediator;
    __reflect(AntiMediator.prototype, "antiSystem.AntiMediator");
})(antiSystem || (antiSystem = {}));
//# sourceMappingURL=AntiMediator.js.map