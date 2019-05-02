module login {
	
	export class LoginServerListItem extends uicomps.BaseItemCilckRenderer{

		nameLabel:eui.Label;

		public constructor() {
			super();
			this.skinName = "ServerListItemSkin";
		}

		dataChanged():void {
			this.nameLabel.text = this.data.label;
		}

	}

}
