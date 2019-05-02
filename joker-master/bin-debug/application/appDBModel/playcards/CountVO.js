var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    /**
     * 牌型统计vo
     * @author
     *
     */
    var CountVO = (function () {
        function CountVO() {
        }
        return CountVO;
    }());
    playcards.CountVO = CountVO;
    __reflect(CountVO.prototype, "playcards.CountVO");
})(playcards || (playcards = {}));
//# sourceMappingURL=CountVO.js.map