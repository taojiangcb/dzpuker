module appvos {
	export class PMInfoVO  {
		betNum:number = 0;    			//下注金额
		cardsNum:number = 0;  			//下注门数
		multi:number = 0;     			//下注倍数
		totalBet:number = 0;  			//总下注金额
		leftMoney:number = 0;  			//剩余金额
		card:PMCardVO  = null;      	//手牌

		constructor(data?:any){
			if(data) {
				var vo:any = AppGlobal.getMessage("PMInfoVO").decode(data);
				if(vo) this.setData(data);
			}
		}

		setData(data?:any) {
			if(data) {
				this.betNum = data.betNum;
				this.cardsNum = data.cardsNum;
				this.multi = data.mutil;
				this.totalBet = data.totalBet;
				this.leftMoney = data.leftMoney;
				if(data.card) {
					this.card = new PMCardVO();
					this.card.setData(data.card);
				}
			}
		}

		clear():void {
			this.card = null;
			this.betNum = 0;
			this.cardsNum = 0;
			this.multi = 0;
			this.totalBet = 0;
		}
	}
}