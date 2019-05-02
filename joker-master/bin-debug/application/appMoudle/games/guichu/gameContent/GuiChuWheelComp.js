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
    var GuiChuWheelComp = (function (_super) {
        __extends(GuiChuWheelComp, _super);
        function GuiChuWheelComp() {
            var _this = _super.call(this) || this;
            _this.isSpin = false;
            _this.wheelTime = 10;
            _this.skinName = "GuiChuWheelCompSkin";
            return _this;
        }
        GuiChuWheelComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.createWheelCircle();
            this.aniGroup1.visible = this.aniGroup2.visible = false;
            this.addDB();
        };
        GuiChuWheelComp.prototype.createWheelCircle = function () {
            for (var i = 0; i < 24; i++) {
                this.wheelCirclebg.addChild(new guichu.GuiChuWheelItemComp(i, true));
                this.wheelCircleItem.addChild(new guichu.GuiChuWheelItemComp(i));
            }
        };
        GuiChuWheelComp.prototype.rotate = function () {
            var _this = this;
            if (this.isSpin)
                return;
            this.isSpin = true;
            // this.startAni();
            utils.SoundUtils.playEffectSound(utils.SoundUtils.diskStart);
            var tarRotation = guichu.getProxy().getItemPosition(guichu.getProxy().zpGamEndVO.card, guichu.getProxy().zpGamEndVO.showrand) * 15 - 7.5;
            tarRotation = 360 - tarRotation;
            this.randRotation = Math.random() * 10 - 5;
            tarRotation += this.randRotation;
            tarRotation += 360 * 5;
            var tr1 = 480;
            var tr2 = tarRotation - tr1;
            egret.Tween.get(this.wheelCircle)
                .call(function () {
                _this.startWheelNeon();
                egret.Tween.get(_this.wheelCircle).wait(200).call(function () {
                    _this.showDB();
                }, _this)
                    .wait(7900)
                    .call(function () {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3);
                }, _this)
                    .wait(500)
                    .call(function () {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3);
                }, _this)
                    .wait(700)
                    .call(function () {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3);
                }, _this);
                // .wait(1000)
                // .call(()=>{
                //     utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                // },this)
                // this.dbTimeout = egret.setTimeout(this.showDB, this, 1000, true);
                // egret.Tween.get(this.wheelCircle).wait(7000).call(()=>{
                //     this.stopWheelNeon();
                // },this)  
            }, this)
                .to({ rotation: tr1 }, 1000, egret.Ease.sineIn)
                .to({ rotation: tarRotation - 120 }, 6000)
                .to({ rotation: tarRotation }, 3000, egret.Ease.quartOut)
                .call(function () {
                _this.isSpin = false;
                _this.rotateEnd();
            }, this);
            egret.Tween.get(this.wheelClean)
                .wait(500)
                .to({ alpha: 0 }, 1000)
                .wait(3000)
                .to({ alpha: 1 }, 1000);
            // egret.Tween.get(this).wait(10000).call(()=>{
            //     this.isSpin = false;
            // }).call(this.rotateEnd, this);
            // this.rotateTimeout = egret.setTimeout(()=>{
            //     this.isSpin = false;
            //     this.rotateEnd();
            // }, this, 10000);
        };
        GuiChuWheelComp.prototype.rotateFunc = function (t) {
            return egret.Ease.quadInOut(egret.Ease.sineOut(t));
        };
        GuiChuWheelComp.prototype.rotateEnd = function () {
            if (this.isSpin)
                return;
            if (this.rotateTimeout)
                egret.clearTimeout(this.rotateTimeout);
            // this.stopAni();
            this.hideDB();
            this.stopWheelNeon();
            guichu.getProxy().changeStatus(guichu.GuiChuModuleProxy.STATUS_END);
            __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_END);
        };
        GuiChuWheelComp.prototype.startAni = function () {
            // this.aniGroup1.alpha = this.aniGroup2.alpha = 0;
            // this.aniGroup1.visible = this.aniGroup2.visible = true;
            // egret.Tween.get(this.aniGroup1).to({alpha: 1}, 83);
            // this.aniInterval = egret.setInterval(()=>{
            //     egret.Tween.get(this.aniGroup1).to({alpha: this.aniGroup1.alpha > 0? 0: 1}, 100);
            //     egret.Tween.get(this.aniGroup2).to({alpha: this.aniGroup2.alpha > 0? 0: 1}, 100);
            // }, this, 100);
            //this.dbTimeout = egret.setTimeout(this.showDB, this, 1000, true);
        };
        GuiChuWheelComp.prototype.stopAni = function () {
            this.wheelClean.alpha = 1;
            this.aniGroup1.visible = this.aniGroup2.visible = false;
            if (this.aniInterval)
                egret.clearInterval(this.aniInterval);
        };
        GuiChuWheelComp.prototype.addDB = function () {
            var _this = this;
            this.huohuaGroup.visible = false;
            gameabc.addMovieGroup("guichu_wheel_neon_ske_dbmv", "guichu_wheel_neon_tex_png", AppReg.GUICHU);
            this.dbNeon = gameabc.buildMovie("wheelNeon", AppReg.GUICHU);
            this.dbNeon.y = 29;
            this.dbNeon.x = -1;
            this.dbNeon.blendMode = egret.BlendMode.ADD;
            this.neonGroup.addChild(this.dbNeon);
            this.neonGroup.touchEnabled = false;
            this.neonGroup.touchChildren = false;
            this.neonGroup.visible = false;
            gameabc.addMovieGroup("guichu_main_title_light_ske_dbmv", "guichu_main_title_light_tex_png", AppReg.GUICHU);
            this.dbTitle = gameabc.buildMovie("mainTitle", AppReg.GUICHU);
            this.dbTitle.x = this.titleGroup.width / 2;
            this.dbTitle.y = this.titleGroup.height / 2 - 18;
            this.dbTitle.blendMode = egret.BlendMode.ADD;
            this.titleGroup.addChild(this.dbTitle);
            this.titleGroup.touchEnabled = false;
            this.titleGroup.touchChildren = false;
            this.titleInterval = egret.setInterval(function () {
                _this.dbTitle.play("light", 1);
            }, this, 5000);
            gameabc.addMovieGroup("guichu_yanhuo1_ske_dbmv", "guichu_yanhuo1_tex_png", AppReg.GUICHU);
            this.yanhuoMv = gameabc.buildMovie("kaishi", AppReg.GUICHU);
            this.yanhuoMv.stop();
            this.yanhuoMv.touchEnabled = false;
            this.yanhuoMv.x = -4;
            this.yanhuoMv.y = 5;
            this.yanhuoMv.addEventListener(egret.Event.COMPLETE, this.animationComplete, this);
            this.huohuaGroup.addChild(this.yanhuoMv);
        };
        GuiChuWheelComp.prototype.animationComplete = function (event) {
            switch (this.yanhuoMv.clipName) {
                case "kaishi":
                    this.yanhuoMv.gotoAndPlay("guocheng", 0, 7);
                    break;
                case "guocheng":
                    this.yanhuoMv.gotoAndPlay("jieshu", 0, 1);
                    break;
                case "jieshu":
                    this.hideDB();
                    break;
            }
        };
        GuiChuWheelComp.prototype.showDB = function () {
            this.yanhuoMv.gotoAndPlay("kaishi", 0, 1);
            this.huohuaGroup.visible = true;
        };
        GuiChuWheelComp.prototype.hideDB = function () {
            this.huohuaGroup.visible = false;
        };
        GuiChuWheelComp.prototype.startWheelNeon = function () {
            this.dbNeon.timeScale = 0.5;
            egret.Tween.get(this.dbNeon).to({ timeScale: 2 }, 3000, egret.Ease.sineIn).to({ timeScale: 0.3 }, 7000, egret.Ease.sineOut);
            this.neonGroup.visible = true;
            this.dbNeon.play("start", -1);
        };
        GuiChuWheelComp.prototype.stopWheelNeon = function () {
            this.neonGroup.visible = false;
            this.dbNeon.stop();
        };
        GuiChuWheelComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.wheelCirclebg.removeChildren();
            this.wheelCircleItem.removeChildren();
            if (this.aniInterval)
                egret.clearInterval(this.aniInterval);
            if (this.dbTimeout)
                egret.clearTimeout(this.dbTimeout);
            if (this.soundTimeout)
                egret.clearTimeout(this.soundTimeout);
            if (this.titleInterval)
                egret.clearInterval(this.titleInterval);
            if (this.rotateTimeout)
                egret.clearTimeout(this.rotateTimeout);
            gameabc.removeMovieGroup(AppReg.GUICHU);
            if (this.yanhuoMv) {
                this.yanhuoMv.removeEventListener(egret.Event.COMPLETE, this.animationComplete, this);
                this.yanhuoMv.removeFromParent(true);
            }
            this.dbTitle.removeFromParent(true);
            this.dbNeon.removeFromParent(true);
        };
        return GuiChuWheelComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuWheelComp = GuiChuWheelComp;
    __reflect(GuiChuWheelComp.prototype, "guichu.GuiChuWheelComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuWheelComp.js.map