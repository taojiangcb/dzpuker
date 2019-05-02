var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  服务端查询的游戏数据对象
     */
    var PlayerInfo = (function () {
        function PlayerInfo() {
        }
        PlayerInfo.prototype.decode = function (inputStream, skip) {
            if (skip === void 0) { skip = 0; }
            // this.brandId = inputStream.getInt(skip);
            // this.numId = inputStream.getInt();
            this.roleId = inputStream.getLong(skip, true);
            this.coustomerId = inputStream.getStr();
            this.nickname = inputStream.getStr();
            this.right = inputStream.getInt();
            this.sex = inputStream.getByte();
            this.silver = inputStream.getLong();
            this.score = inputStream.getLong();
            this.exp = inputStream.getInt();
            this.numWins = inputStream.getInt();
            this.numLosts = inputStream.getInt();
            this.numPeaces = inputStream.getInt();
            this.numEscapes = inputStream.getInt();
            this.societyId = inputStream.getInt();
            this.societyName = inputStream.getStr();
            this.state = inputStream.getShort();
            this.tableId = inputStream.getShort();
            this.sitorder = inputStream.getByte();
            this.netSpeed = inputStream.getShort();
            this.avatarId = inputStream.getInt();
            this.vipId = inputStream.getInt();
            this.clientType = inputStream.getInt();
            this.hardwareFlag = inputStream.getInt();
            this.pictureId = inputStream.getInt();
            this.scoreType = inputStream.getInt();
            // this.ptnumId = inputStream.getStr();
            // this.osVer = inputStream.getInt();
        };
        PlayerInfo.prototype.encode = function (outputStream) {
        };
        return PlayerInfo;
    }());
    cyvos.PlayerInfo = PlayerInfo;
    __reflect(PlayerInfo.prototype, "cyvos.PlayerInfo", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=PlayerInfo.js.map