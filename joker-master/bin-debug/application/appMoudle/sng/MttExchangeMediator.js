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
    var MttExchangeMediator = (function (_super) {
        __extends(MttExchangeMediator, _super);
        function MttExchangeMediator(view) {
            return _super.call(this, MttExchangeMediator.NAME, view) || this;
        }
        MttExchangeMediator.prototype.listNotificationInterests = function () {
            return [
                MttExchangeMediator.UPDATE_PRODUCT_LIST,
                MttExchangeMediator.UPDATE_PRODUCT_ITEM,
                MttExchangeMediator.EXCHANGE_RESULT,
                MttExchangeMediator.EXCHANGE_CODE_RESULT,
                MttExchangeMediator.EXCHANGE_HISTORY
            ];
        };
        MttExchangeMediator.prototype.handleNotification = function (notification) {
            var name = notification.getName();
            switch (name) {
                case MttExchangeMediator.UPDATE_PRODUCT_LIST:
                    var view = this.getProductListView();
                    if (view) {
                        view.updateList();
                    }
                    break;
                case MttExchangeMediator.UPDATE_PRODUCT_ITEM:
                    break;
                case MttExchangeMediator.EXCHANGE_RESULT:
                    __CLOSE_MOUDLE(AppReg.MTT_EXCHANGE);
                    break;
                case MttExchangeMediator.EXCHANGE_CODE_RESULT:
                    __CLOSE_MOUDLE(AppReg.MTT_EXCHANGE_CODE);
                    break;
                case MttExchangeMediator.EXCHANGE_HISTORY:
                    var ls = notification.getBody();
                    var win = this.getHistoryListView();
                    if (win) {
                        win.fullDatas(ls);
                    }
                    break;
            }
        };
        MttExchangeMediator.prototype.getProductListView = function () {
            if (__IS_MOUDLE_OPEN(AppReg.MTT_PRODUCT)) {
                return __GET_MOUDLE_COMP(AppReg.MTT_PRODUCT);
            }
        };
        MttExchangeMediator.prototype.getHistoryListView = function () {
            if (__IS_MOUDLE_OPEN(AppReg.MTT_EXCHANGE_HISTORY)) {
                return __GET_MOUDLE_COMP(AppReg.MTT_EXCHANGE_HISTORY);
            }
        };
        return MttExchangeMediator;
    }(app.mvc.AbstractMediator));
    MttExchangeMediator.NAME = "__MttExchangeMediator__";
    MttExchangeMediator.UPDATE_PRODUCT_LIST = "updateProductList_exchange"; //刷新列表显示
    MttExchangeMediator.UPDATE_PRODUCT_ITEM = "updateProductItem"; //更新某单项数据
    MttExchangeMediator.EXCHANGE_RESULT = "exchange_mtt_result"; //兑换成功
    MttExchangeMediator.EXCHANGE_CODE_RESULT = "exchange_code_succeed"; //兑换激活成功
    MttExchangeMediator.EXCHANGE_HISTORY = "exchangeHistory"; //兑换历史记录
    match.MttExchangeMediator = MttExchangeMediator;
    __reflect(MttExchangeMediator.prototype, "match.MttExchangeMediator");
})(match || (match = {}));
//# sourceMappingURL=MttExchangeMediator.js.map