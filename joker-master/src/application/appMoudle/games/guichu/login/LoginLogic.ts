module guichu {

	var loginLogic:LoginLogic;
	/**
	 * 获取当前登录逻辑单例
	 */
	export function loginLogiC():LoginLogic {
		if(loginLogic == null) {
			loginLogic = new LoginLogic();
		}
		return loginLogic;
	}

	export class LoginLogic implements games.ILogin {

		/**
		 * 游戏中的业务逻辑处理
		 */
		private gamelogic:GuiChuLogic;

		public constructor() {
			this.gamelogic = guichu.gameLogic();
		}

		
		getUserType():number {
		   /**
		 	* 平台登录都要传0,现在两边平台统一了
		 	*/
			return user.LOGIN_TYPE.GAMETEA;
			//  if($GAME_ID$ == GAME_IDS.BF_GUICHU_WHEEL) {
			// 	 return user.LOGIN_TYPE.PTGAME 
			//  } 
			//  else if($GAME_ID$ == GAME_IDS.GUICHU_WHEEL) {
			// 	 return user.LOGIN_TYPE.GAMETEA
			//  }
		}

		/**
		 * 用户登录
		 * 
		 */
		onLogin(ip:cy.SrsIp,usrName:string,usrPwd:string,platformType:number = user.LOGIN_TYPE.GAMETEA,hardwareId:string=""):void {
			__OPEN_PRELOAD();
			user.getProxy().loginUserType = platformType;
			user.getProxy().loginName = usrName;
			if(platformType == user.LOGIN_TYPE.SESSION) {
				user.getProxy().svrSession = usrPwd;
			}
			user.getProxy().loginPass = usrPwd;
			user.getProxy().hardwareId = hardwareId;
			app.mvc.AppFacade.getInstance().removeCommand(app.NetAction.SRS_CLOSE);
			AppConst.setServer(ip);
			room.setServer(ip.roomType);
			cy.connectSrsServer(ip);
		}

		/**
		 * 登录成功
		 */
		onLoginSucceed():void {
			if(!AppGlobal.isLoginFlag) {
				console.log("登录成功");
				AppGlobal.isLoginFlag = true;
				app.mvc.AppFacade.getInstance().registerCommand(app.NetAction.SRS_CLOSE, cy.ConnectCommands);
				user.getProxy().loginDataInit();
				// this.gamelogic.openBankRemaining();
				this.autoJoinRoom();
			}		
		}
		
		//进入房间
		autoJoinRoom():void {
			var roomData:appvos.RoomVO[] = [];
			if(cy.srsServer.connectSrs.roomType == room.CONFIG.AUTO_SRS) {
				roomData = room.getProxy().zRoom1;
			}
			else if(cy.srsServer.connectSrs.roomType == room.CONFIG.PUBLIC) {
				 roomData = room.getProxy().pRoom1;
			}
			else {
				roomData = room.getProxy().mRoom1;
			}
			user.getProxy().joinRoom(roomData[0]);
		}

		/**
		 * 进入房间成功
		 */
		onRoomSucceed() {
			__CLOSE_PRELOAD();
			__CLOSE_ALLMOUDLE_OPEN(AppReg.GUICHU);
			/**发送心跳协议 */
			this.gamelogic.beginHeart();
		}

		/**
		 * 注消
		 */
		onLoginOut():void {
			this.gamelogic.stopHeart();
			guichu.getProxy().dispose();
			AppGlobal.isLoginFlag = false;
		}

		onLoginError(agin:boolean):void {
			this.gamelogic.stopHeart();
			__CLOSE_PRELOAD()

			if(agin) {
				__SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
			}
		}

		 //********如果5秒自定义模块没有返回信息就强行进入登录**********
        forceId:number = 0;
        forceLogin():void {
            this.forceId = egret.setTimeout(()=> {
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_ACTION);
            }, this, 100);
        }

        clearforceLogin():void {
            egret.clearTimeout(this.forceId);
        }
	}
}