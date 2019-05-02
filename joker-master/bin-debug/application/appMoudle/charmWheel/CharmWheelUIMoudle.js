var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charmWheel;
(function (charmWheel) {
    var CharmWheelUIMoudle = (function (_super) {
        __extends(CharmWheelUIMoudle, _super);
        function CharmWheelUIMoudle() {
            var _this = _super.call(this) || this;
            _this.items = [];
            _this.itemLightNumber = 0;
            _this.itemsRotation = [];
            _this.lightTiem = 800;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "CharmWheelUIMoudleSkin";
            __REGISTER_PROXY(charmWheel.CharmWheelProxy);
            __REGISTER_MEDIATOR(charmWheel.CharmWheelUIMediator, _this);
            return _this;
        }
        CharmWheelUIMoudle.prototype.createComplete = function (event) {
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
            this.myRecordListData = new eui.ArrayCollection(charmWheel.getProxy().myRecordList);
            this.myRecordList.dataProvider = this.myRecordListData;
            this.myRecordList.itemRenderer = charmWheel.CharmWheelLabel;
            this.allRecordListData = new eui.ArrayCollection(charmWheel.getProxy().allRecordList);
            this.allRecordList.dataProvider = this.allRecordListData;
            this.allRecordList.itemRenderer = charmWheel.CharmWheelLabel;
            this.gobtnlight.visible = false;
            this.circlelight.visible = false;
            this.showGoButtonLight();
            charmWheel.getProxy().view = this;
            __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
        };
        CharmWheelUIMoudle.prototype.initItems = function () {
            // var randomIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var rewardItems = charmWheel.getProxy().rewardList;
            for (var i = 0; i < rewardItems.length; i++) {
                // var r = Math.floor(Math.random() * randomIds.length);
                // var a = randomIds.splice(r, 1);
                var rewardItem = new charmWheel.CharmWheelItem(rewardItems[i][0], rewardItems[i][1], i, charmWheel.getProxy().rewardSort[i]);
                this.wheel.addChild(rewardItem);
                this.items.push(rewardItem);
                this.itemsRotation.push(charmWheel.getProxy().rewardSort[i]);
            }
        };
        CharmWheelUIMoudle.prototype.start = function (reward) {
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.stopGoButtonLight();
            this.gobtn.touchEnabled = false;
            charmWheel.getProxy().initData(reward, this.wheel.rotation);
            this.intervalValue = egret.setInterval(this.setWheelRotate, this, charmWheel.getProxy().timeInterval);
            utils.SoundUtils.playEffectSound(utils.SoundUtils.meilizhuanpan);
        };
        CharmWheelUIMoudle.prototype.setWheelRotate = function () {
            var rotation = charmWheel.getProxy().getRotation();
            if (rotation < 0) {
                this.finish();
            }
            else {
                this.wheel.rotation += rotation;
            }
        };
        CharmWheelUIMoudle.prototype.finish = function () {
            var _this = this;
            this.finishTimeOutValue = egret.setTimeout(function () {
                _this.showGoButtonLight();
                _this.gobtn.touchEnabled = true;
            }, this, 1000, true);
            // this.items[getProxy().rewardId].showLight();
            charmWheel.getProxy().finishData();
            if (this.intervalValue)
                egret.clearInterval(this.intervalValue);
            this.showReward();
        };
        CharmWheelUIMoudle.prototype.showReward = function () {
            this.showRewardLabel();
            this.refreshRecord();
        };
        /**record */
        CharmWheelUIMoudle.prototype.setRecordButton = function () {
            for (var i = 0; i < this.recordButtons.length; i++) {
                this.recordButtons[i].source = this.selectRecordButton == i ? this.recordButtonImages[i][0] : this.recordButtonImages[i][1];
            }
        };
        CharmWheelUIMoudle.prototype.setRecord = function () {
            this.recordViewStack.selectedIndex = this.selectRecordButton;
        };
        CharmWheelUIMoudle.prototype.refreshRecord = function () {
            if (this.selectRecordButton == 0) {
                __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
            }
        };
        CharmWheelUIMoudle.prototype.refreshMyRecord = function (data) {
            charmWheel.getProxy().myRecordList = data;
            this.myRecordListData.source = charmWheel.getProxy().myRecordList;
            this.myRecordListData.refresh();
        };
        CharmWheelUIMoudle.prototype.refreshAllRecord = function (data) {
            charmWheel.getProxy().allRecordList = data;
            this.allRecordListData.source = charmWheel.getProxy().allRecordList;
            this.allRecordListData.refresh();
        };
        CharmWheelUIMoudle.prototype.refreshNoRecord = function () {
            if (this.selectRecordButton == 0) {
                this.myRecordListData.source = [];
                this.myRecordListData.refresh();
            }
            else {
                this.allRecordListData.source = [];
                this.allRecordListData.refresh();
            }
        };
        CharmWheelUIMoudle.prototype.setCharmValue = function () {
            this.charmValueLabel.text = user.getProxy().playInfoVO.charmScore.toString();
        };
        CharmWheelUIMoudle.prototype.showGoButtonLight = function () {
            this.gobtnlight.visible = true;
            this.circlelight.visible = true;
            this.goButtonLightAnimate();
            this.lightIntervalValue = egret.setInterval(this.goButtonLightAnimate, this, 2000);
            this.itemLightNumber = 10 - Math.floor(this.wheel.rotation / 36);
            ;
            this.itemLightIntervalValue = egret.setInterval(this.itemLightAnimate, this, this.lightTiem);
        };
        CharmWheelUIMoudle.prototype.goButtonLightAnimate = function () {
            var _this = this;
            this.gobtnlight.alpha = 0;
            egret.Tween.get(this.gobtnlight).to({ alpha: 1 }, 1000).call(function () {
                _this.circlelight.alpha = 1;
                egret.Tween.get(_this.circlelight).to({ scaleX: 1.5, scaleY: 1.5 }, 1000);
            }).to({ alpha: 0 }, 1000).call(function () {
                _this.gobtnlight.alpha = 0;
                _this.circlelight.alpha = 0;
                _this.circlelight.scaleX = _this.circlelight.scaleY = 1;
            });
        };
        CharmWheelUIMoudle.prototype.itemLightAnimate = function () {
            var i = this.itemLightNumber % 10;
            this.itemLightNumber++;
            this.items[this.itemsRotation.indexOf(i)].itemLight();
            this.items[this.itemsRotation.indexOf((i + 5) % 10)].itemLight();
        };
        CharmWheelUIMoudle.prototype.stopGoButtonLight = function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].light.visible = false;
            }
            egret.clearInterval(this.lightIntervalValue);
            egret.clearInterval(this.itemLightIntervalValue);
            this.gobtnlight.visible = false;
            this.circlelight.visible = false;
        };
        /**button */
        CharmWheelUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.gobtn:
                    mc2sdk.event(50066 /* CHARMWHEEL_GO */);
                    if (user.getProxy().playInfoVO == null || user.getProxy().playInfoVO.charmScore < 50) {
                        tip.Alert.show("老板，魅力积分不足了！游戏打赏荷官或者发送魔法表情可以获得哦！", null, tip.CHARM_ALERT, function (type, isout) {
                            if (type === void 0) { type = tip.YES; }
                            if (isout === void 0) { isout = 0; }
                            if (type == tip.YES) {
                                room.getProxy().fastRoom();
                                __CLOSE_MOUDLE(AppReg.APP_CHARMWHEEL);
                            }
                        }, null, this);
                        return;
                    }
                    if (!charmWheel.getProxy().isRun)
                        __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL);
                    break;
                case this.closebtn:
                    __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
                    break;
                case this.myRecordButton:
                    if (this.selectRecordButton == 0)
                        return;
                    this.selectRecordButton = 0;
                    this.setRecordButton();
                    this.setRecord();
                    __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 0);
                    break;
                case this.allRecordButton:
                    if (this.selectRecordButton == 1)
                        return;
                    this.selectRecordButton = 1;
                    this.setRecordButton();
                    this.setRecord();
                    __SEND_NOTIFICATION(app.NetAction.REQ_CHARM_WHEEL_LIST, 1);
                    break;
            }
        };
        CharmWheelUIMoudle.prototype.showRewardLabel = function () {
            var data = { icon: charmWheel.getProxy().rewardList[charmWheel.getProxy().rewardId][1], memo: charmWheel.getProxy().rewardList[charmWheel.getProxy().rewardId][2] };
            __SEND_NOTIFICATION(award.AwardMediator.OPEN_AWARD_UI, data);
        };
        CharmWheelUIMoudle.prototype.dispose = function () {
            if (this.finishTimeOutValue)
                egret.clearTimeout(this.intervalValue);
            if (this.intervalValue)
                egret.clearInterval(this.intervalValue);
            if (this.lightIntervalValue)
                egret.clearInterval(this.lightIntervalValue);
            if (this.itemLightIntervalValue)
                egret.clearInterval(this.itemLightIntervalValue);
            this.sendNotification(app.NetAction.TOOL_RILVER); //获取平台银两
            __REMOVE_PROXY(charmWheel.CharmWheelProxy);
            __REMOVE_MEDIATOR(charmWheel.CharmWheelUIMediator);
            _super.prototype.dispose.call(this);
        };
        return CharmWheelUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    charmWheel.CharmWheelUIMoudle = CharmWheelUIMoudle;
    __reflect(CharmWheelUIMoudle.prototype, "charmWheel.CharmWheelUIMoudle");
})(charmWheel || (charmWheel = {}));
//# sourceMappingURL=CharmWheelUIMoudle.js.map