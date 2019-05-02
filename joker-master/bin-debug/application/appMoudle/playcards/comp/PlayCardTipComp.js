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
     *
     * @author
     *
     */
    var PlayCardTipComp = (function (_super) {
        __extends(PlayCardTipComp, _super);
        function PlayCardTipComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsTipSkin";
            _this.right = 0;
            _this.left = 0;
            _this.top = 0;
            _this.bottom = 0;
            return _this;
        }
        PlayCardTipComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.show();
            this.bindButton(this.bgimage);
        };
        PlayCardTipComp.prototype.show = function () {
            if (this.initialized) {
                if (!this.visible)
                    this.tweenShow();
                else {
                    this.isTween = true;
                    this.allgroup.x = -410;
                    egret.Tween.get(this.allgroup).to({ x: 0 }, 200).call(this.tweenComp, this);
                }
                if (playcards.getProxy().mySeat > -1 && playcards.getProxy().mySeatvo.myCard.length > 1 && playcards.getTableVO().globalCards.length > 2) {
                    var allcard = playcards.getTableVO().globalCards.concat(playcards.getProxy().mySeatvo.myCard);
                    var rest = playcards.getProxy().getCardResult(allcard);
                    this.itemimage.visible = true;
                    this.itemimage.y = (9 - rest.type) * this.itemimage.height + 19;
                }
                else
                    this.itemimage.visible = false;
            }
        };
        PlayCardTipComp.prototype.tweenComp = function () {
            this.isTween = false;
        };
        PlayCardTipComp.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.isTween)
                return;
            this.isTween = true;
            egret.Tween.get(this.allgroup).to({ x: -410 }, 200).call(this.removeFromParent, this);
            //            this.removeFromParent();           
        };
        return PlayCardTipComp;
    }(playcards.PlaycardsUIComp));
    playcards.PlayCardTipComp = PlayCardTipComp;
    __reflect(PlayCardTipComp.prototype, "playcards.PlayCardTipComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardTipComp.js.map