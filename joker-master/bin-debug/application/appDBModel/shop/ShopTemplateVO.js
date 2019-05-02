var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/4.
 */
var shop;
(function (shop) {
    var ItemTemplateVO = (function () {
        function ItemTemplateVO(templateId, itemName, imgUrl, moneyNum, moneyAdd, addCount, price) {
            this.templateId = 0; //id
            this.itemName = ""; //名称
            this.imgUrl = ""; //图片地址url
            this.moneyNum = 0; //银两数
            this.moneyAdd = 0; //额外增加的银两
            this.addCount = 0; //额外增加的次数
            this.price = 0; //单价
            this.templateId = templateId;
            this.itemName = itemName;
            this.imgUrl = imgUrl;
            this.moneyNum = moneyNum;
            this.moneyAdd = moneyAdd;
            this.addCount = addCount;
            this.price = price;
        }
        return ItemTemplateVO;
    }());
    shop.ItemTemplateVO = ItemTemplateVO;
    __reflect(ItemTemplateVO.prototype, "shop.ItemTemplateVO");
})(shop || (shop = {}));
//# sourceMappingURL=ShopTemplateVO.js.map