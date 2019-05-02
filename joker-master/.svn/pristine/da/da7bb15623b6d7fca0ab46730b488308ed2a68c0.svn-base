module friend {
    export class FriendMailUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__FriendMailUIMediator__"
        constructor(uicomponent:any = null) {
            super(FriendMailUIMediator.NAME,uicomponent);
        }
        
        public get view(): FriendMailUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_REQUEST
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.UP_USER_REQUEST:
                    this.view.initRequestList(data);
                default: 
                    break;
            }
        }
    }
}