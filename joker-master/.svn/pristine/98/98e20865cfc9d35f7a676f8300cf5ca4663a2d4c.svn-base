module friend {
    export class FriendFaceAddUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__FriendFaceAddUIMediator__"
        constructor(uicomponent:any = null) {
            super(FriendFaceAddUIMediator.NAME,uicomponent);
        }
        
        public get view(): FriendFaceAddUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_FRIEND_FACE2FACE,
                consts.UP_USER_FRIEND_FACE2FACE_SUCCESS
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.UP_USER_FRIEND_FACE2FACE:
                    this.view.enterRoom(data);
                    break;
                case consts.UP_USER_FRIEND_FACE2FACE_SUCCESS:
                    this.view.addFriendsSuccess();
                    break;
                default: 
                    break;
            }
        }
    }
}