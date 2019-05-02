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
    var SilverCommand = (function (_super) {
        __extends(SilverCommand, _super);
        function SilverCommand() {
            return _super.apply(this, arguments) || this;
        }
        SilverCommand.prototype.sendHandler = function (data, stream) {
            this.sendPackage.sProcessID = 1;
            if (user.getProxy().currentRoom != null) {
                this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            }
            stream.putByte(data[0]); //1取钱2存钱
            stream.putInt(data[1]); //存取款数量
            stream.putStr(data[2]); //银行密码
        };
        SilverCommand.prototype.resultHandler = function (stream) {
            var flag = stream.getByte();
            if (flag == 0) {
                user.getProxy().svrGameData.silver = stream.getLong();
                user.getProxy().svrGameData.bankSilver = stream.getLong();
                tip.popSysCenterTip("划账成功", tip.TIPS_TYPE.TIPS_CORRECT);
            }
            else {
                tip.popSysCenterTip("划账失败,错误ID:" + flag, tip.TIPS_TYPE.TIPS_WARNING);
            }
        };
        return SilverCommand;
    }(cy.SrsCommand));
    cy.SilverCommand = SilverCommand;
    __reflect(SilverCommand.prototype, "cy.SilverCommand");
})(cy || (cy = {}));
//# sourceMappingURL=SilverCommand.js.map