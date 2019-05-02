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
     *  信息变更服务器主动通知
     */
    var ChangeInfoCommand = (function (_super) {
        __extends(ChangeInfoCommand, _super);
        function ChangeInfoCommand() {
            return _super.apply(this, arguments) || this;
        }
        ChangeInfoCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                //服务端响应登录
                case app.NetAction.CMDT_REQSYNCDATA:
                    var type = stream.getInt();
                    var gameId = stream.getInt();
                    var str = stream.getStr();
                    switch (type) {
                        case 1:
                            this.sendNotification(app.NetAction.TOOL_RILVER); //获取平台银两
                            break;
                    }
                    return;
            }
        };
        return ChangeInfoCommand;
    }(cy.SrsCommand));
    cy.ChangeInfoCommand = ChangeInfoCommand;
    __reflect(ChangeInfoCommand.prototype, "cy.ChangeInfoCommand");
})(cy || (cy = {}));
//# sourceMappingURL=ChangeInfoCommand.js.map