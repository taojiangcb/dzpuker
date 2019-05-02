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
    var LoginOutCommand = (function (_super) {
        __extends(LoginOutCommand, _super);
        function LoginOutCommand() {
            return _super.call(this) || this;
        }
        LoginOutCommand.prototype.execute = function (notification) {
            user.getProxy().gameBool = false;
            gameabc.LocalSO.USERID = "";
            // gameabc.LocalSO.PREFIX = "";
            user.getProxy().clearAllData();
            record.getProxy().clearAllTables();
            mission.getProxy().dispose();
            item.getProxy().clearAllData();
            match.getProxy().clearAllData();
            //清除时间循环监听的函数
            app.SystemTimer.removeAllListeners();
            tip.clearSysCenterTimeTooltip();
            tip.clearSysTopTimeTooltip();
            app.mvc.AppFacade.getInstance().removeCommand(app.NetAction.SRS_CLOSE);
            cy.srsServer.close();
            AppGlobal.isLoginFlag = false;
            guichu.loginLogiC().clearforceLogin();
            // if(__IS_MOUDLE_OPEN(AppReg.LOGIN)) {
            //     var loginUI:login.LoginMoudle = <login.LoginMoudle>__GET_MOUDLE_COMP(AppReg.LOGIN);
            //     loginUI.reGamelogin();
            // } 
            // else {
            //     //打开登录界面
            //     // __CLOSE_ALLMOUDLE_OPEN(AppReg.LOGIN);
            //     __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN);
            // }
            user.getProxy().singFalg = false;
            /**
             * 如果是h5的渠道就可以直接刷新界面
             */
            if (platform.CHANNE_ID == platform.CHANNE_IDS.H5.toString()) {
                var url = "http://download.zgsjl8.com/dz/h5/index.html";
                if (document.location) {
                    url = document.URL;
                    var local_urls = url.split("?");
                    if (local_urls.length > 0) {
                        document.location.href = local_urls[0];
                    }
                    else {
                        document.location.href = url;
                    }
                }
            }
        };
        return LoginOutCommand;
    }(puremvc.SimpleCommand));
    login.LoginOutCommand = LoginOutCommand;
    __reflect(LoginOutCommand.prototype, "login.LoginOutCommand");
})(login || (login = {}));
//# sourceMappingURL=LoginOutCommand.js.map