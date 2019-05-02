module happy {
	export class HappyStatUIMediator extends puremvc.Mediator {
		public static NAME: string = "HappyStatUIMediator";
        public constructor(viewComponent: Object = null) {
            super(HappyStatUIMediator.NAME, viewComponent);
        }
        public get view(): HappyStatUIMoudle {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
			var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction
            return [
                netaction.GLXY_RESP_WIN_HISTORY//历史记录
			];
		}
		public handleNotification(notification: puremvc.INotification): void {
         
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
             if(body instanceof  cyvos.GamePackage)
                 var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
			 var proxy = getProxy();
            var act: string = notification.getName();
            switch (act) {
                case netaction.GLXY_RESP_WIN_HISTORY:
                this.view.showEvent(message.data.intValues);
                break;    
			}
		}
	}
}