
/**
 * 游戏的操作控制面板
 */
module joker {
	export class JokerOperationPanel extends gameabc.UICustomComponent {

		public countInput:joker.JokerNumberInput;
		public levelInput:joker.JokerNumberInput;
		public moneyInput:joker.JokerNumberInput;
		public btnMaxBet:eui.Component;
		public btnFapai:eui.Component;
		public txtTotalBet:eui.BitmapLabel;
		public txtMoney:eui.BitmapLabel;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/joker/JokerOperationTableSkin.exml";
		}
		
		createComplete(event:egret.Event):void  {
			super.createComplete(event);

			this.countInput.stepValues = getProxy().handlerCount;
			this.levelInput.stepValues = [1,2,3,4,5];
			this.moneyInput.stepValues = getProxy().ratios;

			this.bindButton(this.btnMaxBet);
			this.bindButton(this.btnFapai);

			this.countInput.addEventListener(egret.Event.CHANGE,this.gameCountChange,this);
			this.levelInput.addEventListener(egret.Event.CHANGE,this.gameRatioChange,this);
			this.moneyInput.addEventListener(egret.Event.CHANGE,this.gameMoneyChange,this);
		}

		/**
		 * 设置手牌次数
		 */
		gameCountChange(event:egret.Event):void {
			var value:number = event.data;
			getProxy().nowCount = value;
			console.log("设置下注的门数%d",value)
			__SEND_NOTIFICATION(JokerGameMediator.GAME_CONT_CHANGE,value);
		}

		/**
		 * 设置下注的倍率
		 */
		gameRatioChange(event:egret.Event):void {
			let value:number = event.data;
			getProxy().nowRatio = value;
			console.log("设置了下注的倍率%d",value);
			__SEND_NOTIFICATION(joker.JokerGameMediator.GAME_RATIO_CHANGE);
		}

		/**
		 * 设置下注额
		 */
		gameMoneyChange(event:egret.Event):void {

		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var tar = tag;
			switch(tar) {
				case this.btnFapai:
					if(this.btnFapai.currentState == "fapai") {
						joker.getProxy().nowCount = this.countInput.chrooseValue;
						joker.getProxy().nowRatio = this.levelInput.chrooseValue;
						joker.getProxy().nowBet = this.moneyInput.chrooseValue;
						if(joker.getProxy().validation()) {
							var tempCardValues:number[] = getProxy().getFiveRandomCard();
							__SEND_NOTIFICATION(JokerGameMediator.GAME_FA_PAI,tempCardValues);
						}
						this.fapaiState();
					}
					else {
						this.awardState();
						__SEND_NOTIFICATION(JokerGameMediator.GAME_AWARD)
					}
					break;
				case this.btnMaxBet:
					break;
			}
		}

		awardState():void {
			this.countInput.enabled = false;
			this.levelInput.enabled = false;
			this.moneyInput.enabled = false;

			this.btnMaxBet.currentState = "disabled";
			this.btnMaxBet.enabled = false;

			this.btnFapai.currentState = "disabled";
			this.btnFapai.enabled = false;
		}

		fapaiState():void {
			this.countInput.enabled = false;
			this.levelInput.enabled = false;
			this.moneyInput.enabled = false;

			this.btnMaxBet.currentState = "disabled";
			this.btnMaxBet.enabled = false;

			this.btnFapai.currentState = "huanpai";
			this.btnFapai.enabled = true;
		}

		normalState():void {
			this.countInput.enabled = true;
			this.levelInput.enabled = true;
			this.moneyInput.enabled = true;

			this.btnMaxBet.currentState = "normal";
			this.btnMaxBet.enabled = true;

			this.btnFapai.currentState = "fapai";
			this.btnFapai.enabled = true;
		}
	}
}