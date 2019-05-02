module joker {
	export class JokerGameModule extends app.base.BaseSceneUIMoudleComponent {

		public bodyContent:eui.Group;
		public pokerContentGroup:eui.Group;
		public scrollContentGroup:eui.Group;
		public content5:eui.Group;
		public jp4h:joker.JokerPKC4H;
		public content10:eui.Group;
		public jp9h:joker.JokerPKC4H;
		public content25:eui.Group;
		public jp24h:joker.JokerPKC4H;
		public content50:eui.Group;
		public jp49h:joker.JokerPKC4H;
		public handPokerContent:eui.Group;
		public pokerBg:eui.Image;
		public pokerComp:joker.JokerPkPatternsComp;
		public imgXuanze:eui.Image;
		public awardTable:joker.JokerAwardTableComp;
		public ratioContent:eui.Group;
		public operationPanel:joker.JokerOperationPanel;
		public btnGameInfo:eui.Image;
		public btnGameSeting:eui.Image;
		/**
		 * 门数选择时的状态滚动控制
		 */
		JPCS:joker.JokerPkContenScrolltController;

		public constructor() {
			super();
			this.skinName = "JokerGameModuleSkin";
		}

		createChildren():void {
			super.createChildren();
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			__REGISTER_MEDIATOR(JokerGameMediator,this);

			this.pokerBg.alpha = 0;
			this.pokerComp.visible = false;
			this.JPCS = new JokerPkContenScrolltController();

			this.imgXuanze.visible = false;
			__SEND_NOTIFICATION(JokerGameMediator.GAME_STAET);

			this.bindButton(this.btnGameInfo);
			this.bindButton(this.btnGameSeting);

			this.touchBindButtonHandler
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var target = tag;
			switch(target) {
				case this.btnGameInfo:
					__SEND_NOTIFICATION(joker.JokerGameMediator.GAME_RE_STAET)
					break;
				case this.btnGameSeting:
					break;
			}
		}

		dispose():void {
			__REMOVE_MEDIATOR(JokerGameMediator);
			super.dispose();
		}
	}
}