var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var EventPackageSender = (function () {
        function EventPackageSender(appEvents) {
            this.session = new mc2sdk.Session(mc2sdk.Mc2Sdk.deviceId + '_' + new Date().getTime(), appEvents);
            this.message = new mc2sdk.Message(this.session);
            this.data = new mc2sdk.EventPackage(mc2sdk.Mc2Sdk.appId, mc2sdk.Mc2Sdk.groupId, mc2sdk.Mc2Sdk.chanel, mc2sdk.Mc2Sdk.deviceType);
            if (mc2sdk.Mc2Sdk.soData.mc2MessageArray != null)
                this.data.message = mc2sdk.Mc2Sdk.soData.mc2MessageArray;
            this.data.message.push(this.message.toArray());
            this.loader = new egret.URLLoader();
            this.request = new egret.URLRequest(mc2sdk.requestUrl);
            this.request.method = egret.URLRequestMethod.POST;
            this.request.data = mc2sdk.Mc2Sdk.createMsgPack(this.data.toArray()).buffer;
            this.loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.loader.load(this.request);
            this.loader.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.failedHandler, this);
        }
        EventPackageSender.prototype.completeHandler = function (event) {
            try {
                var jsonBuff = this.loader.data;
                var bytes = new egret.ByteArray(jsonBuff);
                var jsonStr = bytes.readUTFBytes(bytes.length);
                var json = JSON.parse(jsonStr);
                if (json.result == 0) {
                    mc2sdk.Mc2Sdk.soData.mc2MessageArray = null;
                    var str = '';
                    if (this.data.message.length > 1) {
                        str = '，含缓存' + (this.data.message.length - 1) + '条';
                    }
                    mc2sdk.Mc2Sdk.log('收到数据' + str);
                }
                else if (json.result == -1) {
                    mc2sdk.Mc2Sdk.log('收到魔方返回：' + jsonStr);
                    //如果是多条，去掉一条再试(排除缓存出错，永远无法发送的可能)
                    if (this.data.message.length > 1) {
                        var removeData = this.data.message.shift();
                        this.request.data = mc2sdk.Mc2Sdk.createMsgPack(this.data.toArray());
                        this.loader.load(this.request);
                        mc2sdk.Mc2Sdk.log('统计失败，已删除一条缓存再重试：' + removeData);
                    }
                    else
                        this.failedHandler();
                }
                else
                    this.failedHandler();
            }
            catch (error) {
                this.failedHandler();
            }
        };
        EventPackageSender.prototype.failedHandler = function (event) {
            if (event === void 0) { event = null; }
            mc2sdk.Mc2Sdk.soData.mc2MessageArray = this.data.message;
            mc2sdk.Mc2Sdk.log('统计失败：' + this.data.toArray());
        };
        return EventPackageSender;
    }());
    mc2sdk.EventPackageSender = EventPackageSender;
    __reflect(EventPackageSender.prototype, "mc2sdk.EventPackageSender");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=EventPackageSender.js.map