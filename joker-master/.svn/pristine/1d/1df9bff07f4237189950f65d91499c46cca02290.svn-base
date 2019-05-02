module guichu {
	export class LoginMediator extends app.mvc.AbstractMediator {
		static NAME:string = "__GUICHU_LOGIN_MEDIATOR__";

		/**
		 * 登录时的业物逻辑处理
		 */
		loginC:LoginLogic;

		public constructor(name:string,ui?:any) {
			super(LoginMediator.NAME,ui);
			this.loginC = guichu.loginLogiC();
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
                consts.FORCE_LOGIN,
                app.NetAction.SRS_ALL_ERROR,
                app.NetAction.SRS_ERROR,
                app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED,		//进和房间成功	
				app.constant.AppMediatorConst.LOGIN_OUT,				//注消
				app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION,		//重新登录
                app.constant.AppMediatorConst.JOIN_ROOM_FAULT           //进入房间失败
            ];
        }
        
        
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.FORCE_LOGIN:
                    loginLogiC().forceLogin();
                    break;
                case consts.LOGIN_ACTION:
                    this.loginC.onLoginSucceed();
                    break;
                case consts.GAME_CONFIG:
                    break;    
                case app.NetAction.SRS_ALL_ERROR:
                    tip.Alert.show("服务器正在维护中","登陆",tip.CONFIRM,(type:number)=>{
                        this.loginC.onLoginError(type == tip.YES);
                    },null,this);
                case app.NetAction.SRS_ERROR:
                case consts.LOGIN_FAILED:
                    var failMsg:string = notification.getBody();
                    if(failMsg) {
                        tip.Alert.show(failMsg,"登陆",tip.CONFIRM,(type:number)=>{
                            this.loginC.onLoginError(type == tip.YES);
                        },null,this)
                    } 
                    else {
                        this.loginC.onLoginError(false);
                    }
                    break;
                case app.constant.AppMediatorConst.JOIN_ROOM_FAULT:
                    var flag:number = notification.getBody();
                    if(flag == 1) {
                        tip.Alert.show("进入房间超时，进入房间失败","登陆",tip.CONFIRM,(type:number)=>{
                            this.loginC.onLoginError(type == tip.YES);
                        },null,this)
                    } 
                    else {
                        this.loginC.onLoginError(false);
                    }
                case consts.LOGIN_MESS:
                    // this.view.setMess(data);
                    break;
                case app.constant.AppMediatorConst.UPDATE_COIN:
                    // this.view.rilverUpdate();
                    break;
                case consts.LOGIN_SUCESS_TOHER: //第三方平台登录游戏      
                    // user.getProxy().loginUserType = user.LOGIN_TYPE.PLATMENT;
                    // user.getProxy().loginName = data.uid;
                    // user.getProxy().loginPass = data.session+"|1026|"+data.thirdparty;
                    // this.view.loginEvent(false);
                    // this.view.notCanCacheID$PD = true;    //不记录账号信息
                    // AppConst.LOGING_CAN_BOOL = false;
                    // gameabc.LocalSO.setItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE, user.LOGIN_TYPE.PLATMENT);
                    break;    
                case app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED:
					guichu.loginLogiC().onRoomSucceed(); 
					break;
				case app.constant.AppMediatorConst.LOGIN_OUT:
					guichu.loginLogiC().onLoginOut();
					break;
				case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
					guichu.loginLogiC().onLoginOut();
					guichu.gameLogic().gameStart();
					break;
            }
        }
	}
}