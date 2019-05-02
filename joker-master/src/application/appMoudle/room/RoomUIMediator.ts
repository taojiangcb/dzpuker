module room {

    export class RoomUIMediator extends puremvc.Mediator {
        
        public static NAME: string = "RoomUIMediator";
		public constructor(viewComponent: Object = null) {
            super(RoomUIMediator.NAME,viewComponent);
        }
        public get view(): RoomMoudle {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                app.NetAction.RE_TOOL_NUMPLAYERS,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.UPDATE_COIN,
                // app.NetAction.RESP_DEALER_INFO,
                app.constant.AppMediatorConst.DEALERLIST_UPDATE,
                app.constant.AppMediatorConst.PLAYER_NUMBER_UPDATE,
                mission.MissionMediator.UPDATE_MISSION_DAY_UI
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case app.NetAction.RE_TOOL_NUMPLAYERS:
                    this.view.updateRoomList();
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (room.getProxy().currentType==room.TYPE.GRIL){
                        user.getProxy().autoSit(1,false);
                    }
                    // this.view.updateVipTable();
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    this.view.updateCoin();
                    break;
                // case app.NetAction.RESP_DEALER_INFO:
                //     console.log("dealer");
                //     break;
                case consts.DEALERLIST_UPDATE:
                    this.view.updateDealerList(data);
                    break;
                case consts.PLAYER_NUMBER_UPDATE:
                    this.view.sortDealerList();
                    break;
                case mission.MissionMediator.UPDATE_MISSION_DAY_UI:
                    this.view.updateFreeBrokeMission();
                    break;
            }
        }
        
		
	}
}
