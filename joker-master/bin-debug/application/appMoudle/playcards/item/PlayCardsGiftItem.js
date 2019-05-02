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
    var PlayCardsGiftItem = (function (_super) {
        __extends(PlayCardsGiftItem, _super);
        function PlayCardsGiftItem() {
            var _this = _super.call(this) || this;
            _this.width = _this.height = 150;
            _this.skinName = "PlayCardsGiftItemSkin";
            return _this;
        }
        PlayCardsGiftItem.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.addButton(this.img);
        };
        PlayCardsGiftItem.prototype.dataChanged = function () {
            if (this.data && this.data.label) {
                this.pricelab.text = this.data.price + "";
                var type = this.data.type;
                if (type == 1) {
                    var key = this.data.label;
                    var skey = key.substr(0, key.length - 1);
                    this.img.source = playcards.getProxy().getTextures(skey + "fly")[0];
                }
                else {
                    var texture = playcards.getProxy().getGiftTextures(this.data.label);
                    this.img.source = texture[texture.length - 1];
                }
            }
        };
        return PlayCardsGiftItem;
    }(uicomps.BaseItemCilckRenderer));
    playcards.PlayCardsGiftItem = PlayCardsGiftItem;
    __reflect(PlayCardsGiftItem.prototype, "playcards.PlayCardsGiftItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsGiftItem.js.map