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
    /**
     * 中小奖了
     */
    function popAward(num, imgFile) {
        if (imgFile === void 0) { imgFile = "guichu_icon_hs_b_3_png"; }
        var root = AppRoot.gameLayer; //(<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp; //AppRoot.gameLayer;
        if (awards) {
            awards.dispose();
            awards = null;
        }
        awards = new GuichuAwardsComp();
        awards.imgFile = imgFile;
        root.addChild(awards);
        awards.start();
    }
    guichu.popAward = popAward;
    function closeAward() {
        if (awards) {
            awards.dispose();
        }
        awards = null;
    }
    guichu.closeAward = closeAward;
    var GuichuAwardsComp = (function (_super) {
        __extends(GuichuAwardsComp, _super);
        function GuichuAwardsComp() {
            var _this = _super.call(this) || this;
            // awardsTxt:eui.BitmapLabel;
            // particle_sys:particle.GravityParticleSystem;
            _this.imgFile = "";
            _this.skinName = "GuiChuAwardsSkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        GuichuAwardsComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.awardTween.addEventListener('complete', this.onTweenGroupComplete, this);
            this.awardTween.pause();
            var wheel = __GET_MOUDLE_COMP(AppReg.GUICHU).wheelComp;
            var cx = wheel.width >> 1;
            var cy = wheel.height >> 1;
            var imgPt = wheel.localToGlobal(cx + 4, cy + 15);
            this.img.source = this.imgFile;
            this.img.touchEnabled = false;
            this.img.x = imgPt.x;
            this.img.y = imgPt.y;
            this.img.anchorOffsetX = 250;
            this.img.anchorOffsetY = 200;
            AppRoot.gameLayer.addChild(this.img);
        };
        GuichuAwardsComp.prototype.onTweenGroupComplete = function (event) {
            this.dispose();
        };
        GuichuAwardsComp.prototype.start = function () {
            this.awardTween.play();
            this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
        };
        GuichuAwardsComp.prototype.stop = function () {
            this.awardTween.pause();
            // if(this.soundEffectChannel) this.soundEffectChannel.stop();
        };
        GuichuAwardsComp.prototype.dispose = function () {
            this.stop();
            this.removeFromParent();
            if (this.img) {
                this.img.removeFromParent();
            }
            this.awardTween.removeEventListener('complete', this.onTweenGroupComplete, this);
            if (this.img)
                this.removeFromParent();
        };
        return GuichuAwardsComp;
    }(gameabc.UICustomComponent));
    guichu.GuichuAwardsComp = GuichuAwardsComp;
    __reflect(GuichuAwardsComp.prototype, "guichu.GuichuAwardsComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuAwardsComp.js.map