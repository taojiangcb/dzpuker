var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuiChuChoumaComp = (function (_super) {
        __extends(GuiChuChoumaComp, _super);
        function GuiChuChoumaComp(index) {
            var _this = _super.call(this) || this;
            _this.width = _this.height = 32;
            _this.anchorOffsetX = _this.width >> 1;
            _this.anchorOffsetY = _this.height >> 1;
            _this.touchEnabled = false;
            _this.image = new eui.Image("guichu_icon_gold_png");
            // this.image.source = "guichu_icon_gold_png";//"guichu_icon_chouma_" + (index + 1) + "_png";
            _this.image.x = _this.image.y = 0;
            _this.name = index.toString();
            _this.addChild(_this.image);
            return _this;
        }
        GuiChuChoumaComp.produce = function (index) {
            if (guichu.GuiChuChoumaComp.cacheDict[index] == null)
                guichu.GuiChuChoumaComp.cacheDict[index] = [];
            var dict = guichu.GuiChuChoumaComp.cacheDict[index];
            var chouma;
            if (dict.length > 0)
                chouma = dict.pop();
            else
                chouma = new guichu.GuiChuChoumaComp(index);
            return chouma;
        };
        GuiChuChoumaComp.reclaim = function (chouma) {
            var index = chouma.name;
            if (guichu.GuiChuChoumaComp.cacheDict[index] == null)
                guichu.GuiChuChoumaComp.cacheDict[index] = [];
            var dict = guichu.GuiChuChoumaComp.cacheDict[index];
            if (dict.indexOf(chouma) == -1)
                dict.push(chouma);
        };
        GuiChuChoumaComp.prototype.initPoint = function (index) {
            this.point = new egret.Point(Math.random() * -20 - 5, -Math.random() * 20 - 10);
            switch (index) {
                case 0:
                    this.point.x = this.point.x * -0.8;
                    break;
                case 1:
                    this.point.x = this.point.x * 0.5;
                    break;
                case 4:
                case 5:
                case 6:
                    this.point.x = this.point.x * 1.5;
                    break;
            }
        };
        GuiChuChoumaComp.prototype.rePosition = function () {
            this.image.x = this.image.y = 0;
        };
        Object.defineProperty(GuiChuChoumaComp.prototype, "factor", {
            get: function () {
                return 0;
            },
            set: function (value) {
                this.image.x = 2 * value * (1 - value) * this.point.x + value * value * this.point.x * 2;
                this.image.y = 2 * value * (1 - value) * this.point.y;
            },
            enumerable: true,
            configurable: true
        });
        return GuiChuChoumaComp;
    }(egret.DisplayObjectContainer));
    GuiChuChoumaComp.cacheDict = {};
    guichu.GuiChuChoumaComp = GuiChuChoumaComp;
    __reflect(GuiChuChoumaComp.prototype, "guichu.GuiChuChoumaComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuChoumaComp.js.map