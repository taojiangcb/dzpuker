module platform  {

	/** 平台ID，渠道号，CHANEL_ID(init后赋值)		 */
	export var CHANNE_ID:string;	
	//export var NATIVER_VER:string = "";			//native的热更版本
	//export var WEB_VER:string = "";				//web的版本

	/**
     * native 包版本
     */
    export var NATIVE_VER:string="1.0.0";

	/**
	 * 渠道ids
	 */
	export enum CHANNE_IDS {
		DEFAULT = -1,					//默认通用配置渠道号
		DEBUG = 10000,
		ANDROID = 10001,				//边锋android通用

		MEIZU = 10008,					//魅族单机游戏
		QH_360 = 10009,					//奇虎360
		OLD_CHANNEL = 10010,			//最早老的渠道包，要提示强行更新。
		UU10133 = 10133,				//UU村				
		
		BAIDU_10022 = 10022,			//百度手机助手（10022）
		BAIDU_10006 = 10005,			//百度91（10006）
		BAIDU_60031 = 60031,			//百度多酷（60031）
		BAIDU_10139 = 10139,			//百度贴吧 （10139）

		MY_APP = 10017,					//应用宝
		WANDOUJIA = 10033,				//豌豆荚	
		KUPAI = 10052,					//酷派单机游戏			
		ALI_YUN = 10066,				//阿里云
		SOUGO = 10100,					//搜狗
		APPSTORE = 20001,				//ios Appstore
		C_4399 = 60033,					//4399
		VIVO = 60030,					//VIVO
		GD890001 = 890001,				//广点
		GD890002,
		GD890003,
		GD890004,
		GD890005,
		GD890006,
		GD890007,
		GD890008,
		GAME_TEA_PC = 90027,			//茶苑pc
		H5 = 90033,						//H5
		BF_PC = 90034,					//边锋pc	
		BACK_UP = 90036,				//边锋备案
		GAME_TEA_ANDROID = 90029,		//游戏茶苑（安卓）-德扑专用
		GAME_TEA_IOS = 90030,			//游戏茶苑（ios）-德扑专用
		BIANFENG_ANDROID = 90031,		//边锋andorid
		BIANFENG_ISO = 90032			//边锋ios
	}

	/**
	 * 商城appids
	 */
	export enum PAY_APPIDS {
		_417001 = 417001,
		_417002 = 417002,
		_417003 = 417003
	}
	
	/**
	 * 当前渠道号是否是PC茶苑渠道
	 * @returns {boolean}
     */
	export function isGTPCChannel():boolean {
		return 	egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.DEBUG || parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC)
	}

	/**
	 * 我们自己边锋德州渠道号,走边锋自己的登录
	 */
	export function isBfdzpkdrChannel():boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.DEBUG 			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC 		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.H5 				||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.ANDROID 			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.APPSTORE 		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_ANDROID ||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_IOS 	||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ANDROID ||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ISO 	||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BACK_UP 			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.OLD_CHANNEL 		||
			   platform.isUnited();
			  
	}

	/**
	 * 单机游戏渠道号
	 */
	export function isDangji():boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.KUPAI  			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.VIVO				
	}

	/**
	 * 去除ＱＱ，ＷＸ登录，联运渠道号走边锋的登录但是不要腾讯登录
	 */
	export function isUnitedNotTencent():boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890007
	}

	/**
	 * 走边锋自己的登录
	 */
	export function isUnited():boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.C_4399 			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.ALI_YUN  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.KUPAI  			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.VIVO	  			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.UU10133	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890003	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890004	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890005	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890006	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890007	  		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890008	  			
	}

	/**
	 * 当前渠道号是否是茶苑渠道
	 */
	export function isGTChannel(): boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC 		||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_ANDROID ||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_IOS		|| 
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.APPSTORE			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BACK_UP			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.OLD_CHANNEL		||
			   platform.isUnited();
	}

	/**
	 * 当前渠道号是否是边锋渠道
	 */
	export function isBFChannel(): boolean {
		return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BF_PC 			||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ANDROID ||
			   parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ISO
	}

	/**
	 * 渠道号配置
	 */
	export function initCfg():void {
		PlatformConfig.init();
	}

	/**
	 * 获取某个渠道号配置
	 */
	export function getChannelCfg(channelId:string):PlatformConfigVO {
		return PlatformConfig.getCfg(channelId);
	}

	/**
     * 可以通过登录界面登录的渠道号
     */
    export function canLoginByAccount():boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE 
            || platform.CHANNE_ID == platform.CHANNE_IDS.H5.toString() 
            || platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString();
			// || platform.CHANNE_ID == platform.CHANNE_IDS.GAME_TEA_IOS.toString();
    }

	/**
	 * 
	 */
	export function login():void {
		if(!platform.isBfdzpkdrChannel()) {
			UserInterface.login();
		}
	}

	/**
	 * 获取当前的渠道配置
	 */
	export function channelCfg():PlatformConfigVO {
		return PlatformConfig.getCfg(platform.CHANNE_ID);
	}

	class PlatformConfig {
		static cfgs:Object = {};
		static defaultCfg:PlatformConfigVO;
		static init():void {
			this.defaultCfg = new PlatformConfigVO("-1",PAY_APPIDS._417002);
			//各个渠道号配置
			this.cfgs[CHANNE_IDS.APPSTORE] = new PlatformConfigVO(CHANNE_IDS.APPSTORE.toString(),PAY_APPIDS._417003);
			this.cfgs[CHANNE_IDS.GAME_TEA_IOS] = new PlatformConfigVO(CHANNE_IDS.GAME_TEA_IOS.toString(),PAY_APPIDS._417003);
			this.cfgs[CHANNE_IDS.ANDROID] = new PlatformConfigVO(CHANNE_IDS.ANDROID.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.OLD_CHANNEL] = new PlatformConfigVO(CHANNE_IDS.OLD_CHANNEL.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.C_4399] = new PlatformConfigVO(CHANNE_IDS.C_4399.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.ALI_YUN] = new PlatformConfigVO(CHANNE_IDS.ALI_YUN.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GAME_TEA_ANDROID] = new PlatformConfigVO(CHANNE_IDS.GAME_TEA_ANDROID.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.BIANFENG_ANDROID] = new PlatformConfigVO(CHANNE_IDS.BIANFENG_ANDROID.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.H5] = new PlatformConfigVO(CHANNE_IDS.H5.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.BACK_UP] = new PlatformConfigVO(CHANNE_IDS.BACK_UP.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GD890003] = new PlatformConfigVO(CHANNE_IDS.GD890003.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GD890004] = new PlatformConfigVO(CHANNE_IDS.GD890004.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GD890005] = new PlatformConfigVO(CHANNE_IDS.GD890005.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GD890006] = new PlatformConfigVO(CHANNE_IDS.GD890006.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.GD890008] = new PlatformConfigVO(CHANNE_IDS.GD890008.toString(),PAY_APPIDS._417001);
			this.cfgs[CHANNE_IDS.UU10133] = new PlatformConfigVO(CHANNE_IDS.UU10133.toString(),PAY_APPIDS._417001);
		}

		static getCfg(channelId:string):PlatformConfigVO {
			if(this.cfgs.hasOwnProperty(channelId.toString())) {
				return this.cfgs[channelId];
			} 
			else {
				this.defaultCfg.channelId = channelId;
				return this.defaultCfg;
			}
		}

		public constructor() {
		}
	}

	class PlatformConfigVO {
		constructor(channelId:string,pay_appid:number){
			this.channelId = channelId;
			this.pay_appid = pay_appid
		}
		channelId:string = "";			//渠道id
		pay_appid:number = 0;			//商城列表appid
	}
}