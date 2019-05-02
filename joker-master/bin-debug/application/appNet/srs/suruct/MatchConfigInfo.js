var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  服务端推送的消息对象
     */
    var MatchConfigInfo = (function () {
        function MatchConfigInfo() {
        }
        MatchConfigInfo.prototype.decode = function (inputStream) {
            this.matchProcessId = inputStream.getInt();
            this.gameProcessId = inputStream.getInt();
            this.groupId = inputStream.getInt();
            this.matchAppId = inputStream.getInt();
            this.gameAppId = inputStream.getInt();
            this.gameId = inputStream.getInt();
            this.gamekey = inputStream.getStr();
            this.matchId = inputStream.getInt();
            this.name = inputStream.getStr();
            this.startType = inputStream.getInt();
            this.startParam = inputStream.getStr();
            this.ruleType = inputStream.getInt();
            this.signupType = inputStream.getInt();
            this.signupDesc = inputStream.getStr();
            this.intervalTime = inputStream.getInt();
            this.startTime = inputStream.getInt();
            this.endTime = inputStream.getInt();
            this.matchUrl = inputStream.getStr();
            this.matchDesc = inputStream.getStr();
            this.matchReward = inputStream.getStr();
        };
        MatchConfigInfo.prototype.encode = function (outputStream) {
        };
        return MatchConfigInfo;
    }());
    cyvos.MatchConfigInfo = MatchConfigInfo;
    __reflect(MatchConfigInfo.prototype, "cyvos.MatchConfigInfo", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=MatchConfigInfo.js.map