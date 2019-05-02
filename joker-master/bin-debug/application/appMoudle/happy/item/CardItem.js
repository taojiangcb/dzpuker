var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var CardItem = (function (_super) {
        __extends(CardItem, _super);
        function CardItem() {
            return _super.call(this) || this;
        }
        /**显示牌背 */
        CardItem.prototype.setCardBack = function () {
            _super.prototype.setCardBack.call(this);
            this.y = 0;
            this.isHight = false;
        };
        /**发牌 */
        CardItem.prototype.showCard = function (fromy, delay) {
            if (this.famove == null) {
                this.famove = new gameabc.LineMove();
                this.famove.alltime = 0.15;
                this.famove.alltime = this.alltime;
            }
            this.visible = false;
            this.famove.delay = delay;
            this.famove.go(0, fromy, 0, 0);
            this.y = fromy;
            egret.Ticker.getInstance().register(this.faadvanceTime, this);
            this.darkImg.visible = false;
        };
        CardItem.prototype.faadvanceTime = function (time) {
            this.famove.advanceTime(time);
            this.visible = this.famove.delay <= 0;
            this.y = this.famove.y;
            if (this.famove.isComplete) {
                egret.Ticker.getInstance().unregister(this.faadvanceTime, this);
            }
        };
        CardItem.prototype.turnover = function () {
            if (this.isHight) {
                this.y = -20;
            }
        };
        CardItem.prototype.getCardLogicValue = function () {
            var id = playcards.CardVO.getCardValue(this.cardid);
            return id == 0 ? 13 : id;
        };
        return CardItem;
    }(playcards.CardItem));
    happy.CardItem = CardItem;
    __reflect(CardItem.prototype, "happy.CardItem");
})(happy || (happy = {}));
//# sourceMappingURL=CardItem.js.map