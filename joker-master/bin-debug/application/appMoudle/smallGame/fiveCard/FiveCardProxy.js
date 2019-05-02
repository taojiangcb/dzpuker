var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/7/1.
 */
var fiveCard;
(function (fiveCard) {
    function getProxy() {
        return __GET_PROXY(FiveCardProxy);
    }
    fiveCard.getProxy = getProxy;
    var FiveCardProxy = (function (_super) {
        __extends(FiveCardProxy, _super);
        function FiveCardProxy(name, data) {
            var _this = _super.call(this, FiveCardProxy.NAME, data) || this;
            _this.COUNT = 7; //数量
            _this.TIME = 60; //倒计时Time       
            /**
             *
             * 所有的牌型列表
             *
             * */
            _this.allType = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9
            ];
            return _this;
        }
        FiveCardProxy.prototype.randomCard = function () {
            var all_card_values = playcards.getProxy().m_cbCardData;
            var max_random = all_card_values.length - 1;
            var cards = [];
            var random_nums = [];
            while (true) {
                var generate = Math.round(Math.random() * max_random);
                if (random_nums.indexOf(generate) == -1) {
                    random_nums.push(generate);
                    cards.push(all_card_values[generate]);
                    if (cards.length == this.COUNT)
                        break;
                }
            }
            return cards;
        };
        return FiveCardProxy;
    }(app.mvc.AbsractProxy));
    FiveCardProxy.NAME = "__FiveCard__Proxy__";
    /** 高牌	 */
    FiveCardProxy.HIGH = 0;
    /** 一对 */
    FiveCardProxy.ONE_PAIR = 1;
    /** 两对	 */
    FiveCardProxy.TWO_PAIRS = 2;
    /** 三条	 */
    FiveCardProxy.THREE_KIND = 3;
    /** 顺子	 */
    FiveCardProxy.STRAIGHT = 4;
    /** 同花	 */
    FiveCardProxy.FLUSH = 5;
    /** 葫芦	 */
    FiveCardProxy.FULL_HOUSE = 6;
    /** 四条	 */
    FiveCardProxy.FOUR_KIND = 7;
    /** 同花顺	 */
    FiveCardProxy.STRAIGHT_FLUSH = 8;
    /** 皇家同花顺	 */
    FiveCardProxy.ROYAL = 9;
    fiveCard.FiveCardProxy = FiveCardProxy;
    __reflect(FiveCardProxy.prototype, "fiveCard.FiveCardProxy");
})(fiveCard || (fiveCard = {}));
//# sourceMappingURL=FiveCardProxy.js.map