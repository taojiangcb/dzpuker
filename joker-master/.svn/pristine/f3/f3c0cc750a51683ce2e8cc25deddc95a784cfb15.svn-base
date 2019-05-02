module main {
	/**
	 *
	 * @author 
	 *
	 */
    export class AppMainUIMediator extends puremvc.Mediator {
        public static NAME: string = "AppMainUIMediator";
        public constructor(viewComponent: Object = null) {
            super(AppMainUIMediator.NAME, viewComponent);
        }
        public get view(): AppMainUIMoudelComp {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION,
                app.constant.AppMediatorConst.UPDATE_COIN,
                app.NetAction.RE_GET_HEAD_INFO,
                app.NetAction.RE_SET_HEAD_INFO,
                app.constant.AppMediatorConst.UP_USER_INFO_DATA,
                app.constant.AppMediatorConst.NOTICE_INIT,
                app.constant.AppMediatorConst.IMS_READ_NUM,
                app.constant.AppMediatorConst.GAME_OUT,
                app.constant.AppMediatorConst.UP_FRIEND_INVITE,
                app.NetAction.RE_JOIN_ROOM_COMPLETE,
                app.NetAction.RESP_REFRESH_MAIL
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
                    this.view.restartGame();
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                case app.NetAction.RE_SET_HEAD_INFO:
                case app.NetAction.RE_GET_HEAD_INFO:
                case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
                    this.view.showDate();
                    break;
                case app.NetAction.RE_LEAVE_ROOM:
                    room.getProxy().fastRoom();
                    //this.view.gotoRoom();
                    break;
                case app.constant.AppMediatorConst.NOTICE_INIT:
                    this.view.initNotice(data);
                    break;
                case app.constant.AppMediatorConst.IMS_READ_NUM:
                    tip.updateTip(AppConst.COUNT_SUB_TAG.MAIL_MOUDLE, data);
                    break;
                case app.constant.AppMediatorConst.GAME_OUT:
                    break;
                case app.constant.AppMediatorConst.UP_FRIEND_INVITE:
                    user.getProxy().friendRoomid = parseInt(data[0]);
                    user.getProxy().joinRoom(room.getProxy().getRoomVOByJoinNumber(data[0]));
                    break;
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    if (user.getProxy().friendRoomid !== null) {
                        user.getProxy().vipSit(user.getProxy().friendRoomid.toString());
                    }
                    break;
                case app.NetAction.RESP_REFRESH_MAIL:
                    this.view.getMailNum();
                    break;
            }
        }
	}
}
