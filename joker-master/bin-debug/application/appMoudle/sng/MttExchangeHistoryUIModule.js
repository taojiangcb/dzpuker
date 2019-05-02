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
    var MttExchangeHistoryUIModule = (function (_super) {
        __extends(MttExchangeHistoryUIModule, _super);
        function MttExchangeHistoryUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MttExchangeHistoryUIModule.exml";
            return _this;
        }
        MttExchangeHistoryUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var layoutVal = new eui.VerticalLayout();
            layoutVal.gap = 0;
            // this.list_history.itemRenderer = MttHistoryItemRenderer;
            // this.list_history.layout = layoutVal;
            // match.getProductProxy().getHistory();
            match.getProductProxy().getRedpackHistory();
            this.bindButton(this.btnClose);
        };
        MttExchangeHistoryUIModule.prototype.fullDatas = function (ls) {
            if (ls == null || ls.length == 0) {
                this.tipLabel.visible = true;
                this.list_history.visible = false;
            }
            else {
                var dataCollection = new eui.ArrayCollection(ls);
                this.list_history.dataProvider = dataCollection;
            }
        };
        MttExchangeHistoryUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (this.btnClose == tag) {
                this.close();
            }
        };
        return MttExchangeHistoryUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttExchangeHistoryUIModule = MttExchangeHistoryUIModule;
    __reflect(MttExchangeHistoryUIModule.prototype, "match.MttExchangeHistoryUIModule");
})(match || (match = {}));
//# sourceMappingURL=MttExchangeHistoryUIModule.js.map