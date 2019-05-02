var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var platform;
(function (platform) {
    /**
     * 工场单例
     */
    var cPlatform;
    /**
     * 茶苑购买功能
     * @type {platform.GameTeaPay}
     */
    var gameTeaPay;
    /**
     *
     */
    function getGameTeaPay() {
        if (!gameTeaPay) {
            gameTeaPay = new platform.GameTeaPay();
        }
        return gameTeaPay;
    }
    platform.getGameTeaPay = getGameTeaPay;
    /**
     *
     */
    function getFactory() {
        if (cPlatform == null) {
            cPlatform = new PlatformFactory();
        }
        return cPlatform;
    }
    platform.getFactory = getFactory;
    /**
     * 分享接口
     */
    function shardShow(titleMsg, content, titleUrl4QzoneRenren, ImageUrl, url4wx, commnet4QzoneRenren, site4Qzone, siteUrl4Qzone) {
        if (titleUrl4QzoneRenren === void 0) { titleUrl4QzoneRenren = "http://download.zgsjl8.com/dz/h5/index.html"; }
        if (ImageUrl === void 0) { ImageUrl = "http://download.zgsjl8.com/dz/dealer/logo_114.png"; }
        if (url4wx === void 0) { url4wx = "http://download.zgsjl8.com/dz/h5/index.html"; }
        if (commnet4QzoneRenren === void 0) { commnet4QzoneRenren = ""; }
        if (site4Qzone === void 0) { site4Qzone = ""; }
        if (siteUrl4Qzone === void 0) { siteUrl4Qzone = ""; }
        var localOs = egret.Capabilities.os;
        if (localOs == egret.os.OSType.iOS) {
            console.log(gameabc.StringUtils.formatString("ios ==> share == title:{0},content:{1},iconUrl:{2},webUrl:{3}", titleMsg, content, ImageUrl, url4wx));
            __OPEN_PRE_MOUDLE(AppReg.IOS_SHARE, { title: titleMsg, content: content, iconUrl: ImageUrl, webUrl: url4wx });
        }
        else if (localOs == egret.os.OSType.Android) {
            var paramArray = [
                titleMsg,
                titleUrl4QzoneRenren,
                content,
                ImageUrl,
                url4wx,
                commnet4QzoneRenren,
                site4Qzone,
                siteUrl4Qzone //siteUrl是分享此内容的网站地址，仅在QQ空间使用
            ];
            UserInterface.callFunctionArray(UserInterface.FUNCTION_SHOW_SHARE, paramArray);
        }
        else {
            tip.popSysTopTip("PC_NOT_SUPPORT");
        }
        console.log("打开分享界面");
    }
    platform.shardShow = shardShow;
    /**
     * native 强更地址下载
     */
    function updateDownload() {
        var localOs = egret.Capabilities.os;
        var url = "";
        if (localOs == egret.os.OSType.iOS) {
            //appstore 更新的下载界面
            url = "itms-apps://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8";
            utils.NativeUtils.nativeCall(14 /* TO_APPSTORE */, url);
        }
        else if (localOs == egret.os.OSType.Android) {
            url = "http://download.zgsjl8.com/dz/hot/" + platform.CHANNE_ID + ".apk";
            // 测试地址
            //url = "http://f5.market.mi-img.com/download/AppStore/0dfe6a49d18cc4a19213404790e52497d3851802f/com.gongpingjia.apk";
            UserInterface.callFunctionArray(UserInterface.APK_UPDATER_DOWNLOAD, [url]);
        }
    }
    platform.updateDownload = updateDownload;
    /**本地消息推送,只有ios支持消息回调 */
    function pushLocalNotice(lnInfo) {
        var localOs = egret.Capabilities.os;
        if (localOs == "iOS") {
            var jsonNoti = JSON.stringify(lnInfo);
            utils.NativeUtils.nativeCall(12 /* SLN */, jsonNoti);
        }
        else if (localOs == "Android") {
            var identityKey = lnInfo.userData.identityKey;
            var title = lnInfo.title;
            var msg = lnInfo.content;
            var time = (app.SystemTimer.getCurrentSystemTime() + lnInfo.time * 1000).toString();
            var params = [identityKey, title, msg, time];
            UserInterface.callFunctionArray(UserInterface.NOTICE_FUNCTION_SHOW_TIME, params);
        }
    }
    platform.pushLocalNotice = pushLocalNotice;
    /**
     * 跳转到微信
     */
    function toWeChat() {
        var localOs = egret.Capabilities.os;
        if (localOs == egret.os.OSType.iOS) {
            utils.NativeUtils.nativeCall(15 /* TO_WECHAT */, "itms-apps://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8");
        }
        else if (localOs == egret.os.OSType.Android) {
            utils.NativeUtils.nativeCall(15 /* TO_WECHAT */, "");
        }
        else {
            tip.popSysTopTip("PC_NOT_SUPPORT");
        }
    }
    platform.toWeChat = toWeChat;
    /**
     * 订单提交购买
     * @param payData
     */
    function payment(payData) {
        getFactory().payment(payData);
    }
    platform.payment = payment;
    var PlatformFactory = (function () {
        function PlatformFactory() {
            this.platforms = {};
        }
        PlatformFactory.prototype.construct = function () {
            gameTeaPay = new platform.GameTeaPay();
        };
        /**
         * 提交购买
         * @param payData
         */
        PlatformFactory.prototype.payment = function (payData) {
            getGameTeaPay().creatData = payData;
            getGameTeaPay().createOrderList(payData.propid, payData.price, platform.CHANNE_ID);
        };
        /**开始登录*/
        PlatformFactory.prototype.startLogin = function (data) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                UserInterface.callFunction(data);
            }
            else if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                if (data == LOGIN_TYPE.QQLogin) {
                    if (window.location) {
                        var loginUrl = "http://mobile.bfun.cn/v1/web/login/qq?";
                        var params = {
                            appid: "1026",
                            channel: platform.CHANNE_ID
                        };
                        var params_str = gameabc.StringUtils.formatHttpParams(params);
                        window.location.href = loginUrl + params_str;
                    }
                }
            }
        };
        /** 发起注销的SDK(没有界面的，直接调用)	*/
        PlatformFactory.prototype.startLogout = function () {
        };
        return PlatformFactory;
    }());
    platform.PlatformFactory = PlatformFactory;
    __reflect(PlatformFactory.prototype, "platform.PlatformFactory");
    var LOGIN_TYPE = (function () {
        function LOGIN_TYPE() {
        }
        return LOGIN_TYPE;
    }());
    LOGIN_TYPE.QQLogin = "QQLogin";
    LOGIN_TYPE.WXLogin = "WXLogin";
    platform.LOGIN_TYPE = LOGIN_TYPE;
    __reflect(LOGIN_TYPE.prototype, "platform.LOGIN_TYPE");
})(platform || (platform = {}));
//# sourceMappingURL=PlatformFactory.js.map