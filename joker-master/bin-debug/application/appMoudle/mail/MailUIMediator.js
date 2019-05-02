var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mail;
(function (mail) {
    var MailUIMediator = (function (_super) {
        __extends(MailUIMediator, _super);
        function MailUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, MailUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(MailUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        MailUIMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.IMS_GETS,
                app.constant.AppMediatorConst.IMS_READ
            ];
        };
        MailUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.IMS_GETS:
                    this.view.initList();
                    break;
                case app.constant.AppMediatorConst.IMS_READ:
                    this.view.refreshData();
                    break;
                default:
                    break;
            }
        };
        return MailUIMediator;
    }(app.mvc.AbstractMediator));
    MailUIMediator.NAME = "__MailUIMediator__";
    mail.MailUIMediator = MailUIMediator;
    __reflect(MailUIMediator.prototype, "mail.MailUIMediator");
})(mail || (mail = {}));
//# sourceMappingURL=MailUIMediator.js.map