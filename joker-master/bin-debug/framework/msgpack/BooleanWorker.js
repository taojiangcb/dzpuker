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
        var BooleanWorker = (function (_super) {
            __extends(BooleanWorker, _super);
            function BooleanWorker(factory, byte) {
                if (byte === void 0) { byte = -1; }
                return _super.call(this, factory, byte) || this;
            }
            BooleanWorker.checkType = function (byte) {
                return byte == 0xc3 || byte == 0xc2;
            };
            BooleanWorker.prototype.assembly = function (data, destination) {
                destination.writeByte(data ? 0xc3 : 0xc2);
            };
            BooleanWorker.prototype.disassembly = function (source) {
                return this.byte == 0xc3;
            };
            return BooleanWorker;
        }(msgpack.Worker));
        msgpack.BooleanWorker = BooleanWorker;
        __reflect(BooleanWorker.prototype, "org.msgpack.BooleanWorker");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=BooleanWorker.js.map