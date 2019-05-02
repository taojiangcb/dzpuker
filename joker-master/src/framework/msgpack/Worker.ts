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
	 * Worker base class. Workers are used in factories where they are assigned to encode/decode message pack data of a type. Each type of data uses a own worker.<br>
	 * If you want to create a custom worker (for a custom type) you need to create a class which extends this class.
	 * @see Factory
	 */
	export class Worker
	{
		/**
		 * Static method which checks whether this worker is capable of decoding the data type of this byte.<br>
		 * Children classes must rewrite this static method.
		 * @param byte Signature byte of a message pack object.
		 * @return Must return true if this worker is capable of decoding the following data.
		 */
		static checkType(byte:number):boolean
		{
			return false;
		}

		/**
		 * The instance of the parent factory
		 */
		protected factory:Factory;
		/**
		 * The signature byte of the following data. If this worker was created to encode an object, the value of this property is always -1.
		 */
		protected byte:number;

		/**
		 * Construct a new instance of this worker. Workers are created anytime that the parent factory needs to encode or decode the data type handled by this worker.
		 * @param factory Parent factory
		 * @param byte Signature byte
		 */
		constructor(factory:Factory, byte:number = -1)
		{
			this.factory = factory;
			this.byte = byte;
		}

		/**
		 * The instance of the parent factory.
		 * @return Return the instance of the parent factory.
		 */
		getFactory():Factory
		{
			return this.factory;
		}

		/**
		 * The signature byte of the following data. If this worker was created to encode an object, the value of this property is always -1.
		 * @return Return the signature byte.
		 */
		getByte():number
		{
			return this.byte;
		}

		/**
		 * Encode <code>data</code> into <code>destination</code> stream.
		 * @param data Object to be encoded.
		 * @param destination Object which implements <code>IDataOutput</code>.
		 * @see MsgPack#write()
		 */
		assembly(data:any, destination:egret.ByteArray):void
		{
		}

		/**
		 * Decode an object from <code>source</code> stream. If not all bytes of the object are available, this method must return <code>incomplete</code>,
		 * and the content which was already decoded must be saved. Thus, you can read stream data making consecutive calls to this method.
		 * @param source Object which implements <code>IDataInput</code>.
		 * @return The decoded object
		 * @see org.msgpack#incomplete
		 * @see MsgPack#read()
		 */
		disassembly(source:egret.ByteArray):any
		{
			return incomplete;
		}
	}
}