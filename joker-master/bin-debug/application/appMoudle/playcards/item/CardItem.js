var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     * 牌
     * @author
     *
     */
    var CardItem = (function (_super) {
        __extends(CardItem, _super);
        function CardItem() {
            var _this = _super.call(this) || this;
            _this.alltime = 100;
            _this.skinName = "CardItemSkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        /**显示牌背 */
        CardItem.prototype.setCardBack = function () {
            this.cardImg.source = CardItem.backSrc;
        };
        /**翻牌 动画 前设置成牌背 */
        CardItem.prototype.setBackId = function (id) {
            this.cardid = id;
            this.cardImg.scaleX = 1;
            this.setCardBack();
        };
        /**设置图片id(proxy:m_cbCardData) */
        CardItem.prototype.setCardId = function (id) {
            this.cardid = id;
            this.cardImg.scaleX = 1;
            this.visible = true;
            this.cardImg.source = playcards.getProxy().getCardName(id);
        };
        CardItem.prototype.setResult = function (result) {
            var value = -2;
            if (result != null && this.parent != null)
                value = playcards.getProxy().hasCards(result.allvos, this.cardid);
            // this.cardImg.alpha = value == -1 ? 0.5 : 1;
            this.darkImg.visible = true;
            var dark = (value == -1 && this.cardid > 0);
            this.showDark(dark);
            return dark;
        };
        /**是否高亮 */
        CardItem.prototype.showDark = function (light) {
            this.darkImg.visible = true;
            if (light)
                this.addChild(this.darkImg);
            else
                this.darkImg.removeFromParent();
        };
        /**重置 */
        CardItem.prototype.hideLight = function () {
            this.cardImg.alpha = 1;
            this.darkImg.removeFromParent();
            this.cardid = null;
            this.setCardBack(); // 理论上可以不加这个，收到发牌消息后会调用此方法。
        };
        /**是否显示牌背 */
        CardItem.prototype.isBack = function () {
            return this.cardImg.source == null || this.cardImg.source == CardItem.backSrc;
        };
        /**翻牌 先赋值this.cardid 只有背面翻正面*/
        CardItem.prototype.turnOver = function () {
            if (this.isBack() && this.cardid != null) {
                this.cardImg.scaleX = 1;
                if (this.move == null) {
                    this.move = new gameabc.LineMove();
                    this.move.alltime = this.alltime;
                }
                this.move.go(10, 0, 2, 0);
                egret.Ticker.getInstance().register(this.advanceTime, this);
                this.darkImg.visible = false;
            }
        };
        CardItem.prototype.advanceTime = function (time) {
            // time = time / 1000;
            this.move.advanceTime(time);
            this.cardImg.scaleX = this.move.x / 10;
            if (this.move.isComplete) {
                if (this.cardImg.scaleX < 1) {
                    this.setCardId(this.cardid);
                    this.move.go(2, 0, 10, 0);
                    this.cardImg.scaleX = 0.2;
                }
                else {
                    this.darkImg.visible = true;
                    this.turnover();
                    egret.Ticker.getInstance().unregister(this.advanceTime, this);
                }
            }
        };
        CardItem.prototype.turnover = function () {
        };
        return CardItem;
    }(gameabc.UICustomComponent));
    CardItem.backSrc = "card-1-0_png";
    playcards.CardItem = CardItem;
    __reflect(CardItem.prototype, "playcards.CardItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=CardItem.js.map