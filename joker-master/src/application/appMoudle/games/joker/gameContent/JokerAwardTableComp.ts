module joker {
	export class JokerAwardTableComp extends gameabc.UICustomComponent {
		public constructor() {
			super();
			this.skinName = "resource/app_skin/joker/JokerAwardTableComp.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
		}
	}
}