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
     *  游戏内二级消息命令集
     */
    var GameCommand = (function (_super) {
        __extends(GameCommand, _super);
        function GameCommand() {
            return _super.apply(this, arguments) || this;
        }
        GameCommand.prototype.execute = function (notification) {
            var commandId = notification.getName();
            var cmds = commandId.split(".");
            var body = notification.getBody();
            if (body instanceof cyvos.GamePackage) {
                this.recvGamePackage = body;
                this.recvMessageVO = new appvos.MessageVO(this.recvGamePackage.data.buffer);
                this.resultHandler(commandId, this.recvMessageVO.data);
            }
            else {
                if (user.getProxy().currentRoom == null) {
                    console.log("已离开房间，无法操作房间内行为");
                    return;
                }
                this.sendParamVO = body instanceof appvos.ParamVO ? body : new appvos.ParamVO();
                this.sendHandler(body, commandId, this.sendParamVO);
                var MessageVO = AppGlobal.getMessage("MessageVO");
                this.sendMessageVO = new MessageVO();
                if (user.getProxy().messVersion != null) {
                    this.sendMessageVO.sendAt = __SET_INT64(user.getProxy().messVersion);
                }
                this.sendMessageVO.data = this.sendParamVO.getProtoVO();
                this.sendGamePackage = new cyvos.GamePackage();
                this.sendGamePackage.data = new egret.ByteArray(this.sendMessageVO.toArrayBuffer());
                this.sendGamePackage.xyId = parseInt(cmds[1]);
                this.sendNotification(cmds[0], this.sendGamePackage);
            }
        };
        return GameCommand;
    }(app.ProtobuffCommand));
    app.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "app.GameCommand");
})(app || (app = {}));
//# sourceMappingURL=GameCommand.js.map