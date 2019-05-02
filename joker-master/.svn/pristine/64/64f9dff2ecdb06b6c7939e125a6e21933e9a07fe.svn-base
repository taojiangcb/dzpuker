/**
 * Created by taojiang on 16/9/13.
 */
module room {
    export class CreatePKMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__CREATE_PK_MEDIATOR__";

        constructor(view:any){
            super(CreatePKMediator.NAME,view)
        }

        listNotificationInterests():string[] {
            return [
                app.constant.AppMediatorConst.MATCH_NONEOPEN,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN
            ]
        }

        handleNotification(notification:puremvc.INotification):void {
            var name:string = notification.getName();
            switch(name) {
                case app.constant.AppMediatorConst.MATCH_NONEOPEN:
                    var uiView:CreatePKRoomUIMoudle = <CreatePKRoomUIMoudle>__GET_MOUDLE_COMP(AppReg.CREATE_PK_ROOM);
                    if(uiView) {
                        uiView.openPlayCall();
                    }
                    break;

                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (room.getProxy().currentType == room.TYPE.PK 
                    || room.getProxy().currentType == room.TYPE.VIP) {
                        if(playcards.getProxy().joinNumber==null) {
                            user.getProxy().autoSit();
                        } else {
                            user.getProxy().vipSit(playcards.getProxy().joinNumber);
                        }
                        break;
                    }

                /**PK房输光了站起,然后从新坐下时的带入操作处理*/
                case app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN:
                    var curRoom:appvos.RoomVO = room.getProxy().current;
                    if(curRoom ) {
                        if (room.getProxy().currentType == room.TYPE.PK && playcards.getProxy().isPlayCard) {
                            uicomps.confirmNeedSilver(true, curRoom.minBank, curRoom.maxBank,false, true, false, (val:number)=> {
                                if (val > 0) {
                                    user.getProxy().PKDragInRoom = val;
                                    __PVO().i(user.getProxy().PKDragInRoom).to(app.NetAction.MATCH_TAKEIN);
                                }
                                else {
                                    //退出打牌
                                    playcards.getProxy().outbakfun();
                                }
                            }, this)
                        }
                    }
                    break;
            }
        }
    }
}