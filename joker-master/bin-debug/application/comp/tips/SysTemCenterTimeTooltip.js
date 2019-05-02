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
    function popSysCenterTimeTooltip(valSrc, mtime, stime) {
        SysTemCenterTimeTooltip.showTip(valSrc, mtime, stime);
    }
    tip.popSysCenterTimeTooltip = popSysCenterTimeTooltip;
    function clearSysCenterTimeTooltip() {
        SysTemCenterTimeTooltip.clearTips();
    }
    tip.clearSysCenterTimeTooltip = clearSysCenterTimeTooltip;
    var SysTemCenterTimeTooltip = (function (_super) {
        __extends(SysTemCenterTimeTooltip, _super);
        function SysTemCenterTimeTooltip() {
            var _this = _super.call(this) || this;
            _this.skinName = "SysTemCenterTimeTooltipSkin";
            _this.horizontalCenter = 0;
            _this.verticalCenter = -38;
            return _this;
        }
        Object.defineProperty(SysTemCenterTimeTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new SysTemCenterTimeTooltip();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SysTemCenterTimeTooltip.showTip = function (valSrc, mtime, stime) {
            AppRoot.gameLayer.addChild(this.uiComp);
            this.uiComp.messimg.source = valSrc;
            this.uiComp.mlab.text = mtime;
            this.uiComp.slab.text = stime;
        };
        SysTemCenterTimeTooltip.clearTips = function () {
            this.uiComp.removeFromParent();
        };
        return SysTemCenterTimeTooltip;
    }(gameabc.UICustomComponent));
    tip.SysTemCenterTimeTooltip = SysTemCenterTimeTooltip;
    __reflect(SysTemCenterTimeTooltip.prototype, "tip.SysTemCenterTimeTooltip");
})(tip || (tip = {}));
//# sourceMappingURL=SysTemCenterTimeTooltip.js.map