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
    var SystemTooltipUIComp = (function (_super) {
        __extends(SystemTooltipUIComp, _super);
        function SystemTooltipUIComp() {
            var _this = _super.call(this) || this;
            _this.valStr = "";
            _this.iconStr = "";
            _this.changeFlag = false;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        SystemTooltipUIComp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.horizontalCenter = 0;
            //this.bottom = 30;
            this.bgIcon = new eui.Image();
            this.bgIcon.source = "s9_bg_play_fjzjdt_png";
            this.bgIcon.percentWidth = 100;
            this.bgIcon.percentHeight = 100;
            this.addChild(this.bgIcon);
            this.tipIcon = new eui.Image();
            this.tipIcon.width = this.tipIcon.height = 50;
            this.tipIcon.x = 40;
            this.addChild(this.tipIcon);
            this.txtLabel = new eui.Label();
            this.txtLabel.horizontalCenter = 0;
            this.txtLabel.verticalCenter = 0;
            this.txtLabel.textColor = 0xFFFFFF;
            this.txtLabel.size = 24;
            this.txtLabel.minWidth = 150;
            this.txtLabel.wordWrap = false;
            this.txtLabel.multiline = false;
            this.txtLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this.txtLabel);
        };
        SystemTooltipUIComp.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.changeFlag) {
                this.changeFlag = false;
                this.txtLabel.text = this.valStr;
                var addW = 40;
                var addH = 10;
                if (this.iconStr) {
                    this.tipIcon.source = this.iconStr;
                    addW = 150;
                }
                else {
                    addW = 10;
                    this.tipIcon.source = "";
                }
                this.width = this.txtLabel.width + addW + 100;
                this.height = this.txtLabel.height + 10 + 30;
                this.tipIcon.y = (this.height - this.tipIcon.height) / 2;
            }
        };
        Object.defineProperty(SystemTooltipUIComp.prototype, "text", {
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
        return SystemTooltipUIComp;
    }(gameabc.UICustomComponent));
    tip.SystemTooltipUIComp = SystemTooltipUIComp;
    __reflect(SystemTooltipUIComp.prototype, "tip.SystemTooltipUIComp");
})(tip || (tip = {}));
//# sourceMappingURL=SystemTooltipUIComp.js.map