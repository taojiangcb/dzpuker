var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    /*牌型回顾vo*/
    var CardResultVO = (function () {
        function CardResultVO() {
        }
        return CardResultVO;
    }());
    playcards.CardResultVO = CardResultVO;
    __reflect(CardResultVO.prototype, "playcards.CardResultVO");
})(playcards || (playcards = {}));
//# sourceMappingURL=CardResultVO.js.map