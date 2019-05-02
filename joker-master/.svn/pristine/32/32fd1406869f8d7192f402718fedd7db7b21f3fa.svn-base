module appvos {

	export class GameEndInfoVO {
		public seatId: number;//座位号
		public betNum: number;//筹码最终值
		public card: number[];//手牌 可能没有
		public winPool: number[];//赢的边池 可能没有
		public addBetNum: number;//自动补充筹码值
		public gameResult: number;//游戏结果 1胜2负3平   牌局开始 默认 大盲 小盲 加注筹码
		public canContinue: number;//下局能否继续 0继续 1输光还有钱 2输光没有钱
		public huntFlag: number;//猎杀标志 0无关1猎杀者2被杀者
		public winlostnum:number;//输赢多少钱
  		public insurnum:number;//保险盈亏
		public constructor(data: any = null) {
			if (data != null) {
				var vo: any = AppGlobal.getMessage("GameEndInfoVO").decode(data);
                this.setData(vo);
            } else {
				this.winPool = [];
				this.card = [];
			}
		}
		public setData(vo: any): void {
			if (vo == null) {
                return;
            }
			this.seatId = vo.seatId;
			this.betNum = vo.betNum;
			var i: number = 0; var len: number = 0;
			this.card = []; len = vo.card.length; for (i = 0; i < len; i++) { this.card[i] = vo.card[i]; };
			this.winPool = []; len = vo.winPool.length; for (i = 0; i < len; i++) { this.winPool[i] = vo.winPool[i]; };
			this.addBetNum = vo.addBetNum;
			this.gameResult = vo.gameResult;
			this.canContinue = vo.canContinue;
			this.huntFlag = vo.huntFlag;
			if( vo.winlostnum!=null)
				this.winlostnum = vo.winlostnum.toNumber();
			if(vo.insurnum!=null)
				this.insurnum = vo.insurnum.toNumber();
			
			vo = null;
		}
		getProtoVO(): any {
            var vo: any = AppGlobal.getMessageVO("GameEndInfoVO");			
            vo.seatId = this.seatId;
			if(this.betNum!=null&&!isNaN(this.betNum))
				vo.betNum = this.betNum;
			var i: number = 0; var len: number = 0;
			vo.card = []; len = this.card.length; for (i = 0; i < len; i++) { vo.card[i] = this.card[i]; };
			vo.winPool = []; len = this.winPool.length; for (i = 0; i < len; i++) { vo.winPool[i] = this.winPool[i]; };
			if(this.addBetNum!=null)
				vo.addBetNum = this.addBetNum;
			if(this.gameResult!=null)
				vo.gameResult = this.gameResult;
			if (this.canContinue != null)
				vo.canContinue = this.canContinue;
			if (this.huntFlag != null)
				vo.huntFlag = this.huntFlag;
			if (this.winlostnum != null)
				vo.winlostnum = this.winlostnum;
			if (this.insurnum != null)
				vo.insurnum = this.insurnum;
            return vo;
        }
        toArrayBuffer():ArrayBuffer{
			var vo: any = this.getProtoVO(); 
			return vo.toArrayBuffer();
		}
	}
}
