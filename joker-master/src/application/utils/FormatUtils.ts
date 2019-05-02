class FormatUtils {
    
    
    /** 将大数字显示成万的模式 */
    static wan(value: number): string {
        var flg:string = ""
        if (value < 0) {
            flg = "-";
            value = -value;
        } 
        if(value>=10000000) {
           return flg+(Math.floor(value/100000)/100)+"千万";
            
        } else if(value >= 1000000) {
           return flg+Math.floor(value/10000)+"万";
           
        } else if (value >= 100000) {
           return flg+(Math.floor(value/1000)/10)+"万";
           
        } else if (value >= 10000) {
           return flg+(Math.floor(value/100)/100)+"万";
        } 
        
        return flg+value;
    }
    static wan1(value: number): string {
        var flg: string = "";
        if (value < 0) {
            flg = "-";
            value = -value;
        }
        if(value >= 1000000) {
           return flg+Math.floor(value/10000)+"万";
        } else if (value >= 100000) {
           return flg+(Math.floor(value/1000)/10)+"万";
        } else if (value >= 10000) {
           return flg+(Math.floor(value/100)/100)+"万";
        } 
        return flg+value;
    }
    static k(value: number): string {
        var rv: string = "";
        while (value > 0) {
            var v = value % 1000;
            value = Math.floor(value / 1000);
            if (value == 0) {
                rv = rv == ""? v + rv: v + "," + rv;
            } else {
                rv = rv == ""? FormatUtils.numberToString3(v) + rv: FormatUtils.numberToString3(v) + "," + rv;
            }
        }
        return rv;
    }
    static numberToString3(value: number): string {
        var rv: string;
        if (value < 10) {
            rv = "00" + value
        } else if (value < 100) {
            rv = "0" + value;
        } else {
            rv = value.toString();
        }
        return rv;
    }
    /** 将大数字显示成万的模式 最多4个字*/
    static wan4(value: number): string {
        var flg:string = ""
        if (value < 0) {
            flg = "-";
            value = -value;
        } 
        if(value>=10000000) {
           return flg+(Math.floor(value/10000000))+"千万";
            
        } else if(value >= 100000) {
           return flg+Math.floor(value/10000)+"万";   
        } else if (value >= 10000) {
           return flg+(Math.floor(value/1000)/10)+"万";
        }        
        return flg+value;
    }
     /** 将大数字显示成亿的模式 */
    static wan5(value: number): string {
        var flg:string = ""
        if (value < 0) {
            flg = "-";
            value = -value;
        } 
        if(value>=100000000) {
           return flg+(Math.floor(value/1000000)/100)+"亿";
            
        } else if(value>=10000000) {
           return flg+(Math.floor(value/100000)/100)+"千万";
            
        } else if(value >= 1000000) {
           return flg+Math.floor(value/10000)+"万";
           
        } else if (value >= 100000) {
           return flg+(Math.floor(value/1000)/10)+"万";
           
        } else if (value >= 10000) {
           return flg+(Math.floor(value/100)/100)+"万";
        } 
        
        return flg+value;
    }
    static spot(value:number):string
    {
        var str:string;
        str = String(value).replace(/(\d)(?=(\d\d\d)+$)/g,"$1,");
       return str + "";
    }
    /** 将大数字显示成千的模式 */
    static qian(value:number):string {
        if (value>= 1000 && value < 10000) {
           return (Math.floor(value/1000))+"千";
        } return FormatUtils.wan(value);
    }
    
    
    static bufferToStr(buffer: ArrayBuffer):string {
        var bytes = new DataView(buffer);
        var hexStr = "";
        for (var i:number=0; i<bytes.byteLength; ++i) {
            var byteStr = bytes.getUint8(i).toString(16);
            hexStr += (byteStr.length == 1 ? (0+byteStr) : byteStr);
        }
        return hexStr;
    }
    
    static strToBuffer(str:String):ArrayBuffer {
        var len = str.length / 2;
        var bytes = new DataView(new ArrayBuffer(len));
        for (var i=0; i<len; ++i) {
            bytes.setUint8(i,parseInt(str.substr(i*2,2),16));
        }
        return bytes.buffer;
    }
    
    
    
    
    
    
    
    /**ArrayBuffer 转gbk字符串 */
    static bufferToGBK(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number):string {
        var dataView = new DataView(buffer,byteOffset,byteLength);
        var len = dataView.byteLength;
        var hexStr = "";
        for (var i:number=0; i<len; ++i) {
            var byte = dataView.getUint8(i);
            var bytesStr = (byte<0x10?"0":"") + byte.toString(16);
            if (byte<0x7e&&byte>0x20) {
                hexStr += String.fromCharCode(byte);
            } else {
                hexStr += "%" + bytesStr.toLocaleUpperCase();
            }
        }
        try {
            hexStr = hexStr.replace("%20"," ");
            return URI.decode(hexStr);
        } catch (error) {
            console.log("uriError["+hexStr+"]");
            return "uriErr";
        }
    }
    /**proto byte 转gbk字符串 */
    static protoToGBK(g): string {
        if (g == null)
            return "";    
        return this.bufferToGBK(g.buffer, g.offset, g.limit - g.offset);
    }
    
     
    
    /** 根据 */
    static subChangeEndian(str:string,start:number=0,len:number=-1):string {
        if(len==-1) len = Math.floor(str.length/2);
        str = str.substr(start,len*2);
        var endianStr = "";
        for (var i=0; i<len; ++i) {
            endianStr = str.substr(i*2,2) + endianStr;
        }
        return endianStr;
    }
    
    
}