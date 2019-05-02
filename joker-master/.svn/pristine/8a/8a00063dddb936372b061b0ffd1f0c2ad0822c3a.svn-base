module bank {
	/**
	 *
	 * @author 
	 *
	 */
    export class BankUIMoudMediator extends puremvc.Mediator{
        public static NAME: string = "BankUIMoudMediator";

        static BANK_HTTP_RESPONSE:string = "BANK_HTTP_RESPONSE";

        public constructor(viewComponent: Object = null) {
            super(BankUIMoudMediator.NAME,viewComponent);
		}

        public get view(): BankUIMoudle {
            return this.viewComponent ;
		}

        public listNotificationInterests(): Array<any> {
            return [
                app.NetAction.RE_TRANSFER_SILVER,
                app.NetAction.RE_JOIN_ROOM,
                app.NetAction.RE_TOOL_TEMP_SESSION,
                bank.BankUIMoudMediator.BANK_HTTP_RESPONSE
               // app.constant.AppMediatorConst.MY_MODIFY_INFO_UPDATA,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RE_TRANSFER_SILVER : 
                    this.view.showEvent();
                    break;
                case app.NetAction.RE_JOIN_ROOM:
                    this.view.showEvent();
                    break;
                case app.NetAction.RE_TOOL_TEMP_SESSION:
                    this.view.okSetEvent();
                    break;
                case BankUIMoudMediator.BANK_HTTP_RESPONSE:
                    var jsonData:any = notification.getBody()
                     __CLOSE_PRELOAD();
                    if(jsonData.error)
                    {  
                        tip.popSysCenterTip(jsonData.erro,tip.TIPS_TYPE.TIPS_WARNING);
                    } 
                    else {
                         this.uiModule.quickAccount.responseEvent( jsonData.url,jsonData.response)
                    }
                    break;
                    
            }
        }

         get uiModule(): bank.BankUIMoudle {
            return <bank.BankUIMoudle>__GET_MOUDLE_COMP(AppReg.APP_BANK);
        }
        
	}
}
