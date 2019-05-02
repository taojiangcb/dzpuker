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
    var MyInfoUIMoudMediator = (function (_super) {
        __extends(MyInfoUIMoudMediator, _super);
        function MyInfoUIMoudMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, MyInfoUIMoudMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(MyInfoUIMoudMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        MyInfoUIMoudMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.NetAction.RE_SET_PLAY_INFO
            ];
        };
        MyInfoUIMoudMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UPDATE_COIN:
                case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;
            }
        };
        return MyInfoUIMoudMediator;
    }(puremvc.Mediator));
    MyInfoUIMoudMediator.NAME = "MyInfoUIMoudMediator";
    myInfo.MyInfoUIMoudMediator = MyInfoUIMoudMediator;
    __reflect(MyInfoUIMoudMediator.prototype, "myInfo.MyInfoUIMoudMediator");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=MyInfoUIMoudMediator.js.map