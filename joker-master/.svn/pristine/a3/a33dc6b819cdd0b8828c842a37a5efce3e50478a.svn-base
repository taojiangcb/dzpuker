module appvos {

	export class HLCTableVO {
		
		
		public gTableId: number;//房间ID

		public roleId: number;//房主ID

		public roomName: string;//房间名称

		public tableSize: number;//桌子人数

		public gameStatus: number;//游戏状态  1可以下注 0空闲

		public timeLast: number;//倒计时剩余  秒

		public playerVO: HLCPlayerVO[];
		public allPlayerVO: Object;
		public seatPlayerVO: HLCPlayerVO[];//已入坐的玩家
		public noSeatPlayerVO: HLCPlayerVO[];//未入座的玩家
		public allbets: number[];//4个下注池筹码数量 
		public winHistory: number[];//历史输赢
		public servicePay: number;//服务费
		public bankServicePay: number;//庄家服务费
		public chatPay: number;					//表情服务费
		public anteDouble: boolean;//是否双倍
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("HLCTableVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.gTableId = vo.gTableId;

			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();

			this.roomName = vo.roomName;

			this.tableSize = vo.tableSize;

			this.gameStatus = vo.gameStatus;

			this.timeLast = vo.timeLast;

			this.winHistory = vo.winHistory;
			this.servicePay = vo.servicePay;
			this.bankServicePay = vo.bankServicePay;
			this.chatPay = vo.chatPay;
			this.anteDouble = vo.anteDouble == 1;
            this.allbets = [0, 0, 0, 0];
			var i: number = 0; var len: number = 0;
			if (vo.PlayerVO) {				
				this.playerVO = [];
				this.seatPlayerVO = [];
				this.noSeatPlayerVO = [];
				this.allPlayerVO = {};
				len = vo.PlayerVO.length;
				var player: HLCPlayerVO;
				for (i = 0; i < len; i++) {
					player = this.playerVO[i] = new HLCPlayerVO();
					player.setData(vo.PlayerVO[i]);
					this.allPlayerVO[player.seatId] = player;
					if (player.showPos == null) player.showPos = 0;
					if (player.showPos > 0) {
						this.seatPlayerVO.push(player);
					} else this.noSeatPlayerVO.push(player);
					this.allbets[0] += player.posBet1;
					this.allbets[1] += player.posBet2;
					this.allbets[2] += player.posBet3;
					this.allbets[3] += player.posBet4;
				}
			} else {
				this.playerVO = null;
			}
			vo = null;
		}
		public clear(): void{
			this.allbets = [0, 0, 0, 0];
		}
	}
}
