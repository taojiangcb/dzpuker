module head {
	/**
	 *
	 * @author 
	 *
	 */
    export class HeadUIMoudMediator extends puremvc.Mediator{
        public static NAME: string = "HeadUIMoudMediator";
        public constructor(viewComponent: Object = null) {
            super(HeadUIMoudMediator.NAME,viewComponent);
		}
        public get view(): HeadReplaceUIMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
                app.NetAction.RE_SET_HEAD_INFO,
                app.NetAction.RE_GET_HEAD_INFO
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_SET_HEAD_INFO:
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("HEAD_CHANGE_TIPS"),tip.TIPS_TYPE.TIPS_CORRECT);//
                    this.view.changeEvent();
                    break;
                case app.NetAction.RE_GET_HEAD_INFO:
                    this.view.changeEvent();
                    break;
            }
        }
        
	}
}
