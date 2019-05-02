module myInfo {
/**
 *打牌中的玩家信息
 * @author 
 *
 */
    export class PokerGPSUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        public bgimage: eui.Rect;
    	public constructor() {
        	super();
            this.skinName = "resource/app_skin/pokerInfo/PokerGPSUIMoudleSkin.exml";
    	}
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage)
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.bgimage:
                    this.clickBackEvent()
                    break;
                }
        }
        private clickBackEvent(): void {
            this.close();
        }
        public dispose(): void {
            super.dispose();
        }
	}
}
