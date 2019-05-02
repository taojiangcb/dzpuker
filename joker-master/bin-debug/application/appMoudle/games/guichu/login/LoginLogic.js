var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var guichu;
(function (guichu) {
    var loginLogic;
    /**
     * 获取当前登录逻辑单例
     */
    function loginLogiC() {
        if (loginLogic == null) {
            loginLogic = new LoginLogic();
        }
        return loginLogic;
    }
    guichu.loginLogiC = loginLogiC;
    var LoginLogic = (function () {
        function LoginLogic() {
            //********如果5秒自定义模块没有返回信息就强行进入登录**********
            this.forceId = 0;
            this.gamelogic = guichu.gameLogic();
        }
        LoginLogic.prototype.getUserType = function () {
            /**
             * 平台登录都要传0,现在两边平台统一了
             */
            return 0 /* GAMETEA */;
            //  if($GAME_ID$ == GAME_IDS.BF_GUICHU_WHEEL) {
            // 	 return user.LOGIN_TYPE.PTGAME 
            //  } 
            //  else if($GAME_ID$ == GAME_IDS.GUICHU_WHEEL) {
            // 	 return user.LOGIN_TYPE.GAMETEA
            //  }
        };
        /**
         * 用户登录
         *
         */
        LoginLogic.prototype.onLogin = function (ip, usrName, usrPwd, platformType, hardwareId) {
            if (platformType === void 0) { platformType = 0 /* GAMETEA */; }
            if (hardwareId === void 0) { hardwareId = ""; }
            __OPEN_PRELOAD();
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
        LoginLogic.prototype.onLoginSucceed = function () {
            if (!AppGlobal.isLoginFlag) {
                console.log("登录成功");
                AppGlobal.isLoginFlag = true;
                app.mvc.AppFacade.getInstance().registerCommand(app.NetAction.SRS_CLOSE, cy.ConnectCommands);
                user.getProxy().loginDataInit();
                // this.gamelogic.openBankRemaining();
                this.autoJoinRoom();
            }
        };
        //进入房间
        LoginLogic.prototype.autoJoinRoom = function () {
            var roomData = [];
            if (cy.srsServer.connectSrs.roomType == 2 /* AUTO_SRS */) {
                roomData = room.getProxy().zRoom1;
            }
            else if (cy.srsServer.connectSrs.roomType == 1 /* PUBLIC */) {
                roomData = room.getProxy().pRoom1;
            }
            else {
                roomData = room.getProxy().mRoom1;
            }
            user.getProxy().joinRoom(roomData[0]);
        };
        /**
         * 进入房间成功
         */
        LoginLogic.prototype.onRoomSucceed = function () {
            __CLOSE_PRELOAD();
            __CLOSE_ALLMOUDLE_OPEN(AppReg.GUICHU);
            /**发送心跳协议 */
            this.gamelogic.beginHeart();
        };
        /**
         * 注消
         */
        LoginLogic.prototype.onLoginOut = function () {
            this.gamelogic.stopHeart();
            guichu.getProxy().dispose();
            AppGlobal.isLoginFlag = false;
        };
        LoginLogic.prototype.onLoginError = function (agin) {
            this.gamelogic.stopHeart();
            __CLOSE_PRELOAD();
            if (agin) {
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
            }
        };
        LoginLogic.prototype.forceLogin = function () {
            this.forceId = egret.setTimeout(function () {
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_ACTION);
            }, this, 100);
        };
        LoginLogic.prototype.clearforceLogin = function () {
            egret.clearTimeout(this.forceId);
        };
        return LoginLogic;
    }());
    guichu.LoginLogic = LoginLogic;
    __reflect(LoginLogic.prototype, "guichu.LoginLogic", ["games.ILogin"]);
})(guichu || (guichu = {}));
//# sourceMappingURL=LoginLogic.js.map