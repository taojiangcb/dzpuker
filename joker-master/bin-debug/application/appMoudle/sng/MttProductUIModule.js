var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttProductUIModule = (function (_super) {
        __extends(MttProductUIModule, _super);
        function MttProductUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MttProductListUIModule.exml";
            return _this;
        }
        MttProductUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var listLayout = new eui.VerticalLayout();
            listLayout.gap = 0;
            this.list_product.itemRenderer = match.MttProductItemRenderer;
            this.list_product.layout = listLayout;
            this.bindButton(this.btnExchangeNum);
            this.bindButton(this.btnHistory);
            this.bindButton(this.btnClose);
            __REGISTER_MEDIATOR(match.MttExchangeMediator);
            // match.getProductProxy().updateProductList();//话费列表
            match.getProductProxy().updateRedpackList(); //红包列表
        };
        MttProductUIModule.prototype.updateList = function () {
            var listData = new eui.ArrayCollection(match.getProductProxy().product_list);
            this.list_product.dataProvider = listData;
        };
        MttProductUIModule.prototype.updateItem = function (productInfo) {
            var listData = this.list_product.dataProvider;
            if (listData) {
                listData.itemUpdated(productInfo);
            }
        };
        MttProductUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this.btnExchangeNum) {
                __OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE_CODE);
            }
            else if (tag == this.btnHistory) {
                __OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE_HISTORY);
            }
            else if (tag == this.btnClose) {
                this.close();
            }
        };
        MttProductUIModule.prototype.dispose = function () {
            __REMOVE_MEDIATOR(match.MttExchangeMediator);
            _super.prototype.dispose.call(this);
        };
        return MttProductUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttProductUIModule = MttProductUIModule;
    __reflect(MttProductUIModule.prototype, "match.MttProductUIModule");
})(match || (match = {}));
//# sourceMappingURL=MttProductUIModule.js.map