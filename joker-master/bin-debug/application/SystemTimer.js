var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var SystemTimer = (function (_super) {
        __extends(SystemTimer, _super);
        function SystemTimer() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SystemTimer, "systemTime", {
            get: function () {
                return app.SystemTimer.sysTime;
            },
            set: function (value) {
                app.SystemTimer.sysTime = value;
                app.SystemTimer.serverTimeOffset = app.SystemTimer.sysTime - new Date().getTime();
                if (!app.SystemTimer.timer) {
                    app.SystemTimer.timer = new egret.Timer(SystemTimer.step, 0);
                    app.SystemTimer.timer.addEventListener(egret.TimerEvent.TIMER, app.SystemTimer.onTimer_handler, null);
                    app.SystemTimer.timer.start();
                    app.SystemTimer.curSec = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemTimer, "systemOnLineTime", {
            set: function (value) {
                app.SystemTimer.onLineTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemTimer.prototype, "systemOnLineTime", {
            get: function () {
                return app.SystemTimer.onLineTime;
            },
            enumerable: true,
            configurable: true
        });
        SystemTimer.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            app.SystemTimer.dispacher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        SystemTimer.hasEventListener = function (type) {
            return app.SystemTimer.dispacher.hasEventListener(type);
        };
        SystemTimer.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            app.SystemTimer.dispacher.removeEventListener(type, listener, thisObject, useCapture);
        };
        /** 设置一个通知时间，并且按指定间隔更新状态
         * upNotif: 到时的事件
         * timesup: 倒计时时间
         * stepNotif: 步频的事件
         * step: 步频的毫秒间隔
         */
        SystemTimer.setTimesup = function (overNotif, timesup, stepNotif, step) {
            if (step === void 0) { step = 1000; }
            var timerParam = this.addListener(null, null, step);
            timerParam.stepNoif = stepNotif;
            timerParam.overNoif = overNotif;
            timerParam.overTime = timesup;
            return timerParam;
        };
        /** 添加一个函数，按指定间隔调用 */
        SystemTimer.addListener = function (func, thisObj, step) {
            if (step === void 0) { step = 1000; }
            var timerParam = new app.TimerStepParam();
            this.listenerDict.push(timerParam);
            timerParam.stepFunc = func;
            timerParam.thisObj = thisObj;
            timerParam.step = step;
            timerParam.startTime = new Date().getTime();
            timerParam.currTime = timerParam.startTime;
            return timerParam;
        };
        SystemTimer.removeListener = function (param) {
            var index = this.listenerDict.indexOf(param);
            if (index != -1)
                SystemTimer.removeListenerByIndex(index);
        };
        SystemTimer.removeAllListeners = function () {
            var index = this.listenerDict.length;
            while (--index > -1) {
                SystemTimer.removeListenerByIndex(index);
            }
        };
        SystemTimer.removeListenerByIndex = function (index) {
            var delObj = this.listenerDict.splice(index, 1)[0];
            delObj.data = null;
            delObj.thisObj = null;
            delObj.stepFunc = null;
            delObj.overFunc = null;
        };
        SystemTimer.getServerDate = function () {
            return new Date(app.SystemTimer.sysTime);
        };
        SystemTimer.getServerDay = function () {
            return app.SystemTimer.getServerDate().getDay();
        };
        SystemTimer.getServerYear = function () {
            return app.SystemTimer.getServerDate().getFullYear();
        };
        SystemTimer.getFixedServerTime = function () {
            return app.SystemTimer.getServerTime() + app.SystemTimer.serverTimeOffset;
        };
        SystemTimer.getServerTime = function () {
            return app.SystemTimer.sysTime;
        };
        SystemTimer.getOnLineTime = function () {
            return app.SystemTimer.onLineTime;
        };
        SystemTimer.getCurrentSystemTime = function () {
            return new Date().getTime();
        };
        SystemTimer.getCanUpdateData = function () {
            if (app.SystemTimer.updateTime >= 300000) {
                return true;
            }
            return false;
        };
        SystemTimer.resetUpdateTime = function () {
            app.SystemTimer.updateTime = 0;
        };
        SystemTimer.onTimer_handler = function (e) {
            SystemTimer.sysTime += SystemTimer.step;
            SystemTimer.updateTime += SystemTimer.step;
            SystemTimer.onLineTime += SystemTimer.step;
            var second = Math.floor(app.SystemTimer.timer.currentCount * SystemTimer.step / 1000);
            if (second > SystemTimer.curSec) {
                SystemTimer.curSec = second;
                SystemTimer.dispacher.dispatchEvent(new egret.Event(SystemTimer.TIME_UPDATED));
            }
            //以下代码，系统循环统一管理，为兼容不同的服务端，一律使用本地时间，误差通过设置前计算并转换成本地时间。
            var i = SystemTimer.listenerDict.length;
            while (--i > -1) {
                var param = SystemTimer.listenerDict[i];
                param.cacheTime += SystemTimer.step;
                if (param.cacheTime > param.step) {
                    param.cacheTime -= param.step;
                    param.currTime += param.step;
                    if (param.currTime > param.overTime) {
                        if (param.overFunc != null) {
                            param.overFunc.call(param.thisObj, param);
                        }
                        if (param.overNoif != null && param.stepNoif != '') {
                            __SEND_NOTIFICATION(param.overNoif, param);
                        }
                        SystemTimer.removeListener(param);
                    }
                    else {
                        if (param.stepFunc != null) {
                            param.stepFunc.call(param.thisObj, param);
                        }
                        if (param.stepNoif != null && param.stepNoif != '') {
                            __SEND_NOTIFICATION(param.stepNoif, param);
                        }
                    }
                }
            }
        };
        SystemTimer.getFormatServerHour = function () {
            var serverDt = app.SystemTimer.getServerDate();
            return serverDt.getHours() * 100 + serverDt.getMinutes();
        };
        SystemTimer.getNeedhour = function (hours) {
            return hours * 60 * 60;
        };
        SystemTimer.getNeedHourms = function (hours) {
            return hours * 60 * 60 * 1000;
        };
        return SystemTimer;
    }(egret.HashObject));
    SystemTimer.sysTime = 0;
    SystemTimer.onLineTime = 0;
    SystemTimer.serverTimeOffset = 0;
    SystemTimer.step = 150;
    SystemTimer.listenerDict = [];
    app.SystemTimer = SystemTimer;
    __reflect(SystemTimer.prototype, "app.SystemTimer");
})(app || (app = {}));
app.SystemTimer.TIME_UPDATED = "timerUpdated";
app.SystemTimer.dispacher = new egret.EventDispatcher();
app.SystemTimer.OPEN_SERV_TIME = 0;
app.SystemTimer.updateTime = 0;
var __TIMER = app.SystemTimer;
//# sourceMappingURL=SystemTimer.js.map