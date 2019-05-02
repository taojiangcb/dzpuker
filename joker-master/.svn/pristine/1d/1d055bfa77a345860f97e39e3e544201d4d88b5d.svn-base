module match {
	export class MttExchangeHistoryUIModule extends app.base.BaseWndUIMoudleComponent {

		list_history:eui.List;
		btnClose:eui.Image;
		tipLabel:eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/MttExchangeHistoryUIModule.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			var layoutVal:eui.VerticalLayout = new eui.VerticalLayout();
			layoutVal.gap = 0;

			// this.list_history.itemRenderer = MttHistoryItemRenderer;
			// this.list_history.layout = layoutVal;

			// match.getProductProxy().getHistory();
			match.getProductProxy().getRedpackHistory();

			this.bindButton(this.btnClose);
		}

		fullDatas(ls:match.HitoryVO[]):void {
			if(ls == null || ls.length == 0) {
				this.tipLabel.visible = true;
				this.list_history.visible = false;
			} else {
				var dataCollection:eui.ArrayCollection = new eui.ArrayCollection(ls);
				this.list_history.dataProvider = dataCollection;
			}
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(this.btnClose == tag) {
				this.close();
			}
		}
	}
}