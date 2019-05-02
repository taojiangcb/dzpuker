
/**
 * 扑克牌门数选择容器组件
 */
module joker {
	export class JokerPKC4H extends gameabc.UICustomComponent {
		
		patternsCount:number = 4;
		cardSkinName:string = joker.DEFAULT_CARD_SKIN;
		
		cardScale:number = 0.58;
		cardHSpace:number = 2;	//每张牌的水平间隔
		hspace:number = 15;		//每手牌的水平间隔
		vspace:number = 15;		//每手牌的垂直间隔

		columns:number = 2;
		pplist:JokerPkPatternsComp[] = [];

		public constructor(cardSkinName:string = "",count:number = 4) {
			super()
			this.patternsCount = count;
			this.cardSkinName = cardSkinName;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.arrageHandler();
		}

		createChildren():void {
			super.createChildren();
			for(var i:number = 0; i < this.patternsCount; i++) {
				var ppc:JokerPkPatternsComp = new JokerPkPatternsComp();
				this.addChild(ppc);
				this.pplist.push(ppc);
			}
		}

		/**
		 * 排列处理，不带动画
		 */
		arrageHandler():void {

			var rows:number = Math.ceil(this.patternsCount / this.columns);
			var c:number = 0,r:number = 0;
			var index:number = 0;
		
			for(var i:number = 0; i < rows; i++) {
				for(var j:number = 0; j < this.columns; j++) {
					var pp:JokerPkPatternsComp = this.pplist[index];
					
					pp.arrageAnimateion.space = this.cardHSpace;
					pp.arrageAnimateion.normalArrage();

					pp.scaleX = pp.scaleY = this.cardScale;
					
					var tempW:number = this.pplist[0].width * this.cardScale;
					var tempH:number = this.pplist[0].height * this.cardScale;

					pp.x = j * (tempW + this.hspace);
					pp.y = i * (tempH + this.vspace);

					index++;
				}
			}
		}

		/**
		 * 排列处理，带动画
		 */
		arrageHandlerTween(hspace:number,vspace:number,cardHSpace:number,columns:number,cardScale:number):void {

			this.hspace = hspace;
			this.vspace = vspace;
			this.cardHSpace = cardHSpace;
			this.columns = columns;
			this.cardScale = cardScale

			var rows:number = Math.ceil(this.patternsCount / this.columns);
			var c:number = 0,r:number = 0;
			var index:number = 0;
		
			for(var i:number = 0; i < rows; i++) {
				for(var j:number = 0; j < this.columns; j++) {
					var pp:JokerPkPatternsComp = this.pplist[index];
					
					pp.arrageAnimateion.space = this.cardHSpace;
					pp.arrageAnimateion.normalArrage();

					pp.scaleX = pp.scaleY = this.cardScale;
					
					var tempW:number = this.pplist[0].width * this.cardScale;
					var tempH:number = this.pplist[0].height * this.cardScale;

					pp.x = j * (tempW + this.hspace);
					pp.y = i * (tempH + this.vspace);

					index++;
				}
			}
		}

		/**
		 * 翻牌，牌值要有5个参数,不要翻的牌参数给0
		 */
		tumover(cards:appvos.PMCardVO[]):void {
			if(cards == null) return;
			for(var i:number = 0; i < cards.length; i++) {
				if(i < this.pplist.length) {
					this.pplist[i].tumover(cards[i].cards)
				}
			}
		}

		dispose():void {
			if(this.pplist) {
				this.pplist.forEach(element => {
					egret.Tween.removeTweens(element);
					element.removeFromParent(true);
				})
			}
			this.pplist = null;
			super.dispose();
		}
	}
}