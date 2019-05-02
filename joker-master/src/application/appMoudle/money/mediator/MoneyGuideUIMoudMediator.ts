module money {
	/**
	 *
	 * @author 
	 *
	 */
    export class MoneyGuideUIMoudMediator extends puremvc.Mediator{

        public static NAME: string = "MoneyGuideUIMoudMediator";
        public static BANK_HTTP_RESPONSE:string = "MoneyGuideUIMoudMediator";

        public constructor(viewComponent: Object = null) {
            super(MoneyGuideUIMoudMediator.NAME,viewComponent);
		}

        public get view(): MoneyGuideUIMoudle {
            return this.viewComponent ;
		}

        public listNotificationInterests(): Array<any> {
            return [
                app.NetAction.RE_TOOL_TEMP_SESSION,
                app.constant.AppMediatorConst.UP_USER_INFO_DATA,
                bank.BankUIMoudMediator.BANK_HTTP_RESPONSE
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_TOOL_TEMP_SESSION:
                    this.view.okSetEvent();
                    break;

                 case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
                    this.view.showEvent();
                    break;

                 case bank.BankUIMoudMediator.BANK_HTTP_RESPONSE:
                    var jsonData:any = notification.getBody()
                    //  __CLOSE_MOUDLE(AppReg.PRELOAD);
                     __CLOSE_PRELOAD();
                    if(jsonData.error) {  
                        tip.popSysCenterTip(jsonData.erro,tip.TIPS_TYPE.TIPS_WARNING);
                    } else {
                        this.uiModule.quickAccount.responseEvent(jsonData.url,jsonData.response)
                    }
                    break;
            }
        }

        get uiModule(): money.MoneyGuideUIMoudle {
            return <money.MoneyGuideUIMoudle>__GET_MOUDLE_COMP(AppReg.APP_MONEY);
        }
	}
}
