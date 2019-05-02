var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cy;
(function (cy) {
    /**
     * @author huangkan
     *  基础数据类型写入器(根据服务器约定的数据类型写入数据，子对象需实现IServerSuruct接口)
     */
    var SrsStreamWriter = (function () {
        function SrsStreamWriter(stream) {
            this.stream = stream;
            stream.endian = egret.Endian.LITTLE_ENDIAN;
        }
        SrsStreamWriter.prototype.putLong = function (value, skip, bigEndian) {
            if (skip === void 0) { skip = 0; }
            if (bigEndian === void 0) { bigEndian = false; }
            if (skip != 0)
                this.stream.position += skip;
            if (bigEndian) {
                this.stream.writeUnsignedInt(Math.floor(value / 4294967296.0));
                this.stream.writeUnsignedInt(value);
            }
            else {
                this.stream.writeUnsignedInt(value);
                this.stream.writeUnsignedInt(Math.floor(value / 4294967296.0));
            }
            return this;
        };
        SrsStreamWriter.prototype.putInt = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.writeInt(value);
            return this;
        };
        SrsStreamWriter.prototype.putShort = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.writeShort(value);
            return this;
        };
        SrsStreamWriter.prototype.putUShort = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.writeUnsignedShort(value);
            return this;
        };
        /** 写入字符串类型(服务端使用GBK编码表示中文，默认BYTE表示长度) */
        SrsStreamWriter.prototype.putStr = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            value = URI.encode(value);
            this.putStrLength(value);
            var len = value.length;
            for (var i = 0; i < len; ++i) {
                if (value.charAt(i) == "%") {
                    this.putHex(value.substr(i + 1, 2));
                    i += 2;
                }
                else {
                    this.putByte(value.charCodeAt(i));
                }
            }
            return this;
        };
        SrsStreamWriter.prototype.putStrLength = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var len = value.length;
            var pLen = 0;
            for (var i = 0; i < len; ++i) {
                if (value.charAt(i) == "%") {
                    ++pLen;
                    i += 2;
                }
            }
            var sLen = len - (pLen * 2);
            if (sLen < 255) {
                this.stream.writeByte(sLen);
            }
            else if (sLen < 0xFFFE) {
                this.stream.writeByte(0xFF);
                this.stream.writeShort(sLen);
            }
            else {
                this.stream.writeByte(0xFF);
                this.stream.writeShort(0xFFFF);
                this.stream.writeInt(sLen);
            }
            return this;
        };
        SrsStreamWriter.prototype.putBool = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.writeBoolean(value);
            return this;
        };
        SrsStreamWriter.prototype.putByte = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.writeByte(value);
            return this;
        };
        SrsStreamWriter.prototype.putBytes = function (value, offset, len, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            if (len === undefined)
                len = value.length;
            if (offset === undefined)
                offset = 0;
            this.stream.writeBytes(value, offset, len);
            return this;
        };
        /** 写入约定的子结构体 */
        SrsStreamWriter.prototype.putSuruct = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            value.encode(this);
            return this;
        };
        /** 按字节长度写入16进制原始编码，若第一位为%,将以uri形式写入 */
        SrsStreamWriter.prototype.putHex = function (value, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var uri = value.charAt(0) == "%" ? 1 : 0;
            var len = value.length / (2 + uri);
            for (var i = 0; i < len; ++i) {
                var hexStr = value.charAt(i * (2 + uri) + uri) + value.charAt(i * (2 + uri) + 1 + uri);
                this.stream.writeByte(parseInt(hexStr, 16));
            }
            return this;
        };
        return SrsStreamWriter;
    }());
    cy.SrsStreamWriter = SrsStreamWriter;
    __reflect(SrsStreamWriter.prototype, "cy.SrsStreamWriter");
})(cy || (cy = {}));
//# sourceMappingURL=SrsStreamWriter.js.map