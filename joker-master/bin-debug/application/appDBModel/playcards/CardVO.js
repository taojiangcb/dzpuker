var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    /**
     *牌对象
     * @author
     *
     */
    var CardVO = (function () {
        function CardVO(id) {
            this.value = id;
            this.str = "card-1-" + id + "_png";
            var bCardValue = this.cardvalue = CardVO.getCardValue(id);
            this.cardLogicvalue = bCardValue == 0 ? 13 : bCardValue;
            this.color = CardVO.getCardColor(id);
        }
        /**
        * 获取牌数值
        * @param cbCardData
        * @return
        */
        CardVO.getCardValue = function (cbCardData) {
            return cbCardData % 13;
        };
        /**
         * //牌的花色
         * @param cbCardData
         */
        CardVO.getCardColor = function (cbCardData) {
            return Math.floor((cbCardData - 1) / 13);
        };
        return CardVO;
    }());
    playcards.CardVO = CardVO;
    __reflect(CardVO.prototype, "playcards.CardVO");
})(playcards || (playcards = {}));
//# sourceMappingURL=CardVO.js.map