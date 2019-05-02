module app {
    export class SystemTimer extends egret.HashObject {

        public static TIME_UPDATED: string;
        public static TIME_UPDATED_2S: string;
        public static TIME_UPDATED_3S: string;
        public static TIME_UPDATED_4S: string; // 心跳用
        public static TIME_UPDATED_5S: string;
        public static TIME_UPDATED_7S: string;
        public static TIME_UPDATED_1M: string;
        public static timer: egret.Timer;
        public static dispacher: egret.EventDispatcher;
        public static sysTime: number = 0;
        public static onLineTime: number = 0;
        public static serverTimeOffset: number = 0;
        public static OPEN_SERV_TIME: number;
        public static updateTime: number;

        public static step:number = 150;

        public static set systemTime(value: number) {
            app.SystemTimer.sysTime = value;
            app.SystemTimer.serverTimeOffset = app.SystemTimer.sysTime - new Date().getTime();
            if (!app.SystemTimer.timer) {
                app.SystemTimer.timer = new egret.Timer(SystemTimer.step, 0);
                app.SystemTimer.timer.addEventListener(egret.TimerEvent.TIMER, app.SystemTimer.onTimer_handler, null);
                app.SystemTimer.timer.start();
                app.SystemTimer.curSec = 0;
            }
        }

        public static get systemTime(): number {
            return app.SystemTimer.sysTime;
        }

        public static set systemOnLineTime(value: number) {
            app.SystemTimer.onLineTime = value;
        }

        public get systemOnLineTime(): number {
            return app.SystemTimer.onLineTime;
        }

        public static addEventListener(type: string, listener: Function, thisObject: any, useCapture: boolean = false, priority: number = 0) {
            app.SystemTimer.dispacher.addEventListener(type, listener, thisObject, useCapture, priority);
        }

        public static hasEventListener(type: string): boolean {
            return app.SystemTimer.dispacher.hasEventListener(type);
        }

        public static removeEventListener(type: string, listener: Function, thisObject: any, useCapture: boolean = false) {
            app.SystemTimer.dispacher.removeEventListener(type, listener, thisObject, useCapture);
        }




        /** 设置一个通知时间，并且按指定间隔更新状态
         * upNotif: 到时的事件
         * timesup: 倒计时时间
         * stepNotif: 步频的事件
         * step: 步频的毫秒间隔
         */
        public static setTimesup(overNotif:string, timesup:number, stepNotif:string, step:number=1000):TimerStepParam {
            var timerParam = this.addListener(null,null,step);
            timerParam.stepNoif = stepNotif;
            timerParam.overNoif = overNotif;
            timerParam.overTime = timesup;
            return timerParam;
        }

        static listenerDict:TimerStepParam[] = [];
        /** 添加一个函数，按指定间隔调用 */
        public static addListener(func:Function, thisObj:any, step:number=1000):TimerStepParam {
            var timerParam = new TimerStepParam();
            this.listenerDict.push(timerParam);
            timerParam.stepFunc = func;
            timerParam.thisObj = thisObj;
            timerParam.step = step;
            timerParam.startTime = new Date().getTime();
            timerParam.currTime = timerParam.startTime;
            return timerParam;
        }

        public static removeListener(param:TimerStepParam):void {
            var index = this.listenerDict.indexOf(param);
            if(index != -1) SystemTimer.removeListenerByIndex(index);
        }
        public static removeAllListeners():void {
            var index = this.listenerDict.length;
            while (--index > -1) {
                SystemTimer.removeListenerByIndex(index);
            }
        }
        private static removeListenerByIndex(index:number):void {
            var delObj = this.listenerDict.splice(index,1)[0];
            delObj.data = null;
            delObj.thisObj = null;
            delObj.stepFunc = null;
            delObj.overFunc = null;
        }



        public static getServerDate(): Date {
            return new Date(app.SystemTimer.sysTime);
        }

        public static getServerDay(): number {
            return app.SystemTimer.getServerDate().getDay();
        }

        public static getServerYear(): number {
            return app.SystemTimer.getServerDate().getFullYear();
        }

        public static getFixedServerTime(): number {
            return app.SystemTimer.getServerTime() + app.SystemTimer.serverTimeOffset;
        }

        public static getServerTime(): number {
            return app.SystemTimer.sysTime;
        }

        public static getOnLineTime(): number {
            return app.SystemTimer.onLineTime;
        }

        public static getCurrentSystemTime(): number {
            return new Date().getTime();
        }

        public static getCanUpdateData(): boolean {
            if (app.SystemTimer.updateTime >= 300000) {
                return true;
            }
            return false;
        }

        public static resetUpdateTime() {
            app.SystemTimer.updateTime = 0;
        }

        private static curSec:number; //记录当前第几秒
        private static onTimer_handler(e: egret.TimerEvent) {
            SystemTimer.sysTime += SystemTimer.step;
            SystemTimer.updateTime += SystemTimer.step;
            SystemTimer.onLineTime += SystemTimer.step;
            var second = Math.floor(app.SystemTimer.timer.currentCount * SystemTimer.step / 1000);
            if(second>SystemTimer.curSec) {
                SystemTimer.curSec = second;
                SystemTimer.dispacher.dispatchEvent(new egret.Event(SystemTimer.TIME_UPDATED));
            }
            

            //以下代码，系统循环统一管理，为兼容不同的服务端，一律使用本地时间，误差通过设置前计算并转换成本地时间。
            var i = SystemTimer.listenerDict.length;
            while (--i > -1) {
                var param = SystemTimer.listenerDict[i];
                param.cacheTime += SystemTimer.step;
                if(param.cacheTime > param.step) { //达到设置的间隔
                    param.cacheTime -= param.step;
                    param.currTime += param.step;
                    if (param.currTime > param.overTime) {
                        if (param.overFunc!=null) {
                            param.overFunc.call(param.thisObj,param);
                        }
                        if (param.overNoif!=null && param.stepNoif!='') {
                            __SEND_NOTIFICATION(param.overNoif,param);
                        }
                        SystemTimer.removeListener(param);
                    } else {
                        if (param.stepFunc!=null) {
                            param.stepFunc.call(param.thisObj,param);
                        }
                        if (param.stepNoif!=null && param.stepNoif!='') {
                            __SEND_NOTIFICATION(param.stepNoif,param);
                        }
                    }
                }
            }
        }




        public static getFormatServerHour(): number {
            var serverDt: Date = app.SystemTimer.getServerDate();
            return serverDt.getHours() * 100 + serverDt.getMinutes();
        }

        public static getNeedhour(hours: number): number {
            return hours * 60 * 60;
        }

        public static getNeedHourms(hours: number): number {
            return hours * 60 * 60 * 1000;
        }

        //public static isTodayBefore(time: number): boolean {
        //    return time < DateUtils.theDayStartTime(app.SystemTimer.getServerTime());
        //}

        //public static isYestoday(time: number): boolean {
        //    return time < DateUtils.theDayStartTime(app.SystemTimer.getServerTime()) && time > DateUtils.yestodayStartTime(app.SystemTimer.getServerTime());
        //}

        //public static isToday(time: number): boolean {
        //    return time > DateUtils.theDayStartTime(app.SystemTimer.getServerTime()) && time < DateUtils.tomorrowStartTime(app.SystemTimer.getServerTime());
        //}
    }

}

app.SystemTimer.TIME_UPDATED = "timerUpdated";
app.SystemTimer.dispacher = new egret.EventDispatcher();
app.SystemTimer.OPEN_SERV_TIME = 0;
app.SystemTimer.updateTime = 0;

var __TIMER = app.SystemTimer;