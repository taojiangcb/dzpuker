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
    var HappyAllCardsComp = (function (_super) {
        __extends(HappyAllCardsComp, _super);
        function HappyAllCardsComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyAllCardsSkin";
            _this.touchEnabled = false;
            return _this;
        }
        HappyAllCardsComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.allCards = [this.card1, this.card2, this.card3, this.card4, this.card5];
            this.card1.hideLight();
            this.card2.hideLight();
            this.card3.hideLight();
            this.card4.hideLight();
            this.card5.hideLight();
        };
        HappyAllCardsComp.prototype.hide = function () {
            this.visible = false;
            egret.clearTimeout(this.showtime);
        };
        HappyAllCardsComp.prototype.show = function (cards, delay) {
            this.xnum.visible = false;
            this.cards = cards;
            // this.showtime = egret.setTimeout(this.showCard, this, delay);
            this.showtime = egret.setTimeout(this.turnCard, this, delay);
            this.result = playcards.getProxy().getCardResult(this.cards);
            if (this.target == null) {
                // getProxy().bankType = this.result.type;
                happy.getProxy().bankResult = playcards.getProxy().getcardsValue(this.result.allvos, this.result.type);
            }
        };
        HappyAllCardsComp.prototype.fapai = function (delay) {
            this.xnum.visible = false;
            this.showtime = egret.setTimeout(this.showCard, this, delay);
        };
        HappyAllCardsComp.prototype.showCardBack = function () {
            this.visible = true;
            for (var i = 0; i < this.allCards.length; i++) {
                this.allCards[i].setCardBack();
            }
            this.cardtypebg.visible = false;
            this.cardtype.visible = false;
            this.xnum.visible = false;
        };
        HappyAllCardsComp.prototype.showCard = function () {
            utils.SoundUtils.playEffectSound(utils.SoundUtils.fapai);
            this.visible = true;
            var fromy;
            if (this.target)
                fromy = -40;
            else
                fromy = 40;
            for (var i = 0; i < this.allCards.length; i++) {
                // this.allCards[i].setBackId(this.cards[i]);
                this.allCards[i].setCardBack();
                this.allCards[i].showCard(fromy, 0.1 * i);
            }
            this.cardtypebg.visible = false;
            this.cardtype.visible = false;
            this.xnum.visible = false;
            // this.showtime = egret.setTimeout(this.turnCard, this, 1000);
        };
        HappyAllCardsComp.prototype.turnCard = function () {
            this.addtimes = 0;
            var luckyid = happy.getProxy().nowLuckyCard;
            for (var i = 0; i < this.cards.length; i++) {
                this.allCards[i].cardid = this.result.allvos[i].value; //  this.cards[i];
                if (this.allCards[i].getCardLogicValue() == luckyid) {
                    this.addtimes++;
                    this.allCards[i].isHight = true;
                }
                this.allCards[i].turnOver();
            }
            this.cardtypebg.visible = true;
            this.cardtype.visible = true;
            if (this.target) {
                var res = playcards.getProxy().getcardsValue(this.result.allvos, this.result.type);
                var win = this.winBank = res > happy.getProxy().bankResult;
                var myIsBank = happy.getProxy().mySeatvo.showPos == 1;
                if (myIsBank)
                    win = !this.winBank;
                // if ((myIsBank && win)||(!myIsBank&&!win)) {
                // 	var type: number =getProxy().typeToAddNum(getProxy().bankType);
                // } else {
                // 	type = getProxy().typeToAddNum(this.result.type);
                // }
                var type = myIsBank ? 1 : this.result.type;
                this.target.showType(win, type);
                if (win) {
                    this.cardtype.source = "img_word_gameUI_play" + (this.result.type + 1) + "_png";
                    if (myIsBank)
                        happy.getProxy().bankCards.showType();
                    else
                        this.showType();
                }
                else {
                    this.cardtype.source = "img_word_gameUI_happy_h_" + (this.result.type + 1) + "_png";
                    if (!myIsBank)
                        happy.getProxy().bankCards.showType();
                }
            }
            else
                this.cardtype.source = "img_word_gameUI_happy" + (this.result.type + 1) + "_png";
        };
        HappyAllCardsComp.prototype.showType = function () {
            var type = happy.getProxy().typeToAddNum(this.result.type) + this.addtimes;
            if (type > 1) {
                if (!this.xnum.visible) {
                    this.xnum.visible = true;
                    this.xnum.source = "img_word_happy_x" + type + "_png";
                    this.xnum.scaleX = this.xnum.scaleY = 0.1;
                    egret.Tween.get(this.xnum).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.bounceOut);
                }
            }
            else
                this.xnum.visible = false;
        };
        return HappyAllCardsComp;
    }(gameabc.UICustomComponent));
    happy.HappyAllCardsComp = HappyAllCardsComp;
    __reflect(HappyAllCardsComp.prototype, "happy.HappyAllCardsComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappyAllCardsComp.js.map