var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/7.
 */
var shop;
(function (shop) {
    var VipRowItemRenderer = (function (_super) {
        __extends(VipRowItemRenderer, _super);
        function VipRowItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/shop/VipRowSkin.exml";
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        VipRowItemRenderer.prototype.dataChanged = function () {
            if (this.itemIndex % 2 == 0) {
                this.bgColor.visible = true;
            }
            else {
                this.bgColor.visible = false;
            }
            if (this.data) {
                this.txtTitle.text = this.data.title;
                if (this.data.isSwitch) {
                    this.txtV1.text = this.data.values[0] ? "开启" : "-";
                    this.txtV2.text = this.data.values[1] ? "开启" : "-";
                    this.txtV3.text = this.data.values[2] ? "开启" : "-";
                    this.txtV4.text = this.data.values[3] ? "开启" : "-";
                    this.txtV5.text = this.data.values[4] ? "开启" : "-";
                }
                else {
                    this.txtV1.text = this.data.values[0];
                    this.txtV2.text = this.data.values[1];
                    this.txtV3.text = this.data.values[2];
                    this.txtV4.text = this.data.values[3];
                    this.txtV5.text = this.data.values[4];
                }
            }
        };
        return VipRowItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    shop.VipRowItemRenderer = VipRowItemRenderer;
    __reflect(VipRowItemRenderer.prototype, "shop.VipRowItemRenderer");
})(shop || (shop = {}));
//# sourceMappingURL=VipRowItemRenderer.js.map