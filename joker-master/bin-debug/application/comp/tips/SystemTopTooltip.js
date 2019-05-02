var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/4/25.
 */
var tip;
(function (tip) {
    function popSysTopTip(val, type) {
        if (type === void 0) { type = tip.TIPS_TYPE.TIPS_NOTHING; }
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        SystemTopTooltip.showTip(!str ? val : str, type);
    }
    tip.popSysTopTip = popSysTopTip;
    function clearSysTopTip() {
        SystemTopTooltip.clearTips();
    }
    tip.clearSysTopTip = clearSysTopTip;
    var SystemTopTooltip = (function () {
        function SystemTopTooltip() {
        }
        Object.defineProperty(SystemTopTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new tip.SystemTooltipUIComp();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SystemTopTooltip.showTip = function (val, _type) {
            if (_type === void 0) { _type = tip.TIPS_TYPE.TIPS_NOTHING; }
            if (val == null || val.length == 0)
                return;
            if (this.curtip == "") {
                var obj = { tips: val, type: _type };
                this.tips.push(obj);
                this.pop();
            }
            else if (this.curtip != val) {
                var obj = { tips: val, type: _type };
                this.tips.push(obj);
            }
        };
        SystemTopTooltip.clearTips = function () {
            if (this.tweens != null) {
                egret.Tween.removeTweens(this.uiComp);
            }
            if (this.tips.length > 0) {
                this.tips = [];
            }
        };
        SystemTopTooltip.pop = function () {
            var _this = this;
            if (this.tips.length > 0) {
                var obj = this.tips.shift();
                this.curtip = obj.tips;
                this.uiComp.iconStr = obj.type;
                this.uiComp.text = this.curtip;
                this.uiComp.alpha = 0;
                this.uiComp.top = 0;
                this.tweens = egret.Tween.get(this.uiComp);
                this.tweens.to({ alpha: 1 }, 300, egret.Ease.sineOut)
                    .wait(1300)
                    .to({ alpha: 0 }, 300, egret.Ease.sineOut)
                    .call(function () {
                    _this.pop();
                    _this.curtip = "";
                }, this, null);
                AppRoot.gameLayer.addChild(this.uiComp);
            }
            else {
                this.curtip = "";
                this.uiComp.removeFromParent();
            }
        };
        return SystemTopTooltip;
    }());
    SystemTopTooltip.tips = [];
    SystemTopTooltip.curtip = "";
    tip.SystemTopTooltip = SystemTopTooltip;
    __reflect(SystemTopTooltip.prototype, "tip.SystemTopTooltip");
})(tip || (tip = {}));
//# sourceMappingURL=SystemTopTooltip.js.map