module myInfo {
	export class InfoTipDel extends app.base.BaseWndUIMoudleComponent {

		private btnOk: eui.Image;
		private btnCancel: eui.Image;
		private txtInfo: eui.Label;

		public constructor() {
			super();
			this.skinName = "InfoTipCustomDel";
		}

		public createComplete(event: egret.Event): void {
			super.createComplete(event);

			var txt: string = "确认要删除 "+this.uiOpenData.labelName+" 标签吗";
			this.txtInfo.text = txt + "";
			this.bindButton(this.btnOk);
			this.bindButton(this.btnCancel);
		}

		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			console.log(this.uiOpenData);
			
			switch (clickTarget) {
				case this.btnOk:
					// __SEND_NOTIFICATION(app.NetAction.REQ_DEL_LABEL,[this.uiOpenData.id])
					break;
				case this.btnCancel:
					this.close();
					break;
			}
		}

	}
}