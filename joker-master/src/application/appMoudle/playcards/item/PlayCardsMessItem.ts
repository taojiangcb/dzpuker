module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardsMessItem extends eui.ItemRenderer{
       public messlab:eui.Label;
		public constructor() {
    		super();
            this.skinName = "PlayCardsMessItemSkin"
		}
        dataChanged(): void {
            if(this.data && this.data.label){
                this.messlab.text = gameabc.ResourceBundleUtil.getMessage(this.data.label);
            }     
        }

	}
}
