var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var Long = (function () {
        function Long(big, little) {
            if (big === void 0) { big = 0; }
            if (little === void 0) { little = 0; }
            this.big = big;
            this.little = little;
        }
        Long.fromNumber = function (value) {
            return new Long(Math.floor(value / 4294967296.0), value & 0xFFFFFFFF);
        };
        Long.prototype.toNumber = function () {
            return this.big * 4294967296.0 + this.little;
        };
        Long.prototype.toString = function () {
            return '0x' + this.toStr(this.big) + this.toStr(this.little);
        };
        Long.prototype.toStr = function (n) {
            return ('000' + n.toString(16)).substr(-4);
        };
        return Long;
    }());
    mc2sdk.Long = Long;
    __reflect(Long.prototype, "mc2sdk.Long");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=Long.js.map