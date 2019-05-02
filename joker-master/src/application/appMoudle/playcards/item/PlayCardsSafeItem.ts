module playcards {
	/**
	 * 保险赔付
	 * @author 
	 *
	 */
	export class PlayCardsSafeItem extends eui.Component{
		public numlab:eui.BitmapLabel;
		public constructor() {
			 super();
			this.skinName = "PlayCardsSafeItemSkin"; 
		}
		public showXY(px:number,py:number,num: string): void{
            this.x = px;
			this.y = py+50;
			this.alpha = 0;
			this.numlab.text = num;
			egret.Tween.get(this).to({ alpha: 1, y: py }, 500).wait(2000).to({ alpha: 0 },500).call(this.removeFromParent,this);

        }

	}
}