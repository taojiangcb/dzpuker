/**
 * Created by JiangTao on 2016/4/4.
 */
module gameabc {
    export class U8Array {
        static stringify(wordArray:CryptoJS.lib.WordArray):Uint8Array {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            // Convert
            var u8 = new Uint8Array(sigBytes);
            for (var i = 0; i < sigBytes; i++) {
                var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                u8[i] = byte;
            }
            return u8;
        }

        static parse(u8arr:Uint8Array):CryptoJS.lib.WordArray {
            // Shortcut
            var len = u8arr.length;
            // Convert
            var words = [];
            for (var i = 0; i < len; i++) {
                words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
            }
            return CryptoJS.lib.WordArray.create(words, len);
        }
    }
}
