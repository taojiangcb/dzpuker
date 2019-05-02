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
    var HeadNetCommand = (function (_super) {
        __extends(HeadNetCommand, _super);
        function HeadNetCommand() {
            return _super.apply(this, arguments) || this;
        }
        HeadNetCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.GET_HEAD_INFO:
                    if (data) {
                        paramVO.longValues[0] = data[0];
                        if (data[0] == user.getProxy().svrRoleId) {
                            paramVO.strValues[0] = user.getProxy().svrName;
                        }
                    }
                    else {
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                        paramVO.strValues[0] = user.getProxy().svrName;
                    }
                    // console.log("longValues[0]",paramVO.longValues[0],user.getProxy().svrRoleId);
                    break;
                case app.NetAction.SET_HEAD_INFO:
                    paramVO.longValues[0] = user.getProxy().svrRoleId;
                    paramVO.strValues = data;
                    break;
                case app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST:
                    if (data) {
                        paramVO.longValues = data;
                    }
                    else {
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                    }
                    break;
            }
        };
        HeadNetCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.RE_SET_HEAD_INFO:
                    if (paramVO) {
                        user.getProxy().svrHeadId = Number(paramVO.strValues[0]);
                    }
                    break;
                case app.NetAction.RE_GET_HEAD_INFO:
                    if (paramVO) {
                        var labelvo;
                        if (paramVO.longValues[0] == user.getProxy().svrRoleId) {
                            user.getProxy().svrHeadId = Number(paramVO.strValues[0]);
                        }
                        else {
                            if (paramVO.data.length > 0) {
                                labelvo = new appvos.UserLabelVO(paramVO.data[0]);
                            }
                        }
                        var tablevo = playcards.getTableVO();
                        if (tablevo) {
                            var id = paramVO.longValues[0];
                            for (var i = 0, len = tablevo.seatPlayerVO.length; i < len; i++) {
                                if (tablevo.seatPlayerVO[i].roleId == id) {
                                    tablevo.seatPlayerVO[i].avatarID = paramVO.strValues[0];
                                    if (labelvo == null) {
                                        labelvo = new appvos.UserLabelVO();
                                        labelvo.userId = id;
                                    }
                                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.INFO_TIP_UPDATE, labelvo);
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case app.NetAction.PROCESS_XYID_RESP_GET_USER_LIST:
                    if (paramVO) {
                        var len = paramVO.data.length;
                        if (len) {
                            var allArr = [];
                            for (var i = 0; i < len; i++) {
                                var vo = new appvos.UserInfoVO(paramVO.data[i]);
                                allArr.push(vo);
                            }
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_PLAY_INFO_DATA, allArr);
                        }
                    }
                    break;
            }
        };
        return HeadNetCommand;
    }(app.MoudleCommand));
    app.HeadNetCommand = HeadNetCommand;
    __reflect(HeadNetCommand.prototype, "app.HeadNetCommand");
})(app || (app = {}));
//# sourceMappingURL=HeadNetCommand.js.map