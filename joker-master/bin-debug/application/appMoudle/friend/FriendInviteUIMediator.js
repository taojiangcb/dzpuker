var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var friend;
(function (friend) {
    var FriendInviteUIMediator = (function (_super) {
        __extends(FriendInviteUIMediator, _super);
        function FriendInviteUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, FriendInviteUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(FriendInviteUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        FriendInviteUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_INVITE
            ];
        };
        FriendInviteUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.UP_USER_INVITE:
                    this.view.initInviteList(data);
                    break;
            }
        };
        return FriendInviteUIMediator;
    }(app.mvc.AbstractMediator));
    FriendInviteUIMediator.NAME = "__FriendInviteUIMediator__";
    friend.FriendInviteUIMediator = FriendInviteUIMediator;
    __reflect(FriendInviteUIMediator.prototype, "friend.FriendInviteUIMediator");
})(friend || (friend = {}));
//# sourceMappingURL=FriendInviteUIMediator.js.map