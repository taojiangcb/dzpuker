module myInfo {
	/**
	 *
	 * @author 
	 *
	 */
    export class PokerInfoUIMoudMediato extends puremvc.Mediator{
        public static NAME: string = "PokerInfoUIMoudMediato";
        public constructor(viewComponent: Object = null) {
            super(PokerInfoUIMoudMediato.NAME,viewComponent);
		}
        public get view(): PokerInfoUIMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,
                app.constant.AppMediatorConst.UP_USER_FRIEND
               // app.constant.AppMediatorConst.DELETE_RECORD_DATA
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.UPDATE_COIN :
                case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;
                    
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                
                    this.view.showEvent(notification.getBody());
                    break;
                case app.constant.AppMediatorConst.UP_USER_FRIEND:
                    this.view.updateFriend(data);
                    break;
            }
        }
	}
}
