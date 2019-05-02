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
module org.msgpack
{

	/**
	 * MessagePack class. Use objects of this class to read and write message pack data.<br>
	 * Each MsgPack instance has a Factory instance.
	 * @see Factory
	 */
	export class MsgPack
	{
		//
		// static attributes
		//
		/**
		 * Major version value.
		 */
		static MAJOR:number = 1;
		/**
		 * Minor version value.
		 */
		static MINOR:number = 0;
		/**
		 * Revision version value;
		 */
		static REVISION:number = 1;

		/**
		 * Get full version as string.
		 * @return Full version string.
		 */
		static get VERSION():String
		{
			return MsgPack.MAJOR + "." + MsgPack.MINOR + "." + MsgPack.REVISION;
		}

		//
		// private attributes
		//
		private _factory:Factory;
		private root:Worker;


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
		constructor(flags:number = 0)
		{
			this._factory = new Factory(flags);
			this._factory.assign(NullWorker, 'null');
			this._factory.assign(BooleanWorker, 'boolean');
			// this._factory.assign(IntegerWorker, int, uint);
			this._factory.assign(NumberWorker, 'number');
			this._factory.assign(ArrayWorker, 'Array');
			this._factory.assign(RawWorker, 'egret.ByteArray', 'string');
			this._factory.assign(MapWorker, 'Object');
		}

		//
		// getters and setters
		//
		/**
		 * Get the factory associated to this object.
		 * @return Factory instance used by this instance.
		 * @see Worker
		 */
		get factory():Factory
		{
			return this._factory;
		}

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
		write(data:any, output:egret.ByteArray = null):any
		{
			var worker:Worker = this._factory.getWorkerByType(data);

			if (!output)
				output = new egret.ByteArray();

			this.checkBigEndian(output);

			worker.assembly(data, output);
			output.position = 0;
			return output;
		}

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
		read(input:egret.ByteArray):any
		{
			this.checkBigEndian(input);

			if (!this.root)
			{
				if (input.bytesAvailable == 0)
					return incomplete;

				this.root = this._factory.getWorkerByByte(input);
			}

			var obj:any = this.root.disassembly(input);

			if (obj != incomplete)
				this.root = undefined;

			return obj;
		}
		
		packArray(n:number,bytes:egret.ByteArray):void{
			var castBytes:egret.ByteArray = new egret.ByteArray();
			if (n < 16) {
				var d:number = 0x90 | n;
				bytes.writeByte(d);
			} else if (n < 65536) {
				castBytes[0] = 0xdc;
				// castBuffer.putShort(1, (short)n);
				castBytes[1] = (n >> 8);
				castBytes[2] = (n >> 0);
				bytes.writeBytes(castBytes, 0, 3);
			} else {
				castBytes[0] = 0xdd;
				// castBuffer.putInt(1, n);
				castBytes[1] = (n >> 24);
				castBytes[2] = (n >> 16);
				castBytes[3] = (n >> 8);
				castBytes[4] = (n >> 0);
				bytes.writeBytes(castBytes, 0, 5);
			}
		}
		
		private checkBigEndian(dataStream:egret.ByteArray):void
		{
			if (dataStream.endian == "littleEndian" && !this._factory.checkFlag(MsgPackFlags.ACCEPT_LITTLE_ENDIAN))
				throw new MsgPackError("Object uses little endian but MessagePack was designed for big endian. To avoid this error use the flag ACCEPT_LITTLE_ENDIAN.");
		}
	}
}