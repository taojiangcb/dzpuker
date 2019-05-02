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
    /**
     * @author huangkan
     *  发送到模块的消息命令集
     */
    var MoudleCommand = (function (_super) {
        __extends(MoudleCommand, _super);
        function MoudleCommand() {
            return _super.apply(this, arguments) || this;
        }
        MoudleCommand.prototype.execute = function (notification) {
            this.type = notification.getType();
            var commandId = notification.getName();
            var body = notification.getBody();
            if (commandId.length == 5) {
                var pre = commandId.substr(0, 2);
                switch (pre) {
                    case app.NetAction.TO_MS_PREFIX:
                    case app.NetAction.TO_MS_PREFIX_2:
                        this.sendPackage = new cyvos.SrsPackage();
                        this.sendPackage.nAppID = app.NetAction.MS_APPID;
                        this.sendPackage.sProcessID = app.NetAction.MS_PROCESSID;
                        this.sendParamVO = body instanceof appvos.ParamVO ? body : new appvos.ParamVO();
                        this.sendHandler(body, commandId, this.sendParamVO);
                        var MessageVO = AppGlobal.getMessage("MessageVO");
                        this.sendMessageVO = new MessageVO();
                        this.sendMessageVO.data = this.sendParamVO.getProtoVO();
                        this.sendPackage.data = new egret.ByteArray(this.sendMessageVO.toArrayBuffer());
                        this.sendPackage.sXYID = parseInt(commandId);
                        if (cy.srsServer)
                            //cy.srsServer.send(this.sendPackage);
                            return;
                    case app.NetAction.RE_MS_PREFIX:
                    case app.NetAction.RE_MS_PREFIX_2:
                        this.recvPackage = body;
                        this.recvMessageVO = new appvos.MessageVO(this.recvPackage.data.buffer);
                        if (this.recvMessageVO.errorCode > 0) {
                            var mess = gameabc.getError("2-" + this.recvMessageVO.errorCode + "");
                            if (mess == null || mess.length == 0) {
                                mess = "未定义errorCode:" + this.recvMessageVO.errorCode;
                                console.warn(mess);
                            }
                            else {
                                tip.popSysCenterTip(mess);
                                if (this.recvMessageVO.errorCode == 8) {
                                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_FAIL);
                                }
                            }
                        }
                        else
                            this.resultHandler(commandId, this.recvMessageVO.data);
                        return;
                }
            }
        };
        return MoudleCommand;
    }(app.ProtobuffCommand));
    app.MoudleCommand = MoudleCommand;
    __reflect(MoudleCommand.prototype, "app.MoudleCommand");
})(app || (app = {}));
//# sourceMappingURL=MoudleCommand.js.map