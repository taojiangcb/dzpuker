module guichu {


	var awards:GuichuAwardsComp;
	

	/**
	 * 中小奖了
	 */
	export function popAward(num?:number,imgFile:string="guichu_icon_hs_b_3_png"):void {
			var root:egret.DisplayObjectContainer = AppRoot.gameLayer;//(<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp; //AppRoot.gameLayer;
			if(awards) {
				awards.dispose();
				awards = null;
			}

			awards = new GuichuAwardsComp();
			awards.imgFile = imgFile;
			root.addChild(awards);
			awards.start();
	}

	export function closeAward():void {
		if(awards) {
			awards.dispose();
		}
		awards = null;
	}

	export class GuichuAwardsComp extends gameabc.UICustomComponent {		

		awardTween:egret.tween.TweenGroup;
		// awardsTxt:eui.BitmapLabel;
		// particle_sys:particle.GravityParticleSystem;

		imgFile:string = "";
		img:eui.Image;
		soundEffectChannel:egret.SoundChannel

		public constructor() {
			super();
			this.skinName = "GuiChuAwardsSkin";
			this.touchChildren = false;
			this.touchEnabled = false;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			this.awardTween.addEventListener('complete', this.onTweenGroupComplete, this);
			this.awardTween.pause();

			var wheel:GuiChuWheelComp = (<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp;
			var cx:number = wheel.width >> 1;
			var cy:number = wheel.height >> 1;
			var imgPt:egret.Point = wheel.localToGlobal(cx + 4,cy + 15);

			this.img.source = this.imgFile;
			this.img.touchEnabled =  false;
			this.img.x = imgPt.x;
			this.img.y = imgPt.y;
			this.img.anchorOffsetX = 250;
			this.img.anchorOffsetY = 200;
			AppRoot.gameLayer.addChild(this.img);
			
		}

		onTweenGroupComplete(event:egret.Event):void {
			this.dispose();
		}

		 public start(): void {
			this.awardTween.play();
			this.soundEffectChannel = utils.SoundUtils.playEffectSound(utils.SoundUtils.awardPop);
        }

        public stop(): void {
			this.awardTween.pause();
			// if(this.soundEffectChannel) this.soundEffectChannel.stop();
        }

		public dispose(): void {
            this.stop();
			this.removeFromParent();
			if(this.img) {
				this.img.removeFromParent()
			}
			this.awardTween.removeEventListener('complete', this.onTweenGroupComplete, this);
			if(this.img) this.removeFromParent();
        }
	}
}