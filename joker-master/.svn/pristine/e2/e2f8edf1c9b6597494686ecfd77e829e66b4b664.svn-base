module friend {
    export class FriendInviteUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__FriendInviteUIMediator__"
        constructor(uicomponent:any = null) {
            super(FriendInviteUIMediator.NAME,uicomponent);
        }
        
        public get view(): FriendInviteUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_INVITE
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.UP_USER_INVITE:
                    this.view.initInviteList(data);
                    break;
                // case consts.UP_USER_FRIEND_FACE2FACE_SUCCESS:
                //     this.view.addFriendsSuccess();
                //     break;
                // default: 
                //     break;
            }
        }
    }
}