var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/10/13.
 */
var platform;
(function (platform) {
    var BasePlatform = (function () {
        function BasePlatform() {
        }
        /** 打开SDK的登录面板		 */
        BasePlatform.prototype.openLoginPanel = function () { };
        /** 打开SDK的登出(注销)面板		 */
        BasePlatform.prototype.openLogoutPanel = function () { };
        /** 打开SDK的用户中心面板		 */
        BasePlatform.prototype.openUserCenter = function () { };
        /** 打开SDK的论坛		 */
        BasePlatform.prototype.openBbs = function () { };
        /** 打开SDK的退出面板(重登、退出、切换账号)		 */
        BasePlatform.prototype.openExitPanel = function () { };
        /** 打开SDK的切换账号面板		 */
        BasePlatform.prototype.openChangeUserPanel = function () { };
        /** AIR在失去焦点时的处理		 */
        BasePlatform.prototype.onDeactivate = function () { };
        /** AIR在恢复焦点时的处理		 */
        BasePlatform.prototype.onActivate = function () { };
        /** AIR在游戏退出时的处理		 */
        BasePlatform.prototype.onDispose = function () { };
        /** 当游戏登陆后进入主城时		 */
        BasePlatform.prototype.onLoginToCity = function () { };
        /** 发起支付的SDK，具体的支付参数在_paymentVo中		 */
        BasePlatform.prototype.payment = function (apyData) { };
        /** 发起登录的SDK(没有界面的，直接调用)		 */
        BasePlatform.prototype.startLogin = function () { };
        /** 发起注销的SDK(没有界面的，直接调用)		 */
        BasePlatform.prototype.startLogout = function () { };
        /** 发送角色信息	 */
        BasePlatform.prototype.doReportRoleInfo = function () { };
        /** 发起没有界面的自定义登录	 */
        BasePlatform.prototype.sendLogin = function (n, p) { };
        /** 发起没有界面的自定义注册	 */
        BasePlatform.prototype.sendRegister = function (n, p) { };
        return BasePlatform;
    }());
    platform.BasePlatform = BasePlatform;
    __reflect(BasePlatform.prototype, "platform.BasePlatform", ["platform.IPlatform"]);
})(platform || (platform = {}));
//# sourceMappingURL=BasePlatform.js.map