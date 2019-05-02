 module match {


	export class MttRemindMediator extends app.mvc.AbstractMediator {

        static NAME:string = "MttRemindMediator";

        constructor(view:any) {
            super(MttRemindMediator.NAME,null);
        }

        listNotificationInterests():string[] {
            var mConst = app.constant.AppMediatorConst;
            var nConst = app.NetAction;
			return [
                mConst.UPDATE_MTT_TIME_STEP,
                mConst.UPDATE_MTT_TIMESUP,
                nConst.MATCH_S_START
			];
		}

        handleNotification(notification:puremvc.INotification):void {
            var mConst = app.constant.AppMediatorConst;
            var nConst = app.NetAction;
			var name:string = notification.getName();

            var mttList = match.getProxy().getMyMttList();
            var len = mttList.length;

            var evtData = <app.TimerStepParam>notification.getBody();
            var evtMatchVO = <appvos.MttMatchVO>evtData.data; //报名的比赛
            var currMatchVO = match.getProxy().currentMatchVO; //参与的比赛
            switch(name) {
                case mConst.UPDATE_MTT_TIME_STEP:
                    var sec = Math.floor((evtMatchVO.startTime - match.getSvrTime())/1000);
                    // console.log("matchId="+evtMatchVO.matchId+" sec="+sec);
                    
                    //当前已进入比赛，并且与提醒的是同一场
                    if (currMatchVO!=null && currMatchVO == evtMatchVO &&room.getProxy().currentType==room.TYPE.MTT && playcards.getProxy().isPlayCard) {
                        if (sec < 0) {
                            //比赛已经开始，界面要删除
                            match.getProxy().cancelMttRemind(evtMatchVO);
                            this.clearTimesup(evtMatchVO);
                            return;
                        }

                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS,null);//删除中间的字
                        var minNum = Math.floor(sec / 60);
                        var minStr = (minNum<10?"0":"") + minNum;
                        var secNum = sec % 60;
                        var secStr = (secNum<10?"0":"") + secNum;
                        tip.popSysCenterTimeTooltip("img_word_win_dengdaikaijuzhong_2_png",minStr,secStr);
                        tip.clearSysTopTimeTooltip();
                        currMatchVO.wasRemind = true;
                    } else {
                        if (sec > 0 && sec < 60 && !evtMatchVO.wasRemind) { //不在游戏中，小于1分钟，弹提示
                            var str = gameabc.getMessage("MTT_REMIND1",evtMatchVO.name,"{sec}");
                            var val = str.replace("{sec}",String(sec));
                            tip.popSysTopTimeTooltip(val,this.enterMatch,this,evtMatchVO);
                            if (this.intervalId!=-1) egret.clearInterval(this.intervalId);
                            this.sec = sec;
                            egret.setInterval(this.topTipTimerStep,this,1000,str);
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

        }

        clearTimesup(evtMatchVO:appvos.MatchVO):void {
            tip.clearSysCenterTimeTooltip();
            if(this.intervalId!=-1) egret.clearInterval(this.intervalId);
            tip.changeTopTimeTipStr(gameabc.getMessage("MTT_REMIND2",evtMatchVO.name));
        }

        enterMatch(matchVO:appvos.MatchVO):void {
            mc2sdk.event(mc2sdk.EVENT_TYPE.MTT_JOIN2);
            match.getProxy().reConnectMatch(matchVO);
        }


		intervalId:number = -1;
		sec:number = -1;
		setInterval(val,sec):void {
			if (this.intervalId!=-1) return;
			this.sec = sec;
			egret.setInterval(this.topTipTimerStep,1000,val);
		}
		topTipTimerStep(val):void {
			if (--this.sec < 0) {
                if(this.intervalId!=-1) egret.clearInterval(this.intervalId);
			} else {
				tip.SysTemTopTimeTooltip.changeTip(val.replace("{sec}",String(this.sec)))
			}
		}




    }



 }