var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var FriendCommand = (function (_super) {
        __extends(FriendCommand, _super);
        function FriendCommand() {
            return _super.apply(this, arguments) || this;
        }
        FriendCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_GET_USER_FRIEND:
                case app.NetAction.REQ_GET_USER_FRIEND_REQUEST:
                    break;
                case app.NetAction.REQ_SEARCH_USER_FRIEND:
                case app.NetAction.REQ_ADD_USER_FRIEND_REQUEST:
                case app.NetAction.REQ_ADD_USER_FRIEND_DELETE:
                case app.NetAction.REQ_ADD_USER_FRIEND:
                case app.NetAction.REQ_REFUSE_ADD_FRIEND:
                    paramVO.longValues = [data];
                    break;
                case app.NetAction.REQ_ADD_USER_FRIEND_FACE2FACE:
                    paramVO.intValues = [data];
                    break;
                case app.NetAction.REQ_ADD_FACE2FACE_FRIEND:
                    paramVO.intValues = [data[0]];
                    for (var i = 1; i < data.length; i++) {
                        paramVO.longValues.push(data[i]);
                    }
                    break;
                case app.NetAction.REQ_INVITE_FRIEND:
                    paramVO.strValues[0] = data[0];
                    paramVO.strValues[1] = data[1];
                    for (var i = 2; i < data.length; i++) {
                        paramVO.longValues.push(parseInt(data[i]));
                    }
                    break;
                default:
                    break;
            }
        };
        FriendCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_GET_USER_FRIEND:
                    if (paramVO !== null && paramVO.data !== null && paramVO.data.length > 0) {
                        var dataArray = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var friendVO = new appvos.FriendVO(paramVO.data[i]);
                            dataArray.push(friendVO);
                        }
                        __SEND_NOTIFICATION(consts.UP_USER_INVITE, dataArray);
                        __SEND_NOTIFICATION(consts.UP_USER_FRIEND, dataArray);
                    }
                    else {
                        __SEND_NOTIFICATION(consts.UP_USER_INVITE, []);
                        __SEND_NOTIFICATION(consts.UP_USER_FRIEND, []);
                    }
                    break;
                case app.NetAction.RESP_SEARCH_USER_FRIEND:
                    if (paramVO !== null && paramVO.data !== null && paramVO.data.length > 0) {
                        var data = new appvos.FriendVO(paramVO.data[0]);
                        __SEND_NOTIFICATION(consts.UP_USER_SEARCH, data);
                    }
                    else {
                        if (this.recvMessageVO.errorCode == 4) {
                            __SEND_NOTIFICATION(consts.UP_USER_SEARCH);
                        }
                    }
                    break;
                case app.NetAction.RESP_ADD_USER_FRIEND_REQUEST:
                    if (paramVO !== null && paramVO.data !== null) {
                        if (paramVO.data.length == 0) {
                            tip.popSysCenterTip("好友请求已发送");
                        }
                        else {
                            tip.updateTip(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_MAIL, paramVO.data.length);
                        }
                    }
                    break;
                case app.NetAction.RESP_ADD_USER_FRIEND_DELETE:
                    __CLOSE_MOUDLE(AppReg.APP_POKER_INFO);
                    __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
                    break;
                case app.NetAction.RESP_ADD_USER_FRIEND:
                    if (paramVO !== null && paramVO.data !== null && paramVO.data.length > 0) {
                        __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
                    }
                    else {
                        if (this.recvMessageVO.errorCode !== 4) {
                            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND_REQUEST);
                            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
                            tip.popSysCenterTip("添加好友成功");
                        }
                    }
                    break;
                case app.NetAction.RESP_REFUSE_ADD_FRIEND:
                    __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND_REQUEST);
                case app.NetAction.RESP_GET_USER_FRIEND_REQUEST:
                    if (paramVO !== null && paramVO.data !== null && paramVO.data.length > 0) {
                        var dataArray = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var friendVO = new appvos.FriendVO(paramVO.data[i]);
                            dataArray.push(friendVO);
                        }
                        __SEND_NOTIFICATION(consts.UP_USER_REQUEST, dataArray);
                        tip.updateTip(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_MAIL, paramVO.data.length);
                    }
                    else {
                        __SEND_NOTIFICATION(consts.UP_USER_REQUEST);
                        tip.updateTip(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_MAIL, 0);
                    }
                    break;
                case app.NetAction.RESP_INVITE_FRIEND:
                    if (paramVO.strValues.length > 0) {
                        if (user.getProxy().friendStatus != 1 /* NULL */)
                            return;
                        console.log(paramVO.strValues[0]);
                        console.log(paramVO.strValues[1]);
                        var dataArray = paramVO.strValues;
                        // __SEND_NOTIFICATION(consts.UP_FRIEND_INVITE, dataArray);
                        tip.Alert.show("您的好友" + paramVO.strValues[1] + "邀请你参加私人牌局，是否同意？", null, tip.CONFIRM, function (type, isout) {
                            if (type === void 0) { type = tip.YES; }
                            if (isout === void 0) { isout = 0; }
                            if (type == tip.YES) {
                                if (user.getProxy().svrGameData.silver <= 0) {
                                    // tip.popSysCenterTip("您的筹码不足，请先充值");
                                    user.getProxy().openMoney();
                                }
                                else {
                                    __SEND_NOTIFICATION(consts.UP_FRIEND_INVITE, dataArray);
                                }
                            }
                        }, null, this);
                    }
                    else {
                        tip.popSysCenterTip("好友邀请发送成功");
                    }
                    break;
                case app.NetAction.RESP_ADD_USER_FRIEND_FACE2FACE:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.FriendVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.UP_USER_FRIEND_FACE2FACE, dataArray);
                    break;
                case app.NetAction.RESP_ADD_FACE2FACE_FRIEND:
                    if (this.recvMessageVO.errorCode !== 4)
                        __SEND_NOTIFICATION(consts.UP_USER_FRIEND_FACE2FACE_SUCCESS);
                    break;
                default:
                    break;
            }
        };
        FriendCommand.prototype.logFriendVO = function (friendVO) {
            console.log("----------friendVO----------");
            console.log("uid: " + friendVO.uid);
            console.log("fid: " + friendVO.fid);
            console.log("id: " + friendVO.id);
            console.log("time: " + friendVO.time);
            console.log("fName: " + friendVO.fName);
            console.log("faceid: " + friendVO.faceid);
            console.log("status: " + friendVO.status);
            console.log("roomId: " + friendVO.roomId);
        };
        return FriendCommand;
    }(app.MoudleCommand));
    app.FriendCommand = FriendCommand;
    __reflect(FriendCommand.prototype, "app.FriendCommand");
})(app || (app = {}));
//# sourceMappingURL=FriendCommand.js.map