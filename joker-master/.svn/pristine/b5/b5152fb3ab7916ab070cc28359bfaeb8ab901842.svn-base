module happy {
	/**
	 *
	 * @author 
	 *
	 */
    export class HappyRoomMediator extends puremvc.Mediator{
        public static NAME: string = "HappyRoomMediator";
        public constructor(viewComponent: Object = null) {
            super(HappyRoomMediator.NAME,viewComponent);
		}
        public get view(): HappyRoomUIMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
                app.NetAction.TOOL_NUMPLAYERS,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.TOOL_NUMPLAYERS:
                    this.view.showRoomEvent();
                    break;
            }
        }
        
	}
}
