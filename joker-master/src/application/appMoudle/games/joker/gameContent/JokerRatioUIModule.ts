module joker {
	export class JokerRatioUIModule extends app.base.BaseWndUIMoudleComponent {

		public bg:eui.Image;
		public img_chroose:eui.Image;
		public btnClose:eui.Image;
		

		public constructor() {
			super();
			this.skinName = "resource/app_skin/joker/JokerRatioUIModule.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.btnClose);
			if(this.gameUIModule) {
				this.gameUIModule.bodyContent.visible = false;
			}
		
		}

		firstChroose:boolean = false;
		opening():void {
			super.opening();
			this.renderChroose(this.firstChroose);
			this.firstChroose = true;
		}

		removeParent() {
			if(this.gameUIModule) {
				this.gameUIModule.bodyContent.visible = true;
			}
			super.removeParent();
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			let target = tag;
			switch(target) {
				case this.btnClose :
					this.close(this);
					break;
			}
		}

		oldX:number = 124;
		renderChroose(showTween:boolean = true):void {
			let sx:number = 124;
			let sw:number = 143;

			let ratio:number = getProxy().nowRatio;
			let index:number = ratio - 1;

			let newX:number = sx + index * sw;
			if(newX != this.oldX) {
				this.oldX = newX;
				if(showTween) {
					egret.Tween.removeTweens(this.img_chroose);
					egret.Tween.get(this.img_chroose)
						.to({x:newX},400,egret.Ease.quadOut);
				}
				else {
					this.img_chroose.x = newX;
				}
			}
		}

		private get gameUIModule():joker.JokerGameModule{
			if(__IS_MOUDLE_OPEN(AppReg.JOKER_MODULE)) {
				return <joker.JokerGameModule>__GET_MOUDLE_COMP(AppReg.JOKER_MODULE)
			}
			return null;
		}

		dispose():void {
			egret.Tween.removeTweens(this.img_chroose);
			super.dispose();
		}
	}
}