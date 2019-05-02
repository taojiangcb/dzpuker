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
        var MapWorker = (function (_super) {
            __extends(MapWorker, _super);
            function MapWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                var _this = _super.call(this, factory, byte) || this;
                _this.count = -1;
                _this.ready = 0;
                _this.map = {};
                _this.key = msgpack.incomplete;
                _this.val = msgpack.incomplete;
                return _this;
            }
            MapWorker.checkType = function (byte) {
                return (byte & 0xf0) == 0x80 || byte == 0xde || byte == 0xdf;
            };
            MapWorker.prototype.assembly = function (data, destination) {
                var elements = [];
                for (var key in data)
                    elements.push(key);
                var l = elements.length;
                if (l < 16) {
                    // fix map
                    destination.writeByte(0x80 | l);
                }
                else if (l < 65536) {
                    // map 16
                    destination.writeByte(0xde);
                    destination.writeShort(l);
                }
                else {
                    // map 32
                    destination.writeByte(0xdf);
                    destination.writeUnsignedInt(l);
                }
                for (var i = 0; i < l; i++) {
                    var elemKey = elements[i];
                    var keyWorker = this.factory.getWorkerByType(elemKey);
                    keyWorker.assembly(elemKey, destination);
                    var valWorker = this.factory.getWorkerByType(data[elemKey]);
                    valWorker.assembly(data[elemKey], destination);
                }
            };
            MapWorker.prototype.disassembly = function (source) {
                if (this.count == -1) {
                    if ((this.byte & 0xf0) == 0x80)
                        this.count = this.byte & 0x0f;
                    else if (this.byte == 0xde && source.bytesAvailable >= 2)
                        this.count = source.readUnsignedShort();
                    else if (this.byte == 0xdf && source.bytesAvailable >= 4)
                        this.count = source.readUnsignedInt();
                }
                if (this.ready < this.count) {
                    var first = this.ready;
                    for (var i = first; i < this.count; i++) {
                        if (this.key == msgpack.incomplete) {
                            if (!this.keyWorker) {
                                if (source.bytesAvailable == 0)
                                    break;
                                this.keyWorker = this.factory.getWorkerByByte(source);
                            }
                            this.key = this.keyWorker.disassembly(source);
                        }
                        if (this.key != msgpack.incomplete && this.val == msgpack.incomplete) {
                            if (!this.valWorker) {
                                if (source.bytesAvailable == 0)
                                    break;
                                this.valWorker = this.factory.getWorkerByByte(source);
                            }
                            this.val = this.valWorker.disassembly(source);
                        }
                        if (this.key != msgpack.incomplete && this.val != msgpack.incomplete) {
                            this.map[this.key.toString()] = this.val;
                            this.keyWorker = undefined;
                            this.valWorker = undefined;
                            this.key = msgpack.incomplete;
                            this.val = msgpack.incomplete;
                            this.ready++;
                            continue;
                        }
                        break;
                    }
                }
                if (this.ready == this.count)
                    return this.map;
                return msgpack.incomplete;
            };
            return MapWorker;
        }(msgpack.Worker));
        msgpack.MapWorker = MapWorker;
        __reflect(MapWorker.prototype, "org.msgpack.MapWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=MapWorker.js.map