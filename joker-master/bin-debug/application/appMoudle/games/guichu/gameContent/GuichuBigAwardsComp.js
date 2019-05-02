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
    var bigAwards;
    // function getBigAwards():GuichuBigAwardsComp {
    // 	if(bigAwards == null) bigAwards = new GuichuBigAwardsComp();
    // 	return bigAwards;
    // }
    /**
     * 中大奖了
     */
    function popBigAward(num, imgFile) {
        if (imgFile === void 0) { imgFile = "guichu_icon_hs_b_3_png"; }
        var root = AppRoot.gameLayer;
        if (bigAwards) {
            bigAwards.dispose();
            bigAwards = null;
        }
        bigAwards = new GuichuBigAwardsComp();
        bigAwards.fileName = imgFile;
        bigAwards.award = num;
        root.addChild(bigAwards);
        bigAwards.start();
    }
    guichu.popBigAward = popBigAward;
    ;
    function closeBigAward() {
        if (bigAwards) {
            bigAwards.dispose();
        }
        bigAwards = null;
    }
    guichu.closeBigAward = closeBigAward;
    /**
     * 中大奖了
     */
    var GuichuBigAwardsComp = (function (_super) {
        __extends(GuichuBigAwardsComp, _super);
        function GuichuBigAwardsComp() {
            var _this = _super.call(this) || this;
            // numberTween2:egret.tween.TweenGroup;
            _this.award = 0;
            _this.fileName = "";
            _this.delaytime = 0;
            _this.delaytime1 = 0;
            _this.delaytime2 = 0;
            _this.skinName = "GuichuBigAwardsSkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        GuichuBigAwardsComp.prototype.createComplete = function (event) {
            var texture = RES.getRes("GoldPartice_png");
            var config = RES.getRes("GoldPartice_json");
            this.particle_sys = new particle.GravityParticleSystem(texture, config);
            this.particle_sys.touchEnabled = false;
            this.particle_sys.emitterY = -50;
            this.addChildAt(this.particle_sys, 0);
            this.awardText.touchEnabled = false;
            this.awardText.text = this.award.toString();
            this.awardText.anchorOffsetX = this.awardText.width >> 1;
            this.awardText.anchorOffsetY = this.awardText.height >> 1;
            this.left = this.right = this.bottom = this.top = 0;
            this.numberTween.addEventListener('complete', this.onTweenGroupComplete, this);
            this.numberTween.pause();
            var wheel = __GET_MOUDLE_COMP(AppReg.GUICHU).wheelComp;
            var cx = wheel.width >> 1;
            var cy = wheel.height >> 1;
            var imgPt = wheel.localToGlobal(cx + 4, cy + 15);
            this.img.source = this.fileName;
            this.img.anchorOffsetX = this.img.width >> 1;
            this.img.anchorOffsetY = this.img.height >> 1;
            this.img.touchEnabled = false;
            this.img.x = imgPt.x;
            this.img.y = imgPt.y;
            gameabc.addMovieGroup("wing_ske_dbmv", "wing_tex_png", AppReg.GUICHU);
            this.wingMc = gameabc.buildMovie("chibang", AppReg.GUICHU);
            this.wingMc.x = imgPt.x;
            this.wingMc.y = imgPt.y - 70;
            this.wingMc.scaleX = this.wingMc.scaleY = 1.5;
            this.wingMc.blendMode = egret.BlendMode.ADD;
            this.wingMc.visible = false;
            this.addChildAt(this.wingMc, 0);
        };
        GuichuBigAwardsComp.prototype.onTweenGroupComplete = function (event) {
            var _this = this;
            this.particle_sys.alpha = 1;
            this.particle_sys.stop();
            egret.Tween.get(this.particle_sys)
                .wait(500)
                .to({ alpha: 0 }, 700, egret.Ease.sineOut)
                .call(function () { _this.dispose(); });
        };
        // onTweenGroupComplete2(event:egret.Event):void {
        // 	this.particle_sys.alpha = 1;
        // 	this.particle_sys.stop();
        // 	egret.Tween.get(this.particle_sys)
        // 		.to({alpha:0},700,egret.Ease.sineOut)
        // 		.call(()=>{this.dispose()});
        // }
        GuichuBigAwardsComp.prototype.start = function () {
            var _this = this;
            egret.Tween.get(this).call(function () {
                _this.numberTween.play();
                _this.particle_sys.start();
                utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
            }, this).wait(1200).call(function () {
                utils.SoundUtils.playEffectSound(utils.SoundUtils.awardGoldBig);
            }, this).wait(1500).call(function () {
                _this.wingMc.visible = true;
                _this.wingMc.play("newAnimation", 1);
            }, this).wait(1300).call(function () {
                _this.particle_sys.alpha = 1;
                _this.particle_sys.stop();
                // egret.Tween.get(this.particle_sys)
                // 	.wait(500)
                // 	.to({alpha:0},700,egret.Ease.sineOut)
                // 	.call(()=>{this.dispose()});
            }, this).wait(500).call(function () {
                egret.Tween.get(_this.particle_sys)
                    .to({ alpha: 0 }, 700, egret.Ease.sineOut)
                    .call(function () { _this.dispose(); });
            }, this);
            // this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.guiChuWin);
            // egret.clearTimeout(this.delaytime);
            // this.delaytime = egret.setTimeout(()=>{
            // 	this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.guiChuWin);
            // },this,100);
            // this.delaytime1 = egret.setTimeout(()=> {
            // 	this.wingMc.visible = true;
            // 	this.wingMc.play("newAnimation", 1);
            // },this,2700);
        };
        GuichuBigAwardsComp.prototype.stop = function () {
            if (this.particle_sys) {
                this.particle_sys.stop();
            }
            if (this.numberTween) {
                this.numberTween.pause();
            }
            if (this.wingMc) {
                this.wingMc.stop();
            }
            if (this.soundEffectChannel) {
                this.soundEffectChannel.stop();
                this.soundEffectChannel = null;
            }
        };
        GuichuBigAwardsComp.prototype.dispose = function () {
            this.stop();
            this.removeFromParent();
            if (this.particle_sys) {
                egret.Tween.removeTweens(this.particle_sys);
                this.particle_sys.removeFromParent(true);
            }
            if (this.wingMc) {
                this.wingMc.stop();
                this.wingMc.removeFromParent(true);
            }
            egret.clearTimeout(this.delaytime);
            egret.clearTimeout(this.delaytime1);
            egret.clearTimeout(this.delaytime2);
            this.numberTween.removeEventListener('complete', this.onTweenGroupComplete, this);
            // this.numberTween2.removeEventListener('complete', this.onTweenGroupComplete2, this);
        };
        return GuichuBigAwardsComp;
    }(gameabc.UICustomComponent));
    guichu.GuichuBigAwardsComp = GuichuBigAwardsComp;
    __reflect(GuichuBigAwardsComp.prototype, "guichu.GuichuBigAwardsComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuBigAwardsComp.js.map