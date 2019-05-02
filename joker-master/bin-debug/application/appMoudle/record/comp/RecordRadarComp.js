var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var record;
(function (record) {
    /**
 *雷达图
 * @author
 *
 */
    var RecordRadarComp = (function (_super) {
        __extends(RecordRadarComp, _super);
        function RecordRadarComp() {
            var _this = _super.call(this) || this;
            _this.currentDIs = null;
            _this.maxLen = 92;
            _this.info1 = 0;
            _this.info2 = 0;
            _this.info3 = 0;
            _this.info4 = 0;
            _this.info5 = 0;
            _this.info6 = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStage, _this);
            _this.skinName = "resource/app_skin/record/RecordRadarCompSkin.exml";
            _this.tarbar = new uicomps.ButtonGroup();
            _this.tarbar.add(_this.tabButton1);
            _this.tarbar.add(_this.tabButton2);
            _this.tarbar.add(_this.tabButton3);
            _this.tabButton1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelectTab, _this);
            _this.tabButton2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelectTab, _this);
            _this.tabButton3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelectTab, _this);
            return _this;
        }
        RecordRadarComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
        };
        RecordRadarComp.prototype.addedToStage = function (evt) {
            this.roleVO = user.getProxy().playInfoVO;
            this.tarbar.select(this.getTabButton(3));
            this.setTab(3);
        };
        RecordRadarComp.prototype.onSelectTab = function (evt) {
            this.setTab(this.getTabConstants(evt.target));
        };
        RecordRadarComp.prototype.getTabButton = function (tabConstants) {
            switch (tabConstants) {
                case 1: return this.tabButton1;
                case 2: return this.tabButton2;
                case 3: return this.tabButton3;
                default: return null;
            }
        };
        RecordRadarComp.prototype.getTabConstants = function (tabButton) {
            switch (tabButton) {
                case this.tabButton1: return 1;
                case this.tabButton2: return 2;
                case this.tabButton3: return 3;
                default: return null;
            }
        };
        RecordRadarComp.prototype.setTab = function (tab) {
            this.currentTab = tab;
            if (this.currentDIs)
                this.currentDIs.removeFromParent(true);
            switch (tab) {
                case 1:
                    break;
                case 2:
                    break;
            }
            this.showRadar();
        };
        RecordRadarComp.prototype.addParent = function () {
        };
        RecordRadarComp.prototype.showRadar = function () {
            this.infoUI1["icon"].source = "img_word_play_type_1_png";
            this.infoUI2["icon"].source = "img_word_play_type_2_png";
            this.infoUI3["icon"].source = "img_word_play_type_3_png";
            this.infoUI4["icon"].source = "img_word_play_type_4_png";
            this.infoUI5["icon"].source = "img_word_play_type_5_png";
            this.infoUI6["icon"].source = "img_word_play_type_6_png";
            this.info1 = 0;
            this.info2 = 0;
            this.info3 = 0;
            this.info4 = 0;
            this.info5 = 0;
            this.info6 = 0;
            if (this.roleVO) {
                this.info1 = this.numberToEvent(this.roleVO.sbJoinHand, this.roleVO.sbHand); //小盲入局数/小盲局数
                this.info2 = this.numberToEvent(this.roleVO.bbJoinHand, this.roleVO.bbHand); //大盲入局数/大盲局数
                this.info3 = this.numberToEvent(this.roleVO.buttonJoinHand, this.roleVO.buttonHand); //庄家入局数/庄家局数
                this.info4 = this.numberToEvent(this.roleVO.spreadWinHand, this.roleVO.spreadHand); //摊牌胜利数/摊牌胜利局数
                //（总胜利数-摊牌胜利数）/（总局数-摊牌局数）
                this.info5 = this.numberToEvent(this.roleVO.winHand - this.roleVO.spreadWinHand, this.roleVO.totalHand - this.roleVO.spreadHand);
                //（总入局数-小盲入局- 大盲入局 -庄家入局）/（总局数-小盲局数-大盲局数-庄家局数）
                this.info6 = this.numberToEvent(this.roleVO.joinHand - this.roleVO.sbJoinHand - this.roleVO.bbJoinHand - this.roleVO.buttonJoinHand, this.roleVO.totalHand - this.roleVO.sbHand - this.roleVO.bbHand - this.roleVO.buttonHand);
            }
            this.infoUI1["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info1); //
            this.infoUI2["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info2); //
            this.infoUI3["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info3); //
            this.infoUI4["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info4); //
            this.infoUI5["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info5); //
            this.infoUI6["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info6); //
            if (this.gImg)
                this.gImg.removeChildren();
            this.shape = new egret.Shape();
            var cdContainer = new egret.DisplayObjectContainer();
            cdContainer.addChild(this.shape);
            this.gImg.addChild(cdContainer);
            this.shape.x = -100;
            this.shape.y = -103;
            this.shape.touchEnabled = false;
            this.shape.graphics.lineStyle(2, 0xffffff);
            this.shape.graphics.beginFill(0x30d1ff, 0.5);
            this.showMoveTO(this.info1);
            this.showLineTO(this.info2, 1);
            this.showLineTO(this.info3, 2);
            this.showLineTO(this.info4, 3);
            this.showLineTO(this.info5, 4);
            this.showLineTO(this.info6, 5);
            this.showLineTO(this.info1, 6);
        };
        /**
        *
        * @param _molecule
        * @param fenm
        */
        RecordRadarComp.prototype.numberToEvent = function (_molecule, fenm) {
            var a = _molecule / fenm;
            if (_molecule == 0 || fenm == 0 || a < 0) {
                return 0.0;
            }
            return Number(a.toFixed(2));
        };
        RecordRadarComp.prototype.showLineTO = function (_a, index) {
            if (_a === void 0) { _a = 0.23; }
            if (index === void 0) { index = 1; }
            var len = this.maxLen * _a;
            var angle = index * 60 / 180 * Math.PI;
            if (index == 6) {
                this.shape.graphics.lineTo(Math.cos(0) * len + 100, Math.sin(0) * len + 100);
            }
            else {
                var tx = Math.cos(angle) * len + 100;
                var ty = Math.sin(angle) * len + 100;
                this.shape.graphics.lineTo(tx, ty);
            }
        };
        RecordRadarComp.prototype.showMoveTO = function (_a) {
            if (_a === void 0) { _a = 0.23; }
            var len = this.maxLen * _a;
            this.shape.graphics.moveTo(Math.cos(0) * len + 100, Math.sin(0) * len + 100);
        };
        RecordRadarComp.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            _super.prototype.dispose.call(this);
        };
        return RecordRadarComp;
    }(gameabc.UICustomComponent));
    record.RecordRadarComp = RecordRadarComp;
    __reflect(RecordRadarComp.prototype, "record.RecordRadarComp");
})(record || (record = {}));
//# sourceMappingURL=RecordRadarComp.js.map