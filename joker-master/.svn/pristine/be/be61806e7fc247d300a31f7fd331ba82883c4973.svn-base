module myInfo {
    /**
     *打牌中的玩家信息
     * @author 
     *
     */
    export class PokerReportUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        public bgimage: eui.Rect;
        private btn2:eui.Button;
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/pokerInfo/PokerReportUIMoudleSkin.exml";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage,false);
            this.bindButton(this.btn2);
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.bgimage:
                case this.btn2:
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
