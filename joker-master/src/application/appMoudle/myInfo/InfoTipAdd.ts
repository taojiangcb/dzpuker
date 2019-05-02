module myInfo {
	export class InfoTipAdd extends app.base.BaseWndUIMoudleComponent{

		private btnOk:eui.Image;
		private btnCancel:eui.Image;
		private inputTip:eui.TextInput;

		public constructor() {
			super();
			this.skinName = "InfoTipCustomAdd";
		}

		public createComplete(event:egret.Event):void {
            super.createComplete(event);

			this.bindButton(this.btnOk);
			this.bindButton(this.btnCancel);
			// this.inputTip.restrict = "\u4E00-\u9FA5";
			this.inputTip.maxChars = 20;// 防止拼音过长
		}

		protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.btnOk:
                    var txt:string = this.inputTip.text;
					if(txt.length <= 4){
						__SEND_NOTIFICATION(app.NetAction.REQ_ADD_LABEL, [txt]);
						this.close();
					}else{
						tip.popSysCenterTip("标签长度必须在4个中文字以内", tip.TIPS_TYPE.TIPS_WARNING)
					}
                    break;
                case this.btnCancel:
                    this.close();
                    break;
			}
		}

	}
}