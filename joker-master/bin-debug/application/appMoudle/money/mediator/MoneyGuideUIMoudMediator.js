var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var money;
(function (money) {
    /**
     *
     * @author
     *
     */
    var MoneyGuideUIMoudMediator = (function (_super) {
        __extends(MoneyGuideUIMoudMediator, _super);
        function MoneyGuideUIMoudMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, MoneyGuideUIMoudMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(MoneyGuideUIMoudMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        MoneyGuideUIMoudMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_TOOL_TEMP_SESSION,
                app.constant.AppMediatorConst.UP_USER_INFO_DATA,
                bank.BankUIMoudMediator.BANK_HTTP_RESPONSE
            ];
        };
        MoneyGuideUIMoudMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_TOOL_TEMP_SESSION:
                    this.view.okSetEvent();
                    break;
                case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
                    this.view.showEvent();
                    break;
                case bank.BankUIMoudMediator.BANK_HTTP_RESPONSE:
                    var jsonData = notification.getBody();
                    //  __CLOSE_MOUDLE(AppReg.PRELOAD);
                    __CLOSE_PRELOAD();
                    if (jsonData.error) {
                        tip.popSysCenterTip(jsonData.erro, tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    else {
                        this.uiModule.quickAccount.responseEvent(jsonData.url, jsonData.response);
                    }
                    break;
            }
        };
        Object.defineProperty(MoneyGuideUIMoudMediator.prototype, "uiModule", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_MONEY);
            },
            enumerable: true,
            configurable: true
        });
        return MoneyGuideUIMoudMediator;
    }(puremvc.Mediator));
    MoneyGuideUIMoudMediator.NAME = "MoneyGuideUIMoudMediator";
    MoneyGuideUIMoudMediator.BANK_HTTP_RESPONSE = "MoneyGuideUIMoudMediator";
    money.MoneyGuideUIMoudMediator = MoneyGuideUIMoudMediator;
    __reflect(MoneyGuideUIMoudMediator.prototype, "money.MoneyGuideUIMoudMediator");
})(money || (money = {}));
//# sourceMappingURL=MoneyGuideUIMoudMediator.js.map