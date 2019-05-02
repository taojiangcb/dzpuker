module playcards {
	export class PlaycardsChatMessComp extends PlaycardsUIComp{
		public bgimage:eui.Rect;
		public sendbtn:eui.Group;
		public messlab:eui.Label;
		public messinput: eui.TextInput;
		public textScroller:eui.Scroller
        
		public constructor() {
            super();
            this.skinName = "PlaycardsChatMessSkin";
            this.percentHeight = 100;
			this.percentWidth = 100;
		}
		public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage);
			this.bindButton(this.sendbtn);
		}
		 protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(this.bgimage==clickTarget){
                this.close();
            } else if (this.sendbtn == clickTarget) {
				if (this.messinput.text.length > 0) {
					getProxy().sendChat(this.messinput.text, user.getProxy().svrNumId, -3, 600);
					this.messinput.text = "";
				} else tip.popSysBottomTip("请输入发送文字");
			}
        }
		 public refText( messTextFlow: Array<egret.ITextElement>): void{		 
			 this.messlab.textFlow = messTextFlow;
			 if(this.textScroller.viewport.contentHeight>this.textScroller.height)
			 	this.textScroller.viewport.scrollV = this.textScroller.viewport.contentHeight - this.textScroller.height;
	   }
	}
}