module mc2sdk {
	
	export function init():void {
		Mc2Sdk.init(String(AppConst.OUT_SVR.gameId),
                    AppConst.GROUP_ID,
                    platform.DEVICE_ID,
                    platform.CHANNE_ID,
                    mc2sdk.OS_TYPE.EGRET_H5);
	}
	
	export function event(evtId:number,parameters:any=null):void {
		Mc2Sdk.event(evtId,"",{d:parameters});
	}
	
	/** 
	 *  把日志推给魔方，请控制变量名长度，请控制日志数量
	 *  变量名，变量值，变量名，变量值，变量名，变量值以此类推
	 *  在魔方显示类似形式如： a=3,b=44,t=55
	 */
	export function log(...args):void {
		var len = args.length;
		var value:string = args[0]+"="+args[1]
		for(var i=2; i<len; i+=2) {
			value += "," + args[i] + "=" + args[i+1];
		}
		Mc2Sdk.event(EVENT_TYPE.LOG,value);
	}
	
	
	export const enum EVENT_TYPE {
        ACTIVATE = 53,
		
		FAST_GAME = 50001,  //点击主界，面极速按钮
		NORMAL_GAME,  //点击主界面，游戏场按钮
		MAIN_MALL,  //点击主界面，商城图标
		ROOMTAB_NORMAL,  //点击房间，普通房按钮
		ROOMTAB_FAST,  //点击房间，极速房按钮
		ROOMTAB_VIP,  //点击房间，私人房按钮
		ROOM_REFRESH,  //点击房间，人数刷新按钮
		ROOM_FAST,  //点击房间，快速加入按钮
		VIP_CREATE,  //点击房间，会员开房按钮
		VIP_JOIN,  //点击房间，加入桌子按钮
		PLAYCARD_MENU = 50011,  //点击游戏，左上角菜单
		SRS_RECONNECT, //负载满了，重连一次
		SNG_S1, //报名第一场SNG
		SNG_S2, //报名第二场SNG
		SNG_S3, //报名第三场SNG
		PLAYCARD_CLICK_MY_HEAD, //游戏中点击自己头像
		HAPPY_BIN1, //押注1个桌位
		HAPPY_BIN2,
		HAPPY_BIN3,
		HAPPY_BIN4,
		HAPPY_BIN1_ALL = 50021, //压住1个桌位(压满)
		HAPPY_BIN2_ALL,
		HAPPY_BIN3_ALL,
		HAPPY_BIN4_ALL,
		VIP_BILL, //私人房点账单
		FRIEND_FACE, //好友面对面加好友
		FRIEND_ADD, //互加好友
		FRIEND_SEARCH, //好友界面搜索
		FRIEND_MAIL, //好友界面邮件
		SGIN_GET1 = 50030, //签到领取
		SGIN_GET2, //签到领取(额外奖励)
		VIP_ROOM_TAB, //房间切换到列表模式的按钮
		ADDBET_1, //加注第1个按钮50033
		ADDBET_2, //加注第2个按钮
		ADDBET_3, //加注第3个按钮
		ADDBET_4, //加注第4个按钮
		ADDBET_5, //加注第5个按钮
		ADDBET_R, //加注(右边)
		ADDBET_B1, //加注(按底池)
		ADDBET_B2 = 50040, //加注(按底池)
		ADDBET_B3, //加注(按底池)50041
		HAPPY_BANK_WIN,//盈利下庄输入 50042
		HAPPY_BANK_WIN_SEL,//盈利下庄开关 50043
		HAPPY_BANK_LOSE,//亏损下庄输入 50044
		HAPPY_BANK_LOSE_SEL,//盈利下庄开关 50045
		HAPPY_BANK_INE,//折线图按键 50046
		HAPPY_BANK_NUM,//上庄人数
		MISSION_BTN,
		MISSION_BOX,
		MISSION_AWARD = 50050,
		MISSION_GOLD_TREE = 50088,




		HOOK_50051 = 50051,
		HOOK_50052,
		HOOK_50053,
		HOOK_50054,
		HOOK_50055,
		HOOK_50056,
		HOOK_50057,
		HOOK_50058,
		HOOK_50059,
		HOOK_50060,

		CARD_GUESS = 50061,
		GREEN_HANDLER,	//新手
		OLD_HANDLER, //老手
		GUIDE_CLOSE,
		HISTORY_LINE = 50065,//普通房历史盈亏
		CHARMWHEEL_GO = 50066,//魅力转盘
		
		HAPPY_LUCKY_CHANGE = 50067,//幸运牌型更换
		HAPPY_LUCKY_RADOM = 50068,//幸运牌型更换随机
		HAPPY_LUCKY_SUBMIT = 50069,//幸运牌型更换确定

		TREASURE_5K = 50070,//5W夺宝
		TREASURE_2W = 50071,
		TREASURE_5W = 50072,
		TREASURE_10W = 50073,
		TREASURE_50W = 50074,
		TREASURE_100W = 50075,
		TREASURE_DO = 50076,//夺宝按钮
		TREASURE_ADD = 50077,//夺宝加号
		TREASURE_GET = 50078,//夺宝领取
		CREATE_PK = 50079,	//创建PK房
		SITDOWN_PK = 50080, //PK房确定坐下
		IN_PK_1 = 50081,	//PK房间1
		IN_PK_2 = 50082,	//PK房间2
		IN_PK_3 = 50083,	//PK房间3


		PLAYCARD_PKOUT = 50084,//pk放all没结束退出
		PLAYCARD_PKSTAND = 50085,//pk放all没结束站起
		CLICK_OTHER_EDIT_TIP = 50086,//点击其他用户信息界面上的“编辑标签”次数
		EDIT_TIP_SAVE_AND_CLOSE = 50087,//用户标签编辑界面上的“保存并关闭”次数



		MTT_SIGN = 50089, //点击MTT“报名”按钮计数
		MTT_CANCEL, //点击MTT"退赛"按钮
		MTT_JOIN1, //点击MTT主入口的进入按钮
		MTT_JOIN2, //点击MTT最上部主入口的进入按钮
		CHENGZHANG_GIFT = 50093,//成长计划领奖

		RECOR_ANALYSIS = 50094, // 点击盈利反馈界面的行为分析按钮

		ADD_FRIEND = 50095,	//添加好友
		DELETE_FRIEND = 50096,	//删除好友
		PLAYCARD_SAFE_CANEL = 5097,//保险取消
		PLAYCARD_SAFE_SUBMIT = 5098,//保险投保
		SHARE_PRIVATE_ROOM = 50101,	//创建私人房点击分享邀请按钮计数
		SHARE_SNG_WIN = 50102,	//赛事结算界面点击炫耀一下按钮计数

		RECORD_ANALYSIS_SHARE = 50103,  //行为分析分享
		WINUI_SHARE = 50104,  //盈利反馈分享
		PLAYCARD_FACE = 52000,  //表情事件ID头，表情ID限制三位数字
		//52101~52199 表情  52201~52299 文字  52301~52399 魔法表情 52401~是欢乐城普通表情，52501~是欢乐城玩家魔法表情 600旁观弹幕
		PLAYCARD_DILA = 52901, //打赏荷官


		ON_RESP_OPEN_INFO = 53124,  //收到游戏中的1124协议(53XXX相当于游戏中的1XXX)

        ON_LONG_WAIT = 54001,  //防作弊房超过60秒等待。
		LOGIN_FAIELD, //登录失败
		ROOM_FAIELD, //进入房间失败
		ROOM_ACT_FAILED, //坐下失败
		RILVER_FAILED, //获取银子失败
		ROOM_ID_WRONG, // session登陆的房间id错误 
		JOIN_ROOM_FAILED_MONEY, // 进入房间失败，钱不够

        //59001~59999的枚举定义，客户端当前生命周期只发一次
        ON_LOIGN_STEP_1 = 59001, //登录状态过程记录
        ON_LOIGN_STEP_2,
        ON_LOIGN_STEP_3,
        ON_LOIGN_STEP_4,
        ON_LOIGN_STEP_5 = 59005, //九九德州游戏开始

        ON_LOIGN_STEP_11 = 59101,// 皮肤文件加载
        ON_LOIGN_STEP_12 = 59102, // 资源加载成功
        ON_LOIGN_STEP_21 = 59201,   // 开始登陆
        ON_LOIGN_STEP_22 = 59202,   // 准备登陆
        ON_LOIGN_STEP_23 = 59203,   // SOCKET连接成功
        ON_LOIGN_STEP_24,           // 验证客户端版本
        ON_LOIGN_STEP_25,           // 获得KEY
        ON_LOIGN_STEP_26,           // 负载均衡
        ON_LOIGN_STEP_27,           // 正式登陆结果
        ON_LOIGN_STEP_28,           // 获取玩家信息
        
        ON_LOIGN_STEP_31 = 59301,   // 登陆成功，查银子成功
        ON_LOIGN_STEP_32,           // 可以进入房间
        ON_LOIGN_STEP_33,           // 进入房间成功
        ON_LOIGN_STEP_34,           // 服务端通知可连游戏
        ON_LOIGN_STEP_35,           // 服务端连游戏成功

		EXP_SVR_START = 59901, 		//连接测试网络的服务器
		EXP_SVR_SUCCESS,  			//连接测试网络的服务器成功
		EXP_SVR_ERROR,    			//连接测试网络的服务器出错
		EXP_SVR_CLOSE,    			//连接测试网络的服务器被关闭
		
		LOG = 9999998,  			//log信息
		TEST = 9999999
    }
    
	export const sdkVersion:string = '1.0.0';
	export const requestUrl:string = 'http://bfas.bianfeng.com/bfrd/msgpack?from=ts';
	// export var requestUrl:string = 'http://10.241.93.64:8082/bfrd/msgpack';//开发机
	// export var requestUrl:string = 'http://10.241.95.246/bfrd/msgpack';//测试机
	
    
    export const enum OS_TYPE {
        Android = 1,
		IOS,
		WinPhone,
		AIR,
		Android_TV,
		Win32,
		EGRET_H5
    }
    
	export class Mc2Sdk {
		
		static chanel:string = '';
		static appId:string = '';
		static groupId:string = '';
		static deviceId:string = '';
		static initTime:number = 0;
		static deviceType:number = 0;
		
		static userId:string = '';
		static os:string = '';
		static version:string = '';
		static versionLabel:string = '';
		
		private static msgPack:org.msgpack.MsgPack;
		private static localCache:Object = {};
		
		static createMsgPack(data:any):egret.ByteArray {
			if (Mc2Sdk.msgPack==null) {
				Mc2Sdk.log('请先使用Mc2Sdk.init初始化SDK');
				return null;
			}
			return Mc2Sdk.msgPack.write(data);
		}
		static get soData():any {
			// return SharedObject.getLocal(NativeApplication.nativeApplication.applicationID+'.mc2Data').data;
            return Mc2Sdk.localCache;
		}

		
		static init(appId:string, groupId:string, deviceId:string,
									chanel:string, deviceType:number):void {
			
			if (Mc2Sdk.msgPack == null) {
                egret.registerClass(mc2sdk.Long, "mc2sdk.Long");
                egret.registerClass(mc2sdk.AppEvent, "mc2sdk.AppEvent");
				Mc2Sdk.msgPack = new org.msgpack.MsgPack();
				Mc2Sdk.msgPack.factory.assign(LongWorker, "mc2sdk.Long");
				Mc2Sdk.msgPack.factory.assign(IntegerWorker, "mc2sdk.Integer");
			}
			
			Mc2Sdk.initTime = new Date().getTime() - egret.getTimer();
			Mc2Sdk.appId = appId;
			Mc2Sdk.groupId = groupId;
			Mc2Sdk.deviceId = deviceId;
			Mc2Sdk.chanel = chanel;
			Mc2Sdk.deviceType = deviceType;
			
			// var appXml:XML = NativeApplication.nativeApplication.applicationDescriptor;
			// var ns:Namespace = appXml.namespace();
			Mc2Sdk.version = AppConst.VERSION_ID.toString();
			Mc2Sdk.versionLabel = AppConst.VERSION_STR;
			Mc2Sdk.os = egret.Capabilities.os;
			
		}
		
		/** 客户端当前生命周期内只发一次的消息号缓存 */
		static onceCache:boolean[] = [];
		
		static event(id:number, label:string='', parameters:any=null, ...subIds):void {
			if (Mc2Sdk.msgPack == null) return;
			if (id>=59001&&id<=59999&&Mc2Sdk.onceCache[id-59000]) return;
			else Mc2Sdk.onceCache[id-59000] = true;

			if (!Mc2Sdk.soData.activate) new HttpActivate();
			
			var appEvents:AppEvent[] = [new AppEvent(String(id), label, parameters)];
			for(var i:number=0,len:number=subIds.length; i<len; ++i){
				appEvents.push(new AppEvent(String(subIds[i])));
			}
			
			var role:RoleType = this.getRole(id);
			if (role != null) role.send(appEvents); 
			else new EventPackageSender(appEvents);
		}
		
		
		static roleDict:any;
        
		static setRole(id:number, cacheType:string, time:number):void {
			if (Mc2Sdk.roleDict == null) Mc2Sdk.roleDict = {};
			var roleType:RoleType = Mc2Sdk.roleDict[id];
			if (roleType == null) roleType = RoleType.create(cacheType);
			roleType.id = id;
			roleType.type = cacheType;
			roleType.time = time;
			Mc2Sdk.roleDict[id] = roleType;
			roleType.checkCache();
		}
		
		static getRole(id:number):RoleType {
			return Mc2Sdk.roleDict == null ? null : Mc2Sdk.roleDict[id];
		}
		
		
		
		
		static log(text:String):void {
			// console.log('[边锋数据中心] '+ text);
		}
		
		
		
		
	}
}