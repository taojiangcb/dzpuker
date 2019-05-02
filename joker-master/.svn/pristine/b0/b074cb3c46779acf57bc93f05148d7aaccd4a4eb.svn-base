module playcards {
	/**
	 * 实时战况
	 * @author 
	 *
	 */
    export class PlaycardsCountUIModuleComp extends app.base.BaseWndUIMoudleComponent {
		private btnClose: eui.Image;
		private list: eui.List;
		private mess: eui.Label;
		public constructor() {
    		super();
            this.skinName = "PlaycardsCountUISkin";
		}
		createComplete(event: egret.Event): void {
			super.createComplete(event);
			this.bindButton(this.btnClose);
			this.list.dataProvider = new eui.ArrayCollection(this.uiOpenData);
            this.list.itemRenderer = playcards.PlaycardsCountItemRenderer;
			this.mess.visible = this.list.dataProvider.length == 0;
		} 
		touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			this.close();
		}
	}
}
