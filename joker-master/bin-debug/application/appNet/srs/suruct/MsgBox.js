var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  服务端推送的消息对象
     */
    var MsgBox = (function () {
        function MsgBox() {
        }
        MsgBox.prototype.decode = function (inputStream) {
            this.mtype = inputStream.getByte();
            this.szCaption = inputStream.getStr();
            this.szText = inputStream.getStr();
            this.dwIconBtn = inputStream.getInt();
            this.delay = inputStream.getByte();
            this.color = inputStream.getInt();
            this.szWeb = inputStream.getStr();
            this.dwAction = inputStream.getByte();
        };
        MsgBox.prototype.encode = function (outputStream) {
        };
        return MsgBox;
    }());
    cyvos.MsgBox = MsgBox;
    __reflect(MsgBox.prototype, "cyvos.MsgBox", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=MsgBox.js.map