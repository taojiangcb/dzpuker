var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 手牌 & 牌型组件
 */
var joker;
(function (joker) {
    joker.DEFAULT_CARD_SKIN = "JokerCardItemSkin";
    joker.FIVE_CARD_NUM = 5;
    /**
     * 牌型动画控制
     */
    var JokerPkPatternsComp = (function (_super) {
        __extends(JokerPkPatternsComp, _super);
        /**
         * @cardValues 5张扑克牌
         * @cardSkinName 名的样式
         */
        function JokerPkPatternsComp(cardsValues, cardSkinName) {
            if (cardsValues === void 0) { cardsValues = [0, 0, 0, 0, 0]; }
            if (cardSkinName === void 0) { cardSkinName = joker.DEFAULT_CARD_SKIN; }
            var _this = _super.call(this) || this;
            _this.cardValues = [];
            _this.cardSkin = "";
            /**
             * 卡牌
             */
            _this.cards = [];
            _this.cardSkin = cardSkinName;
            _this.cardValues = cardsValues;
            return _this;
        }
        JokerPkPatternsComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.arrageAnimateion.normalArrage(); /**默认排序扑克牌序列位子 */
        };
        JokerPkPatternsComp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            /**
             * 创建5张扑克牌
             */
            var i = 0;
            for (i = 0; i < joker.FIVE_CARD_NUM; i++) {
                var card = new joker.JokerCardItem();
                card.skinName = joker.DEFAULT_CARD_SKIN;
                if (this.cardValues[i] > 0)
                    card.setBackId(this.cardValues[i]);
                else
                    card.setCardBack();
                this.addChild(card);
                this.cards.push(card);
            }
            /**
             * 牌型动画控制
             */
            this.arrageAnimateion = new joker.JokerCardArrageAnimation(this);
        };
        /**
         * 翻牌，牌值要有5个参数,不要翻的牌参数给0
         */
        JokerPkPatternsComp.prototype.tumover = function (cards) {
            return __awaiter(this, void 0, void 0, function () {
                var i, cardV, cardItem;
                return __generator(this, function (_a) {
                    if (cards.length < joker.FIVE_CARD_NUM) {
                        throw new Error("牌值的参数要有5个");
                    }
                    this.cardValues = cards;
                    i = 0;
                    for (i = 0; i < joker.FIVE_CARD_NUM; i++) {
                        cardV = this.cardValues[i];
                        cardItem = this.cards[i];
                        if (cardV > 0) {
                            cardItem.setBackId(cardV);
                            cardItem.turnOver();
                        }
                        else {
                            cardItem.setCardBack();
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        return JokerPkPatternsComp;
    }(gameabc.UICustomComponent));
    joker.JokerPkPatternsComp = JokerPkPatternsComp;
    __reflect(JokerPkPatternsComp.prototype, "joker.JokerPkPatternsComp");
})(joker || (joker = {}));
//# sourceMappingURL=JokerPkPatternsComp.js.map