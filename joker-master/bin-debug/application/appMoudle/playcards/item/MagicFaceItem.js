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
     *魔法表情
     * @author
     *
     */
    var MagicFaceItem = (function (_super) {
        __extends(MagicFaceItem, _super);
        function MagicFaceItem(key) {
            var _this;
            // super(getProxy().getFaceFactory().generateMovieClipData(key));          
            var skey = key.substr(0, key.length - 1);
            _this = _super.call(this, playcards.getProxy().getTextures(key)) || this;
            _this.type = key.charAt(key.length - 1);
            _this.key = skey;
            return _this;
        }
        MagicFaceItem.prototype.show = function (fromx, fromy, tox, toy) {
            //		    if(this.frameLabels)
            // from.parent.addChild(this);
            // this.x = 60;
            // this.y = 60;
            // this.gotoAndStop("fly");
            this.initTextures(playcards.getProxy().getTextures(this.key + "fly"));
            this.stop();
            // var all = this.key.split("_")
            var type = this.type; // all[all.length - 1];
            if (type == "1")
                this.move = new gameabc.ParabolaMove(40);
            else {
                this.move = new gameabc.LineMove(600);
            }
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height * 0.5;
            this.move.go(fromx, fromy, tox, toy);
            this.scaleX = this.scaleY = 0.2;
            egret.Ticker.getInstance().register(this.moveAdvanceTime, this);
        };
        MagicFaceItem.prototype.moveAdvanceTime = function (time) {
            time = time / 1000;
            this.move.advanceTime(time);
            this.x = this.move.x;
            this.y = this.move.y;
            if (this.scaleX < 1)
                this.scaleX = this.scaleY = this.scaleX + 0.05;
            if (this.move.isComplete) {
                this.scaleX = this.scaleY = 1;
                egret.Ticker.getInstance().unregister(this.moveAdvanceTime, this);
                // this.gotoAndPlay("mv");
                this.initTextures(playcards.getProxy().getTextures(this.key + "mv"));
                this.addEventListener(egret.Event.COMPLETE, this.hideMovie, this);
                this.play(1);
            }
        };
        MagicFaceItem.prototype.hideMovie = function () {
            this.removeEventListener(egret.Event.COMPLETE, this.hideMovie, this);
            this.removeFromParent(true);
        };
        return MagicFaceItem;
    }(gameabc.MovieClip));
    playcards.MagicFaceItem = MagicFaceItem;
    __reflect(MagicFaceItem.prototype, "playcards.MagicFaceItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=MagicFaceItem.js.map