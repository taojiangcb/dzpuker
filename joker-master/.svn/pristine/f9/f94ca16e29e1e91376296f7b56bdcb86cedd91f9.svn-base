module room {
	export class DealerComp extends gameabc.UICustomComponent{
		public dealerlist: DealerList;
		public scroller:eui.Scroller;
        private scroll;
		private animation;
		public constructor() {
			super();
			this.skinName = "DealerCompSkin";
		}
		   /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            this.initialized = true;
			this.dealerlist.itemRenderer = DealerListItem;
			// var list: appvos.DealerTableVO[] = [null, null].concat(room.getProxy().room7, null, null);
			// this.dealerlist.dataProvider = new eui.ArrayCollection(list);

			var layout = new DealerLayout();			
			layout.setList(this.dealerlist);
			this.scroll = this.scroller.$Scroller[8];
			this.scroller.bounces = false;
			// this.animation = this.scroll.animation;
			// var that = this;
			// this.animation.endFunction = function(){
			// 	this.finishScrolling();
			// }
        }
		
		// finishScrolling():void {
			
		// }
	
	}
}