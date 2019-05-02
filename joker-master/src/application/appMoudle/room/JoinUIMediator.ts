module room {

    export class JoinUIMediator extends puremvc.Mediator {
        
        public static NAME: string = "JoinUIMediator";

		public constructor(viewComponent: Object = null) {
            super(JoinUIMediator.NAME,viewComponent);
        }

        public get view(): JoinMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                app.constant.AppMediatorConst.MATCH_NONEOPEN
                // app.NetAction.RE_LEAVE_ROOM,
                // app.NetAction.RE_JOIN_ROOM_COMPLETE,
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            
            switch(notification.getName()) {
                
                // case app.NetAction.RE_LEAVE_ROOM:
                //     this.view.gotoVipRoom();
                //     break;
                
                // case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    // this.view.autoSit();
                    // break;

                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    var roomVO = this.view.parseRoomVoFromInput();
                    if(roomVO==null) break;
                    if (roomVO.isVip) {
                        user.getProxy().PKDragInRoom = roomVO.maxBank;
                        user.gotoRoom(roomVO);
                    } else {
                        if(playcards.getProxy().isPlayCard) {
                            uicomps.confirmNeedSilver(true,roomVO.minBank,roomVO.maxBank,false,true,true,(val:number)=>{
                                if(val > 0) {
                                    //**进房间前把带入额缓存下*/
                                    user.getProxy().PKDragInRoom = val;
                                    user.gotoRoom(roomVO);
                                }
                                else {
                                    //退出打牌
                                    playcards.getProxy().outbakfun();
                                }
                            },this);
                        }
                    }
                    break;

            }
        }
	}
}
