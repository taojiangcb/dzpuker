
module platform {
    /**
     * 工场单例
     */
    var cPlatform:PlatformFactory;

    /**
     * 茶苑购买功能
     * @type {platform.GameTeaPay}
     */
    var gameTeaPay:GameTeaPay;

    /**
     * 
     */
    export function getGameTeaPay():GameTeaPay {
        if(!gameTeaPay) {
            gameTeaPay = new GameTeaPay();
        }
        return gameTeaPay;
    }

    /**
     * 
     */
    export function getFactory():PlatformFactory {
        if(cPlatform == null) {
            cPlatform = new PlatformFactory();
        }
        return cPlatform;
    }

    /**
     * 分享接口
     */
    export function shardShow(titleMsg:string,
                    content:string,
                    titleUrl4QzoneRenren:string="http://download.zgsjl8.com/dz/h5/index.html",
                    ImageUrl:string = "http://download.zgsjl8.com/dz/dealer/logo_114.png",
                    url4wx:string = "http://download.zgsjl8.com/dz/h5/index.html",
                    commnet4QzoneRenren:string = "",
                    site4Qzone:string = "",
                    siteUrl4Qzone:string = ""):void {
        
        var localOs:string = egret.Capabilities.os;
        if(localOs == egret.os.OSType.iOS) {
            console.log(gameabc.StringUtils.formatString("ios ==> share == title:{0},content:{1},iconUrl:{2},webUrl:{3}",titleMsg,content,ImageUrl,url4wx))
            __OPEN_PRE_MOUDLE(AppReg.IOS_SHARE,{title:titleMsg,content:content,iconUrl:ImageUrl,webUrl:url4wx});
        }
        else if(localOs == egret.os.OSType.Android) {
            var paramArray:string[]  = [
                titleMsg,                            //title标题，印象笔记、邮箱、信息、微信、人人网和QQ空间使用
                titleUrl4QzoneRenren,                //titleUrl是标题的网络链接，仅在人人网和QQ空间使用
                content,                             //text是分享文本，所有平台都需要这个字段 
                ImageUrl,                            //分享网络图片，新浪微博分享网络图片需要通过审核后申请高级写入接口，否则请注释掉测试新浪微博
                url4wx,                              //url仅在微信（包括好友和朋友圈）中使用
                commnet4QzoneRenren,                 //comment是我对这条分享的评论，仅在人人网和QQ空间使用
                site4Qzone,                          //site是分享此内容的网站名称，仅在QQ空间使用
                siteUrl4Qzone                        //siteUrl是分享此内容的网站地址，仅在QQ空间使用
            ];
            UserInterface.callFunctionArray(UserInterface.FUNCTION_SHOW_SHARE,paramArray);
        }
        else {
            tip.popSysTopTip("PC_NOT_SUPPORT");
        }
       console.log("打开分享界面");
    }

    /**
     * native 强更地址下载
     */
    export function updateDownload():void {
        var localOs:string = egret.Capabilities.os;
        var url:string = "";
        if(localOs == egret.os.OSType.iOS) {
            //appstore 更新的下载界面
            url = "itms-apps://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8";
            utils.NativeUtils.nativeCall(utils.NATIVE_CMD.TO_APPSTORE,url);                
        }
        else if(localOs == egret.os.OSType.Android) {
            url = "http://download.zgsjl8.com/dz/hot/" + platform.CHANNE_ID + ".apk";
            // 测试地址
            //url = "http://f5.market.mi-img.com/download/AppStore/0dfe6a49d18cc4a19213404790e52497d3851802f/com.gongpingjia.apk";
            UserInterface.callFunctionArray(UserInterface.APK_UPDATER_DOWNLOAD,[url]);
        }
    }

    interface LocalNotificationParam {
        identityKey:string
    }

    interface LocalNoticeInfo {
        title:string,
        time:number,
        content:string,
        userData:LocalNotificationParam
    }

    /**本地消息推送,只有ios支持消息回调 */
    export function pushLocalNotice(lnInfo:LocalNoticeInfo) {
        var localOs:string = egret.Capabilities.os;
        if(localOs == "iOS") {
            var jsonNoti:string = JSON.stringify(lnInfo);
            utils.NativeUtils.nativeCall(utils.NATIVE_CMD.SLN,jsonNoti);
        } 
        else if(localOs == "Android") {
            var identityKey:string = lnInfo.userData.identityKey;
            var title:string = lnInfo.title;
            var msg:string = lnInfo.content;
            var time:string = (app.SystemTimer.getCurrentSystemTime() + lnInfo.time * 1000).toString();
            var params:string[] = [identityKey,title,msg,time];
            UserInterface.callFunctionArray(UserInterface.NOTICE_FUNCTION_SHOW_TIME,params);
        }
    }

    /**
     * 跳转到微信
     */
    export function toWeChat():void {
        var localOs = egret.Capabilities.os;
        if(localOs == egret.os.OSType.iOS) {
            utils.NativeUtils.nativeCall(utils.NATIVE_CMD.TO_WECHAT,"itms-apps://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8");
        }
        else if(localOs == egret.os.OSType.Android) {
            utils.NativeUtils.nativeCall(utils.NATIVE_CMD.TO_WECHAT,"");
        } 
        else {
            tip.popSysTopTip("PC_NOT_SUPPORT");
        }
    }

    /**
     * 订单提交购买
     * @param payData
     */
    export function payment(payData:any):void {
        getFactory().payment(payData);
    }

    export class PlatformFactory {
        platforms:Object = {};
        construct(){
            gameTeaPay = new GameTeaPay();
        }

        /**
         * 提交购买
         * @param payData
         */
        payment(payData?:any):void {
            getGameTeaPay().creatData = payData;
            getGameTeaPay().createOrderList(payData.propid,payData.price,platform.CHANNE_ID);
        }

        /**开始登录*/
        startLogin(data?:any):void{        
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                UserInterface.callFunction(data);
            } 
            else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                if(data == LOGIN_TYPE.QQLogin) {
                    if(window.location) {
                        var loginUrl:string = "http://mobile.bfun.cn/v1/web/login/qq?";
                        var params:Object = {
                            appid:"1026",
                            channel:platform.CHANNE_ID
                        }
                        var params_str:string = gameabc.StringUtils.formatHttpParams(params);
                        window.location.href = loginUrl + params_str;
                    }
                } 
            }
        }

        /** 发起注销的SDK(没有界面的，直接调用)	*/
        startLogout():void{
        }
    }

    export class LOGIN_TYPE {
        static QQLogin:string = "QQLogin";
        static WXLogin:string = "WXLogin";
    }
}