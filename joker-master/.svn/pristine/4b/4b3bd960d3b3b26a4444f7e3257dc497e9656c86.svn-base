module room {

    export class CreateUIMediator extends puremvc.Mediator {
        
        public static NAME: string = "CreateUIMediator";
		public constructor(viewComponent: Object = null) {
            super(CreateUIMediator.NAME,viewComponent);
        }
        public get view(): CreateMoudle {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                // app.NetAction.RE_LEAVE_ROOM,
                // app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.MATCH_NONEOPEN
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            
            switch(notification.getName()) {
                
                case app.NetAction.RE_LEAVE_ROOM:
                    this.view.gotoVipRoom();
                    break;
                
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    // this.view.autoSit();
                    if (room.getProxy().currentType == room.TYPE.VIP) {
                        if(playcards.getProxy().joinNumber==null) {
                            user.getProxy().autoSit();
                        } else {
                            user.getProxy().vipSit(playcards.getProxy().joinNumber);
                        }
                        break;
                    }
                    this.view.close();
                    break;

                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    this.view.openPlayCall();
                    break;


            }
        }
        
		
	}
}
