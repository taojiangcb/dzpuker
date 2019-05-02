var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var AppDelegateMediator = (function (_super) {
        __extends(AppDelegateMediator, _super);
        function AppDelegateMediator(name, viewComponent) {
            return _super.call(this, AppDelegateMediator.NAME, viewComponent) || this;
        }
        AppDelegateMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        AppDelegateMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
            }
        };
        return AppDelegateMediator;
    }(app.mvc.AbstractMediator));
    AppDelegateMediator.NAME = "__AppDelegateMediator__";
    app.AppDelegateMediator = AppDelegateMediator;
    __reflect(AppDelegateMediator.prototype, "app.AppDelegateMediator");
})(app || (app = {}));
//# sourceMappingURL=AppDelegateMediator.js.map