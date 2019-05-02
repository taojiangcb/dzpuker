module happy {
	export class LuckyCardItem extends playcards.CardItem{
		public cardvalueImg: eui.Image;
		private bgimg: string = "card_bg_png";
		private times: number;
		public constructor() {
			super();
			this.skinName = "LuckyCardItemSkin";
			this.touchEnabled = true;
		}
		/**显示牌背 */
		public setCardBack(): void{
			super.setCardBack();
			this.cardvalueImg.visible = false;
		}
			/**设置图片id(proxy:m_cbCardData) */
		public setCardId(id:number): void{
			this.cardid = id;
			this.cardImg.scaleX = 1;
			this.visible = true;
			this.cardImg.source = this.bgimg;
			this.cardvalueImg.source = "card_" + id + "_png";
			this.cardvalueImg.visible = true;
		}
		/**显示高亮 */
		public showLight(): void{
			this.darkImg.visible = true;
			// this.addChildAt(this.darkImg, 0);
		}
        public hideLight(): void{
			this.darkImg.visible = false;
		}
		/**翻牌 先赋值this.cardid */
		public turnOver(): void{
			this.cardvalueImg.visible = false;
				this.cardImg.scaleX = 1;
				if (this.move == null) {
					this.move = new gameabc.LineMove();
					this.move.alltime = this.alltime;
				}
				this.times = 0;
				this.move.go(10, 0, 2, 0);
				egret.Ticker.getInstance().register(this.advanceTime,this);
				this.darkImg.visible = false;				
		}
		public advanceTime(time: number): void {
            // time = time / 1000;
            this.move.advanceTime(time);
			this.cardImg.scaleX = this.move.x/10;
			if (this.move.isComplete) {
				if (this.times >2 && this.cardImg.source == this.bgimg) {
					this.darkImg.visible = true;
					this.setCardId(this.cardid);
					egret.Ticker.getInstance().unregister(this.advanceTime,this);
				} else {
					if (this.cardImg.scaleX < 1) {
						this.move.go(2, 0, 10, 0);
						this.cardImg.scaleX = 0.2;
						if (this.cardImg.source == this.bgimg)
							this.setCardBack();
						else this.cardImg.source = this.bgimg;
					} else {
						this.move.go(10, 0, 2, 0);
						this.times++;
					}
				}
				
			}
		}
		public turnCard(cardid: number) {
			this.cardid = cardid;
			this.turnOver();
		}
	}
}