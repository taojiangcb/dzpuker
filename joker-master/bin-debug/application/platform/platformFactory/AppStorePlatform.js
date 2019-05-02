var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/10/13.
 */
var platform;
(function (platform) {
    var AppStorePlatform = (function () {
        function AppStorePlatform() {
            this.pay = new platform.GameTeaPay();
        }
        /** 打开SDK的登录面板		 */
        AppStorePlatform.prototype.openLoginPanel = function () { };
        /** 打开SDK的登出(注销)面板		 */
        AppStorePlatform.prototype.openLogoutPanel = function () { };
        /** 打开SDK的用户中心面板		 */
        AppStorePlatform.prototype.openUserCenter = function () { };
        /** 打开SDK的论坛		 */
        AppStorePlatform.prototype.openBbs = function () { };
        /** 打开SDK的退出面板(重登、退出、切换账号)		 */
        AppStorePlatform.prototype.openExitPanel = function () { };
        /** 打开SDK的切换账号面板		 */
        AppStorePlatform.prototype.openChangeUserPanel = function () { };
        /** AIR在失去焦点时的处理		 */
        AppStorePlatform.prototype.onDeactivate = function () { };
        /** AIR在恢复焦点时的处理		 */
        AppStorePlatform.prototype.onActivate = function () { };
        /** AIR在游戏退出时的处理		 */
        AppStorePlatform.prototype.onDispose = function () { };
        /** 当游戏登陆后进入主城时		 */
        AppStorePlatform.prototype.onLoginToCity = function () { };
        /** 发起支付的SDK，具体的支付参数在_paymentVo中*/
        AppStorePlatform.prototype.payment = function (payData) {
            platform.getGameTeaPay().creatData = payData;
            platform.getGameTeaPay().createOrderList(payData.propid, payData.price, platform.CHANNE_IDS.APPSTORE.toString());
        };
        /** 发起登录的SDK(没有界面的，直接调用)		 */
        AppStorePlatform.prototype.startLogin = function () { };
        /** 发起注销的SDK(没有界面的，直接调用)		 */
        AppStorePlatform.prototype.startLogout = function () { };
        /** 发送角色信息	 */
        AppStorePlatform.prototype.doReportRoleInfo = function () { };
        /** 发起没有界面的自定义登录	 */
        AppStorePlatform.prototype.sendLogin = function (n, p) { };
        /** 发起没有界面的自定义注册	 */
        AppStorePlatform.prototype.sendRegister = function (n, p) { };
        return AppStorePlatform;
    }());
    platform.AppStorePlatform = AppStorePlatform;
    __reflect(AppStorePlatform.prototype, "platform.AppStorePlatform", ["platform.IPlatform"]);
})(platform || (platform = {}));
//# sourceMappingURL=AppStorePlatform.js.map