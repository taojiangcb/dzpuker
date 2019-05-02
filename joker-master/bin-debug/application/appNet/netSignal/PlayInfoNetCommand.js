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
    var PlayInfoNetCommand = (function (_super) {
        __extends(PlayInfoNetCommand, _super);
        function PlayInfoNetCommand() {
            return _super.apply(this, arguments) || this;
        }
        PlayInfoNetCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.SET_PLAY_INFO:
                    if (data) {
                        paramVO.longValues[0] = data[0];
                    }
                    else {
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                    }
                    break;
            }
        };
        PlayInfoNetCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.RE_SET_PLAY_INFO:
                    if (paramVO) {
                        if (paramVO.data.length) {
                            var vo = new appvos.UserInfoVO(paramVO.data[0]);
                        }
                        if (paramVO.longValues[0] == user.getProxy().svrRoleId) {
                            if (vo == null) {
                                //第一次登陆创建自己信息
                                vo = new appvos.UserInfoVO();
                                vo.roleId = user.getProxy().svrRoleId;
                                vo.name = user.getProxy().svrName;
                                vo.totalHand = 0;
                            }
                            user.getProxy().playInfoVO = vo;
                        }
                        this.sendNotification(app.constant.AppMediatorConst.UP_PLAY_INFO_DATA, vo);
                        //用户登录成功
                        this.sendNotification(app.constant.AppMediatorConst.LOGIN_ACTION);
                    }
                    break;
            }
        };
        return PlayInfoNetCommand;
    }(app.MoudleCommand));
    app.PlayInfoNetCommand = PlayInfoNetCommand;
    __reflect(PlayInfoNetCommand.prototype, "app.PlayInfoNetCommand");
})(app || (app = {}));
//# sourceMappingURL=PlayInfoNetCommand.js.map