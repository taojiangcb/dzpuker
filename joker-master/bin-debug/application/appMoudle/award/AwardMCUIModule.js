var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var award;
(function (award) {
    var AwardMCUIModule = (function (_super) {
        __extends(AwardMCUIModule, _super);
        function AwardMCUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/award/AwardMCSkin.exml";
            return _this;
        }
        AwardMCUIModule.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            var lineTexutre = RES.getRes("icon_award_1_2_png");
            var lineWidth = 200;
            this.lineImg_left = new eui.Image();
            this.lineImg_left.source = lineTexutre;
            this.lineImg_left.verticalCenter = -70;
            this.lineImg_left.anchorOffsetX = lineWidth;
            this.lineImg_left.width = lineWidth;
            this.lineImg_left.x = 0;
            this.addChild(this.lineImg_left);
            var lineTexutre2 = RES.getRes("icon_award_1_2_png");
            this.lineImg_right = new eui.Image();
            this.lineImg_right.source = lineTexutre2;
            this.lineImg_right.verticalCenter = -70;
            this.lineImg_right.width = lineWidth;
            this.lineImg_right.x = AppGlobal.stageFullWidth;
            this.addChild(this.lineImg_right);
            this.bzImg.alpha = 0;
            var data = RES.getRes("AwardMovieClip_json");
            var texture = RES.getRes("AwardMovieClip_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            this.star_light = new egret.MovieClip(mcFactory.generateMovieClipData("star_light"));
            this.star_light.visible = false;
            this.star_light.x = 201 - 66 + 10;
            this.star_light.y = -5;
            this.star_light.addEventListener(egret.Event.COMPLETE, function (event) {
                _this.star_light.removeFromParent();
            }, this);
            this.contentBox.addChild(this.star_light);
            var starData = RES.getRes("star_json");
            var textureData = RES.getRes("star_png");
            var startMC = new egret.MovieClipDataFactory(starData, textureData);
            this.star_shine = new egret.MovieClip(startMC.generateMovieClipData("star"));
            this.star_shine.visible = false;
            this.contentBox.addChild(this.star_shine);
            this.animation();
        };
        AwardMCUIModule.prototype.opening = function () {
            if (this.uiOpenData) {
                this.iconUrl = this.uiOpenData.icon;
                this.awardStr = this.uiOpenData.memo;
            }
            if (this.iconUrl != "") {
                this.awardImage.source = this.iconUrl;
            }
            if (this.awardStr != "") {
                this.awardText.text = this.awardStr;
            }
            utils.SoundUtils.playEffectSound(utils.SoundUtils.bx_getCoin);
        };
        AwardMCUIModule.prototype.animation = function () {
            var _this = this;
            this.unbindButton(this);
            egret.Tween.get(this.bgImage)
                .set({ alpha: 0, y: 150 })
                .to({ alpha: 1, y: 175 }, 300, egret.Ease.sineOut);
            egret.Tween.get(this.imgBanner)
                .set({ alpha: 0, y: 100 })
                .to({ alpha: 1, y: 79 }, 300);
            egret.Tween.get(this.awardImage)
                .set({ alpha: 0, scaleX: 0, scaleY: 0 })
                .wait(150)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineOut);
            var center_ptx = AppGlobal.stageFullWidth >> 1;
            egret.Tween.get(this.lineImg_left)
                .set({ x: 0, alpha: 0 })
                .wait(400)
                .set({ alpha: 1 })
                .to({ x: center_ptx }, 200, egret.Ease.sineOut)
                .wait(100)
                .to({ alpha: 0 }, 100);
            egret.Tween.get(this.lineImg_right)
                .set({ x: AppGlobal.stageFullHeight, alpha: 0 })
                .wait(400)
                .set({ alpha: 1 })
                .to({ x: center_ptx }, 200, egret.Ease.sineOut)
                .wait(100)
                .to({ alpha: 0 }, 100);
            egret.Tween.get(this.bzImg)
                .set({ alpha: 0, scaleX: 0.7, scaleY: 0.7 })
                .wait(200)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut)
                .to({ alpha: 0, scaleX: 0.7, scaleY: 0.7 }, 200)
                .call(function () {
                _this.star_light.visible = true;
                _this.star_light.play(1);
                _this.star_shine.visible = true;
                _this.star_shine.play(-1);
                _this.star_shine.x = _this.awardImage.x - 25;
                _this.star_shine.y = _this.awardImage.y;
                _this.bindButton(_this, false);
            }, this);
        };
        AwardMCUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this) {
                __CLOSE_MOUDLE_UI(this);
            }
        };
        AwardMCUIModule.prototype.dispose = function () {
            if (this.star_light) {
                this.star_light.removeFromParent();
            }
            if (this.star_shine) {
                this.star_shine.removeFromParent();
            }
            if (this.bgImage) {
                egret.Tween.removeTweens(this.bgImage);
            }
            if (this.bzImg) {
                egret.Tween.removeTweens(this.bzImg);
            }
            if (this.imgBanner) {
                egret.Tween.removeTweens(this.imgBanner);
            }
            if (this.lineImg_left) {
                egret.Tween.removeTweens(this.lineImg_left);
            }
            if (this.lineImg_right) {
                egret.Tween.removeTweens(this.lineImg_right);
            }
            _super.prototype.dispose.call(this);
        };
        return AwardMCUIModule;
    }(gameabc.UIMoudleComponent));
    award.AwardMCUIModule = AwardMCUIModule;
    __reflect(AwardMCUIModule.prototype, "award.AwardMCUIModule");
})(award || (award = {}));
//# sourceMappingURL=AwardMCUIModule.js.map