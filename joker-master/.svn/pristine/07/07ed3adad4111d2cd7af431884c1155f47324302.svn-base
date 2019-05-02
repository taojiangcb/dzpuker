module playcards {
	export class PlayCardsGiftItem extends uicomps.BaseItemCilckRenderer{
		public img:eui.Image;
		public pricelab:eui.BitmapLabel;

		public constructor() {
			 super();
			this.width = this.height = 150;
			this.skinName = "PlayCardsGiftItemSkin";
		}
		 public createComplete(evt: egret.Event): void {     
			super.createComplete(evt);
			this.addButton(this.img)
        } 
		dataChanged(): void {
			if (this.data && this.data.label) {
				this.pricelab.text = this.data.price + "";
				var type = this.data.type;
				if (type == 1) {
					var key = this.data.label;
					 var skey = key.substr(0,key.length-1);
                     this.img.source = getProxy().getTextures(skey + "fly")[0];
				} else {
					var texture = getProxy().getGiftTextures(this.data.label);
					this.img.source = texture[texture.length - 1];
				}
				
			}
		}
	}
}