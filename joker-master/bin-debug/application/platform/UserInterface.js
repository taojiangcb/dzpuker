var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UserInterface = (function () {
    function UserInterface() {
    }
    UserInterface.login = function () {
        UserInterface.executor.login();
    };
    UserInterface.callFunction = function (functionName) {
        UserInterface.executor.callFunction(functionName);
    };
    UserInterface.callFunctionArray = function (functionName, array) {
        UserInterface.executor.callFunctionArray(functionName, array);
    };
    return UserInterface;
}());
UserInterface.FUNCTION_LOGOUT = "logout";
UserInterface.FUNCTION_ENTER_PLATFORM = "enterPlatform";
UserInterface.FUNCTION_SHOW_TOOLBAR = "showToolBar";
UserInterface.FUNCTION_HIDE_TOOLBAR = "hideToolBar";
UserInterface.FUNCTION_ACCOUNT_SWITCH = "accountSwitch";
UserInterface.FUNCTION_EXIT = "exit";
UserInterface.FUNCTION_PAUSE = "pause";
UserInterface.FUNCTION_DESTROY = "destroy";
UserInterface.FUNCTION_SUBMIT_DATA = "submitData";
UserInterface.FUNCTION_SHOW_SHARE = "sharesdk_show_share";
UserInterface.NOTICE_FUNCTION_SHOW_IMDTLY = "notice_show_imdtly"; //马上推送一条
UserInterface.NOTICE_FUNCTION_SHOW_TIME = "notice_show_time"; //某个时间推送一条，传毫秒
UserInterface.NOTICE_FUNCTION_SHOW_REPEATING = "notice_show_repeating"; //每隔多久推送一条
UserInterface.NOTICE_FUNCTION_SHOW_CANCEL = "notice_show_cancel"; //取消某个定时推送
UserInterface.APK_UPDATER_DOWNLOAD = "apkupdater_download_apk"; //APK强行更新
UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_WX = "sharesdk_show_share_wx"; //分享到微信
UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QQ = "sharesdk_show_share_qq"; //分享到QQ
UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QZONE = "sharesdk_show_share_qzone"; //分享到QQ空间
// PushNotification.showImmediately(appContext, "tickerText1", "title1","message1");
// PushNotification.show(appContext, "tickerText2", "title2", "message1",System.currentTimeMillis() + 5000);
// PushNotification.repeating(appContext, "tickerText3", "title3","message3", System.currentTimeMillis(), 3000);
// PushNotification.cancelRepeating(appContext, "tickerText3");
UserInterface.executor = new UserExecutor();
__reflect(UserInterface.prototype, "UserInterface");
//# sourceMappingURL=UserInterface.js.map