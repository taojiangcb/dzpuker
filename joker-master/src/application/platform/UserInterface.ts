/**
 *
 * @author 
 *
 */
class UserInterface {

    public static FUNCTION_LOGOUT = "logout";
    public static FUNCTION_ENTER_PLATFORM = "enterPlatform";
    public static FUNCTION_SHOW_TOOLBAR = "showToolBar";
    public static FUNCTION_HIDE_TOOLBAR = "hideToolBar";
    public static FUNCTION_ACCOUNT_SWITCH = "accountSwitch";
    public static FUNCTION_EXIT = "exit";
    public static FUNCTION_PAUSE = "pause";
    public static FUNCTION_DESTROY = "destroy";
    public static FUNCTION_SUBMIT_DATA = "submitData";
    public static FUNCTION_SHOW_SHARE = "sharesdk_show_share";


    public static NOTICE_FUNCTION_SHOW_IMDTLY = "notice_show_imdtly";               //马上推送一条
	public static NOTICE_FUNCTION_SHOW_TIME = "notice_show_time";                   //某个时间推送一条，传毫秒
	public static NOTICE_FUNCTION_SHOW_REPEATING = "notice_show_repeating";         //每隔多久推送一条
	public static NOTICE_FUNCTION_SHOW_CANCEL = "notice_show_cancel";               //取消某个定时推送

    public static APK_UPDATER_DOWNLOAD = "apkupdater_download_apk";                 //APK强行更新
    
    public static SHARESDK_FUNCTION_SHOW_SHARE_WX = "sharesdk_show_share_wx";		//分享到微信
    public static SHARESDK_FUNCTION_SHOW_SHARE_QQ = "sharesdk_show_share_qq";		//分享到QQ
    public static SHARESDK_FUNCTION_SHOW_SHARE_QZONE = "sharesdk_show_share_qzone";	//分享到QQ空间

    // PushNotification.showImmediately(appContext, "tickerText1", "title1","message1");
	// PushNotification.show(appContext, "tickerText2", "title2", "message1",System.currentTimeMillis() + 5000);
	// PushNotification.repeating(appContext, "tickerText3", "title3","message3", System.currentTimeMillis(), 3000);
    // PushNotification.cancelRepeating(appContext, "tickerText3");
    
    private static executor: UserExecutor = new UserExecutor();
    
	public constructor() {
	}
	
    public static login():void {
        UserInterface.executor.login();
    }
    
    public static callFunction(functionName: string): void {
        UserInterface.executor.callFunction(functionName);
    }

    public static callFunctionArray(functionName: string,array: string[]): void {
        UserInterface.executor.callFunctionArray(functionName, array);
    }
}
