module cy {
	
    /**
	 * @author huangkan
	 *  基础数据类型读取器(根据服务器约定的数据类型读取数据，子对象需实现IServerSuruct接口)
	 */
    export class SrsStreamReader {
    	
    	stream:egret.ByteArray
    	
        public constructor(stream:egret.ByteArray ) {
            this.stream = stream;
            this.stream.endian = egret.Endian.LITTLE_ENDIAN;

		}
        
        getAvailable():number {
            return this.stream.bytesAvailable;
        }
		
		getFloat(skip:number=0):number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readFloat();
		}

		getInt(skip:number=0):number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readInt();
		}
        
        getUInt(skip:number=0):number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readUnsignedInt();
        }
		
        getShort(skip: number=0): number {
            if(skip!= 0) this.stream.position += skip;
            return this.stream.readShort();
        }
        
        getUShort(skip: number=0): number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readUnsignedShort();
        }
        
        getLong(skip: number=0, bigEndian:boolean=false): number {
            if(skip != 0) this.stream.position += skip;
            var high = this.stream.readUnsignedInt();
            var low = this.stream.readUnsignedInt();
            return bigEndian ? high * 4294967296.0 + low : low * 4294967296.0 + high;
        }
		
        /** 读取字符串类型(服务端使用GBK编码表示中文，默认BYTE表示长度) */
        getStr(skip: number=0): string {
            var len: number = this.getStrLength(skip);
            //return len > 0 ? utils.NativeUtils.ToGBKString(this.getBytes(len).buffer): ""; 
            var hexStr = this.getHex(len,true);
            if (len > 0) {
                try {
                    return URI.decode(hexStr.replace("%20"," "));
                } catch (error) {
                    console.log("uriError["+hexStr+"]");
                    return "uriErr";
                }
            } 
            return "";   
		}
        getStrLength(skip: number=0):number {
            if(skip != 0) this.stream.position += skip;
            var len: number = this.stream.readUnsignedByte();
            if (len == 0xFF) {
                len = this.stream.readUnsignedShort();
                if (len == 0xFFFF) {
                    len = this.stream.readUnsignedInt();
                }
            }
            return len;
        }
        
		getUTFStr(skip: number=0): string {
            if(skip != 0) this.stream.position += skip;
            var len: number = this.stream.readUnsignedByte();
            return len > 0 ? this.stream.readUTFBytes(len) : "";   
		}
        getBool(skip: number=0):boolean {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readBoolean();
		}
		
        getByte(skip: number=0): number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readByte();
        }
        getUByte(skip: number=0): number {
            if(skip != 0) this.stream.position += skip;
            return this.stream.readUnsignedByte();
        }

        /** 按长度读取字节流(若指定cache，讲在cache中写入，并返回。
         * 注意：将从cache的position处开始写入，但不会改变cache的position值) */
        getBytes(len: number,cache?: egret.ByteArray, skip:number=0):egret.ByteArray {
            if(cache == null) {
                cache = new egret.ByteArray();
                cache.endian = egret.Endian.LITTLE_ENDIAN;
            }
            if(skip != 0) this.stream.position += skip;
            this.stream.readBytes(cache,cache.position,len);
            return cache;
		}
		
        /** 指定结构体类型（实现IServerSuruct的类），返回具体的结构体。 */
        getSuruct(suruct:any, skip: number=0):IServerSuruct {
            if(skip != 0) this.stream.position += skip;
            var suructInstence:IServerSuruct = new suruct();
            suructInstence.decode(this);
            return suructInstence;
		}
		
        /** 按字节长度返回16进制原始编码，uri指定是否以uri形式显示 */
        getHex(len:number, uri?:boolean, skip:number=0):string {
             if(skip != 0) this.stream.position += skip;
             var hexStr = "";
             for (var i:number=0; i<len; ++i) {
                 var byte = this.stream.readUnsignedByte();
                 var bytesStr = (byte<0x10?"0":"") + byte.toString(16);
                 if (uri) {
                    if (byte<0x7e&&byte>0x20) {
                        hexStr += String.fromCharCode(byte);
                    } else {
                        hexStr += "%" + bytesStr.toLocaleUpperCase();
                    }
                 } else {
                    hexStr += bytesStr;
                 }
             }
             return hexStr;
        }

	}
}
