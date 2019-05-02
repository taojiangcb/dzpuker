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
    var FriendUIMediator = (function (_super) {
        __extends(FriendUIMediator, _super);
        function FriendUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, FriendUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(FriendUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        FriendUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_FRIEND,
                consts.UP_USER_SEARCH,
                consts.DEALERFOCUSLIST_UPDATE,
                consts.DEALERLIST_UPDATE
            ];
        };
        FriendUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.UP_USER_FRIEND:
                    this.view.initFriendList(data);
                    break;
                case consts.UP_USER_SEARCH:
                    this.view.getSearchResult(data);
                    break;
                case consts.DEALERFOCUSLIST_UPDATE:
                    this.view.updateDealerFollowGroup(data);
                    break;
                case consts.DEALERLIST_UPDATE:
                    this.view.openDealerOnlineList(data);
                    break;
            }
        };
        return FriendUIMediator;
    }(app.mvc.AbstractMediator));
    FriendUIMediator.NAME = "__FriendUIMediator__";
    friend.FriendUIMediator = FriendUIMediator;
    __reflect(FriendUIMediator.prototype, "friend.FriendUIMediator");
})(friend || (friend = {}));
//# sourceMappingURL=FriendUIMediator.js.map