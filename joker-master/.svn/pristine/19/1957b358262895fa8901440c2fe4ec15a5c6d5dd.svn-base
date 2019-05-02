module mail {
    export class MailUIMediator extends app.mvc.AbstractMediator {
        static NAME: string = "__MailUIMediator__"
        constructor(uicomponent: any = null) {
            super(MailUIMediator.NAME,uicomponent);
        }

        public get view(): MailUIMoudle {
            return this.viewComponent;
        }
        
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.IMS_GETS,
                app.constant.AppMediatorConst.IMS_READ
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.IMS_GETS:
                    this.view.initList();
                    break;
                case app.constant.AppMediatorConst.IMS_READ:
                    this.view.refreshData();
                    break;
                default:
                    break;
            }
        }
    }
}