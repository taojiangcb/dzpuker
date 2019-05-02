module friend {
    export class FriendInfoUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private deleteLabel: eui.Label;
        private friendId: number;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "PokerInfoUIMoudleSkin";
        }
        onComplete() {
            this.deleteLabel = new eui.Label;
            this.deleteLabel.text = "删除好友";
            this.deleteLabel.left = 20;
            this.deleteLabel.bottom = 50;
            this.addChild(this.deleteLabel);
            this.bindButton(this.deleteLabel);
        }
        opening() {
            this.friendId = this.uiOpenData;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.deleteLabel:
                    __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_DELETE, this.friendId);
                    this.close();
                    break;
                default:
                    break;
            }
        }
    }
}