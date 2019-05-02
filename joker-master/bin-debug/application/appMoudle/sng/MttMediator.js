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
    /**
     *
     * @author
     *
     */
    var MttMediator = (function (_super) {
        __extends(MttMediator, _super);
        function MttMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, MttMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(MttMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        MttMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_GET_PROP_ATTRS,
                app.NetAction.RE_TOOL_RILVER,
                app.NetAction.MTT_RESPSIGNUP,
                app.NetAction.MTT_UPDATEMATCHSIGNUPS,
                app.constant.AppMediatorConst.UPDATE_MATCH_LIST,
                app.constant.AppMediatorConst.SIGNUP_SUCCESS
            ];
        };
        MttMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                case app.NetAction.MTT_UPDATEMATCHSIGNUPS:
                case app.NetAction.MTT_RESPSIGNUP:
                case app.constant.AppMediatorConst.UPDATE_MATCH_LIST:
                    this.view.updateData();
                    break;
                case app.NetAction.RE_TOOL_RILVER:
                    this.view.updateCoin();
                    break;
                case app.constant.AppMediatorConst.SIGNUP_SUCCESS:
                    this.view.tabToMyList();
                    break;
            }
        };
        return MttMediator;
    }(puremvc.Mediator));
    MttMediator.NAME = "MttMediator";
    match.MttMediator = MttMediator;
    __reflect(MttMediator.prototype, "match.MttMediator");
})(match || (match = {}));
//# sourceMappingURL=MttMediator.js.map