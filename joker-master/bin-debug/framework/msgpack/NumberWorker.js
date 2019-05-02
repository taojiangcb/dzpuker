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
        var NumberWorker = (function (_super) {
            __extends(NumberWorker, _super);
            function NumberWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                return _super.call(this, factory, byte) || this;
            }
            NumberWorker.checkType = function (byte) {
                return byte == 0xca || byte == 0xcb;
            };
            NumberWorker.prototype.assembly = function (data, destination) {
                destination.writeByte(0xcb);
                destination.writeDouble(data);
            };
            NumberWorker.prototype.isassembly = function (source) {
                var data;
                if (this.byte == 0xca && source.bytesAvailable >= 4)
                    return source.readFloat();
                else if (this.byte == 0xcb && source.bytesAvailable >= 8)
                    return source.readDouble();
                return msgpack.incomplete;
            };
            return NumberWorker;
        }(msgpack.Worker));
        msgpack.NumberWorker = NumberWorker;
        __reflect(NumberWorker.prototype, "org.msgpack.NumberWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=NumberWorker.js.map