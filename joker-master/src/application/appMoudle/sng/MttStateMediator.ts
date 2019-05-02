 module match {

	export class MttStateMediator extends app.mvc.AbstractMediator {

        static NAME:string = "MttStateMediator";
        
        constructor(view:any) {
            super(MttStateMediator.NAME,view);
        }

        public get view(): MttStateMoudle {
            return this.viewComponent ;
		}

        listNotificationInterests():string[] {
            return [
                app.NetAction.RESP_MATCH_RANK
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.NetAction.RESP_MATCH_RANK:
                    this.view.updatePlayersInfoInMatch();
                    break;
            }
        }
    }



 }