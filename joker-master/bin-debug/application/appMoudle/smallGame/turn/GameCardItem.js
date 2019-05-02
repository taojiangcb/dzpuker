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
    var GameCardItem = (function (_super) {
        __extends(GameCardItem, _super);
        function GameCardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "CardItemSkin";
            _this.touchChildren = true;
            _this.touchEnabled = true;
            _this.txtLabel = new eui.Image();
            _this.txtLabel.source = "img_word_gameUI_djfp_png";
            _this.txtLabel.horizontalCenter = 0;
            _this.txtLabel.verticalCenter = 0;
            _this.addChild(_this.txtLabel);
            _this.txtLabel.touchEnabled = false;
            _this.txtLabel.visible = false;
            return _this;
        }
        /**重置 */
        GameCardItem.prototype.hideLight = function () {
            _super.prototype.hideLight.call(this);
            this.txtLabel.visible = false;
        };
        return GameCardItem;
    }(playcards.CardItem));
    playcards.GameCardItem = GameCardItem;
    __reflect(GameCardItem.prototype, "playcards.GameCardItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=GameCardItem.js.map