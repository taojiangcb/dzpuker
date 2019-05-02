var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/4.
 */
var appvos;
(function (appvos) {
    var ShopItemVO = (function () {
        function ShopItemVO(id, templateId) {
            this.id = 0; //ÉÌƷid
            this.templateId = 0; //ÉÌƷģ°åid
            this.id = id;
            this.templateId = templateId;
        }
        return ShopItemVO;
    }());
    appvos.ShopItemVO = ShopItemVO;
    __reflect(ShopItemVO.prototype, "appvos.ShopItemVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ShopItemVO.js.map