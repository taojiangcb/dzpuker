module playcards {
	export class PlayCardsSafeHelpModuleComp extends app.base.BaseWndUIMoudleComponent{
		public tab1:eui.RadioButton;
		public tab2:eui.RadioButton;
		public btnClose:eui.Image;
		public view:eui.ViewStack;

		public constructor() {
			super();
			this.skinName = "PlayCardsSafeHelpModuleSkin";
		}
		createComplete(event: egret.Event): void {
            super.createComplete(event);
			 this.tab1.addEventListener(egret.Event.CHANGE, this.tabclick, this);
			 this.tab2.addEventListener(egret.Event.CHANGE, this.tabclick, this);
			   this.bindButton(this.btnClose);
		}	
		 private tabclick(evt: egret.Event): void{
            if(evt.target.selected) 
                 this.view.selectedIndex = evt.target.value;
        }
		    //tab页按钮触发
		 touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			 switch (clickTarget) {
				case this.btnClose:
                    this.close();
                    break;
			 }
		 }
	}
}