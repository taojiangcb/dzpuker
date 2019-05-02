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
    var RoomUIMediator = (function (_super) {
        __extends(RoomUIMediator, _super);
        function RoomUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, RoomUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(RoomUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        RoomUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                app.NetAction.RE_TOOL_NUMPLAYERS,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.UPDATE_COIN,
                // app.NetAction.RESP_DEALER_INFO,
                app.constant.AppMediatorConst.DEALERLIST_UPDATE,
                app.constant.AppMediatorConst.PLAYER_NUMBER_UPDATE,
                mission.MissionMediator.UPDATE_MISSION_DAY_UI
            ];
        };
        RoomUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case app.NetAction.RE_TOOL_NUMPLAYERS:
                    this.view.updateRoomList();
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (room.getProxy().currentType == 9 /* GRIL */) {
                        user.getProxy().autoSit(1, false);
                    }
                    // this.view.updateVipTable();
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    this.view.updateCoin();
                    break;
                // case app.NetAction.RESP_DEALER_INFO:
                //     console.log("dealer");
                //     break;
                case consts.DEALERLIST_UPDATE:
                    this.view.updateDealerList(data);
                    break;
                case consts.PLAYER_NUMBER_UPDATE:
                    this.view.sortDealerList();
                    break;
                case mission.MissionMediator.UPDATE_MISSION_DAY_UI:
                    this.view.updateFreeBrokeMission();
                    break;
            }
        };
        return RoomUIMediator;
    }(puremvc.Mediator));
    RoomUIMediator.NAME = "RoomUIMediator";
    room.RoomUIMediator = RoomUIMediator;
    __reflect(RoomUIMediator.prototype, "room.RoomUIMediator");
})(room || (room = {}));
//# sourceMappingURL=RoomUIMediator.js.map