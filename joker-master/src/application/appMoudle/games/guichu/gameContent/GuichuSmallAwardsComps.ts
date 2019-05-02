module guichu {


	var awards:GuichuSmallAwardsComps;
	// function getBigAwards():GuichuBigAwardsComp {
	// 	if(bigAwards == null) bigAwards = new GuichuBigAwardsComp();
	// 	return bigAwards;
	// }

	/**
	 * 中小奖了
	 */
	export function popSmallAward(num?:number,imgFile:string="guichu_icon_hs_b_3_png"):void {
			var root:egret.DisplayObjectContainer = AppRoot.gameLayer;
			if(awards) {
				awards.dispose();
				awards = null;
			}

			awards = new GuichuSmallAwardsComps();
			awards.award = num;
			awards.imgFile = imgFile;
			root.addChild(awards);
			awards.start();
	}

	export function closeSmallAward():void {
		if(awards) {
			awards.dispose();
		}
		awards = null;
	}

	export class GuichuSmallAwardsComps extends gameabc.UICustomComponent {		

		awardTween:egret.tween.TweenGroup;
		awardsTxt:eui.BitmapLabel;
		particle_sys:particle.GravityParticleSystem;

		imgFile:string = "";
		img:eui.Image;
		award:number = 0;
		delaytime:number = 0;
		delaytime1:number = 0;
		delaytime2:number = 0;

		soundEffectChannel:egret.SoundChannel;

		starMc:dragonBones.Movie;

		public constructor() {
			super();
			this.skinName = "GuichuSmallAwardsSkin";
			this.touchChildren = false;
			this.touchEnabled = false;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			this.left = this.right = this.bottom = this.top = 0;
			this.touchEnabled = false;

			var texture: egret.Texture = RES.getRes("GoldPartice_png");
			var config: any = RES.getRes("GoldPartice2_json");
			this.particle_sys = new particle.GravityParticleSystem(texture,config);
			this.particle_sys.touchEnabled = false;
            this.addChildAt(this.particle_sys,0);

			// this.awardTween.addEventListener('complete', this.onTweenGroupComplete, this);
			this.awardTween.pause();

			var wheel:GuiChuWheelComp = (<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp;
			var cx:number = wheel.width >> 1;
			var cy:number = wheel.height >> 1;
			var imgPt:egret.Point = wheel.localToGlobal(cx + 4,cy + 15);
		
			this.particle_sys.emitterX = imgPt.x;
			this.particle_sys.emitterY = imgPt.y;

			this.img.source = this.imgFile;
			this.img.touchEnabled =  false;
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
		}

		 public start(): void {
			this.awardsTxt.alpha = 0;
			this.awardTween.play();
			egret.Tween.get(this).call(()=>{
				utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
			}, this)
				.wait(1200)
				.call(()=> {
					this.particle_sys.start();
					this.starMc.visible = true;
					this.starMc.play("newAnimation",4);
					utils.SoundUtils.playEffectSound(utils.SoundUtils.awardGoldSmall);
				})
				.wait(3000)
				.call(()=>{
					this.particle_sys.alpha = 1;
					this.particle_sys.stop();
					egret.Tween.get(this.start).to({alpha:0},300,egret.Ease.sineOut)
					egret.Tween.get(this.particle_sys).to({alpha:0},600,egret.Ease.sineOut)
				},this)
				.wait(600)
				.call(()=>{
					this.dispose();
				},this);

			// this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.guiChuWin2);
        }

        public stop(): void {
			if(this.start) {
				egret.Tween.removeTweens(this.starMc);
				this.starMc.stop();
			}
			if(this.particle_sys) {
				this.particle_sys.stop();
			}
			if(this.awardTween) {
				this.awardTween.pause();
			}
			if(this.soundEffectChannel){
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

			if(this.starMc) {
				this.starMc.stop();
				this.starMc.removeFromParent(true);
			}
			
			egret.clearTimeout(this.delaytime);
			egret.clearTimeout(this.delaytime1);
        }
	}
}