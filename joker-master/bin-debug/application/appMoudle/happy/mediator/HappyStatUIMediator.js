var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyStatUIMediator = (function (_super) {
        __extends(HappyStatUIMediator, _super);
        function HappyStatUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, HappyStatUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HappyStatUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        HappyStatUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            return [
                netaction.GLXY_RESP_WIN_HISTORY //历史记录
            ];
        };
        HappyStatUIMediator.prototype.handleNotification = function (notification) {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
            if (body instanceof cyvos.GamePackage)
                var message = new appvos.MessageVO(body.data.buffer);
            var proxy = happy.getProxy();
            var act = notification.getName();
            switch (act) {
                case netaction.GLXY_RESP_WIN_HISTORY:
                    this.view.showEvent(message.data.intValues);
                    break;
            }
        };
        return HappyStatUIMediator;
    }(puremvc.Mediator));
    HappyStatUIMediator.NAME = "HappyStatUIMediator";
    happy.HappyStatUIMediator = HappyStatUIMediator;
    __reflect(HappyStatUIMediator.prototype, "happy.HappyStatUIMediator");
})(happy || (happy = {}));
//# sourceMappingURL=HappyStatUIMediator.js.map