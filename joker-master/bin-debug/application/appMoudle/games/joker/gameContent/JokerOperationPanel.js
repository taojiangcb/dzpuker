var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏的操作控制面板
 */
var joker;
(function (joker) {
    var JokerOperationPanel = (function (_super) {
        __extends(JokerOperationPanel, _super);
        function JokerOperationPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/joker/JokerOperationTableSkin.exml";
            return _this;
        }
        JokerOperationPanel.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.countInput.stepValues = joker.getProxy().handlerCount;
            this.levelInput.stepValues = [1, 2, 3, 4, 5];
            this.moneyInput.stepValues = joker.getProxy().ratios;
            this.bindButton(this.btnMaxBet);
            this.bindButton(this.btnFapai);
            this.countInput.addEventListener(egret.Event.CHANGE, this.gameCountChange, this);
            this.levelInput.addEventListener(egret.Event.CHANGE, this.gameRatioChange, this);
            this.moneyInput.addEventListener(egret.Event.CHANGE, this.gameMoneyChange, this);
        };
        /**
         * 设置手牌次数
         */
        JokerOperationPanel.prototype.gameCountChange = function (event) {
            var value = event.data;
            joker.getProxy().nowCount = value;
            console.log("设置下注的门数%d", value);
            __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_CONT_CHANGE, value);
        };
        /**
         * 设置下注的倍率
         */
        JokerOperationPanel.prototype.gameRatioChange = function (event) {
            var value = event.data;
            joker.getProxy().nowRatio = value;
            console.log("设置了下注的倍率%d", value);
            __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_RATIO_CHANGE);
        };
        /**
         * 设置下注额
         */
        JokerOperationPanel.prototype.gameMoneyChange = function (event) {
        };
        JokerOperationPanel.prototype.touchBindButtonHandler = function (tag) {
            var tar = tag;
            switch (tar) {
                case this.btnFapai:
                    if (this.btnFapai.currentState == "fapai") {
                        joker.getProxy().nowCount = this.countInput.chrooseValue;
                        joker.getProxy().nowRatio = this.levelInput.chrooseValue;
                        joker.getProxy().nowBet = this.moneyInput.chrooseValue;
                        if (joker.getProxy().validation()) {
                            var tempCardValues = joker.getProxy().getFiveRandomCard();
                            __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_FA_PAI, tempCardValues);
                        }
                        this.fapaiState();
                    }
                    else {
                        this.awardState();
                        __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_AWARD);
                    }
                    break;
                case this.btnMaxBet:
                    break;
            }
        };
        JokerOperationPanel.prototype.awardState = function () {
            this.countInput.enabled = false;
            this.levelInput.enabled = false;
            this.moneyInput.enabled = false;
            this.btnMaxBet.currentState = "disabled";
            this.btnMaxBet.enabled = false;
            this.btnFapai.currentState = "disabled";
            this.btnFapai.enabled = false;
        };
        JokerOperationPanel.prototype.fapaiState = function () {
            this.countInput.enabled = false;
            this.levelInput.enabled = false;
            this.moneyInput.enabled = false;
            this.btnMaxBet.currentState = "disabled";
            this.btnMaxBet.enabled = false;
            this.btnFapai.currentState = "huanpai";
            this.btnFapai.enabled = true;
        };
        JokerOperationPanel.prototype.normalState = function () {
            this.countInput.enabled = true;
            this.levelInput.enabled = true;
            this.moneyInput.enabled = true;
            this.btnMaxBet.currentState = "normal";
            this.btnMaxBet.enabled = true;
            this.btnFapai.currentState = "fapai";
            this.btnFapai.enabled = true;
        };
        return JokerOperationPanel;
    }(gameabc.UICustomComponent));
    joker.JokerOperationPanel = JokerOperationPanel;
    __reflect(JokerOperationPanel.prototype, "joker.JokerOperationPanel");
})(joker || (joker = {}));
//# sourceMappingURL=JokerOperationPanel.js.map