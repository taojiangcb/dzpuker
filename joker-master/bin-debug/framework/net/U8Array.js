var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/4.
 */
var gameabc;
(function (gameabc) {
    var U8Array = (function () {
        function U8Array() {
        }
        U8Array.stringify = function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            // Convert
            var u8 = new Uint8Array(sigBytes);
            for (var i = 0; i < sigBytes; i++) {
                var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                u8[i] = byte;
            }
            return u8;
        };
        U8Array.parse = function (u8arr) {
            // Shortcut
            var len = u8arr.length;
            // Convert
            var words = [];
            for (var i = 0; i < len; i++) {
                words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
            }
            return CryptoJS.lib.WordArray.create(words, len);
        };
        return U8Array;
    }());
    gameabc.U8Array = U8Array;
    __reflect(U8Array.prototype, "gameabc.U8Array");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=U8Array.js.map