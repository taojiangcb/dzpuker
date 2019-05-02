module happy {
	export class HappyLuckySelectUIMoudle extends app.base.BaseWndUIMoudleComponent{
		public btnClose:eui.Image;
		public radombtn:eui.Group;
		public submitbtn:eui.Group;
		public card0:LuckyCardItem;
		public card1:LuckyCardItem;
		public card2:LuckyCardItem;
		public card3:LuckyCardItem;
		public card4:LuckyCardItem;
		public card5:LuckyCardItem;
		public card6:LuckyCardItem;
		public card7:LuckyCardItem;
		public card8:LuckyCardItem;
		public card9:LuckyCardItem;
		public card10:LuckyCardItem;
		public card11:LuckyCardItem;
		public selectimg:eui.Image;
		private allcard: LuckyCardItem[];
		private selectCard: LuckyCardItem;
		public constructor() {
			super();
			this.skinName = "HappyLuckySelectSkin";

		}
		public createComplete(event: egret.Event):void{
			super.createComplete(event)
			this.bindButton(this.card0, false);
			this.bindButton(this.card1, false);
			this.bindButton(this.card2, false);
			this.bindButton(this.card3, false);
			this.bindButton(this.card4, false);
			this.bindButton(this.card5, false);
			this.bindButton(this.card6, false);
			this.bindButton(this.card7, false);
			this.bindButton(this.card8, false);
			this.bindButton(this.card9, false);
			this.bindButton(this.card10, false);
			this.bindButton(this.card11, false);
			this.bindButton(this.btnClose, false);
			this.bindButton(this.radombtn, false);
			this.bindButton(this.submitbtn, false);
			var nowcard = getProxy().nowLuckyCard;
			var cardindex = 0;
			for (var i: number = 1; i < 14; i++){
				if (nowcard != i&&cardindex<12) {
					this["card" + cardindex].setCardId(i);
					cardindex++;
				}	
			}
			this.selectimg.visible = false;
		}
	
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			switch (clickTarget) {
				case this.btnClose:
					this.close();	
					break;
				case this.radombtn:
					__PVO().i(0).to(app.NetAction.GLXY_REQ_LUCKY_CARD);
					this.sendNotification(app.NetAction.GLXY_REQ_LUCKY_CARD);
					mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_LUCKY_RADOM);
					this.close();	
					break;
				case this.submitbtn:
					if (this.selectCard) {
						__PVO().i(this.selectCard.cardid + 1).to(app.NetAction.GLXY_REQ_LUCKY_CARD);
						mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_LUCKY_SUBMIT,this.selectCard.cardid);
						this.sendNotification(app.NetAction.GLXY_REQ_LUCKY_CARD);
						this.close();
					} else
						tip.popSysCenterTip("请先选择一张替换的牌",tip.TIPS_TYPE.TIPS_WARNING);	
					break;
				default:
					if (clickTarget instanceof LuckyCardItem) {
						if (this.selectCard)
							this.selectCard.hideLight();	
						this.selectCard = clickTarget;
						this.selectimg.visible = true;
						this.selectCard.showLight();
						this.selectimg.x = this.selectCard.x;
						this.selectimg.y = this.selectCard.y;
					}
					
					break;	
			 }
        }
	}
}