var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tip;
(function (tip) {
    /** 显示字符，并可以设置回调按钮的执行方法，
     * 最后一个数字则表示了到计时次数，当有倒计时的时候，
     * 函数将尝试替换val中的{sec} */
    function popSysTopTimeTooltip(val, recall, recallthis, recallParam) {
        if (recallParam === void 0) { recallParam = null; }
        SysTemTopTimeTooltip.showTip(val, recall, recallthis, recallParam);
    }
    tip.popSysTopTimeTooltip = popSysTopTimeTooltip;
    function changeTopTimeTipStr(str) {
        SysTemTopTimeTooltip.changeTip(str);
    }
    tip.changeTopTimeTipStr = changeTopTimeTipStr;
    function clearSysTopTimeTooltip() {
        SysTemTopTimeTooltip.clearTips();
    }
    tip.clearSysTopTimeTooltip = clearSysTopTimeTooltip;
    var SysTemTopTimeTooltip = (function (_super) {
        __extends(SysTemTopTimeTooltip, _super);
        function SysTemTopTimeTooltip() {
            var _this = _super.call(this) || this;
            _this.skinName = "SysTemTopTimeTooltipSkin";
            _this.percentWidth = 100;
            return _this;
        }
        Object.defineProperty(SysTemTopTimeTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new SysTemTopTimeTooltip();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SysTemTopTimeTooltip.showTip = function (val, recall, recallthis, recallParam) {
            if (recallParam === void 0) { recallParam = null; }
            if (val == null || val.length == 0)
                return;
            this.uiComp.recall = recall;
            this.uiComp.recallthis = recallthis;
            this.uiComp.recallParam = recallParam;
            AppRoot.gameLayer.addChild(this.uiComp);
            this.uiComp.messlab.text = val;
        };
        SysTemTopTimeTooltip.clearTips = function () {
            this.uiComp.recall = null;
            this.uiComp.recallthis = null;
            this.uiComp.removeFromParent();
        };
        SysTemTopTimeTooltip.changeTip = function (val) {
            if (this.uiComp != null && this.uiComp.messlab != null) {
                this.uiComp.messlab.text = val;
            }
        };
        /*该模块被创建完成后的回调函数*/
        SysTemTopTimeTooltip.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btn);
            this.bindButton(this.btnclose);
        };
        /**
        * 子类如果有bindButton, click事件覆盖次方法实现
        */
        SysTemTopTimeTooltip.prototype.touchBindButtonHandler = function (clickTarget) {
            if (clickTarget == this.btn) {
                if (this.recall)
                    this.recall.call(this.recallthis, this.recallParam);
            }
            clearSysTopTimeTooltip();
        };
        return SysTemTopTimeTooltip;
    }(gameabc.UICustomComponent));
    tip.SysTemTopTimeTooltip = SysTemTopTimeTooltip;
    __reflect(SysTemTopTimeTooltip.prototype, "tip.SysTemTopTimeTooltip");
})(tip || (tip = {}));
//# sourceMappingURL=SysTemTopTimeTooltip.js.map