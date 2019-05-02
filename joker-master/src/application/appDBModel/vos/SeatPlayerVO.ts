module appvos {

	export class SeatPlayerVO {
		
		
		public roleId: number;//ID

		public name: string;//名称
		public namedata: any;//名称
		public nameutf8:string;//名称uft8字符
		public sex: number;//性别

		public avatarID: string;//头像

		public vipLevel: number;//VIP

		public seatId: number;//

		public totalBringBet: number;//总带入

		public nowBet: number;//当前筹码

		public isAllIn: boolean;//是否ALLIN

		public isFold: boolean;//是否弃牌

		public isPlay: boolean;//是否入局

		public totalBet: number;//总下注

		public turnBet: number;//当前轮下注
        public myCard: number[];//我的手牌
        public rcheck:number;////用户标签1
        public rlabel: string;////用户标签2
		public numWins:number;//胜
		public numLosts:number;//负
		public numPeaces:number;//平
		public numEscapes:number;//逃跑
        public raiseTime: number;//当前轮加注次数
		public outType: number = -1;//标识是否已经离开 播放结算结束后离开 默认-1  0普通离开 1 服务端超时离开 -2好友查看
		public canContinue: number;//下局能否继续 0继续 1输光还有钱 2输光没有钱
		public huntFlag: number;//猎杀标志 0无关1猎杀者2被杀者
 		//incoming_count:number = 0;//入局次数
		//assessed_count:number = 0;//摊牌次数
		//hunting_number:number = 0;//猎杀数
		//total_profit:number = 0;//总获利
		//dan_points:number = 0;//段位积分
		//income:number = 0;//收益统计
		//total:number=0;//总局数
		//position:string = ""//玩家地理位置;
		//level:number = 0;//玩家等级

		public result: playcards.CardsResult;//牌型结果
		public cardPower: number;//牌型权值
		public winRate: number;//胜率-1表示无法统计
		// public safeAdd: number;//保险获利

		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("SeatPlayerVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
			// this.name = vo.name; 
			if (vo.nameutf8) this.name = vo.nameutf8;
			else this.name = FormatUtils.protoToGBK(vo.name);// utils.NativeUtils.ToGBKString(vo.name1.buffer, vo.name1.offset, vo.name1.limit - vo.name1.offset);	
			this.namedata = vo.name;
			this.nameutf8 = vo.nameutf8;
			this.sex = vo.sex;

			this.avatarID = vo.avatarID;
            
			this.vipLevel = vo.vipLevel;

			this.seatId = vo.seatId;

			this.totalBringBet = vo.totalBringBet;

			this.nowBet = vo.nowBet;
			if(this.nowBet==null||isNaN(this.nowBet))
				this.nowBet = 0;
			this.isAllIn = vo.isAllIn;

			this.isFold = vo.isFold;

			this.isPlay = vo.isPlay;

			this.totalBet = vo.totalBet;

            this.rcheck = vo.rcheck;

            this.rlabel = vo.rlabel;
			this.turnBet = vo.turnBet;
            this.myCard = vo.myCard;
			this.numWins = vo.numWins;
			this.numLosts= vo.numLosts;
			this.numPeaces= vo.numPeaces;
			this.numEscapes = vo.numEscapes;
			this.raiseTime = vo.raiseTime;
			if (this.raiseTime == null)
				this.raiseTime = 0;	
			vo = null;
			
		}
		
		getProtoVO(): any {
			var vo: any = AppGlobal.getMessageVO("SeatPlayerVO");
			vo.roleId = __SET_INT64(this.roleId);
			if(this.namedata!=null)
				vo.name = this.namedata;
			vo.nameutf8 = this.nameutf8;
			if(this.sex!=null)
				vo.sex = this.sex;
			if (this.avatarID == undefined)
				this.avatarID = null;
			vo.avatarID = this.avatarID;
			if(this.vipLevel!=null)
				vo.vipLevel = this.vipLevel;

			vo.seatId = this.seatId;

			vo.totalBringBet = this.totalBringBet;

			vo.nowBet = this.nowBet;
			
			vo.isAllIn = this.isAllIn;

			vo.isFold = this.isFold;

			vo.isPlay = true;//this.isPlay;

			vo.totalBet = this.totalBet;
           if(this.rcheck!=null)
            vo.rcheck = this.rcheck;
			if(this.rlabel!=null)
              vo.rlabel = this.rlabel;
			vo.turnBet = this.turnBet;
            vo.myCard =  this.myCard; 
			if(this.numWins!=null)
				vo.numWins = this.numWins;
			if(this.numLosts!=null)
				vo.numLosts= this.numLosts;
			if(this.numPeaces!=null)
				vo.numPeaces= this.numPeaces;
			if(this.numEscapes!=null)
				vo.numEscapes = this.numEscapes;
			if(this.raiseTime!=null)
				vo.raiseTime = this.raiseTime;
			return vo;
		}
		/**
		 * 牌局开始重置
		 */
		public reset(isplay:boolean = true):void{
            this.isAllIn = false;
            this.isFold = false;//是否弃牌	
            this.isPlay = isplay;//是否入局
            this.totalBet = 0;//总下注
			this.raiseTime = 0;
            this.turnBet = 0;//当前轮下注
            this.myCard = [];//我的手牌
			// this.safeAdd = null;
		}
	}
}
