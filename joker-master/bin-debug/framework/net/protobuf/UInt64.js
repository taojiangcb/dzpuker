var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var protobufbase;
(function (protobufbase) {
    /**
     *
     * @author
     *
     */
    var UInt64 = (function (_super) {
        __extends(UInt64, _super);
        function UInt64(low, high) {
            if (low === void 0) { low = 0; }
            if (high === void 0) { high = 0; }
            return _super.call(this, low, high) || this;
        }
        Object.defineProperty(UInt64.prototype, "high", {
            get: function () {
                return this.internalHigh;
            },
            set: function (value) {
                value = (value);
                this.internalHigh = value;
            },
            enumerable: true,
            configurable: true
        });
        UInt64.fromNumber = function (n) {
            return new UInt64(n, Math.floor(n / 4294967296.0));
        };
        UInt64.prototype.toNumber = function () {
            return (this.high * 4294967296) + this.low;
        };
        UInt64.prototype.toString = function (radix) {
            if (radix === void 0) { radix = 10; }
            if (radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            if (this.high == 0) {
                return this.low.toString(radix);
            }
            var digitChars = [];
            var copyOfThis = new UInt64(this.low, this.high);
            do {
                var digit = (copyOfThis["div"](radix));
                if (digit < 10) {
                    digitChars.push(digit + protobufbase.Binary64.CHAR_CODE_0);
                }
                else {
                    digitChars.push(digit - 10 + protobufbase.Binary64.CHAR_CODE_A);
                }
            } while (copyOfThis.high != 0);
            return copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String, digitChars.reverse());
        };
        UInt64.parseUInt64 = function (str, radix) {
            if (radix === void 0) { radix = 0; }
            var i = (0);
            if (radix == 0) {
                if (str.search(/^0x/) == 0) {
                    radix = (16);
                    i = (2);
                }
                else {
                    radix = (10);
                }
            }
            if (radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            str = str.toLowerCase();
            var result = new UInt64();
            for (; i < str.length; i++) {
                var digit = (str.charCodeAt(i));
                if (digit >= protobufbase.Binary64.CHAR_CODE_0 && digit <= protobufbase.Binary64.CHAR_CODE_9) {
                    digit -= (protobufbase.Binary64.CHAR_CODE_0);
                }
                else if (digit >= protobufbase.Binary64.CHAR_CODE_A && digit <= protobufbase.Binary64.CHAR_CODE_Z) {
                    digit -= (protobufbase.Binary64.CHAR_CODE_A);
                    digit += (10);
                }
                else {
                    throw new Error("参数错误");
                }
                if (digit >= radix) {
                    throw new Error("参数错误");
                }
                result["mul"](radix);
                result["add"](digit);
            }
            return result;
        };
        return UInt64;
    }(protobufbase.Binary64));
    protobufbase.UInt64 = UInt64;
    __reflect(UInt64.prototype, "protobufbase.UInt64");
})(protobufbase || (protobufbase = {}));
//# sourceMappingURL=UInt64.js.map