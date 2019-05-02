module guichu {

	var bigAwards:GuichuBigAwardsComp;
	// function getBigAwards():GuichuBigAwardsComp {
	// 	if(bigAwards == null) bigAwards = new GuichuBigAwardsComp();
	// 	return bigAwards;
	// }

	/**
	 * 中大奖了
	 */
	export function popBigAward(num?:number,imgFile:string="guichu_icon_hs_b_3_png"):void {

			var root:egret.DisplayObjectContainer = AppRoot.gameLayer;
			if(bigAwards) {
				bigAwards.dispose();
				bigAwards = null;
			}

			bigAwards = new GuichuBigAwardsComp();
			bigAwards.fileName = imgFile;
			bigAwards.award = num;
			root.addChild(bigAwards);
			bigAwards.start();
	};

	export function closeBigAward():void {
		if(bigAwards) {
			bigAwards.dispose();
		}
		bigAwards = null;
	}

	/**
	 * 中大奖了
	 */
	export class GuichuBigAwardsComp extends gameabc.UICustomComponent {

		particle_sys: particle.GravityParticleSystem;
		public awardText:eui.BitmapLabel;
		numberTween:egret.tween.TweenGroup;
		// numberTween2:egret.tween.TweenGroup;

		award:number = 0;
		fileName:string = "";
		img:eui.Image;

		delaytime:number = 0;
		delaytime1:number = 0;
		delaytime2:number = 0;

		soundEffectChannel:egret.SoundChannel;
		wingMc: dragonBones.Movie;

		public constructor() {
			super();
			this.skinName = "GuichuBigAwardsSkin";
			this.touchChildren = false;
			this.touchEnabled = false;
		}

		createComplete(event:egret.Event):void {

			var texture: egret.Texture = RES.getRes("GoldPartice_png");
			var config: any = RES.getRes("GoldPartice_json");
			this.particle_sys = new particle.GravityParticleSystem(texture,config);
			this.particle_sys.touchEnabled = false;
            
            this.particle_sys.emitterY = -50;			
            this.addChildAt(this.particle_sys,0);
			this.awardText.touchEnabled = false;
			this.awardText.text = this.award.toString();
			this.awardText.anchorOffsetX = this.awardText.width >> 1;
			this.awardText.anchorOffsetY = this.awardText.height >> 1;

			this.left = this.right = this.bottom = this.top = 0;
			
			this.numberTween.addEventListener('complete', this.onTweenGroupComplete, this);
			this.numberTween.pause();

			var wheel:GuiChuWheelComp = (<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp;
			var cx:number = wheel.width >> 1;
			var cy:number = wheel.height >> 1;
			var imgPt:egret.Point = wheel.localToGlobal(cx + 4,cy + 15);

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

		}

		onTweenGroupComplete(event:egret.Event):void {
			this.particle_sys.alpha = 1;
			this.particle_sys.stop();
			egret.Tween.get(this.particle_sys)
				.wait(500)
				.to({alpha:0},700,egret.Ease.sineOut)
				.call(()=>{this.dispose()});
		}

		// onTweenGroupComplete2(event:egret.Event):void {
		// 	this.particle_sys.alpha = 1;
		// 	this.particle_sys.stop();
		// 	egret.Tween.get(this.particle_sys)
		// 		.to({alpha:0},700,egret.Ease.sineOut)
		// 		.call(()=>{this.dispose()});
		// }
		

        public start(): void {
			egret.Tween.get(this).call(()=>{
				this.numberTween.play();
				this.particle_sys.start();
				utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
			}, this).wait(1200).call(()=>{
				utils.SoundUtils.playEffectSound(utils.SoundUtils.awardGoldBig);
			}, this).wait(1500).call(()=>{
				this.wingMc.visible = true;
				this.wingMc.play("newAnimation", 1);
			}, this).wait(1300).call(()=>{
				this.particle_sys.alpha = 1;
				this.particle_sys.stop();
				// egret.Tween.get(this.particle_sys)
				// 	.wait(500)
				// 	.to({alpha:0},700,egret.Ease.sineOut)
				// 	.call(()=>{this.dispose()});

			}, this).wait(500).call(()=>{
				egret.Tween.get(this.particle_sys)
					.to({alpha:0},700,egret.Ease.sineOut)
					.call(()=>{this.dispose()});
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
        }

        public stop(): void {
			if(this.particle_sys) {
            	this.particle_sys.stop();
			}

			if(this.numberTween){
				this.numberTween.pause();
			}

			if(this.wingMc) {
				this.wingMc.stop();
			}

			if(this.soundEffectChannel) {
				this.soundEffectChannel.stop();
				this.soundEffectChannel = null;
			}
        }

        public dispose(): void {
            this.stop();
			this.removeFromParent();
			if(this.particle_sys) {
				egret.Tween.removeTweens(this.particle_sys);
            	this.particle_sys.removeFromParent(true);
			}
			if(this.wingMc) {
				this.wingMc.stop();
				this.wingMc.removeFromParent(true);
			}
			egret.clearTimeout(this.delaytime);
			egret.clearTimeout(this.delaytime1);
			egret.clearTimeout(this.delaytime2);
			this.numberTween.removeEventListener('complete', this.onTweenGroupComplete, this);
			// this.numberTween2.removeEventListener('complete', this.onTweenGroupComplete2, this);
        }
	}
}