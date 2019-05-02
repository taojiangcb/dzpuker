module joker {
	export class JokerCardItem extends playcards.CardItem {

		public cardImg:eui.Image;
		public darkImg:eui.Image;
		public img_baoliu:eui.Image;

		private lock:boolean = false;

		public constructor() {
			super();
			this.skinName = "JokerCardItemSkin";       
            this.touchChildren = false;
            this.touchEnabled = false;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.img_baoliu.visible = this.lock;
		}

		setLock(val:boolean):void {
			this.lock = val;
			if(this.initialized) {
				this.img_baoliu.visible = val;
			}
		}

		getLock():boolean {
			return this.lock;
		}
	}
}