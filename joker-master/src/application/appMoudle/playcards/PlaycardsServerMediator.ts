module playcards {
	export class PlaycardsServerMediator extends puremvc.Mediator {
        public static NAME: string = "PlaycardsServerMediator";
		private tablevo: appvos.TexasTableVO;
        private nowTurnMaxBet: number;//当轮最大下注额
		private nowTurnMaxBetSeat: number;//当轮最大下注额座位号
		private nowMaxAddBet: number;//当轮最大下注筹码差值
		private myseat: number = 0;
		private isShowCard: boolean = false;
		private fristAfddcd: number = 2000;//第一个操作的人增加cd
		private allpots: PotVO[];//边池
		private autoAct: number[] = [ //机器人自动操作 次数代表概率
			1,//弃牌
			2, 2, 2, 2,//看牌
			3,//下注
			4, 4, 4,//跟注
			// 5,// ALLIN
			6,//加注
		];
		// private startTime: number;
		private totalbet: number;
        public constructor(viewComponent: Object = null) {
            super(PlaycardsServerMediator.NAME, viewComponent);
        }
        public get view(): PlayCardsUIMoudleComp {
            return this.viewComponent;
        }
		public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            return [
				consts.MATCH_START,//开始
				consts.MATCH_END,//结束
				netaction.MATCH_ACTION,//玩家指令
				netaction.MATCH_SEND_GIFT,//打赏
				netaction.MATCH_CHAT,//客户端聊天
				
			];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
			var proxy = getProxy();
            var act: string = notification.getName();
            switch (act) {
				case consts.MATCH_START:
					this.statrGame();
					break;
				case consts.MATCH_END:
					this.out();	
					break;
				case netaction.MATCH_ACTION://玩家指令
					var money: number = 0;
					if (body.data.intValues.length > 1)
						money = body.data.intValues[1];
					this.matchaction(body.data.intValues[0], money, this.myseat);
					break;
                case netaction.MATCH_SEND_GIFT://打赏
					this.sendNotification(netaction.MATCH_S_SEND_GIFT, body);
					break;
				case netaction.MATCH_CHAT://客户端聊天
					this.sendNotification(netaction.MATCH_S_CHAT, body);
					break;
				
				// case 	
			}
		}
		/**开始比赛 */
		private statrGame( tableSize:number = 5): void {
			var tablevo: appvos.TexasTableVO = this.tablevo = new appvos.TexasTableVO();
			tablevo.roleId = user.getProxy().svrRoleId;
			var name: string = "游客";
			if (tablevo.roleId == null) {//未登录
				tablevo.roleId = user.getProxy().svrRoleId = 101;
				user.getProxy().svrName = name;
			} else {
				name = user.getProxy().svrName;
			}
			this.totalbet = smallGame.getCoin();
            if (this.totalbet < 200) {
				smallGame.tipExit();
				return;
			}
			var sb: number =Math.max(Math.floor(this.totalbet / 2000),1);
			tablevo.gTableId = 100;
			tablevo.tableSize = tableSize;
			tablevo.minJoinMoney = 200 * sb;
			tablevo.maxMagnification = 10;
			tablevo.preBet = 0;
            tablevo.sbBet = sb;
			tablevo.bbBet = sb + sb;
			tablevo.whoplay = -1;
			tablevo.banker = -1;
			tablevo.timeCount = 10;
			tablevo.gameStatus = -1;
			tablevo.tableStatus = 0;
			tablevo.globalCards = [];
			tablevo.pots = [];
			tablevo.seatPlayerVO = [];
			// this.startTime = new Date().getTime();
			for (var i: number = 0; i < tableSize; i++) {
				var vo: appvos.SeatPlayerVO = new appvos.SeatPlayerVO();
				if (i == this.myseat) {
					vo.roleId = tablevo.roleId;
					vo.nameutf8 = vo.name = name;
					vo.totalBringBet = vo.nowBet = Math.min(this.totalbet,tablevo.minJoinMoney);
				} else {
					vo.roleId = 101 + i;
					vo.nameutf8 = vo.name = "锋玩" + i;
					vo.totalBringBet = vo.nowBet = tablevo.minJoinMoney;
				}
				vo.seatId = i;
				vo.reset();
				tablevo.seatPlayerVO.push(vo);
			}
			getProxy().tableVO = tablevo.clone();
			// this.view.refVO();
			gameabc.setTimeout(this.matchStart, this, 1000)
		}
		/**获取下一个位置 */
		private getNextSeat(seatId: number): number {
			return (seatId + 1) % this.tablevo.seatPlayerVO.length;
		}
		/**获取下一个在玩的位置 */
		private getNextPlaySeat(seatId: number): number {
			var index: number;
			for (var i: number = 1, len = this.tablevo.seatPlayerVO.length; i < len; i++) {
				index = (seatId + i) % len;
				var seatvo = this.tablevo.seatPlayerVO[index];
				if (!seatvo.isAllIn && !seatvo.isFold)
					return index;
			}
			return -1;
		}
		/***还能操作的数量 */
		private getPlayNum(): number {
			var num: number=0;
			for (var i: number = 0, len = this.tablevo.seatPlayerVO.length; i < len; i++) {
				var seatvo = this.tablevo.seatPlayerVO[i];
				if (!seatvo.isFold && !seatvo.isAllIn)
					num++;
			}
			return num;
		}
		/**获取下一个操作的位置 */
		private getNextActionSeat(): number {
			var seatId: number = this.tablevo.whoplay;
			var index: number;
			for (var i: number = 1, len = this.tablevo.seatPlayerVO.length; i < len; i++) {
				index = (seatId + i) % len;
				var seatvo = this.tablevo.seatPlayerVO[index];
				if (!seatvo.isAllIn && !seatvo.isFold) {
					if (this.nowTurnMaxBet == 0 || seatvo.turnBet < this.nowTurnMaxBet)
						return index;
				}
			}
			return -1;
		}
		/**牌局开始 */
		private matchStart(): void {
			var tableVO = this.tablevo;
			var len: number = this.tablevo.seatPlayerVO.length;
			tableVO.banker = this.getNextSeat(tableVO.banker);
			tableVO.tableStatus = 1;
			tableVO.gameStatus = -1;
			tableVO.totalBet = 0;
			this.allpots = [];
			tableVO.pots = [];
			this.isShowCard = false;
			var proxy = getProxy();
			var allcards = proxy.getRoamdCards(5 + len + len);
			tableVO.globalCards = [allcards[0], allcards[1], allcards[2], allcards[3], allcards[4]];
			var sbSeat: number = this.getNextSeat(tableVO.banker);
			var bbSeat: number = this.getNextSeat(sbSeat);
			tableVO.whoplay = this.getNextSeat(bbSeat);
			var min = tableVO.bbBet;
			var alldata: any[] = [];
			for (var i: number = 0; i < len; i++) {
				var seatvo: appvos.SeatPlayerVO = this.tablevo.seatPlayerVO[i];
				seatvo.reset();
				var infovo = new appvos.GameEndInfoVO();
				seatvo.myCard = [allcards[5 + i + i], allcards[5 + i + i + 1]];
				var rest = proxy.getCardResult(seatvo.myCard.concat(tableVO.globalCards));
				seatvo.cardPower = proxy.getcardsValue(rest.allvos, rest.type);
				var addBetNum: number = 0;
				if (seatvo.nowBet < min) { //没钱了自动带人
					addBetNum = tableVO.minJoinMoney - seatvo.nowBet;
					seatvo.nowBet = tableVO.minJoinMoney;					
				}
				if (seatvo.seatId == this.myseat) {					
					if (this.totalbet < seatvo.nowBet) {				 
						seatvo.nowBet = this.totalbet;
						if (addBetNum > 0)
							addBetNum = seatvo.nowBet - (tableVO.minJoinMoney - addBetNum);
					}
					this.totalbet -= seatvo.nowBet;
					if (seatvo.nowBet < min) {//彩豆不足

						return;
					}
					smallGame.setCoin(this.totalbet);
				}
				seatvo.totalBringBet = seatvo.nowBet
				if (seatvo.seatId == sbSeat) {
					seatvo.totalBet = seatvo.turnBet = tableVO.sbBet;
					seatvo.nowBet -= seatvo.totalBet;
				} else if (seatvo.seatId == bbSeat) {
					seatvo.totalBet = seatvo.turnBet = tableVO.bbBet;
					seatvo.nowBet -= seatvo.totalBet;
				} else {
					seatvo.totalBet = seatvo.turnBet = 0;
				}
				infovo.seatId = seatvo.seatId;
				infovo.betNum = seatvo.nowBet;
				infovo.addBetNum = addBetNum;
				tableVO.totalBet += seatvo.totalBet;
				alldata.push(infovo.toArrayBuffer());
			}
			// var startTime = Math.floor((new Date().getTime() -this.startTime)/1000);
			var pvo = __PVO().i(tableVO.banker, tableVO.whoplay, sbSeat, bbSeat);//.l(0,tableVO.bbBet,startTime);
			pvo.paramVO.data = alldata;			
			pvo.to(app.NetAction.MATCH_S_START);		
			__PVO().i(allcards[5], allcards[6]).to(app.NetAction.MATCH_S_GETCARD);
			this.setTimeout(this.matchnewstart, this, 10);
		}
		/***新一圈开始 */
		private matchnewstart(): void {
			var tableVO = this.tablevo;
			var proxy = getProxy();
			tableVO.gameStatus++;
			var addcards: number[];

			var longValues: number[];
			if (tableVO.gameStatus == proxy.GAME_STATUS_PERFLOP) {
				addcards = [];
				longValues = [];
				this.nowTurnMaxBet = tableVO.bbBet;
				this.nowMaxAddBet = tableVO.bbBet;
				this.fristAfddcd = 2000;
			} else {
				this.getPots();
				var len: number = tableVO.seatPlayerVO.length;
				for (var i: number = 0; i < len; i++) {
					var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
					seatvo.raiseTime = 0;
					seatvo.turnBet = 0;
				}
				if (tableVO.gameStatus == proxy.GAME_STATUS_FLOP) {
					addcards = [tableVO.globalCards[0], tableVO.globalCards[1], tableVO.globalCards[2]];
				} else if (tableVO.gameStatus == proxy.GAME_STATUS_TURN) {
					addcards = [tableVO.globalCards[3]]
				} else if (tableVO.gameStatus == proxy.GAME_STATUS_RIVER) {
					addcards = [tableVO.globalCards[4]]
				} else {
					this.matchover();
					return;
				}
				this.nowTurnMaxBet = 0;
				this.nowMaxAddBet = 0;
				tableVO.whoplay = this.getNextPlaySeat(tableVO.banker);
				var playernum: number = this.getPlayNum();
				if (playernum < 2)
					tableVO.whoplay = -1;
				if (tableVO.whoplay == -1 && !this.isShowCard) {
					tableVO.gameStatus--;
					this.isShowCard = true;
					this.allInShowCard();
					return;
				}
			}
			this.fristAfddcd = 1000;
			this.nowTurnMaxBetSeat = tableVO.whoplay;
			var pvo = __PVO().i(tableVO.gameStatus, tableVO.whoplay, 0);
			pvo.paramVO.intValues = pvo.paramVO.intValues.concat(addcards);
			pvo.paramVO.longValues = tableVO.pots;
			pvo.to(app.NetAction.MATCH_S_NEWSTART);	
			this.nextAction();
		}
		/**计算边池 */
		private getPots(): void {
			var tableVO = this.tablevo;
			var minturnBet: number;
			var len: number = this.allpots.length
			if (len > 0)
				var lastvo: PotVO = this.allpots[len - 1];
			var len = tableVO.seatPlayerVO.length;
			while (true) {
				minturnBet = 0;
				for (var i: number = 0; i < len; i++) {
					var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
					if (seatvo.turnBet > 0) {
						if (minturnBet == 0)
							minturnBet = seatvo.turnBet;
						else minturnBet = Math.min(seatvo.turnBet, minturnBet);
					}
				}
				if (minturnBet == 0) break;
				else {
					var potvo: PotVO = new PotVO();
					for (i = 0; i < len; i++) {
						var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
						if (seatvo.turnBet > 0 || !seatvo.isAllIn) {
							var add: number = Math.min(seatvo.turnBet, minturnBet);
							seatvo.turnBet -= add;
							potvo.allSeat.push(seatvo.seatId);
							potvo.totalBet += add;
						}
					}
					potvo.setKey();
                    if (lastvo != null && lastvo.allSeatKey == potvo.allSeatKey)
						lastvo.totalBet += potvo.totalBet;
					else {
						this.allpots.push(potvo);
						if (lastvo == null) lastvo = potvo;
					}						
				}
			}
			len = this.allpots.length;
			var all: number[] = [];
			for (i = 0; i < len; i++) {
				all.push(this.allpots[i].totalBet);
			}
			tableVO.pots = all;
		}
		/**下个玩家操作 */
		private nextAction(): void {
			var tableVO = this.tablevo;
			if (tableVO.whoplay == -1)
				this.setTimeout(this.matchnewstart, this, 1000)
			else if (tableVO.whoplay != this.myseat) {//系统
				this.setTimeout(this.autoAction, this, this.fristAfddcd + Math.random() * 2000, tableVO.whoplay);
				this.fristAfddcd = 500;
			}
		}
		/**机器人操作 TODO 机器人ai*/
		private autoAction(whoplay: number): void {
			var tableVO = this.tablevo;
			var seatvo = tableVO.seatPlayerVO[whoplay];
			var act: number = this.autoAct[Math.floor(Math.random() * this.autoAct.length)];//  1 + Math.floor(Math.random() * 6);
			var money: number = Math.floor(Math.random() * 20) * tableVO.bbBet;
			if (seatvo.turnBet == tableVO.sbBet)
				money += tableVO.sbBet;
			this.matchaction(act, money, whoplay);
		}
		/**收到玩家操作 */
		private matchaction(act: number, money: number, who: number): void {
			var proxy = getProxy();
			var tableVO = this.tablevo;
			var seatvo = tableVO.seatPlayerVO[who];
			var sendact: number;
			var maxMoney: number = this.nowTurnMaxBet;
			switch (act) {
				case proxy.ACT_FOLD:// 弃牌
					sendact = act;
					money = 0;
					break;
				case proxy.ACT_CALL:// 跟注
				case proxy.ACT_CHECK://看牌
					if (seatvo.turnBet < maxMoney) {
						var add = maxMoney - seatvo.turnBet;
						if (add >= seatvo.nowBet) {
							if (sendact == proxy.ACT_CHECK) {
								sendact = proxy.ACT_FOLD;
								money = 0;
							} else {
								sendact = proxy.ACT_ALLIN;
								money = seatvo.nowBet;
							}	
						} else {
							sendact = proxy.ACT_CALL;
							money = add;
						}
					} else {
						sendact = proxy.ACT_CHECK;
						money = 0;
					}
					break;
				case proxy.ACT_BET://下注
				case proxy.ACT_RAISE://加注
					var arr = this.addBet(money, seatvo)
					sendact = arr[0];
					money = arr[1];
					break;

				case proxy.ACT_ALLIN://ACT_ALLIN
					sendact = proxy.ACT_ALLIN;
					money = seatvo.nowBet;
					break;
			}
			var playernum: number = 10;
			if (sendact == proxy.ACT_ALLIN)
				seatvo.isAllIn = true;
			else if (sendact == proxy.ACT_FOLD) {
				seatvo.isFold = true;
				playernum = this.getPlayNum();
			}
			seatvo.nowBet -= money;
			seatvo.totalBet += money;
			seatvo.turnBet += money;
			tableVO.totalBet += money;
			if (seatvo.turnBet > this.nowTurnMaxBet) {
				this.nowTurnMaxBetSeat = seatvo.seatId;
				this.nowTurnMaxBet = seatvo.turnBet;
			}
			this.nowMaxAddBet = Math.max(money, this.nowMaxAddBet);
			var nextPlay: number = this.getNextActionSeat();
			var isNext: boolean;
			if (playernum < 2) {
				nextPlay = -1;
				this.setTimeout(this.matchover, this, 1000);
				isNext = false;
			} else if (nextPlay == this.nowTurnMaxBetSeat) {
				nextPlay = -1;
				this.setTimeout(this.matchnewstart, this, 1000);
				isNext = false;
			} else {
				// this.setTimeout(this.nextAction, this, 10);				
				isNext = true;
			}
			tableVO.whoplay = nextPlay;
			// __PVO().i(who, sendact, nextPlay, money).to(app.NetAction.MATCH_S_PLAYACT);
			this.sendAction(who, sendact, nextPlay, money);
			if (isNext) this.nextAction();
		}
		private sendAction(who, sendact, nextPlay, money): void{
			gameabc.setTimeout(function() {
				__PVO().i(who, sendact, nextPlay, money).to(app.NetAction.MATCH_S_PLAYACT);
			},null, 1);
		}
		public addBet(money: number, seatvo: appvos.SeatPlayerVO): number[] {
            var act: number;
            var min = this.addMinBet(seatvo);
			var proxy = getProxy();
            if (money < min)
                money = min;
            if (money >= seatvo.nowBet) {
                act = proxy.ACT_ALLIN;
                money = seatvo.nowBet;
            } else if (this.nowTurnMaxBet > 0)
                act = proxy.ACT_RAISE;
            else act = proxy.ACT_BET;
            seatvo.raiseTime++;
            return [act, money];
        }
		/**
         * 最小加注数量
         */
        public addMinBet(vo: appvos.SeatPlayerVO): number {
            var tablevo = this.tablevo;
            var min: number = this.nowMaxAddBet + this.nowTurnMaxBet - vo.turnBet
            return Math.min(vo.nowBet, min);
        }
		/**牌局结结束   */
		private matchover(): void {
            var tableVO = this.tablevo;
			var len: number = tableVO.seatPlayerVO.length;
			var alldata = [];
			var allInfoVO: Object = {};
			for (var i: number = 0; i < len; i++) {
				var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
				if (!seatvo.isFold) {
					var infovo = new appvos.GameEndInfoVO();
					infovo.card = seatvo.myCard;
					infovo.seatId = seatvo.seatId;
					infovo.winPool = [];
					infovo.canContinue = 0;
					allInfoVO[infovo.seatId + ""] = infovo;
				}
			}

			//边池计算
			for (var j: number = 0, jlen: number = this.allpots.length; j < jlen; j++) {
				var potvo: PotVO = this.allpots[j];
				var winseat: number[] = [];
				var maxpower: number = 0;
				for (var i: number = 0; i < len; i++) {
					var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
					if (!seatvo.isFold && potvo.allSeat.indexOf(seatvo.seatId) != -1) {
						if (seatvo.cardPower > maxpower) {
							winseat = [seatvo.seatId];
							maxpower = seatvo.cardPower;
						} else if (seatvo.cardPower == maxpower) {
							winseat.push(seatvo.seatId);
						}
					}
				}
				len = winseat.length;
				if (len > 0) {
					var winnum: number = potvo.totalBet / len;
					for (i = 0; i < len; i++) {
						var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[winseat[i]];
						seatvo.nowBet += winnum;
						infovo = allInfoVO[seatvo.seatId + ""];
						if (infovo) infovo.winPool.push(j );
					}
				}
			}

			len = tableVO.seatPlayerVO.length;
			for (var i: number = 0; i < len; i++) {
				var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
				if (!seatvo.isFold) {
					var infovo: appvos.GameEndInfoVO = allInfoVO[seatvo.seatId + ""];
					if (infovo) {
						// infovo.card = seatvo.myCard;
						// infovo.seatId = seatvo.seatId; 
						infovo.betNum = seatvo.nowBet;
						// if(winseat.indexOf(seatvo.seatId)!=-1)
						//    infovo.winPool = [1];
						if (seatvo.nowBet > seatvo.totalBringBet)
							infovo.gameResult = 1;
						else if (seatvo.nowBet == seatvo.totalBringBet)
							infovo.gameResult = 3;
						else infovo.gameResult = 2;
						// infovo.canContinue = 0;
						alldata.push(infovo.toArrayBuffer());
					}
				}
				if (seatvo.seatId == this.myseat) {				
					this.totalbet += seatvo.nowBet;
				}
			}
			var pvo = __PVO();
			pvo.paramVO.longValues = tableVO.pots;
			pvo.paramVO.data = alldata;
			pvo.to(app.NetAction.MATCH_S_OVER);
			tableVO.tableStatus = 0;
			smallGame.setCoin(this.totalbet);
			if(this.totalbet>tableVO.bbBet)
				this.setTimeout(this.matchStart, this, 5000);
			else { //余额不足
				smallGame.tipExit();
			}
		}
		/**退出 */
		public out(): void{
			gameabc.clearTimeout(this.timeid);
			if (this.tablevo != null&&this.tablevo.seatPlayerVO!=null) {
				var	len = this.tablevo.seatPlayerVO.length;
				for (var i: number = 0; i < len; i++) {
					var seatvo: appvos.SeatPlayerVO = this.tablevo.seatPlayerVO[i];			
					if (seatvo.seatId == this.myseat) {				
						this.totalbet += seatvo.nowBet;
						break;
					}
				}
				smallGame.setCoin(this.totalbet);
			}
		}
		/**都allin  结束亮牌 发玩家牌 */
		private allInShowCard(): void {
			var tableVO = this.tablevo;
			var len: number = tableVO.seatPlayerVO.length;
			var alldata = [];
			for (var i: number = 0; i < len; i++) {
				var seatvo: appvos.SeatPlayerVO = tableVO.seatPlayerVO[i];
				if (!seatvo.isFold) {
					var infovo = new appvos.GameEndInfoVO();
					infovo.card = seatvo.myCard;
					infovo.seatId = seatvo.seatId;
					alldata.push(infovo.toArrayBuffer());
				}
			}
			var pvo = __PVO();
			pvo.paramVO.data = alldata;
			pvo.to(app.NetAction.TEXAS_SHOW_CARD);
			this.setTimeout(this.matchnewstart, this, 2000);
		}
        private timeid: number;
		private setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]) {
			gameabc.clearTimeout(this.timeid);
			this.timeid = gameabc.setTimeout(listener,thisObject,delay,...args);
		}
	}
}