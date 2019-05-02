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
        var ArrayWorker = (function (_super) {
            __extends(ArrayWorker, _super);
            function ArrayWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                var _this = _super.call(this, factory, byte) || this;
                _this.array = [];
                _this.workers = [];
                _this.count = -1;
                return _this;
            }
            ArrayWorker.checkType = function (byte) {
                return (byte & 0xf0) == 0x90 || byte == 0xdc || byte == 0xdd;
            };
            ArrayWorker.prototype.assembly = function (data, destination) {
                var l = data.length;
                if (l < 16) {
                    // fix array
                    destination.writeByte(0x90 | l);
                }
                else if (l < 65536) {
                    // array 16
                    destination.writeByte(0xdc);
                    destination.writeShort(l);
                }
                else {
                    // array 32
                    destination.writeByte(0xdd);
                    destination.writeUnsignedInt(l);
                }
                // write elements
                for (var i = 0; i < l; i++) {
                    var worker = this.factory.getWorkerByType(data[i]);
                    worker.assembly(data[i], destination);
                }
            };
            ArrayWorker.prototype.disassembly = function (source) {
                if (this.count == -1) {
                    if ((this.byte & 0xf0) == 0x90)
                        this.count = this.byte & 0x0f;
                    else if (this.byte == 0xdc && source.bytesAvailable >= 2)
                        this.count = source.readUnsignedShort();
                    else if (this.byte == 0xdd && source.bytesAvailable >= 4)
                        this.count = source.readUnsignedInt();
                }
                if (this.array.length < this.count) {
                    var first = this.array.length;
                    for (var i = first; i < this.count; i++) {
                        if (!this.workers[i]) {
                            if (source.bytesAvailable == 0)
                                break;
                            this.workers.push(this.factory.getWorkerByByte(source));
                        }
                        var obj = this.workers[i].disassembly(source);
                        if (obj != msgpack.incomplete) {
                            this.array.push(obj);
                            continue;
                        }
                        break;
                    }
                }
                if (this.array.length == this.count)
                    return this.array;
                return msgpack.incomplete;
            };
            return ArrayWorker;
        }(msgpack.Worker));
        msgpack.ArrayWorker = ArrayWorker;
        __reflect(ArrayWorker.prototype, "org.msgpack.ArrayWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=ArrayWorker.js.map