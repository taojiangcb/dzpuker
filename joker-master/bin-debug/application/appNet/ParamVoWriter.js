var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var ParamVoWriter = (function () {
        function ParamVoWriter() {
            this.paramVO = new appvos.ParamVO();
        }
        /** 添加 longValues*/
        ParamVoWriter.prototype.l = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var len = args.length;
            for (var i = 0; i < len; ++i) {
                this.paramVO.longValues[i] = dcodeIO.Long.fromNumber(args[i]);
            }
            return this;
        };
        /** 添加 intValues*/
        ParamVoWriter.prototype.i = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.paramVO.intValues = args;
            return this;
        };
        /** 添加 strValues*/
        ParamVoWriter.prototype.s = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.paramVO.strValues = args;
            return this;
        };
        /** 添加 data*/
        ParamVoWriter.prototype.d = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.paramVO.data = args;
            return this;
        };
        ParamVoWriter.prototype.on = function (listener) {
            this.backListener = listener;
            return this;
        };
        ParamVoWriter.prototype.onLoader = function (evt) {
            if (evt.type == egret.Event.COMPLETE) {
                var recvBytes = new egret.ByteArray(evt.target.data);
                var recvMessageVO = new appvos.MessageVO(recvBytes.buffer);
                this.backListener(recvMessageVO.data);
            }
            else
                this.backListener(null);
            evt.target.removeEventListener(egret.Event.COMPLETE, this.onLoader, this);
            evt.target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoader, this);
        };
        /** 发送 action  写在最后 */
        ParamVoWriter.prototype.to = function (action) {
            var MessageVO = AppGlobal.getMessage("MessageVO");
            var sendMessageVO = new MessageVO();
            sendMessageVO.phase = 1;
            sendMessageVO.action = parseInt(action);
            sendMessageVO.data = this.paramVO.getProtoVO();
            if (user.getProxy().messVersion != null) {
                sendMessageVO.sendAt = __SET_INT64(user.getProxy().messVersion);
            }
            var sendMessageBytes = new egret.ByteArray(sendMessageVO.toArrayBuffer());
            if (action.lastIndexOf(app.NetAction.TO_GS_PREFIX, 0) == 0 || action.lastIndexOf(app.NetAction.RE_GS_PREFIX, 0) == 0) {
                if (playcards.getProxy().isSingle)
                    __SEND_NOTIFICATION(action, new appvos.MessageVO(sendMessageVO.toArrayBuffer()));
                else {
                    if (user.getProxy().currentRoom == null)
                        return;
                    var cmds = action.split(".");
                    var sendGamePackage = new cyvos.GamePackage();
                    sendGamePackage.data = sendMessageBytes;
                    sendGamePackage.xyId = parseInt(cmds[1]);
                    __SEND_NOTIFICATION(cmds[0], sendGamePackage);
                }
                return;
            }
            if (action.lastIndexOf(app.NetAction.TO_MS_PREFIX, 0) == 0
                || action.lastIndexOf(app.NetAction.PROCESS_REQ_FIRST_ID, 0) == 0 || action.lastIndexOf(app.NetAction.PROCESS_RESP_FIRST_ID, 0) == 0) {
                var sendPackage = new cyvos.SrsPackage();
                sendPackage.data = sendMessageBytes;
                sendPackage.sXYID = parseInt(action);
                sendPackage.nAppID = app.NetAction.MS_APPID;
                sendPackage.sProcessID = app.NetAction.MS_PROCESSID;
                cy.srsServer.send(sendPackage);
                return;
            }
            if (action.lastIndexOf(app.NetAction.NS_PREFIX, 0) == 0) {
                var loader = new egret.URLLoader();
                var request = new egret.URLRequest(AppConst.CONNECT_SERVER.notice);
                request.method = egret.URLRequestMethod.POST;
                var data = new egret.ByteArray();
                data.writeInt(sendMessageBytes.length);
                data.writeBytes(sendMessageBytes);
                request.data = data.buffer;
                loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
                loader.load(request);
                if (this.backListener != null) {
                    loader.addEventListener(egret.Event.COMPLETE, this.onLoader, this);
                    loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoader, this);
                }
                return;
            }
            //slot
            // if (action.lastIndexOf(NetAction.PROCESS_REQ_FIRST_ID, 0) == 0 || action.lastIndexOf(NetAction.PROCESS_RESP_FIRST_ID, 0) == 0) {
            //     var cmds = action.split(".");
            //     var sendGamePackage = new cyvos.GamePackage();
            //     sendGamePackage.data = sendMessageBytes;
            //     sendGamePackage.xyId = parseInt(cmds[1]);
            //     __SEND_NOTIFICATION(cmds[0], sendGamePackage);
            //     return;
            // }
            cy.log("没有该协议号的快速处理方案", 64 /* ERROR */);
        };
        return ParamVoWriter;
    }());
    app.ParamVoWriter = ParamVoWriter;
    __reflect(ParamVoWriter.prototype, "app.ParamVoWriter");
})(app || (app = {}));
//# sourceMappingURL=ParamVoWriter.js.map