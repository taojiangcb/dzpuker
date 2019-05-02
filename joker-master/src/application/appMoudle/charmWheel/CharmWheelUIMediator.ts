module charmWheel {
    export class CharmWheelUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "CharmWheelUIMediator"
        constructor(uicomponent:any = null) {
            super(CharmWheelUIMediator.NAME,uicomponent);
        }
        
        public get view(): CharmWheelUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.CHARM_WHEEL_START,
                consts.UP_PLAY_INFO_DATA,
                consts.CHARM_WHEEL_MY_RECORD,
                consts.CHARM_WHEEL_OTHER_RECORD
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.CHARM_WHEEL_START:
                    this.view.start(data);
                    break;
                case consts.UP_PLAY_INFO_DATA:
                    this.view.setCharmValue();
                    break;
                case consts.CHARM_WHEEL_MY_RECORD:
                    this.view.refreshMyRecord(data);
                    break;
                case consts.CHARM_WHEEL_OTHER_RECORD:
                    this.view.refreshAllRecord(data);
                    break;
                default: 
                    break;
            }
        }
    }
}