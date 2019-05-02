module uicomps {
	export class KeyboardUIMoudleComp extends app.base.BaseWndUIMoudleComponent{
		public btnclose:eui.Image;
		public keyboard:uicomps.KeyboardComp;
		public titleimg:eui.Image;
 		public callBackFunc:Function;
			public thisObject: any;
			public defaultNum: string;
		public constructor() {
			super();
			this.skinName = "KeyboardUIMoudleCompSkin";
			
		}
		public createComplete(event: egret.Event): void {
			super.createComplete(event);
			this.bindButton(this.btnclose);
			this.keyboard.buttonListener = this.touchBindButtonHandler;
			this.keyboard.buttonListenerObj = this;
			this.keyboard.numberInput.maxChars = 9;
			this.keyboard.infoLabel.source = null;
			this.keyboard.numberInput.text = this.defaultNum;
		}
		public static show(handler: Function = null,thisObject: any = null,defaultNum: string = ""): uicomps.KeyboardUIMoudleComp {

            __OPEN_MOUDLE(AppReg.KEYBOARD);
            var keyboardWnd: uicomps.KeyboardUIMoudleComp = __GET_MOUDLE_COMP(AppReg.KEYBOARD) as uicomps.KeyboardUIMoudleComp;			
			keyboardWnd.callBackFunc = handler;
			keyboardWnd.thisObject = thisObject;
			keyboardWnd.defaultNum = defaultNum;
			if (keyboardWnd.keyboard != null) {
				keyboardWnd.keyboard.buttonListener = keyboardWnd.touchBindButtonHandler;
				keyboardWnd.keyboard.buttonListenerObj = keyboardWnd;
				keyboardWnd.keyboard.numberInput.text = defaultNum;
			}
			return keyboardWnd;
		}
		public touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.btnclose:
					if(this.callBackFunc != null ) {
                        this.callBackFunc.call(this.thisObject,null);
                    }  
					this.close();
					break;
				  case this.keyboard.enterButton:
				  case this.keyboard.gotoImage:
						if(this.callBackFunc != null ) {
                        this.callBackFunc.call(this.thisObject,Number(this.keyboard.numberInput.text));
                    }
					this.close();
				break;		
			}
			
		}
		   public dispose():void {
            this.unbindButton(this.btnclose);     
            this.callBackFunc = null;
            this.thisObject = null;
			if (this.keyboard){
				this.keyboard.buttonListener = null;
				this.keyboard.buttonListenerObj = null;
			}
            super.dispose();
        }
	}
}