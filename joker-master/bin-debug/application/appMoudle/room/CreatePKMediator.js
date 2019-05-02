var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/9/13.
 */
var room;
(function (room) {
    var CreatePKMediator = (function (_super) {
        __extends(CreatePKMediator, _super);
        function CreatePKMediator(view) {
            return _super.call(this, CreatePKMediator.NAME, view) || this;
        }
        CreatePKMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.MATCH_NONEOPEN,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN
            ];
        };
        CreatePKMediator.prototype.handleNotification = function (notification) {
            var name = notification.getName();
            switch (name) {
                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    var uiView = __GET_MOUDLE_COMP(AppReg.CREATE_PK_ROOM);
                    if (uiView) {
                        uiView.openPlayCall();
                    }
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (room.getProxy().currentType == 7 /* PK */
                        || room.getProxy().currentType == 3 /* VIP */) {
                        if (playcards.getProxy().joinNumber == null) {
                            user.getProxy().autoSit();
                        }
                        else {
                            user.getProxy().vipSit(playcards.getProxy().joinNumber);
                        }
                        break;
                    }
                /**PK房输光了站起,然后从新坐下时的带入操作处理*/
                case app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN:
                    var curRoom = room.getProxy().current;
                    if (curRoom) {
                        if (room.getProxy().currentType == 7 /* PK */ && playcards.getProxy().isPlayCard) {
                            uicomps.confirmNeedSilver(true, curRoom.minBank, curRoom.maxBank, false, true, false, function (val) {
                                if (val > 0) {
                                    user.getProxy().PKDragInRoom = val;
                                    __PVO().i(user.getProxy().PKDragInRoom).to(app.NetAction.MATCH_TAKEIN);
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
        return CreatePKMediator;
    }(app.mvc.AbstractMediator));
    CreatePKMediator.NAME = "__CREATE_PK_MEDIATOR__";
    room.CreatePKMediator = CreatePKMediator;
    __reflect(CreatePKMediator.prototype, "room.CreatePKMediator");
})(room || (room = {}));
//# sourceMappingURL=CreatePKMediator.js.map