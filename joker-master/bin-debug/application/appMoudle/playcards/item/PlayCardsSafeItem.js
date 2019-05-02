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
     * 保险赔付
     * @author
     *
     */
    var PlayCardsSafeItem = (function (_super) {
        __extends(PlayCardsSafeItem, _super);
        function PlayCardsSafeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsSafeItemSkin";
            return _this;
        }
        PlayCardsSafeItem.prototype.showXY = function (px, py, num) {
            this.x = px;
            this.y = py + 50;
            this.alpha = 0;
            this.numlab.text = num;
            egret.Tween.get(this).to({ alpha: 1, y: py }, 500).wait(2000).to({ alpha: 0 }, 500).call(this.removeFromParent, this);
        };
        return PlayCardsSafeItem;
    }(eui.Component));
    playcards.PlayCardsSafeItem = PlayCardsSafeItem;
    __reflect(PlayCardsSafeItem.prototype, "playcards.PlayCardsSafeItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsSafeItem.js.map