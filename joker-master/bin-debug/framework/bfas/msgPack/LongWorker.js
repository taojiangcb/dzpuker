var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mc2sdk;
(function (mc2sdk) {
    var LongWorker = (function (_super) {
        __extends(LongWorker, _super);
        function LongWorker(factory, byte) {
            if (byte === void 0) { byte = -1; }
            return _super.call(this, factory, byte) || this;
        }
        LongWorker.checkType = function (byte) {
            return byte == 0xd3 || byte == 0xcf;
        };
        LongWorker.prototype.assembly = function (data, destination) {
            var long = data;
            if (long.toNumber() < 0) {
                destination.writeByte(0xd3);
            }
            else {
                destination.writeByte(0xcf);
            }
            if (destination.endian == egret.Endian.LITTLE_ENDIAN) {
                destination.writeUnsignedInt(long.little);
                destination.writeInt(long.big);
            }
            else {
                destination.writeInt(long.big);
                destination.writeUnsignedInt(long.little);
            }
        };
        LongWorker.prototype.disassembly = function (source) {
            var little;
            var big;
            if (LongWorker.checkType(this.byte) && source.bytesAvailable >= 8) {
                if (source.endian == egret.Endian.LITTLE_ENDIAN) {
                    little = source.readUnsignedInt();
                    big = source.readInt();
                }
                else {
                    big = source.readInt();
                    little = source.readUnsignedInt();
                }
                return new mc2sdk.Long(big, little).toNumber();
            }
            return org.msgpack.incomplete;
        };
        return LongWorker;
    }(org.msgpack.Worker));
    mc2sdk.LongWorker = LongWorker;
    __reflect(LongWorker.prototype, "mc2sdk.LongWorker");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=LongWorker.js.map