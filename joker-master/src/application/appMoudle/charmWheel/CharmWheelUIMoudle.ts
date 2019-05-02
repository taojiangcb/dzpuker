module charmWheel {
    export class CharmWheelUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        closebtn: eui.Button;
        wheel: eui.Group;
        gobtn: eui.Group;
        record: eui.Group;
        recordViewStack: eui.ViewStack;
        intervalValue: number;
        myRecordButton: eui.Image;
        allRecordButton: eui.Image;
        recordButtons: any[];
        selectRecordButton: number;
        myRecordList: eui.List;
        allRecordList: eui.List;
        myRecordListData: eui.ArrayCollection;
        allRecordListData: eui.ArrayCollection;
        charmValueLabel: eui.Label;
        recordButtonImages: any[];
        items: any[] = [];
        gobtnlight: eui.Image;
        circlelight: eui.Image;
        lightIntervalValue: number;
        itemLightIntervalValue: number;
        itemLightNumber: number = 0;
        itemsRotation: number[] = [];
        lightTiem: number = 800;
        finishTimeOutValue: number;

        constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "CharmWheelUIMoudleSkin";
            __REGISTER_PROXY(CharmWheelProxy);
            __REGISTER_MEDIATOR(CharmWheelUIMediator, this);
        }
        createComplete(event: egret.Event): void {
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.recordButtonImages = [["btn_charm_wdzj_png", "btn_charm_wdzj1_png"],
                                     ["btn_charm_zjjl_png", "btn_charm_zjjl1_png"]];
            this.recordButtons = [this.myRecordButton, this.allRecordButton];
            this.bindButton(this.gobtn);
            this.bindButton(this.closebtn);
            this.bindButton(this.myRecordButton, false);
            this.bindButton(this.allRecordButton, false);
            this.initItems();
            this.selectRecordButton = this.recordViewStack.selectedIndex = 0;
            this.setRecordButton();
            this.myRecordListData = new eui.ArrayCollection(getProxy().myRecordList);
            this.myRecordList.dataProvider = this.myRecordListData;
            this.myRecordList.itemRenderer = CharmWheelLabel;
            this.allRecordListData = new eui.ArrayCollection(getProxy().allRecordList);
            this.allRecordList.dataProvider = this.allRecordListData;
            this.allRecordList.itemRenderer = CharmWheelLabel;
            this.gobtnlight.visible = false;
            this.circlelight.visible = false;
            this.showGoButtonLight();
            getProxy().view = this;
            __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
        }
        initItems() {
            // var randomIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var rewardItems = getProxy().rewardList;
            for (var i = 0; i < rewardItems.length; i++) {
                // var r = Math.floor(Math.random() * randomIds.length);
                // var a = randomIds.splice(r, 1);
                var rewardItem = new CharmWheelItem(rewardItems[i][0], rewardItems[i][1], i, getProxy().rewardSort[i]);
                this.wheel.addChild(rewardItem);
                this.items.push(rewardItem);
                this.itemsRotation.push(getProxy().rewardSort[i]);
            }
        }
        start(reward: number) {
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.stopGoButtonLight();
            this.gobtn.touchEnabled = false;
            getProxy().initData(reward, this.wheel.rotation);
            this.intervalValue = egret.setInterval(this.setWheelRotate, this, getProxy().timeInterval);
            utils.SoundUtils.playEffectSound( utils.SoundUtils.meilizhuanpan);
        }
        setWheelRotate() {
            var rotation = getProxy().getRotation();
            if (rotation < 0) {
                this.finish();
            } else {
                this.wheel.rotation += rotation;
            }
        }
        finish() {
            this.finishTimeOutValue = egret.setTimeout(()=>{
                this.showGoButtonLight();
                this.gobtn.touchEnabled = true;
            }, this, 1000, true);
            // this.items[getProxy().rewardId].showLight();
            getProxy().finishData();
            if (this.intervalValue) egret.clearInterval(this.intervalValue);
            this.showReward();
        }
        showReward() {
            this.showRewardLabel();
            this.refreshRecord();
        }
        /**record */
        setRecordButton() {
            for (var i = 0; i < this.recordButtons.length; i++) {
                this.recordButtons[i].source = this.selectRecordButton == i? this.recordButtonImages[i][0]: this.recordButtonImages[i][1];
            }
        }
        setRecord() {
            this.recordViewStack.selectedIndex = this.selectRecordButton;
        }
        refreshRecord() {
            if (this.selectRecordButton == 0) {
                __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
            }
        }
        refreshMyRecord(data: any) {
            getProxy().myRecordList = data;
            this.myRecordListData.source = getProxy().myRecordList;
            this.myRecordListData.refresh();
        }
        refreshAllRecord(data: any) {
            getProxy().allRecordList = data;
            this.allRecordListData.source = getProxy().allRecordList;
            this.allRecordListData.refresh();
        }
        refreshNoRecord() {
            if (this.selectRecordButton == 0) {
                this.myRecordListData.source = [];
                this.myRecordListData.refresh();
            } else {
                this.allRecordListData.source = [];
                this.allRecordListData.refresh();
            }
        }
        setCharmValue() {
            this.charmValueLabel.text = user.getProxy().playInfoVO.charmScore.toString();
        }
        showGoButtonLight() {
            this.gobtnlight.visible = true;
            this.circlelight.visible = true;
            this.goButtonLightAnimate();
            this.lightIntervalValue = egret.setInterval(this.goButtonLightAnimate, this, 2000);
            this.itemLightNumber = 10 - Math.floor(this.wheel.rotation / 36);;
            this.itemLightIntervalValue = egret.setInterval(this.itemLightAnimate, this, this.lightTiem);
        }
        goButtonLightAnimate() {
            this.gobtnlight.alpha = 0;
            egret.Tween.get(this.gobtnlight).to({alpha: 1}, 1000).call(()=>{
                    this.circlelight.alpha = 1;
                    egret.Tween.get(this.circlelight).to({scaleX: 1.5, scaleY: 1.5}, 1000);
                }).to({alpha: 0}, 1000).call(()=>{
                    this.gobtnlight.alpha = 0;
                    this.circlelight.alpha = 0;
                    this.circlelight.scaleX = this.circlelight.scaleY = 1;
                });
        }
        itemLightAnimate() {
            var i = this.itemLightNumber % 10;
            this.itemLightNumber++;
            this.items[this.itemsRotation.indexOf(i)].itemLight();
            this.items[this.itemsRotation.indexOf((i + 5) % 10)].itemLight();
        }
        stopGoButtonLight() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].light.visible = false;
            }
            egret.clearInterval(this.lightIntervalValue);
            egret.clearInterval(this.itemLightIntervalValue);
            this.gobtnlight.visible = false;
            this.circlelight.visible = false;
        }
        /**button */
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.gobtn:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.CHARMWHEEL_GO);
                    if (user.getProxy().playInfoVO==null||user.getProxy().playInfoVO.charmScore < 50) {
                        tip.Alert.show("老板，魅力积分不足了！游戏打赏荷官或者发送魔法表情可以获得哦！", null, tip.CHARM_ALERT,
                        function (type: number = tip.YES, isout: number = 0) {
                            if (type == tip.YES) {
                                room.getProxy().fastRoom();
                                __CLOSE_MOUDLE(AppReg.APP_CHARMWHEEL);
                            }
                        }, null, this);
                        return;
                    }
                    if (!getProxy().isRun)
                        __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL);
                    break;
                case this.closebtn:
                    __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
                    break;
                case this.myRecordButton:
                    if (this.selectRecordButton == 0) return;
                    this.selectRecordButton = 0;
                    this.setRecordButton();
                    this.setRecord();
                    __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
                    break;
                case this.allRecordButton:
                    if (this.selectRecordButton == 1) return;
                    this.selectRecordButton = 1;
                    this.setRecordButton();
                    this.setRecord();
                    __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 1);
                    break;
            }
        }
        showRewardLabel(): void {
            var data = {icon: getProxy().rewardList[getProxy().rewardId][1], memo: getProxy().rewardList[getProxy().rewardId][2]};
            __SEND_NOTIFICATION(award.AwardMediator.OPEN_AWARD_UI, data);
        }
        dispose() {
            if (this.finishTimeOutValue) egret.clearTimeout(this.intervalValue);
            if (this.intervalValue) egret.clearInterval(this.intervalValue);
            if (this.lightIntervalValue) egret.clearInterval(this.lightIntervalValue);
            if (this.itemLightIntervalValue) egret.clearInterval(this.itemLightIntervalValue);
            this.sendNotification(app.NetAction.TOOL_RILVER);//获取平台银两
            __REMOVE_PROXY(CharmWheelProxy);
            __REMOVE_MEDIATOR(CharmWheelUIMediator);
            super.dispose();
        }
    }
}