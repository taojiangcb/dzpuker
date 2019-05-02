module match {

	export class MttStateMoudle extends app.base.BaseWndUIMoudleComponent {

        closeButton:eui.Image;

        tab1Button:eui.ToggleButton; //概述
        tab2Button:eui.ToggleButton; //排名
        tab3Button:eui.ToggleButton; //盲注
        tab4Button:eui.ToggleButton; //奖励
        tab5Button:eui.ToggleButton; //赛况

        infoList:eui.List; //共用的list，不同的组要更换不同的render
        stateGroup:eui.Group; //比赛状态显示组
        blindsGroup:eui.Group; //盲注的显示组
        rankGroup:eui.Group; //排名的显示组
        rewardGroup:eui.Group; //奖励的显示组
        infoGroup:eui.Group;//信息的显示组
        infoScroller:eui.Group;//信息框滚动条

        signButton:eui.Button;
        cancelButton:eui.Button;


        line1Label:eui.Label;
        line2Label:eui.Label;
        line3Label:eui.Label;
        line4Label:eui.BitmapLabel;
        line5Label:eui.Label;
        line6Label:eui.Label;

        noMatchLabel:eui.Label;


        left1Label:eui.Label; //排名
        left2Label:eui.Label; //奖励人数
        left3Label:eui.Label; //参赛人数
        right1Label:eui.Label; //手中筹码
        right2Label:eui.Label; //平均筹码
        right3Label:eui.Label; //比赛用时
        top1Label:eui.Label;//级别
        top2Label:eui.Label;//前注
        top3Label:eui.Label;//盲注
        bottom1Label:eui.Label;//下级前注
        bottom2Label:eui.Label;//下级盲注
        timeLabel:eui.BitmapLabel;// 升盲倒计时

        timerStepId:number = -1; 
        

        constructor() {
            super();
            this.skinName = "MttStateSkin";

            this.bindTabButton(this.tab1Button,this.tab5Button,this.tab2Button,this.tab3Button,this.tab4Button);

            this.bindButton(this.signButton);
            this.bindButton(this.cancelButton);

            this.noMatchLabel.visible = false;
        }
        
        createComplete(): void {
            super.createComplete(null);
            this.registerMediator(MttStateMediator);
            this.bindButton(this.closeButton);
            if (match.getProxy().currentMatchVO!=null) {
                this.signButton.visible = false;
                this.cancelButton.visible = false;
                __SEND_NOTIFICATION(app.NetAction.REQ_MATCH_RANK,this.viewMatchVO);
            }
            
            this.line1Label.text = this.viewMatchVO.entryFee + "+" + this.viewMatchVO.tax;
            if(this.viewMatchVO.startTime)
                this.line2Label.text = DateUtils.dateFormat(new Date(this.viewMatchVO.startTime), "MM月dd日 hh:mm ");
            else this.line2Label.text  = ""
            this.line3Label.text = this.viewMatchVO.minPlayers + "-"+this.viewMatchVO.maxPlayers +"人";
            this.line4Label.text = this.viewMatchVO.bet + "";

            // var isMatchStarted: boolean = (match.getSvrTime() >= this.viewMatchVO.startTime) && playcards.getTableVO() != null;
            var isMatchStarted: boolean = (match.getSvrTime() >= this.viewMatchVO.startTime) && playcards.getProxy().isPlayCard != null;
            // var isMatchStarted: boolean = playcards.getTableVO() != null;
            if(isMatchStarted) {
                this.timerStep();//比赛用时
                this.timerStepId = egret.setInterval(this.timerStep,this,150);
                this.updatePlayersInfoInMatch(); //人数、筹码信息刷新
                this.updateBlindsInfoInMatch(); //盲注信息刷新
            } else {
                this.updatePlayersInfoWithoutMatch(); //人数、筹码信息刷新
                this.updateBlindsInfoWithoutMatch(); //盲注信息刷新
            }

            this.selectTabButton(parseInt(this.uiOpenData)||0);

            console.log("[info] matchId="+this.viewMatchVO.matchId+" subId="+this.viewMatchVO.subId);
        }

        get viewMatchVO():appvos.MttMatchVO {
            if(this.uiOpenData instanceof appvos.MttMatchVO) {
                return this.uiOpenData;
            } else if(match.getProxy().currentMatchVO!=null) {
                return <appvos.MttMatchVO>match.getProxy().currentMatchVO;
            } else {
                return match.getProxy().mttList[0];
            }
        }

        timerStep():void {
            var matchTime = match.getSvrTime() - this.viewMatchVO.startTime;
            this.right3Label.text = DateUtils.dateFormat(matchTime,"mm:ss");
            
            var matchVO = this.viewMatchVO; 
            if(matchVO.blinds && matchVO.blinds.length - 1 > matchVO.blindsIndex) {
                if (matchVO.blindsUpTime < match.getSvrTime()) {
                    match.getProxy().blindsUp(matchVO);
                    this.updateBlindsInfoInMatch();
                }
                matchTime = matchVO.blindsUpTime - match.getSvrTime();
                this.timeLabel.text = DateUtils.dateFormat(matchTime,"mm:ss");
            }
        }

        updatePlayersInfoInMatch():void {
            this.left1Label.text = this.viewMatchVO.myRank + '/' + this.viewMatchVO.numPlayers;//剩余人数
            this.left2Label.text = String(this.viewMatchVO.rewards.length); //钱圈人数
            this.left3Label.text = String(this.viewMatchVO.numSignups); //参赛人数(报名人数)
            var seatVO = playcards.getProxy().mySeatvo;
            var bet = seatVO == null ? this.viewMatchVO.bet : seatVO.nowBet + seatVO.totalBet;
            this.right1Label.text = String(bet); //自己的筹码
            this.right2Label.text = String(match.getProxy().getAverageCoin(this.viewMatchVO)); //平均筹码
            // this.right3Label.text; //在timestep中更新
        }

        updatePlayersInfoWithoutMatch():void {
            this.left1Label.text = "祝君好运"; //排名
            this.left2Label.text = String(this.viewMatchVO.rewards.length); //钱圈人数
            this.left3Label.text = " > " + this.viewMatchVO.minPlayers; //参赛人数(报名人数)
            this.right1Label.text = String(this.viewMatchVO.bet); //自己的筹码
            this.right2Label.text = String(this.viewMatchVO.bet); //平均筹码
            this.right3Label.text = "00:00";
        }


        updateBlindsInfoInMatch():void {
            var blinds = this.viewMatchVO.blinds;
            var i = this.viewMatchVO.blindsIndex;
            this.top1Label.text = "级别"+(i + 1)+"/"+blinds.length;//盲注级别
            if (blinds[i] != null) {
                this.top2Label.text = "前注 "+blinds[i].antiBlinds;  
                this.top3Label.text = "盲注 "+blinds[i].smallBlinds +'/'+blinds[i].bigBlinds;  
            }
            if (blinds[i+1] != null) {
                this.bottom1Label.text = "前注 "+blinds[i+1].antiBlinds;  
                this.bottom2Label.text = "盲注 "+blinds[i+1].smallBlinds +'/'+blinds[i+1].bigBlinds;  
            }
        }
        updateBlindsInfoWithoutMatch():void {
            var blinds = this.viewMatchVO.blinds;
            this.top1Label.text = "级别1/"+blinds.length;//盲注级别
            this.top2Label.text = "前注 "+blinds[0].antiBlinds;  
            this.top3Label.text = "盲注 "+blinds[0].smallBlinds +'/'+blinds[0].bigBlinds;  
            this.bottom1Label.text = "前注 "+blinds[1].antiBlinds;  
            this.bottom2Label.text = "盲注 "+blinds[1].smallBlinds +'/'+blinds[1].bigBlinds;
            this.timeLabel.text = DateUtils.DayTimeStampFormat2(blinds[0].time);
        }


        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            console.log("svrTime="+DateUtils.dateFormat(match.getSvrTime(),"hh:mm"));
            switch (clickTarget) {
            	case this.closeButton:
                    this.close();
                    return;
                case this.tab5Button: //赛况
                    this.resetDisplay();
//                    if (playcards.getTableVO()==null) {
//                        this.noMatchLabel.visible = true;
//                    } else {
//                        this.stateGroup.visible = true;
//                    }
                    this.stateGroup.visible = true;
                    return;
                case this.tab1Button: //概述
                    this.resetDisplay();
                    this.infoGroup.visible = true;
                    this.signButton.visible = match.getProxy().isShowSignButton(this.viewMatchVO);
                    this.cancelButton.visible = match.getProxy().isShowCancelButton(this.viewMatchVO);
                    return;
                case this.tab4Button: //奖励
                    this.resetDisplay();
                    this.infoList.itemRenderer = sng.SngRankRenderer;
                    this.infoList.dataProvider = new eui.ArrayCollection(this.viewMatchVO.rewards);
                    this.infoScroller.visible = true;
                    this.rewardGroup.visible = true;
                    return;
                case this.tab3Button: //盲注
                    this.resetDisplay();
                    this.infoList.dataProvider = new eui.ArrayCollection(this.viewMatchVO.blinds);
                    this.infoList.itemRenderer = sng.SngBlindsRenderer;
                    this.infoScroller.visible = true;
                    this.blindsGroup.visible = true;
                    return;
                case this.tab2Button: //排名
                    this.resetDisplay();
                    if (playcards.getProxy().isPlayCard) {
                        var players = match.getProxy().currentMatchVO.rankList;
                        players.sort(this.playersSort);
                        this.infoScroller.visible = true;
                        this.infoList.dataProvider = new eui.ArrayCollection(players);
                        this.infoList.itemRenderer = sng.SngPlayerRenderer;
                    } else {
                        this.noMatchLabel.visible = true;
                    }
                    this.rankGroup.visible = true;
                    return;
                case this.signButton:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.MTT_SIGN);
                    match.getProxy().signMatch(this.viewMatchVO.matchId);
                    this.close();
                    return;
                case this.cancelButton:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.MTT_CANCEL);
                    __SEND_NOTIFICATION(app.NetAction.REQCANCELSIGNUP,this.viewMatchVO);
                    this.close();
                    return;
            }
        }

        playersSort(a:appvos.MttRankVO, b:appvos.MttRankVO):number {
            return a.rank > b.rank ? 1 : -1;
        }

        resetDisplay():void {
            this.stateGroup.visible = false;
            this.noMatchLabel.visible = false;
            this.infoGroup.visible = false;
            this.infoScroller.visible = false;
            this.blindsGroup.visible = false;
            this.rankGroup.visible = false;
            this.rewardGroup.visible = false;
            this.signButton.visible = false;
            this.cancelButton.visible = false;
        }

        dispose():void {
            if (this.timerStepId != -1) {
                egret.clearInterval(this.timerStepId);
            }
            
        }

    }


}