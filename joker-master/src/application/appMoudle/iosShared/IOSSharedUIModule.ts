// TypeScript file
module platform {

    export enum SHARE_TYPE {
        SHARE_TYPE_TEXT = 1,		//分享文本
        SHARE_TYPE_IMAGE = 2,		//分享图片
        SHARE_TYPE_WEBPAGE = 3,		//分享网页
        SHARE_TYPE_APP = 4,			//分享应用
        SHARE_TYPE_AUDIO = 5,		//分享音乐
        SHARE_TYPE_VIDEO = 6,		//分享视频
        SHARE_TYPE_FILE = 7,		//分享文件
        SHARE_TYPE_EMOTION = 8,		//分享说说(仅限分享到QQ空间)
        SHARE_TYPE_EMOJI = 9		//分享表情(暂限分享到微信)
    }

    export enum SHARESDK_FUNCTION_SHOW_SHARE_WX {
        SHARE_SESSION = 1,		//微信分享发送到聊天界面
        SHARE_TIMELINE = 2,		//微信分享发送到朋友圈
        SHARE_FAVORITE = 3		//微信分享添加到微信收藏
    }

    export class IosShared extends app.base.BaseSceneUIMoudleComponent {

        public btnWX:eui.Image;
        public btnTimeLine:eui.Image;
        public btnQQ:eui.Image;
        public btnQQZone:eui.Image;

        /**
         * 分享的标题
         */
        title:string = "";
        /**
         * 分享的内容
         */
        content:string = "";
        /**
         * 链接的url
         */
        webUrl:string = "http://download.zgsjl8.com/dz/h5/index.html";
        /**
         * 分享时显示的图标
         */
        iconUrl:string = "http://download.zgsjl8.com/dz/dealer/logo_114.png";

        constructor() {
            super()
            this.skinName = "resource/app_skin/iosShared/IOSShared.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.bindButton(this.btnWX);
            this.bindButton(this.btnQQZone);
            this.bindButton(this.btnTimeLine);
            this.bindButton(this.btnQQ);
        }

        opening() {
            if(this.uiOpenData) {
                this.setShared(
                    this.uiOpenData.title,
                    this.uiOpenData.content,
                    this.uiOpenData.webUrl,
                    this.uiOpenData.iconUrl
                );

                console.log("share message title:" + this.uiOpenData.title + " " + this.uiOpenData.content + " " + this.webUrl + " " + this.uiOpenData.iconUrl)

            }
            super.opening();
        }

        setShared(title:string,content:string,webUrl?:string,iconUrl?:string){
            this.title = title;
            this.content = content;
            this.webUrl = webUrl ? webUrl : this.webUrl;
            this.iconUrl = iconUrl ? iconUrl : this.iconUrl;
        }

        defaultParams():void {
            this.title = "";
            this.content = "";
            this.webUrl = "";
            this.iconUrl = "";
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            var target = tag;
            console.log(gameabc.StringUtils.formatString("share to native title:{0},content:{1},iconUrl:{2},webUrl:{3}",this.title,this.content,this.iconUrl,this.webUrl));
            switch(target) {
                case this.btnWX:
                    this.showWeChatShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE,this.title,this.content,this.iconUrl,this.webUrl);
                    break;
                case this.btnTimeLine:
                    this.showWeChatShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE,this.title,this.content,this.iconUrl,this.webUrl,SHARESDK_FUNCTION_SHOW_SHARE_WX.SHARE_TIMELINE);
                    break;
                case this.btnQQ:
                    this.showQQShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE,this.title,this.content,this.iconUrl,this.webUrl);
                    break;
                case this.btnQQZone:
                    this.showQzoneShare(SHARE_TYPE.SHARE_TYPE_WEBPAGE,this.title,this.content,this.iconUrl,this.webUrl,"","");
                    break;
            }
            this.defaultParams();
            this.close();
        }

        get featherSpace():egret.DisplayObjectContainer {
            return AppRoot.gameLayer;
        }

        /**
         * ios 分享到微信
         */
        showWeChatShare(shareType:number,title:string = "",content:string = "",imagePath:string = "",webUrl:string = "",shareFlag:number=SHARESDK_FUNCTION_SHOW_SHARE_WX.SHARE_SESSION){
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_WX,[shareType.toString(),title,content,imagePath,webUrl,shareFlag.toString()]);
            console.log("share to WX");
        }

        showQQShare(shareType:number, title:string="",content:string="", imagePath:string="",sharePath:string=""){
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QQ,[shareType.toString(),title,content,imagePath,sharePath]);
            console.log("share to QQ");
        }

        showQzoneShare(shareType:number, title:string = "", content:string="",imagePath:string="",sharePath:string="",site:string="",siteUrl:string=""){
            UserInterface.callFunctionArray(UserInterface.SHARESDK_FUNCTION_SHOW_SHARE_QZONE,[shareType.toString(),title,content,imagePath,sharePath,site,siteUrl]);
            console.log("share to QQZone");
        }
    }
}