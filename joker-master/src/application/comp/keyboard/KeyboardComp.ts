
module uicomps {

	export class KeyboardComp extends gameabc.UICustomComponent {

        delButton:eui.Button;
        enterButton:eui.Button;

        _comp_subKeyBoard : SubKeyBoardComp;

		public infoLabel:eui.Image;
        public numberInput: eui.TextInput;
		
		public gotoImage:eui.Image;

        //公共函数部分
		buttonListenerObj:Object;//设置按钮响应逻辑this对象
		buttonListener:Function; //设置按钮响应逻辑

		constructor() {
			super();
			this.skinName = "KeyboardSkin";
			
		}

		createComplete(event: egret.Event): void {
			this.infoLabel.touchEnabled = false;

			this.delButton = this._comp_subKeyBoard.delButton;
            this.enterButton = this._comp_subKeyBoard.enterButton;
			this.bindButton(this.delButton);
			this.bindButton(this.enterButton);
            for(var i=0; i<10; ++i) {
                this.bindButton(this._comp_subKeyBoard.inputButtonArray[i]);
            }


            this.bindButton(this.gotoImage);
            this.numberInput.maxChars = 6;

            this.numberInput.addEventListener(egret.Event.CHANGE,this.onInputChange,this);
		}


		
        onInputChange(evt:egret.Event):void {
            this.infoLabel.visible = Boolean(this.numberInput.text.length == 0);
        }

		touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.delButton:
                    var len = this.numberInput.text.length;
                    if (len>0) {
                        this.numberInput.text = this.numberInput.text.substring(0,len-1);
                    }
                    this.onInputChange(null);
                    return;
			}
			if(this.buttonListener!=null) {
				this.buttonListener.call(this.buttonListenerObj,clickTarget);
			}
			if (this.numberInput.text.length >= this.numberInput.maxChars) return;
            for(var i=0; i<10; ++i) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == clickTarget) {
                    this.numberInput.text += String(i);
                }
            }
            this.onInputChange(null);

		}

		
		

	}
}