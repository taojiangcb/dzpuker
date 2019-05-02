var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/3/29.
 */
var cy;
(function (cy) {
    function getkey1() {
        return EncryptHelper.instace.key1;
    }
    cy.getkey1 = getkey1;
    function getkey2() {
        return EncryptHelper.instace.key2;
    }
    cy.getkey2 = getkey2;
    function getbase64_chars() {
        return EncryptHelper.instace.base64_chars;
    }
    cy.getbase64_chars = getbase64_chars;
    function resetWA() {
        EncryptHelper.instace.internalInit();
    }
    cy.resetWA = resetWA;
    function setKeyWA(keyWA) {
        EncryptHelper.instace.keyWA = keyWA;
    }
    cy.setKeyWA = setKeyWA;
    function getKeyWA() {
        return EncryptHelper.instace.keyWA;
    }
    cy.getKeyWA = getKeyWA;
    function helpDecrypt(bytes) {
        return EncryptHelper.instace.decrypt(bytes);
    }
    cy.helpDecrypt = helpDecrypt;
    function helpU8Ecrypt(bytes) {
        return EncryptHelper.instace.encryptU8Array(bytes);
    }
    cy.helpU8Ecrypt = helpU8Ecrypt;
    function helpU8Decrypt(bytes) {
        return EncryptHelper.instace.decryptU8Array(bytes);
    }
    cy.helpU8Decrypt = helpU8Decrypt;
    function helpEncrypt(bytes) {
        return EncryptHelper.instace.encrypt(bytes);
    }
    cy.helpEncrypt = helpEncrypt;
    function doXorEncrypt(packet, key) {
        return EncryptHelper.instace.doXorEncrypt(packet, key);
    }
    cy.doXorEncrypt = doXorEncrypt;
    function doXorDecrypt(packet, key) {
        return EncryptHelper.instace.doXoDecrypt(packet, key);
    }
    cy.doXorDecrypt = doXorDecrypt;
    var EncryptHelper = (function () {
        function EncryptHelper() {
            this.akey = [0xAF, 0xE2, 0x1A, 0x0C, 0x16, 0x73, 0x54, 0x13, 0xFD, 0x68, 0xDD, 0x8F, 0xA0, 0xB7, 0xC1, 0x57, 0x26, 0xA6, 0x90, 0xFF, 0xCD, 0xB3, 0x54, 0x61, 0x10, 0x07, 0xD5, 0x7E, 0xDB, 0x1E, 0x4C, 0xE9];
            this.aiv = [0x15, 0xFF, 0x01, 0x00, 0x34, 0xAB, 0x4C, 0xD3, 0x55, 0xFE, 0xA1, 0x22, 0x08, 0x4F, 0x13, 0x07];
            this.internalInit();
        }
        Object.defineProperty(EncryptHelper, "instace", {
            get: function () {
                if (this.__instance == null) {
                    this.__instance = new EncryptHelper();
                }
                return this.__instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncryptHelper.prototype, "key1", {
            get: function () {
                return gameabc.getConfig("KEY1");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncryptHelper.prototype, "key2", {
            get: function () {
                return gameabc.getConfig("KEY2");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncryptHelper.prototype, "base64_chars", {
            get: function () {
                return gameabc.getConfig("BASE64_CHARS");
            },
            enumerable: true,
            configurable: true
        });
        EncryptHelper.prototype.internalInit = function () {
            var keyBv = new Uint8Array(this.akey);
            var ivBv = new Uint8Array(this.aiv);
            this.keyWA = gameabc.U8Array.parse(keyBv);
            this.ivWA = gameabc.U8Array.parse(ivBv);
            this.oriKeyWA = this.keyWA;
        };
        EncryptHelper.prototype.encrypt = function (bytes) {
            var eu8 = new Uint8Array(bytes);
            var contentWA = gameabc.U8Array.parse(eu8);
            var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
            var encrypted = CryptoJS.AES.encrypt(contentWA, this.keyWA, { iv: this.ivWA, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding });
            var bv = gameabc.U8Array.stringify(encrypted.ciphertext);
            return bv.buffer;
        };
        EncryptHelper.prototype.decrypt = function (bytes) {
            var du8 = new Uint8Array(bytes);
            var contentWA = gameabc.U8Array.parse(du8);
            var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
            var decrypted = CryptoJS.AES.decrypt(dcBase64String, this.keyWA, { iv: this.ivWA, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding });
            var bv = gameabc.U8Array.stringify(decrypted);
            return bv.buffer;
        };
        EncryptHelper.prototype.encryptU8Array = function (array) {
            var acontent = array;
            // 将明文转换成WordArray
            var contentWA = gameabc.U8Array.parse(acontent);
            // 插件要求明文是base64格式
            var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
            // 加密 选定mode是CFB类型，无偏移量
            var encrypted = CryptoJS.AES.encrypt(contentWA, this.keyWA, { iv: this.ivWA, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding });
            // 将密文转回uint8数组
            var bv = gameabc.U8Array.stringify(encrypted.ciphertext);
            return bv;
        };
        EncryptHelper.prototype.decryptU8Array = function (array) {
            var acontent = array;
            // 将密文转换成WordArray
            var contentWA = gameabc.U8Array.parse(acontent);
            // 插件要求密文是base64格式
            var dcBase64String = contentWA.toString(CryptoJS.enc.Base64);
            // 解密 选定mode是CFB类型，无偏移量
            var decrypted = CryptoJS.AES.decrypt(dcBase64String, this.keyWA, { iv: this.ivWA, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding });
            // 将解密后的明文转回uint8数组
            var bv = gameabc.U8Array.stringify(decrypted);
            return bv;
        };
        /**
         * 快速注册的时候使用的加密
         * @param packet
         * @param key
         * @returns {string}
         */
        EncryptHelper.prototype.doXorEncrypt = function (packet, key) {
            var plen = packet.length;
            var klen = key.length;
            var tmpPacket = "";
            var i = 0, j = 0;
            for (i = 0, j = 0; i < plen; i++, j = (j + 1) % klen) {
                var s = packet.charCodeAt(i) ^ key.charCodeAt(j);
                tmpPacket += String.fromCharCode(((s << 4) % 256 + (s >> 4)));
            }
            //var contentWA = CryptoJS.enc.Utf8.parse(tmpPacket);
            //var base64:string = CryptoJS.enc.Base64.stringify(contentWA);
            var base64 = this.base64_encode(tmpPacket);
            return base64;
        };
        /**
         * 快速注册的时候使用的解密
         * @param packet
         * @param key
         * @returns {string}
         */
        EncryptHelper.prototype.doXoDecrypt = function (packet, key) {
            var plen = 0;
            var klen = key.length;
            //var contentWA = CryptoJS.enc.Base64.parse(packet);
            var base64 = this.base64_decode(packet);
            plen = base64.length;
            packet = "";
            var i = 0, j = 0;
            for (i = 0, j = 0; i < plen; i++, j = (j + 1) % klen) {
                var s = base64.charCodeAt(i) >> 4;
                var char = (((base64.charCodeAt(i) << 4) % 256 + s) ^ key.charCodeAt(j));
                packet += String.fromCharCode(char);
            }
            return packet;
        };
        EncryptHelper.prototype.base64_decode = function (encoded_string) {
            var in_len = encoded_string.length;
            var i = 0;
            var j = 0;
            var in_ = 0;
            var char_array_4 = [];
            var char_array_3 = [];
            var ret = "";
            while (in_len-- && (encoded_string.charAt(in_) != "=") && this.is_base64(encoded_string.charAt(in_))) {
                char_array_4[i] = encoded_string.charCodeAt(in_);
                i++;
                in_++;
                if (i == 4) {
                    for (i = 0; i < 4; i++) {
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
            if (i) {
                for (j = i; j < 4; j++) {
                    char_array_4[j] = 0;
                }
                for (j = 0; j < 4; j++) {
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
        };
        EncryptHelper.prototype.base64_encode = function (string_encode) {
            var in_len = string_encode.length;
            var i = 0;
            var j = 0;
            var ret = "";
            var in_ = 0;
            var char_array_3 = [];
            var char_array_4 = [];
            while (in_len--) {
                char_array_3[i] = string_encode.charCodeAt(in_);
                i++;
                in_++;
                if (i == 3) {
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
            if (i) {
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
                while (i < 3) {
                    ret += '=';
                    i++;
                }
            }
            return ret;
        };
        EncryptHelper.prototype.is_base64 = function (c) {
            var reg = /\w/;
            return (reg.test(c) || c == "0" || (c == '+') || (c == '/'));
        };
        return EncryptHelper;
    }());
    cy.EncryptHelper = EncryptHelper;
    __reflect(EncryptHelper.prototype, "cy.EncryptHelper");
})(cy || (cy = {}));
//# sourceMappingURL=EncryptHelper.js.map