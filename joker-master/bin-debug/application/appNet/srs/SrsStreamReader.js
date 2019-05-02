var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cy;
(function (cy) {
    /**
     * @author huangkan
     *  基础数据类型读取器(根据服务器约定的数据类型读取数据，子对象需实现IServerSuruct接口)
     */
    var SrsStreamReader = (function () {
        function SrsStreamReader(stream) {
            this.stream = stream;
            this.stream.endian = egret.Endian.LITTLE_ENDIAN;
        }
        SrsStreamReader.prototype.getAvailable = function () {
            return this.stream.bytesAvailable;
        };
        SrsStreamReader.prototype.getFloat = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readFloat();
        };
        SrsStreamReader.prototype.getInt = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readInt();
        };
        SrsStreamReader.prototype.getUInt = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readUnsignedInt();
        };
        SrsStreamReader.prototype.getShort = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readShort();
        };
        SrsStreamReader.prototype.getUShort = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readUnsignedShort();
        };
        SrsStreamReader.prototype.getLong = function (skip, bigEndian) {
            if (skip === void 0) { skip = 0; }
            if (bigEndian === void 0) { bigEndian = false; }
            if (skip != 0)
                this.stream.position += skip;
            var high = this.stream.readUnsignedInt();
            var low = this.stream.readUnsignedInt();
            return bigEndian ? high * 4294967296.0 + low : low * 4294967296.0 + high;
        };
        /** 读取字符串类型(服务端使用GBK编码表示中文，默认BYTE表示长度) */
        SrsStreamReader.prototype.getStr = function (skip) {
            if (skip === void 0) { skip = 0; }
            var len = this.getStrLength(skip);
            //return len > 0 ? utils.NativeUtils.ToGBKString(this.getBytes(len).buffer): ""; 
            var hexStr = this.getHex(len, true);
            if (len > 0) {
                try {
                    return URI.decode(hexStr.replace("%20", " "));
                }
                catch (error) {
                    console.log("uriError[" + hexStr + "]");
                    return "uriErr";
                }
            }
            return "";
        };
        SrsStreamReader.prototype.getStrLength = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var len = this.stream.readUnsignedByte();
            if (len == 0xFF) {
                len = this.stream.readUnsignedShort();
                if (len == 0xFFFF) {
                    len = this.stream.readUnsignedInt();
                }
            }
            return len;
        };
        SrsStreamReader.prototype.getUTFStr = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var len = this.stream.readUnsignedByte();
            return len > 0 ? this.stream.readUTFBytes(len) : "";
        };
        SrsStreamReader.prototype.getBool = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readBoolean();
        };
        SrsStreamReader.prototype.getByte = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readByte();
        };
        SrsStreamReader.prototype.getUByte = function (skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            return this.stream.readUnsignedByte();
        };
        /** 按长度读取字节流(若指定cache，讲在cache中写入，并返回。
         * 注意：将从cache的position处开始写入，但不会改变cache的position值) */
        SrsStreamReader.prototype.getBytes = function (len, cache, skip) {
            if (skip === void 0) { skip = 0; }
            if (cache == null) {
                cache = new egret.ByteArray();
                cache.endian = egret.Endian.LITTLE_ENDIAN;
            }
            if (skip != 0)
                this.stream.position += skip;
            this.stream.readBytes(cache, cache.position, len);
            return cache;
        };
        /** 指定结构体类型（实现IServerSuruct的类），返回具体的结构体。 */
        SrsStreamReader.prototype.getSuruct = function (suruct, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var suructInstence = new suruct();
            suructInstence.decode(this);
            return suructInstence;
        };
        /** 按字节长度返回16进制原始编码，uri指定是否以uri形式显示 */
        SrsStreamReader.prototype.getHex = function (len, uri, skip) {
            if (skip === void 0) { skip = 0; }
            if (skip != 0)
                this.stream.position += skip;
            var hexStr = "";
            for (var i = 0; i < len; ++i) {
                var byte = this.stream.readUnsignedByte();
                var bytesStr = (byte < 0x10 ? "0" : "") + byte.toString(16);
                if (uri) {
                    if (byte < 0x7e && byte > 0x20) {
                        hexStr += String.fromCharCode(byte);
                    }
                    else {
                        hexStr += "%" + bytesStr.toLocaleUpperCase();
                    }
                }
                else {
                    hexStr += bytesStr;
                }
            }
            return hexStr;
        };
        return SrsStreamReader;
    }());
    cy.SrsStreamReader = SrsStreamReader;
    __reflect(SrsStreamReader.prototype, "cy.SrsStreamReader");
})(cy || (cy = {}));
//# sourceMappingURL=SrsStreamReader.js.map