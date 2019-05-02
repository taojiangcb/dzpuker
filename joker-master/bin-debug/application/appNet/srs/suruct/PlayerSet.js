var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  客户端设置服务器密码
     */
    var PlayerSet = (function () {
        function PlayerSet() {
        }
        PlayerSet.prototype.decode = function (inputStream) {
        };
        PlayerSet.prototype.encode = function (outputStream) {
            if (this.password == null)
                this.mask = 0;
            else
                this.mask = 2 /* PASSWORD */;
            outputStream
                .putShort(this.mask)
                .putStr(this.password == null ? "" : this.password)
                .putInt(0)
                .putInt(0)
                .putLong(0)
                .putLong(0)
                .putLong(0)
                .putLong(0);
        };
        return PlayerSet;
    }());
    cyvos.PlayerSet = PlayerSet;
    __reflect(PlayerSet.prototype, "cyvos.PlayerSet", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=PlayerSet.js.map