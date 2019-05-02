module guichu {
    export class GuiChuWheelComp extends gameabc.UICustomComponent {
        // static WHEELITEM_COUNT = 24;
        // static WHEELITEM_DEG = 15;
        wheelCircle: eui.Group;
        isSpin: boolean = false;
                wheelTime: number = 10;
        
        /**
         * 两边的闪灯动画
         */
        aniGroup1: eui.Group;
        aniGroup2: eui.Group;
        neonGroup: eui.Group;
        dbNeon: dragonBones.Movie;
        
        aniInterval: number;
        wheelAniGroup: eui.Group;
        wheelCircleItem: eui.Group;
        wheelCirclebg: eui.Group;
        randRotation: number;

        /**
         * 转盘的特效动画，指针动画
         */
        yanhuoMv: dragonBones.Movie;
        huohuaGroup: eui.Group;
        wheelBlur: eui.Group;
        wheelClean: eui.Group;
        soundTimeout: number;
        dbTimeout: number;
        titleGroup: eui.Group;
        dbTitle: dragonBones.Movie;
        titleInterval: number;
        rotateTimeout: number;
        constructor() {
            super();
            this.skinName = "GuiChuWheelCompSkin";
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
            this.createWheelCircle();
            this.aniGroup1.visible = this.aniGroup2.visible = false;
            this.addDB();
        }
        createWheelCircle() {
            for (var i = 0; i < 24; i++) {
                this.wheelCirclebg.addChild(new GuiChuWheelItemComp(i, true));
                this.wheelCircleItem.addChild(new GuiChuWheelItemComp(i));
            }
        }
        rotate() {
            if (this.isSpin) return;
            this.isSpin = true;
            // this.startAni();
            utils.SoundUtils.playEffectSound(utils.SoundUtils.diskStart);
            var tarRotation = getProxy().getItemPosition(getProxy().zpGamEndVO.card, getProxy().zpGamEndVO.showrand) * 15 - 7.5;
            tarRotation = 360 - tarRotation;
            this.randRotation = Math.random() * 10 - 5;
            tarRotation +=  this.randRotation;
            tarRotation += 360 * 5;

            var tr1:number = 480;
            var tr2:number = tarRotation - tr1;

            egret.Tween.get(this.wheelCircle)
                .call(()=>{
                    this.startWheelNeon();
                    egret.Tween.get(this.wheelCircle).wait(200).call(()=>{
                        this.showDB()
                    },this)
                    .wait(7900)
                    .call(()=>{
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                    },this)
                    .wait(500)
                    .call(()=>{
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                    },this)
                    // .wait(500)
                    // .call(()=>{
                    //     utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                    // },this)
                    .wait(700)
                    .call(()=>{
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                    },this)

                    // .wait(1000)
                    // .call(()=>{
                    //     utils.SoundUtils.playEffectSound(utils.SoundUtils.disk_one_mp3)
                    // },this)
                    // this.dbTimeout = egret.setTimeout(this.showDB, this, 1000, true);
                    // egret.Tween.get(this.wheelCircle).wait(7000).call(()=>{
                    //     this.stopWheelNeon();
                    // },this)  
                },this)

                .to({rotation: tr1}, 1000, egret.Ease.sineIn)
                .to({rotation: tarRotation - 120}, 6000)
                .to({rotation: tarRotation}, 3000, egret.Ease.quartOut)

                // .to({rotation: tr1}, 1000, egret.Ease.sineIn)
                // .to({rotation: tarRotation - 720}, 3000)
                // .to({rotation: tarRotation}, 6000, egret.Ease.sineOut)
                .call(()=>{
                    this.isSpin = false;
                    this.rotateEnd();
                },this);

            egret.Tween.get(this.wheelClean)
                .wait(500)
                .to({alpha: 0}, 1000)
                .wait(3000)
                .to({alpha: 1}, 1000);
            // egret.Tween.get(this).wait(10000).call(()=>{
            //     this.isSpin = false;
            // }).call(this.rotateEnd, this);
            // this.rotateTimeout = egret.setTimeout(()=>{
            //     this.isSpin = false;
            //     this.rotateEnd();
            // }, this, 10000);
            
        }
        rotateFunc(t: any): number {
            return egret.Ease.quadInOut(egret.Ease.sineOut(t));
        }
        rotateEnd() {
            if (this.isSpin) return;
            if (this.rotateTimeout) egret.clearTimeout(this.rotateTimeout);
            // this.stopAni();
            this.hideDB();
            this.stopWheelNeon();
            getProxy().changeStatus(GuiChuModuleProxy.STATUS_END);
            __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_END);
        }
        startAni() {
            // this.aniGroup1.alpha = this.aniGroup2.alpha = 0;
            // this.aniGroup1.visible = this.aniGroup2.visible = true;
            // egret.Tween.get(this.aniGroup1).to({alpha: 1}, 83);
            // this.aniInterval = egret.setInterval(()=>{
            //     egret.Tween.get(this.aniGroup1).to({alpha: this.aniGroup1.alpha > 0? 0: 1}, 100);
            //     egret.Tween.get(this.aniGroup2).to({alpha: this.aniGroup2.alpha > 0? 0: 1}, 100);
            // }, this, 100);
            //this.dbTimeout = egret.setTimeout(this.showDB, this, 1000, true);
        } 
        stopAni() {
            this.wheelClean.alpha = 1;
            this.aniGroup1.visible = this.aniGroup2.visible = false;
            if (this.aniInterval) egret.clearInterval(this.aniInterval);
        }
        addDB() {
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
            this.titleInterval = egret.setInterval(()=>{
                this.dbTitle.play("light", 1);
            }, this, 5000);
            gameabc.addMovieGroup("guichu_yanhuo1_ske_dbmv", "guichu_yanhuo1_tex_png", AppReg.GUICHU);
            this.yanhuoMv = gameabc.buildMovie("kaishi", AppReg.GUICHU);
            this.yanhuoMv.stop();
            this.yanhuoMv.touchEnabled = false;
            this.yanhuoMv.x = -4;
            this.yanhuoMv.y = 5;
            this.yanhuoMv.addEventListener(egret.Event.COMPLETE, this.animationComplete,this);
            this.huohuaGroup.addChild(this.yanhuoMv);
            
        }

        animationComplete(event:egret.Event):void {
                switch(this.yanhuoMv.clipName) {
                    case "kaishi":
                        this.yanhuoMv.gotoAndPlay("guocheng",0, 7);
                        break;
                    case "guocheng":
                        this.yanhuoMv.gotoAndPlay("jieshu",0, 1);
                        break;
                    case "jieshu":
                        this.hideDB();
                        break;
                }
        }

        showDB() {
            this.yanhuoMv.gotoAndPlay("kaishi",0,1);
            this.huohuaGroup.visible = true;
        }
        hideDB() {
            this.huohuaGroup.visible = false;
        }
        startWheelNeon() {
            this.dbNeon.timeScale = 0.5;
            egret.Tween.get(this.dbNeon).to({timeScale: 2}, 3000, egret.Ease.sineIn).to({timeScale: 0.3}, 7000, egret.Ease.sineOut);
            this.neonGroup.visible = true;
            this.dbNeon.play("start", -1);
        }
        stopWheelNeon() {
            this.neonGroup.visible = false;
            this.dbNeon.stop();
        }
        dispose() {
            super.dispose();
            this.wheelCirclebg.removeChildren();
            this.wheelCircleItem.removeChildren();
            if (this.aniInterval) egret.clearInterval(this.aniInterval);
            if (this.dbTimeout) egret.clearTimeout(this.dbTimeout);
            if (this.soundTimeout) egret.clearTimeout(this.soundTimeout);
            if (this.titleInterval) egret.clearInterval(this.titleInterval);
            if (this.rotateTimeout) egret.clearTimeout(this.rotateTimeout);
            gameabc.removeMovieGroup(AppReg.GUICHU);
            if(this.yanhuoMv) {
                this.yanhuoMv.removeEventListener(egret.Event.COMPLETE, this.animationComplete,this);
                this.yanhuoMv.removeFromParent(true);
            }
            this.dbTitle.removeFromParent(true);
            this.dbNeon.removeFromParent(true);
        }
    }
}