/**
 * Created by taojiang on 16/3/29.
 */
module cy {

    export function getkey1():string {
        return EncryptHelper.instace.key1;
    }


    export function getkey2():string {
        return EncryptHelper.instace.key2;
    }


    export function getbase64_chars():string {
        return EncryptHelper.instace.base64_chars;
    }
    

    export function resetWA():void {
        EncryptHelper.instace.internalInit();
    }

    export function setKeyWA(keyWA:CryptoJS.lib.WordArray):void {
        EncryptHelper.instace.keyWA = keyWA;
    }

    export function getKeyWA():CryptoJS.lib.WordArray {
        return EncryptHelper.instace.keyWA;
    }

    export function helpDecrypt(bytes:ArrayBuffer):ArrayBuffer {
        return EncryptHelper.instace.decrypt(bytes);
    }

    export function helpU8Ecrypt(bytes:Uint8Array):Uint8Array {
        return EncryptHelper.instace.encryptU8Array(bytes);
    }

    export function helpU8Decrypt(bytes:Uint8Array):Uint8Array {
        return EncryptHelper.instace.decryptU8Array(bytes);
    }

    export function helpEncrypt(bytes:ArrayBuffer):ArrayBuffer {
        return EncryptHelper.instace.encrypt(bytes);
    }

    export function doXorEncrypt(packet:string,key:string):string {
        return EncryptHelper.instace.doXorEncrypt(packet,key);
    }

    export function doXorDecrypt(packet:string,key:string):string {
        return EncryptHelper.instace.doXoDecrypt(packet,key);
    }

    export class EncryptHelper {



        private akey:number[] = [0xAF,0xE2,0x1A,0x0C,0x16,0x73,0x54,0x13,0xFD,0x68,0xDD,0x8F,0xA0,0xB7,0xC1,0x57,0x26,0xA6,0x90,0xFF,0xCD,0xB3,0x54,0x61,0x10,0x07,0xD5,0x7E,0xDB,0x1E,0x4C,0xE9];
        private aiv:number[] = [0x15,0xFF,0x01,0x00,0x34,0xAB,0x4C,0xD3,0x55,0xFE,0xA1,0x22,0x08,0x4F,0x13,0x07];

        public keyWA:CryptoJS.lib.WordArray;
        public ivWA:CryptoJS.lib.WordArray;
        public oriKeyWA:CryptoJS.lib.WordArray;

        private static __instance:EncryptHelper;
        static get instace():EncryptHelper {
            if(this.__instance == null) {
                this.__instance = new EncryptHelper();
            }
            return this.__instance;
        }

        get key1():string {
            return gameabc.getConfig("KEY1");
        }

        get key2():string {
            return gameabc.getConfig("KEY2");
        }

        get base64_chars():string {
            return gameabc.getConfig("BASE64_CHARS");
        }

        constructor(){
            this.internalInit();
        }

        internalInit():void {
            var keyBv:Uint8Array = new Uint8Array(this.akey);
            var ivBv:Uint8Array = new Uint8Array(this.aiv);
            this.keyWA = gameabc.U8Array.parse(keyBv);
            this.ivWA = gameabc.U8Array.parse(ivBv);
            this.oriKeyWA = this.keyWA;
        }

        

        encrypt(bytes:ArrayBuffer):ArrayBuffer {
            var eu8:Uint8Array = new Uint8Array(bytes);
            var contentWA:CryptoJS.lib.WordArray = gameabc.U8Array.parse(eu8);
            var dcBase64String:string = contentWA.toString(CryptoJS.enc.Base64);
            var encrypted:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(contentWA,this.keyWA,{iv:this.ivWA,mode:CryptoJS.mode.CFB,padding:CryptoJS.pad.NoPadding});
            var bv = gameabc.U8Array.stringify(encrypted.ciphertext);
            return bv.buffer;
        }

         decrypt(bytes:ArrayBuffer):ArrayBuffer {
            var du8:Uint8Array = new Uint8Array(bytes)
            var contentWA:CryptoJS.lib.WordArray = gameabc.U8Array.parse(du8);
            var dcBase64String:string = contentWA.toString(CryptoJS.enc.Base64);
            var decrypted:CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(dcBase64String,this.keyWA,{ iv:this.ivWA,mode:CryptoJS.mode.CFB,padding:CryptoJS.pad.NoPadding});
            var bv = gameabc.U8Array.stringify(decrypted);
            return bv.buffer;
        }


        encryptU8Array(array:Uint8Array):Uint8Array {
          var acontent = array;
          // 将明文转换成WordArray
          var contentWA = gameabc.U8Array.parse(acontent);
          // 插件要求明文是base64格式
          var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
          // 加密 选定mode是CFB类型，无偏移量
          var encrypted = CryptoJS.AES.encrypt(contentWA, this.keyWA, { iv: this.ivWA,mode:CryptoJS.mode.CFB,padding:CryptoJS.pad.NoPadding});
          // 将密文转回uint8数组
          var bv = gameabc.U8Array.stringify(encrypted.ciphertext);
          return bv;
        }

        decryptU8Array(array:Uint8Array):Uint8Array {
            var acontent = array;
            // 将密文转换成WordArray
            var contentWA = gameabc.U8Array.parse(acontent);
             // 插件要求密文是base64格式
             var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
            // 解密 选定mode是CFB类型，无偏移量
            var decrypted = CryptoJS.AES.decrypt(dcBase64String, this.keyWA, { iv: this.ivWA,mode:CryptoJS.mode.CFB,padding:CryptoJS.pad.NoPadding});
            // 将解密后的明文转回uint8数组
            var bv = gameabc.U8Array.stringify(decrypted);
            return bv;
        }

       

        /**
         * 快速注册的时候使用的加密
         * @param packet
         * @param key
         * @returns {string}
         */
        doXorEncrypt(packet:string,key:string):string {
            var plen:number = packet.length;
            var klen:number = key.length;
            var tmpPacket:string = "";

            var i:number = 0,j:number = 0;
            for(i = 0,j = 0; i < plen; i++,j = (j + 1) % klen) {
                var s:number = packet.charCodeAt(i) ^ key.charCodeAt(j);
                tmpPacket+= String.fromCharCode(((s << 4) % 256 + (s >> 4)));
            }

            //var contentWA = CryptoJS.enc.Utf8.parse(tmpPacket);
            //var base64:string = CryptoJS.enc.Base64.stringify(contentWA);

            var base64:string = this.base64_encode(tmpPacket);
            return base64;
        }

        /**
         * 快速注册的时候使用的解密
         * @param packet
         * @param key
         * @returns {string}
         */
        doXoDecrypt(packet:string,key:string):string {
            var plen:number = 0 ;
            var klen:number = key.length;

            //var contentWA = CryptoJS.enc.Base64.parse(packet);
            var base64:string = this.base64_decode(packet);
            plen = base64.length;

            packet = "";

            var i:number = 0,j:number = 0;
            for(i = 0,j = 0; i < plen; i++, j = (j + 1) % klen ) {
                var s:number = base64.charCodeAt(i) >> 4;
                var char:number = (((base64.charCodeAt(i) << 4) % 256 + s) ^ key.charCodeAt(j));
                packet += String.fromCharCode(char);
            }
            return packet;
        }

        base64_decode(encoded_string:string):string {
            var in_len:number = encoded_string.length;
            var i:number = 0;
            var j:number = 0;
            var in_:number = 0;

            var char_array_4:number[] = [];
            var char_array_3:number[] = [];
            var ret:string = "";
            while(in_len -- && (encoded_string.charAt(in_) != "=") && this.is_base64(encoded_string.charAt(in_))) {
                char_array_4[i] = encoded_string.charCodeAt(in_);
                i++;
                in_++;
                if(i == 4) {
                    for(i = 0; i < 4; i++) {
                        char_array_4[i] = this.base64_chars.indexOf(String.fromCharCode(char_array_4[i]));
                    }

                    char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
			        char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
			        char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

                    for (i = 0; (i < 3); i++) {
                        ret += String.fromCharCode(char_array_3[i]);
                    }
                    i = 0;
                }
            }

            if(i) {
                for (j = i; j < 4; j++) {
                    char_array_4[j] = 0;
                }

                for (j = 0; j < 4; j++){
                    char_array_4[j] = this.base64_chars.indexOf(String.fromCharCode(char_array_4[j]));
                }

                char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
		        char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
		        char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

                for (j = 0; (j < i - 1); j++) {
                    ret += String.fromCharCode(char_array_3[j]);
                }
            }

            return ret;
        }

        base64_encode(string_encode:string):string {
            var in_len:number = string_encode.length;
            var i:number = 0;
            var j:number = 0;
            var ret:string = "";
            var in_:number = 0;
            var char_array_3:number[] = [];
            var char_array_4:number[] = [];
            while(in_len--) {
                char_array_3[i] = string_encode.charCodeAt(in_);
                i++;
                in_++;
                if(i == 3) {
                    char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
                    char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
                    char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
                    char_array_4[3] = char_array_3[2] & 0x3f;

                    for (i = 0; (i < 4); i++) {
                        ret += this.base64_chars.charAt(char_array_4[i]);
                    }
                    i = 0;
                }
            }

            if(i) {
                for (j = i; j < 3; j++) {
                    char_array_3[j] = "0".charCodeAt(0);
                }

                char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
		        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
		        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
		        char_array_4[3] = char_array_3[2] & 0x3f;

                for (j = 0; (j < i + 1); j++) {
                    //var charIndex:number = base64_chars.indexOf(String.fromCharCode(char_array_4[j]));
                    ret += this.base64_chars.charAt(char_array_4[j]);
                }

                while (i< 3) {
                    ret += '=';
                    i++;
                }
            }
            return ret;
        }


        is_base64(c:any):boolean {
            var reg:RegExp = /\w/;
            return (reg.test(c) || c == "0" || (c == '+') || (c == '/'));
        }
    }
}