module mc2sdk {
	
	
	export class LongWorker extends org.msgpack.Worker {
		
		
		static checkType(byte:number):boolean {
			return byte == 0xd3 || byte == 0xcf;
		}
		
		
		constructor(factory:org.msgpack.Factory, byte:number = -1) {
			super(factory, byte);
		}
		
		assembly(data:any, destination:egret.ByteArray):void {
			var long:Long = data; 
			if (long.toNumber() < 0) {
				destination.writeByte(0xd3);
			} else {
				destination.writeByte(0xcf);
			}
			if (destination.endian == egret.Endian.LITTLE_ENDIAN) {
				destination.writeUnsignedInt(long.little);
				destination.writeInt(long.big);
			} else {
				destination.writeInt(long.big);
				destination.writeUnsignedInt(long.little);
			}
		}
		
		disassembly(source:egret.ByteArray):any {

			var little:number;
			var big:number;
			
			if (LongWorker.checkType(this.byte) && source.bytesAvailable >= 8) {
				
				if (source.endian == egret.Endian.LITTLE_ENDIAN) {
					little = source.readUnsignedInt();
					big = source.readInt();
				} else {
					big = source.readInt();
					little = source.readUnsignedInt();
				}
				
				return new Long(big, little).toNumber();
			}
			
			return org.msgpack.incomplete;
		}
		
	}
}