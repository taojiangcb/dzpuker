var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var Integer = (function () {
        function Integer(value) {
            if (value === void 0) { value = 0; }
            this.value = value & 0xFFFFFFFF;
        }
        Integer.prototype.toNumber = function () {
            return this.value;
        };
        Integer.prototype.toString = function () {
            return String(this.value);
        };
        Integer.prototype.toStr = function (n) {
            return ('000' + n.toString(16)).substr(-4);
        };
        return Integer;
    }());
    mc2sdk.Integer = Integer;
    __reflect(Integer.prototype, "mc2sdk.Integer");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=Integer.js.map