module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardTipComp extends PlaycardsUIComp{
        private bgimage:eui.Rect;
        private isTween: boolean;
        private allgroup: eui.Group;
        private itemimage:eui.Rect;
		public constructor() {
            super();
            this.skinName = "PlayCardsTipSkin";
            this.right=0;
            this.left=0;
            this.top = 0;
            this.bottom = 0;
		}
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.show();
            this.bindButton(this.bgimage);   
        }
        
        public show():void{
            if (this.initialized) {
                if (!this.visible)
                    this.tweenShow();
                else {
                     this.isTween = true;
                    this.allgroup.x = -410;
                    egret.Tween.get(this.allgroup).to({ x: 0 },200).call(this.tweenComp,this);
                }
                if(getProxy().mySeat > -1 && getProxy().mySeatvo.myCard.length > 1 && getTableVO().globalCards.length > 2) {
                    var allcard = getTableVO().globalCards.concat(getProxy().mySeatvo.myCard)
                    var rest = getProxy().getCardResult(allcard); 
                    this.itemimage.visible = true;
                    this.itemimage.y = (9 - rest.type)*this.itemimage.height+19;
                 }else this.itemimage.visible = false;
            }
            
        }
        private tweenComp(): void {
            this.isTween = false;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(this.isTween) return;
            this.isTween = true;
            egret.Tween.get(this.allgroup).to({ x: -410 },200).call(this.removeFromParent,this);
//            this.removeFromParent();           
        }
      
	}
}
