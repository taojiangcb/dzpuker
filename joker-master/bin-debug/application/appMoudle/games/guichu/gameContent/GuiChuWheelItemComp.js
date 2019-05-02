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
    var GuiChuWheelItemComp = (function (_super) {
        __extends(GuiChuWheelItemComp, _super);
        function GuiChuWheelItemComp(index, isBg) {
            if (isBg === void 0) { isBg = false; }
            var _this = _super.call(this) || this;
            _this.skinName = "GuiChuWheelItemCompSkin";
            _this.anchorOffsetX = 64;
            _this.anchorOffsetY = 240;
            _this.x = _this.y = 280;
            _this.rotation = 15 * index;
            _this.bg.visible = isBg;
            _this.image.visible = !isBg;
            if (isBg) {
                _this.bg.source = "guichu_wheel_xzq_" + (index % 2 + 1) + "_png";
            }
            else {
                _this.image.source = "guichu_icon_hs_s_" + (guichu.getProxy().WHEEL_ITEMS[index] + 1) + "_png";
            }
            return _this;
        }
        GuiChuWheelItemComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        return GuiChuWheelItemComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuWheelItemComp = GuiChuWheelItemComp;
    __reflect(GuiChuWheelItemComp.prototype, "guichu.GuiChuWheelItemComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuWheelItemComp.js.map