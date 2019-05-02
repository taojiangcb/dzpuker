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
    var debug;
    (function (debug) {
        /**
         *
         * @author
         *
         */
        var DebugMediator = (function (_super) {
            __extends(DebugMediator, _super);
            function DebugMediator(viewComponent) {
                if (viewComponent === void 0) { viewComponent = null; }
                return _super.call(this, DebugMediator.NAME, viewComponent) || this;
            }
            Object.defineProperty(DebugMediator.prototype, "view", {
                get: function () {
                    return this.viewComponent;
                },
                enumerable: true,
                configurable: true
            });
            DebugMediator.prototype.listNotificationInterests = function () {
                return [
                    app.constant.AppMediatorConst.LOG_DEBUG
                ];
            };
            DebugMediator.prototype.handleNotification = function (notification) {
                var data = notification.getBody();
                switch (notification.getName()) {
                    case app.constant.AppMediatorConst.LOG_DEBUG:
                        this.view.outputLabel.text = data;
                        break;
                }
            };
            return DebugMediator;
        }(puremvc.Mediator));
        DebugMediator.NAME = "DebugMediator";
        debug.DebugMediator = DebugMediator;
        __reflect(DebugMediator.prototype, "app.debug.DebugMediator");
    })(debug = app.debug || (app.debug = {}));
})(app || (app = {}));
//# sourceMappingURL=DebugMediator.js.map