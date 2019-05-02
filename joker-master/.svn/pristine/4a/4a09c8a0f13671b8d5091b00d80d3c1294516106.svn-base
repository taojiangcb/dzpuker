module feed {
	/**
	 *
	 * @author 
	 *
	 */
    export class FeedUIMoudleMediator extends puremvc.Mediator{
        public static NAME: string = "FeedUIMoudleMediator";
        public constructor(viewComponent: Object = null) {
            super(FeedUIMoudleMediator.NAME,viewComponent);
		}
        public get view(): FeedUIMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                
                    break;

                   
               
            }
        }
	}
}
