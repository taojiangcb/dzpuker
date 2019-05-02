var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var LoginMediator = (function (_super) {
        __extends(LoginMediator, _super);
        function LoginMediator(name, ui) {
            var _this = _super.call(this, LoginMediator.NAME, ui) || this;
            _this.loginC = guichu.loginLogiC();
            return _this;
        }
        LoginMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.LOGIN_ACTION,
                consts.LOGIN_FAILED,
                consts.LOGIN_MESS,
                consts.LOGIN_SUCESS_TOHER,
                consts.UPDATE_COIN,
                consts.GAME_CONFIG,
                consts.FORCE_LOGIN,
                app.NetAction.SRS_ALL_ERROR,
                app.NetAction.SRS_ERROR,
                app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED,
                app.constant.AppMediatorConst.LOGIN_OUT,
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION,
                app.constant.AppMediatorConst.JOIN_ROOM_FAULT //进入房间失败
            ];
        };
        LoginMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.FORCE_LOGIN:
                    guichu.loginLogiC().forceLogin();
                    break;
                case consts.LOGIN_ACTION:
                    this.loginC.onLoginSucceed();
                    break;
                case consts.GAME_CONFIG:
                    break;
                case app.NetAction.SRS_ALL_ERROR:
                    tip.Alert.show("服务器正在维护中", "登陆", tip.CONFIRM, function (type) {
                        _this.loginC.onLoginError(type == tip.YES);
                    }, null, this);
                case app.NetAction.SRS_ERROR:
                case consts.LOGIN_FAILED:
                    var failMsg = notification.getBody();
                    if (failMsg) {
                        tip.Alert.show(failMsg, "登陆", tip.CONFIRM, function (type) {
                            _this.loginC.onLoginError(type == tip.YES);
                        }, null, this);
                    }
                    else {
                        this.loginC.onLoginError(false);
                    }
                    break;
                case app.constant.AppMediatorConst.JOIN_ROOM_FAULT:
                    var flag = notification.getBody();
                    if (flag == 1) {
                        tip.Alert.show("进入房间超时，进入房间失败", "登陆", tip.CONFIRM, function (type) {
                            _this.loginC.onLoginError(type == tip.YES);
                        }, null, this);
                    }
                    else {
                        this.loginC.onLoginError(false);
                    }
                case consts.LOGIN_MESS:
                    // this.view.setMess(data);
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    // this.view.rilverUpdate();
                    break;
                case consts.LOGIN_SUCESS_TOHER:
                    // user.getProxy().loginUserType = user.LOGIN_TYPE.PLATMENT;
                    // user.getProxy().loginName = data.uid;
                    // user.getProxy().loginPass = data.session+"|1026|"+data.thirdparty;
                    // this.view.loginEvent(false);
                    // this.view.notCanCacheID$PD = true;    //不记录账号信息
                    // AppConst.LOGING_CAN_BOOL = false;
                    // gameabc.LocalSO.setItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE, user.LOGIN_TYPE.PLATMENT);
                    break;
                case app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED:
                    guichu.loginLogiC().onRoomSucceed();
                    break;
                case app.constant.AppMediatorConst.LOGIN_OUT:
                    guichu.loginLogiC().onLoginOut();
                    break;
                case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
                    guichu.loginLogiC().onLoginOut();
                    guichu.gameLogic().gameStart();
                    break;
            }
        };
        return LoginMediator;
    }(app.mvc.AbstractMediator));
    LoginMediator.NAME = "__GUICHU_LOGIN_MEDIATOR__";
    guichu.LoginMediator = LoginMediator;
    __reflect(LoginMediator.prototype, "guichu.LoginMediator");
})(guichu || (guichu = {}));
//# sourceMappingURL=LoginMediator.js.map