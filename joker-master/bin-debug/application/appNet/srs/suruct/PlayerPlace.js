var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    var PlayerPlace = (function () {
        function PlayerPlace() {
        }
        PlayerPlace.prototype.decode = function (inputStream) {
            this.appId = inputStream.getInt();
            this.appSession = inputStream.getInt();
            this.gameId = inputStream.getInt();
            this.state = inputStream.getByte();
        };
        PlayerPlace.prototype.encode = function (outputStream) {
        };
        return PlayerPlace;
    }());
    cyvos.PlayerPlace = PlayerPlace;
    __reflect(PlayerPlace.prototype, "cyvos.PlayerPlace", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=PlayerPlace.js.map