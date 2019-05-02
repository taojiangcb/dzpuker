var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyRuleMoudle = (function (_super) {
        __extends(HappyRuleMoudle, _super);
        function HappyRuleMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "HappyRuleSkin";
            _this.tarbar = new uicomps.ButtonGroup();
            return _this;
        }
        HappyRuleMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tarbar.add(this.playRuleButton);
            this.tarbar.add(this.payRuleButton);
            this.tarbar.add(this.rewardRuleButton);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            var tabIndex = this.uiOpenData;
            var tabArr = [this.playRuleButton, this.rewardRuleButton, this.payRuleButton];
            this.tarbar.select(tabArr[tabIndex]);
            this.touchBindButtonHandler(tabArr[tabIndex]);
            var rule2 = gameabc.getMessage("HAPPY_RULE1", happy.getTableVO().servicePay * happy.getProxy().addTimes);
            this.label1.text = rule2;
            this.label2.text = gameabc.getMessage("HAPPY_RULE2");
            this.label3.text = gameabc.getMessage("HAPPY_REWARD1");
            this.label4.text = gameabc.getMessage("HAPPY_REWARD2");
        };
        HappyRuleMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.playRuleButton:
                    this.playRuleGroup.visible = true;
                    this.playRewardGroup.visible = false;
                    this.payRuleGroup.visible = false;
                    return;
                case this.rewardRuleButton:
                    this.playRuleGroup.visible = false;
                    this.playRewardGroup.visible = true;
                    this.payRuleGroup.visible = false;
                    return;
                case this.payRuleButton:
                    this.playRuleGroup.visible = false;
                    this.playRewardGroup.visible = false;
                    this.payRuleGroup.visible = true;
                    return;
            }
        };
        return HappyRuleMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    happy.HappyRuleMoudle = HappyRuleMoudle;
    __reflect(HappyRuleMoudle.prototype, "happy.HappyRuleMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyRuleMoudle.js.map