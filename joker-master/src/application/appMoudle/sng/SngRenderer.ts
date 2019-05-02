module sng {

    export class SngRenderer extends uicomps.BaseItemCilckRenderer {

        bgImage:eui.Image;
        titleImage:eui.Image;
        onlineLabel:eui.Label;
        rank1Label:eui.Label;
        // rank2Label:eui.Label;
        entryFeeLabel:eui.Label;
        enterButton:eui.Button;
        signButton:eui.Button;
        ticketImage: eui.Image;
        coinImage: eui.Image;
        infoImage: eui.Image;
        ticketGroup: eui.Group;
        ticketLabel:eui.Label;
        iconImage:eui.Image;
        tipLabel:eui.Label;

        public constructor() {
            super();
            this.skinName = "SngRendererSkin";
            this.addButton(this.enterButton);
            this.addButton(this.signButton);
        }


        get matchVO():appvos.MatchVO {
            return <appvos.MatchVO> this.data;
        }


        dataChanged(): void {
            this.onlineLabel.text = String(this.matchVO.numPlayers);
            // this.rank1Label.text = String(this.matchVO.rewards[0].coin);
            // this.rank2Label.text = String(this.matchVO.rewards[1].coin);
            this.rank1Label.text = FormatUtils.wan(this.matchVO.entryFee * match.getProxy().wheelProb[1]);


            var timeHour = cy.getServerTime().getHours();
            if(timeHour>=6&&timeHour<8) {
                this.infoImage.visible = true;
                this.enterButton.visible = false;
                this.signButton.visible = false;
            } else {
                this.infoImage.visible = false;
                // this.enterButton.visible = this.matchVO.isSigned;
                //this.signButton.visible = !this.matchVO.isSigned;
                this.enterButton.visible = false;
                this.signButton.visible = true;
            }

            var ticket = match.getProxy().getTicket(this.matchVO.matchId);
            if (ticket != null && ticket.num > 0) {
                this.ticketImage.source = ticket.template.icon+"_png";
                this.ticketGroup.visible = true;
                this.entryFeeLabel.visible = false;
                this.coinImage.visible = false;
                this.ticketLabel.text = ""+ticket.num;
            } else {
                this.entryFeeLabel.text = this.matchVO.entryFee+"+"+this.matchVO.tax;
                this.ticketGroup.visible = false;
                this.entryFeeLabel.visible = true;
                this.coinImage.visible = true;
            }

            var index = match.getProxy().sngList.indexOf(this.matchVO);

            if (index==0) {
                this.bgImage.source = "icon_sng_bg_type2_png";
                this.titleImage.source = "img_word_sng_1qc_png";
                this.iconImage.source = "icon_sng_poker_1_png";
            } else if (index==1) {
                this.bgImage.source = "icon_sng_bg_type1_png";
                this.titleImage.source = "img_word_sng_5qc_png";
                this.iconImage.source = "icon_sng_poker_2_png";
            } else {
                this.bgImage.source = "icon_sng_bg_type3_png";
                this.titleImage.source = "img_word_sng_1wc_png";
                this.iconImage.source = "icon_sng_poker_2_png";
            }

            if (index == 0) {
                this.tipLabel.text = "3人开赛";
            } else {
                this.tipLabel.text = "暂未开放";
            }


        }

        protected click(tag: egret.DisplayObject): void { 
            switch (tag) {
                case this.signButton:
                    var index = match.getProxy().sngList.indexOf(this.matchVO);
                    this.matchVO.subId = 0;
                    if (index==1 || index==2) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                        return;
                    }

                    //重复报名点击限制
                    if (this.matchVO.isSignuping) {
                        tip.popSysCenterTip("正在报名中，请勿重复点击");
                        return;
                    } else {
                        this.matchVO.isSignuping = true;
                    }

                    var ticket = match.getProxy().getTicket(this.matchVO.matchId);
                    if (ticket == null || ticket.num <= 0) {
                        var needSilver = this.matchVO.entryFee+this.matchVO.tax;
                        if (user.getProxy().svrGameData && user.getProxy().svrGameData.silver<needSilver) {
                            user.getProxy().openMoney();
                            return;
                        }
                    }
                    
                    if (this.matchVO.svrConfigInfo==null) {
                        tip.popSysCenterTip("no match config.");
                        return;
                    }

                    match.getProxy().joinMatch(this.matchVO);
                    

                    if (this.matchVO.subId != -1) {
                        match.getProxy().joinMatchProcess(this.matchVO.svrConfigInfo.matchAppId,true);
                        if(index==0) {
                            mc2sdk.event(mc2sdk.EVENT_TYPE.SNG_S1);
                        } else if(index==1) {
                            mc2sdk.event(mc2sdk.EVENT_TYPE.SNG_S2);
                        } else if(index==2) {
                            mc2sdk.event(mc2sdk.EVENT_TYPE.SNG_S3);
                        }
                    } else {
                        
                    }
                    return;

                case this.enterButton:
                    match.getProxy().reConnectMatch(this.matchVO);
                    return;
            }
        }
    }



}