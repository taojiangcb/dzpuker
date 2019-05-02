var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
        /**
         * MessagePack class. Use objects of this class to read and write message pack data.<br>
         * Each MsgPack instance has a Factory instance.
         * @see Factory
         */
        var MsgPack = (function () {
            //
            // constructor
            //
            /**
             * Create a new instance of <code>MsgPack</code> capable of reading/writing data.
             * You can decode streaming data using the method <code>read</code>.<br>
             * The standard workers are:<br>
             * <li><code>NullWorker: null</code></li>
             * <li><code>BooleanWorker: Boolean</code></li>
             * <li><code>IntegerWorker: int and uint</code></li>
             * <li><code>NumberWorker: Number</code></li>
             * <li><code>ArrayWorker: Array</code></li>
             * <li><code>RawWorker: ByteArray or String</code></li>
             * <li><code>MapWorker: Object</code></li>
             * @param flags Set of flags capable of customizing the runtime behavior of this object.
             * @see #read()
             * @see #write()
             * @see Worker
             * @see MsgPackFlags#READ_RAW_AS_BYTE_ARRAY
             * @see MsgPackFlags#ACCEPT_LITTLE_ENDIAN
             * @see Factory#checkFlag()
             */
            function MsgPack(flags) {
                if (flags === void 0) { flags = 0; }
                this._factory = new msgpack.Factory(flags);
                this._factory.assign(msgpack.NullWorker, 'null');
                this._factory.assign(msgpack.BooleanWorker, 'boolean');
                // this._factory.assign(IntegerWorker, int, uint);
                this._factory.assign(msgpack.NumberWorker, 'number');
                this._factory.assign(msgpack.ArrayWorker, 'Array');
                this._factory.assign(msgpack.RawWorker, 'egret.ByteArray', 'string');
                this._factory.assign(msgpack.MapWorker, 'Object');
            }
            Object.defineProperty(MsgPack, "VERSION", {
                /**
                 * Get full version as string.
                 * @return Full version string.
                 */
                get: function () {
                    return MsgPack.MAJOR + "." + MsgPack.MINOR + "." + MsgPack.REVISION;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MsgPack.prototype, "factory", {
                //
                // getters and setters
                //
                /**
                 * Get the factory associated to this object.
                 * @return Factory instance used by this instance.
                 * @see Worker
                 */
                get: function () {
                    return this._factory;
                },
                enumerable: true,
                configurable: true
            });
            //
            // public interface
            //
            /**
             * Write an object in <code>output</code> buffer.
             * @param data Object to be encoded
             * @param output Any object that implements <code>IDataOutput</code> interface (<code>ByteArray</code>, <code>Socket</code>, <code>URLStream</code>, etc).
             * @return Return <code>output</code> whether it isn't <code>null</code>. Otherwise return a new <code>ByteArray</code>.
             * @see Worker#assembly()
             */
            MsgPack.prototype.write = function (data, output) {
                if (output === void 0) { output = null; }
                var worker = this._factory.getWorkerByType(data);
                if (!output)
                    output = new egret.ByteArray();
                this.checkBigEndian(output);
                worker.assembly(data, output);
                output.position = 0;
                return output;
            };
            /**
             * Read an object from <code>input</code> buffer. This method supports streaming.
             * If the object cannot be completely decoded (not all bytes available in <code>input</code>), <code>incomplete</code> object is returned.
             * However, the internal state (the part that was already decoded) is saved. Thus, you can read from a stream if you make successive calls to this method.
             * If all bytes are available, the decoded object is returned.
             * @param input Any object that implements <code>IDataInput</code> interface (<code>ByteArray</code>, <code>Socket</code>, <code>URLStream</code>, etc).
             * @return Return the decoded object if all bytes were available in the input stream, otherwise returns <code>incomplete</code> object.
             * @see org.msgpack#incomplete
             * @see Worker#disassembly()
             */
            MsgPack.prototype.read = function (input) {
                this.checkBigEndian(input);
                if (!this.root) {
                    if (input.bytesAvailable == 0)
                        return msgpack.incomplete;
                    this.root = this._factory.getWorkerByByte(input);
                }
                var obj = this.root.disassembly(input);
                if (obj != msgpack.incomplete)
                    this.root = undefined;
                return obj;
            };
            MsgPack.prototype.packArray = function (n, bytes) {
                var castBytes = new egret.ByteArray();
                if (n < 16) {
                    var d = 0x90 | n;
                    bytes.writeByte(d);
                }
                else if (n < 65536) {
                    castBytes[0] = 0xdc;
                    // castBuffer.putShort(1, (short)n);
                    castBytes[1] = (n >> 8);
                    castBytes[2] = (n >> 0);
                    bytes.writeBytes(castBytes, 0, 3);
                }
                else {
                    castBytes[0] = 0xdd;
                    // castBuffer.putInt(1, n);
                    castBytes[1] = (n >> 24);
                    castBytes[2] = (n >> 16);
                    castBytes[3] = (n >> 8);
                    castBytes[4] = (n >> 0);
                    bytes.writeBytes(castBytes, 0, 5);
                }
            };
            MsgPack.prototype.checkBigEndian = function (dataStream) {
                if (dataStream.endian == "littleEndian" && !this._factory.checkFlag(msgpack.MsgPackFlags.ACCEPT_LITTLE_ENDIAN))
                    throw new msgpack.MsgPackError("Object uses little endian but MessagePack was designed for big endian. To avoid this error use the flag ACCEPT_LITTLE_ENDIAN.");
            };
            return MsgPack;
        }());
        //
        // static attributes
        //
        /**
         * Major version value.
         */
        MsgPack.MAJOR = 1;
        /**
         * Minor version value.
         */
        MsgPack.MINOR = 0;
        /**
         * Revision version value;
         */
        MsgPack.REVISION = 1;
        msgpack.MsgPack = MsgPack;
        __reflect(MsgPack.prototype, "org.msgpack.MsgPack");
    })(msgpack = org.msgpack || (org.msgpack = {}));
})(org || (org = {}));
//# sourceMappingURL=MsgPack.js.map