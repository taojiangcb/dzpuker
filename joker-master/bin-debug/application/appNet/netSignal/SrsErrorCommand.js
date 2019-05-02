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
     *  与SRS连接的进入房间环节命令集，进入房间过程在此完成
     */
    var SrsErrorCommand = (function (_super) {
        __extends(SrsErrorCommand, _super);
        function SrsErrorCommand() {
            return _super.apply(this, arguments) || this;
        }
        SrsErrorCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                //协议9
                case app.NetAction.CMDT_REPORTSRSERR:
                    var flag = stream.getByte();
                    var id = String(stream.getShort());
                    var info = flag == 1 ? "服务转发失败" : "找不到服务模块";
                    switch (id) {
                        case app.NetAction.JOIN_ROOM:
                            cy.log("进入房间失败[" + info + "]", 16 /* ROOM */);
                            user.getProxy().resetRoomState();
                            return;
                    }
                    cy.log(info + ":" + id, 32 /* UNDEFINE */);
                    return;
            }
        };
        return SrsErrorCommand;
    }(cy.SrsCommand));
    cy.SrsErrorCommand = SrsErrorCommand;
    __reflect(SrsErrorCommand.prototype, "cy.SrsErrorCommand");
})(cy || (cy = {}));
//# sourceMappingURL=SrsErrorCommand.js.map