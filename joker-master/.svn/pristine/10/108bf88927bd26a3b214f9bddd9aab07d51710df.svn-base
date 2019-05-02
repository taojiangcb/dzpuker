module myInfo {
	/**
	 *
	 * @author 
	 *
	 */
    export class MyInfoUIMoudMediator extends puremvc.Mediator{
        public static NAME: string = "MyInfoUIMoudMediator";
        public constructor(viewComponent: Object = null) {
            super(MyInfoUIMoudMediator.NAME,viewComponent);
		}
        public get view(): MyInfoUIMoudleComp
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.NetAction.RE_SET_PLAY_INFO
               // app.constant.AppMediatorConst.MY_MODIFY_INFO_UPDATA,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.UPDATE_COIN :
                case app.NetAction.RE_SET_PLAY_INFO:
                    this.view.showEvent();
                    break;
                    
            }
        }
        
	}
}
