var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/5.
 */
var shop;
(function (shop) {
    var ShoppingPanel = (function () {
        function ShoppingPanel(view) {
            //面板是否是显示状态
            this.$active = false;
            this.uiModule = view;
        }
        ShoppingPanel.prototype.init = function () {
            this.shopList = this.uiModule.itemShopList;
            this.shopList.itemRenderer = shop.ShopItemItemRenderer;
        };
        ShoppingPanel.prototype.initDatas = function () {
            var dataProvider = new eui.ArrayCollection(shop.getProxy().shopItems);
            this.shopList.dataProvider = dataProvider;
        };
        ShoppingPanel.prototype.dispose = function () {
        };
        Object.defineProperty(ShoppingPanel.prototype, "active", {
            get: function () {
                return this.$active;
            },
            set: function (val) {
                this.$active = val;
                this.shopList.visible = this.$active;
            },
            enumerable: true,
            configurable: true
        });
        return ShoppingPanel;
    }());
    shop.ShoppingPanel = ShoppingPanel;
    __reflect(ShoppingPanel.prototype, "shop.ShoppingPanel", ["gameabc.IDisposer"]);
})(shop || (shop = {}));
//# sourceMappingURL=ShoppingPanel.js.map