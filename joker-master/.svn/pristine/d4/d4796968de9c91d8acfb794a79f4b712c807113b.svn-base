module cy {
	
    /**
	 * @author huangkan
	 *  基础数据类型写入器(根据服务器约定的数据类型写入数据，子对象需实现IServerSuruct接口)
	 */
	export class SrsStreamWriter {
    	
        stream: egret.ByteArray

        public constructor(stream: egret.ByteArray) {
            this.stream = stream;
            stream.endian = egret.Endian.LITTLE_ENDIAN;
        }

        putLong(value: number, skip: number=0, bigEndian:boolean=false): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            if (bigEndian) {
                this.stream.writeUnsignedInt(Math.floor(value / 4294967296.0));
                this.stream.writeUnsignedInt(value);
            } else {
                this.stream.writeUnsignedInt(value);
                this.stream.writeUnsignedInt(Math.floor(value / 4294967296.0));
            }
            return this;
        }

        putInt(value: number,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            this.stream.writeInt(value);
            return this;
        }

        putShort(value: number,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            this.stream.writeShort(value);
            return this;
        }

        putUShort(value: number,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            this.stream.writeUnsignedShort(value);
            return this;
        }

        /** 写入字符串类型(服务端使用GBK编码表示中文，默认BYTE表示长度) */
        putStr(value: string,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            value = URI.encode(value);
            this.putStrLength(value);
            var len = value.length;
            for (var i=0; i<len; ++i) {
                if (value.charAt(i)=="%") {
                    this.putHex(value.substr(i+1,2));
                    i += 2;
                } else {
                    this.putByte(value.charCodeAt(i));
                }
            }
            return this;
        }
        
        putStrLength(value:string, skip:number=0):SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            var len = value.length;
            var pLen = 0;
            for(var i=0; i<len; ++i) {
                if(value.charAt(i)=="%"){
                    ++pLen;
                    i+=2;
                }
            }
            var sLen = len - (pLen*2);
            if(sLen < 255) {
                this.stream.writeByte(sLen);
            } else if (sLen < 0xFFFE) {
                this.stream.writeByte(0xFF);
                this.stream.writeShort(sLen);
            } else {
                this.stream.writeByte(0xFF)
                this.stream.writeShort(0xFFFF);
                this.stream.writeInt(sLen);
            }
            return this;
        }
        
        

        putBool(value: boolean,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            this.stream.writeBoolean(value);
            return this;
        }
        
        putByte(value: number,skip: number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            this.stream.writeByte(value);
            return this;
        }
		
        
        putBytes(value: egret.ByteArray, offset?:number, len?:number, skip:number=0): SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            if(len === undefined) len = value.length;
            if(offset === undefined) offset = 0;
            this.stream.writeBytes(value,offset,len);
            return this;
        }
        
        
        /** 写入约定的子结构体 */
        putSuruct(value:IServerSuruct, skip:number=0) : SrsStreamWriter {
            if(skip != 0) this.stream.position += skip;
            value.encode(this);
            return this;
        }
        
        
        /** 按字节长度写入16进制原始编码，若第一位为%,将以uri形式写入 */
        putHex(value:string, skip:number=0):SrsStreamWriter {
             if(skip != 0) this.stream.position += skip;
             var uri = value.charAt(0)=="%" ? 1 : 0;
             var len = value.length / (2+uri);
             for (var i:number=0; i<len; ++i) {
                 var hexStr = value.charAt(i*(2+uri)+uri)+value.charAt(i*(2+uri)+1+uri);
                 this.stream.writeByte(parseInt(hexStr,16));
             }
             return this;
        }
	}
}
