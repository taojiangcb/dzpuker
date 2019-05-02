var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    var GiftItem = (function () {
        function GiftItem() {
        }
        return GiftItem;
    }());
    playcards.GiftItem = GiftItem;
    __reflect(GiftItem.prototype, "playcards.GiftItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=GiftItem.js.map