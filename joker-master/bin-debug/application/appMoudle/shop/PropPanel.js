var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/5.
 */
var shop;
(function (shop) {
    var PropPanel = (function () {
        function PropPanel(view) {
            //面板是否是显示状态
            this.$active = false;
            this.uiModule = view;
        }
        PropPanel.prototype.init = function () {
            this.itemList = this.uiModule.itemList;
            this.itemList.itemRenderer = item.PropInfoItem;
        };
        PropPanel.prototype.initDatas = function () {
            var dataProvider = new eui.ArrayCollection(item.getProxy().allPropDatas);
            this.itemList.dataProvider = dataProvider;
        };
        PropPanel.prototype.dispose = function () {
        };
        Object.defineProperty(PropPanel.prototype, "active", {
            get: function () {
                return this.$active;
            },
            set: function (val) {
                this.$active = val;
                this.itemList.visible = this.$active;
            },
            enumerable: true,
            configurable: true
        });
        return PropPanel;
    }());
    shop.PropPanel = PropPanel;
    __reflect(PropPanel.prototype, "shop.PropPanel", ["gameabc.IDisposer"]);
})(shop || (shop = {}));
//# sourceMappingURL=PropPanel.js.map