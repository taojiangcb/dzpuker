var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bank;
(function (bank) {
    /**
     *
     * @author
     *
     */
    var BankUIMoudMediator = (function (_super) {
        __extends(BankUIMoudMediator, _super);
        function BankUIMoudMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, BankUIMoudMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(BankUIMoudMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        BankUIMoudMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_TRANSFER_SILVER,
                app.NetAction.RE_JOIN_ROOM,
                app.NetAction.RE_TOOL_TEMP_SESSION,
                bank.BankUIMoudMediator.BANK_HTTP_RESPONSE
            ];
        };
        BankUIMoudMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_TRANSFER_SILVER:
                    this.view.showEvent();
                    break;
                case app.NetAction.RE_JOIN_ROOM:
                    this.view.showEvent();
                    break;
                case app.NetAction.RE_TOOL_TEMP_SESSION:
                    this.view.okSetEvent();
                    break;
                case BankUIMoudMediator.BANK_HTTP_RESPONSE:
                    var jsonData = notification.getBody();
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
        Object.defineProperty(BankUIMoudMediator.prototype, "uiModule", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_BANK);
            },
            enumerable: true,
            configurable: true
        });
        return BankUIMoudMediator;
    }(puremvc.Mediator));
    BankUIMoudMediator.NAME = "BankUIMoudMediator";
    BankUIMoudMediator.BANK_HTTP_RESPONSE = "BANK_HTTP_RESPONSE";
    bank.BankUIMoudMediator = BankUIMoudMediator;
    __reflect(BankUIMoudMediator.prototype, "bank.BankUIMoudMediator");
})(bank || (bank = {}));
//# sourceMappingURL=BankUIMoudMediator.js.map