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
    var PlayCardsMessItem = (function (_super) {
        __extends(PlayCardsMessItem, _super);
        function PlayCardsMessItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsMessItemSkin";
            return _this;
        }
        PlayCardsMessItem.prototype.dataChanged = function () {
            if (this.data && this.data.label) {
                this.messlab.text = gameabc.ResourceBundleUtil.getMessage(this.data.label);
            }
        };
        return PlayCardsMessItem;
    }(eui.ItemRenderer));
    playcards.PlayCardsMessItem = PlayCardsMessItem;
    __reflect(PlayCardsMessItem.prototype, "playcards.PlayCardsMessItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsMessItem.js.map