var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var games;
(function (games) {
    var GameBaseLogin = (function () {
        function GameBaseLogin() {
        }
        GameBaseLogin.prototype.getUserType = function () {
            return 0 /* GAMETEA */;
        };
        /**
         * 用户登录实现
         *
         * ip 连接的srs ip
         * userName 账号
         * usrPwd   密码|session|other
         * platformType  登录的类型   GAMETEA, //茶苑账号 PTID, //通行证账号 PTGAME, //边锋游戏账号 PLATMENT = 6, //第三方登录 SESSION = 7, //秘钥登录 ANONYMITY = 255 //匿名登录
         * hardwareId pc 设备码
         */
        GameBaseLogin.prototype.onLogin = function (ip, usrName, usrPwd, platformType, hardwareId) {
            if (platformType === void 0) { platformType = 0 /* GAMETEA */; }
            if (hardwareId === void 0) { hardwareId = ""; }
            user.getProxy().loginUserType = platformType;
            user.getProxy().loginName = usrName;
            if (platformType == 7 /* SESSION */) {
                user.getProxy().svrSession = usrPwd;
            }
            user.getProxy().loginPass = usrPwd;
            user.getProxy().hardwareId = hardwareId;
            app.mvc.AppFacade.getInstance().removeCommand(app.NetAction.SRS_CLOSE);
            AppConst.setServer(ip);
            room.setServer(ip.roomType);
            cy.connectSrsServer(ip);
        };
        /**
         * 登录成功
         */
        GameBaseLogin.prototype.onLoginSucceed = function () {
            if (!AppGlobal.isLoginFlag) {
                console.log("登录成功");
                AppGlobal.isLoginFlag = true;
                app.mvc.AppFacade.getInstance().registerCommand(app.NetAction.SRS_CLOSE, cy.ConnectCommands);
                user.getProxy().loginDataInit();
                this.autoJoinRoom();
            }
        };
        /**
         * 登录失败处理
         */
        GameBaseLogin.prototype.onLoginError = function (agin) { };
        /**
         * 强制登录
         */
        GameBaseLogin.prototype.forceLogin = function () { };
        /**
         * 清理强制登录
         */
        GameBaseLogin.prototype.clearforceLogin = function () { };
        /**
         * 自动进入房间&进入房间处理
         */
        GameBaseLogin.prototype.autoJoinRoom = function () { };
        /**
         * 注销
         */
        GameBaseLogin.prototype.onLoginOut = function () { };
        /**
         * 进入房间成功
         */
        GameBaseLogin.prototype.onRoomSucceed = function () { };
        GameBaseLogin.prototype.dispose = function () { };
        return GameBaseLogin;
    }());
    games.GameBaseLogin = GameBaseLogin;
    __reflect(GameBaseLogin.prototype, "games.GameBaseLogin", ["games.ILogin", "gameabc.IDisposer"]);
})(games || (games = {}));
//# sourceMappingURL=GameBaseLogin.js.map