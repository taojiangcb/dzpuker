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
    /***
     *牌型特效
     */
    var PlaycardsTypeEffect = (function (_super) {
        __extends(PlaycardsTypeEffect, _super);
        // public movie:eui.Image;
        // private move: gameabc.AddSpeedMove;
        function PlaycardsTypeEffect(textureAtlas) {
            var _this = _super.call(this) || this;
            _this._RepeatTime = 0.1;
            _this._TimeSpan = 0;
            _this._currentFrame = 1;
            _this.skinName = "PlaycardsTypeEffectSkin";
            /**768*512 */
            _this.textureAtlas = textureAtlas;
            _this.lineNum = textureAtlas.getTextures("line").length;
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createComplete, _this);
            return _this;
        }
        PlaycardsTypeEffect.showType = function (type, parent) {
            var sheet = RES.getRes("type" + type + "_json");
            if (sheet != null) {
                var textureAtlas = new gameabc.TextureAtlas([sheet]);
                var effect = new PlaycardsTypeEffect(textureAtlas);
                parent.addChild(effect);
                return true;
            }
            return false;
        };
        /*该模块被创建完成后的回调函数*/
        PlaycardsTypeEffect.prototype.createComplete = function (event) {
            var textureAtlas = this.textureAtlas;
            this.setLine("line1");
            // this.line1.source = textureAtlas.getTexture("line1");
            // this.line2.source = textureAtlas.getTexture("line1");
            // this.move = new gameabc.AddSpeedMove(2000, 0.2);
            // this.move.go(-310, 310, 0, 0);
            egret.Ticker.getInstance().register(this.advanceTime, this);
        };
        PlaycardsTypeEffect.prototype.advanceTime = function (time) {
            time = time / 1000;
            this._TimeSpan += time;
            if (this._TimeSpan >= this._RepeatTime) {
                this._TimeSpan = this._TimeSpan % this._RepeatTime;
                this._currentFrame += 1;
                this.setLine("line" + this._currentFrame);
            }
            // if (this.move && !this.move.isComplete) {
            // 	this.move.advanceTime(time);
            // 	this.line1.x = this.move.x;
            // 	this.line2.x = this.move.y;
            // 	if (this.move.isComplete) {
            if (this._currentFrame == this.lineNum) {
                egret.Ticker.getInstance().unregister(this.advanceTime, this);
                this.light.source = this.textureAtlas.getTexture("light");
                this.movie = new gameabc.MovieClip(this.textureAtlas.getTextures("mv"));
                // this.movie.x = 176;
                this.movie.x = 768 - (this.movie.width * 1.25) >> 1;
                this.movie.y = 145;
                this._TimeSpan = 0;
                this.movie.scaleX = this.movie.scaleY = 1.25;
                this.movie.addEventListener(egret.Event.COMPLETE, this.movieover, this);
                this.comp.addChild(this.movie);
                this.movie.play(1);
            }
        };
        PlaycardsTypeEffect.prototype.setLine = function (key) {
            var texture = this.textureAtlas.getTexture(key);
            this.line1.source = this.line2.source = texture;
        };
        PlaycardsTypeEffect.prototype.movieover = function () {
            egret.Ticker.getInstance().register(this.hideAdvanceTime, this);
        };
        PlaycardsTypeEffect.prototype.hideAdvanceTime = function (time) {
            this._TimeSpan += time;
            var total = 400;
            this.alpha = (total - this._TimeSpan) / total;
            if (this._TimeSpan >= total) {
                egret.Ticker.getInstance().unregister(this.hideAdvanceTime, this);
                this.removeFromParent(true);
            }
        };
        PlaycardsTypeEffect.prototype.dispose = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
            egret.Ticker.getInstance().unregister(this.hideAdvanceTime, this);
            if (this.movie)
                this.movie.dispose();
        };
        return PlaycardsTypeEffect;
    }(eui.Component));
    playcards.PlaycardsTypeEffect = PlaycardsTypeEffect;
    __reflect(PlaycardsTypeEffect.prototype, "playcards.PlaycardsTypeEffect");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsTypeEffect.js.map