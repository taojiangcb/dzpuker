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
    var JoinUIMediator = (function (_super) {
        __extends(JoinUIMediator, _super);
        function JoinUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, JoinUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(JoinUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        JoinUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                app.constant.AppMediatorConst.MATCH_NONEOPEN
            ];
        };
        JoinUIMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                // case app.NetAction.RE_LEAVE_ROOM:
                //     this.view.gotoVipRoom();
                //     break;
                // case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                // this.view.autoSit();
                // break;
                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    var roomVO = this.view.parseRoomVoFromInput();
                    if (roomVO == null)
                        break;
                    if (roomVO.isVip) {
                        user.getProxy().PKDragInRoom = roomVO.maxBank;
                        user.gotoRoom(roomVO);
                    }
                    else {
                        if (playcards.getProxy().isPlayCard) {
                            uicomps.confirmNeedSilver(true, roomVO.minBank, roomVO.maxBank, false, true, true, function (val) {
                                if (val > 0) {
                                    //**进房间前把带入额缓存下*/
                                    user.getProxy().PKDragInRoom = val;
                                    user.gotoRoom(roomVO);
                                }
                                else {
                                    //退出打牌
                                    playcards.getProxy().outbakfun();
                                }
                            }, this);
                        }
                    }
                    break;
            }
        };
        return JoinUIMediator;
    }(puremvc.Mediator));
    JoinUIMediator.NAME = "JoinUIMediator";
    room.JoinUIMediator = JoinUIMediator;
    __reflect(JoinUIMediator.prototype, "room.JoinUIMediator");
})(room || (room = {}));
//# sourceMappingURL=JoinUIMediator.js.map