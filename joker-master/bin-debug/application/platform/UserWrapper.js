var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UserWrapper = (function () {
    function UserWrapper() {
    }
    return UserWrapper;
}());
UserWrapper.ACTION_RET_INIT_SUCCESS = 100;
UserWrapper.ACTION_RET_INIT_FAIL = 101;
UserWrapper.ACTION_RET_LOGIN_SUCCESS = 102;
UserWrapper.ACTION_RET_LOGIN_TIMEOUT = 103;
UserWrapper.ACTION_RET_LOGIN_NO_NEED = 104;
UserWrapper.ACTION_RET_LOGIN_FAIL = 105;
UserWrapper.ACTION_RET_LOGIN_CANCEL = 106;
UserWrapper.ACTION_RET_LOGOUT_SUCCESS = 107;
UserWrapper.ACTION_RET_LOGOUT_FAIL = 108;
UserWrapper.ACTION_RET_PLATFORM_ENTER = 109;
UserWrapper.ACTION_RET_PLATFORM_BACK = 110;
UserWrapper.ACTION_RET_PAUSE_PAGE = 111;
UserWrapper.ACTION_RET_EXIT_PAGE = 112;
UserWrapper.ACTION_RET_ANTIADDICTIONQUERY = 113;
UserWrapper.ACTION_RET_REALNAMEREGISTER = 114;
UserWrapper.ACTION_RET_ACCOUNTSWITCH_SUCCESS = 115;
UserWrapper.ACTION_RET_ACCOUNTSWITCH_FAIL = 116;
UserWrapper.WX_FLAG_SHARERESULT_SUCCESS = 801; //分享成功
UserWrapper.WX_FLAG_SHARERESULT_FAIL = 802; //分享失败
UserWrapper.WX_FLAG_SHARERESULT_DENY = 803; //分享拒绝权限
UserWrapper.WX_FLAG_SHARERESULT_UNKNOWN = 804; //分享未知状态
__reflect(UserWrapper.prototype, "UserWrapper");
//# sourceMappingURL=UserWrapper.js.map