module appvos {

	export class TexasTableVO {


		public gTableId: number;//房间ID

		public roleId: number;//房主ID

		// public roomName: string;//房间名称

		public tableSize: number;//桌子人数

		public minJoinMoney: number;//最低筹码

		public maxMagnification: number;//最大带入倍数

		public gameEndTime: number;//结束时间

		public sbBet: number;//小盲

		public bbBet: number;//大盲

		private _whoplay: number=-1;//轮到谁
		set whoplay(value: number) {
			if (isNaN(value)||value==null||value >= this.tableSize) value = -1;
			this._whoplay = value;
		}
		get whoplay(): number {
			return this._whoplay;
		}
		public banker: number;//庄家

		public gameStatus: number;//游戏状态

		public timeCount: number;//倒计时

		public totalBet: number;//当前底池

		public globalCards: number[];//公共牌

		public seatPlayerVO: SeatPlayerVO[];

		public joinPlayerVO: JoinPlayerVO[];

		public tableStatus: number;//桌子状态 1正在游戏 0 等待开局

		public maxPot: number;//最大底池

		public totalHand: number;//总手数
		
        public pots: number[];//边池
		
		public preBet :number;//前注
		public nowTime: number;//倒计时已经进行时间
		public roommode: number;//房间模式
		public isAllIN: boolean;//是否都allin
        public dealer: string;//荷官
		public dealerstate: number;//荷官状态 
		public roomtype: number;// 房间类型 0 未知 1 金币 2 普通4W 3 40W 4 SNG MTT
		public cardmode: number;// 0 正常 1 5-A
		public whiteReporter:number[];  //可以举报id列表
 		public versionNum:number;  //版本
		caishentime:number = 0;//财神送礼轮数 0不开放 >0 每多少轮发放
 		caishenmoney:number = 0;//财神送礼金额
 		caishenround:number = 0;//财神送礼当前轮数

		public constructor(data: any = null) {
			if (data != null) {
				var vo: any = AppGlobal.getMessage("TexasTableVO").decode(data);
                this.setData(vo);
            }
		}
		
		
		/**
		 * 从牌桌中搜索某个玩家
		 */ 
        public searchPlayerInSeats(roleid:number):appvos.SeatPlayerVO {
            for(var i: number = 0,len: number = this.seatPlayerVO.length;i < len;i++) {
                var seatVo: appvos.SeatPlayerVO = this.seatPlayerVO[i];
                if(seatVo.roleId == roleid) {
                    return seatVo;
                }
            }
            return null;
		}

		public setData(vo: any): void {
			if (vo == null) {
                return;
            }

			this.gTableId = vo.gTableId;

			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();

			// this.roomName = vo.roomName;

			this.tableSize = vo.tableSize;

			this.minJoinMoney = vo.minJoinMoney;

            this.maxMagnification = Math.floor(vo.maxMagnification / vo.minJoinMoney) ;

			this.gameEndTime = vo.gameEndTime == null ? 0 : vo.gameEndTime.toNumber();
			
			this.bbBet = vo.bbBet;
			
			this.sbBet = vo.bbBet >> 1;
			
			this.whoplay = vo.whoplay;

			this.banker = vo.banker;

			this.gameStatus = vo.gameStatus;

			this.timeCount = vo.timeCount;

			this.totalBet = vo.totalBet;

			this.caishentime = vo.caishentime ? vo.caishentime : 0;
			this.caishenmoney = vo.caishenmoney ? vo.caishenmoney : 0;
			this.caishenround = vo.caishenround ? vo.caishenround : 0;

			var i: number = 0; var len: number = 0;
			this.globalCards = []; len = vo.globalCards.length; for (i = 0; i < len; i++) { this.globalCards[i] = vo.globalCards[i]; }

			if (vo.seatPlayerVO) { this.seatPlayerVO = []; len = vo.seatPlayerVO.length; for (i = 0; i < len; i++) { this.seatPlayerVO[i] = new SeatPlayerVO(); this.seatPlayerVO[i].setData(vo.seatPlayerVO[i]); } } else { this.seatPlayerVO = null; }

			if (vo.joinPlayerVO) { this.joinPlayerVO = []; len = vo.joinPlayerVO.length; for (i = 0; i < len; i++) { this.joinPlayerVO[i] = new JoinPlayerVO(); this.joinPlayerVO[i].setData(vo.joinPlayerVO[i]); } } else { this.joinPlayerVO = null; }

			this.tableStatus = vo.tableStatus;

			this.maxPot = vo.maxPot;
            
			this.totalHand = vo.totalHand;
            this.pots = []; len = vo.pots.length; for (i = 0; i < len; i++) { this.pots[i] = vo.pots[i]; }
			
			this.preBet = vo.preBet;
			if (isNaN(vo.timeLast))
				this.nowTime = 0;
			else this.nowTime = vo.timeLast * 1000;
			this.roommode = vo.roommode;
			this.dealer = vo.dealer;
			this.dealerstate = vo.dealerstate;
			this.roomtype= vo.roomtype;// 房间类型 0 未知 1 金币 2 普通4W 3 40W 4 SNG MTT
			this.cardmode = vo.cardmode;// 0 正常 1 5-A
			this.whiteReporter = vo.whiteReporter;
			this.versionNum = vo.versionNum;
			vo = null;
		}
		getProtoVO(): any{
			var vo: any = AppGlobal.getMessageVO("TexasTableVO");
			 vo.gTableId = this.gTableId;

			vo.roleId = __SET_INT64(this.roleId);

			vo.tableSize = this.tableSize;

			vo.minJoinMoney = this.minJoinMoney;

            vo.maxMagnification = this.maxMagnification * this.minJoinMoney ;

			vo.gameEndTime = __SET_INT64( this.gameEndTime);
			
			vo.bbBet = this.bbBet;
	
			vo.whoplay = this.whoplay;

			vo.banker = this.banker;

			vo.gameStatus = this.gameStatus;
            if(this.timeCount!=null)
				vo.timeCount = this.timeCount;

			vo.totalBet = this.totalBet;

			vo.caishentime = this.caishentime;
			vo.caishenmoney = this.caishenmoney;
			vo.caishenround = this.caishenround;

			var i: number = 0; var len: number = 0;
			vo.globalCards = []; len = this.globalCards.length; for (i = 0; i < len; i++) { vo.globalCards[i] = this.globalCards[i]; }

			vo.seatPlayerVO = []; len = this.seatPlayerVO.length; for (i = 0; i < len; i++) { vo.seatPlayerVO[i] = this.seatPlayerVO[i].getProtoVO(); }; 

			// if (vo.joinPlayerVO) { this.joinPlayerVO = []; len = vo.joinPlayerVO.length; for (i = 0; i < len; i++) { this.joinPlayerVO[i] = new JoinPlayerVO(); this.joinPlayerVO[i].setData(vo.joinPlayerVO[i]); } } else { this.joinPlayerVO = null; }

			vo.tableStatus = this.tableStatus;
			if(this.maxPot!=null)
				vo.maxPot = this.maxPot;
			if(this.totalHand!=null)
				vo.totalHand = this.totalHand;
            vo.pots = []; len = this.pots.length; for (i = 0; i < len; i++) { vo.pots[i] = this.pots[i]; }			
			vo.preBet = this.preBet;			
			vo.timeLast = this.nowTime / 1000;
			if(this.roommode!=null)
				vo.roommode = this.roommode;
			if(this.dealer)
				vo.dealer = this.dealer;
			if (this.roomtype!=null)
				vo.roomtype = this.roomtype;
			if (this.cardmode != null)
				vo.cardmode = this.cardmode;
			if(this.whiteReporter!=null)
				vo.whiteReporter = this.whiteReporter;
			if(this.versionNum !=null)
				vo.versionNum = this.versionNum;
			return vo;
		}
		clone(): TexasTableVO{
			var vo = new TexasTableVO();
			vo.setData(this.getProtoVO());
			return vo;
		}
		toArrayBuffer():any{
			var vo: any = this.getProtoVO(); 
			return vo.toArrayBuffer();
		}
	}
}
