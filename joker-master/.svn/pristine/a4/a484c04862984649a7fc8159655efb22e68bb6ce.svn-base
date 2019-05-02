module match {

    
    export class MttMoudle extends app.base.BaseSceneUIMoudleComponent {


        tableList:eui.List;
        noMatchLabel:eui.Label;
        txtCou:eui.Label;

        infoButton:eui.Image;
        rwardButton:eui.Image;
        btnExchange:eui.Image;

        tab1Button:eui.ToggleButton;
        tab2Button:eui.ToggleButton;
        tab3Button:eui.ToggleButton;
        // tab4Button:eui.ToggleButton;
        tab5Button:eui.ToggleButton;
        redImage:eui.Image;

        public constructor() {
    		super();
    		this.skinName = "MttSkin";
		}

        public createComplete(event: egret.Event): void {

            super.createComplete(event);
            this.registerMediator(MttMediator);
            this.bindTabButton(this.tab1Button,this.tab2Button,this.tab3Button,this.tab5Button);

            this.bindButton(this.infoButton);
            this.rwardButton.visible = false;
            // this.bindButton(this.rwardButton);

            this.buttonGroup.select(this.tab1Button);
            this.bindButton(this.btnExchange);

            this.tableList.itemRenderer = match.MttRenderer;

            // this.playTween();

            // __SEND_NOTIFICATION(app.NetAction.MTT_REQJOIN);
            // __SEND_NOTIFICATION(app.NetAction.MTT_REQJOINMATCH);

            __SEND_NOTIFICATION(app.NetAction.REQGETMATCHLIST);

            this.updateCoin();
            this.updateData();

            this.addDebugTouch();
        }


        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            var mttDisplayList = []; //要展示的比赛列表
            switch(clickTarget) {
                case this.infoButton:
                    __OPEN_MOUDLE(AppReg.SNG_RULE,room.TYPE.MTT);
                    return;
                case this.rwardButton:
                    __OPEN_MOUDLE(AppReg.MTT_STATE);
                    return;
                case this.tab1Button: //全部比赛
                    mttDisplayList = match.getProxy().getAllMttList();
                    // mttDisplayList = match.getProxy().getNearMatchList();
                    break;
                case this.tab2Button: //彩豆赛
                    mttDisplayList = match.getProxy().getSubList(match.CATEGORY.SILVER);
                    break;
                case this.tab3Button: //红包赛
                    mttDisplayList = match.getProxy().getSubList(match.CATEGORY.REDPACK);
                    break;
                // case this.tab4Button: //浙牌汇
                    mttDisplayList = match.getProxy().getSubList(match.CATEGORY.ZHEPAI);
                    break;
                case this.tab5Button: //我的比赛
                    mttDisplayList = match.getProxy().getMyMttList();
                    //因为文字与break外的不同，所以独立写
                    if (mttDisplayList==null||mttDisplayList.length==0) {
                        this.noMatchLabel.text = "还未报名任何比赛，赶快去报名吧！";
                        this.noMatchLabel.visible = true;
                        this.tableList.visible = false;
                        this.tableList.dataProvider = null;
                        return;
                    }
                    break;
                case this.btnExchange:
                    __OPEN_PRE_MOUDLE(AppReg.MTT_PRODUCT);
                    // match.getProxy().getRedpack();
                    return;
            }

            if (mttDisplayList.length == 0) {
                this.noMatchLabel.text = "暂无该类比赛";
                this.noMatchLabel.visible = true;
                this.tableList.visible = false;
                this.tableList.dataProvider = null;
            } else {
                this.noMatchLabel.visible = false;
                this.tableList.dataProvider = new eui.ArrayCollection(mttDisplayList);
                this.tableList.visible = true;
            }
            
        }

        /** 更新列表状态 */
        updateData():void {
            this.touchBindButtonHandler(this.buttonGroup.selectedButton);
            var myMttList = match.getProxy().getMyMttList();
            this.redImage.visible = myMttList!=null&&myMttList.length>0; //是否有自己的比赛
            if (myMttList.length == 0 && this.buttonGroup.selectedButton==this.tab5Button) {
                this.selectTabButton(0);
            }
        }


        /** 更新筹码数量 */
        updateCoin():void {
            if(user.getProxy().svrGameData != null) {
                this.txtCou.text = FormatUtils.qian(user.getProxy().svrGameData.silver) + "";
            }
        }

        tabToMyList():void {
             this.buttonGroup.select(this.tab5Button);
             this.touchBindButtonHandler(this.tab5Button);
        }


        close():void {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        }
        

    }
}