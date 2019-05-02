module bank {
	/**
	 *
	 * @author 
	 *
	 */
    export class BankChoiceItem extends eui.ItemRenderer{
        txtImage:eui.Image;
        iconImage: eui.Image;
		public constructor() {
    		super();
    		this.skinName ="BankChoiceItemSkin"
		}
		
        dataChanged(): void {
            super.dataChanged();
            var info = this.data
            if(info)
            {
                this.txtImage.source ="img_bank_game_"+info[0]+"_png"
                this.iconImage.source = "icon_bank_game_" + info[0] + "_png"
            }
        }
	}
}
