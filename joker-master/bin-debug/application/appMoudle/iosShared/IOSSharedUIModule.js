var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var platform;
(function (platform) {
    var SHARE_TYPE;
    (function (SHARE_TYPE) {
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_TEXT"] = 1] = "SHARE_TYPE_TEXT";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_IMAGE"] = 2] = "SHARE_TYPE_IMAGE";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_WEBPAGE"] = 3] = "SHARE_TYPE_WEBPAGE";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_APP"] = 4] = "SHARE_TYPE_APP";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_AUDIO"] = 5] = "SHARE_TYPE_AUDIO";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_VIDEO"] = 6] = "SHARE_TYPE_VIDEO";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_FILE"] = 7] = "SHARE_TYPE_FILE";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_EMOTION"] = 8] = "SHARE_TYPE_EMOTION";
        SHARE_TYPE[SHARE_TYPE["SHARE_TYPE_EMOJI"] = 9] = "SHARE_TYPE_EMOJI"; //分享表情(暂限分享到微信)
    })(SHARE_TYPE = platform.SHARE_TYPE || (platform.SHARE_TYPE = {}));
    var SHARESDK_FUNCTION_SHOW_SHARE_WX;
    (function (SHARESDK_FUNCTION_SHOW_SHARE_WX) {
        SHARESDK_FUNCTION_SHOW_SHARE_WX[SHARESDK_FUNCTION_SHOW_SHARE_WX["SHARE_SESSION"] = 1] = "SHARE_SESSION";
        SHARESDK_FUNCTION_SHOW_SHARE_WX[SHARESDK_FUNCTION_SHOW_SHARE_WX["SHARE_TIMELINE"] = 2] = "SHARE_TIMELINE";
        SHARESDK_FUNCTION_SHOW_SHARE_WX[SHARESDK_FUNCTION_SHOW_SHARE_WX["SHARE_FAVORITE"] = 3] = "SHARE_FAVORITE"; //微信分享添加到微信收藏
    })(SHARESDK_FUNCTION_SHOW_SHARE_WX = platform.SHARESDK_FUNCTION_SHOW_SHARE_WX || (platform.SHARESDK_FUNCTION_SHOW_SHARE_WX = {}));
    var IosShared = (function (_super) {
        __extends(IosShared, _super);
        function IosShared() {
            var _this = _super.call(this) || this;
            /**
             * 分享的标题
             */
            _this.title = "";
            /**
             * 分享的内容
             */
            _this.content = "";
            /**
             * 链接的url
             */
            _this.webUrl = "http://download.zgsjl8.com/dz/h5/index.html";
            /**
             * 分享时显示的图标
             */
            _this.iconUrl = "http://download.zgsjl8.com/dz/dealer/logo_114.png";
            _this.skinName = "resource/app_skin/iosShared/IOSShared.exml";
            return _this;
        }
        IosShared.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnWX);
            this.bindButton(this.btnQQZone);
            this.bindButton(this.btnTimeLine);
            this.bindButton(this.btnQQ);
        };
        IosShared.prototype.opening = function () {
            if (this.uiOpenData) {
                this.setShared(this.uiOpenData.title, this.uiOpenData.content, this.uiOpenData.webUrl, this.uiOpenData.iconUrl);
                console.log("share message title:" + this.uiOpenData.title + " " + this.uiOpenData.content + " " + this.webUrl + " " + this.uiOpenData.iconUrl);
            }
            _super.prototype.opening.call(this);
        };
        IosShared.prototype.setShared = function (title, content, webUrl, iconUrl) {
            this.title = title;
            this.content = content;
            this.webUrl = webUrl ? webUrl : this.webUrl;
            this.iconUrl = iconUrl ? iconUrl : this.iconUrl;
        };
        IosShared.prototype.defaultParams = function () {
            this.title = "";
            this.content = "";
            this.webUrl = "";
            this.iconUrl = "";
        };
        IosShared.prototype.touchBindButtonHandler = function (tag) {
            var target = tag;
            console.log(gameabc.StringUtils.formatString("share to native title:{0},content:{1},iconUrl:{2},webUrl:{3}", this.title, this.content, this.iconUrl, this.webUrl));
            switch (target) {
                case this.btnWX:
                    this.showWeChatShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE, this.title, this.content, this.iconUrl, this.webUrl);
                    break;
                case this.btnTimeLine:
                    this.showWeChatShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE, this.title, this.content, this.iconUrl, this.webUrl, SHARESDK_FUNCTION_SHOW_SHARE_WX.SHARE_TIMELINE);
                    break;
                case this.btnQQ:
                    this.showQQShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE, this.title, this.content, this.iconUrl, this.webUrl);
                    break;
                case this.btnQQZone:
                    this.showQzoneShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE, this.title, this.content, this.iconUrl, this.webUrl, "", "");
                    break;
            }
            this.defaultParams();
            this.close();
        };
        Object.defineProperty(IosShared.prototype, "featherSpace", {
            get: function () {
                return AppRoot.gameLayer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ios 分享到微信
         */
        IosShared.prototype.showWeChatShare = function (shareType, title, content, imagePath, webUrl, shareFlag) {
            if (title === void 0) { title = ""; }
            if (content === void 0) { content = ""; }
            if (imagePath === void 0) { imagePath = ""; }
            if (webUrl === void 0) { webUrl = ""; }
            if (shareFlag === void 0) { shareFlag = SHARESDK_FUNCTION_SHOW_SHARE_WX.SHARE_SESSION; }
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_WX, [shareType.toString(), title, content, imagePath, webUrl, shareFlag.toString()]);
            console.log("share to WX");
        };
        IosShared.prototype.showQQShare = function (shareType, title, content, imagePath, sharePath) {
            if (title === void 0) { title = ""; }
            if (content === void 0) { content = ""; }
            if (imagePath === void 0) { imagePath = ""; }
            if (sharePath === void 0) { sharePath = ""; }
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QQ, [shareType.toString(), title, content, imagePath, sharePath]);
            console.log("share to QQ");
        };
        IosShared.prototype.showQzoneShare = function (shareType, title, content, imagePath, sharePath, site, siteUrl) {
            if (title === void 0) { title = ""; }
            if (content === void 0) { content = ""; }
            if (imagePath === void 0) { imagePath = ""; }
            if (sharePath === void 0) { sharePath = ""; }
            if (site === void 0) { site = ""; }
            if (siteUrl === void 0) { siteUrl = ""; }
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QZONE, [shareType.toString(), title, content, imagePath, sharePath, site, siteUrl]);
            console.log("share to QQZone");
        };
        return IosShared;
    }(app.base.BaseSceneUIMoudleComponent));
    platform.IosShared = IosShared;
    __reflect(IosShared.prototype, "platform.IosShared");
})(platform || (platform = {}));
//# sourceMappingURL=IOSSharedUIModule.js.map