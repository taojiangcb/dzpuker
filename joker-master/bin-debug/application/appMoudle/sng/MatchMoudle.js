var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MatchMoudle = (function (_super) {
        __extends(MatchMoudle, _super);
        function MatchMoudle() {
            var _this = _super.call(this) || this;
            _this.top = _this.left = _this.bottom = _this.right = 0;
            _this.skinName = "resource/app_skin/sng/MatchSkin.exml";
            return _this;
        }
        MatchMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.room1);
            this.bindButton(this.room2);
            this.bindButton(this.room3);
            this.addDragonBones();
        };
        MatchMoudle.prototype.addDragonBones = function () {
            gameabc.addMovieGroup("match_button_ske_dbmv", "match_button_tex_png", AppReg.MATCH_MAIN);
            var movie1 = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie1.x = 187;
            movie1.y = 152;
            movie1.blendMode = egret.BlendMode.ADD;
            movie1.play("zuomanjiwan");
            this.room1.addChild(movie1);
            var movie2 = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie2.x = 105;
            movie2.y = 120;
            movie2.blendMode = egret.BlendMode.ADD;
            movie2.play("jinbiaosai");
            this.room2.addChild(movie2);
            var movie3 = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie3.x = 120;
            movie3.y = 140;
            movie3.blendMode = egret.BlendMode.ADD;
            movie3.play("zhiyunhui");
            this.room3.addChild(movie3);
        };
        MatchMoudle.prototype.addParent = function () {
            _super.prototype.addParent.call(this);
            var delay = 0;
            for (var i = 1; i < 4; i++) {
                var room = this["room" + i];
                egret.Tween.removeTweens(room);
                room.y = 400;
                room.alpha = 0;
                egret.Tween.get(room).wait(delay).to({ y: 0, alpha: 1 }, 300, egret.Ease.backOut);
                delay += 100;
            }
        };
        MatchMoudle.prototype.touchHandler = function (event) {
            if (event.currentTarget == this.backButton) {
                // __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
                this.close();
            }
            else
                _super.prototype.touchHandler.call(this, event);
        };
        MatchMoudle.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.room1:
                    // this.close();
                    __OPEN_PRE_MOUDLE(AppReg.SNG, null, [AppReg.MATCH_MAIN]);
                    break;
                case this.room2:
                    // this.close();
                    __OPEN_PRE_MOUDLE(AppReg.MTT, null, [AppReg.MATCH_MAIN]);
                    break;
                case this.room3:
                    tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    break;
            }
        };
        MatchMoudle.prototype.dispose = function () {
            if (gameabc.hasMovieGroup(AppReg.MATCH_MAIN)) {
                gameabc.removeMovieGroup(AppReg.MATCH_MAIN);
            }
            _super.prototype.dispose.call(this);
        };
        return MatchMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    match.MatchMoudle = MatchMoudle;
    __reflect(MatchMoudle.prototype, "match.MatchMoudle");
})(match || (match = {}));
//# sourceMappingURL=MatchMoudle.js.map