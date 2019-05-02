var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/4/25.
 */
var tip;
(function (tip) {
    function popSysRollTopTip(val, type) {
        if (type === void 0) { type = tip.TIPS_TYPE.TIPS_NOTHING; }
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        SystemRollTooltip.showTip(!str ? val : str, type);
    }
    tip.popSysRollTopTip = popSysRollTopTip;
    function clearSysRollTopTip() {
        SystemRollTooltip.clearTips();
    }
    tip.clearSysRollTopTip = clearSysRollTopTip;
    var GROUP_HEIGHT = 40;
    var SystemRollTooltip = (function () {
        function SystemRollTooltip() {
        }
        Object.defineProperty(SystemRollTooltip, "uiComp", {
            get: function () {
                if (this.uiView == null) {
                    this.uiView = new SystemRollTooltipUIComp();
                }
                return this.uiView;
            },
            enumerable: true,
            configurable: true
        });
        SystemRollTooltip.showTip = function (val, _type) {
            if (_type === void 0) { _type = tip.TIPS_TYPE.TIPS_NOTHING; }
            if (val == null || val.length == 0)
                return;
            if (this.curtip == "") {
                var obj = { tips: val, type: _type };
                this.tips.push(obj);
                this.pop();
            }
            else if (this.checktips(val)) {
                var obj = { tips: val, type: _type };
                this.tips.push(obj);
            }
        };
        SystemRollTooltip.checktips = function (val) {
            var inTips = false;
            for (var i = 0; i < this.tips.length; i++) {
                if (this.tips[i].tips == val) {
                    inTips = true;
                    break;
                }
            }
            return (this.curtip != val && !inTips);
        };
        SystemRollTooltip.clearTips = function () {
            if (this.tweens != null) {
                egret.Tween.pauseTweens(this.uiComp.group);
                this.tweens = null;
            }
            if (this.tips.length > 0) {
                this.tips = [];
            }
        };
        SystemRollTooltip.pop = function () {
            var _this = this;
            if (this.tips.length > 0) {
                var obj = this.tips.shift();
                this.curtip = obj.tips;
                this.uiComp.iconStr = obj.type;
                this.uiComp.text = this.curtip;
                AppRoot.gameLayer.addChild(this.uiComp);
                var ui = this.uiComp.group;
                var groupWidth = this.uiComp.getContentWidth();
                var groupHeight = 40;
                var startX = AppGlobal.stageFullWidth - Number(this.uiComp.left) - Number(this.uiComp.right);
                var toX = -groupWidth;
                var dir = (startX + groupWidth) * 500 / 40;
                ui.x = startX;
                this.tweens = egret.Tween.get(ui);
                this.tweens.to({ x: toX }, dir).call(function () {
                    egret.Tween.removeTweens(ui);
                    _this.pop();
                    // this.curtip = "";
                });
            }
            else {
                this.curtip = "";
                this.uiComp.removeFromParent(true);
            }
        };
        return SystemRollTooltip;
    }());
    SystemRollTooltip.tips = [];
    SystemRollTooltip.curtip = "";
    tip.SystemRollTooltip = SystemRollTooltip;
    __reflect(SystemRollTooltip.prototype, "tip.SystemRollTooltip");
    var SystemRollTooltipUIComp = (function (_super) {
        __extends(SystemRollTooltipUIComp, _super);
        function SystemRollTooltipUIComp() {
            var _this = _super.call(this) || this;
            _this.valStr = "";
            _this.iconStr = "";
            _this.changeFlag = false;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.left = _this.right = 0;
            _this.top = 0;
            _this.height = GROUP_HEIGHT;
            return _this;
        }
        SystemRollTooltipUIComp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.horizontalCenter = 0;
            this.bg = new eui.Rect();
            this.bg.fillColor = 0;
            this.bg.fillAlpha = 0.5;
            this.bg.percentWidth = 100;
            this.bg.percentHeight = 100;
            this.addChild(this.bg);
            this.tipIcon = new eui.Image();
            this.tipIcon.width = this.tipIcon.height = GROUP_HEIGHT;
            this.txtLabel = new eui.Label();
            // this.txtLabel.horizontalCenter = 0;
            // this.txtLabel.verticalCenter = 0;
            this.txtLabel.textColor = 0xFFFFFF;
            this.txtLabel.size = 24;
            this.txtLabel.minWidth = 150;
            this.txtLabel.wordWrap = false;
            this.txtLabel.multiline = false;
            this.txtLabel.textAlign = egret.HorizontalAlign.LEFT;
            this.group = new eui.Group();
            this.group.addChild(this.tipIcon);
            this.group.addChild(this.txtLabel);
            var hlayout = new eui.HorizontalLayout();
            hlayout.gap = 10;
            hlayout.verticalAlign = "middle";
            this.group.layout = hlayout;
            this.group.addChild(this.tipIcon);
            this.group.addChild(this.txtLabel);
            this.addChild(this.group);
        };
        SystemRollTooltipUIComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var rWidth = AppGlobal.stageFullWidth - Number(this.left) - Number(this.right);
            this.mask = new egret.Rectangle(0, 0, rWidth, this.height);
        };
        SystemRollTooltipUIComp.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.changeFlag) {
                this.changeFlag = false;
                this.txtLabel.text = this.valStr;
                if (this.iconStr) {
                    this.tipIcon.source = this.iconStr;
                }
                else {
                    this.tipIcon.source = "";
                }
                this.group.width = this.txtLabel.width + 50;
                this.tipIcon.y = (this.group.height - this.tipIcon.height) / 2;
            }
        };
        SystemRollTooltipUIComp.prototype.getContentWidth = function () {
            var fontFamily = egret.TextField.default_fontFamily;
            var strWidth = egret.sys.measureText(this.valStr, fontFamily, 24, false, false);
            return strWidth + 50 + 10;
        };
        Object.defineProperty(SystemRollTooltipUIComp.prototype, "text", {
            get: function () {
                return this.valStr;
            },
            set: function (val) {
                this.valStr = val;
                this.changeFlag = true;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        return SystemRollTooltipUIComp;
    }(gameabc.UICustomComponent));
    tip.SystemRollTooltipUIComp = SystemRollTooltipUIComp;
    __reflect(SystemRollTooltipUIComp.prototype, "tip.SystemRollTooltipUIComp");
})(tip || (tip = {}));
//# sourceMappingURL=SystemRollTooltip.js.map