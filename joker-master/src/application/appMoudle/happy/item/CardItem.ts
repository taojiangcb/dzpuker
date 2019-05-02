module happy {
    export class CardItem extends playcards.CardItem{
        private famove: gameabc.LineMove;
        public isHight: boolean;
        public constructor() {
            super();
        }
        /**显示牌背 */
		public setCardBack(): void{
            super.setCardBack();
            this.y = 0;
            this.isHight = false;
		}
        	/**发牌 */
		public showCard(fromy:number,delay:number): void{		
				if (this.famove == null) {
                    this.famove = new gameabc.LineMove();
                    this.famove.alltime = 0.15;
					this.famove.alltime = this.alltime;
                }
                this.visible = false;
                this.famove.delay = delay;
                this.famove.go(0, fromy, 0, 0);
                this.y = fromy;
				egret.Ticker.getInstance().register(this.faadvanceTime,this);
				this.darkImg.visible = false;
		}
		public faadvanceTime(time: number): void {
            this.famove.advanceTime(time);
            this.visible = this.famove.delay<=0;
			this.y = this.famove.y;
			if (this.famove.isComplete) {				
                egret.Ticker.getInstance().unregister(this.faadvanceTime, this);               
			}
        }
        protected turnover(): void{
			 if (this.isHight) {
                    this.y = -20;
                }
		}
        public getCardLogicValue(): number {
            var id = playcards.CardVO.getCardValue(this.cardid);          
            return id == 0 ? 13 : id;
        }
    }
}