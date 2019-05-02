/**
 * 项目中所有用到的一些静态数据
 * @author 
 */
class AppConst {
    /**
     * runtime 版本
     */
    static RUNTIME_VER:string = "1.0.0";

    /*资源版本控制管理*/
    private static RESOURCE_VER:string = "1001001";
    static get VERSION_ID():number {
        //return parseInt(gameabc.getConfig("VERSION_ID"));
        return parseInt(AppConst.RESOURCE_VER);
    }
    
    //游戏内显示版本号
    static get VERSION_STR(): string {
        // var idStr: string = this.VERSION_ID.toString();
        // var str1 = Number(idStr.substr(0,1))
        // var str2 = Number(idStr.substr(1,3))
        // var str3 = Number(idStr.substr(4,3))
        // return str1+"."+ str2+"." + str3;
        return this.RUNTIME_VER;
    }

       // 这里全是测试的 服务器地址和配置， 正式的在SrsConfig文件中，Ctrl点击跳转到SrsIp类，并滚轮向上，即可找到
    static OUT_SVR  = new cy.SrsIp(0, "61.164.152.71",   5601,  427,   3790, "123.59.14.4:9091",  "123.59.14.4:9092",  "外网71",  room.CONFIG.PUBLIC);
    static IN_SVR   = new cy.SrsIp(0, "192.168.136.90",  4005,  5028,  190,  "192.168.138.131:9091", "192.168.138.131:9092", "内网90",  room.CONFIG.INTERNAL);
    static IN_SVR2  = new cy.SrsIp(0, "192.168.135.57",  4102,  427,   4001,  "192.168.138.131:9091", "192.168.138.131:9092", "内网57",  room.CONFIG.MINE_57);
    // static IN_SVR   = new cy.SrsIp(0, "192.168.136.90",  6105,  5029,  190,  "10.224.32.70:9091", "10.224.32.70:9092", "内网90",  room.CONFIG.INTERNAL);
    static OUT_SVR2 = new cy.SrsIp(0, "61.153.110.201",  5401,  427,   3803, "123.59.14.4:9091",  "123.59.14.4:9092",  "强选201");
    static OUT_SVR3 = new cy.SrsIp(0, "121.199.15.135",  5401,  427,   3803, "123.59.14.4:9091",  "123.59.14.4:9092",  "强选135");
    static OUT_SVR4 = new cy.SrsIp(0, "61.153.110.203",  5401,  427,   3803, "123.59.14.4:9091",  "123.59.14.4:9092",  "强选203");
    static OUT_SVR5 = new cy.SrsIp(0, "122.228.235.228", 5401,  427,   3803, "123.59.14.4:9091",  "123.59.14.4:9092",  "强选228");
    

    static OUT_SVR6 = new cy.SrsIp(3809,    "118.178.85.188",  5601,   427,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092","188:5601");
    static OUT_SVR7 = new cy.SrsIp(3810,    "118.178.85.188",  5602,   427,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092","188:5602");
    static BF_SVR1 = new cy.SrsIp(0,    "115.28.152.168",  4008 ,   1547,   4870,  "123.59.14.4:9091",  "123.59.14.4:9092","边锋平台",room.CONFIG.BF_TEST,10);

	public constructor() {}
    
    static GROUP_ID:string = "1"; //魔方的GroupID

    //123.59.14.4 外网
    //10.224.32.70 内网
    /**
     * 边锋pt账号注册到茶苑
     * @type {string}
     * 
     */
    static BFPT_TO_GAMET_REG_URL:string = "http://www.gametea.com/srvcenter/sdo2gt_reg.php?"

    static CONNECT_SERVER:cy.SrsIp;
    static GAME_ID:number = 427//德州427;//外网
    static GAME_ID_99:number = 419;
    static GAME_ID_FREE: number = 424;
    static GAME_BANK_ID:number = 426;                   
    static LOGING_CAN_BOOL: boolean = false;//
    
    static setServer(svr:cy.SrsIp):void {
        AppConst.CONNECT_SERVER = svr;
        AppConst.GAME_ID = svr.gameId;
        AppConst.GAME_ID_FREE = AppConst.getGameIdFree(svr.gameId);
        app.NetAction.MS_APPID = svr.moduleServerId;
    }

    static getGameIdFree(gameId: number): number {
        return gameId == 5028? 5052: 424;
    }
    
    /**
	 * 模块ID
	 */ 
    public static gameConfigType = {
        gameType1: 1,//小游戏大厅是否开启
        gameType2: 2,//手机商城充值
        gameType3: 3,//SNG比赛
        gameType4: 4,//九九德州
        gameType5: 5,//九九德州第三个房间
        gameType7: 7,//单挑房间
        gameType8: 8, //新手引导开关
        gameType10: 10 //钱庄是否显示开关
    }
       

	/**
	 * 全局字体颜色表--可以扩展
	 */ 
    public static TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色 
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xFFD200,//黄色 
        lightYellow: 0xFFFFCC,//淡黄色
        orangeYellow: 0xff9900,//橘黄色
        orange: 0xFFA801,//橙色
        red: 0xFF0000,//红色
        green: 0x02F720,//绿色 
        blue: 0x01C4FE,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xCC00FF,//紫色 
        pink: 0xFF0E99,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700, //金色
        lightPurple: 0xAB8DB5, //淡紫色
        darkYellow: 0xF4CB00 //土黄色

    }
    
    /**
     * 全局字体大小表--可以扩展
     */ 
    public static LabelFontSize = {
        littleSize: 14,//小型字体大小
        smallSize: 16,//偏小字体大小
        middleSize: 18,//中型字体大小
        normalSize: 20,//正常字体大小
        bigSize: 36//大型字体大小
    }

    //房间类型
    public static CHAT_ROOT_TYPE = {
        CLUB:1, //1俱乐部
        SNS:2,  //2圈子
        PR:3,   //3私密房间
        PT:4    //4私聊
    }

    //聊天类型
    public static CHAT_TYPE = {
        //1聊天,2牌谱,3战绩,4创建牌局,5进入牌局,6退出牌局,7牌局结束,8加入俱乐部,9退出俱乐部，10邀请加入群聊
        CHAT:1,
        PAI_PU:2,
        RECORD:3,
        C_PJ:4,
        INTO_PJ:5,
        OUT_PJ:6,
        OVER_PJ:7,
        JOIN_CLUB:8,
        OUT_CLUB:9,
        JOIN_SNS:10
    }
    
    //数量复合标签
    public static COUNT_SUB_TAG= {
        MISSION_TYPE:"missionType",             //日常任务
        ACHIEVEMENT_TYPE:"achievement",         //成就任务
        MISSION_ACHIEVE:"missionAchievement",  //就成和任务
        SIGN_TYPE:"signType",                   //签到任务
        MISSION_MOUDLE:"missionModule",          //任务模块
        MAIL_MOUDLE:"mailMoudle",               //邮件模块
        FRIEND_MOUDLE:"friendMoudle",            //好友模块
        FRIEND_MOUDLE_SUB:"friendMoudleSub",         //好友模块子
        FRIEND_MOUDLE_MAIL:"friendMoudleMail",       //好友模块邮件
        PROP_MOUDLE:"propItemMoudle"           //道具模块
    }
    
    //设置相关
    public static SETTING_TYPE = {
        /** */
        GAME_SETTING: "GAME_SETTING",  
        /**背景音乐 */
        GAME_SETTING_TYPE_1: "GAME_SETTING_TYPE_1",                  //
        /** 震动 */
        GAME_SETTING_TYPE_2: "GAME_SETTING_TYPE_2",                  //
        /**游戏音效 */
        GAME_SETTING_TYPE_3: "GAME_SETTING_TYPE_3",                  //
        /**全屏显示 */
        GAME_SETTING_TYPE_4: "GAME_SETTING_TYPE_4",                  //
        /**PC */
        GAME_SETTING_TYPE_: "GAME_SETTING_TYPE_",                    //PC
        /**登录类型 0是茶苑 1是边锋 */
        GAME_LOGIN_TYPE: "GAME_LOGIN_TYPE",                     //
    }

    public static SLOT_OPEN = false;                            //老虎机开关
}
