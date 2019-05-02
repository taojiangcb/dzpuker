module match {
	export class MttProductExchangeUIModule extends app.base.BaseWndUIMoudleComponent {

		public btnSend:eui.Group;
		public txtPhone:eui.TextInput;
		public txtName:eui.TextInput;

		productInfo:match.MTTProductVO;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/MttExchangeProduct.exml";
		}

		opening():void {
			super.opening();
			this.productInfo = this.uiOpenData.ptInfo;
		}

		createComplete(event:egret.Event):void {		
			super.createComplete(event);
			this.bindButton(this.btnSend);			
		}

		//this.touchBindButtonHandler
		touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(tag == this.btnSend) {
				var usrName:string = this.txtName.text;
				var phone:string = this.txtPhone.text;
				if(phone.length != 11) {
					tip.popSysCenterTip("你电话号码长度不对!");
					return;
				}
				match.getProductProxy().exchangeProduct(this.productInfo,usrName,phone);
			}
		}
	}
}