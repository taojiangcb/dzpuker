/**
 * 鬼畜大转盘
 */
module appvos {
	
	export class ZPPlayerVO {
		roleId:number 	= 0;//ID
		name:string 	= "";//名称
		seatId:number 	= 0;//名称
	
		posBet1:number 	= 0;  //下注筹码1
		posBet2:number 	= 0; //下注筹码2
		posBet3:number 	= 0; //下注筹码3
		posBet4:number 	= 0; //下注筹码4
		posBet5:number 	= 0;  //下注筹码5
		posBet6:number 	= 0; //下注筹码6
		posBet7:number 	= 0; //下注筹码7

		public constructor(data: any = null) {
			if (data != null) {
				var vo: any = AppGlobal.getMessage("ZPPlayerVO").decode(data);
                this.setData(vo);
            }
		}

		setData(data:any) {
			if(data) {
				this.roleId = data.roleId;
				this.name = data.name;
				this.seatId = data.setaId;
				this.posBet1 = data.postBet1;
				this.posBet2 = data.postBet2;
				this.posBet3 = data.postBet3;
				this.posBet4 = data.postBet4;
				this.posBet5 = data.postBet5;
				this.posBet6 = data.postBet6;
				this.posBet7 = data.postBet7;
			}
			else {
				this.clear();
			}
		}

		clear():void {
			this.roleId = 0;
			this.name = "";
			this.seatId = 0;
			this.posBet1 = 0;
			this.posBet2 = 0;
			this.posBet3 = 0;
			this.posBet4 = 0;
			this.posBet5 = 0;
			this.posBet6 = 0;
			this.posBet7 = 0;
		}
	}
}