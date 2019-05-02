
module tip {

	export class KeyboardComp extends gameabc.UICustomComponent {

        inputButton0:eui.Button;
        inputButton1:eui.Button;
        inputButton2:eui.Button;
        inputButton3:eui.Button;
        inputButton4:eui.Button;
        inputButton5:eui.Button;
        inputButton6:eui.Button;
        inputButton7:eui.Button;
        inputButton8:eui.Button;
        inputButton9:eui.Button;
        inputButtonArray:eui.Button[];

        delButton:eui.Button;
		infoLabel:eui.Image;
        numberInput: eui.TextInput;
		enterButton:eui.Button;
		gotoImage:eui.Image;

		constructor() {
			super();
			this.skinName = "KeyboardSkin";
			this.inputButtonArray = [
                this.inputButton0,this.inputButton1,this.inputButton2,this.inputButton3,this.inputButton4,
                this.inputButton5,this.inputButton6,this.inputButton7,this.inputButton8,this.inputButton9
            ];
			this.numberInput.addEventListener(egret.Event.CHANGE,this.onInputChange,this);
		}

		createComplete(event: egret.Event): void {
			this.infoLabel.touchEnabled = false;
			for(var i=0; i<10; ++i) {
                this.bindButton(this.inputButtonArray[i]);
            }
			this.bindButton(this.delButton);
			this.bindButton(this.enterButton);
			this.bindButton(this.gotoImage);
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
			if (this.numberInput.text.length >= this.maxChars) return;
            for(var i=0; i<10; ++i) {
                if (this.inputButtonArray[i] == clickTarget) {
                    this.numberInput.text += String(i);
                }
            }
            this.onInputChange(null);

		}






		//公共函数部分
		buttonListenerObj:Object;//设置按钮响应逻辑this对象
		buttonListener:Function; //设置按钮响应逻辑
		maxChars:number = 6;

	}
}