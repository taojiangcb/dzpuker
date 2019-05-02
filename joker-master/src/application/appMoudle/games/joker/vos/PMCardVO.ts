module appvos {
	export class PMCardVO {
		cards:number[] = [];
		winMoney:number = 0;
		public constructor(data?:any) {
			if(data) {
				var vo:any = AppGlobal.getMessage("PMCardVO").decode(data);
				this.setData(vo);
			}
		}

		setData(data:any):void {
			if(data) {
				this.cards = [];
				if(data.cards && data.cards.length > 0) {
					this.cards = data.cards;
				}
				this.winMoney = data.winMoney;
			}
			else {
				this.clear();
			}
		}

		clear():void {
			this.cards = [];
			this.winMoney = 0;
		}
	}
}