var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var joker;
(function (joker) {
    var loginC;
    function shareLoginC() {
        if (loginC == null)
            loginC = new JokerLoginLogic();
        return loginC;
    }
    joker.shareLoginC = shareLoginC;
    function destoryLoginC() {
        if (loginC)
            loginC.dispose();
        loginC = null;
    }
    joker.destoryLoginC = destoryLoginC;
    var JokerLoginLogic = (function (_super) {
        __extends(JokerLoginLogic, _super);
        function JokerLoginLogic() {
            var _this = _super.call(this) || this;
            //********如果5秒自定义模块没有返回信息就强行进入登录**********
            _this.forceId = 0;
            return _this;
        }
        /**
         * 登录成功处理
         */
        JokerLoginLogic.prototype.onLoginSucceed = function () {
            _super.prototype.onLoginSucceed.call(this);
        };
        //进入房间
        JokerLoginLogic.prototype.autoJoinRoom = function () {
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
        JokerLoginLogic.prototype.onRoomSucceed = function () {
            __CLOSE_PRELOAD();
            __CLOSE_ALLMOUDLE_OPEN(AppReg.JOKER_MODULE);
            console.log("进入房间成功");
            /**发送心跳协议 */
            joker.gameLogic().beginHeart();
        };
        /**
         * 登录失败
         */
        JokerLoginLogic.prototype.onloginError = function (agin) {
        };
        JokerLoginLogic.prototype.forceLogin = function () {
            this.forceId = egret.setTimeout(function () {
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_ACTION);
            }, this, 100);
        };
        JokerLoginLogic.prototype.clearForceLogin = function () {
            egret.clearTimeout(this.forceId);
        };
        JokerLoginLogic.prototype.dispose = function () {
            this.clearforceLogin();
            _super.prototype.dispose.call(this);
        };
        return JokerLoginLogic;
    }(games.GameBaseLogin));
    joker.JokerLoginLogic = JokerLoginLogic;
    __reflect(JokerLoginLogic.prototype, "joker.JokerLoginLogic");
})(joker || (joker = {}));
//# sourceMappingURL=JokerLoginLogic.js.map