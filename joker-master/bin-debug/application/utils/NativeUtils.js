var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     *
     * @author
     *
     */
    var NativeUtils = (function () {
        function NativeUtils() {
        }
        NativeUtils.init = function () {
            console.log("initialize native api...");
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                window.onunload = function unloadal() {
                    playcards.getProxy().outbakfun();
                    happy.getProxy().outRoom();
                    if (cy.srsServer != null) {
                        cy.srsServer.close();
                    }
                };
            }
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                egret.ExternalInterface.addCallback("sendToJS", this.sendToJS);
                egret.ExternalInterface.addCallback("EgretInterface", function (msg) {
                    console.log(msg);
                });
                //启动native api
                egret.ExternalInterface.call("RuntimeInterface", "start native api");
            }
        };
        /**native 调用js*/
        NativeUtils.sendToJS = function (message) {
            console.log("receive native msg:" + message);
            var data = JSON.parse(message);
            var type = data.type;
            var jsonData = data.data;
            // var type: number = Number(message) ;
            switch (type) {
                case 4 /* BACK */:
                    if (playcards.getProxy().out() && happy.getProxy().outRoom()) {
                        var time = egret.getTimer();
                        if (time - this.lastbackTime < 2000) {
                            NativeUtils.nativeCall(5 /* CLOSE_NATIVE */);
                        }
                        else {
                            var tip_str = gameabc.getMessage("EXIT_AGIN");
                            tip.popSysBottomTip(tip_str);
                        }
                        this.lastbackTime = time;
                    }
                    break;
                case 6 /* SET_UUID */:
                    gameabc.UUID.setMobileUUID(jsonData);
                    break;
                case 7 /* BANK_HTTPS */:
                    __SEND_NOTIFICATION(bank.BankUIMoudMediator.BANK_HTTP_RESPONSE, jsonData);
                    break;
                case 10 /* NATIVE_INIT */:
                    platform.CHANNE_ID = jsonData.channelId;
                    console.log("receive channelId:" + jsonData.channelId);
                    if (jsonData.nativeVer) {
                        platform.NATIVE_VER = jsonData.nativeVer;
                        console.log("receive nativeVer:" + jsonData.nativeVer);
                    }
                    break;
                case 13 /* RECEIVE_LN */:
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.NATIVE_LOCAL_NOTIFICATION_HANDLER, jsonData);
                    console.log("receive local notification:" + jsonData.identityKey);
                    break;
                default:
                    break;
            }
        };
        /**
         * 手机震动
         */
        NativeUtils.shock = function () {
            //调用手机震动方法 startVibrator
            //            var msg = { "index": "-1","time": ["100","400"] };          
            //            egret.ExternalInterface.call("startVibrator",JSON.stringify(msg));
            this.nativeCall(3 /* SHOCK */, ["100", "400"]);
        };
        /**打开网址 */
        NativeUtils.openurl = function (registerURL) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                NativeUtils.nativeCall(1 /* OPEN_URL */, registerURL);
            }
            else if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                window.open(registerURL);
            }
        };
        /**加载完成移除loading */
        NativeUtils.removeloading = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                utils.NativeUtils.nativeCall(2 /* EGRET_COMPLETE */);
            }
            //  else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            //        var loading = document.getElementById("loading");  
            //          if(loading!=null)  document.body.removeChild(loading); 
            // }
        };
        /**调用native接口 */
        NativeUtils.nativeCall = function (type, data) {
            if (data === void 0) { data = ''; }
            var msg = { "type": type, "data": data };
            var callParams = JSON.stringify(msg);
            egret.ExternalInterface.call("sendToNative", callParams);
            console.log("nativeCall:" + callParams);
        };
        /**
         * web地址
         */
        NativeUtils.getURL = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE)
                return NativeUtils.nativeurl;
            else
                return window.location.href.split('?')[0];
        };
        /**
        * web地址参数
        */
        NativeUtils.getURLObj = function () {
            var args = new Object();
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var query = location.search.substring(1); //获取查询串 
                var pairs = query.split("&"); //在&处断开 
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf('='); //查找name=value 
                    if (pos == -1) {
                        continue;
                    }
                    var argname = pairs[i].substring(0, pos); //提取name 
                    var value = pairs[i].substring(pos + 1); //提取value 
                    args[argname] = value; //存为属性 
                }
            }
            return args;
        };
        /**打开视频直播 */
        NativeUtils.openVedio = function (roomId) {
            // document.addEventListener("OPENVEDIO" )
            // roomId = "166040";
            roomId = "bfdzstream1";
            var url;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                // if (egret.Capabilities.isMobile) {
                //     url = 'http://pullhls03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c/playlist.m3u8';
                // } else url = "http://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c.flv";
                // url = "https://www.zhanqi.tv/live/embed?roomId=" + roomId + "&fhost=download.zgsjl8.com";
                url = "http://192.168.138.124:9098/loading/lives/rtmplvs.html?" + roomId;
                var e = new Event("OPENVEDIO");
                e['data'] = url;
                document.dispatchEvent(e);
            }
            else {
                // url = "http://nos.netease.com/vod163/demo.mp4";//'rtmp://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c';
                this.nativeCall(8 /* SHOW_LIVE */, roomId);
            }
        };
        /**关闭视频直播 */
        NativeUtils.closeVedio = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
                document.dispatchEvent(new Event("CLOSEVEDIO"));
            else
                this.nativeCall(9 /* HIDE_LIVE */);
        };
        /*转gbk字符 调用浏览器api*/
        NativeUtils.ToGBKString = function (buffer, byteOffset, byteLength) {
            if ('TextDecoder' in window) {
                var dataView = new DataView(buffer, byteOffset, byteLength);
                var decoder = new window['TextDecoder']('gbk');
                var decodedString = decoder.decode(dataView);
                console.info(decodedString);
                return decodedString;
            }
            else {
                console.error('Your browser does not support the Encoding API.');
            }
        };
        return NativeUtils;
    }());
    NativeUtils.nativeurl = "http://download.zgsjl8.com/dz/h5/index.html";
    NativeUtils.lastbackTime = 0;
    utils.NativeUtils = NativeUtils;
    __reflect(NativeUtils.prototype, "utils.NativeUtils");
})(utils || (utils = {}));
//# sourceMappingURL=NativeUtils.js.map