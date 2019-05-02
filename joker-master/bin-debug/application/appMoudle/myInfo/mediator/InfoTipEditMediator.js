var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myInfo;
(function (myInfo) {
    var InfoTipEditMediator = (function (_super) {
        __extends(InfoTipEditMediator, _super);
        function InfoTipEditMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, InfoTipEditMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(InfoTipEditMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        InfoTipEditMediator.prototype.listNotificationInterests = function () {
            return [
                // app.constant.AppMediatorConst.INFO_TIP_UPDATE,
                app.constant.AppMediatorConst.INFO_TIP_UPDATE
            ];
        };
        InfoTipEditMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.INFO_TIP_UPDATE:
                    // case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;
            }
        };
        return InfoTipEditMediator;
    }(puremvc.Mediator));
    InfoTipEditMediator.NAME = "MyInfoUIMoudMediator";
    myInfo.InfoTipEditMediator = InfoTipEditMediator;
    __reflect(InfoTipEditMediator.prototype, "myInfo.InfoTipEditMediator");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=InfoTipEditMediator.js.map