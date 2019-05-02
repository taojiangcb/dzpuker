module mc2sdk {
	
	
	export class IntegerWorker extends org.msgpack.Worker {
		
		public static checkType(byte:number):boolean
		{
			return (byte & 0x80) == 0 || (byte & 0xe0) == 0xe0 || 
				byte == 0xcc || byte == 0xcd ||	byte == 0xce || 
				byte == 0xd0 || byte == 0xd1 ||	byte == 0xd2 ;
		}
		
		constructor(factory:org.msgpack.Factory, byte:number = -1)
		{
			super(factory, byte);
		}
		
		assembly(data:any, destination:egret.ByteArray):void
		{
			data = data.value;
			if (data < -(1 << 5))
			{
				if (data < -(1 << 15))
				{
					// signed 32
					destination.writeByte(0xd2);
					destination.writeInt(data);
				}
				else if (data < -(1 << 7))
				{
					// signed 16
					destination.writeByte(0xd1);
					destination.writeShort(data);
				}
				else
				{
					// signed 8
					destination.writeByte(0xd0);
					destination.writeByte(data);
				}
			}
			else if (data < (1 << 7))
			{
				// fixnum
				destination.writeByte(data);
			}
			else
			{
				if (data < (1 << 8))
				{
					// unsigned 8
					destination.writeByte(0xcc);
					destination.writeByte(data);
				}
				else if (data < (1 << 16))
				{
					// unsigned 16
					destination.writeByte(0xcd);
					destination.writeShort(data);
				}
				else
				{
					// unsigned 32
					destination.writeByte(0xce);
					destination.writeUnsignedInt(data);
				}
			}
		}
		
		disassembly(source:egret.ByteArray):any
		{
			var i:number;
			var data:any;
			
			if ((this.byte & 0x80) == 0)
			{
				// positive fixnum
				return new Integer(this.byte);
			}
			else if ((this.byte & 0xe0) == 0xe0)
			{
				// negative fixnum
				return new Integer(this.byte - 0xff - 1);
			}
			else if (this.byte == 0xcc && source.bytesAvailable >= 1)
			{
				// unsigned byte
				return new Integer(source.readUnsignedByte());
			}
			else if (this.byte == 0xcd && source.bytesAvailable >= 2)
			{
				// unsigned short
				return new Integer(source.readUnsignedShort());
			}
			else if (this.byte == 0xce && source.bytesAvailable >= 4)
			{
				// unsigned int
				return new Integer(source.readUnsignedInt());
			}
			else if (this.byte == 0xcf && source.bytesAvailable >= 8)
			{
				// unsigned long
				return new LongWorker(this.factory,this.byte).disassembly(source);
			}
			else if (this.byte == 0xd0 && source.bytesAvailable >= 1)
			{
				// signed byte
				return new Integer(source.readByte());
			}
			else if (this.byte == 0xd1 && source.bytesAvailable >= 2)
			{
				// signed short
				return new Integer(source.readShort());
			}
			else if (this.byte == 0xd2 && source.bytesAvailable >= 4)
			{
				// signed int
				return new Integer(source.readInt());
			}
			else if (this.byte == 0xd3 && source.bytesAvailable >= 8)
			{
				// signed long
				return new LongWorker(this.factory,this.byte).disassembly(source);
			}
			
			return org.msgpack.incomplete;
		}
	}
}