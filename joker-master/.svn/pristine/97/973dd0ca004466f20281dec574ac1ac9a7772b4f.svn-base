module friend {
    export class FriendMailUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private reqList: eui.List;
        private tipLabel: eui.Label;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "FriendMailUIMoudleSkin";
        }
        onComplete() {
            __REGISTER_MEDIATOR(FriendMailUIMediator,this);
        }
        opening() {
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND_REQUEST);
        }
        initRequestList(data: any[]) {
            this.tipLabel.visible = data? false: true;
            this.reqList.dataProvider = new eui.ArrayCollection(data);
            this.reqList.itemRenderer = FriendMailLabel;
        }
        public dispose(): void {
            __REMOVE_MEDIATOR(FriendMailUIMediator);
            super.dispose();
        }
    }
}