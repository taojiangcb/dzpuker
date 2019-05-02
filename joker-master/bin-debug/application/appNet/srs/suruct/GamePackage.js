var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  二级指令结构
     */
    var GamePackage = (function () {
        function GamePackage() {
            this.data = new egret.ByteArray();
            this.data.endian = egret.Endian.LITTLE_ENDIAN;
        }
        GamePackage.prototype.decode = function (inputStream) {
            this.xyId = inputStream.getShort();
            this.len = inputStream.getShort();
            if (this.len > 0) {
                this.data = inputStream.getBytes(this.len);
            }
        };
        GamePackage.prototype.encode = function (outputStream) {
            outputStream.putShort(this.xyId);
            this.len = this.data.length;
            outputStream.putShort(this.len);
            if (this.len > 0) {
                outputStream.putBytes(this.data);
            }
        };
        return GamePackage;
    }());
    cyvos.GamePackage = GamePackage;
    __reflect(GamePackage.prototype, "cyvos.GamePackage", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=GamePackage.js.map