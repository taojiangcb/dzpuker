var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/4/25.
 */
var tip;
(function (tip) {
    function popSysCenterTip(val, type) {
        if (type === void 0) { type = tip.TIPS_TYPE.TIPS_NOTHING; }
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        var msg = !str ? val : str;
        console.log(msg);
        SystemCenterTooltip.showTip(msg, type);
    }
    tip.popSysCenterTip = popSysCenterTip;
    function clearSysCenterTip() {
        SystemCenterTooltip.clearTips();
    }
    tip.clearSysCenterTip = clearSysCenterTip;
    var SystemCenterTooltip = (function () {
        function SystemCenterTooltip() {
        }
        Object.defineProperty(SystemCenterTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new tip.SystemTooltipUIComp();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SystemCenterTooltip.showTip = function (val, _type) {
            if (_type === void 0) { _type = tip.TIPS_TYPE.TIPS_NOTHING; }
            if (val == null || val.length == 0)
                return;
            if (this.tweens != null) {
                //egret.Tween.pauseTweens(this.uiComp);
                //this.tweens = null;
                egret.Tween.removeTweens(this.uiComp);
            }
            var obj = { tips: val, type: _type };
            this.tips.push(obj);
            this.pop();
            // if (this.curtip == "") {
            //     var obj = { tips: val,type: _type }
            //     this.tips.push(obj);
            //     this.pop();
            // } else if (this.curtip != val) {
            //     var obj = { tips: val,type: _type }
            //     this.tips.push(obj);
            // }
        };
        SystemCenterTooltip.clearTips = function () {
            if (this.tweens != null) {
                egret.Tween.removeTweens(this.uiComp);
            }
            if (this.tips.length > 0) {
                this.tips = [];
            }
        };
        SystemCenterTooltip.pop = function () {
            var _this = this;
            if (this.tips.length > 0) {
                var obj = this.tips.shift();
                this.curtip = obj.tips;
                this.uiComp.iconStr = obj.type;
                this.uiComp.text = this.curtip;
                this.uiComp.alpha = 0;
                this.uiComp.verticalCenter = 0;
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
        return SystemCenterTooltip;
    }());
    SystemCenterTooltip.tips = [];
    SystemCenterTooltip.curtip = "";
    tip.SystemCenterTooltip = SystemCenterTooltip;
    __reflect(SystemCenterTooltip.prototype, "tip.SystemCenterTooltip");
})(tip || (tip = {}));
//# sourceMappingURL=SystemCenterTooltip.js.map