module joker {
	export class JokerGameMediator extends app.mvc.AbstractMediator {

		static NAME:string = "__JOKER_GAME_MEDIATOR__"

		static TABLE_INITIALIZED:string = "tableInit";				//桌子信息
		static BET:string = "bet";									//下注时信息返馈
		static GAME_FA_PAI:string = "gameFaPai";					//发牌

		static GAME_STAET:string = "gameStart";						//游戏开初始化
		static GAME_CONT_CHANGE:string = "gameCountChange";			//改变门数
		static GAME_RATIO_CHANGE:string = "gameRatioChange";		//游戏倍率发生了改变
		static GAME_AWARD:string = "gameAward";
		static GAME_RE_STAET:string = "gameRestart";				//
		

		public constructor(view?:any) {
			super(JokerGameMediator.NAME,view);
		}

		listNotificationInterests():string[] {
			return [
				JokerGameMediator.GAME_STAET,
				JokerGameMediator.GAME_CONT_CHANGE,
				JokerGameMediator.GAME_RATIO_CHANGE,
				JokerGameMediator.TABLE_INITIALIZED,				
				JokerGameMediator.BET,									//下注
				JokerGameMediator.GAME_FA_PAI,							//发牌
				JokerGameMediator.GAME_AWARD,							//奖劢状态
				JokerGameMediator.GAME_RE_STAET,
				app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION		//重新登录
			]
		}

		handleNotification(notification:puremvc.INotification):void {
			switch(notification.getName()) {
				case JokerGameMediator.TABLE_INITIALIZED:
					break;
				case JokerGameMediator.BET:
					break;
				case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
					shareLoginC().onLoginOut();
					gameLogic().gameStart();
					break;
				case JokerGameMediator.GAME_FA_PAI:
					this.dealMaster(notification);
					break;
				case JokerGameMediator.GAME_STAET:
					this.gameStartState();
					break;
				case JokerGameMediator.GAME_CONT_CHANGE:
					this.changePokerContent(notification);
					break;
				case JokerGameMediator.GAME_RATIO_CHANGE:
					this.popGameRatio();
					break;
				case JokerGameMediator.GAME_AWARD:
					this.gameAwardState();
					break;
				case JokerGameMediator.GAME_RE_STAET:
					break;
			}
		}

		/**
		 * 发手下牌
		 */
		dealMaster(notification:puremvc.INotification) {
			var cardValues:number[] = notification.getBody();
			//一手牌的时候处理
			if(joker.getProxy().nowCount == joker.getProxy().handlerCount[0]) {
				this.viewComp.pokerComp.arrageAnimateion.masterHand(cardValues);
			} 
			else {
				this.viewComp.pokerComp.tumover(cardValues)
			}
		}

		/**上次的门数 */
		oldCount:number = 1;
		
		/**
		 * 改变了门数
		 */
		changePokerContent(notification:puremvc.INotification) {
			if(this.viewComp) {
				var newCount:number = notification.getBody();
				if(this.oldCount == 1 && newCount ==1) {
					this.viewComp.JPCS.onePkContent();
				} 
				else if(newCount == 1 && this.oldCount != 1) {
					this.oldCount = newCount;
					this.viewComp.JPCS.changePkContent(notification.getBody())
					this.viewComp.JPCS.onePkContent();
				}
				else if(this.oldCount != newCount) {
					this.oldCount = newCount;
					this.viewComp.JPCS.denyOnePkContent();
					this.viewComp.JPCS.changePkContent(notification.getBody())
				}
			}
			__CLOSE_MOUDLE(AppReg.JOKER_RATIO_MODULE);
		}

		/**
		 * 游戏开始了
		 */
		async gameStartState() {
			if(this.viewComp) {
				var pokerContent = this.viewComp.handPokerContent;
				var pokerBg = this.viewComp.pokerBg;
				var handPoker = this.viewComp.pokerComp;

				var x:number = AppGlobal.stageFullWidth - pokerContent.width >> 1;
				var y:number = AppGlobal.stageFullHeight - pokerContent.height - this.viewComp.operationPanel.height - 10;

				pokerContent.x = x;
				pokerContent.y = y;

				pokerBg.alpha = 0;
				handPoker.visible = true;

				//发牌
				await handPoker.arrageAnimateion.flyIn();
				__SEND_NOTIFICATION(JokerGameMediator.GAME_CONT_CHANGE,1);	//选择一手牌
				__CLOSE_MOUDLE(AppReg.JOKER_RATIO_MODULE);
			}
		}

		/**
		 * 进入结算状态
		 */
		async gameAwardState() {
			if(joker.getProxy().nowCount == joker.getProxy().handlerCount[0]) {
				await this.masterHandAward();
			}
			await this.awardDisplayUpdate();
		}

		async masterHandAward() {
			return new Promise((resolve,reject)=> {
				egret.Tween.removeTweens(this.viewComp.pokerBg);
				this.viewComp.pokerComp.arrageAnimateion.normalArrage(true);
				egret.Tween.get(this.viewComp.pokerBg)
					.set({visible:true})
					.to({alpha:1},300)
					.call(()=>{resolve()})
			})
		}

		//结算状态时的ui部局
		async awardDisplayUpdate() {
			return new Promise((resolve,reject)=>{
				let duration:number = 300;

				let pokerContentRight:number = 5
				let pokerContentTx:number = AppGlobal.stageFullWidth - this.viewComp.pokerContentGroup.width - pokerContentRight;

				var a = this.viewComp.handPokerContent.left;
				
				egret.Tween.removeTweens(this.viewComp.pokerContentGroup);
				egret.Tween.get(this.viewComp.pokerContentGroup)
					.set({horizontalCenter:NaN})
					.to({x:pokerContentTx},duration,egret.Ease.quartOut)
					.set({right:pokerContentRight});

				let pokerHandContentTx:number = AppGlobal.stageFullWidth - this.viewComp.handPokerContent.width - pokerContentRight;
				egret.Tween.removeTweens(this.viewComp.handPokerContent);
				egret.Tween.get(this.viewComp.handPokerContent)
					.set({horizontalCenter:NaN})
					.to({x:pokerHandContentTx,bottom:170},duration,egret.Ease.quartOut)
					.set({right:pokerContentRight});

				let awardLeft:number = 5;
				egret.Tween.removeTweens(this.viewComp.awardTable);
				egret.Tween.get(this.viewComp.awardTable)
					.to({left:awardLeft},duration,egret.Ease.backOut)
					.wait(100)
					.call(()=>{
						resolve();
					})
			})
		}

		gameRestartState():void {

		}

		/**
		 * 弹出选择的倍率窗口
		 */
		popGameRatio():void {
			if(!__IS_MOUDLE_OPEN(AppReg.JOKER_RATIO_MODULE)) {
				__OPEN_PRE_MOUDLE(AppReg.JOKER_RATIO_MODULE,null,null,null,this.viewComp.ratioContent);
			}
			else {
				var jokerRatioModule = <joker.JokerRatioUIModule>__GET_MOUDLE_COMP(AppReg.JOKER_RATIO_MODULE);
				jokerRatioModule.renderChroose();
			}
		}

		get viewComp():joker.JokerGameModule {
			return <joker.JokerGameModule>this.viewComponent;
		}
	}
}