module appvos {

	export class HLCInfoVO {
		
		
		public seatId: number;//座位号

		public betNum: number;//筹码最终值

		public posWin1: number;//输赢位置1

		public posWin2: number;//输赢位置2

		public posWin3: number;//输赢位置3

		public posWin4: number;//输赢位置4
		
		public realWin: number;//实际输赢
		public posWin: number[];
		/**总输赢 */
		public get totalWin(): number{
			return this.posWin1 + this.posWin2 + this.posWin3 + this.posWin4;
		}
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("HLCInfoVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.seatId = vo.seatId;

			this.betNum = vo.betNum;

			this.posWin1 = vo.posWin1;

			this.posWin2 = vo.posWin2;

			this.posWin3 = vo.posWin3;

			this.posWin4 = vo.posWin4;
            this.posWin = [vo.posWin1, vo.posWin2, vo.posWin3, vo.posWin4];
			this.realWin = vo.realWin;
			vo = null;
		}
		
	}
}
