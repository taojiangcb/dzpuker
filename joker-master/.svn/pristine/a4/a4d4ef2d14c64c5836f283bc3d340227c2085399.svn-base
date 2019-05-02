/**
 * Created by JiangTao on 2016/6/24.
 */
module antiSystem {
    export class AntiMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__ANTI_MEDIATOR__";
        constructor(viewComp:any=null){
            super(AntiMediator.NAME,viewComp);
        }

        static VERIFICATION_NAME:string = "VERIFICATION_NAME";  //验证实名登记
        static TOP_TIP_1HOUR:string = "TOP_TIP_HOUR";           //1小游戏提示
        static ALERT_3HOUR:string = "ALERT_3HOUR";              //3小游戏提示结算时提示
        static ALERT_3HOUR_IN:string = "ALERT_3HOUR_IN";        //5小游戏提示 进入牌桌时提示
        static ANTI_BEGIN:string = "antiBegin";                 //防沉迷计时开始

        second:number = 0;

        listNotificationInterests():string[] {
            return[
                AntiMediator.VERIFICATION_NAME,
                AntiMediator.TOP_TIP_1HOUR,
                AntiMediator.ALERT_3HOUR,
                AntiMediator.ALERT_3HOUR_IN,
                AntiMediator.ANTI_BEGIN
            ];
        }

        handleNotification(notification:puremvc.INotification):void {
            super.handleNotification(notification);
            switch(notification.getName()) {
                case AntiMediator.VERIFICATION_NAME:
                    if(antiSystem.needAnti()) {
                        this.verification_name();
                    }
                    break;
                case AntiMediator.TOP_TIP_1HOUR:
                    if(antiSystem.needAnti()) {
                        tip.popSysTopTip(gameabc.getMessage("GAME_1HOUR_TIP"));
                    }
                    break;
                case AntiMediator.ALERT_3HOUR: //牌局结算
                    var hour:number = getProxy().getHour();
                    if(antiSystem.needAnti() && hour >= 3) {
                        var msg:string = gameabc.getMessage("GAME_3HOUR_TIP");
                        tip.Alert.show(msg,"防沉迷提示",tip.ALERT);
                        playcards.getProxy().outbakfun();
                    }
                    break;
                case AntiMediator.ALERT_3HOUR_IN: //进入牌局
                    var hour:number = getProxy().getHour();
                    if(antiSystem.needAnti() && hour >= 3) {
                        var msg:string = gameabc.getMessage("GAME_3HOUR_TIP");
                        tip.Alert.show(msg, "防沉迷提示", tip.ALERT);
                    }
                    break;
                case AntiMediator.ANTI_BEGIN:
                    if(antiSystem.needAnti()){
                        this.timeBegin();
                    }
                    break;
            }
        }

        private verification_name():void {
            var msg:string = gameabc.getMessage("RNV_ALERT");
                tip.Alert.show(msg,"",tip.ALERT,()=>{
                    __OPEN_PRE_MOUDLE(AppReg.APP_RELAN_NAME);
                },null,this,true);
        }

        /**
         * 防沉迷开始
         */
        private timeBegin():void {
            __TIMER.removeEventListener(__TIMER.TIME_UPDATED,this.timeChange,this);
            __TIMER.addEventListener(__TIMER.TIME_UPDATED,this.timeChange,this);
        }

        /**
         * 防沉迷
         */
        timeChange(event:egret.Event):void {
            this.second += 1000;
            if(playcards.getProxy().isPlayNetCard) {
                if(this.second == 10000) {
                    antiSystem.getProxy().totalRunTime += this.second;
                    this.validateTime();
                    antiSystem.getProxy().saveTimer();
                    this.second = 0;
                }
            } 
            else {
                if(this.second == 10000) {
                    var outHour:number = antiSystem.getProxy().totalOutTime / 1000 / 36000;
                    //满5小之后全部清0
                    if(outHour >= 5) {
                        antiSystem.getProxy().initAnti();
                    } 
                    else {
                        var nowTime:number = new Date().getTime();
                        if(antiSystem.getProxy().lastTime > 0) {
                            var outTime:number = nowTime - antiSystem.getProxy().lastTime;
                            antiSystem.getProxy().totalOutTime += outTime;
                            antiSystem.getProxy().lastTime = nowTime;
                        } 
                        else {
                            antiSystem.getProxy().lastTime = nowTime;
                            antiSystem.getProxy().totalOutTime += this.second;
                        }
                        getProxy().saveTimer();
                    }
                    this.second = 0;
                }
            }
        }

        private validateTime():void {
            var hour:number = getProxy().getHour();
            if(hour >= 1 && !getProxy().hour1Flag) {
                // getProxy().hour1Flag = true;
                __SEND_NOTIFICATION(AntiMediator.TOP_TIP_1HOUR);
                getProxy().saveTimer();
            } 
            else if(hour >= 2 && !getProxy().hour2Flag) {
                // getProxy().hour2Flag = true;
                __SEND_NOTIFICATION(AntiMediator.TOP_TIP_1HOUR);
                getProxy().saveTimer();
            }
        }

        dispose():void {
            __TIMER.removeEventListener(__TIMER.TIME_UPDATED,this.timeChange,this);
            super.dispose();
        }
    }
}