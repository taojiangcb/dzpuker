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
    /**
     *
     * @author
     *
     */
    var HappyRoomMediator = (function (_super) {
        __extends(HappyRoomMediator, _super);
        function HappyRoomMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, HappyRoomMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HappyRoomMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        HappyRoomMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.TOOL_NUMPLAYERS,
            ];
        };
        HappyRoomMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.TOOL_NUMPLAYERS:
                    this.view.showRoomEvent();
                    break;
            }
        };
        return HappyRoomMediator;
    }(puremvc.Mediator));
    HappyRoomMediator.NAME = "HappyRoomMediator";
    happy.HappyRoomMediator = HappyRoomMediator;
    __reflect(HappyRoomMediator.prototype, "happy.HappyRoomMediator");
})(happy || (happy = {}));
//# sourceMappingURL=HappyRoomMediator.js.map