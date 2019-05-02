module award {
	export class AwardMCUIModule extends gameabc.UIMoudleComponent {

		awardImage: eui.Image;
		awardText: eui.Label;
		bzImg:eui.Image;

		lineImg_left:eui.Image;
		lineImg_right:eui.Image;
		bgImage:eui.Image;

		imgBanner:eui.Image;

		contentBox:eui.Group;
		star_light:egret.MovieClip;
		star_shine:egret.MovieClip;

		iconUrl:string;
		awardStr:string;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/award/AwardMCSkin.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			var lineTexutre:egret.Texture = RES.getRes("icon_award_1_2_png");
			var lineWidth:number = 200;
			this.lineImg_left = new eui.Image();
			this.lineImg_left.source = lineTexutre;
			this.lineImg_left.verticalCenter = -70;
			this.lineImg_left.anchorOffsetX = lineWidth;
			this.lineImg_left.width = lineWidth;
			this.lineImg_left.x = 0;
			this.addChild(this.lineImg_left);

			var lineTexutre2:egret.Texture = RES.getRes("icon_award_1_2_png");
			this.lineImg_right = new eui.Image();
			this.lineImg_right.source = lineTexutre2;
			this.lineImg_right.verticalCenter = -70;
			this.lineImg_right.width = lineWidth;
			this.lineImg_right.x = AppGlobal.stageFullWidth;
			this.addChild(this.lineImg_right);

			this.bzImg.alpha = 0;

		 	var data = RES.getRes("AwardMovieClip_json");
            var texture = RES.getRes("AwardMovieClip_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);

			this.star_light = new egret.MovieClip(mcFactory.generateMovieClipData("star_light"));
			this.star_light.visible = false;
            this.star_light.x = 201 - 66 + 10;
            this.star_light.y = -5;
			this.star_light.addEventListener(egret.Event.COMPLETE,(event:egret.Event) => {
				this.star_light.removeFromParent();	
			},this)
            this.contentBox.addChild(this.star_light);

			var starData = RES.getRes("star_json");
			var textureData = RES.getRes("star_png");
			var startMC:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(starData,textureData);
			this.star_shine = new egret.MovieClip(startMC.generateMovieClipData("star"));
			this.star_shine.visible = false;
			this.contentBox.addChild(this.star_shine);

			this.animation();
		}

		opening():void {
			if(this.uiOpenData) {
				this.iconUrl = this.uiOpenData.icon;
				this.awardStr = this.uiOpenData.memo;
			}
			if(this.iconUrl != "") {
				this.awardImage.source = this.iconUrl;
			}
			if(this.awardStr != "") {
				this.awardText.text = this.awardStr;
			}
			utils.SoundUtils.playEffectSound(utils.SoundUtils.bx_getCoin);
		}

		animation():void {

			this.unbindButton(this);

			egret.Tween.get(this.bgImage)
			.set({alpha:0,y:150})
			.to({alpha:1,y:175},300,egret.Ease.sineOut);

			egret.Tween.get(this.imgBanner)
			.set({alpha:0,y:100})
			.to({alpha:1,y:79},300);

			egret.Tween.get(this.awardImage)
			.set({alpha:0,scaleX:0,scaleY:0})
			.wait(150)
			.to({alpha:1,scaleX:1,scaleY:1},300,egret.Ease.sineOut)

			var center_ptx:number = AppGlobal.stageFullWidth >> 1;
			egret.Tween.get(this.lineImg_left)
			.set({x:0,alpha:0})
			.wait(400)
			.set({alpha:1})
			.to({x:center_ptx},200,egret.Ease.sineOut)
			.wait(100)
			.to({alpha:0},100);

			egret.Tween.get(this.lineImg_right)
			.set({x:AppGlobal.stageFullHeight,alpha:0})
			.wait(400)
			.set({alpha:1})
			.to({x:center_ptx},200,egret.Ease.sineOut)
			.wait(100)
			.to({alpha:0},100);

			egret.Tween.get(this.bzImg)
			.set({alpha:0,scaleX:0.7,scaleY:0.7})
			.wait(200)
			.to({alpha:1,scaleX:1,scaleY:1},200,egret.Ease.sineOut)
			.to({alpha:0,scaleX:0.7,scaleY:0.7},200)
			.call(()=> {
				this.star_light.visible = true;
				this.star_light.play(1);

				this.star_shine.visible = true;
				this.star_shine.play(-1);

				this.star_shine.x = this.awardImage.x - 25;
				this.star_shine.y = this.awardImage.y;

				this.bindButton(this,false);
			},this)
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(tag == this) {
				__CLOSE_MOUDLE_UI(this);
			}
		}

		dispose():void {
			if(this.star_light) {
				this.star_light.removeFromParent();
			}

			if(this.star_shine) {
				this.star_shine.removeFromParent();
			}

			if(this.bgImage) {
				egret.Tween.removeTweens(this.bgImage);
			}

			if(this.bzImg) {
				egret.Tween.removeTweens(this.bzImg);
			}

			if(this.imgBanner){
				egret.Tween.removeTweens(this.imgBanner);
			}

			if(this.lineImg_left) {
				egret.Tween.removeTweens(this.lineImg_left);
			}

			if(this.lineImg_right){
				egret.Tween.removeTweens(this.lineImg_right);
			}
			
			super.dispose();
		}
	}
}