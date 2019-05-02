module match {
	export class MttProductExchangeCodeUIModule extends app.base.BaseWndUIMoudleComponent {
		
		public txtCode:eui.TextInput;
		public btnSend:eui.Group;

		btnClose:eui.Image;

		public constructor() {
			super();
			this.skinName="resource/app_skin/sng/product/MTTExchangeCodeUIModule.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.btnSend);
			this.bindButton(this.btnClose);
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(tag == this.btnSend){
				var code:string = this.txtCode.text.toString();
				match.getProductProxy().activeProduct(code);
			}
			else if(tag == this.btnClose) {
				this.close();
			}
		}
	}
}