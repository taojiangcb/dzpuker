module playcards {
	/**
	 * 牌
	 * @author 
	 *
	 */
	export class CardItem extends gameabc.UICustomComponent{
        public cardImg: eui.Image;
		public darkImg: eui.Image;
		/***牌的逻辑id 翻牌用*/
		public cardid: number;
		public alltime: number = 100;
		public static backSrc: string = "card-1-0_png";
		// private tween: egret.Tween;
		protected move: gameabc.LineMove;
		public constructor() { 
			super();
            this.skinName = "CardItemSkin";       
            this.touchChildren = false;
            this.touchEnabled = false;
		}

		/**显示牌背 */
		public setCardBack(): void{
			this.cardImg.source = CardItem.backSrc;
		}
		/**翻牌 动画 前设置成牌背 */
		public setBackId(id:number): void{
			this.cardid = id;
			this.cardImg.scaleX = 1;
			this.setCardBack();
		}
			/**设置图片id(proxy:m_cbCardData) */
		public setCardId(id:number): void{
			this.cardid = id;
			this.cardImg.scaleX = 1;
			this.visible = true;
			this.cardImg.source = getProxy().getCardName(id);
		}
		public setResult(result:CardsResult): boolean{
			var value:number = -2;
			if(result!=null&&this.parent != null)
		 		 value = getProxy().hasCards(result.allvos, this.cardid)
			// this.cardImg.alpha = value == -1 ? 0.5 : 1;
			this.darkImg.visible = true;	
			var dark: boolean = (value == -1 && this.cardid > 0);
			this.showDark(dark);
			return dark;
		}
		/**是否高亮 */
		public showDark(light:boolean): void{			
			this.darkImg.visible = true;	
			if (light) this.addChild(this.darkImg);			
			else this.darkImg.removeFromParent();
			
		}
		/**重置 */
		public hideLight(): void{
			this.cardImg.alpha = 1;
			this.darkImg.removeFromParent();
			this.cardid = null;
            this.setCardBack(); // 理论上可以不加这个，收到发牌消息后会调用此方法。
		}
		/**是否显示牌背 */
		public isBack(): boolean{
            return this.cardImg.source == null || this.cardImg.source == CardItem.backSrc;
		}
	
		/**翻牌 先赋值this.cardid 只有背面翻正面*/
		public turnOver(): void{
			 if (this.isBack()&&this.cardid!=null) {//(this.move == null||this.move.isComplete)&&
				this.cardImg.scaleX = 1;
				if (this.move == null) {
					this.move = new gameabc.LineMove();
					this.move.alltime = this.alltime;
				}
				this.move.go(10, 0, 2, 0);
				egret.Ticker.getInstance().register(this.advanceTime,this);
				this.darkImg.visible = false;
			 }			
		}
		public advanceTime(time: number): void {
            // time = time / 1000;
            this.move.advanceTime(time);
			this.cardImg.scaleX = this.move.x/10;
			if (this.move.isComplete) {
				if (this.cardImg.scaleX < 1) {
					this.setCardId(this.cardid);
					this.move.go(2, 0, 10, 0);
					this.cardImg.scaleX = 0.2;
				} else {
					this.darkImg.visible = true;
					this.turnover();
					egret.Ticker.getInstance().unregister(this.advanceTime,this);
				}
			}
		}
		protected turnover(): void{
			
		}
		// private changecard(): void{
		// 	this.setCardId(this.cardid);
		// 	this.tween = egret.Tween.get(this.cardImg).to({scaleX:1},150).call(this.turnComp,this);
		// }
		// private turnComp(): void{
		// 	this.tween = null;
		// 	this.darkImg.visible = true;
		// }
	}
}
