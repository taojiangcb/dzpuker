// TypeScript file
module guichu {

    var loginc:GuiChuLogic;
    export function gameLogic():GuiChuLogic {
        if(loginc == null){
            loginc = new GuiChuLogic();
        } 
        return loginc;
    }

    export function destoryGamelogic():void {
        if(loginc) loginc.dispose();
        loginc = null;
    }

    export class GuiChuLogic implements games.IGameLogic {

        /**
         * 心跳触发器id
         */
        heartInterval: number;
        
        constructor() {
        }

        /**
         * 游戏开始
         */
        gameStart():void {
            var obj = utils.NativeUtils.getURLObj();
            if (obj["userid"] != null) {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.GUICHU_AUTO_LOGIN)
            } 
            else {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN)
            }

        }

        /**
         * 同步服务器时间并服返回延迟时间
         */
        syncServerTime(time:number):number {
            var msec:number = time * 1000
            var localTimer:number = app.SystemTimer.getServerTime();
            var offsetTime:number = localTimer - msec ;
            if(offsetTime <= 0) {
                app.SystemTimer.systemTime = msec;
                return 0;
            } 
            else if(offsetTime > 0) {
                app.SystemTimer.serverTimeOffset = -offsetTime;
                return offsetTime
            }
        }

        /**
         * 获取倒计时，排除网络延迟
         */
        fiexDownTime(nowTime:number,overTime:number):number {
            this.syncServerTime(nowTime);
            var downTime:number =  overTime * 1000 - app.SystemTimer.getServerTime();
            return Math.max(0,downTime);
        }

        /**
         * 进入房间之后向服务器端发送心跳请求
         */
        beginHeart() {
            if(this.heartInterval > 0) {
                egret.clearInterval(this.heartInterval);
            }
            
            this.heartInterval = egret.setInterval(()=> {
                __PVO().to(app.NetAction.GUICHU_REQ_HEART_BEAT);
            }, this, 10000);
        }

        openBanks():void {
            __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
        }

        /**
         * 游戏币不足，退出当前游戏进入钱庄
         */
        openBankRemaining():void {
            tip.Alert.show("你要退出当前游戏前往前庄吗?","钱庄",tip.CONFIRM,(type:number)=> {
                if(type == tip.YES) {
                    this.leaveOpenBank();
                } 
            },null,this);
        }

        /**
         * 离开房间之后打开钱庄
         */
        leaveOpenBank():void {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_BANK);
        }

        /**
         * 停止心跳请求
         */
        stopHeart():void {
            if(this.heartInterval > 0) {
                egret.clearInterval(this.heartInterval);
            }
        }

        dispose():void{
            this.stopHeart();
        }
    }
}