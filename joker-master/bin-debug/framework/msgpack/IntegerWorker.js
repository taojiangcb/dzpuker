var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// as3-msgpack (MessagePack for Actionscript3)
// Copyright (C) 2013 Lucas Teixeira (Disturbed Coder)
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
var org;
(function (org) {
    var msgpack;
    (function (msgpack) {
        var IntegerWorker = (function (_super) {
            __extends(IntegerWorker, _super);
            function IntegerWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                return _super.call(this, factory, byte) || this;
            }
            IntegerWorker.checkType = function (byte) {
                return (byte & 0x80) == 0 || (byte & 0xe0) == 0xe0 || byte == 0xcc || byte == 0xcd ||
                    byte == 0xce || byte == 0xcf || byte == 0xd0 || byte == 0xd1 ||
                    byte == 0xd2 || byte == 0xd3;
            };
            IntegerWorker.prototype.assembly = function (data, destination) {
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
                    return this.byte;
                }
                else if ((this.byte & 0xe0) == 0xe0) {
                    // negative fixnum
                    return this.byte - 0xff - 1;
                }
                else if (this.byte == 0xcc && source.bytesAvailable >= 1) {
                    // unsigned byte
                    return source.readUnsignedByte();
                }
                else if (this.byte == 0xcd && source.bytesAvailable >= 2) {
                    // unsigned short
                    return source.readUnsignedShort();
                }
                else if (this.byte == 0xce && source.bytesAvailable >= 4) {
                    // unsigned int
                    return source.readUnsignedInt();
                }
                else if (this.byte == 0xcf && source.bytesAvailable >= 8) {
                    // TODO: can't read 64 bits unsigned integers
                    for (i = 0; i < 8; i++)
                        source.readByte();
                    return NaN;
                }
                else if (this.byte == 0xd0 && source.bytesAvailable >= 1) {
                    // signed byte
                    return source.readByte();
                }
                else if (this.byte == 0xd1 && source.bytesAvailable >= 2) {
                    // signed short
                    return source.readShort();
                }
                else if (this.byte == 0xd2 && source.bytesAvailable >= 4) {
                    // signed int
                    return source.readInt();
                }
                else if (this.byte == 0xd3 && source.bytesAvailable >= 8) {
                    // TODO: can't read 64 bits integers
                    for (i = 0; i < 8; i++)
                        source.readByte();
                    return NaN;
                }
                return msgpack.incomplete;
            };
            return IntegerWorker;
        }(msgpack.Worker));
        msgpack.IntegerWorker = IntegerWorker;
        __reflect(IntegerWorker.prototype, "org.msgpack.IntegerWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=IntegerWorker.js.map