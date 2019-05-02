var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var smallGame;
(function (smallGame) {
    var ClearCardItem = (function (_super) {
        __extends(ClearCardItem, _super);
        function ClearCardItem() {
            var _this = _super.apply(this, arguments) || this;
            _this.hintId = -1;
            return _this;
        }
        ClearCardItem.prototype.flip = function (cardId) {
            this.hideLight();
            this.setBackId(cardId);
            this.turnOver();
        };
        ClearCardItem.prototype.tweenToCard = function (cardId) {
            this.stopHint();
            egret.Tween.get(this.cardImg).to({ alpha: 0 }, 200, egret.Ease.sineOut);
            egret.setTimeout(this.setCardId, this, 210, cardId);
        };
        ClearCardItem.prototype.setCardId = function (id) {
            id == -1 ? this.setCardBack() : _super.prototype.setCardId.call(this, id);
            this.displayCard();
        };
        ClearCardItem.prototype.displayCard = function () {
            if (this.cardImg.alpha != 1) {
                egret.Tween.get(this.cardImg).to({ alpha: 1 }, 500, egret.Ease.sineOut);
            }
        };
        ClearCardItem.prototype.startHint = function () {
            egret.Tween.get(this.cardImg).to({ alpha: 0 }, 300, egret.Ease.sineOut);
            egret.setTimeout(this.displayCard, this, 310);
            this.hintId = egret.setTimeout(this.startHint, this, 820);
        };
        ClearCardItem.prototype.stopHint = function () {
            egret.Tween.removeTweens(this.cardImg);
            if (this.hintId != -1) {
                egret.clearTimeout(this.hintId);
                this.hintId = -1;
            }
        };
        return ClearCardItem;
    }(playcards.CardItem));
    smallGame.ClearCardItem = ClearCardItem;
    __reflect(ClearCardItem.prototype, "smallGame.ClearCardItem");
})(smallGame || (smallGame = {}));
//# sourceMappingURL=ClearCardItem.js.map