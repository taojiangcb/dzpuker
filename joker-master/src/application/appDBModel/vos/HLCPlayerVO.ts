module appvos {

	export class HLCPlayerVO {


		public roleId: number;//ID

		public name: string;//名称

		public namedata: any;//名称

		public sex: number;//性别

		public avatarID: string;//头像

		public vipLevel: number;//VIP

		public seatId: number;// 服务端座位号

		public banker: number;//是否是庄家

		public totalBet: number;//总筹码

		public posBet1: number;//下注筹码1

		public posBet2: number;//下注筹码2

		public posBet3: number;//下注筹码3

		public posBet4: number;//下注筹码4
		
		public showPos: number;//桌面上位置 0无座  1庄位 >1坐在座子上的玩家

		public constructor(data: any = null) {
			if (data != null) {
				var vo: any = AppGlobal.getMessage("HLCPlayerVO").decode(data);
                this.setData(vo);
            }
		}

		public setData(vo: any): void {
			if (vo == null) {
                return;
            }

			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();

			this.name = FormatUtils.protoToGBK(vo.name);
			this.namedata = vo.name;

			this.sex = vo.sex;

			this.avatarID = vo.avatarID;

			this.vipLevel = vo.vipLevel;

			this.seatId = vo.seatId;

			this.banker = vo.banker;

			this.totalBet = vo.totalBet;

			this.posBet1 = vo.posBet1;
			if (this.posBet1 == null) this.posBet1 = 0;
			this.posBet2 = vo.posBet2;
			if (this.posBet2 == null) this.posBet2 = 0;
			this.posBet3 = vo.posBet3;
			if (this.posBet3 == null) this.posBet3 = 0;
			this.posBet4 = vo.posBet4;
			if (this.posBet4 == null) this.posBet4 = 0;
			this.showPos = vo.showPos;
			if (this.showPos == null) this.showPos = 0;
			vo = null;
		}
		public addBet(index: number, bet: number): void {
			this.totalBet -= bet;
			if (index == 0) this.posBet1 += bet;
			else if (index == 1) this.posBet2 += bet;
			else if (index == 2) this.posBet3 += bet;
			else if (index == 3) this.posBet4 += bet;
		}
		public getBet(index: number): number{
			if (index == 0) return this.posBet1 ;
			else if (index == 1)return this.posBet2;
			else if (index == 2) return this.posBet3;
			else if (index == 3)return this.posBet4;
		}
		public totalAdd(): number{
			return this.posBet1 + this.posBet2 + this.posBet3 + this.posBet4;
		}
		/**可以加注的筹码 只能加注1/9筹码 */
		public getLeftAdd(servicePay:number,add:number=0): number{
			var nowadd =add+ this.posBet1 + this.posBet2 + this.posBet3 + this.posBet4;
			var totaladd =Math.floor ((this.totalBet-servicePay+nowadd)/9);
			return totaladd - nowadd;
		}
		public clear(): void{
			this.posBet1 = 0;

			this.posBet2 = 0;

			this.posBet3 = 0;

			this.posBet4 = 0;
   
		}
	}
}
