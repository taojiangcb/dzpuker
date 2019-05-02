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
    var MttProductExchangeCodeUIModule = (function (_super) {
        __extends(MttProductExchangeCodeUIModule, _super);
        function MttProductExchangeCodeUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MTTExchangeCodeUIModule.exml";
            return _this;
        }
        MttProductExchangeCodeUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnSend);
            this.bindButton(this.btnClose);
        };
        MttProductExchangeCodeUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this.btnSend) {
                var code = this.txtCode.text.toString();
                match.getProductProxy().activeProduct(code);
            }
            else if (tag == this.btnClose) {
                this.close();
            }
        };
        return MttProductExchangeCodeUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttProductExchangeCodeUIModule = MttProductExchangeCodeUIModule;
    __reflect(MttProductExchangeCodeUIModule.prototype, "match.MttProductExchangeCodeUIModule");
})(match || (match = {}));
//# sourceMappingURL=MttProductExchangeCodeUIModule.js.map