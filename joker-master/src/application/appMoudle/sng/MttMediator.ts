module match {
	/**
	 *
	 * @author 
	 *
	 */
    export class MttMediator extends puremvc.Mediator{

        public static NAME: string = "MttMediator";

        public constructor(viewComponent: Object = null) {
            super(MttMediator.NAME,viewComponent);
		}

        public get view(): MttMoudle{
            return this.viewComponent ;
		}

        public listNotificationInterests(): Array<any> {
            return [
               app.NetAction.RE_GET_PROP_ATTRS,
               app.NetAction.RE_TOOL_RILVER,
               app.NetAction.MTT_RESPSIGNUP,
               app.NetAction.MTT_UPDATEMATCHSIGNUPS,
               app.constant.AppMediatorConst.UPDATE_MATCH_LIST,
               app.constant.AppMediatorConst.SIGNUP_SUCCESS
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                case app.NetAction.MTT_UPDATEMATCHSIGNUPS:
                case app.NetAction.MTT_RESPSIGNUP:
                case app.constant.AppMediatorConst.UPDATE_MATCH_LIST:
                    this.view.updateData();
                    break;
                case app.NetAction.RE_TOOL_RILVER:
                    this.view.updateCoin();
                    break;
                case app.constant.AppMediatorConst.SIGNUP_SUCCESS:
                    this.view.tabToMyList();
                    break;

            }
        }
	}
}