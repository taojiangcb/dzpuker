var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    var PlayerGameData = (function () {
        function PlayerGameData() {
        }
        PlayerGameData.prototype.decode = function (inputStream) {
            // this.numId = inputStream.getInt(skip);
            // this.brandId = inputStream.getInt();
            this.roleId = inputStream.getLong();
            this.score = inputStream.getLong();
            this.silver = inputStream.getLong();
            this.numWins = inputStream.getInt();
            this.numLosts = inputStream.getInt();
            this.numPeaces = inputStream.getInt();
            this.numEscapes = inputStream.getInt();
            this.exp = inputStream.getInt();
            this.profit = inputStream.getInt();
            this.isNew = inputStream.getBool();
            this.bankSilver = inputStream.getLong();
        };
        PlayerGameData.prototype.encode = function (outputStream) {
        };
        return PlayerGameData;
    }());
    cyvos.PlayerGameData = PlayerGameData;
    __reflect(PlayerGameData.prototype, "cyvos.PlayerGameData", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=PlayerGameData.js.map