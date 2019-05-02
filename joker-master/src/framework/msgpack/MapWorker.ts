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

	export class MapWorker extends Worker
	{
		static checkType(byte:number):boolean
		{
			return (byte & 0xf0) == 0x80 || byte == 0xde || byte == 0xdf;
		}

		private count:number;
		private ready:number;
		private map:Object;
		private keyWorker:Worker;
		private valWorker:Worker;
		private key:any;
		private val:any;

		constructor(factory:Factory, byte:number = -1)
		{
			super(factory, byte);
			this.count = -1;
			this.ready = 0;
			this.map = {};
			this.key = incomplete;
			this.val = incomplete;
		}

		assembly(data:any, destination:egret.ByteArray):void
		{
			var elements:any[] = [];	

			for (var key in data)
				elements.push(key);

			var l:number = elements.length;

			if (l < 16)
			{
				// fix map
				destination.writeByte(0x80 | l);
			}
			else if (l < 65536)
			{
				// map 16
				destination.writeByte(0xde);
				destination.writeShort(l);
			}
			else
			{
				// map 32
				destination.writeByte(0xdf);
				destination.writeUnsignedInt(l);
			}

			for (var i:number = 0; i < l; i++)
			{
				var elemKey:string = elements[i];

				var keyWorker:Worker = this.factory.getWorkerByType(elemKey);
				keyWorker.assembly(elemKey, destination);

				var valWorker:Worker = this.factory.getWorkerByType(data[elemKey]);
				valWorker.assembly(data[elemKey], destination);
			}
		}

		disassembly(source:egret.ByteArray):any
		{
			if (this.count == -1)
			{
				if ((this.byte & 0xf0) == 0x80)
					this.count = this.byte & 0x0f;
				else if (this.byte == 0xde && source.bytesAvailable >= 2)
					this.count = source.readUnsignedShort();
				else if (this.byte == 0xdf && source.bytesAvailable >= 4)
					this.count = source.readUnsignedInt();
			}

			if (this.ready < this.count)
			{
				var first:number = this.ready;

				for (var i:number = first; i < this.count; i++)
				{
					if (this.key == incomplete)
					{
						if (!this.keyWorker)
						{
							if (source.bytesAvailable == 0)
								break;

							this.keyWorker = this.factory.getWorkerByByte(source);
						}

						this.key = this.keyWorker.disassembly(source);
					}

					if (this.key != incomplete && this.val == incomplete)
					{
						if (!this.valWorker)
						{
							if (source.bytesAvailable == 0)
								break;

							this.valWorker = this.factory.getWorkerByByte(source);
						}

						this.val = this.valWorker.disassembly(source);
					}

					if (this.key != incomplete && this.val != incomplete)
					{
						this.map[this.key.toString()] = this.val;
						this.keyWorker = undefined;
						this.valWorker = undefined;
						this.key = incomplete;
						this.val = incomplete;
						this.ready++;
						continue;
					}
					
					break;
				}
			}

			if (this.ready == this.count)
				return this.map;

			return incomplete;
		}
	}
}