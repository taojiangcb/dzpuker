module match {
	export class MttPhoneValidateMoudle extends app.base.BaseWndUIMoudleComponent {

        getCodeButton:eui.Image;
		phoneInput:eui.TextInput;
		codeInput:eui.TextInput;
		sendButton:eui.Button;
		urlLoader:egret.URLLoader;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/PhoneNumberValidate.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.getCodeButton);
			this.bindButton(this.sendButton);
        }

		//this.touchBindButtonHandler
		touchBindButtonHandler(tag:egret.DisplayObject):void {
			switch(tag) {
				case this.getCodeButton:
					this.phone = this.phoneInput.text;
					var url = "http://112.124.29.85:8004/sendCode.php?tel="+this.phone;
					this.urlLoader = new egret.URLLoader(new egret.URLRequest(url));
					this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onPhoneUpLoaded, this);

				return;
				case this.sendButton:
					this.code = this.codeInput.text;
					this.sendNotification(app.NetAction.REQ_PHONE_VALIDATE,[this.phone,this.code,this.key])
				return;
			}
		}

		phone:string;
		code:string;
		key:string; 

		onPhoneUpLoaded(evt:Event):void {
			console.log(this.urlLoader.data);
			var json = JSON.parse(this.urlLoader.data);
			this.key = json.data.key;
		}


    }
}