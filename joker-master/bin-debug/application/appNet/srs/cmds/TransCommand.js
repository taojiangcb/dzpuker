var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cy;
(function (cy) {
    /**
     * @author huangkan
     *  SRS通信二级指令中继，结构化二级指令，使其在业务开发时可以不关注一二级概念
     */
    var TransCommand = (function (_super) {
        __extends(TransCommand, _super);
        function TransCommand() {
            return _super.apply(this, arguments) || this;
        }
        TransCommand.prototype.sendHandler = function (data, stream) {
            this.sendPackage.sProcessID = 1;
            this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            stream.putSuruct(data);
            cy.log("send:1-11201." + data.xyId, 4 /* GS_SEND */);
        };
        TransCommand.prototype.resultHandler = function (stream) {
            if (room.getProxy().current == null) {
                console.log("currentRoom==null");
                return;
            }
            var svrOfsId = room.getProxy().current.svrOfsId;
            if (svrOfsId != this.recvPackage.nAppID) {
                console.log("svrOfsId=" + svrOfsId + " recvAppId=" + this.recvPackage.nAppID);
                return;
            }
            var gamePackage = stream.getSuruct(cyvos.GamePackage);
            cy.log("recv:11200." + gamePackage.xyId, 8 /* GS_RECV */);
            this.sendNotification(app.NetAction.RE_GS_PREFIX + gamePackage.xyId, gamePackage);
        };
        return TransCommand;
    }(cy.SrsCommand));
    cy.TransCommand = TransCommand;
    __reflect(TransCommand.prototype, "cy.TransCommand");
})(cy || (cy = {}));
//# sourceMappingURL=TransCommand.js.map