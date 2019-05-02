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
    var FriendMailUIMediator = (function (_super) {
        __extends(FriendMailUIMediator, _super);
        function FriendMailUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, FriendMailUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(FriendMailUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        FriendMailUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_REQUEST
            ];
        };
        FriendMailUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.UP_USER_REQUEST:
                    this.view.initRequestList(data);
                default:
                    break;
            }
        };
        return FriendMailUIMediator;
    }(app.mvc.AbstractMediator));
    FriendMailUIMediator.NAME = "__FriendMailUIMediator__";
    friend.FriendMailUIMediator = FriendMailUIMediator;
    __reflect(FriendMailUIMediator.prototype, "friend.FriendMailUIMediator");
})(friend || (friend = {}));
//# sourceMappingURL=FriendMailUIMediator.js.map