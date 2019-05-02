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
    /**
     *
     * @author
     *
     */
    var HappyStatItem = (function (_super) {
        __extends(HappyStatItem, _super);
        function HappyStatItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyStatItemSkin";
            return _this;
        }
        HappyStatItem.prototype.dataChanged = function () {
            if (this.itemIndex < 1) {
                this.typeIcon.source = "icon_main_zx_png";
            }
            if (this.data) {
                var a = this.data;
                if ((a & 1) == 1) {
                    this.icon1.source = "icon_happy_s_png";
                }
                else {
                    this.icon1.source = "icon_happy_p_png";
                }
                if ((a & 2) == 2) {
                    this.icon2.source = "icon_happy_s_png";
                }
                else {
                    this.icon2.source = "icon_happy_p_png";
                }
                if ((a & 4) == 4) {
                    this.icon3.source = "icon_happy_s_png";
                }
                else {
                    this.icon3.source = "icon_happy_p_png";
                }
                if ((a & 8) == 8) {
                    this.icon4.source = "icon_happy_s_png";
                }
                else {
                    this.icon4.source = "icon_happy_p_png";
                }
            }
        };
        return HappyStatItem;
    }(eui.ItemRenderer));
    happy.HappyStatItem = HappyStatItem;
    __reflect(HappyStatItem.prototype, "happy.HappyStatItem");
})(happy || (happy = {}));
//# sourceMappingURL=HappyStatItem.js.map