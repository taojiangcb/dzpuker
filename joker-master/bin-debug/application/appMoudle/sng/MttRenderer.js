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
    var MttRenderer = (function (_super) {
        __extends(MttRenderer, _super);
        function MttRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "MttRendererSkin";
            _this.touchEnabled = false;
            _this.timeLabel1.text = "";
            _this.timeLabel2.text = "";
            _this.tipLabel1.visible = false;
            _this.tipLabel2.visible = false;
            _this.enterButton.visible = false;
            _this.signButton.visible = false;
            _this.clickArea = new eui.Rect(_this.width, _this.height);
            _this.clickArea.alpha = 0;
            _this.addChildAt(_this.clickArea, _this.numChildren - 4);
            _this.addButton(_this.enterButton);
            _this.addButton(_this.signButton);
            _this.addButton(_this.clickArea);
            _this.timerId = egret.setInterval(_this.timerStep, _this, 330);
            if (true &&
                (AppConst.CONNECT_SERVER.roomType == 0 /* INTERNAL */ ||
                    AppConst.CONNECT_SERVER.roomType == 3 /* MINE_57 */)) {
                _this.addButton(_this.testButton1);
                _this.testButton1.visible = true;
                _this.addButton(_this.testButton2);
                _this.testButton2.visible = true;
            }
            else {
                _this.testButton1.visible = false;
                _this.testButton2.visible = false;
            }
            return _this;
        }
        Object.defineProperty(MttRenderer.prototype, "matchVO", {
            // createComplete(evt:egret.Event):void {
            //     super.createComplete(evt);
            // }
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        MttRenderer.prototype.dataChanged = function () {
            this.timeLabel1.text = "";
            this.timeLabel2.text = "";
            //参赛人数
            this.onlineLabel.text = String(this.matchVO.numPlayers);
            //总奖额部分
            if (this.matchVO.allRewards > 0) {
                this.rank1Label.text = FormatUtils.wan(this.matchVO.allRewards);
            }
            else {
                this.rank1Label.text = "";
            }
            //红包赛特殊处理
            if (this.matchVO.category & 8 /* REDPACK */) {
                this.tipLabel3.visible = true;
            }
            else {
                this.tipLabel3.visible = false;
            }
            //显示价格或门票的部分
            var ticket = match.getProxy().getTicket(this.matchVO.matchId);
            if (ticket != null && ticket.num > 0) {
                this.ticketImage.source = ticket.template.icon + "_png";
                this.ticketGroup.visible = true;
                this.entryFeeLabel.visible = false;
                this.coinImage.visible = false;
                this.ticketLabel.text = "" + ticket.num;
            }
            else {
                this.entryFeeLabel.text = this.matchVO.entryFee + "+" + this.matchVO.tax; //+"["+this.matchVO.matchId+"]";
                this.ticketGroup.visible = false;
                this.entryFeeLabel.visible = true;
                this.coinImage.visible = true;
            }
            //最前面的ICON部分
            this.bgImage.source = "icon_sng_bg_type3_png";
            if (this.matchVO.category & 8) {
                this.titleImage.source = "iw_yuanhongbaosai_png";
                this.iconImage.source = "icon_sng_poker_3_png";
            }
            else {
                this.titleImage.source = "iw_dezhoubihuanlesai_mtt_png";
                this.iconImage.source = "icon_sng_poker_2_png";
            }
            this.timerStep();
        };
        MttRenderer.prototype.timerStep = function () {
            var time = this.matchVO.startTime - match.getSvrTime();
            //===== 报名按钮区的处理 ======================
            this.signButton.visible = false;
            this.enterButton.visible = false;
            this.tipLabel1.visible = false;
            this.tipLabel2.visible = false;
            if (this.matchVO.isSigned) {
                if (time > 2 * 60 * 1000) {
                    this.tipLabel1.text = "等待开赛";
                    this.tipLabel1.visible = true;
                    this.tipLabel2.text = "(已报名)";
                    this.tipLabel2.visible = true;
                }
                else {
                    this.enterButton.visible = true;
                }
            }
            else {
                if (match.getSvrTime() > this.matchVO.signupStartTime) {
                    //报名截止时间到
                    if (match.getSvrTime() > this.matchVO.signupEndTime) {
                        this.tipLabel1.text = "报名截止";
                        this.tipLabel1.visible = true;
                    }
                    else {
                        this.signButton.visible = true;
                    }
                }
                else {
                    //太早了，报名未开放
                    this.tipLabel1.text = "未开启报名";
                    this.tipLabel1.visible = true;
                    var str = DateUtils.dateFormat(this.matchVO.signupStartTime, "hh:mm");
                    this.tipLabel2.text = str + "开启报名";
                    this.tipLabel2.visible = true;
                }
            }
            //===== 时间显示区的处理 =======================
            var date = new Date(this.matchVO.startTime);
            if (this.matchVO.svrStatus == 3 /* MATCH */ || time < 0) {
                this.timeLabel1.text = "";
                this.timeLabel2.text = "开赛中";
                this.playingImage.visible = true;
            }
            else if (time < 600000) {
                this.timeLabel1.text = "即将开始";
                this.timeLabel2.text = DateUtils.dateFormat(new Date(time), "mm:ss");
                this.playingImage.visible = false;
            }
            else {
                if (DateUtils.isToday(this.matchVO.startTime)) {
                    this.timeLabel1.text = "今天";
                }
                else {
                    if (DateUtils.theDayAfterTomorrow(this.matchVO.startTime)) {
                        this.timeLabel1.text = DateUtils.dateFormat(date, "MM月dd日");
                    }
                    else {
                        this.timeLabel1.text = "明天";
                    }
                }
                this.timeLabel2.text = DateUtils.dateFormat(new Date(this.matchVO.startTime), "hh:mm");
                this.playingImage.visible = false;
            }
        };
        MttRenderer.prototype.click = function (tag) {
            switch (tag) {
                case this.clickArea:
                    __OPEN_MOUDLE(AppReg.MTT_STATE, this.matchVO);
                    return;
                case this.signButton:
                    mc2sdk.event(50089 /* MTT_SIGN */);
                case this.testButton2:
                    match.getProxy().signMatch(this.matchVO.matchId);
                    return;
                case this.enterButton:
                    mc2sdk.event(50091 /* MTT_JOIN1 */);
                case this.testButton1:
                    match.getProxy().reConnectMatch(this.matchVO);
                    return;
            }
        };
        MttRenderer.prototype.dispose = function () {
            this.dispose();
            egret.clearInterval(this.timerId);
        };
        return MttRenderer;
    }(uicomps.BaseItemCilckRenderer));
    match.MttRenderer = MttRenderer;
    __reflect(MttRenderer.prototype, "match.MttRenderer");
})(match || (match = {}));
//# sourceMappingURL=MttRenderer.js.map