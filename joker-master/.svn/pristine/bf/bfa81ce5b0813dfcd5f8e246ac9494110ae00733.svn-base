module happy {
	export const enum OPEN_PARAM {
        NORMAL = 0,//普通打开
        CONNECT_GS //连接游戏服时执行的打开命令
    }
	export class HappyUIMoudleComp extends app.base.BaseSceneUIMoudleComponent {
		public tableGroup: eui.Group;
		public item1: HappyItemComp;
		public item2: HappyItemComp;
		public item3: HappyItemComp;
		public item4: HappyItemComp;
		public item5: HappyItemComp;
		public item6: HappyItemComp;
		public item7: HappyItemComp;
		public addbankbtn: eui.Group;
		public addbankimg: eui.Image;
		public betItem1: HappyBetItemComp;
		public betItem2: HappyBetItemComp;
		public betItem3: HappyBetItemComp;
		public betItem4: HappyBetItemComp;
		public bankcards: HappyAllCardsComp;//庄的牌
		public allcards1: happy.HappyAllCardsComp;
		public allcards2: happy.HappyAllCardsComp;
		public allcards3: happy.HappyAllCardsComp;
		public allcards4: happy.HappyAllCardsComp;
		public allcards: happy.HappyAllCardsComp[];
		public pet1: happy.HappyPercentComp;
		public pet2: happy.HappyPercentComp;
		public pet3: happy.HappyPercentComp;
		public pet4: happy.HappyPercentComp;
		public allpets: happy.HappyPercentComp[];
		public btnbak: eui.Image;
		public rightbtns: eui.Group;
		public taskbtn: eui.Image;
		public helpbtn: eui.Image;
		public bottombtns: eui.Group;
		// public middlebtns: eui.Group;
		public headIcon: main.HeadAvatarImage;
		public headMask: eui.Image;
		public namelab: eui.Label;
		public moneylab: eui.Label;
		public otherRolesBtn: eui.Image;//未入座玩家按钮
		public addbtn1: eui.Group;
		public addlab1: eui.BitmapLabel;
		public addbtn2: eui.Group;
		public addlab2: eui.BitmapLabel;
		public addbtn3: eui.Group;
		public addlab3: eui.BitmapLabel;
		public addbtn4: eui.Group;
		public rewardlab: eui.BitmapLabel;
		public rewardbtn: eui.Group;

		// public betSelectimg: eui.Image;//选择筹码
		public wait: happy.WaitComp;//等待
		public costmoney: eui.Label;//服务费
		public serviceTip: eui.Group;
		public otherRolelab: eui.Label;//其他玩家数量
		public allAddbtn: eui.Group[];//所有加注按钮
        public allItem: HappyItemComp[];//所有桌子上玩家
		public allbet: HappyBetItemComp[];//所有下注
		public messgrap: eui.Group;
		public messImg: eui.Image;//提示信息图片
		public messlab: eui.BitmapLabel;//提示信息文字
        public selectMoney: number = 0;//选中加注筹码
		public selectAddBtn: eui.Group;//选中加注筹码按钮
		public selectimg: eui.Image;//选中高亮图片
		public selectanimation: eui.Group;
		public counterAnimation: dragonBones.Armature;
		public stopbetAnimation: dragonBones.Armature;
        private timeid: number;//倒计时
		private heartTime: number;//心跳
		private hideTipTime: number;
		public resultComp: ResultComp;//结算
		private isplayEnd: boolean;//正播放结算
		// public bankgroup:eui.Group;
		public btnsView: eui.ViewStack;//按钮选项

		private bankwinNum: number;
		private winNum: number;
		private loseNum: number;
		public winbg: eui.Image;
		public losebg: eui.Image;
		public winlab: eui.Label;
		public loselab: eui.Label;
		public winselect: eui.ToggleSwitch;
		public loseselect: eui.ToggleSwitch;
		public bankwin: eui.Label;
		public linebtn: eui.Image;
		public btnHook: eui.Image;
		public showWinResule: boolean;//结算现在奖励
        private banktotalBets: number[];	//庄筹码记录
		private totalRank: number;			//牌局数
        private bankBeginBet: number;		//上庄时候的筹码
		private noaddNum: number;

		public totalCount: eui.Label;
		public betCount: eui.Label;
		public totalProfit: eui.Label;
		public btnHooking: eui.Image;
		private hookTime: number;//挂机;

		public luckgroup: eui.Group;
		public luckeylab: eui.Label;
		public luckycard: happy.LuckyCardItem;
		public luckychangebtn: eui.Image;

		public animationgroup: eui.Group;

		public constructor() {
			super();
            this.skinName = "HappyUIMoudleCompSkin";
		}
		public createComplete(event: egret.Event): void {
			super.createComplete(event);
			__CLOSE_MOUDLE(AppReg.LOGIN);
			this.bindButton(this.addbankbtn);
			this.bindButton(this.taskbtn);
			this.bindButton(this.helpbtn);
			this.bindButton(this.otherRolesBtn);
			this.bindButton(this.rewardbtn, false);
			this.bindButton(this.addbtn1);
			this.bindButton(this.addbtn2);
			this.bindButton(this.addbtn3);
			this.bindButton(this.addbtn4);
			this.bindButton(this.btnbak);
			this.bindButton(this.item1);
			this.bindButton(this.item2);
			this.bindButton(this.item3);
			this.bindButton(this.item4);
			this.bindButton(this.item5);
			this.bindButton(this.item6);
			this.bindButton(this.item7);
			this.bindButton(this.linebtn);
			this.bindButton(this.betItem1, false);
			this.bindButton(this.betItem2, false);
			this.bindButton(this.betItem3, false);
			this.bindButton(this.betItem4, false);
			this.bindButton(this.winbg, false);
			this.bindButton(this.losebg, false);
			this.bindButton(this.btnHooking)
			this.bindButton(this.btnHook);
			this.bindButton(this.luckychangebtn, false);
            this.item1.setisBank();
			this.headIcon.mask = this.headMask;
			this.allAddbtn = [this.addbtn1, this.addbtn2, this.addbtn3, this.addbtn4];
			this.allItem = [null, this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7];
			this.allbet = [this.betItem1, this.betItem2, this.betItem3, this.betItem4];
			this.allpets = [this.pet1, this.pet2, this.pet3, this.pet4];
			this.allcards = [this.bankcards, this.allcards1, this.allcards2, this.allcards3, this.allcards4];
			this.allcards1.target = this.betItem1;
			this.allcards2.target = this.betItem2;
			this.allcards3.target = this.betItem3;
			this.allcards4.target = this.betItem4;
			getProxy().bankCards = this.bankcards;
			this.resultComp.removeFromParent();
			this.winselect.addEventListener(egret.Event.CHANGE, this.changeSelect, this);
			this.loseselect.addEventListener(egret.Event.CHANGE, this.changeSelect, this);
			this.addDragonBones();

		}
		public addParent(): void {
			super.addParent();
			if (this.initialized) {
				if (this.uiOpenData == OPEN_PARAM.CONNECT_GS) {
					getProxy().tableVO = null;
					getProxy().mySeatvo = null;
				}
				getProxy().isPlay = true;
				this.registerMediator(HappyUIMediator);
				this.namelab.text = user.getProxy().svrName;
				this.headIcon.source = user.getProxy().getHeadStr(user.getProxy().svrHeadId);
				if (this.uiOpenData == OPEN_PARAM.CONNECT_GS) {
                    this.uiOpenData = null;
					__SEND_NOTIFICATION(app.NetAction.CONNECT_GS);
				}
				this.refVO();
				utils.SoundUtils.setPlayBgSoundvolume(0);
				this.tweenShow();
			}
		}
		private tweenShow(): void {
			egret.Tween.removeTweens(this.bottombtns);
			this.bottombtns.bottom = -100;
			egret.Tween.get(this.bottombtns).to({ bottom: 0 }, 300);
			egret.Tween.removeTweens(this.tableGroup);
			this.tableGroup.alpha = 0.1;
			egret.Tween.get(this.tableGroup).to({ alpha: 1 }, 300);
		}
		public removeParent(): void {
            super.removeParent();
			utils.SoundUtils.setPlayBgSoundvolume(1);
            this.unregisterMediator();
			this.wait.hide();
			this.resultComp.hide();
			getProxy().bankWaiter = [];
			getProxy().isPlay = false;
			getProxy().nowLuckyCard = getProxy().nextLuckyCard = null;
			this.clearAll();
			egret.clearTimeout(this.hookTime);
			egret.clearInterval(this.heartTime);
			egret.clearTimeout(this.timeid);
			egret.clearTimeout(this.hideTipTime);
			egret.Tween.removeTweens(this.serviceTip);
		}
		public refVO(): void {
			var tablevo: appvos.HLCTableVO = getTableVO();
			getProxy().mySeatvo = null;
			this.luckgroup.visible = false;
			if (tablevo == null) {
				this.messgrap.visible = false;
				// this.messImg.source = "";
				// this.messlab.text = "";
				this.clearPLayer(false);
			} else {
				var addTimes: number;
				if (tablevo.anteDouble)
					addTimes = 2;
				else
					addTimes = 1;
				getProxy().addTimes = addTimes;
				__PVO().to(app.NetAction.GLXY_REQ_WIN_HISTORY);
				getProxy().defaultHook();
				this.clearPLayer(true);
				var player: appvos.HLCPlayerVO;
				for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len; i++) {
					player = tablevo.seatPlayerVO[i];
					this.allItem[player.showPos].setVO(player);
				}
				var myid: number = user.getProxy().svrRoleId;
				var idArr: number[] = [];
				for (i = 0, len = tablevo.playerVO.length; i < len; i++) {
					player = tablevo.playerVO[i];
					if (player.roleId == myid) {
						getProxy().mySeatvo = player;
					}
					idArr.push(player.roleId);
				}
				if (idArr.length > 0) {
					__SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST, idArr);
				}

				if (tablevo.timeLast > 0) {
					egret.clearTimeout(this.timeid);
					this.setTime();
				} else this.setMessImage();
				var add = room.getProxy().current.addBlinds;
				this.addlab1.text = FormatUtils.wan(add[0] * addTimes);
				this.addbtn1.name = (add[0] * addTimes) + "";
				this.addlab2.text = FormatUtils.wan(add[1] * addTimes);
				this.addbtn2.name = (add[1] * addTimes) + "";
				this.addlab3.text = FormatUtils.wan(add[2] * addTimes);
				this.addbtn3.name = (add[2] * addTimes) + "";
				this.checkCanAdd();
				this.checkCan();
				this.refCostMoney();
				this.checkBank();
				if (tablevo.gameStatus == 1) {
					for (var i = 0; i < 5; i++) {
						this.allcards[i].showCardBack();
					}
				}
			}
			// this.betSelectimg.visible = false;
			this.setMyMoney(true);
			this.selectBtn(this.addbtn1);
			if (this.heartTime == null)
				this.heartTime = egret.setInterval(this.sendHerat, this, 10000);

		}
		/**获取奖池 */
		private getWinPool(): void {
			if (room.getProxy().current)
				this.sendNotification(app.NetAction.REQ_DI_BAO, [10000 + room.getProxy().current.svrRoomId, AppConst.GAME_ID_99]);
		}
		/**检测人数是否够 */
		private checkCan(): void {
			if (this.isplayEnd) return;
			var tablevo: appvos.HLCTableVO = getTableVO();
			var show: boolean = true;
			if (tablevo != null && tablevo.gameStatus == 0) {
				if (this.item1.playvo == null || tablevo.playerVO.length <= 1) {
					this.wait.showBank(this.item1.playvo == null);
					this.clearAll();
					show = false;
				} else {
					this.wait.hide();
				}
			}
			for (var i: number = 0; i < 4; i++) {
				this.allbet[i].visible = show;
				if (!show) this.allpets[i].visible = false;
			}
			this.refView();
			this.otherRolelab.text = tablevo.noSeatPlayerVO.length + "人";
		}
		public refView(): void {
			var showPos = getProxy().mySeatvo.showPos;
			// this.middlebtns.visible = showPos != 1;
			// this.bankgroup.visible = !this.middlebtns.visible;
			if (showPos == 1) {//庄
				this.btnsView.selectedIndex = 1;
			} else if (getProxy().hookingFlag) {
				this.btnsView.selectedIndex = 2;
				this.refHook();
			} else this.btnsView.selectedIndex = 0;
		}
		/**刷新挂机显示 */
		private refHook(): void {
			var hockvo = getProxy().hookInfo;
			if (hockvo) {
				this.totalCount.text = hockvo.gameCount + "局";
				this.betCount.text = hockvo.betCount + "局";
				this.totalProfit.text = FormatUtils.wan(hockvo.totalProfit);
			}
		}
		private checkBank(): void {
			// var isbank: boolean;
			if (getProxy().mySeatvo != null && getProxy().mySeatvo.showPos == 1) {
				this.addbankimg.source = "img_word_happy_xz1_png";
				this.luckychangebtn.visible = true;
			} else {
				this.luckychangebtn.visible = false;
				this.addbankimg.source = "img_word_happy_sz_png";
			}
			var isin: boolean = getProxy().mySeatvo != null && getProxy().mySeatvo.showPos > 0
			for (var i: number = 1; i < 8; i++) {
				this.allItem[i].sitlabvisable(!isin);
			}
			if (isin) {
				for (var i: number = 0; i < 4; i++) {
					this.allbet[i].resetSelect();
				}
			}
		}
		/**显示幸运牌 */
		public showLucyCard(turncard: boolean = true): void {
			this.luckgroup.visible = true;
			if (getProxy().nextLuckyCard) {
				if (turncard) {
					if (getProxy().nextLuckyCard != getProxy().nowLuckyCard) {
						this.luckycard.turnCard(getProxy().nextLuckyCard);
					}
				} else {
					this.luckycard.setCardId(getProxy().nextLuckyCard);
					this.luckycard.showLight();
				}
				getProxy().nowLuckyCard = getProxy().nextLuckyCard;
			}
		}

		/**显示奖池 */
		public refWinBets(): void {
			var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
			if (bets) {
				this.rewardlab.text = FormatUtils.wan(Number(bets[2])) + "    ";
			}
		}
		/***显示服务费 */
		private refCostMoney(): void {
			var tablevo: appvos.HLCTableVO = getTableVO();
			if (tablevo != null) {

				// if (getProxy().mySeatvo.showPos == 1) {//我是庄
				// 	this.costmoney.text = "服务费:" + FormatUtils.wan(tablevo.bankServicePay * getProxy().getAddNum());
				// } else
                this.costmoney.text = "每个押注位收费" + FormatUtils.wan(tablevo.servicePay * getProxy().addTimes);
				this.serviceTip.visible = true;
				this.serviceTip.alpha = 1;
				this.hideTipTime = egret.setTimeout(this.timeHideServiceTip, this, 2000);
			}
		}
		private timeHideServiceTip(): void {
			egret.Tween.get(this.serviceTip).to({ alpha: 0 }, 500).call(this.hideServiceTip, this)
		}
		private hideServiceTip(): void {
			this.serviceTip.visible = false;
		}
		public refAvatar(): void {
			for (var i: number = 1; i < 8; i++) {
				this.allItem[i].refAvatar();
			}
		}
		/**发送心跳*/
		private sendHerat(): void {
			__PVO().to(app.NetAction.GLXY_REQ_HEART_BEAT);
			// this.heartTime = egret.setTimeout(this.sendHerat, this, 60000);
		}
        public start(): void {
			this.clearAll();
			var tablevo: appvos.HLCTableVO = getTableVO();
			if (tablevo.timeLast > 0) {
				egret.clearTimeout(this.timeid);
				this.setTime();
			} else this.setMessImage();
			this.setMyMoney();
			// this.refCostMoney();		
			for (var i = 0; i < 5; i++) {
				this.allcards[i].hide();
				this.allcards[i].fapai(i * 150);
			}
			this.showPet();
			this.checkCanAdd();
			this.showLucyCard();
			this.luckychangebtn.alpha = 1;
			egret.setTimeout(this.startmv, this, 1000);
		}
		private startmv(): void {
			this.showMV("start", (this.width - 1366) * 0.5, (this.height - 764) * 0.5);
			utils.SoundUtils.playEffectSound(utils.SoundUtils.start);
			if (getProxy().hookingFlag) {
				egret.clearTimeout(this.hookTime);
				this.hookTime = egret.setTimeout(this.startHook, this, 1000 + Math.random() * 1500);
			}

		}
		/** 挂机自动下注*/
		public startHook(): void {
			var tablevo: appvos.HLCTableVO = getTableVO();
			if (getProxy().hookingFlag && this.parent && tablevo && tablevo.gameStatus > 0 && getProxy().mySeatvo.showPos != 1) {
				var info = getProxy().hookInfo;
				if (info) {
					if (info.stopProfit) {
						if (info.totalProfit >= info.profitValue) {
							getProxy().hookingFlag = false;
							__SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
							return;
						}
					}

					if (info.stopLoose) {
						if (-info.loosValue >= info.totalProfit) {
							getProxy().hookingFlag = false;
							__SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
							return;
						}
					}

					if (info.stopCount) {
						if (info.gameCount >= info.over_count) {
							getProxy().hookingFlag = false;
							__SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
							return;
						}
					}

					//TODO 能否挂机判断
					var pets = getProxy().getProcessingData();
					var totaldec: number = 0;
					var totaladd: number = 0;
					var add: number;
					var servicePay = tablevo.servicePay * getProxy().addTimes;
					if (getProxy().mySeatvo.showPos > 0) {
						servicePay = servicePay + servicePay;
					}
					for (var i: number = 0; i < 4; i++) {
						if (pets[i] <= info.winRatio) {
							var canadd = getProxy().canAddbet(i, totaldec, totaladd);
							if (canadd > 0) {
								add = Math.min(canadd, info.betValue);
								totaladd = totaladd + add;
								totaldec = totaldec + add + servicePay;
								__PVO().i(i).l(add).to(app.NetAction.GLXY_REQ_ANTE);
								// if (canadd < info.betValue) __PVO().i(i).l(canadd).to(app.NetAction.GLXY_REQ_ANTE);
								// else __PVO().i(i).l(info.betValue).to(app.NetAction.GLXY_REQ_ANTE);
							} else this.allbet[i].resetSelect();
						}
					}
				}
			}

		}
		private clearAll(): void {
			// var tablevo: appvos.HLCTableVO = getTableVO();
			var player: appvos.HLCPlayerVO;
			for (var i: number = 0; i < 5; i++) {
				this.allcards[i].hide();
			}
			for (var i: number = 0; i < 4; i++) {
				this.allbet[i].clear();
				// this.allbet[i].setBet(tablevo.allbets[i]);
			}
			// this.betSelectimg.visible = false;
		}
		private totalBet: number = 0
		public playEnd(endvo: appvos.HLCGameEndVO): void {
			this.isplayEnd = true;
			var myseatid: number = getProxy().mySeatvo.seatId;
			var tablevo: appvos.HLCTableVO = getTableVO();
			getProxy().myEndInfo = null;
			this.totalBet = 0;
			var seatvo = getProxy().mySeatvo;
			var big: number = room.getProxy().current.bigBlinds * getProxy().addTimes;
			if (seatvo.showPos > 0)
				big = big + big;
			var addNum: number = 0;
			var addbigNum: number = 0;
			if (seatvo.posBet1 > 0) {
				addNum++;
				if (seatvo.posBet1 >= big) addbigNum++;
			}
			if (seatvo.posBet2 > 0) {
				addNum++;
				if (seatvo.posBet2 >= big) addbigNum++;
			}
			if (seatvo.posBet3 > 0) {

				addNum++;
				if (seatvo.posBet3 >= big) addbigNum++;
			}
			if (seatvo.posBet4 > 0) {
				addNum++;
				if (seatvo.posBet4 >= big) addbigNum++;
			}
            if (addNum > 0) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BIN1 + addNum - 1);
				this.noaddNum = 0;
			} else {
				if (seatvo.showPos > 1) {
					this.noaddNum++;
					if (this.noaddNum > 5) __PVO().to(app.NetAction.GLXY_REQ_SUB_SHOW_POS);
				}
			}
			if (getProxy().hookingFlag) {
				var hookinfo = getProxy().hookInfo;
				if (hookinfo) {
					if (addNum > 0)
						hookinfo.betCount++;
					hookinfo.gameCount++;
				}
			}
			if (addbigNum > 0) mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BIN1_ALL + addbigNum - 1);
            var bet1: EndShowBetVO = new EndShowBetVO();
			var bet2: EndShowBetVO = new EndShowBetVO();
			var bet3: EndShowBetVO = new EndShowBetVO();
			var bet4: EndShowBetVO = new EndShowBetVO();
			var myIsbank = seatvo.showPos == 1;
			for (var i: number = 0, len: number = endvo.infoVO.length; i < len; i++) {
				var info: appvos.HLCInfoVO = endvo.infoVO[i];
				if (info.seatId == myseatid) {
					getProxy().myEndInfo = info;
					if (info.realWin != null) {//服务端有传值
						this.totalBet = info.realWin;
					} else this.totalBet = info.totalWin;
					// if (myIsbank) {//庄的输赢判断
					// 	this.totalBet = info.totalWin;
					// 	if (this.totalBet < 0 && -this.totalBet > seatvo.totalBet) {
					// 		this.totalBet = -seatvo.totalBet;
					// 	}
					// } else this.totalBet = info.betNum - seatvo.totalBet - seatvo.totalAdd();//+seatvo.totalFace;	//普通玩家输赢判断			
					if (hookinfo) {
						hookinfo.totalProfit += this.totalBet;
					}
					if (myIsbank) {
						this.bankwinNum += this.totalBet;
						this.banktotalBets.push(info.betNum);
						if (this.banktotalBets.length > 1000)
							this.banktotalBets.shift();
						this.totalRank++;
						var HappyBankLineUIMoudleComp: HappyBankLineUIMoudleComp = <HappyBankLineUIMoudleComp>__GET_MOUDLE_COMP(AppReg.APP_BANK_LINE);
						if (HappyBankLineUIMoudleComp) HappyBankLineUIMoudleComp.changeType();
						//下庄
						if ((this.winselect.selected && this.bankwinNum >= this.winNum) || (this.loseselect.selected && this.bankwinNum <= this.loseNum))
							__PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);
					}
				}
				var player: appvos.HLCPlayerVO = tablevo.allPlayerVO[info.seatId];
				if (player) {
					player.totalBet = info.betNum;
					player.clear();
				}
				var xy = this.getXY(player);
				var index = xy[2];
				if (info.posWin1 > 0) {
					if (!bet1.hasPos(index)) {
						bet1.allShowPos.push(index);
						bet1.allShowXY.push(xy);
					}
					if (myIsbank) addNum++;
				}
				if (info.posWin2 > 0) {
					if (!bet2.hasPos(index)) {
						bet2.allShowPos.push(index);
						bet2.allShowXY.push(xy);
					}
					if (myIsbank) addNum++;
				}
				if (info.posWin3 > 0) {
					if (!bet3.hasPos(index)) {
						bet3.allShowPos.push(index);
						bet3.allShowXY.push(xy);
					}
					if (myIsbank) addNum++;
				}
				if (info.posWin4 > 0) {
					if (!bet4.hasPos(index)) {
						bet4.allShowPos.push(index);
						bet4.allShowXY.push(xy);
					}
					if (myIsbank) addNum++;
				}
			}
			if (hookinfo) {
				this.refHook();
			}
			if (this.totalBet == 0 && addNum == 0) {//没有下注
				this.totalBet = null;
				this.getWinPool();
			}

			for (i = 0, len = endvo.cardVO.length; i < len; i++) {
				var cardvo = endvo.cardVO[i];
				this.allcards[cardvo.posId].show(cardvo.card, i * 500);
			}
			for (var i: number = 0; i < 4; i++) {
				this.allpets[i].visible = false;
			}
			egret.setTimeout(this.showBankBet, this, 3000, [bet1, bet2, bet3, bet4]);
			// egret.setTimeout(this.showWin, this, 1900,totalBet);

		}
		/***庄赢得筹码 */
		private showBankBet(endVO: EndShowBetVO[]): void {
			var hasbankwin: boolean = false;
			var wins: number = 0;
			var playsound: boolean = false;
			for (var i: number = 0; i < 4; i++) {
				if (!this.allcards[i + 1].winBank) {
					hasbankwin = true;
					if(this.allbet[i].allMoney.length>0)playsound = true
					this.allbet[i].showBet(endVO[i], false);
					
				} else {
					wins += Math.pow(2, i);
				}
			}
			if(playsound)
				utils.SoundUtils.playEffectSound(utils.SoundUtils.coin_fly);
			getProxy().processingData(wins);
			if (hasbankwin) egret.setTimeout(this.showBankToWin, this, 500, endVO);
			else this.showBankToWin(endVO);
		}
		/**庄家输给玩家 */
        private showBankToWin(endVO: EndShowBetVO[]): void {
			var haswin: boolean = false;
			var playsound: boolean = false;
			for (var i: number = 0; i < 4; i++) {
				if (this.allcards[i + 1].winBank) {
					haswin = true;
					var bets = this.allbet[i];
					var item = this.allItem[1]
					var x = item.x + item.width * 0.5 - 40;
					var y = item.y + item.height * 0.5 - 20;
					var len: number = bets.allMoney.length;
					for (var j: number = 0; j < len; j++) {
						bets.showAddBet(x + Math.random() * 80, y + Math.random() * 40, "icon_happy_chouma_type_1_png", null);
					}
					if (len > 0)
						playsound = true;
						
				} else {
					this.allbet[i].removeAllMoney();
				}
			}
			if(playsound)
				utils.SoundUtils.playEffectSound(utils.SoundUtils.coin_fly);
			if (haswin) egret.setTimeout(this.showWinBet, this, 500, endVO);
			else this.showWinBet(endVO);
		}
		/**玩家赢的 */
		private showWinBet(endVO: EndShowBetVO[]): void {
			var haswin: boolean = false;
			for (var i: number = 0; i < 4; i++) {
				if (this.allcards[i + 1].winBank) {
					haswin = true;
					this.allbet[i].showBet(endVO[i], true);
				}
			}	
			if (haswin) {
				// utils.SoundUtils.playEffectSound(utils.SoundUtils.coin_fly);
				 egret.setTimeout(this.showWin, this, 500, this.totalBet);
			}
			else this.showWin(this.totalBet);
		}
		private showWin(totalBet: number): void {
			this.isplayEnd = false;
			// if (totalBet > 0) {
			// __SEND_NOTIFICATION(award.AwardMediator.OPEN_VICOTRY, { icon: null, silver: totalBet });//tip.popSysCenterTip("恭喜你赢了" + totalBet + "筹码", tip.TIPS_TYPE.TIPS_CORRECT);
			// utils.SoundUtils.playEffectSound(utils.SoundUtils.win);

			// } else if (totalBet < 0) tip.popSysCenterTip("很遗憾您输了" + totalBet + "筹码");
            if (totalBet != null)
				this.resultComp.showType(totalBet >= 0, totalBet, this.tableGroup, this.showWinResule);
			this.showWinResule = false;
			this.setWinNum();
			for (var i: number = 1; i < 8; i++) {
				this.allItem[i].setBet();
			}
			this.setMyMoney();
			if (user.getProxy().svrGameData) user.getProxy().svrGameData.silver = getProxy().mySeatvo.totalBet;
			this.checkCan();
			var tablevo = getTableVO();
			var outstate = getProxy().outState;
			if (outstate > 0 && tablevo != null && tablevo.gameStatus == 0) {
				getProxy().outState = 0;
				if (outstate == 1) getProxy().leaveRoom();//退出房间
				else __PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);//下庄
			}
		}
		private setWinNum(): void {
			this.bankwin.text = "上庄盈亏:";
			if (this.bankwinNum > 0) {
				this.bankwin.textColor = 0xff0000;
				this.bankwin.text += "+" + FormatUtils.wan(this.bankwinNum);
			}
			else if (this.bankwinNum < 0) {
				this.bankwin.text += FormatUtils.wan(this.bankwinNum);
				this.bankwin.textColor = 0x00ff00;
			} else {
				this.bankwin.text += "0";
				this.bankwin.textColor = 0xffffff;
			}
		}
		/**显示我的筹码 */
        private setMyMoney(refSelect: boolean = false): void {
			var money: number = getProxy().getMoney();
			this.moneylab.text = FormatUtils.wan(money) + "";
			// var canmoney: number = this.canAddbet();
			// var minmoney: number;
			// for (var i: number = 3; i > -1; i--) {
			// 	var addbtn = this.allAddbtn[i];
			// 	if (addbtn.name) {
			// 		minmoney = Number(addbtn.name) * room.getProxy().current.smallBlinds;
			// 	} else minmoney = canmoney;
			// 	addbtn.touchEnabled = canmoney > 0 && canmoney >= minmoney;
			// 	addbtn.alpha = addbtn.touchEnabled ? 1 : 0.5;
			// }
			// if (refSelect || this.selectAddBtn == null || !this.selectAddBtn.touchEnabled) {
			// 	this.selectBtn(this.addbtn1);
			// }
		}

		private setTime() {
			var tablevo: appvos.HLCTableVO = getTableVO();
			this.messlab.text = tablevo.timeLast + "";
			if (tablevo.timeLast > 0) {
				this.setMessImage();
				if (tablevo.timeLast == 3 || tablevo.timeLast == 2) utils.SoundUtils.playEffectSound(utils.SoundUtils.time_out2);
				else if (tablevo.timeLast == 1) utils.SoundUtils.playEffectSound(utils.SoundUtils.time_out1);
				tablevo.timeLast--;
				this.timeid = egret.setTimeout(this.setTime, this, 1000);
			} else {
				tablevo.gameStatus = 0;
				this.setMessImage();
				utils.SoundUtils.playEffectSound(utils.SoundUtils.stop);
				// this.showMV("end",(this.width-410)*0.5,(this.height - 100) * 0.5);
				this.showStopbetMV();
                this.checkCanAdd();
				// this.betSelectimg.visible = false;
			}
		}
		private checkCanAdd(): void {
			for (var i: number = 0; i < 4; i++) {
				this.allbet[i].resetSelect();
			}
		}
		private setMessImage(): void {
			var tablevo: appvos.HLCTableVO = getTableVO();
			if (tablevo.gameStatus > 0) {
				this.messgrap.visible = true;
				if (getProxy().mySeatvo.showPos == 1) this.messImg.source = "img_word_happy_qddwjxz_png";
				else this.messImg.source = "img_word_happy_qxz_png";
			} else {
				this.messgrap.visible = false;
				// this.messlab.text = "";
				// this.messImg.source = "";
			}
		}
		/***显示胜率 */
		public showPet(): void {
			var myIsbank = getProxy().mySeatvo != null && getProxy().mySeatvo.showPos == 1;
			var pets = getProxy().getProcessingData();
			for (var i: number = 0; i < 4; i++) {
				this.allpets[i].visible = true;
				if (myIsbank) this.allpets[i].prelab.text = (100 - pets[i]) + "%";
				else this.allpets[i].prelab.text = pets[i] + "%";
			}
		}
		public clearPLayer(hastable: boolean): void {
			for (var i: number = 1; i < 8; i++) {
				this.allItem[i].setVO(null);
				this.allItem[i].visible = hastable;
			}
			for (var i: number = 0; i < 4; i++) {
				this.allbet[i].clear();
				this.allbet[i].visible = hastable;
				this.allpets[i].visible = false;
			}
			for (var i: number = 0; i < 5; i++) {
				this.allcards[i].hide();
			}
			// this.middlebtns.visible = hastable;
			// this.bankgroup.visible = hastable;
			this.btnsView.visible = hastable;
		}

		/**座位上移除 */
		public removeSeat(showPos: number): void {
			if (showPos > 0) {
				var player: appvos.HLCPlayerVO = this.allItem[showPos].playvo;
				if (player != null) {
					this.allItem[showPos].setVO(null);
					var tablevo: appvos.HLCTableVO = getTableVO();
					if (player.showPos == 1 && tablevo.gameStatus == 1) {//庄在比赛中离开
						egret.clearTimeout(this.timeid);
						tablevo.gameStatus = 0;
						tablevo.timeLast = 0;
					}
					player.showPos = 0;
					var index: number = tablevo.seatPlayerVO.indexOf(player);
					if (index > -1) {
						tablevo.seatPlayerVO.splice(index, 1);
						tablevo.noSeatPlayerVO.push(player);
					}
					this.setMessImage();
					this.checkBank();
				}
			}
			this.checkCan();
		}
		/**坐到座位上 */
		public addSeat(player: appvos.HLCPlayerVO): void {
			if (player != null && player.showPos > 0) {
				this.allItem[player.showPos].setVO(player);
				var tablevo: appvos.HLCTableVO = getTableVO();
				var index: number = tablevo.noSeatPlayerVO.indexOf(player);
				if (index > -1) {
					tablevo.noSeatPlayerVO.splice(index, 1);
					tablevo.seatPlayerVO.push(player);
				}
				if (player == getProxy().mySeatvo) {
					if (player.showPos == 1) {//上庄
						this.bankwinNum = 0;
						this.winNum = 0;
						this.winlab.text = "";
						this.winselect.selected = false;
						this.loselab.text = "";
						this.loseNum = 0;
						this.loseselect.selected = false;
						this.banktotalBets = [];
						this.bankBeginBet = getProxy().getMoney();
						this.totalRank = 0;
						this.setWinNum();
						mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BANK_NUM);
					}
					this.noaddNum = 0;
				}

				this.setMessImage();
				this.checkBank();
			}
			this.checkCan();
		}
		/**播放下注 */
		public showAddBet(play: appvos.HLCPlayerVO, pos: number, addBet: number): void {
			var moneytype: string;
			// var sb: number = room.getProxy().current.smallBlinds;
			if (addBet >= Number(this.addbtn3.name)) moneytype = "icon_happy_chouma_type_2_png";
			else if (addBet >= Number(this.addbtn2.name)) moneytype = "icon_happy_chouma_type_0_png";
			else moneytype = "icon_happy_chouma_type_3_png";
            var bets = this.allbet[pos];
			var xy = this.getXY(play);
			bets.showAddBet(xy[0], xy[1], moneytype);
			if (play.showPos > 0) {
				this.allItem[play.showPos].setBet();
			}
			if (play.seatId == getProxy().mySeatvo.seatId) {
				this.setMyMoney();
				this.checkCanAdd();
			}
			// this.refCostMoney();
		}
		private getXY(play: appvos.HLCPlayerVO): number[] {
			var fromx: number;
			var fromy: number;
			var index: number;
			if (play.showPos > 0) {
				var item = this.allItem[play.showPos]
				fromx = item.x + item.width * 0.5;
				fromy = item.y + item.height * 0.5;
				index = play.showPos;
			} else if (play.seatId == getProxy().mySeatvo.seatId) {
				fromx = (1136 - this.stage.stageWidth) * 0.5 + 140;
				fromy = (768 - this.stage.stageHeight) * 0.5 + this.stage.stageHeight - 50;
				index = -1;
			} else {
				fromx = (1136 - this.stage.stageWidth) * 0.5 + this.stage.stageWidth - 40;
				fromy = (768 - this.stage.stageHeight) * 0.5 + this.stage.stageHeight - 50;
				index = 0;
			}
			return [fromx, fromy, index];
		}
		/**点击选中按钮 */
		private selectBtn(btn: egret.DisplayObject): void {
			// if (btn == null || !btn.touchEnabled) {
			// 	this.selectAddBtn = null
			// 	this.selectimg.visible = false;
			// 	this.selectMoney = 0;
			// } else {
			// 	this.selectAddBtn = btn as eui.Group;
			// 	if (btn.name) {
			// 		this.selectMoney = Number(btn.name) * room.getProxy().current.smallBlinds;
			// 	} else this.selectMoney = this.canAddbet();
			// 	this.selectimg.x = btn.x;
			// 	this.selectimg.visible = true;
			// }
            this.selectAddBtn = btn as eui.Group;
			if (btn.name) {
				this.selectMoney = Number(btn.name);
			} else this.selectMoney = (room.getProxy().current.bigBlinds + room.getProxy().current.bigBlinds) * getProxy().addTimes;
			this.selectimg.x = btn.x;
			this.selectimg.visible = true;
			this.selectanimation.x = btn.x;
		}


		private showMV(str: string, x: number, y: number): void {
			if (this.parent == null) return;
			var mv = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("happy"));
			mv.x = x;//(this.width-410)*0.5;
			mv.y = y;//(this.height - 100) * 0.5;
			mv.touchEnabled = false;
			this.addChild(mv);
			mv.addEventListener(egret.Event.COMPLETE, this.hideMV, this);
			mv.gotoAndPlay(str, 1);
		}
		private showStopbetMV() {
			if (this.parent == null) return;
			this.animationgroup.visible = true;
			this.stopbetAnimation.animation.play("newAnimation", 1);
			this.stopbetAnimation.addEventListener(egret.Event.COMPLETE, () => {
				this.stopbetAnimation.animation.gotoAndStop("newAnimation");
				this.animationgroup.visible = false;
			}, this);
		}
		/**
		* 显示聊天
		* @param str
		*/
        public showchat(send: number, to: number, mess: string): void {
            if (to == -1) {//普通表情
                this.showItemFace(getTableVO().allPlayerVO[send], mess);
            } else if (to == -2) {//文字信息
                // this.showItemMess(this.view.allItem[send], mess);
            } else { //魔法表情
                this.showMagicFace(getTableVO().allPlayerVO[send], getTableVO().allPlayerVO[to], mess);
            }
        }
		/**
	   * 设置聊天表情
	   * @param str
	   */
        public showItemFace(send: appvos.HLCPlayerVO, str: string): void {
			if (send != null && send.showPos > 0) {
				var chatimg = new gameabc.MovieClip(playcards.getProxy().getFaceTextures(str));
				var xy = this.getXY(send);
				chatimg.x = xy[0] - 59;
				chatimg.y = xy[1] - 60;
				chatimg.addEventListener(egret.Event.COMPLETE, this.hideItemFace, this)
				this.tableGroup.addChild(chatimg);
				chatimg.play(2);
			}

        }
        private hideItemFace(evt: egret.Event): void {
            evt.target.removeFromParent(true)
        }
        /**显示魔法表情 */
        private showMagicFace(send: appvos.HLCPlayerVO, to: appvos.HLCPlayerVO, str: string): void {
			if (send != null && to != null && to.showPos > 0) {
				var face = new playcards.MagicFaceItem(str);
				this.tableGroup.addChild(face);
				var cost = getTableVO().chatPay * getProxy().addTimes;
				send.totalBet -= cost;
				if (send.totalBet < 0) send.totalBet = 0;
				var sendxy = this.getXY(send);
				var toxy = this.getXY(to)
				face.show(sendxy[0], sendxy[1], toxy[0], toxy[1]);
				//this.showCharm(sendxy[0], sendxy[1], toxy[0], toxy[1],str)//获得魅力值
			}
        }
		/***魅力 */
        private showCharm(_x: number, _y: number, tx: number, ty: number, str: string = ""): void {
			var magiclistdata = room.getProxy().magiclistdata;
			var len: number = magiclistdata.length;
			var mlNum: number = 0;
			var mljfNum: number = 0;
			var mlNumT: number = 0;
			var mljfNumT: number = 0;
			var mStr: any;
            while (--len >= 0) {
                if (magiclistdata[len]["label"] == str) {
                    mlNum = magiclistdata[len]["charmList"][1] * room.getProxy().current.charmList[1];
					mljfNum = magiclistdata[len]["charmList"][2] * room.getProxy().current.charmList[2];

					mlNumT = magiclistdata[len]["charmList"][3] * room.getProxy().current.charmList[3];
					mljfNumT = magiclistdata[len]["charmList"][4] * room.getProxy().current.charmList[4];
                }
            }
			this.toShowCharmTxt(_x - 50, _y - 100, mlNum, mljfNum);
			this.toShowCharmTxt(tx, ty, mlNumT, mljfNumT)
        }
		/***
		 * 
		 * 魅力表现
		 */
		private toShowCharmTxt(_x: number, _y: number, ml: number, mljf: number): void {
			var mStrT: any;
            var textT: playcards.MoveLabel = playcards.MoveLabel.fromPool();
            var haoS: string = "";
            if (ml > 0) {
				mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, "魅力+" + ml, AppConst.TextColors.yellow);
            } else if (ml < 0) {
				mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, "魅力" + ml, AppConst.TextColors.pink);
            }
            if (mljf > 0) {
                if (mStrT) haoS = ","
				mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, haoS + "魅力积分+" + mljf, AppConst.TextColors.yellow);
            } else if (mljf < 0) {
				if (mStrT) haoS = ","
				mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, haoS + "魅力积分" + mljf, AppConst.TextColors.pink);
            }
            if (mStrT) {
				textT.textFlow = mStrT;
                //textT.text = "魅力+100，魅力积分+100"//mStrT;
                textT.bold = true;
                textT.width = 200;
                textT.textAlign = "center"
                textT.size = 18;
                this.tableGroup.addChild(textT);
                textT.goto(_x - 100, _y + 60, _x - 100, _y - 20)
            }

        }
		private hideMV(evt: egret.Event): void {
            evt.target.removeFromParent(true);
        }
		private changeSelect(evt: egret.Event): void {
			if (evt.target == this.winselect) {
				if (this.winselect.selected) {
					var num: string = "";
					if (this.winNum > 0) num = this.winNum + ""
					uicomps.KeyboardUIMoudleComp.show(this.winkebord, this, num);
				} else {
					this.winlab.text = "";
					this.winNum = 0;
				}
				mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BANK_WIN_SEL);
			}
			else {
				if (this.loseselect.selected) {
					num = "";
					if (this.loseNum < 0) num = this.loseNum + ""
					uicomps.KeyboardUIMoudleComp.show(this.losekebord, this);
				} else {
					this.loselab.text = "";
					this.loseNum = 0;
				}
				mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BANK_LOSE_SEL);
			}
		}

		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            super.touchBindButtonHandler(clickTarget);
            switch (clickTarget) {
				case this.btnbak://返回按钮
					getProxy().outRoom();
					break;
				case this.item1:
				case this.item2:
				case this.item3:
				case this.item4:
				case this.item5:
				case this.item6:
				case this.item7:
					var tablevo: appvos.HLCTableVO = getTableVO();
					var vo = getProxy().mySeatvo;
					if (tablevo != null) {
						var item: HappyItemComp = clickTarget as HappyItemComp;
						var index: number = Number(item.name)
						if (item.playvo == null) {//坐下
							if (vo.showPos == 0 && index > 1) {
								var money: number = room.getProxy().current.bigBlinds * 5;
								if (getProxy().getMoney() >= money)
									__PVO().i(index).to(app.NetAction.GLXY_REQ_ADD_SHOW_POS);
								else user.getProxy().notMoney("坐下需要筹码大于等于" + FormatUtils.wan(money) + " 您的筹码不足");// tip.popSysCenterTip("筹码达到"+  +"才能坐下..",tip.TIPS_TYPE.TIPS_WARNING);
							}

						} else {
							var seeInfo: appvos.SeeInfoVO = new appvos.SeeInfoVO
							seeInfo.roleId = item.playvo.roleId;
							seeInfo.seatId = item.playvo.seatId;
							seeInfo.mySeatId = vo.seatId;;
							seeInfo.type = -3;
							seeInfo.avatarID = item.playvo.avatarID;
							seeInfo.sex = item.playvo.sex;
                            seeInfo.name = item.playvo.name;
							seeInfo.nowBet = 0;
							seeInfo.totalBet = item.playvo.totalBet;
							seeInfo.facecost = tablevo.chatPay * getProxy().addTimes;
							__OPEN_MOUDLE(AppReg.APP_POKER_INFO, seeInfo)

						}
					}
					// this.showAddBet(Number(clickTarget.name), Math.floor(Math.random() * 4), Math.random() * 10010);	
					break;
				case this.betItem1:
				case this.betItem2:
				case this.betItem3:
				case this.betItem4:
					var tablevo: appvos.HLCTableVO = getTableVO();
					if (tablevo != null && tablevo.gameStatus > 0 && !getProxy().hookingFlag && this.selectMoney > 0 && this.btnsView.visible) {//加注 
						var index: number = Number(clickTarget.name);
						var canadd = getProxy().canAddbet(index);
						if (canadd > 0) {
							if (canadd < this.selectMoney) __PVO().i(index).l(canadd).to(app.NetAction.GLXY_REQ_ANTE);
							else __PVO().i(index).l(this.selectMoney).to(app.NetAction.GLXY_REQ_ANTE);
						} else this.allbet[index].resetSelect();

						// this.betSelectimg.visible = true;
						// this.betSelectimg.x = clickTarget.x;
					}
					break;
				case this.addbtn1:
				case this.addbtn2:
				case this.addbtn3:
				case this.addbtn4:
					this.selectBtn(clickTarget);
					break;
				case this.otherRolesBtn:
					// this.showAddBet(0, Math.floor(Math.random() * 4), Math.random() * 10010);		
					__OPEN_MOUDLE(AppReg.APP_HAPPY_NOTSET);
					break;
				case this.addbankbtn:
					if (getProxy().bankWaiter.length == 0) getProxy().addBank();
					else __OPEN_MOUDLE(AppReg.APP_HAPPY_UP);
					break;

				case this.taskbtn:
					__OPEN_MOUDLE(AppReg.APP_HAPPY_STAT);
					break;
				case this.helpbtn:
					__OPEN_MOUDLE(AppReg.APP_HAPPY_RULE, 2);
					break;
				case this.rewardbtn:
					var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
					if (bets) {
						__OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, bets);
					} else
						__OPEN_MOUDLE(AppReg.APP_HAPPY_RULE, 1);
					break;
				case this.winbg:
					var num: string = "";
					if (this.winNum > 0) num = this.winNum + ""
					uicomps.KeyboardUIMoudleComp.show(this.winkebord, this, num);
					mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BANK_WIN);
					break;
				case this.losebg:
					num = "";
					if (this.loseNum < 0) num = this.loseNum + ""
					uicomps.KeyboardUIMoudleComp.show(this.losekebord, this, num);
					mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_BANK_LOSE);
					break;
				case this.linebtn:
					__OPEN_MOUDLE(AppReg.APP_BANK_LINE, [this.bankBeginBet, this.totalRank, this.banktotalBets]);
					break;
				case this.btnHooking:
				case this.btnHook:
					__OPEN_PRE_MOUDLE(AppReg.HOOK);
					break;
				case this.luckychangebtn:
					if (this.luckychangebtn.alpha == 1 && getProxy().mySeatvo && getProxy().mySeatvo.showPos == 1) {
						__OPEN_PRE_MOUDLE(AppReg.APP_HAPPY_LUCKY);
						mc2sdk.event(mc2sdk.EVENT_TYPE.HAPPY_LUCKY_CHANGE);
					}
					break;
			}
		}
		private winkebord(num: number): void {
			if (num) {
				this.winNum = num;
				this.winlab.text = FormatUtils.wan(num);
				this.winselect.selected = true;
			} else {
				if (this.winlab.text == null || this.winlab.text == "") {
					this.winNum = 0;
					this.winselect.selected = false;
				}

			}
		}
		private losekebord(num: number): void {
			if (num) {
				this.loseNum = -num;
				this.loselab.text = FormatUtils.wan(-num);
				this.loseselect.selected = true;
			} else {
				if (this.loselab.text == null || this.loselab.text == "") {
					this.loseselect.selected = false;
					this.loseNum = 0;
				}
			}
		}

		private addDragonBones() {
			var boneFactory: dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_HAPPY, "counter_bones_json", "counter_texture_png", "counter_texture_json");
            this.counterAnimation = boneFactory.buildFastArmature("MovieClip", "NewProject1");
            this.counterAnimation.display.touchEnabled = false;
            this.counterAnimation.display.y = 46;
            this.counterAnimation.display.x = 46;
            dragonBones.WorldClock.clock.add(this.counterAnimation);
            this.selectanimation.addChild(<egret.DisplayObject>this.counterAnimation.display);
            this.counterAnimation.animation.play(null, -1);

			var boneFactory: dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_HAPPY_MAIN, "stopbet_json", "stopbet_texture_png", "stopbet_texture_json");
            this.stopbetAnimation = boneFactory.buildFastArmature("MovieClip");
            this.stopbetAnimation.display.touchEnabled = false;
            this.animationgroup.addChild(<egret.DisplayObject>this.stopbetAnimation.display);
			this.animationgroup.visible = false;
            dragonBones.WorldClock.clock.add(this.stopbetAnimation);
		}
		private removeDragonBones() {
			dragonBones.WorldClock.clock.remove(this.counterAnimation);
			dragonBones.WorldClock.clock.remove(this.stopbetAnimation);
            gameabc.destoryFactory(AppReg.APP_HAPPY);
			gameabc.destoryFactory(AppReg.APP_HAPPY_MAIN);
		}
		dispose(): void {
			this.removeDragonBones();
			playcards.getProxy().removeTextureAtlas();
			getProxy().removeFactory();
			getProxy().bankCards = null;
			MoveImage.clearPool();
			super.dispose();
		}
	}
}