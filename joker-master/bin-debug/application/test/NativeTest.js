var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test;
(function (test) {
    var NativeTest = (function (_super) {
        __extends(NativeTest, _super);
        function NativeTest() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/test/NativeTest.exml";
            return _this;
        }
        NativeTest.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.lnBtn);
            this.bindButton(this.shardBtn);
            this.bindButton(this.closeBtn);
            this.bindButton(this.wxBtn);
            this.bindButton(this.updateBtn);
        };
        NativeTest.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.closeBtn:
                    this.close();
                    break;
                case this.wxBtn:
                    platform.toWeChat();
                    console.log("跳转到微信。。。");
                    break;
                case this.lnBtn:
                    /**
                     * 本地消息推送测试
                     */
                    var lnNotification = {
                        title: "12306",
                        time: 15,
                        content: "这是一条测试消息",
                        userData: {
                            identityKey: "123" //消息的key 相同key的消息会被覆盖以最后一次的为准
                        }
                    };
                    var jsonNoti = JSON.stringify(lnNotification);
                    platform.pushLocalNotice(lnNotification);
                    console.log("本地消息被调用啦！！！");
                    break;
                case this.shardBtn:
                    var paramArray = [];
                    // paramArray[0] = "mytitle";
                    // paramArray[1] = "http://sharesdk.cn";
                    // paramArray[2] = "mytext";
                    // paramArray[3] = "http://f1.sharesdk.cn/imgs/2014/02/26/owWpLZo_638x960.jpg";
                    // paramArray[4] = "http://sharesdk.cn";
                    // paramArray[5] = "mycomment";
                    // paramArray[6] = "ShareSDK";
                    // paramArray[7] = "http://sharesdk.cn";
                    // UserInterface.callFunctionArray(UserInterface.FUNCTION_SHOW_SHARE, paramArray);
                    platform.shardShow("这是一条测试", "这是测式的内容", "", null, "");
                    console.log("分享被调用了");
                    break;
                case this.updateBtn:
                    platform.updateDownload();
                    console.log("强行更新被调用了");
                    break;
            }
        };
        return NativeTest;
    }(app.base.BaseWndUIMoudleComponent));
    test.NativeTest = NativeTest;
    __reflect(NativeTest.prototype, "test.NativeTest");
})(test || (test = {}));
//# sourceMappingURL=NativeTest.js.map