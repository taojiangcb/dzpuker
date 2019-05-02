module friend {
    export class FriendInviteUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private inviteList: eui.List;
        private inviteButton: eui.Image;
        private data: eui.ArrayCollection;
        private tipLabel: eui.Label;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.width = 650;
            this.height = 450;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "FriendInviteUISkin";
        }
        onComplete() {
            __REGISTER_MEDIATOR(FriendInviteUIMediator,this);
            this.bindButton(this.inviteButton);
        }
        opening() {
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
        }
        initInviteList(data: any[]) {
            // var datasec: any[] = [];
            // for (var i = 0; i < data.length; i++) {
            //     if (data[i].status == user.ROOM_TYPE.NULL) {
            //         data[i]["type"] = LABEL_TYPE.INVITE;
            //         datasec.push(data[i]);
            //     }
            // }
            // this.tipLabel.visible = datasec.length > 0? false: true;
            // this.data = new eui.ArrayCollection(datasec);
            // this.inviteList.dataProvider = this.data;
            // this.inviteList.itemRenderer = FriendLabel;
            this.tipLabel.visible = data.length > 0? false: true;
            this.inviteButton.visible = data.length > 0? true: false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = LABEL_TYPE.INVITE;
            }
            data.sort(function(a,b) {
                if (a.status == user.ROOM_TYPE.NULL) return -1;
                if (b.status == user.ROOM_TYPE.NULL) return 1;
                return b.status - a.status;
            })
            this.data = new eui.ArrayCollection(data);
            this.inviteList.dataProvider = this.data;
            this.inviteList.itemRenderer = FriendLabel;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.inviteButton:
                    if (this.inviteList.numChildren == 0) return;
                    var data: string[] = [];
                    data.push(playcards.getProxy().joinNumber);
                    data.push(user.getProxy().svrName);
                    for (var i = 0; i < this.inviteList.numChildren; i++) {
                        var friendLabel = <FriendLabel>this.inviteList.getChildAt(i);
                        if (friendLabel.checkBox.selected) {
                            data.push(friendLabel.data.fid.toString());
                        }
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_INVITE_FRIEND, data);
                    this.close();
                    break;
                default:
                    break;
            }
        }
        public dispose(): void {
            __REMOVE_MEDIATOR(FriendInviteUIMediator);
            super.dispose();
        }
    }
}