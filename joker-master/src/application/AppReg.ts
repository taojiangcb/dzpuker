/**
 * 模块注册表
 * @author 
 */

class AppReg {

    static IPV6_TEST:number = 100000;

    // static PRELOAD:number = 10000;
    static TEST_WIN:number = 1;
    static APP_MISSION:number = 2;                     //任务界面
    static IOS_SHARE:number = 3;
    // static APP_TAG: number = 5;                     //更多界面

    public static KEYBOARD: number = 6;                //小键盘
    public static ALERT: number = 9;                   //信息提示界面

    ////**********新的********//////

    public static APP_MAIN_UI: number = 4;              //app主界面
    public static APP_MY_INFO: number = 10;             //我的信息界面
    public static APP_POKER_INFO: number = 11;          //牌局内我的信息界面
    public static APP_GPS_INFO: number = 12;            //GPS列表
    public static APP_REPORT_INFO: number = 13;         //举报双黄

    static SHOP_WIN:number = 14;                        //商城界面
    static APP_RECORD:number = 15;                      //战绩
    static AWARD_WIN:number = 16;                       //奖励显示
    static APP_RECORD_INFO:number = 17;                 //战绩专业术语
    static APP_SIGN: number = 18;                       //签到
    static APP_PROP:number = 19;                        //道具

    //@wp 临时存放
    public static toKen: any;
    public static APP_PLAYCARDS: number = 20;           //打牌界面
   // public static TEST_PLAYCARDS: number = 2000;      //打牌测试界面
    public static APP_PLAY_BUY: number = 21;            //打牌买入界面
    static APP_RELAN_NAME:number = 22;                   //实名认证
    public static APP_PLAY_REVIEW:number = 27;          //回顾 PlayCardReviewWinModule
    public static APP_PLAY_COUNT:number = 28;           //实时战况
    static APP_NOTICE:number = 29;                      //公告
    public static APP_QR: number = 30;                  //生成二维码
    public static APP_PLAY_RECORD = 31;                 //牌局记录
    public static APP_FEED: number = 32;                //举报
	public static APP_PLAY_OVEN = 33;                   //打牌结束
    public static APP_MAIL: number = 34;
    public static APP_MAIL_SUB: number = 35;
    public static APP_BILL: number = 36;                //账单
    public static APP_BILL_SUB: number = 37;            //子账单
    public static APP_CHARMWHEEL: number = 38;          //魅力转轮
    public static APP_TREASURE: number = 39;            //夺宝奇兵
    public static APP_TREASURE_SUB: number = 40;
    public static APP_SETTING_TYPE: number = 41;        //手机 设置
    public static APP_DEALERINFO: number = 42;          //荷官信息
    public static APP_DEALERONLINELIST: number = 43;    //在线荷官列表
    public static APP_FREEBROKE: number = 44;           //金币房破产

    public static APP_HEAD:number = 50;                 //用户编辑头像界面
    public static APP_BANK:number = 60;                 //钱庄

    public static APP_FRIEND_MAIN: number = 70;         //好友主界面
    public static APP_FRIEND_MAIL: number = 71;         //好友邮件
    public static APP_FRIEND_FACEADD: number = 72;      //面对面加好友
    public static APP_FRINED_INVITE: number = 73;       //好友邀请
    public static APP_FRIEND_INFO: number = 74;         //好友信息
    public static APP_FRIEND_INVITE: number = 75;       //好友邀请
    public static APP_HAPPY = 80;                       //欢乐城
    public static APP_HAPPY_MAIN = 81;                  //欢乐城入口
    public static APP_HAPPY_NOTSET = 82;                //无座界面
    public static APP_HAPPY_UP = 83;                    //上庄列表
    public static APP_HAPPY_STAT = 84;                  //胜负统计
    public static APP_HAPPY_RULE:number = 85;           //欢乐城的游戏说明
    public static APP_HAPPY_REWARD= 86;                 //欢乐城的奖池
    public static APP_BANK_LINE = 87;                    //欢乐城的庄线
    public static APP_HAPPY_LUCKY = 88;                 //欢乐城的幸运牌
    static SLOT: number = 90;                           //老虎机
    static APP_DEBUG:number = 99;                       //debug界面
    static LOGIN:number = 100;                          //登录
    static DEBUG_LOGIN:number = 101;                    //debug模式登录
    static AWARD_MC_WIN:number = 102;                   //奖励动画
    static SAFE_HELP: number = 103;                     //保险说明
    static APP_MONEY:number = 110;                      //破产引导
    static HOOK:number = 111;                           //挂机
    static APP_GOLD_TREE: number = 112;                   //摇钱树 成长计划
    static APP_ChengZhang: number = 114;                 // 成长计划
    static APP_GOLD_TREE_TIP:number = 113;              //摇钱树  成长计划提示说明
    static ROOM:number = 300;                           //房间主界面
    static SNG:number = 400;                            //SNG房间
    static CURRENT_MATCH_INFO:number = 404;             //当前比赛信息
    static SNG_ENTRY:number = 401;                      //SNG报名界面
    // static MTT_SELECT: number = 402;                    //SNG/MMT选择界面
    static MTT: number = 403;                           //MMT房间
    static SNG_RULE:number = 405;                       //SNG规则
    static SNG_RESLUT:number = 407;                     //SNG结果
    static MATCH_MAIN:number = 408;                    //比赛主界面
    static MTT_STATE: number = 409;                     //MMT状态
    static MTT_RULE:number = 410;                       //SNG规则
    static MTT_PRODUCT:number = 411;                    //兑换商品列表
    static MTT_EXCHANGE:number = 412;                   //兑换商品
    static MTT_EXCHANGE_HISTORY = 413;                  //兑换记录
    static PHONE_VALIDATE = 415;                        //手机验证
    static MTT_EXCHANGE_CODE = 414;                     //兑换激活码

    static CREATE_ROOM:number = 500;                    //VIP开房
    static JOIN_VIP_ROOM:number = 501;                  //加入VIP的房间
    static VIP_ROOM_RULE:number = 502;                  //VIP开房

    static FIVE_CARD:number = 601;                      //9选5
    static GREEN_HANDLER:number = 602;                  //新手引导  

    static EDIT_ROLE_TIP:number = 620;                  //编辑角色标签界面
    // static INFO_TIP_ADD:number = 621;                //增加标签
    // static INFO_TIP_DEL:number = 622;                //删除标签


    static MAMMON:number = 603;                         //财神送福利    
    static DRAG_IN:number = 604;                        //最小带入验证
    static CREATE_PK_ROOM = 605;                        //创建私人单挑房

    static newMammon:number = 606;                      // 财神界面（新）
     
    static SG_CLEAR:number = 1001;                      //小游戏
    static GAME_FIRST:number = 1002;
    static SG_MEMORY:number = 1003;                     //纸牌记忆
    
    static APP_RECORD_ANALYSIS:number = 1100;           //测试分析界面
    static WIN_APPRENTICESHIP: number = 1101;           //出师引导界面

    static DEBUGLOGIN: number = 2000;
    static GUICHU: number = 2001;
    static GUICHU_RULE: number = 2002;
    static GUICHU_DAILY: number = 2003;
    static GUICHU_TABLE_DB:number = 2100;
    static GUICHU_WHEEL_DB:number = 2101;
    static GUICHU_AUTO_LOGIN:number = 2012;                  //自动登录

    static JOKER_DEBUG_LOGIN:number = 2020;                 //debug 登录
    static JOKER_AUTO_LOGN:number = 2021;                   //自动登录
    static JOKER_MODULE:number = 2022;                      //捷克高手游戏
    static JOKER_RATIO_MODULE:number = 2023;                //捷无游戏的倍率

    public constructor() {
        this.registerRes();
        this.registerMoudle();
        this.registerNet();
        this.registerMvc();
        this.registerTipCount();
    }

    /**
     * 注册tipcount并且建立层级关系，方便在后面的界面中使用
     */
    private registerTipCount():void {

        var TIP_TAG:any = AppConst.COUNT_SUB_TAG;
        /**任务模块的主级数据**/
        tip.createOrGetTipData(TIP_TAG.MISSION_MOUDLE,[],true);
        /**任务和成就的主级**/
        tip.createOrGetTipData(TIP_TAG.MISSION_ACHIEVE,[],true);
        /**任务面板子级 有两个主级**/
        tip.createOrGetTipData(TIP_TAG.ACHIEVEMENT_TYPE, [TIP_TAG.MISSION_MOUDLE,TIP_TAG.MISSION_ACHIEVE]);
        /**成就面板子级 有两个主级**/
        tip.createOrGetTipData(TIP_TAG.MISSION_TYPE, [TIP_TAG.MISSION_MOUDLE,TIP_TAG.MISSION_ACHIEVE]);
        /**签到任务**/
        tip.createOrGetTipData(TIP_TAG.SIGN_TYPE,[TIP_TAG.MISSION_MOUDLE]);
        /**邮件模块**/
        tip.createOrGetTipData(AppConst.COUNT_SUB_TAG.MAIL_MOUDLE,[],false);
        /**好友模块 */
        tip.createOrGetTipData(TIP_TAG.FRIEND_MOUDLE,[],true);
        tip.createOrGetTipData(TIP_TAG.FRIEND_MOUDLE_SUB,[],true);
        tip.createOrGetTipData(TIP_TAG.FRIEND_MOUDLE_MAIL, [TIP_TAG.FRIEND_MOUDLE,TIP_TAG.FRIEND_MOUDLE_SUB]);
        tip.createOrGetTipData(TIP_TAG.PROP_MOUDLE,[TIP_TAG.FRIEND_MOUDLE]);
        //测试邮件
        // tip.updateTip(AppConst.COUNT_SUB_TAG.MAIL_MOUDLE,1);
        //测试 成就冒泡1条
        //tip.updateTip(TIP_TAG.ACHIEVEMENT_TYPE,1);
        //tip.updateTip(TIP_TAG.MISSION_TYPE,1);
        // tip.updateTip(TIP_TAG.FRIEND_MOUDLE_MAIL,1);

    }

    //初始化网络注册
    private registerNet():void {
        app.NetConfigs.initCommands();
    }
	
	//root级别的mvc注册
    private registerMvc(): void {
        //=============mediator==========================
        __REGISTER_PROXY(match.MatchProxy);
        __REGISTER_PROXY(match.MttProductDBProxy);
        __REGISTER_PROXY(room.RoomProxy);
        __REGISTER_PROXY(user.UserProxy);
        __REGISTER_PROXY(shop.ShopItemProxy);
        __REGISTER_PROXY(playcards.PlayCardsProxy);
        __REGISTER_PROXY(setting.SettingProxy);
        __REGISTER_PROXY(app.debug.DebugProxy);
        __REGISTER_PROXY(mission.MissionProxy);
        __REGISTER_PROXY(happy.HappyProxy);

        // __REGISTER_PROXY(slot.SlotProxy);

//        __REGISTER_PROXY(discover.DisconverProxy);
//        __REGISTER_PROXY(club.ClubProxy);
//        __REGISTER_PROXY(chat.ChatProxy);

        __REGISTER_PROXY(win.WinProxy);
        __REGISTER_PROXY(item.ItemProxy);
        __REGISTER_PROXY(antiSystem.AntiProxy);
        __REGISTER_PROXY(record.RecordProxy);
        __REGISTER_PROXY(dealer.DealerProxy);

        //游戏注销
        // __REGISTER_COMMAND(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION,login.LoginOutCommand);
        __REGISTER_COMMAND(app.constant.AppMediatorConst.NATIVE_LOCAL_NOTIFICATION_HANDLER,localNotification.ReceiveLocalNotificationCommand);

        __REGISTER_MEDIATOR(app.AppDelegateMediator);
        __REGISTER_MEDIATOR(preload.PreloadUIMediator);
        __REGISTER_MEDIATOR(shop.ShopMediator);
        __REGISTER_MEDIATOR(antiSystem.AntiMediator);
        __REGISTER_MEDIATOR(mission.MissionMediator);
        __REGISTER_MEDIATOR(award.AwardMediator);
        __REGISTER_MEDIATOR(room.CreatePKMediator);
        __REGISTER_MEDIATOR(match.MttRemindMediator);

        // 财神
        __REGISTER_PROXY(mammon.MammonProxy);


        __REGISTER_PROXY(guichu.GuiChuModuleProxy);         //极速幸运轮
        __REGISTER_PROXY(joker.JokerDBProxy);               //捷克达人

        // __REGISTER_MEDIATOR(slot.SlotMediator);
    }

	//静态预置加载注册
	private registerRes():void {
        var pre_group: Object = gameabc.UIConstants.PRE_MOUDLE_RES_GROUP;            //模块预置加载的资源组 
        var pre_res: Object = gameabc.UIConstants.PRE_MOUDLE_RES;                    //模块的预置加载的零散资源

        //通用预置资源组 登陆完成之后在设置
        // gameabc.UIPreloadManager.UI_ASSETS_NAME = "uiTextureAtlas";
        
        pre_group[AppReg.LOGIN] = ["login"];
        pre_res[AppReg.LOGIN] = [];
        
        pre_group[AppReg.APP_MAIN_UI] = ["mainui", "more"];
        pre_res[AppReg.APP_MAIN_UI] = [];

        pre_group[AppReg.ROOM] = ["room","pkroom","caishensongli"];
        pre_res[AppReg.ROOM] = [];

        pre_group[AppReg.SNG] = ["sng","icon","matchbgbar"];
        pre_res[AppReg.SNG] = [];
        
        pre_group[AppReg.APP_MY_INFO] = ["record","card","info"];
        pre_res[AppReg.APP_MY_INFO] = [];
        
        pre_group[AppReg.APP_POKER_INFO] = ["record","card","info"];
        pre_res[AppReg.APP_POKER_INFO] = [];
        
        pre_group[AppReg.APP_GPS_INFO] = ["record","card","info"];
        pre_res[AppReg.APP_GPS_INFO] = [];
        
        pre_group[AppReg.APP_REPORT_INFO] = ["record","card","info"];
        pre_res[AppReg.APP_REPORT_INFO] = [];
        
        pre_group[AppReg.APP_RECORD] = ["record","card","info"];
        pre_res[AppReg.APP_RECORD] = [];

        pre_group[AppReg.APP_RECORD_ANALYSIS] = ["record","card","info"];
        pre_res[AppReg.APP_RECORD_ANALYSIS] = [];

        pre_group[AppReg.APP_RECORD_INFO] = ["record","card","info"];
        pre_res[AppReg.APP_RECORD_INFO] = [];
        
        pre_group[AppReg.SHOP_WIN] = ["shop","icon"];
        pre_res[AppReg.SHOP_WIN] = [];

        pre_group[AppReg.APP_PLAYCARDS] = ["play","card","jinbichang","icon"];
        pre_res[AppReg.APP_PLAYCARDS] = ["s9_bg_play_bg_jpg"];
       
        pre_group[AppReg.APP_SETTING_TYPE] = ["more"];
        pre_res[AppReg.APP_SETTING_TYPE] = [];

        // pre_group[AppReg.APP_TAG] = ["more"];
        // pre_res[AppReg.APP_TAG] = [];
        
        pre_group[AppReg.APP_HEAD] = ["head"];
        pre_res[AppReg.APP_HEAD] = [];
        
        pre_group[AppReg.APP_BANK] = ["bank"];
        pre_res[AppReg.APP_BANK] = [];
        
        pre_group[AppReg.APP_NOTICE] = ["notice"];
        pre_res[AppReg.APP_NOTICE] = [];
        
        pre_group[AppReg.APP_PLAY_RECORD] = ["records","info"];
        pre_res[AppReg.APP_PLAY_RECORD] = [];
        
        pre_group[AppReg.APP_FEED] = ["feed"];
        pre_res[AppReg.APP_FEED] = [];

        pre_group[AppReg.APP_MISSION] = ["sign","icon"];
        pre_res[AppReg.APP_MISSION] = [];

        pre_group[AppReg.APP_SIGN] = ["sign","award"];
        pre_res[AppReg.APP_SIGN] = [];

        pre_group[AppReg.APP_RELAN_NAME] = ["real","shop"];
        pre_res[AppReg.APP_RELAN_NAME] = [];

        pre_group[AppReg.APP_PLAY_OVEN] = ["win"];
        pre_res[AppReg.APP_PLAY_OVEN] = [];

        pre_group[AppReg.WIN_APPRENTICESHIP] = ["win"];
        pre_res[AppReg.WIN_APPRENTICESHIP] = [];
 
		pre_group[AppReg.APP_MAIL] = ["mail"];
        pre_res[AppReg.APP_MAIL] = [];
        
        pre_group[AppReg.APP_MAIL_SUB] = ["mailSub"];
        pre_res[AppReg.APP_MAIL_SUB] = [];

        pre_group[AppReg.APP_PROP] = ["prop"];
        pre_res[AppReg.APP_PROP] = [];

        pre_group[AppReg.FIVE_CARD] = ["play","card"];
        pre_res[AppReg.FIVE_CARD] = [];

        pre_group[AppReg.GAME_FIRST] = ["gameui","card"];
        pre_res[AppReg.GAME_FIRST] = [];
        
        pre_group[AppReg.APP_HAPPY] = ["happy","card"];
        pre_res[AppReg.APP_HAPPY] = ["s9_bg_happy_bg_jpg"];  

        pre_group[AppReg.APP_HAPPY_MAIN] = ["happyselect"];
        pre_res[AppReg.APP_HAPPY_MAIN] = ["s9_sng_bg_jpg"];  

        pre_group[AppReg.APP_HAPPY_NOTSET] = ["happy"];
        pre_res[AppReg.APP_HAPPY_NOTSET] = [];  
        
        pre_group[AppReg.AWARD_MC_WIN] = ["award"];
        pre_res[AppReg.AWARD_MC_WIN] = [];

        pre_group[AppReg.APP_MONEY] = ["money"];
        pre_res[AppReg.APP_MONEY] = [];

        // pre_group[AppReg.SLOT] = ["slot"];
        // pre_res[AppReg.SLOT] = [];

        pre_group[AppReg.GREEN_HANDLER] = ["guide", "play"];
        pre_res[AppReg.GREEN_HANDLER]=[];

        pre_group[AppReg.MAMMON] = ["caishensongli"];
        pre_res[AppReg.MAMMON] = []

        pre_group[AppReg.newMammon] = ["caishensongli"];
        pre_res[AppReg.newMammon] = [];

        pre_group[AppReg.EDIT_ROLE_TIP] = ["info","record"];
        pre_res[AppReg.EDIT_ROLE_TIP] = [];

        // pre_group[AppReg.INFO_TIP_ADD] = ["info"];
        // pre_res[AppReg.INFO_TIP_ADD] = []
        // pre_group[AppReg.INFO_TIP_DEL] = ["info"];
        // pre_res[AppReg.INFO_TIP_DEL] = []

        pre_group[AppReg.APP_CHARMWHEEL] = ["charm", "icon"];
        pre_res[AppReg.APP_CHARMWHEEL] = [];

        pre_group[AppReg.APP_TREASURE] = ["lotteryhall", "icon"];
        pre_res[AppReg.APP_TREASURE] = ["btn_mainui_duobaoqibing_png"];

        pre_group[AppReg.CREATE_PK_ROOM] = ["pkroom"];
        pre_res[AppReg.CREATE_PK_ROOM] = [];

        pre_group[AppReg.DRAG_IN] = ["pkroom"];
        pre_res[AppReg.DRAG_IN] = [];

        pre_group[AppReg.APP_GOLD_TREE] = ["jinbichang"];
        pre_res[AppReg.APP_GOLD_TREE]=[];

        pre_group[AppReg.APP_ChengZhang] = ["jinbichang"];
        pre_res[AppReg.APP_ChengZhang] = [];   
        
        pre_group[AppReg.MATCH_MAIN] = ["matchselect"];
        pre_res[AppReg.MATCH_MAIN] = [];

        pre_group[AppReg.MTT] = ["mtt","matchbgbar"];
        // pre_group[AppReg.MTT] = ["mtt","room"];
        pre_res[AppReg.MTT] = [];//"mtt"
        pre_group[AppReg.MTT_PRODUCT] = ["mtt","matchbgbar"];
        pre_res[AppReg.MTT_PRODUCT] = [];

        pre_group[AppReg.MTT_EXCHANGE] = ["mtt","matchbgbar"];
        pre_res[AppReg.MTT_EXCHANGE] = [];

        pre_group[AppReg.MTT_EXCHANGE_CODE] = ["mtt","matchbgbar"];
        pre_res[AppReg.MTT_EXCHANGE_CODE] = [];

        pre_group[AppReg.APP_DEALERINFO] = ["info", "record"];
        pre_res[AppReg.APP_DEALERINFO] = [];

        pre_group[AppReg.APP_FRIEND_MAIN] = ["friend","info"];
        pre_res[AppReg.APP_FRIEND_MAIN] = [];

        pre_group[AppReg.GUICHU] = ["guichu_wheel"];
        pre_res[AppReg.GUICHU] = [];

        pre_group[AppReg.GUICHU_AUTO_LOGIN] = ["uiTextureAtlas"];
        pre_res[AppReg.GUICHU_AUTO_LOGIN] = [];
    }

	/*
	 * 模块注册
	 */ 
	private registerMoudle():void {
    	  //传入模块时使用的参数
        /*
         * uimoudle的相关参数
         * @destoryTime 关闭后释放延迟的时间 -1 永不回收 0立即回收 大于0的n秒之后回收(暂没有实现)
         * @autoClose 是否点击空白处自动关闭
         * @type ui的类型，这个是扩展功能现在思路还不是很清晰（比如窗口组管理)
         * @isFullScene 是否是全屏化
         * @isModal 是否有模态遮罩 默认没有遮罩 0没有这招,1开启遮罩
         */
        var param: any = gameabc.UIMoudleData;
        //__REGISTER_MOUDLE(AppReg.MAP_WORLD,worldMap.WorldMapUIMoudleComp,gameabc.UIMoudle,new param(-1,false,1,true));

        __REGISTER_MOUDLE(__PRELOAD__,                preload.PreloadUIMoudleComp,gameabc.UIMoudle,new param(-1,false,1,true));

        __REGISTER_MOUDLE(AppReg.IOS_SHARE,platform.IosShared,gameabc.UIMoudle,new param(0,false,1,true,0));
        __REGISTER_MOUDLE(AppReg.TEST_WIN,test.NativeTest,gameabc.UIMoudle,new param(0,false,1,false,0));

        __REGISTER_MOUDLE(AppReg.LOGIN,                  login.LoginMoudle,gameabc.UIMoudle,new param(0,false,1,true,0));
        __REGISTER_MOUDLE(AppReg.DEBUG_LOGIN,            svrDebug.DebugLoginModule,gameabc.UIMoudle,new param(0,false,1,false,0));

        __REGISTER_MOUDLE(AppReg.APP_MAIN_UI,            main.AppMainUIMoudelComp,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.ROOM,                   room.RoomMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.VIP_ROOM_RULE,          room.VipRuleMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.SNG_RULE,               sng.SngRuleMoudle,gameabc.UIMoudle,new param(0,true,1,false, 1));
        __REGISTER_MOUDLE(AppReg.CURRENT_MATCH_INFO,     sng.SngStateMoudle,playcards.PlaycardUIMoudle,new param(0,true,1,false, 1));
        __REGISTER_MOUDLE(AppReg.CREATE_ROOM,            room.CreateMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.JOIN_VIP_ROOM,          room.JoinMoudle,gameabc.UIMoudle,new param(0,false,1,false));
        __REGISTER_MOUDLE(AppReg.SNG,                    sng.SngMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.SNG_RESLUT,             sng.SngResultMoudle,gameabc.UIMoudle,new param(0,false,1,false));
        __REGISTER_MOUDLE(AppReg.MATCH_MAIN,             match.MatchMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.MTT,                    match.MttMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.MTT_STATE,              match.MttStateMoudle,playcards.PlaycardUIMoudle,new param(0,true,1,false, 1));
        __REGISTER_MOUDLE(AppReg.PHONE_VALIDATE,         match.MttPhoneValidateMoudle,playcards.PlaycardUIMoudle,new param(0,true,1,false, 1));
        // __REGISTER_MOUDLE(AppReg.SNG_ENTRY,              room.EntryMoudle,gameabc.UIMoudle,new param(0,false,1,false));
//        __REGISTER_MOUDLE(AppReg.MTT_SELECT,             room.TYPESelectMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_MY_INFO,            myInfo.MyInfoUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,true,1,false));//主界面的个人信息界面入口
        __REGISTER_MOUDLE(AppReg.APP_POKER_INFO,         myInfo.PokerInfoUIMoudle,playcards.PlaycardUIMoudle,new param(0,true,1,false));//好友界面及牌局界面的个人信息界面入口
        __REGISTER_MOUDLE(AppReg.APP_GPS_INFO,           myInfo.PokerGPSUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_REPORT_INFO,        myInfo.PokerReportUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_DEBUG,              app.debug.DebugView,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.SHOP_WIN,  shop.ShopWinModule,gameabc.UIMoudle,new param(0,false,1,true,1));
        __REGISTER_MOUDLE(AppReg.APP_SIGN, mission.SignUIModule,playcards.PlaycardUIMoudle,new param(1,true,1,false,1));
        
//        __REGISTER_MOUDLE(AppReg.LOGIN,            app.login.LoginUIComp,gameabc.UIMoudle,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_XIUXIU,       xiuxiu.XiuXiuMoudle,gameabc.UIMoudle,new param(-1,false,1,true));
//        __REGISTER_MOUDLE(AppReg.CREATE_MATCH,     main.CreateMatchMoudle,gameabc.UIMoudle,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_MY_INFO,      myInfo.MyInfoUIMoudleComp,gameabc.UIMoudle,new param(-1,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_DEALER,myInfo.DealerImageUIMoudle,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_RECORD,       record.RecordUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_RECORD_INFO,       record.RecordInfoUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_RECORD_ANALYSIS,  record.RecordAnimalAnalysisUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.BOTTOM_BAR,       main.BottomBarMoudle,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_PLAYCARDS,playcards.PlayCardsUIMoudleComp,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_PLAY_BUY,playcards.PlayCardBuyUIModuleComp,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_PLAY_REVIEW,playcards.PlayCardReviewWinModule,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_PLAY_COUNT, playcards.PlaycardsCountUIModuleComp, playcards.PlaycardUIMoudle, new param(0, true, 1, false, 1));
       __REGISTER_MOUDLE(AppReg.SAFE_HELP, playcards.PlayCardsSafeHelpModuleComp, playcards.PlaycardUIMoudle, new param(0, true, 1, false, 1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY,happy.HappyUIMoudleComp,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_MAIN,happy.HappyRoomUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_NOTSET,happy.HappyNoSeatUIMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_UP,happy.HappyUpperUIMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_STAT,happy.HappyStatUIMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_RULE,happy.HappyRuleMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_REWARD, happy.HappyRewardMoudle, gameabc.UIMoudle, new param(0, true, 1, false, 1));
        __REGISTER_MOUDLE(AppReg.APP_HAPPY_LUCKY, happy.HappyLuckySelectUIMoudle, gameabc.ScaleTo1UIModule, new param(0, true, 1, false, 1));
       __REGISTER_MOUDLE(AppReg.APP_BANK_LINE,happy.HappyBankLineUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        // __REGISTER_MOUDLE(AppReg.APP_PLAY_EDIT_INFO,playcards.info.PlayerEditInfoComp,playcards.PlaycardUIMoudle,new param(-1,false,1,true));
        // __REGISTER_MOUDLE(AppReg.APP_PLAY_INFO,playcards.info.PlayerInfoComp,playcards.PlaycardUIMoudle,new param(-1,false,1,true));
        //  __REGISTER_MOUDLE(AppReg.APP_QR,           qr.QRCodeMoudleComp,gameabc.UIMoudle,new param(0,true,1,false));
        // __REGISTER_MOUDLE(AppReg.APP_INFO_MODIFY,  myInfo.MyInfoModifyUIMoudle,gameabc.UIMoudle,new param(-1,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_DISCOVER,     discover.DiscoverUIMoudel,gameabc.UIMoudle,new param(-1,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_CLUB,         club.ClubMoudle,gameabc.UIMoudle,new param(-1,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_CHAT_PAGE,    chat.ChatPageUIModule,gameabc.UIMoudle,new param(0,false,1,true));
        //先注释了这条，是从H5拷过来的，暂时还没用到，暂时关闭，如要启用，请另使用新的常量ID
//        __REGISTER_MOUDLE(AppReg.ALERT,tip.Alert,gameabc.UIMoudle,new param(0,false,1,true));//TIP
//        __REGISTER_MOUDLE(AppReg.APP_CLUB_CREATE,  club.CreateClubMoudle,gameabc.UIMoudle,new param(0,false,1,true));//TIP
        
//        __REGISTER_MOUDLE(AppReg.APP_CLUB_SEARCH,  club.SearchClubMoudle,gameabc.UIMoudle,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_CLUB_VERIFY,  club.ClubVerifyMoudle,gameabc.UIMoudle,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_CLUB_TABLE,   club.ClubMatchMoudle,gameabc.UIMoudle,new param(0,false,1,true));
//        __REGISTER_MOUDLE(AppReg.APP_STATIS,playcards.PlayStatisUIMoudleComp,gameabc.UIMoudle,new param(-1,false,1,true));
        __REGISTER_MOUDLE(AppReg.KEYBOARD,uicomps.KeyboardUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.ALERT,tip.Alert,gameabc.ScaleTo1UIModule,new param(0,false,1,true,1));
        __REGISTER_MOUDLE(AppReg.AWARD_WIN,award.AwardWinModule,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_SETTING_TYPE,setting.APPSetUIMoudle,gameabc.ScaleTo1UIModule,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_HEAD,head.HeadReplaceUIMoudle,gameabc.ScaleTo1UIModule,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_BANK,bank.BankUIMoudle,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_NOTICE,notice.NoticeUIMoudle,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_PLAY_RECORD,record.PlayRecordUIMoudleComp,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FEED,feed.FeedUIMoudle,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));
        //__REGISTER_MOUDLE(AppReg.TEST_PLAYCARDS,test.TestPlaycardsUI,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_PLAY_OVEN, win.WinUIMoudle, gameabc.UIMoudle, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.WIN_APPRENTICESHIP, win.ApprenticeshipUIModule, gameabc.UIMoudle, new param(0,true,1,false,1));

		__REGISTER_MOUDLE(AppReg.APP_MAIL, mail.MailUIMoudle, gameabc.ScaleTo1UIModule, new param(0,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_MAIL_SUB, mail.MailSubUIMoudle, gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_MISSION, mission.MissionUIModule,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));

        __REGISTER_MOUDLE(AppReg.APP_SIGN, mission.SignUIModule,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_PROP, item.PropUIMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));

        __REGISTER_MOUDLE(AppReg.FIVE_CARD,fiveCard.FiveCardUIModule,gameabc.UIMoudle,new param(0,true,1,true,0));
        __REGISTER_MOUDLE(AppReg.SG_CLEAR, smallGame.ClearGameMoudle, gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.SG_MEMORY, cardMemory.CardMemoryUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.GAME_FIRST, smallGame.GameTurnUIMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_RELAN_NAME, antiSystem.RealNameUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));

        // __REGISTER_MOUDLE(AppReg.APP_TAG, main.MoreTagMoudle,gameabc.UIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FRIEND_MAIN, friend.FriendUIMoudle, gameabc.ScaleTo1UIModule, new param(-1,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FRIEND_MAIL, friend.FriendMailUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FRIEND_FACEADD, friend.FriendFaceAddUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FRIEND_INFO, friend.FriendInfoUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FRIEND_INVITE, friend.FriendInviteUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,true,1));
        __REGISTER_MOUDLE(AppReg.AWARD_MC_WIN,award.AwardMCUIModule,gameabc.UIMoudle,new param(0,false,1,true,0));
        __REGISTER_MOUDLE(AppReg.APP_BILL, bill.BillMainUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_BILL_SUB, bill.BillUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_MONEY,money.MoneyGuideUIMoudle,gameabc.UIMoudle,new param(0,false,1,true,0));
        __REGISTER_MOUDLE(AppReg.APP_CHARMWHEEL, charmWheel.CharmWheelUIMoudle, gameabc.UIMoudle, new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.HOOK,happy.HookUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false));

        __REGISTER_MOUDLE(AppReg.GREEN_HANDLER,guide.GreenHandlerUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_TREASURE,treasure.TreasureUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_TREASURE_SUB, treasure.TreasureSubUIMoudle, gameabc.ScaleTo1UIModule, new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.MAMMON, mammon.MammonUIMoudle, gameabc.ScaleTo1UIModule, new param(0, true, 1, false));
        __REGISTER_MOUDLE(AppReg.newMammon, mammon.newMammonUIModule, gameabc.ScaleTo1UIModule, new param(0, true, 1, false));
        // __REGISTER_MOUDLE(AppReg.SLOT,slot.SlotUI,gameabc.UIMoudle,new param(0,false,1,false));

        // 用户标签
        __REGISTER_MOUDLE(AppReg.EDIT_ROLE_TIP,myInfo.InfoTipEditUIMoudleComp,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));
        // __REGISTER_MOUDLE(AppReg.INFO_TIP_ADD,myInfo.InfoTipAdd,gameabc.ScaleTo1UIModule,new param(0,true,1,false));
        // __REGISTER_MOUDLE(AppReg.INFO_TIP_DEL,myInfo.InfoTipDel,gameabc.ScaleTo1UIModule,new param(0,true,1,false));

        __REGISTER_MOUDLE(AppReg.DRAG_IN,uicomps.DragInUIMoudle,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.CREATE_PK_ROOM,room.CreatePKRoomUIMoudle,gameabc.UIMoudle,new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.APP_GOLD_TREE, playcards.PlayCardsGodTreeUIModuleComp, playcards.PlaycardUIMoudle, new param(0, true, 1, false, 1));
         __REGISTER_MOUDLE(AppReg.APP_ChengZhang, playcards.PlaycardsChengZhangComp, playcards.PlaycardUIMoudle, new param(0, true, 1, false, 1));
        __REGISTER_MOUDLE(AppReg.APP_GOLD_TREE_TIP,playcards.PlaycardsChengZhangTipComp,playcards.PlaycardUIMoudle,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.MTT_PRODUCT,match.MttProductUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.MTT_EXCHANGE,match.MttProductExchangeUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.MTT_EXCHANGE_CODE,match.MttProductExchangeCodeUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.MTT_EXCHANGE_HISTORY,match.MttExchangeHistoryUIModule,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_DEALERINFO,dealerInfo.DealerInfoUIMoudle,gameabc.ScaleTo1UIModule,new param(0,true,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_DEALERONLINELIST,friend.DealerOnlineListUIMoudle,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));
        __REGISTER_MOUDLE(AppReg.APP_FREEBROKE,room.FreeBrokeMoudle,gameabc.UIMoudle,new param(0,false,1,false,1));

        __REGISTER_MOUDLE(AppReg.DEBUGLOGIN, guichu.DebugLogin ,gameabc.UIMoudle, new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.GUICHU, guichu.GuiChuModule ,gameabc.UIMoudle, new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.GUICHU_RULE, guichu.GuiChuRuleModule ,gameabc.ScaleTo1UIModule, new param(0,false,1,false));
        __REGISTER_MOUDLE(AppReg.GUICHU_DAILY, guichu.GuiChuDailyAwardModule ,gameabc.ScaleTo1UIModule, new param(0,false,1,false));

        __REGISTER_MOUDLE(AppReg.GUICHU_AUTO_LOGIN, guichu.GuichuAutoLogin ,gameabc.UIMoudle, new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.IPV6_TEST,test.IPV6Test,gameabc.UIMoudle,new param(0,false,1,false));

        __REGISTER_MOUDLE(AppReg.JOKER_DEBUG_LOGIN, joker.JokerDebugModule ,gameabc.UIMoudle, new param(0,false,1,true));
        __REGISTER_MOUDLE(AppReg.JOKER_MODULE,joker.JokerGameModule,gameabc.UIMoudle,new param(0,false,1,true,1));
        __REGISTER_MOUDLE(AppReg.JOKER_RATIO_MODULE,joker.JokerRatioUIModule,gameabc.ScaleTo1UIModule,new param(0,false,1,false,1));


    }
}
