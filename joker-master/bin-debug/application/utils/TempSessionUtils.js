var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var TempSessionUtils = (function () {
        function TempSessionUtils() {
        }
        return TempSessionUtils;
    }());
    /**
     * 获取到临时session之后的回调列表
     */
    TempSessionUtils.receiver_call = [];
    utils.TempSessionUtils = TempSessionUtils;
    __reflect(TempSessionUtils.prototype, "utils.TempSessionUtils");
})(utils || (utils = {}));
//# sourceMappingURL=TempSessionUtils.js.map