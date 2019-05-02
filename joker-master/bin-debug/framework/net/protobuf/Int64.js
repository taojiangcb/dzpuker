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
    var Int64 = (function (_super) {
        __extends(Int64, _super);
        function Int64(low, high) {
            if (low === void 0) { low = 0; }
            if (high === void 0) { high = 0; }
            return _super.call(this, low, high) || this;
        }
        Object.defineProperty(Int64.prototype, "high", {
            get: function () {
                return this.internalHigh;
            },
            set: function (value) {
                value = value;
                this.internalHigh = value;
            },
            enumerable: true,
            configurable: true
        });
        Int64.fromNumber = function (n) {
            return new Int64(n, Math.floor(n / 4294967296.0));
        };
        Int64.prototype.toNumber = function () {
            return this.high * 4294967296.0 + this.low;
        };
        Int64.prototype.toString = function (radix) {
            if (radix === void 0) { radix = 10; }
            if (radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            switch (this.high) {
                case 0:
                    {
                        return this.low.toString(radix);
                    }
                case -1:
                    {
                        if ((this.low & 0x80000000) == 0) {
                            return ((this.low | 0x80000000) - 2147483648.0).toString(radix);
                        }
                        else {
                            return (this.low).toString(radix);
                        }
                    }
                default:
                    {
                        break;
                    }
            }
            if (this.low == 0 && this.high == 0) {
                return "0";
            }
            var digitChars = [];
            var copyOfThis = new protobufbase.UInt64(this.low, this.high);
            if (this.high < 0) {
                copyOfThis["bitwiseNot"]();
                copyOfThis["add"](1);
            }
            do {
                var digit = (copyOfThis["div"](radix));
                if (digit < 10) {
                    digitChars.push(digit + protobufbase.Binary64.CHAR_CODE_0);
                }
                else {
                    digitChars.push(digit - 10 + protobufbase.Binary64.CHAR_CODE_A);
                }
            } while (copyOfThis["high"] != 0);
            if (this.high < 0) {
                return '-' + copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String, digitChars.reverse());
            }
            else {
                return copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String, digitChars.reverse());
            }
        };
        Int64.parseInt64 = function (str, radix) {
            if (radix === void 0) { radix = 0; }
            var negative = str.search(/^\-/) == 0;
            var i = (negative ? 1 : 0);
            if (radix == 0) {
                if (str.search(/^\-?0x/) == 0) {
                    radix = (16);
                    i += (2);
                }
                else {
                    radix = (10);
                }
            }
            if (radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            str = str.toLowerCase();
            var result = new Int64();
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
            if (negative) {
                result["bitwiseNot"]();
                result["add"](1);
            }
            return result;
        };
        return Int64;
    }(protobufbase.Binary64));
    protobufbase.Int64 = Int64;
    __reflect(Int64.prototype, "protobufbase.Int64");
})(protobufbase || (protobufbase = {}));
//# sourceMappingURL=Int64.js.map