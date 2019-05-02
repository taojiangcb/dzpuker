module myInfo {
	export class InfoTipEditMediator extends puremvc.Mediator {
		public static NAME: string = "MyInfoUIMoudMediator";
        public constructor(viewComponent: Object = null) {
            super(InfoTipEditMediator.NAME, viewComponent);
		}
        public get view(): InfoTipEditUIMoudleComp {
            return this.viewComponent;
		}
        public listNotificationInterests(): Array<any> {
            return [
                // app.constant.AppMediatorConst.INFO_TIP_UPDATE,
                app.constant.AppMediatorConst.INFO_TIP_UPDATE
                // app.NetAction.RE_SET_PLAY_INFO
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.INFO_TIP_UPDATE:
                // case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;

            }
        }

	}
}