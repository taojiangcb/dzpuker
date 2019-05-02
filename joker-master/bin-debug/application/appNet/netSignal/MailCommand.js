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
    var MailCommand = (function (_super) {
        __extends(MailCommand, _super);
        function MailCommand() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MailCommand.prototype, "url", {
            get: function () {
                return AppConst.CONNECT_SERVER.mail;
            },
            enumerable: true,
            configurable: true
        });
        MailCommand.prototype.resultHandler = function (action, paramVO) {
            if (paramVO != null) {
                switch (action) {
                    case app.NetAction.IMS_READ_NUM:
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ_NUM, paramVO.intValues[0]);
                        break;
                    case app.NetAction.IMS_GETS:
                        user.getProxy().ImsVO = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var imsVO = new appvos.ImsVO(paramVO.data[i]);
                            user.getProxy().ImsVO.push(imsVO);
                        }
                        user.getProxy().ImsVO.sort(function (a, b) {
                            return b.createTime - a.createTime;
                        });
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_GETS);
                        break;
                    case app.NetAction.IMS_READ:
                        var id = this.sendParamVO.longValues[0];
                        var i;
                        for (i = 0; i < user.getProxy().ImsVO.length; i++) {
                            if (user.getProxy().ImsVO[i].id == id) {
                                user.getProxy().ImsVO[i].flag = 2;
                                break;
                            }
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ);
                        var j;
                        for (j = 0; j < user.getProxy().ImsVO.length; j++) {
                            if (user.getProxy().ImsVO[j].flag == 1)
                                break;
                        }
                        if (j == user.getProxy().ImsVO.length) {
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ_NUM, 0);
                        }
                        __OPEN_MOUDLE(AppReg.APP_MAIL_SUB, user.getProxy().ImsVO[i]);
                        break;
                    default:
                        break;
                }
            }
            else
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR"), tip.TIPS_TYPE.TIPS_WARNING); //获取数据失败
        };
        return MailCommand;
    }(app.HttpCommand));
    app.MailCommand = MailCommand;
    __reflect(MailCommand.prototype, "app.MailCommand");
})(app || (app = {}));
//# sourceMappingURL=MailCommand.js.map