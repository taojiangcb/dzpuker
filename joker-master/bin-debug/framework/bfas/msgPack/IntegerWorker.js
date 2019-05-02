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
    var IntegerWorker = (function (_super) {
        __extends(IntegerWorker, _super);
        function IntegerWorker(factory, byte) {
            if (byte === void 0) { byte = -1; }
            return _super.call(this, factory, byte) || this;
        }
        IntegerWorker.checkType = function (byte) {
            return (byte & 0x80) == 0 || (byte & 0xe0) == 0xe0 ||
                byte == 0xcc || byte == 0xcd || byte == 0xce ||
                byte == 0xd0 || byte == 0xd1 || byte == 0xd2;
        };
        IntegerWorker.prototype.assembly = function (data, destination) {
            data = data.value;
            if (data < -(1 << 5)) {
                if (data < -(1 << 15)) {
                    // signed 32
                    destination.writeByte(0xd2);
                    destination.writeInt(data);
                }
                else if (data < -(1 << 7)) {
                    // signed 16
                    destination.writeByte(0xd1);
                    destination.writeShort(data);
                }
                else {
                    // signed 8
                    destination.writeByte(0xd0);
                    destination.writeByte(data);
                }
            }
            else if (data < (1 << 7)) {
                // fixnum
                destination.writeByte(data);
            }
            else {
                if (data < (1 << 8)) {
                    // unsigned 8
                    destination.writeByte(0xcc);
                    destination.writeByte(data);
                }
                else if (data < (1 << 16)) {
                    // unsigned 16
                    destination.writeByte(0xcd);
                    destination.writeShort(data);
                }
                else {
                    // unsigned 32
                    destination.writeByte(0xce);
                    destination.writeUnsignedInt(data);
                }
            }
        };
        IntegerWorker.prototype.disassembly = function (source) {
            var i;
            var data;
            if ((this.byte & 0x80) == 0) {
                // positive fixnum
                return new mc2sdk.Integer(this.byte);
            }
            else if ((this.byte & 0xe0) == 0xe0) {
                // negative fixnum
                return new mc2sdk.Integer(this.byte - 0xff - 1);
            }
            else if (this.byte == 0xcc && source.bytesAvailable >= 1) {
                // unsigned byte
                return new mc2sdk.Integer(source.readUnsignedByte());
            }
            else if (this.byte == 0xcd && source.bytesAvailable >= 2) {
                // unsigned short
                return new mc2sdk.Integer(source.readUnsignedShort());
            }
            else if (this.byte == 0xce && source.bytesAvailable >= 4) {
                // unsigned int
                return new mc2sdk.Integer(source.readUnsignedInt());
            }
            else if (this.byte == 0xcf && source.bytesAvailable >= 8) {
                // unsigned long
                return new mc2sdk.LongWorker(this.factory, this.byte).disassembly(source);
            }
            else if (this.byte == 0xd0 && source.bytesAvailable >= 1) {
                // signed byte
                return new mc2sdk.Integer(source.readByte());
            }
            else if (this.byte == 0xd1 && source.bytesAvailable >= 2) {
                // signed short
                return new mc2sdk.Integer(source.readShort());
            }
            else if (this.byte == 0xd2 && source.bytesAvailable >= 4) {
                // signed int
                return new mc2sdk.Integer(source.readInt());
            }
            else if (this.byte == 0xd3 && source.bytesAvailable >= 8) {
                // signed long
                return new mc2sdk.LongWorker(this.factory, this.byte).disassembly(source);
            }
            return org.msgpack.incomplete;
        };
        return IntegerWorker;
    }(org.msgpack.Worker));
    mc2sdk.IntegerWorker = IntegerWorker;
    __reflect(IntegerWorker.prototype, "mc2sdk.IntegerWorker");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=IntegerWorker.js.map