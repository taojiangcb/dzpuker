module games {
	export class GameBaseLogin implements games.ILogin,gameabc.IDisposer {
		public constructor() {
		}

		getUserType():number {
			return user.LOGIN_TYPE.GAMETEA;
		}

		/**
		 * 用户登录实现
		 * 
		 * ip 连接的srs ip
		 * userName 账号
		 * usrPwd   密码|session|other
		 * platformType  登录的类型   GAMETEA, //茶苑账号 PTID, //通行证账号 PTGAME, //边锋游戏账号 PLATMENT = 6, //第三方登录 SESSION = 7, //秘钥登录 ANONYMITY = 255 //匿名登录 
		 * hardwareId pc 设备码
		 */
		onLogin(ip:cy.SrsIp,usrName:string,usrPwd:string,platformType:number = user.LOGIN_TYPE.GAMETEA,hardwareId:string=""):void {
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
				this.autoJoinRoom();
			}		
		}

		/**
		 * 登录失败处理
		 */
		onLoginError(agin:boolean):void{}

		/**
		 * 强制登录
		 */
		forceLogin():void{}

		/**
		 * 清理强制登录
		 */
		clearforceLogin():void{}

		/**
		 * 自动进入房间&进入房间处理
		 */
		autoJoinRoom():void{}

		/**
		 * 注销
		 */
		onLoginOut():void{}

		/**
		 * 进入房间成功
		 */
		onRoomSucceed():void{}

		dispose():void{}

		
	}
}