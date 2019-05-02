module playcards {
	/**
	 * 牌
	 * @author 
	 *
	 */
	export class GameCardItem extends CardItem{

		txtLabel:eui.Image
		public constructor() { 
			super();
            this.skinName = "CardItemSkin";       
            this.touchChildren = true;
            this.touchEnabled = true;
			this.txtLabel = new eui.Image()

            this.txtLabel.source ="img_word_gameUI_djfp_png"
			this.txtLabel.horizontalCenter = 0;
			this.txtLabel.verticalCenter =0;
            this.addChild(this.txtLabel);
			this.txtLabel.touchEnabled =false;
			this.txtLabel.visible =false;
		}
		/**重置 */
		public hideLight(): void{
			super.hideLight()
			this.txtLabel.visible =false;
		}
	}
}
