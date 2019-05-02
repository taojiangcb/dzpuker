module match {
	export class MttExchangeHistoryItemRenderer extends uicomps.BaseItemCilckRenderer {

		public txtTime:eui.Label;
		public txtTitle:eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/MttHistoryItemRenderer.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
		}

		dataChanged():void {
			if(this.data) {
				this.txtTime.text = this.data.time;
				this.txtTitle.text = this.data.title;
			}
		}
	}
}