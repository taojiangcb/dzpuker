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
    var PlayCardsFaceItem = (function (_super) {
        __extends(PlayCardsFaceItem, _super);
        function PlayCardsFaceItem() {
            var _this = _super.call(this) || this;
            _this.width = _this.height = 100;
            _this.skinName = "PlayCardsFaceItemSkin";
            return _this;
        }
        PlayCardsFaceItem.prototype.dataChanged = function () {
            if (this.data && this.data.label) {
                if (this.mc == null) {
                    // this.mc = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("face"));
                    // this.mc.x = 50;
                    // this.mc.y = 70;
                    this.mc = new gameabc.MovieClip(playcards.getProxy().getFaceTextures(this.data.label));
                    this.mc.x = -10;
                    this.mc.y = 0;
                    this.addChild(this.mc);
                    // this.mc.addEventListener(egret.Event.COMPLETE,this.mvComp,this)
                    // this.mc.gotoAndPlay(this.data.label, -1);
                    this.mc.play(-1);
                }
                else {
                    // this.mc.movieClipData = getProxy().getFaceFactory().generateMovieClipData("face");
                    // this.mc.gotoAndPlay(this.data.label,-1);
                    this.mc.initTextures(playcards.getProxy().getFaceTextures(this.data.label));
                }
            }
        };
        return PlayCardsFaceItem;
    }(eui.ItemRenderer));
    playcards.PlayCardsFaceItem = PlayCardsFaceItem;
    __reflect(PlayCardsFaceItem.prototype, "playcards.PlayCardsFaceItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsFaceItem.js.map