var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var login;
(function (login) {
    var LoginUIMediator = (function (_super) {
        __extends(LoginUIMediator, _super);
        function LoginUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, LoginUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(LoginUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        LoginUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.LOGIN_ACTION,
                consts.LOGIN_FAILED,
                consts.LOGIN_MESS,
                consts.LOGIN_SUCESS_TOHER,
                consts.UPDATE_COIN,
                consts.GAME_CONFIG,
                app.NetAction.SRS_ALL_ERROR,
                app.NetAction.SRS_ERROR
            ];
        };
        LoginUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.LOGIN_ACTION:
                    if (!AppGlobal.isLoginFlag) {
                        this.view.inLogin = false;
                        this.view.loginSuccess();
                    }
                    break;
                case consts.GAME_CONFIG:
                    if (!this.view.inLogin && AppGlobal.isLoginFlag) {
                        this.view.loginSuccess();
                    }
                    break;
                case app.NetAction.SRS_ALL_ERROR:
                    tip.Alert.show("服务器正在维护中");
                case app.NetAction.SRS_ERROR:
                case consts.LOGIN_FAILED:
                    this.view.inLogin = false;
                    this.view.loginFailed();
                    break;
                case consts.LOGIN_MESS:
                    this.view.setMess(data);
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    this.view.rilverUpdate();
                    break;
                case consts.LOGIN_SUCESS_TOHER:
                    user.getProxy().loginUserType = 6 /* PLATMENT */;
                    user.getProxy().loginName = data.uid;
                    user.getProxy().loginPass = data.session + "|1026|" + data.thirdparty;
                    this.view.loginEvent(false);
                    this.view.notCanCacheID$PD = true; //不记录账号信息
                    AppConst.LOGING_CAN_BOOL = false;
                    gameabc.LocalSO.setItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE, 6 /* PLATMENT */);
                    break;
            }
        };
        return LoginUIMediator;
    }(puremvc.Mediator));
    LoginUIMediator.NAME = "LoginUIMediator";
    login.LoginUIMediator = LoginUIMediator;
    __reflect(LoginUIMediator.prototype, "login.LoginUIMediator");
})(login || (login = {}));
//# sourceMappingURL=LoginUIMediator.js.map