module playcards {
	/**
	 *界面基类
	 * @author 
	 *
	 */
    export class PlaycardsUIComp extends gameabc.UICustomComponent {
        public constructor() {
            super();
        }
        public close(): void{
            this.removeFromParent();
            this.alpha = 1;
            this.visible = true;
        }
        	  /**渐显 */
        public tweenShow(): void{
            egret.Tween.removeTweens(this);
            if (!this.visible) {
                this.visible = true;
                egret.Tween.get(this).to({ alpha: 1 }, 300);
            } else this.alpha = 1;
		}
		private setvisable(): void{
			this.visible = false;		
		}
         /**渐隐藏 */
        public tweenHide(): void{
            egret.Tween.removeTweens(this);
			this.visible = true;
            egret.Tween.get(this).to({alpha:0},300).call(this.setvisable,this);              
			
		 }
    }
}