var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/5.
 */
var shop;
(function (shop) {
    var ShopItemItemRenderer = (function (_super) {
        __extends(ShopItemItemRenderer, _super);
        function ShopItemItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/shop/ShopItemSkin.exml";
            return _this;
        }
        ShopItemItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.touchChildren = true;
            this.touchEnabled = false;
            this.addButton(this.buyBtn, true);
        };
        ShopItemItemRenderer.prototype.dataChanged = function () {
            var shopItem = this.data;
            if (shopItem) {
                var addMoney = shopItem.amount - (shop.getProxy().PROPORTION * shopItem.price);
                if (addMoney > 0) {
                    this.txtAddMoney.text = gameabc.getMessage("BUY_SILVER_ADD", FormatUtils.wan(addMoney));
                    this.addGroup.visible = true;
                }
                else {
                    this.addGroup.visible = false;
                }
                this.img.source = gameabc.StringUtils.trim(shopItem.img_url);
                this.txtSilver.text = shopItem.name;
                this.buyBtn.label = "¥" + shopItem.price;
            }
        };
        ShopItemItemRenderer.prototype.click = function (tag) {
            if (this.data) {
                console.log("click buy btn");
                platform.payment(this.data);
            }
            //            var template:shop.ItemTemplateVO = shop.getProxy().getTemplateById(this.data.templateId);
            //            if(template) {
            //                var silverCount:number = template.moneyNum + template.moneyAdd;
            //                var rmb:number = template.price;
            //                var str_contnt:string = gameabc.getMessage("BUY_SILVER_PROMPT",rmb,silverCount);
            //                tip.Alert.show(str_contnt,gameabc.getMessage("BUY_TITLE"),tip.CONFIRM,(flag:number,data:any)=>{
            //                    if(flag == tip.YES) {
            //                        var param:appvos.ParamVO = new appvos.ParamVO();
            //                        param.intValues = [template.templateId];
            //                        __SEND_NOTIFICATION(app.NetAction.BUY_SILVER,param);
            //                    }
            //                },null,this)
            //            }
        };
        Object.defineProperty(ShopItemItemRenderer.prototype, "shopView", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.SHOP_WIN);
            },
            enumerable: true,
            configurable: true
        });
        return ShopItemItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    shop.ShopItemItemRenderer = ShopItemItemRenderer;
    __reflect(ShopItemItemRenderer.prototype, "shop.ShopItemItemRenderer");
})(shop || (shop = {}));
//# sourceMappingURL=ShopItemItemRenderer.js.map