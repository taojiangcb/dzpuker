var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feed;
(function (feed) {
    /**
     *
     * @author
     *
     */
    var FeedUIMoudleMediator = (function (_super) {
        __extends(FeedUIMoudleMediator, _super);
        function FeedUIMoudleMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, FeedUIMoudleMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(FeedUIMoudleMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        FeedUIMoudleMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA
            ];
        };
        FeedUIMoudleMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    break;
            }
        };
        return FeedUIMoudleMediator;
    }(puremvc.Mediator));
    FeedUIMoudleMediator.NAME = "FeedUIMoudleMediator";
    feed.FeedUIMoudleMediator = FeedUIMoudleMediator;
    __reflect(FeedUIMoudleMediator.prototype, "feed.FeedUIMoudleMediator");
})(feed || (feed = {}));
//# sourceMappingURL=FeedUIMoudleMediator.js.map