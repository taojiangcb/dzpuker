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
    var MttProductExchangeUIModule = (function (_super) {
        __extends(MttProductExchangeUIModule, _super);
        function MttProductExchangeUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MttExchangeProduct.exml";
            return _this;
        }
        MttProductExchangeUIModule.prototype.opening = function () {
            _super.prototype.opening.call(this);
            this.productInfo = this.uiOpenData.ptInfo;
        };
        MttProductExchangeUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnSend);
        };
        //this.touchBindButtonHandler
        MttProductExchangeUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this.btnSend) {
                var usrName = this.txtName.text;
                var phone = this.txtPhone.text;
                if (phone.length != 11) {
                    tip.popSysCenterTip("你电话号码长度不对!");
                    return;
                }
                match.getProductProxy().exchangeProduct(this.productInfo, usrName, phone);
            }
        };
        return MttProductExchangeUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttProductExchangeUIModule = MttProductExchangeUIModule;
    __reflect(MttProductExchangeUIModule.prototype, "match.MttProductExchangeUIModule");
})(match || (match = {}));
//# sourceMappingURL=MttProductExchangeUIModule.js.map