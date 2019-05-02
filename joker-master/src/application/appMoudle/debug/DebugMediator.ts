module app.debug {
	/**
	 *
	 * @author 
	 *
	 */
    export class DebugMediator extends puremvc.Mediator {
        
        public static NAME: string = "DebugMediator";
        
        public constructor(viewComponent: Object = null) {
            super(DebugMediator.NAME, viewComponent);
        }
        
        public get view(): DebugView {
            return this.viewComponent;
        }
        
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.LOG_DEBUG
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.LOG_DEBUG:
                    this.view.outputLabel.text = data;
                    break;
                
            }
        }
	}
}
