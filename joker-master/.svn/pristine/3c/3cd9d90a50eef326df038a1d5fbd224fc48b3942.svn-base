module treasure {
    export class TreasureSubUIMediator extends app.mvc.AbstractMediator {
        static NAME: string = "TreasureSubUIMediator";

        constructor(uicomponent:any = null) {
            super(TreasureSubUIMediator.NAME,uicomponent);
        }

        get view(): TreasureSubUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.TREASURE_TREASURE_RECORDS,
                consts.TREASURE_DO_TREASURE,
                consts.TREASURE_FAIL
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.TREASURE_TREASURE_RECORDS:
                    this.view.initList(data);
                    break;
                case consts.TREASURE_DO_TREASURE:
                    this.view.initList(data);
                    this.view.setBuying(false);
                    this.view.updateCoin();
                    break;
                case consts.TREASURE_FAIL:
                    this.view.treasureFail();
                    break;
                default: 
                    break;
            }
        }
    }
}