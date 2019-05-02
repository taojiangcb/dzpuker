var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cyvos;
(function (cyvos) {
    /**
     * @author huangkan
     *  SRS基础详细结构
     *
     *  细节且听张力SAY: 简单来说SRSXY.h里的协议发送时APPID和PROCESSID都是0
     *  其他功能模块的协议PROCESSID必须填，
     *  APPID看情况，有状态的必须填入发到游戏模块，无状态的可以不填，如发到工具模块的
     */
    var SrsPackage = (function () {
        function SrsPackage() {
            /** 标志位 */
            this.sFlag = 16385; // 2 << 13 | 1
            /** 包体大小,不包含包头的大小 */
            this.sLen = 0;
            /** 协议id */
            this.sXYID = 0;
            /** 服务器模块id */
            this.sProcessID = 0;
            /** 服务器服务id */
            this.nAppID = 0;
            this.data = new egret.ByteArray();
            this.data.endian = egret.Endian.LITTLE_ENDIAN;
        }
        SrsPackage.prototype.decode = function (inputStream) {
            this.sFlag = inputStream.getUShort();
            this.sLen = inputStream.getUShort();
            this.sXYID = inputStream.getUShort();
            this.sProcessID = inputStream.getUShort();
            this.nAppID = inputStream.getInt();
            if (this.sLen > 0) {
                this.data = inputStream.getBytes(this.sLen);
            }
            if (this.sFlag & 1) {
                var bytes = cy.helpDecrypt(this.data.buffer);
                this.data = new egret.ByteArray(bytes);
                this.data.endian = egret.Endian.LITTLE_ENDIAN;
            }
        };
        SrsPackage.prototype.encode = function (outputStream) {
            // console.log("=============================" + this.data.length);
            // console.log(FormatUtils.bufferToStr(this.data.buffer));
            if (this.sFlag & 1) {
                this.data = new egret.ByteArray(cy.helpEncrypt(this.data.buffer));
            }
            // console.log(FormatUtils.bufferToStr(this.data.buffer));
            // console.log("-----------------------------");
            this.sLen = this.data.length;
            outputStream.putUShort(this.sFlag);
            outputStream.putUShort(this.sLen);
            outputStream.putUShort(this.sXYID);
            outputStream.putUShort(this.sProcessID);
            outputStream.putInt(this.nAppID);
            outputStream.putBytes(this.data);
        };
        return SrsPackage;
    }());
    cyvos.SrsPackage = SrsPackage;
    __reflect(SrsPackage.prototype, "cyvos.SrsPackage", ["cy.IServerSuruct"]);
})(cyvos || (cyvos = {}));
//# sourceMappingURL=SrsPackage.js.map