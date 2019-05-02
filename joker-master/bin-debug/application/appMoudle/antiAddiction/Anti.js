var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/6/24.
 */
var anti;
(function (anti) {
    /**
     * 是否已经实名登记了
     * @returns {boolean}
     */
    function isRNV() {
        return user.getProxy().propertURL == "";
    }
    anti.isRNV = isRNV;
    ;
    function isOpenAnti() {
        return gameabc.getConfig("ANTI_POWER") == "true";
    }
    anti.isOpenAnti = isOpenAnti;
    var Anti = (function () {
        function Anti() {
        }
        return Anti;
    }());
    anti.Anti = Anti;
    __reflect(Anti.prototype, "anti.Anti");
})(anti || (anti = {}));
//# sourceMappingURL=Anti.js.map