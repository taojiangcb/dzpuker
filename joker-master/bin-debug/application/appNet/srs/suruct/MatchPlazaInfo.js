var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    var MatchPlazaInfo = (function () {
        function MatchPlazaInfo() {
        }
        MatchPlazaInfo.prototype.decode = function (inputStream) {
            this.gameId = inputStream.getInt();
            this.matchId = inputStream.getInt();
            this.subId = inputStream.getInt();
            this.status = inputStream.getByte();
            this.players = inputStream.getInt();
            this.startTime = inputStream.getInt();
            this.endTime = inputStream.getInt();
        };
        MatchPlazaInfo.prototype.encode = function (outputStream) {
        };
        return MatchPlazaInfo;
    }());
    cyvos.MatchPlazaInfo = MatchPlazaInfo;
    __reflect(MatchPlazaInfo.prototype, "cyvos.MatchPlazaInfo", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=MatchPlazaInfo.js.map