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
    var FriendFaceAddUIMediator = (function (_super) {
        __extends(FriendFaceAddUIMediator, _super);
        function FriendFaceAddUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, FriendFaceAddUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(FriendFaceAddUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        FriendFaceAddUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_FRIEND_FACE2FACE,
                consts.UP_USER_FRIEND_FACE2FACE_SUCCESS
            ];
        };
        FriendFaceAddUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.UP_USER_FRIEND_FACE2FACE:
                    this.view.enterRoom(data);
                    break;
                case consts.UP_USER_FRIEND_FACE2FACE_SUCCESS:
                    this.view.addFriendsSuccess();
                    break;
                default:
                    break;
            }
        };
        return FriendFaceAddUIMediator;
    }(app.mvc.AbstractMediator));
    FriendFaceAddUIMediator.NAME = "__FriendFaceAddUIMediator__";
    friend.FriendFaceAddUIMediator = FriendFaceAddUIMediator;
    __reflect(FriendFaceAddUIMediator.prototype, "friend.FriendFaceAddUIMediator");
})(friend || (friend = {}));
//# sourceMappingURL=FriendFaceAddUIMediator.js.map