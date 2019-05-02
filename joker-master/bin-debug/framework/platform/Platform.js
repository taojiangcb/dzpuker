var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var platform;
(function (platform) {
    /** 设备ID */
    platform.DEVICE_ID = "00-00-00-00-00-00";
    /** 指定的平台类，init时才会创建实例 */
    platform.factory = DevelopSdk;
    function init() {
        platform.SIGN_KEY = "";
        platform.RECHARGE_URL = gameabc.ResourceBundleUtil.getConfig("RECHARGE_URL");
        platform.SHOW_SVR_LIST = gameabc.ResourceBundleUtil.getConfig("SHOW_SVR_LIST") == "true";
        platform.LOGIN_FORM_UI = gameabc.ResourceBundleUtil.getConfig("LOGIN_FORM_UI") == "true";
        platform.HAS_USER_CENTER = gameabc.ResourceBundleUtil.getConfig("HAS_USER_CENTER") == "true";
        platform.HAS_BBS = gameabc.ResourceBundleUtil.getConfig("HAS_BBS") == "true";
        platform.HAS_CHANGE_USER = gameabc.ResourceBundleUtil.getConfig("HAS_CHANGE_USER") == "true";
        platform.NEED_LOGIN = gameabc.ResourceBundleUtil.getConfig("NEED_LOGIN") == "true";
    }
    platform.init = init;
    /** 所有渠道通用的一些流程与方法(所有渠道需继承此类，并实现IPlatform接口) */
    var Platform = (function () {
        function Platform() {
        }
        return Platform;
    }());
    platform.Platform = Platform;
    __reflect(Platform.prototype, "platform.Platform");
    /** 开发时默认指向的虚拟渠道 */
    var DevelopSdk = (function (_super) {
        __extends(DevelopSdk, _super);
        function DevelopSdk() {
            return _super.apply(this, arguments) || this;
        }
        /** 打开SDK的登录面板		 */
        DevelopSdk.prototype.openLoginPanel = function () {
        };
        /** 打开SDK的登出(注销)面板		 */
        DevelopSdk.prototype.openLogoutPanel = function () {
        };
        /** 打开SDK的用户中心面板		 */
        DevelopSdk.prototype.openUserCenter = function () {
        };
        /** 打开SDK的论坛		 */
        DevelopSdk.prototype.openBbs = function () {
        };
        /** 打开SDK的退出面板(重登、退出、切换账号)		 */
        DevelopSdk.prototype.openExitPanel = function () {
        };
        /** 打开SDK的切换账号面板		 */
        DevelopSdk.prototype.openChangeUserPanel = function () {
        };
        /** AIR在失去焦点时的处理		 */
        DevelopSdk.prototype.onDeactivate = function () {
        };
        /** AIR在恢复焦点时的处理		 */
        DevelopSdk.prototype.onActivate = function () {
        };
        /** AIR在游戏退出时的处理		 */
        DevelopSdk.prototype.onDispose = function () {
        };
        /** 当游戏登陆后进入主城时		 */
        DevelopSdk.prototype.onLoginToCity = function () {
        };
        /** 发起支付的SDK，具体的支付参数在_paymentVo中		 */
        DevelopSdk.prototype.payment = function () {
        };
        /** 发起登录的SDK(没有界面的，直接调用)		 */
        DevelopSdk.prototype.startLogin = function () {
        };
        /** 发起注销的SDK(没有界面的，直接调用)		 */
        DevelopSdk.prototype.startLogout = function () {
        };
        /** 发送角色信息	 */
        DevelopSdk.prototype.doReportRoleInfo = function () {
        };
        /** 发起没有界面的自定义登录	 */
        DevelopSdk.prototype.sendLogin = function (n, p) {
        };
        /** 发起没有界面的自定义注册	 */
        DevelopSdk.prototype.sendRegister = function (n, p) {
        };
        return DevelopSdk;
    }(Platform));
    platform.DevelopSdk = DevelopSdk;
    __reflect(DevelopSdk.prototype, "platform.DevelopSdk", ["platform.IPlatform"]);
})(platform || (platform = {}));
//# sourceMappingURL=Platform.js.map