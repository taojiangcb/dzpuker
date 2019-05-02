module match {

    export class MttRenderer extends uicomps.BaseItemCilckRenderer {

        bgImage:eui.Image;
        titleImage:eui.Image;
        onlineLabel:eui.Label;
        rank1Label:eui.Label;
        entryFeeLabel:eui.Label;
        enterButton:eui.Button;
        signButton:eui.Button;
        testButton1:eui.Button;
        testButton2:eui.Button;
        ticketImage: eui.Image;
        coinImage: eui.Image;
        infoImage: eui.Image;
        ticketGroup: eui.Group;
        ticketLabel:eui.Label;
        iconImage:eui.Image;
        tipLabel1:eui.Label;
        tipLabel2:eui.Label;
        tipLabel3:eui.Label;

        timeLabel1:eui.Label;
        timeLabel2:eui.Label;
        timerId:number;
        playingImage:eui.Image;
        clickArea:eui.Rect;
        

        public constructor() {
            super();
            this.skinName = "MttRendererSkin";
            this.touchEnabled = false;
            this.timeLabel1.text = "";
            this.timeLabel2.text = "";
            this.tipLabel1.visible = false;
            this.tipLabel2.visible = false;
            this.enterButton.visible = false;
            this.signButton.visible = false;
            this.clickArea = new eui.Rect(this.width,this.height);
            this.clickArea.alpha = 0;
            this.addChildAt(this.clickArea,this.numChildren-4);
            this.addButton(this.enterButton);
            this.addButton(this.signButton);
            this.addButton(this.clickArea);
            this.timerId = egret.setInterval(this.timerStep,this,330);
           

            if (DEBUG && 
            (AppConst.CONNECT_SERVER.roomType==room.CONFIG.INTERNAL||
            AppConst.CONNECT_SERVER.roomType==room.CONFIG.MINE_57)) {
                this.addButton(this.testButton1);
                this.testButton1.visible = true;
                this.addButton(this.testButton2);
                this.testButton2.visible = true;
            } else {
                this.testButton1.visible = false;
                this.testButton2.visible = false;
            }


        }

        // createComplete(evt:egret.Event):void {
        //     super.createComplete(evt);
        // }

        get matchVO():appvos.MttMatchVO {
            return <appvos.MttMatchVO> this.data;
        }



        dataChanged(): void {

            this.timeLabel1.text = "";
            this.timeLabel2.text = "";

            //参赛人数
            this.onlineLabel.text = String(this.matchVO.numPlayers);

            //总奖额部分
            if(this.matchVO.allRewards>0) {
                this.rank1Label.text = FormatUtils.wan(this.matchVO.allRewards);
            } else {
                this.rank1Label.text = "";
            }

            //红包赛特殊处理
            if (this.matchVO.category & match.CATEGORY.REDPACK) {
                this.tipLabel3.visible = true;
            } else {
                this.tipLabel3.visible = false;
            }

            //显示价格或门票的部分
            var ticket = match.getProxy().getTicket(this.matchVO.matchId);
            if (ticket != null && ticket.num > 0) {
                this.ticketImage.source = ticket.template.icon+"_png";
                this.ticketGroup.visible = true;
                this.entryFeeLabel.visible = false;
                this.coinImage.visible = false;
                this.ticketLabel.text = ""+ticket.num;
            } else {
                this.entryFeeLabel.text = this.matchVO.entryFee+"+"+this.matchVO.tax//+"["+this.matchVO.matchId+"]";
                this.ticketGroup.visible = false;
                this.entryFeeLabel.visible = true;
                this.coinImage.visible = true;
            }

            //最前面的ICON部分
            this.bgImage.source = "icon_sng_bg_type3_png";
            if (this.matchVO.category&8) {
                this.titleImage.source = "iw_yuanhongbaosai_png";
                this.iconImage.source = "icon_sng_poker_3_png";
            } else {
                this.titleImage.source = "iw_dezhoubihuanlesai_mtt_png";
                this.iconImage.source = "icon_sng_poker_2_png";
            }

            this.timerStep();

        }


        timerStep():void {
            var time = this.matchVO.startTime - match.getSvrTime();

            //===== 报名按钮区的处理 ======================

            this.signButton.visible = false;
            this.enterButton.visible = false;
            this.tipLabel1.visible = false;
            this.tipLabel2.visible = false;

            if(this.matchVO.isSigned) { //已报名
                if (time>2*60*1000) { //开赛2分钟前才出现进入按钮
                    this.tipLabel1.text = "等待开赛";
                    this.tipLabel1.visible = true;
                    this.tipLabel2.text = "(已报名)";
                    this.tipLabel2.visible = true;
                } else {
                    this.enterButton.visible = true;
                }
            } else { //未报名
                if (match.getSvrTime() > this.matchVO.signupStartTime) { //判断是否可以报名
                    //报名截止时间到
                    if (match.getSvrTime() > this.matchVO.signupEndTime) {
                        this.tipLabel1.text = "报名截止";
                        this.tipLabel1.visible = true;
                    } else {
                        this.signButton.visible = true;
                    }
                } else {
                    //太早了，报名未开放
                    this.tipLabel1.text = "未开启报名"
                    this.tipLabel1.visible = true;
                    var str = DateUtils.dateFormat(this.matchVO.signupStartTime,"hh:mm");
                    this.tipLabel2.text = str + "开启报名";
                    this.tipLabel2.visible = true;
                }
            }




            //===== 时间显示区的处理 =======================
            var date = new Date(this.matchVO.startTime);
            if (this.matchVO.svrStatus==cyvos.MATCH_STATUS.MATCH || time<0) {
                this.timeLabel1.text = "";
                this.timeLabel2.text = "开赛中";
                this.playingImage.visible = true;
            } else if (time<600000) { //距离比赛0~10分钟内
                this.timeLabel1.text = "即将开始";
                this.timeLabel2.text = DateUtils.dateFormat(new Date(time),"mm:ss");
                this.playingImage.visible = false;
            } else { //距离比赛大于10分钟
                if(DateUtils.isToday(this.matchVO.startTime)) {
                    this.timeLabel1.text = "今天";
                } else {
                    if(DateUtils.theDayAfterTomorrow(this.matchVO.startTime)) {
                        this.timeLabel1.text = DateUtils.dateFormat(date,"MM月dd日");
                    } else {
                        this.timeLabel1.text = "明天";
                    }
                }
                this.timeLabel2.text = DateUtils.dateFormat(new Date(this.matchVO.startTime),"hh:mm");
                this.playingImage.visible = false;
            }
        }
        

        protected click(tag: egret.DisplayObject): void { 
            switch (tag) {

                case this.clickArea:
                    __OPEN_MOUDLE(AppReg.MTT_STATE,this.matchVO);
                    return;

                case this.signButton:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.MTT_SIGN);
                case this.testButton2:
                    match.getProxy().signMatch(this.matchVO.matchId);
                    return;


                case this.enterButton:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.MTT_JOIN1);
                case this.testButton1:
                    match.getProxy().reConnectMatch(this.matchVO);
                    return;
            }
        }

        dispose():void {
            this.dispose();
            egret.clearInterval(this.timerId);
        }
    }



}