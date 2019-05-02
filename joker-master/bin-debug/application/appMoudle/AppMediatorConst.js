var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var constant;
    (function (constant) {
        /**
         *
         * @author
         *
         */
        var AppMediatorConst = (function () {
            function AppMediatorConst() {
            }
            return AppMediatorConst;
        }());
        /**登陆*/
        AppMediatorConst.LOGIN_ACTION = "LOGIN_ACTION"; //"login"                    //用户登录成功
        AppMediatorConst.LOGIN_FAILED = "LOGIN_FAILED";
        AppMediatorConst.LOGIN_MESS = "LOGIN_MESS"; //登陆界面提示文字
        AppMediatorConst.LOGIN_SUCESS_TOHER = "LOGIN_SUCESS_OTHER"; //第三方平台登录成功
        AppMediatorConst.LOGIN_OUT = "LOGIN_OUT"; //注消
        AppMediatorConst.FORCE_LOGIN = "FORCE_LOGIN"; //强登
        /***重登**/
        AppMediatorConst.AGAIN_LOGIN_ACTION = "AGAIN_LOGIN_ACTION"; //重登
        /**native本地消息推送处理 */
        AppMediatorConst.NATIVE_LOCAL_NOTIFICATION_HANDLER = "NATIVE_LOCAL_NOTIFICATION_HANDLER";
        /* 登陆配置*/
        AppMediatorConst.GAME_CONFIG = "GAME_CONFIG";
        //获取牌局列表
        AppMediatorConst.GET_RECORD_TABLES = "GET_RECORD_TABLES";
        //获取牌局列表
        AppMediatorConst.UPDATE_RECORD_TABLES = "UPDATE_RECORD_TABLES";
        //充值成功
        AppMediatorConst.PAY_SUCCEED_ALERT = "PAY_SUCCEED_ALERT";
        //获取商品列表成功
        AppMediatorConst.PAY_SUCCEED_ITMES = "PAY_SUCCEED_ITMES";
        /**
        * 单机游戏开始
        */
        AppMediatorConst.MATCH_START = "MATCH_START";
        /*** cd结束*/
        AppMediatorConst.MATCH_CDOVER = "MATCH_CDOVER";
        //  /*** 荷官房间坐下*/
        //public static MATCH_SITE: string = "MATCH_SITE";
        /**
       * 单机游戏结束
       */
        AppMediatorConst.MATCH_END = "MATCH_END";
        /**
       * 打牌界面空打开
       */
        AppMediatorConst.MATCH_NONEOPEN = "MATCH_NONEOPEN";
        /**
         * PK房带入坐下
         * @type {string}
         */
        AppMediatorConst.DRAG_IN_SIT_DOWN = "DragInSitDown";
        /*** 显示按钮*/
        AppMediatorConst.MATCH_SHOWBTNS = "MATCH_SHOWBTNS";
        /**显示猜牌 */
        AppMediatorConst.MATCH_SHOWCG = "MACTH_SHOWCG";
        /*** 显示牌局提示*/
        AppMediatorConst.MATCH_SHOWTIP = "MATCH_SHOWTIP";
        /**推送入座 */
        AppMediatorConst.MATCH_S_SIT = "MATCH_S_SIT";
        /**推送站起 */
        AppMediatorConst.MATCH_S_UP = "MATCH_S_UP";
        /**推送前注信息 */
        // public static MATCH_S_ANTE_UPDATE: string = "MATCH_S_ANTE_UPDATE";
        /*** 牌局退出房间提示*/
        AppMediatorConst.MATCH_OUTROOM = "MATCH_OUTROOM";
        //查看个人数据
        AppMediatorConst.SEE_LABEL_INFO = "SEE_LABEL_INFO";
        //修改个人信息标签
        AppMediatorConst.MODIFY_LABEL_INFO = "MODIFY_LABEL_INFO";
        //购买vip成功
        AppMediatorConst.BUY_VIP_SUCCEED = "BUY_VIP_SUCCEED";
        //升级vip成功
        AppMediatorConst.COVERAGE_VIP_SUCCEED = "COVERAGE_VIP_SUCCEED";
        //更新公告
        AppMediatorConst.NOTICE_INIT = "NOTICE_INIT";
        // /*更新公告界面*/
        // public static NOTICE_UI_INIT:string = "NOTICE_UI_INIT";
        // public static NOTICE_NONE:string = "NOTICE_NONE";
        //获取邮件
        AppMediatorConst.IMS_GETS = "IMS_GETS";
        //新邮件数
        AppMediatorConst.IMS_READ_NUM = "IMS_READ_NUM";
        //读邮件
        AppMediatorConst.IMS_READ = "IMS_READ";
        AppMediatorConst.LOG_DEBUG = "LOG_DEBUG";
        //更新
        AppMediatorConst.UP_RECORD_DATA = "UP_RECORD_DATA";
        //更新主界面信息
        AppMediatorConst.UP_USER_INFO_DATA = "UP_USER_INFO_DATA";
        //更新打牌的数据信息
        AppMediatorConst.UP_PLAY_INFO_DATA = "UP_PLAY_INFO_DATA";
        //清理桌子上的玩家UI
        AppMediatorConst.CLEAR_TABLE_PLAYER_UI = "CLEAR_TABLE_PLAYER_UI";
        AppMediatorConst.UPDATE_COIN = "UPDATE_COIN";
        AppMediatorConst.UPDATE_FREE_GOLD = "UPDATE_FREE_GOLD";
        /**
         * 离开游戏
         */
        AppMediatorConst.GAME_OUT = "GameOut";
        //更新好友列表
        AppMediatorConst.UP_USER_FRIEND = "UP_USER_FRIEND";
        //更新搜索好友
        AppMediatorConst.UP_USER_SEARCH = "UP_USER_SEARCH";
        //更新好友请求列表
        AppMediatorConst.UP_USER_REQUEST = "UP_USER_REQUEST";
        //更新面对面好友列表
        AppMediatorConst.UP_USER_FRIEND_FACE2FACE = "UP_USER_FRIEND_FACE2FACE";
        //更新面对面加好友成功
        AppMediatorConst.UP_USER_FRIEND_FACE2FACE_SUCCESS = "UP_USER_FREIND_FACE2FACE_SUCCESS";
        //更新好友邀请列表
        AppMediatorConst.UP_USER_INVITE = "UP_USER_INVITE";
        //获得好友请求
        AppMediatorConst.UP_FRIEND_INVITE = "UP_FRIEND_INVITE";
        //更新账单
        AppMediatorConst.UP_BILL = "UP_BILL";
        //子账单
        AppMediatorConst.OPEN_BILL_SUB = "OPEN_BILL_SUB";
        /**刷新MissionBox的状态 */
        AppMediatorConst.AWAKEN_MISSION_BOX = "awakenMissionBox";
        /**刷新挂机 */
        AppMediatorConst.HAPPY_HOOK = "HAPPY_HOOK";
        /**更新奖池 */
        AppMediatorConst.HAPPY_WINBETS = "HAPPY_WINBETS";
        /** SNG为更新人数，MTT为提示消息(3显示系统配桌  2比赛即将开始) */
        AppMediatorConst.UPDATE_MATCH_NUMPLAYERS = "UPDATE_MATCH_NUMPLAYERS";
        /**开始魅力转轮 */
        AppMediatorConst.CHARM_WHEEL_START = "CHARM_WHEEL_START";
        /**我的转轮纪录 */
        AppMediatorConst.CHARM_WHEEL_MY_RECORD = "CHARM_WHEEL_MY_RECORD";
        /**他人的转轮纪录 */
        AppMediatorConst.CHARM_WHEEL_OTHER_RECORD = "CHARM_WHEEL_OTHER_RECORD";
        AppMediatorConst.CHARM_WHEEL_NO_RECORD = "CHARM_WHEEL_NO_RECORD";
        /**更新大厅数据 */
        AppMediatorConst.TREASURE_GET_TREASURES = "TREASURE_GET_TREASURES";
        /**更新夺宝历史 */
        AppMediatorConst.TREASURE_TREASURE_RECORDS = "TREASURE_TREASURE_RECORDS";
        /**更新夺宝后的数据 */
        AppMediatorConst.TREASURE_DO_TREASURE = "TREASURE_DO_TREASURE";
        /**更新正在开奖数据 */
        AppMediatorConst.TREASURE_OPEN_TREASURES = "TREASURE_OPEN_TRASURES";
        /**更新我的全部 */
        AppMediatorConst.TREASURE_GET_MY_ALL_TREASURES = "TREASURE_GET_MY_ALL_TREASURES";
        /**更新我的现在 */
        AppMediatorConst.TREASURE_GET_MY_NOW_TREASURES = "TREASURE_GET_MY_NOW_TREASURES";
        /**更新我的获奖 */
        AppMediatorConst.TREASURE_MY_GET_REWARD_RECORD = "TREASURE_MY_GET_REWARD_RECORD";
        AppMediatorConst.TREASURE_MY_GET_REWARD = "TREASURE_MY_GET_REWARD";
        AppMediatorConst.TREASURE_REFRESH_LIST = "TREASURE_REFRESH_LIST";
        AppMediatorConst.TREASURE_FAIL = "TREASURE_FAIL";
        /** 更新我的自定义标签界面 */
        AppMediatorConst.INFO_TIP_UPDATE = "INFO_TIP_UPDATE";
        AppMediatorConst.UPDATE_MATCH_LIST = "UPDATE_MATCH_LIST";
        /** 荷官列表更新 */
        AppMediatorConst.DEALERLIST_UPDATE = "DEALERLIST_UPDATE";
        /** 荷官信息更新 */
        AppMediatorConst.DEALERINFO_UPDATE = "DEALERINFO_UPDATE";
        /** 荷官关注列表更新 */
        AppMediatorConst.DEALERFOCUSLIST_UPDATE = "DEALERFOCUSLIST_UPDATE";
        /** 玩家人数更新 */
        AppMediatorConst.PLAYER_NUMBER_UPDATE = "PLAYER_NUMBER_UPDATE";
        /** 更新MTT比赛时间更新 */
        AppMediatorConst.UPDATE_MTT_TIME_STEP = "UPDATE_MTT_TIME_STEP";
        /** 更新MTT比赛时间某场比赛开始了 */
        AppMediatorConst.UPDATE_MTT_TIMESUP = "UPDATE_MTT_TIMEUP";
        /** 更新老虎机排名 */
        AppMediatorConst.UPDATE_SLOT_RANK = "UPDATE_SLOT_RANK";
        /** 比赛报名成功了 */
        AppMediatorConst.SIGNUP_SUCCESS = "UPDATE_SLOT_RANK";
        /** 更新奖池记录 */
        AppMediatorConst.UPDATE_MAMMON_POOL_RECORD = "UPDATE_MAMMON_POOL_RECORD";
        /**
         * 进入房间成功
         */
        AppMediatorConst.JOIN_ROOM_SUCCEED = "join_room_succeed";
        /**
         * 进入房间失败
         */
        AppMediatorConst.JOIN_ROOM_FAULT = "join_room_fault";
        constant.AppMediatorConst = AppMediatorConst;
        __reflect(AppMediatorConst.prototype, "app.constant.AppMediatorConst");
    })(constant = app.constant || (app.constant = {}));
})(app || (app = {}));
//# sourceMappingURL=AppMediatorConst.js.map