var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cardMemory;
(function (cardMemory) {
    var CardMemoryCardItem = (function (_super) {
        __extends(CardMemoryCardItem, _super);
        function CardMemoryCardItem(index, tabel) {
            var _this = _super.call(this, "card-1-" + index + "_png") || this;
            _this.isBack = false;
            _this.index = index;
            _this.tabel = tabel;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            return _this;
        }
        CardMemoryCardItem.prototype.onComplete = function (event) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnCard, this);
        };
        CardMemoryCardItem.prototype.turnCard = function () {
            if (!this.isBack || this.tabel.chooseCardNumber >= 2)
                return;
            this.isBack = false;
            this.tabel.chooseCardNumber++;
            egret.Tween.get(this).to({ scaleX: 0 }, 200).call(function () {
                this.source = "card-1-" + this.index + "_png";
            }).to({ scaleX: 1 }, 200).wait(100).call(function () {
                this.tabel.chooseCard(this);
            });
        };
        CardMemoryCardItem.prototype.turnBack = function () {
            egret.Tween.get(this).to({ scaleX: 0 }, 200).call(function () {
                this.source = "card-1-0_png";
            }).to({ scaleX: 1 }, 200).call(function () {
                this.isBack = true;
            });
        };
        return CardMemoryCardItem;
    }(eui.Image));
    cardMemory.CardMemoryCardItem = CardMemoryCardItem;
    __reflect(CardMemoryCardItem.prototype, "cardMemory.CardMemoryCardItem");
})(cardMemory || (cardMemory = {}));
//# sourceMappingURL=CardMemoryCardItem.js.map