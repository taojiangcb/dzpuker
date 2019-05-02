var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var HttpCommand = (function (_super) {
        __extends(HttpCommand, _super);
        function HttpCommand() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(HttpCommand.prototype, "url", {
            get: function () {
                return AppConst.CONNECT_SERVER.mail;
            },
            enumerable: true,
            configurable: true
        });
        HttpCommand.prototype.execute = function (notification) {
            this.loader = new egret.URLLoader();
            this.loader.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.failedHandler, this);
            this.loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.action = notification.getName();
            var body = notification.getBody();
            if (body instanceof appvos.ParamVO) {
                this.sendParamVO = body;
            }
            else {
                this.sendParamVO = new appvos.ParamVO();
                if (body instanceof AppGlobal.getMessage("ParamVO"))
                    this.sendParamVO.setData(body);
            }
            this.sendHandler(body, this.action, this.sendParamVO);
            var MessageVO = AppGlobal.getMessage("MessageVO");
            this.sendMessageVO = new MessageVO();
            this.sendMessageVO.phase = 1;
            this.sendMessageVO.action = parseInt(this.action);
            this.sendMessageVO.data = this.sendParamVO.getProtoVO();
            // var sendMessageBytes = new egret.ByteArray(this.sendMessageVO.toArrayBuffer()); 
            // this.sendBytes = new egret.ByteArray();
            // this.sendBytes.writeInt(sendMessageBytes.length);
            // this.sendBytes.writeBytes(sendMessageBytes);
            var sendBuff = new egret.ByteArray();
            var a = this.sendMessageVO.toArrayBuffer();
            var len = a.byteLength;
            sendBuff.writeInt(len);
            sendBuff.writeBytes(new egret.ByteArray(a));
            this.sendBytes = sendBuff;
            this.request = new egret.URLRequest(this.url);
            this.request.method = egret.URLRequestMethod.POST;
            this.request.data = this.sendBytes.buffer;
            // var len3 = this.sendBytes.buffer.byteLength;
            this.loader.load(this.request);
            // this.sendBytes.position = 0;
            //  var len2 = this.sendBytes.readInt();
            //  var byt = new egret.ByteArray()
            //  this.sendBytes.readBytes(byt,0,len2);
        };
        HttpCommand.prototype.completeHandler = function (evt) {
            this.recvBytes = new egret.ByteArray(this.loader.data);
            var recvMessageBytes = new egret.ByteArray();
            var len = this.recvBytes.readInt();
            this.recvBytes.readBytes(recvMessageBytes, 0, len);
            this.recvMessageVO = new appvos.MessageVO(recvMessageBytes.buffer);
            if (this.recvMessageVO.sendAt != null && this.recvMessageVO.sendAt > 0) {
                cy.updateServerTime(this.recvMessageVO.sendAt);
            }
            // console.log("recvMessageVO.phase:" + this.recvMessageVO.phase.toString())
            if (this.recvMessageVO.phase == 2) {
                this.recvParamVO = this.recvMessageVO.data;
                this.resultHandler(this.action, this.recvParamVO);
            }
            else {
                this.resultHandler(this.action, null);
            }
            this.loader.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.failedHandler, this);
        };
        HttpCommand.prototype.failedHandler = function (evt) {
            this.resultHandler(this.action, null);
            this.loader.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.failedHandler, this);
        };
        return HttpCommand;
    }(app.ProtobuffCommand));
    app.HttpCommand = HttpCommand;
    __reflect(HttpCommand.prototype, "app.HttpCommand");
})(app || (app = {}));
//# sourceMappingURL=HttpCommand.js.map