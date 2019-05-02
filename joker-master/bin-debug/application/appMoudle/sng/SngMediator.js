var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    /**
     *
     * @author
     *
     */
    var SngMediator = (function (_super) {
        __extends(SngMediator, _super);
        function SngMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, SngMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(SngMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        SngMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_GET_PROP_ATTRS,
                app.NetAction.RE_TOOL_RILVER,
                app.constant.AppMediatorConst.UPDATE_MATCH_LIST,
                app.NetAction.SNG_UPDATEMATCHSIGNUPS
            ];
        };
        SngMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                case app.constant.AppMediatorConst.UPDATE_MATCH_LIST:
                case app.NetAction.SNG_UPDATEMATCHSIGNUPS:
                    this.view.updateData();
                    break;
                case app.NetAction.RE_TOOL_RILVER:
                    this.view.updateCoin();
                    break;
            }
        };
        return SngMediator;
    }(puremvc.Mediator));
    SngMediator.NAME = "SngMediator";
    sng.SngMediator = SngMediator;
    __reflect(SngMediator.prototype, "sng.SngMediator");
})(sng || (sng = {}));
//# sourceMappingURL=SngMediator.js.map