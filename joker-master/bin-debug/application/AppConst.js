var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 项目中所有用到的一些静态数据
 * @author
 */
var AppConst = (function () {
    function AppConst() {
    }
    Object.defineProperty(AppConst, "VERSION_ID", {
        get: function () {
            //return parseInt(gameabc.getConfig("VERSION_ID"));
            return parseInt(AppConst.RESOURCE_VER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConst, "VERSION_STR", {
        //游戏内显示版本号
        get: function () {
            // var idStr: string = this.VERSION_ID.toString();
            // var str1 = Number(idStr.substr(0,1))
            // var str2 = Number(idStr.substr(1,3))
            // var str3 = Number(idStr.substr(4,3))
            // return str1+"."+ str2+"." + str3;
            return this.RUNTIME_VER;
        },
        enumerable: true,
        configurable: true
    });
    AppConst.setServer = function (svr) {
        AppConst.CONNECT_SERVER = svr;
        AppConst.GAME_ID = svr.gameId;
        AppConst.GAME_ID_FREE = AppConst.getGameIdFree(svr.gameId);
        app.NetAction.MS_APPID = svr.moduleServerId;
    };
    AppConst.getGameIdFree = function (gameId) {
        return gameId == 5028 ? 5052 : 424;
    };
    return AppConst;
}());
/**
 * runtime 版本
 */
AppConst.RUNTIME_VER = "1.0.0";
/*资源版本控制管理*/
AppConst.RESOURCE_VER = "1001001";
// 这里全是测试的 服务器地址和配置， 正式的在SrsConfig文件中，Ctrl点击跳转到SrsIp类，并滚轮向上，即可找到
AppConst.OUT_SVR = new cy.SrsIp(0, "61.164.152.71", 5601, 427, 3790, "123.59.14.4:9091", "123.59.14.4:9092", "外网71", 1 /* PUBLIC */);
AppConst.IN_SVR = new cy.SrsIp(0, "192.168.136.90", 4005, 5028, 190, "192.168.138.131:9091", "192.168.138.131:9092", "内网90", 0 /* INTERNAL */);
AppConst.IN_SVR2 = new cy.SrsIp(0, "192.168.135.57", 4102, 427, 4001, "192.168.138.131:9091", "192.168.138.131:9092", "内网57", 3 /* MINE_57 */);
// static IN_SVR   = new cy.SrsIp(0, "192.168.136.90",  6105,  5029,  190,  "10.224.32.70:9091", "10.224.32.70:9092", "内网90",  room.CONFIG.INTERNAL);
AppConst.OUT_SVR2 = new cy.SrsIp(0, "61.153.110.201", 5401, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "强选201");
AppConst.OUT_SVR3 = new cy.SrsIp(0, "121.199.15.135", 5401, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "强选135");
AppConst.OUT_SVR4 = new cy.SrsIp(0, "61.153.110.203", 5401, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "强选203");
AppConst.OUT_SVR5 = new cy.SrsIp(0, "122.228.235.228", 5401, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "强选228");
AppConst.OUT_SVR6 = new cy.SrsIp(3809, "118.178.85.188", 5601, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "188:5601");
AppConst.OUT_SVR7 = new cy.SrsIp(3810, "118.178.85.188", 5602, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092", "188:5602");
AppConst.BF_SVR1 = new cy.SrsIp(0, "115.28.152.168", 4008, 1547, 4870, "123.59.14.4:9091", "123.59.14.4:9092", "边锋平台", 4 /* BF_TEST */, 10);
AppConst.GROUP_ID = "1"; //魔方的GroupID
//123.59.14.4 外网
//10.224.32.70 内网
/**
 * 边锋pt账号注册到茶苑
 * @type {string}
 *
 */
AppConst.BFPT_TO_GAMET_REG_URL = "http://www.gametea.com/srvcenter/sdo2gt_reg.php?";
AppConst.GAME_ID = 427; //德州427;//外网
AppConst.GAME_ID_99 = 419;
AppConst.GAME_ID_FREE = 424;
AppConst.GAME_BANK_ID = 426;
AppConst.LOGING_CAN_BOOL = false; //
/**
 * 模块ID
 */
AppConst.gameConfigType = {
    gameType1: 1,
    gameType2: 2,
    gameType3: 3,
    gameType4: 4,
    gameType5: 5,
    gameType7: 7,
    gameType8: 8,
    gameType10: 10 //钱庄是否显示开关
};
/**
 * 全局字体颜色表--可以扩展
 */
AppConst.TextColors = {
    white: 0xFFFFFF,
    milkWhite: 0xfbf1af,
    grayWhite: 0xceb6a2,
    yellow: 0xFFD200,
    lightYellow: 0xFFFFCC,
    orangeYellow: 0xff9900,
    orange: 0xFFA801,
    red: 0xFF0000,
    green: 0x02F720,
    blue: 0x01C4FE,
    grayBlue: 0x2f5177,
    purple: 0xCC00FF,
    pink: 0xFF0E99,
    black: 0x2e2d2d,
    golden: 0xFFD700,
    lightPurple: 0xAB8DB5,
    darkYellow: 0xF4CB00 //土黄色
};
/**
 * 全局字体大小表--可以扩展
 */
AppConst.LabelFontSize = {
    littleSize: 14,
    smallSize: 16,
    middleSize: 18,
    normalSize: 20,
    bigSize: 36 //大型字体大小
};
//房间类型
AppConst.CHAT_ROOT_TYPE = {
    CLUB: 1,
    SNS: 2,
    PR: 3,
    PT: 4 //4私聊
};
//聊天类型
AppConst.CHAT_TYPE = {
    //1聊天,2牌谱,3战绩,4创建牌局,5进入牌局,6退出牌局,7牌局结束,8加入俱乐部,9退出俱乐部，10邀请加入群聊
    CHAT: 1,
    PAI_PU: 2,
    RECORD: 3,
    C_PJ: 4,
    INTO_PJ: 5,
    OUT_PJ: 6,
    OVER_PJ: 7,
    JOIN_CLUB: 8,
    OUT_CLUB: 9,
    JOIN_SNS: 10
};
//数量复合标签
AppConst.COUNT_SUB_TAG = {
    MISSION_TYPE: "missionType",
    ACHIEVEMENT_TYPE: "achievement",
    MISSION_ACHIEVE: "missionAchievement",
    SIGN_TYPE: "signType",
    MISSION_MOUDLE: "missionModule",
    MAIL_MOUDLE: "mailMoudle",
    FRIEND_MOUDLE: "friendMoudle",
    FRIEND_MOUDLE_SUB: "friendMoudleSub",
    FRIEND_MOUDLE_MAIL: "friendMoudleMail",
    PROP_MOUDLE: "propItemMoudle" //道具模块
};
//设置相关
AppConst.SETTING_TYPE = {
    /** */
    GAME_SETTING: "GAME_SETTING",
    /**背景音乐 */
    GAME_SETTING_TYPE_1: "GAME_SETTING_TYPE_1",
    /** 震动 */
    GAME_SETTING_TYPE_2: "GAME_SETTING_TYPE_2",
    /**游戏音效 */
    GAME_SETTING_TYPE_3: "GAME_SETTING_TYPE_3",
    /**全屏显示 */
    GAME_SETTING_TYPE_4: "GAME_SETTING_TYPE_4",
    /**PC */
    GAME_SETTING_TYPE_: "GAME_SETTING_TYPE_",
    /**登录类型 0是茶苑 1是边锋 */
    GAME_LOGIN_TYPE: "GAME_LOGIN_TYPE",
};
AppConst.SLOT_OPEN = false; //老虎机开关
__reflect(AppConst.prototype, "AppConst");
//# sourceMappingURL=AppConst.js.map