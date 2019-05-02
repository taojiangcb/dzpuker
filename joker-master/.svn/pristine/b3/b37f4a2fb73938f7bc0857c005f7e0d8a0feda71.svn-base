/**
 * 游戏登录的逻辑入口
 */
module games {
	export interface ILogin {


		getUserType():number;

		/**
		 * 用户登录实现
		 * 
		 * ip 连接的srs ip
		 * userName 账号
		 * usrPwd   密码|session|other
		 * platformType  登录的类型   GAMETEA, //茶苑账号 PTID, //通行证账号 PTGAME, //边锋游戏账号 PLATMENT = 6, //第三方登录 SESSION = 7, //秘钥登录 ANONYMITY = 255 //匿名登录 
		 * hardwareId pc 设备码
		 */
		onLogin(ip:cy.SrsIp,usrName:string,usrPwd:string,platformType:number,hardwareId:string):void;

		/**
		 * 登录成功
		 */
		onLoginSucceed():void;

		/**
		 * 登录失败
		 */
		onLoginError(agin:boolean):void;

		

		/**
		 * 强制登录
		 */
		forceLogin():void;

		/**
		 * 清除强制登录
		 */
		clearforceLogin():void;

		/**
		 * 自动进入房间&进入房间处理
		 */
		autoJoinRoom():void;
		
		/**
		 * 进入房间成功
		 */
		onRoomSucceed():void;


	}
}