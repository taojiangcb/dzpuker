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

	export class ArrayWorker extends Worker
	{
		static checkType(byte:number):boolean
		{
			return (byte & 0xf0) == 0x90 || byte == 0xdc || byte == 0xdd;
		}

		array:any[];
		workers:any[];
		count:number;

		constructor(factory:Factory, byte:number = -1)
		{
			super(factory, byte);
			this.array = [];
			this.workers = [];
			this.count = -1;
		}

		assembly(data:any, destination:egret.ByteArray):void
		{
			var l:number = data.length;

			if (l < 16)
			{
				// fix array
				destination.writeByte(0x90 | l);
			}
			else if (l < 65536)
			{
				// array 16
				destination.writeByte(0xdc);
				destination.writeShort(l);
			}
			else
			{
				// array 32
				destination.writeByte(0xdd);
				destination.writeUnsignedInt(l);
			}

			// write elements
			for (var i:number = 0; i < l; i++)
			{
				var worker:Worker = this.factory.getWorkerByType(data[i]);
				worker.assembly(data[i], destination);
			}
		}

		disassembly(source:egret.ByteArray):any
		{
			if (this.count == -1)
			{
				if ((this.byte & 0xf0) == 0x90)
					this.count = this.byte & 0x0f
				else if (this.byte == 0xdc && source.bytesAvailable >= 2)
					this.count = source.readUnsignedShort();
				else if (this.byte == 0xdd && source.bytesAvailable >= 4)
					this.count = source.readUnsignedInt();
			}

			if (this.array.length < this.count)
			{
				var first:number = this.array.length;

				for (var i:number = first; i < this.count; i++)
				{
					if (!this.workers[i])
					{
						if (source.bytesAvailable == 0)
							break;

						this.workers.push(this.factory.getWorkerByByte(source));
					}

					var obj:any = this.workers[i].disassembly(source);

					if (obj != incomplete)
					{
						this.array.push(obj);
						continue;
					}

					break;
				}
			}

			if (this.array.length == this.count)
				return this.array;

			return incomplete;
		}
	}
}