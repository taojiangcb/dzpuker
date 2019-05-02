module dealerInfo {
    export class DealerInfoUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__DealerInfoUIMediator__"
        constructor(uicomponent:any = null) {
            super(DealerInfoUIMediator.NAME,uicomponent);
        }
        public get view(): DealerInfoUIMoudle {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_PLAY_INFO_DATA,
                consts.DEALERINFO_UPDATE
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.UP_PLAY_INFO_DATA:
                    this.view.updatePlayInfo(data);
                    break;
                case consts.DEALERINFO_UPDATE:
                    this.view.updateDealerInfo(data);
                    break;
                default: 
                    break;
            }
        }
    }
}