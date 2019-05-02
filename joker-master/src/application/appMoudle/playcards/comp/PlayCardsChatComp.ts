module playcards {
	/**
	 *表情聊天
	 * @author 
	 *
	 */
    export class PlayCardsChatComp extends PlaycardsUIComp{
        private bgimage: eui.Rect;
        private facelist:eui.List;
  
        private messlist: eui.List;
        private viewStack: eui.ViewStack;
        private btnface: eui.RadioButton;
        private btnmess: eui.RadioButton;
        
		public constructor() {
            super();
            this.skinName = "PlayCardsChatSkin";
            this.percentHeight = 100;
			this.percentWidth = 100;
		}

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage);
            this.facelist.itemRenderer = PlayCardsFaceItem;
            this.facelist.dataProvider = new eui.ArrayCollection(getProxy().facelistdata.concat());
            this.facelist.addEventListener(egret.Event.CHANGE, this.itemFaceclick, this);
            this.messlist.itemRenderer = PlayCardsMessItem;
            this.messlist.dataProvider = new eui.ArrayCollection(getProxy().messlistdata.concat());
            this.messlist.addEventListener(egret.Event.CHANGE, this.itemMessclick, this);
            this.btnface.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            this.btnmess.addEventListener(egret.Event.CHANGE,this.tabclick,this);
            this.show();
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(this.bgimage==clickTarget){
                this.close();
            }
        }
        private itemFaceclick():void{
            if(getProxy().mySeat>-1){
//                __PVO().s(this.facelist.selectedItem.label).i(getProxy().mySeat,-1).to(app.NetAction.MATCH_CHAT);
                getProxy().sendChat(this.facelist.selectedItem.label,getProxy().mySeat,-1,this.facelist.selectedItem.char);
                this.close();
            }
            this.facelist.selectedIndex = -1;
        }
        private tabclick(evt: egret.Event): void{
            if(evt.target.selected) 
                 this.viewStack.selectedIndex = evt.target.value;
        }
        private itemMessclick(): void{
            if(getProxy().mySeat>-1){            
//                 __PVO().s(this.messlist.selectedItem.label).i(getProxy().mySeat,-2).to(app.NetAction.MATCH_CHAT); 
                getProxy().sendChat(this.messlist.selectedItem.label,getProxy().mySeat,-2,this.messlist.selectedItem.char);
                this.close();
            }
            this.messlist.selectedIndex = -1;
        }
        public show():void{
            if (this.initialized) {
                if (!this.visible)
                    this.tweenShow();
                else {
                     this.alpha = 0;
                    egret.Tween.get(this).to({ alpha: 1 },300);
                }
            }
        }
	}
}
