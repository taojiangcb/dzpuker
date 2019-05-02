var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var CreateUIMediator = (function (_super) {
        __extends(CreateUIMediator, _super);
        function CreateUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, CreateUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(CreateUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        CreateUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                // app.NetAction.RE_LEAVE_ROOM,
                // app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.MATCH_NONEOPEN
            ];
        };
        CreateUIMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case app.NetAction.RE_LEAVE_ROOM:
                    this.view.gotoVipRoom();
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    // this.view.autoSit();
                    if (room.getProxy().currentType == 3 /* VIP */) {
                        if (playcards.getProxy().joinNumber == null) {
                            user.getProxy().autoSit();
                        }
                        else {
                            user.getProxy().vipSit(playcards.getProxy().joinNumber);
                        }
                        break;
                    }
                    this.view.close();
                    break;
                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    this.view.openPlayCall();
                    break;
            }
        };
        return CreateUIMediator;
    }(puremvc.Mediator));
    CreateUIMediator.NAME = "CreateUIMediator";
    room.CreateUIMediator = CreateUIMediator;
    __reflect(CreateUIMediator.prototype, "room.CreateUIMediator");
})(room || (room = {}));
//# sourceMappingURL=CreateUIMediator.js.map