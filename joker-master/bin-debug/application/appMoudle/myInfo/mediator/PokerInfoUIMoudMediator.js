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
    /**
     *
     * @author
     *
     */
    var PokerInfoUIMoudMediato = (function (_super) {
        __extends(PokerInfoUIMoudMediato, _super);
        function PokerInfoUIMoudMediato(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, PokerInfoUIMoudMediato.NAME, viewComponent) || this;
        }
        Object.defineProperty(PokerInfoUIMoudMediato.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        PokerInfoUIMoudMediato.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,
                app.constant.AppMediatorConst.UP_USER_FRIEND
            ];
        };
        PokerInfoUIMoudMediato.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UPDATE_COIN:
                case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    this.view.showEvent(notification.getBody());
                    break;
                case app.constant.AppMediatorConst.UP_USER_FRIEND:
                    this.view.updateFriend(data);
                    break;
            }
        };
        return PokerInfoUIMoudMediato;
    }(puremvc.Mediator));
    PokerInfoUIMoudMediato.NAME = "PokerInfoUIMoudMediato";
    myInfo.PokerInfoUIMoudMediato = PokerInfoUIMoudMediato;
    __reflect(PokerInfoUIMoudMediato.prototype, "myInfo.PokerInfoUIMoudMediato");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=PokerInfoUIMoudMediator.js.map