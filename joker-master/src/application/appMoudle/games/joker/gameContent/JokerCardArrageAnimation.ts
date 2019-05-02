module joker {

	/**
	 * 扑克牌型动画控制类
	 */
	export class JokerCardArrageAnimation {

		/**
		 * 牌形组件
		 */
		handCards: JokerPkPatternsComp;

		space:number = 5;

		public constructor(hc: JokerPkPatternsComp) {
			this.handCards = hc;
		}

		/**
		 * 默认排列
		 */
		normalArrage(playTween:boolean = false): void {
			var i: number = 0;
			for (i = 0; i < FIVE_CARD_NUM; i++) {
				var card = this.handCards.cards[i];
				card.anchorOffsetX = 0;
				card.anchorOffsetY = 0;
				if(playTween) {
					egret.Tween.removeTweens(card);
					egret.Tween.get(card)
						.to({rotation:0,x:i * (card.width + this.space),y:0},300,egret.Ease.quartOut)
				}
				else {
					card.rotation = 0;
					card.x = i * (card.width + this.space);
					card.y = 0;
				}
			}
		}

		/**
		 * 飞入到主场景
		 */
		async flyIn() {

			var cards: JokerCardItem[] = this.handCards.cards;
			var scpr: egret.Point = new egret.Point(AppGlobal.stageFullWidth + cards[0].width, AppGlobal.stageFullHeight >> 1);
			var root = AppRoot.gameLayer;

			var moves: egret.Point[] = [];
			this.handCards.cards.forEach(element => {
				moves.push(new egret.Point(element.x, element.y));
			})

			return new Promise((resolve, reject) => {
				for (var i: number = 0; i != cards.length; i++) {
					var sx: number = cards[i].width >> 1;
					var sy: number = cards[i].height >> 1;

					cards[i].visible = false;

					var ccpx: number = cards[i].width >> 1;
					var ccpy: number = cards[i].height >> 1;
					var tempCard:JokerCardItem = new JokerCardItem();
					tempCard.x = scpr.x;
					tempCard.y = scpr.y;
					tempCard.anchorOffsetX = ccpx;
					tempCard.anchorOffsetY = ccpy;
					tempCard.setCardBack();

					var cp: egret.Point = this.handCards.localToGlobal(cards[i].x + 1, cards[i].y - 7);
					var duration: number = 600;

					var tw: egret.Tween = egret.Tween.get(tempCard)
						.call((tcard) => {
							root.addChild(tcard);
						}, this, [tempCard])
						.set({ x: scpr.x, y: scpr.y, rotation: 760 })
						.wait(i * duration * 0.5)
						.to({ x: cp.x + ccpx, y: cp.y + ccpy, rotation: 0 }, duration, egret.Ease.quartOut)
						.call((...args) => {
							args[0].removeFromParent(true);
							args[1].visible = true;
							if (args[2] == cards.length - 1) {
								resolve();
							}
						}, this, [tempCard, cards[i], i])
				}
			})
		}

		/**
		 * 第一手牌时的动画
		 */
		async masterHand(cardValues:number[]) {
			this.normalArrage();
			let duration:number = 300;
			if(__IS_MOUDLE_OPEN(AppReg.JOKER_MODULE)) {
				let gameModule = <joker.JokerGameModule>__GET_MOUDLE_COMP(AppReg.JOKER_MODULE);
				let imgBg = gameModule.pokerBg;
				egret.Tween.removeTweens(imgBg);
				egret.Tween.get(imgBg)
					.to({alpha:0},duration,egret.Ease.quadOut)
			} 

			let cards = this.handCards.cards;
			let rect:egret.Rectangle = new egret.Rectangle(cards[0].x,cards[0].y,cards[0].width,cards[0].height);

			let distance:number = 800;  //横向直径
			let radiusX:number = distance >> 1;				//横向半径
			let radiusY:number = radiusX;// >> 1;			//纵向半径
			let centerX:number = AppGlobal.stageFullWidth >> 1;			//圆形全局中心点
			let centerY:number = AppGlobal.stageFullHeight / 2 + 300;	//圆形全局中心点

			let fiexAngle:number = 232;		//扇形起始角度
			let angleVector:number = 20;	//向理加角

			let sp:egret.Point = new egret.Point(centerX - distance / 2,centerY);
			var lsp = this.handCards.globalToLocal(sp.x,sp.y);

			let tps:egret.Point[] = [];
			let angles:number[] = [];

			for(let i:number = 0; i < cards.length; i++) {
				cards[i].anchorOffsetX = rect.width >> 1;
				cards[i].anchorOffsetY = rect.height;
				cards[i].x = cards[i].x + cards[i].anchorOffsetX;
				cards[i].y = cards[i].y + cards[i].anchorOffsetY;

				let radian:number = (fiexAngle + i * angleVector) * Math.PI / 180;
				let angle:number = radian * 180 / Math.PI;
				let px:number = centerX + Math.cos(radian) * radiusX;
				let py:number = centerY + Math.sin(radian) * radiusY;
				let tp = this.handCards.globalToLocal(px,py);

				tps.push(tp);
				angles.push(angle);

				//扇形动画函数
				let fan = function(tps:egret.Point[],angles:number[],splice:number = 0) {
					if(splice >= cards.length) {
						return;
					}

					for(let i:number = splice; i < cards.length; i++) {
						let tempPos = tps[splice];
						let tempAngle = angles[splice];
						egret.Tween.get(cards[i])
							// .wait(duration / 2)
							.to({x:tempPos.x,y:tempPos.y,rotation:tempAngle - 270},splice == 0 ? duration : 200)
							.call((...args)=>{
								if(args[0] == cards.length - 1) {
									fan(tps,angles,splice + 1);
								}
							},this,[i]);
					}
				}

				egret.Tween.removeTweens(cards[i]);
				egret.Tween.get(cards[i])
					.wait(i * duration / 2)
					.to({x:lsp.x},duration,egret.Ease.quartOut)
					.call((...args)=>{
						if(args[0] == cards.length - 1) {
							fan(tps,angles,0);
						}
					},this,[i])
			}
		}
	}
}