var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    /**
     *
     * @author
     *
     */
    var AppMainUIMediator = (function (_super) {
        __extends(AppMainUIMediator, _super);
        function AppMainUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, AppMainUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(AppMainUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        AppMainUIMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION,
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.NetAction.RE_GET_HEAD_INFO,
                app.NetAction.RE_SET_HEAD_INFO,
                app.constant.AppMediatorConst.UP_USER_INFO_DATA,
                app.constant.AppMediatorConst.NOTICE_INIT,
                app.constant.AppMediatorConst.IMS_READ_NUM,
                app.constant.AppMediatorConst.GAME_OUT,
                app.constant.AppMediatorConst.UP_FRIEND_INVITE,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.NetAction.RESP_REFRESH_MAIL
            ];
        };
        AppMainUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
                    this.view.restartGame();
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                case app.NetAction.RE_SET_HEAD_INFO:
                case app.NetAction.RE_GET_HEAD_INFO:
                case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
                    this.view.showDate();
                    break;
                case app.NetAction.RE_LEAVE_ROOM:
                    room.getProxy().fastRoom();
                    //this.view.gotoRoom();
                    break;
                case app.constant.AppMediatorConst.NOTICE_INIT:
                    this.view.initNotice(data);
                    break;
                case app.constant.AppMediatorConst.IMS_READ_NUM:
                    tip.updateTip(AppConst.COUNT_SUB_TAG.MAIL_MOUDLE, data);
                    break;
                case app.constant.AppMediatorConst.GAME_OUT:
                    break;
                case app.constant.AppMediatorConst.UP_FRIEND_INVITE:
                    user.getProxy().friendRoomid = parseInt(data[0]);
                    user.getProxy().joinRoom(room.getProxy().getRoomVOByJoinNumber(data[0]));
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (user.getProxy().friendRoomid !== null) {
                        user.getProxy().vipSit(user.getProxy().friendRoomid.toString());
                    }
                    break;
                case app.NetAction.RESP_REFRESH_MAIL:
                    this.view.getMailNum();
                    break;
            }
        };
        return AppMainUIMediator;
    }(puremvc.Mediator));
    AppMainUIMediator.NAME = "AppMainUIMediator";
    main.AppMainUIMediator = AppMainUIMediator;
    __reflect(AppMainUIMediator.prototype, "main.AppMainUIMediator");
})(main || (main = {}));
//# sourceMappingURL=AppMainUIMediator.js.map