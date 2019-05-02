module friend {
    export class FriendUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__FriendUIMediator__"
        constructor(uicomponent:any = null) {
            super(FriendUIMediator.NAME,uicomponent);
        }
        
        public get view(): FriendUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_USER_FRIEND,
                consts.UP_USER_SEARCH,
                consts.DEALERFOCUSLIST_UPDATE,
                consts.DEALERLIST_UPDATE
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.UP_USER_FRIEND:
                    this.view.initFriendList(data);
                    break;
                case consts.UP_USER_SEARCH:
                    this.view.getSearchResult(data);
                    break;
                case consts.DEALERFOCUSLIST_UPDATE:
                    this.view.updateDealerFollowGroup(data);
                    break;
                case consts.DEALERLIST_UPDATE:
                    this.view.openDealerOnlineList(data);
                    break;
            }
        }
    }
}