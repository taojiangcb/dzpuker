module guide {
    export class GreenHandlerMediator extends app.mvc.AbstractMediator {
        static NAME: string = "__GreenHandlerMediator__"
        constructor(uicomponent:any = null) {
            super(GreenHandlerMediator.NAME, uicomponent);
        }
        
        public get view(): GreenHandlerUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                mission.MissionMediator.ADD_MISSION
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case mission.MissionMediator.ADD_MISSION:
                    this.view.updateGoldTreeMission();
                    break;
            }
        }
    }
}