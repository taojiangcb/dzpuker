module sng {
	/**
	 *
	 * @author 
	 *
	 */
    export class SngMediator extends puremvc.Mediator{
        public static NAME: string = "SngMediator";
        public constructor(viewComponent: Object = null) {
            super(SngMediator.NAME,viewComponent);
		}
        public get view(): sng.SngMoudle
		{
            return this.viewComponent ;
		}
        public listNotificationInterests(): Array<any> {
            return [
               app.NetAction.RE_GET_PROP_ATTRS,
               app.NetAction.RE_TOOL_RILVER,
               app.constant.AppMediatorConst.UPDATE_MATCH_LIST,
               app.NetAction.SNG_UPDATEMATCHSIGNUPS
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                case app.constant.AppMediatorConst.UPDATE_MATCH_LIST:
                case app.NetAction.SNG_UPDATEMATCHSIGNUPS:
                    this.view.updateData();
                    break;
                case app.NetAction.RE_TOOL_RILVER:
                    this.view.updateCoin();
                    break;
            }
        }
	}
}