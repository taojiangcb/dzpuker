var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var awards;
    // function getBigAwards():GuichuBigAwardsComp {
    // 	if(bigAwards == null) bigAwards = new GuichuBigAwardsComp();
    // 	return bigAwards;
    // }
    /**
     * 中小奖了
     */
    function popSmallAward(num, imgFile) {
        if (imgFile === void 0) { imgFile = "guichu_icon_hs_b_3_png"; }
        var root = AppRoot.gameLayer;
        if (awards) {
            awards.dispose();
            awards = null;
        }
        awards = new GuichuSmallAwardsComps();
        awards.award = num;
        awards.imgFile = imgFile;
        root.addChild(awards);
        awards.start();
    }
    guichu.popSmallAward = popSmallAward;
    function closeSmallAward() {
        if (awards) {
            awards.dispose();
        }
        awards = null;
    }
    guichu.closeSmallAward = closeSmallAward;
    var GuichuSmallAwardsComps = (function (_super) {
        __extends(GuichuSmallAwardsComps, _super);
        function GuichuSmallAwardsComps() {
            var _this = _super.call(this) || this;
            _this.imgFile = "";
            _this.award = 0;
            _this.delaytime = 0;
            _this.delaytime1 = 0;
            _this.delaytime2 = 0;
            _this.skinName = "GuichuSmallAwardsSkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        GuichuSmallAwardsComps.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.left = this.right = this.bottom = this.top = 0;
            this.touchEnabled = false;
            var texture = RES.getRes("GoldPartice_png");
            var config = RES.getRes("GoldPartice2_json");
            this.particle_sys = new particle.GravityParticleSystem(texture, config);
            this.particle_sys.touchEnabled = false;
            this.addChildAt(this.particle_sys, 0);
            // this.awardTween.addEventListener('complete', this.onTweenGroupComplete, this);
            this.awardTween.pause();
            var wheel = __GET_MOUDLE_COMP(AppReg.GUICHU).wheelComp;
            var cx = wheel.width >> 1;
            var cy = wheel.height >> 1;
            var imgPt = wheel.localToGlobal(cx + 4, cy + 15);
            this.particle_sys.emitterX = imgPt.x;
            this.particle_sys.emitterY = imgPt.y;
            this.img.source = this.imgFile;
            this.img.touchEnabled = false;
            this.img.alpha = 0;
            this.img.anchorOffsetX = this.img.width >> 1;
            this.img.anchorOffsetY = this.img.height >> 1;
            this.img.x = imgPt.x;
            this.img.y = imgPt.y;
            this.awardsTxt.text = this.award.toString();
            this.awardsTxt.anchorOffsetX = this.awardsTxt.width >> 1;
            this.awardsTxt.anchorOffsetY = this.awardsTxt.height >> 1;
            this.awardsTxt.x = imgPt.x;
            this.awardsTxt.y = imgPt.y;
            gameabc.addMovieGroup("xinxing_tex_dbmv", "xinxing_tex_png", AppReg.GUICHU);
            this.starMc = gameabc.buildMovie("MovieClip", AppReg.GUICHU);
            this.starMc.x = imgPt.x;
            this.starMc.y = imgPt.y + 30;
            this.starMc.blendMode = egret.BlendMode.ADD;
            this.starMc.visible = false;
            this.addChild(this.starMc);
        };
        GuichuSmallAwardsComps.prototype.start = function () {
            var _this = this;
            this.awardsTxt.alpha = 0;
            this.awardTween.play();
            egret.Tween.get(this).call(function () {
                utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
            }, this)
                .wait(1200)
                .call(function () {
                _this.particle_sys.start();
                _this.starMc.visible = true;
                _this.starMc.play("newAnimation", 4);
                utils.SoundUtils.playEffectSound(utils.SoundUtils.awardGoldSmall);
            })
                .wait(3000)
                .call(function () {
                _this.particle_sys.alpha = 1;
                _this.particle_sys.stop();
                egret.Tween.get(_this.start).to({ alpha: 0 }, 300, egret.Ease.sineOut);
                egret.Tween.get(_this.particle_sys).to({ alpha: 0 }, 600, egret.Ease.sineOut);
            }, this)
                .wait(600)
                .call(function () {
                _this.dispose();
            }, this);
            // this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.guiChuWin2);
        };
        GuichuSmallAwardsComps.prototype.stop = function () {
            if (this.start) {
                egret.Tween.removeTweens(this.starMc);
                this.starMc.stop();
            }
            if (this.particle_sys) {
                this.particle_sys.stop();
            }
            if (this.awardTween) {
                this.awardTween.pause();
            }
            if (this.soundEffectChannel) {
                this.soundEffectChannel.stop();
                this.soundEffectChannel = null;
            }
        };
        GuichuSmallAwardsComps.prototype.dispose = function () {
            this.stop();
            this.removeFromParent();
            if (this.particle_sys) {
                egret.Tween.removeTweens(this.particle_sys);
                this.particle_sys.removeFromParent(true);
            }
            if (this.starMc) {
                this.starMc.stop();
                this.starMc.removeFromParent(true);
            }
            egret.clearTimeout(this.delaytime);
            egret.clearTimeout(this.delaytime1);
        };
        return GuichuSmallAwardsComps;
    }(gameabc.UICustomComponent));
    guichu.GuichuSmallAwardsComps = GuichuSmallAwardsComps;
    __reflect(GuichuSmallAwardsComps.prototype, "guichu.GuichuSmallAwardsComps");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuSmallAwardsComps.js.map