var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    /**
     *
     *
     * 牌形结构体
     * @author
     *
     */
    var CardsResult = (function () {
        function CardsResult() {
        }
        CardsResult.prototype.toString = function () {
            return this.type + this.allvos.toString();
        };
        return CardsResult;
    }());
    /** 高牌	 */
    CardsResult.HIGH = 0;
    /** 一对 */
    CardsResult.ONE_PAIR = 1;
    /** 两对	 */
    CardsResult.TWO_PAIRS = 2;
    /** 三条	 */
    CardsResult.THREE_KIND = 3;
    /** 顺子	 */
    CardsResult.STRAIGHT = 4;
    /** 同花	 */
    CardsResult.FLUSH = 5;
    /** 葫芦	 */
    CardsResult.FULL_HOUSE = 6;
    /** 四条	 */
    CardsResult.FOUR_KIND = 7;
    /** 同花顺	 */
    CardsResult.STRAIGHT_FLUSH = 8;
    /** 皇家同花顺	 */
    CardsResult.ROYAL = 9;
    playcards.CardsResult = CardsResult;
    __reflect(CardsResult.prototype, "playcards.CardsResult");
})(playcards || (playcards = {}));
//# sourceMappingURL=CardsResult.js.map