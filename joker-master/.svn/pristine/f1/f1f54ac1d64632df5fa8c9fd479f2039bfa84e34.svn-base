module login {

    export class LoginUIMediator extends puremvc.Mediator {
        
        public static NAME: string = "LoginUIMediator";
		public constructor(viewComponent: Object = null) {
            super(LoginUIMediator.NAME,viewComponent);
        }
        public get view(): LoginMoudle {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.LOGIN_ACTION,
                consts.LOGIN_FAILED,
                consts.LOGIN_MESS,
                consts.LOGIN_SUCESS_TOHER,
                consts.UPDATE_COIN,
                consts.GAME_CONFIG,
                app.NetAction.SRS_ALL_ERROR,
                app.NetAction.SRS_ERROR
            ];
        }
        
        
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.LOGIN_ACTION:
                    if(!AppGlobal.isLoginFlag) {
                        this.view.inLogin = false;
                        this.view.loginSuccess();
                    }
                    break;
                case consts.GAME_CONFIG:
                    if(!this.view.inLogin&&AppGlobal.isLoginFlag) {
                        this.view.loginSuccess();
                    }
                    break;    
                case app.NetAction.SRS_ALL_ERROR:
                    tip.Alert.show("服务器正在维护中");
                case app.NetAction.SRS_ERROR:
                case consts.LOGIN_FAILED:
                    this.view.inLogin = false;
                    this.view.loginFailed();
                    break;
                case consts.LOGIN_MESS:
                    this.view.setMess(data);
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    this.view.rilverUpdate();
                    break;
                case consts.LOGIN_SUCESS_TOHER: //第三方平台登录游戏      
                    user.getProxy().loginUserType = user.LOGIN_TYPE.PLATMENT;
                    user.getProxy().loginName = data.uid;
                    user.getProxy().loginPass = data.session+"|1026|"+data.thirdparty;
                    this.view.loginEvent(false);
                    this.view.notCanCacheID$PD = true;    //不记录账号信息
                    AppConst.LOGING_CAN_BOOL = false;
                    gameabc.LocalSO.setItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE, user.LOGIN_TYPE.PLATMENT);
                    break;    
            }
        }
	}
}
