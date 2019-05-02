var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  服务端推送的桌子信息对象
     */
    var TableInfo = (function () {
        function TableInfo() {
        }
        TableInfo.prototype.encode = function (outputStream) {
        };
        TableInfo.prototype.decode = function (inputStream, skip) {
            if (skip === void 0) { skip = 0; }
            this.svrId = inputStream.getShort(skip);
            this.state = inputStream.getByte();
            this.tableStyle = inputStream.getByte();
            this.havePwd = inputStream.getBool();
            this.chairs = inputStream.getByte();
            this.joinRule = inputStream.getStr();
            this.gameRule = inputStream.getStr();
            this.seeRule = inputStream.getStr();
            this.haveOwner = inputStream.getBool();
            if (this.haveOwner) {
                this.ownerBrandId = inputStream.getInt();
                this.ownerNumberId = inputStream.getInt();
            }
            this.gameKeyword = inputStream.getStr();
        };
        return TableInfo;
    }());
    cyvos.TableInfo = TableInfo;
    __reflect(TableInfo.prototype, "cyvos.TableInfo", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=TableInfo.js.map