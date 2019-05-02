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
// Contribution:
// * 2012.10.22 - ccrossley (https://github.com/ccrossley)
// * 2013.01.22 - sparkle (https://github.com/sparkle)
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
        var RawWorker = (function (_super) {
            __extends(RawWorker, _super);
            function RawWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                var _this = _super.call(this, factory, byte) || this;
                _this.count = -1;
                return _this;
            }
            RawWorker.checkType = function (byte) {
                return (byte & 0xe0) == 0xa0 || byte == 0xda || byte == 0xdb;
            };
            RawWorker.prototype.assembly = function (data, destination) {
                var bytes;
                if (data instanceof egret.ByteArray) {
                    bytes = data;
                }
                else {
                    bytes = new egret.ByteArray();
                    bytes.writeUTFBytes(data.toString());
                }
                if (bytes.length < 32) {
                    // fix raw
                    destination.writeByte(0xa0 | bytes.length);
                }
                else if (bytes.length < 65536) {
                    // raw 16
                    destination.writeByte(0xda);
                    destination.writeShort(bytes.length);
                }
                else {
                    // raw 32
                    destination.writeByte(0xdb);
                    destination.writeInt(bytes.length);
                }
                destination.writeBytes(bytes);
            };
            RawWorker.prototype.disassembly = function (source) {
                if (this.count == -1) {
                    if ((this.byte & 0xe0) == 0xa0)
                        this.count = this.byte & 0x1f;
                    else if (this.byte == 0xda && source.bytesAvailable >= 2)
                        this.count = source.readUnsignedShort();
                    else if (this.byte == 0xdb && source.bytesAvailable >= 4)
                        this.count = source.readUnsignedInt();
                }
                if (source.bytesAvailable >= this.count) {
                    var data = new egret.ByteArray();
                    // we need to check whether the byte array is empty to avoid EOFError
                    // thanks to ccrossley
                    if (this.count > 0)
                        source.readBytes(data, 0, this.count);
                    // using flags this worker may return RAW as String (not only as ByteArray like previous version)
                    // thanks to sparkle
                    return this.factory.checkFlag(msgpack.MsgPackFlags.READ_RAW_AS_BYTE_ARRAY) ? data : data.toString();
                }
                return msgpack.incomplete;
            };
            return RawWorker;
        }(msgpack.Worker));
        msgpack.RawWorker = RawWorker;
        __reflect(RawWorker.prototype, "org.msgpack.RawWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=RawWorker.js.map