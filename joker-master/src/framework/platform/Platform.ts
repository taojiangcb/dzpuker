module platform {
	
	/** 充值服务器的地址头(init后赋值)		 */
	export var RECHARGE_URL:string;
	/** 签名秘钥(init后赋值)		 */
	export var SIGN_KEY:string
	/** 此渠道是否包含用户中心(init后赋值) */
	export var HAS_USER_CENTER:boolean;
	/** 此渠道是否包含论坛(init后赋值) */
	export var HAS_BBS:boolean;
	/** 此渠道是否包含切换账户功能(init后赋值) */
	export var HAS_CHANGE_USER:boolean;
	/** 此渠道是否需要登录(init后赋值) */
	export var NEED_LOGIN:boolean;
	/** 设备ID */
	export var DEVICE_ID:string = "00-00-00-00-00-00";
	/** 此渠道是否显示登录的服务器列表(init后赋值) */
	export var SHOW_SVR_LIST:boolean;
	/** 此渠道是否可以从UI登录框登录(init后赋值) */
	export var LOGIN_FORM_UI:boolean;
	/** 指定的平台类，init时才会创建实例 */ 
	export var factory:any = DevelopSdk;
	/** 平台实例(init后赋值) */
    export var instance:IPlatform;

	export function init():void {

		SIGN_KEY = "";
		RECHARGE_URL = gameabc.ResourceBundleUtil.getConfig("RECHARGE_URL");

		SHOW_SVR_LIST = gameabc.ResourceBundleUtil.getConfig("SHOW_SVR_LIST")=="true";
		LOGIN_FORM_UI = gameabc.ResourceBundleUtil.getConfig("LOGIN_FORM_UI")=="true";
        
		HAS_USER_CENTER = gameabc.ResourceBundleUtil.getConfig("HAS_USER_CENTER")=="true";
		HAS_BBS = gameabc.ResourceBundleUtil.getConfig("HAS_BBS")=="true";
		HAS_CHANGE_USER = gameabc.ResourceBundleUtil.getConfig("HAS_CHANGE_USER")=="true";
		NEED_LOGIN = gameabc.ResourceBundleUtil.getConfig("NEED_LOGIN")=="true";
    }
	
    
    /** 各个接渠道SDK的类，需要实现此接口的所有方法，渠道没需求的可为空 */
    export interface IPlatform {
        
        /** 打开SDK的登录面板		 	*/
        openLoginPanel():void;
        /** 打开SDK的登出(注销)面板		 */
		openLogoutPanel():void;
		/** 打开SDK的用户中心面板		 */
		openUserCenter():void;
		/** 打开SDK的论坛		 		*/
		openBbs():void;
		/** 打开SDK的退出面板(重登、退出、切换账号)		 */
		openExitPanel():void;
		/** 打开SDK的切换账号面板		 */
		openChangeUserPanel():void;
		/** AIR在失去焦点时的处理		 */
		onDeactivate():void;
		/** AIR在恢复焦点时的处理		 */
		onActivate():void;
		/** AIR在游戏退出时的处理		 */
		onDispose():void;
		/** 当游戏登陆后进入主城时		 */
		onLoginToCity():void;
		/** 发起支付的SDK，具体的支付参数在_paymentVo中		 */
		payment(payData?:any):void;
		/** 发起登录的SDK(没有界面的，直接调用)		 */
		startLogin(data?:any):void;
		/** 发起注销的SDK(没有界面的，直接调用)		 */
		startLogout():void;
		/** 发送角色信息	 */
		doReportRoleInfo():void;
		/** 发起没有界面的自定义登录	 */
		sendLogin(n:string, p:string):void;
		/** 发起没有界面的自定义注册	 */
		sendRegister(n:string, p:string):void;
    }
    

	/** 所有渠道通用的一些流程与方法(所有渠道需继承此类，并实现IPlatform接口) */
	export class Platform {
	}
	
    /** 开发时默认指向的虚拟渠道 */
    export class DevelopSdk extends Platform implements IPlatform {
        
        /** 打开SDK的登录面板		 */
      openLoginPanel():void{
        }
		/** 打开SDK的登出(注销)面板		 */
		openLogoutPanel():void{
        }
		/** 打开SDK的用户中心面板		 */
		openUserCenter():void{
        }
		/** 打开SDK的论坛		 */
		openBbs():void{
        }
		/** 打开SDK的退出面板(重登、退出、切换账号)		 */
		openExitPanel():void{
        }
		/** 打开SDK的切换账号面板		 */
		openChangeUserPanel():void{
        }
		/** AIR在失去焦点时的处理		 */
		onDeactivate():void{
        }
		/** AIR在恢复焦点时的处理		 */
		onActivate():void{
        }
		/** AIR在游戏退出时的处理		 */
		onDispose():void{
        }
		/** 当游戏登陆后进入主城时		 */
		onLoginToCity():void{
        }

		/** 发起支付的SDK，具体的支付参数在_paymentVo中		 */
		payment():void{
		}
		/** 发起登录的SDK(没有界面的，直接调用)		 */
		startLogin():void{
		}
		/** 发起注销的SDK(没有界面的，直接调用)		 */
		startLogout():void{
			
		}
		
		/** 发送角色信息	 */
		doReportRoleInfo():void{
			
		}
		/** 发起没有界面的自定义登录	 */
		sendLogin(n:string, p:string):void{
			
		}
		/** 发起没有界面的自定义注册	 */
		sendRegister(n:string, p:string):void{
		}
    }
}