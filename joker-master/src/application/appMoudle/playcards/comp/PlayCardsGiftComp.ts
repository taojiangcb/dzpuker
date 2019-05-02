module playcards {
	/**
	 *表情聊天
	 * @author 
	 *
	 */
    export class PlayCardsGiftComp extends PlaycardsUIComp{
        public bgimage:eui.Rect;
        public facelist:eui.List;

        
		public constructor() {
            super();
            this.skinName = "PlayCardsGiftSkin";
            this.percentHeight = 100;
			this.percentWidth = 100;
		}

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage);
            this.facelist.itemRenderer = PlayCardsGiftItem;
            if (RES.getRes("gift_json") != null) {
                 this.facelist.dataProvider = new eui.ArrayCollection(getProxy().giftlistdata.concat());
            } else {
                 RES.loadGroup("playgift");
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            }
           
            this.facelist.addEventListener(egret.Event.CHANGE, this.itemFaceclick, this);
            this.show();
        }
         private  onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == "playgift") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                this.facelist.dataProvider = new eui.ArrayCollection(getProxy().giftlistdata.concat());
            }
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(this.bgimage==clickTarget){
                this.close();
            }
        }
        private itemFaceclick(): void{          
             __PVO().i( user.getProxy().svrNumId,this.facelist.selectedItem.char).to(app.NetAction.MATCH_SEND_GIFT);
            // this.close();
            this.facelist.selectedIndex = -1;
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
