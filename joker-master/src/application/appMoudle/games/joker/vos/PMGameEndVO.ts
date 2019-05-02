module appvos {
	export class PMGameEndVO  {
		betNum:number = 0;       //下注金额
		cardsNum:number = 0;     //下注门数
		multi:number = 0;        //下注倍数
		totalBet:number = 0;     //总下注金额
		leftMoney:number = 0;    //剩余金额
		betWinMoney:number = 0;  //牌局获得金额
		cards:PMCardVO[] = [];   //各门牌数据

		constructor(data:any) {
			if(data) {
				var vo:any = AppGlobal.getMessage("PMGameEndVO").decode(data);
				if(vo) this.setData(vo);
			}
		}

		setData(data:any):void {
			if(data) {
				this.betNum = data.betNum;
				this.cardsNum = data.cardsNum;
				this.multi = data.multi;
				this.totalBet = data.totalBet;
				this.leftMoney = data.leftMoney;
				this.betWinMoney = data.betWinMoney;
				if(data.cards) {
					this.cards = [];
					var len:number = data.cards.length;
					var card:PMCardVO;
					for(var i:number = 0; i < len; i++) {
						card = new PMCardVO();
						card.setData(data.cards[i]);
						this.cards.push(card);
					}
				}
			} 
			else {
				this.clear();
			}
		}

		clear():void {
			this.betNum = 0;
			this.cardsNum = 0;
			this.multi = 0;
			this.totalBet = 0;
			this.leftMoney = 0;
			this.betWinMoney = 0;
			this.cards = [];
		}
	}
}