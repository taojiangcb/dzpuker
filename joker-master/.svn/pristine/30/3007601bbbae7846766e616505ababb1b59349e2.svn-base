module happy {
	export class HappyAllCardsComp extends gameabc.UICustomComponent {
		public card1: CardItem;
		public card2: CardItem;
		public card3: CardItem;
		public card4: CardItem;
		public card5: CardItem;
		public cardtype: eui.Image;
		public cardtypebg: eui.Image;
        public allCards: CardItem[];
		public target: HappyBetItemComp;
		private cards: number[];
		private showtime: number;
		private result: playcards.CardsResult;
		public winBank: boolean;//比庄大
		public xnum: eui.Image;
		private addtimes: number;
		public constructor() {
			super();
			this.skinName = "HappyAllCardsSkin";
            this.touchEnabled = false;
		}
		public createComplete(event: egret.Event): void {
			super.createComplete(event);
			this.allCards = [this.card1, this.card2, this.card3, this.card4, this.card5];
			this.card1.hideLight();
			this.card2.hideLight();
			this.card3.hideLight();
			this.card4.hideLight();
			this.card5.hideLight();
        }
		public hide(): void {
			this.visible = false;
			egret.clearTimeout(this.showtime);
		}
		public show(cards: number[], delay: number): void {
			this.xnum.visible = false;
			this.cards = cards;
			// this.showtime = egret.setTimeout(this.showCard, this, delay);
			this.showtime = egret.setTimeout(this.turnCard, this, delay);
			this.result = playcards.getProxy().getCardResult(this.cards);
			if (this.target == null) {
				// getProxy().bankType = this.result.type;
				getProxy().bankResult = playcards.getProxy().getcardsValue(this.result.allvos, this.result.type);
			} 
		}
		public fapai(delay: number): void{
			this.xnum.visible = false;
			this.showtime = egret.setTimeout(this.showCard, this, delay);
		}
		public showCardBack(): void{
			this.visible = true;
			for (var i: number = 0; i < this.allCards.length; i++) {
				this.allCards[i].setCardBack();
			}
			this.cardtypebg.visible = false;
			this.cardtype.visible = false;
			this.xnum.visible = false;
		}
		private showCard(): void {
			utils.SoundUtils.playEffectSound(utils.SoundUtils.fapai);
			this.visible = true;
			var fromy: number;
			if (this.target) fromy = -40;
			else fromy = 40;
			for (var i: number = 0; i < this.allCards.length; i++) {
				// this.allCards[i].setBackId(this.cards[i]);
				this.allCards[i].setCardBack();
				this.allCards[i].showCard(fromy, 0.1 * i);
			}
			this.cardtypebg.visible = false;
			this.cardtype.visible = false;
			this.xnum.visible = false;
			// this.showtime = egret.setTimeout(this.turnCard, this, 1000);
		}
		private turnCard(): void {
			this.addtimes = 0;
			var luckyid = getProxy().nowLuckyCard;
			for (var i: number = 0; i < this.cards.length; i++) {
				this.allCards[i].cardid = this.result.allvos[i].value;//  this.cards[i];
				if (this.allCards[i].getCardLogicValue() == luckyid) {
					this.addtimes++;
					this.allCards[i].isHight = true;
				}				
				this.allCards[i].turnOver();
			}
			this.cardtypebg.visible = true;
			this.cardtype.visible = true;
			
			if (this.target) {		
				var res: number = playcards.getProxy().getcardsValue(this.result.allvos, this.result.type);
				var win = this.winBank = res > getProxy().bankResult;
				var myIsBank: boolean = getProxy().mySeatvo.showPos == 1;
				if (myIsBank) win = !this.winBank;
				// if ((myIsBank && win)||(!myIsBank&&!win)) {
				// 	var type: number =getProxy().typeToAddNum(getProxy().bankType);
				// } else {
				// 	type = getProxy().typeToAddNum(this.result.type);
				// }
				var type: number = myIsBank ? 1 : this.result.type;
				this.target.showType(win,type);				
				if (win) {
					this.cardtype.source = "img_word_gameUI_play" + (this.result.type + 1) + "_png";
					if(myIsBank)getProxy().bankCards.showType();
					else this.showType();
				} 
				else {
					this.cardtype.source = "img_word_gameUI_happy_h_" + (this.result.type + 1) + "_png";
					if(!myIsBank)
					 getProxy().bankCards.showType();
				} 
			}else this.cardtype.source = "img_word_gameUI_happy" + (this.result.type + 1) + "_png";
		}
		public showType(): void{
			var type = getProxy().typeToAddNum(this.result.type)+this.addtimes;
			if (type > 1) {
				if (!this.xnum.visible) {
					 this.xnum.visible = true;
					this.xnum.source = "img_word_happy_x" + type + "_png";
					this.xnum.scaleX = this.xnum.scaleY = 0.1; 
					egret.Tween.get(this.xnum).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.bounceOut);
				 }
				
			}else this.xnum.visible = false;
		}
		
	}
}