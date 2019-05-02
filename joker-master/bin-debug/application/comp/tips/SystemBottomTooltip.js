var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/3/21.
 */
var tip;
(function (tip) {
    //提示图标
    tip.TIPS_TYPE = {
        TIPS_NOTHING: "",
        TIPS_WARNING: "img_play_tssp_png",
        TIPS_CORRECT: "img_play_tscg_png" //发现模块的标签
    };
    /****
     * type tip.TIPS_TYPE
     */
    function popSysBottomTip(val, type) {
        if (type === void 0) { type = tip.TIPS_TYPE.TIPS_NOTHING; }
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        SystemBottomTooltip.showTip(!str ? val : str, type);
    }
    tip.popSysBottomTip = popSysBottomTip;
    function clearSysBottomTip() {
        SystemBottomTooltip.clearTips();
    }
    tip.clearSysBottomTip = clearSysBottomTip;
    var SystemBottomTooltip = (function () {
        function SystemBottomTooltip() {
        }
        Object.defineProperty(SystemBottomTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new tip.SystemTooltipUIComp();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SystemBottomTooltip.showTip = function (val, _type) {
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
        SystemBottomTooltip.pop = function () {
            var _this = this;
            if (this.tips.length > 0) {
                var obj = this.tips.shift();
                this.curtip = obj.tips;
                this.uiComp.iconStr = obj.type;
                this.uiComp.text = this.curtip;
                this.uiComp.alpha = 0;
                this.uiComp.bottom = 30;
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
        SystemBottomTooltip.clearTips = function () {
            if (this.tweens != null) {
                egret.Tween.removeTweens(this.uiComp);
            }
            if (this.tips.length > 0) {
                this.tips = [];
            }
        };
        return SystemBottomTooltip;
    }());
    SystemBottomTooltip.tips = [];
    SystemBottomTooltip.curtip = "";
    tip.SystemBottomTooltip = SystemBottomTooltip;
    __reflect(SystemBottomTooltip.prototype, "tip.SystemBottomTooltip");
})(tip || (tip = {}));
//# sourceMappingURL=SystemBottomTooltip.js.map