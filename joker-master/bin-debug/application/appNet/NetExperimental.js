var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var NetExperimental = (function () {
        function NetExperimental() {
            mc2sdk.event(59901 /* EXP_SVR_START */);
            this.skt = new egret.WebSocket();
            this.skt.type = egret.WebSocket.TYPE_BINARY;
            this.skt.addEventListener(egret.Event.CONNECT, this.connectHandler, this);
            this.skt.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this.skt.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
            // this.skt.connect("123.59.14.4",16001);
            this.skt.connect("10.224.32.70", 16001);
        }
        NetExperimental.prototype.connectHandler = function (event) {
            mc2sdk.event(59902 /* EXP_SVR_SUCCESS */);
            var paramVO = new appvos.ParamVO();
            var MessageVO = AppGlobal.getMessage("MessageVO");
            var sendMessageVO = new MessageVO();
            sendMessageVO.phase = 1;
            sendMessageVO.action = 1;
            sendMessageVO.data = paramVO.getProtoVO();
            var sendMessageBytes = new egret.ByteArray(sendMessageVO.toArrayBuffer());
            var data = new egret.ByteArray();
            data.writeInt(sendMessageBytes.length);
            data.writeBytes(sendMessageBytes);
            this.skt.writeBytes(data);
            this.skt.flush();
        };
        NetExperimental.prototype.closeHandler = function (event) {
            mc2sdk.event(59903 /* EXP_SVR_ERROR */);
        };
        NetExperimental.prototype.errorHandler = function (event) {
            mc2sdk.event(59904 /* EXP_SVR_CLOSE */);
        };
        return NetExperimental;
    }());
    app.NetExperimental = NetExperimental;
    __reflect(NetExperimental.prototype, "app.NetExperimental");
})(app || (app = {}));
//# sourceMappingURL=NetExperimental.js.map