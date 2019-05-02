module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlaycardUIMoudle extends gameabc.ScaleTo1UIModule{
		public constructor() {
    		super();
		}
        protected onSmartCloseHandler(event: egret.TouchEvent): void {
            if(event.target == this.modalRect) {
                __CLOSE_MOUDLE(this.uid);
            }
        }
		public close() {
			super.close();
			if (this.gui) {
				this.gui.visible = true;
				this.gui.alpha = 1;
			} 
			 if(this.modalRect) {
               this.modalRect.visible = true;
				this.modalRect.alpha = 1;
            }
		}
		public open(data: Object = null, hideMoudles: number[] = null, pt: egret.Point = null, continer: egret.DisplayObjectContainer = null): void {
			super.open(data, hideMoudles, pt, continer);
			if (this.gui != null && this.gui.visible == false) {
				this.tweenShow();
				this.gui.opening();
			}
					
		}
		  /**渐显 */
        public tweenShow(): void{ 
			if (this.gui) {
				egret.Tween.removeTweens(this.gui);
				this.gui.scaleX = this.gui.scaleY = 1;
				this.gui.visible = true;
                egret.Tween.get(this.gui).to({alpha:1},300);              
			}
			if (this.modalRect) {
				egret.Tween.removeTweens(this.modalRect);
				this.modalRect.visible = true;
				 egret.Tween.get(this.modalRect).to({alpha:1},300);  
			}
		}
		private setvisable(): void{
			this.gui.visible = false;
			if (this.modalRect)
				this.modalRect.visible = false;
		}
         /**渐隐藏 */
        public tweenHide(): void{
			if (this.gui) {	
				egret.Tween.removeTweens(this.gui);
				this.gui.scaleX = this.gui.scaleY = 1;
				this.gui.visible = true;
                egret.Tween.get(this.gui).to({alpha:0},300).call(this.setvisable,this);              
			}
			if (this.modalRect) {
				egret.Tween.removeTweens(this.modalRect);
				this.modalRect.visible = true;
				egret.Tween.get(this.modalRect).to({alpha:0},300);  
			}
		 }
	}
}
