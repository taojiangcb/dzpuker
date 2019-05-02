var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttMoudle = (function (_super) {
        __extends(MttMoudle, _super);
        function MttMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "MttSkin";
            return _this;
        }
        MttMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.registerMediator(match.MttMediator);
            this.bindTabButton(this.tab1Button, this.tab2Button, this.tab3Button, this.tab5Button);
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
        };
        MttMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            var mttDisplayList = []; //要展示的比赛列表
            switch (clickTarget) {
                case this.infoButton:
                    __OPEN_MOUDLE(AppReg.SNG_RULE, 5 /* MTT */);
                    return;
                case this.rwardButton:
                    __OPEN_MOUDLE(AppReg.MTT_STATE);
                    return;
                case this.tab1Button:
                    mttDisplayList = match.getProxy().getAllMttList();
                    // mttDisplayList = match.getProxy().getNearMatchList();
                    break;
                case this.tab2Button:
                    mttDisplayList = match.getProxy().getSubList(1 /* SILVER */);
                    break;
                case this.tab3Button:
                    mttDisplayList = match.getProxy().getSubList(8 /* REDPACK */);
                    break;
                    // case this.tab4Button: //浙牌汇
                    mttDisplayList = match.getProxy().getSubList(2 /* ZHEPAI */);
                    break;
                case this.tab5Button:
                    mttDisplayList = match.getProxy().getMyMttList();
                    //因为文字与break外的不同，所以独立写
                    if (mttDisplayList == null || mttDisplayList.length == 0) {
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
            }
            else {
                this.noMatchLabel.visible = false;
                this.tableList.dataProvider = new eui.ArrayCollection(mttDisplayList);
                this.tableList.visible = true;
            }
        };
        /** 更新列表状态 */
        MttMoudle.prototype.updateData = function () {
            this.touchBindButtonHandler(this.buttonGroup.selectedButton);
            var myMttList = match.getProxy().getMyMttList();
            this.redImage.visible = myMttList != null && myMttList.length > 0; //是否有自己的比赛
            if (myMttList.length == 0 && this.buttonGroup.selectedButton == this.tab5Button) {
                this.selectTabButton(0);
            }
        };
        /** 更新筹码数量 */
        MttMoudle.prototype.updateCoin = function () {
            if (user.getProxy().svrGameData != null) {
                this.txtCou.text = FormatUtils.qian(user.getProxy().svrGameData.silver) + "";
            }
        };
        MttMoudle.prototype.tabToMyList = function () {
            this.buttonGroup.select(this.tab5Button);
            this.touchBindButtonHandler(this.tab5Button);
        };
        MttMoudle.prototype.close = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        };
        return MttMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    match.MttMoudle = MttMoudle;
    __reflect(MttMoudle.prototype, "match.MttMoudle");
})(match || (match = {}));
//# sourceMappingURL=MttMoudle.js.map