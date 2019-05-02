module item {
	/**
	 *
	 * @author 
	 *
	 */
    export class PropUIMoudleMediator extends puremvc.Mediator{
        public static NAME: string = "PropUIMoudleMediator";
        public constructor(viewComponent: Object = null) {
            super(PropUIMoudleMediator.NAME,viewComponent);
		}
        public get view(): PropUIMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
               app.NetAction.RE_GET_PROP_ATTRS
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                 this.view.showEvent()
                    break;

                   
               
            }
        }
	}
}
