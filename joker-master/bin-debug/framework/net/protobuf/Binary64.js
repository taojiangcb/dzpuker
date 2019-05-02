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
    var Binary64 = (function (_super) {
        __extends(Binary64, _super);
        function Binary64(low, high) {
            if (low === void 0) { low = 0; }
            if (high === void 0) { high = 0; }
            var _this = _super.call(this) || this;
            _this.low = 0;
            _this.internalHigh = 0;
            _this.low = low;
            _this.internalHigh = high;
            return _this;
        }
        Binary64.prototype.div = function (n) {
            var modHigh = this.internalHigh % n;
            var mod = (this.low % n + modHigh * 6) % n;
            this.internalHigh /= n;
            var newLow = (modHigh * 4294967296.0 + this.low) / n;
            this.internalHigh += newLow / 4294967296.0;
            this.low = newLow;
            return mod;
        };
        Binary64.prototype.mul = function (n) {
            var newLow = this.low * n;
            this.internalHigh *= n;
            this.internalHigh += newLow / 4294967296.0;
            this.low *= n;
        };
        Binary64.prototype.add = function (n) {
            var newLow = this.low + n;
            this.internalHigh += newLow / 4294967296.0;
            this.low = newLow;
        };
        Binary64.prototype.bitwiseNot = function () {
            this.low = ~this.low;
            this.internalHigh = ~this.internalHigh;
        };
        return Binary64;
    }(egret.HashObject));
    Binary64.CHAR_CODE_0 = '0'.charCodeAt(0);
    Binary64.CHAR_CODE_9 = '9'.charCodeAt(0);
    Binary64.CHAR_CODE_A = 'a'.charCodeAt(0);
    Binary64.CHAR_CODE_Z = 'z'.charCodeAt(0);
    protobufbase.Binary64 = Binary64;
    __reflect(Binary64.prototype, "protobufbase.Binary64");
})(protobufbase || (protobufbase = {}));
//# sourceMappingURL=Binary64.js.map