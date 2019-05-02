var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  服务端推送的玩家状态对象
     */
    var PlayerStateInfo = (function () {
        function PlayerStateInfo() {
        }
        PlayerStateInfo.prototype.decode = function (inputStream) {
            this.state = inputStream.getByte();
            this.roomId = inputStream.getInt();
            this.tableId = inputStream.getShort();
            this.sitorder = inputStream.getByte();
            // this.brandId = inputStream.getInt();
            // this.numId = inputStream.getInt();
            this.roleId = inputStream.getLong(0, true);
        };
        PlayerStateInfo.prototype.encode = function (outputStream) {
        };
        return PlayerStateInfo;
    }());
    cyvos.PlayerStateInfo = PlayerStateInfo;
    __reflect(PlayerStateInfo.prototype, "cyvos.PlayerStateInfo", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=PlayerStateInfo.js.map