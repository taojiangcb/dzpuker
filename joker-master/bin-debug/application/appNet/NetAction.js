var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var NetAction = (function () {
        function NetAction() {
        }
        return NetAction;
    }());
    NetAction.VIRTUAL_SERVER = "VIRTUAL_SERVER";
    NetAction.SRS_CONNECT = "SRS_CONNECT";
    NetAction.SRS_ERROR = "SRS_ERROR";
    NetAction.SRS_CLOSE = "SRS_CLOSE";
    NetAction.SRS_ALL_ERROR = "SRS_ALL_ERROR";
    NetAction.CMDT_ENCRYPTVER = "1";
    NetAction.CMDT_CHECKACT = "2";
    NetAction.CMDT_REQKEY = "3";
    NetAction.CMDT_RESPKEY = "4";
    NetAction.CMDT_PLAYERCONNECT = "5"; //SRS协议，请求登录
    NetAction.CMDT_PLAYERDATA = "6"; //SRS协议，登录返回
    NetAction.CMDT_REQEAUTH = "7"; //服务端通知需要验证令牌
    NetAction.CMDT_RESPEAUTH = "8"; //客户端输入验证令牌
    NetAction.CMDT_REPORTSRSERR = "9"; //SRS协议，通知其他服务错误
    NetAction.GET_SRS_LOAD = "10"; //查询SRS负载
    NetAction.RE_GET_SRS_LOAD = "11"; //服务返回SRS负载
    NetAction.CMDT_REQPROCESSAPP = "12"; //查询Process的AppId
    NetAction.CMDT_RESPPROCESSAPP = "13"; //返回Process的AppId
    NetAction.CMDT_REQPLAYERPLUSDATA = "23"; //SRS协议，获取用户数据
    NetAction.CMDT_RESPPLAYERPLUSDATA = "24"; //SRS协议，返回用户数据
    NetAction.CMDT_REQSYNCDATA = "25"; //SRS协议，主动通知数据变更
    NetAction.CMDT_PTPUSHMSG = "26"; //服务端推送玩家的令牌信息
    NetAction.DEBUG_CMDT_CONNECT = "DEBUG_CMDT_CONNECT";
    NetAction.DEBUG_CMDT_ENCRYPTVER = "501";
    NetAction.DEBUG_CMDT_REQKEY = "401";
    NetAction.DEBUG_CMDT__RESPKEY = "402";
    NetAction.DEBUG_CMDT_PLAYERCONNECT = "11001"; //进入游戏打牌
    NetAction.DEBUG_CMDT_RESP_PLAYERCONNECT = "11103"; //进入打牌的状态结果返回
    NetAction.REQ_PLAYERPLACE = "12003";
    NetAction.RESP_PLAYERPLACE = "12004";
    /** 请求查询玩家游戏数据 */
    NetAction.TOOL_RILVER = "12005";
    /** 返回查询玩家游戏数据 */
    NetAction.RE_TOOL_RILVER = "12006";
    /** 请求配置文件版本号 */
    NetAction.REQ_FILEVER = "12025";
    NetAction.RESP_FILEVER = "12026";
    /** 下载配置文件 */
    NetAction.REQ_FILE = "12027";
    NetAction.RESP_FILE = "12028";
    /** 请求房间人数 */
    NetAction.TOOL_NUMPLAYERS = "12044";
    /** 返回房间人数 */
    NetAction.RE_TOOL_NUMPLAYERS = "12045";
    NetAction.TOOL_TEMP_SESSION = "12007";
    NetAction.RE_TOOL_TEMP_SESSION = "12008";
    NetAction.GET_PROP_ATTRS = "12009";
    NetAction.RE_GET_PROP_ATTRS = "12010";
    NetAction.USE_EPROPS = "12050";
    NetAction.RE_USE_EPROPS = "12051";
    /** 请求存取款 */
    NetAction.TRANSFER_SILVER = "11060";
    NetAction.RE_TRANSFER_SILVER = "11061";
    /** 离开房间 */
    NetAction.LEAVE_ROOM = "11073";
    /** 服务器响应离开房间 */
    NetAction.RE_LEAVE_ROOM = "11074";
    /** 请求进入房间 */
    NetAction.JOIN_ROOM = "11007";
    /** SRS协议，响应请求进入房间 */
    NetAction.RE_JOIN_ROOM = "11008";
    /** 请求房间内操作 */
    NetAction.ROOM_ACTION = "11016";
    /** 响应房间内操作 */
    NetAction.RE_ROOM_ACTION = "11017";
    /** 服务端推送桌子信息 */
    NetAction.RE_TABLE_INFO = "11014";
    /** 服务端通知桌子状态 */
    NetAction.TABLESTATE = "11015";
    /** 服务端推送玩家信息 */
    NetAction.RE_USER_INFO = "11009";
    /** 服务端通知进入房间成功 */
    NetAction.RE_JOIN_ROOM_COMPLETE = "11041";
    /** 设置玩家限制(限制同桌密码IP等) */
    NetAction.PLAYER_SET_LIMIT = "11022";
    /** 服务端更新房间状态 */
    NetAction.RE_ROOM_STATE = "11027";
    /** 服务端更新玩家数据 */
    NetAction.RE_PLAYER_NUM_INFO = "11028";
    /** 服务端通知客户端是否可以开始游戏 */
    NetAction.RE_SERVER_READY = "11013";
    /** 检测游戏客户端版本号 */
    NetAction.CHECK_VER = "113";
    /** 响应检测游戏客户端版本号 */
    NetAction.RE_CHECK_VER = "114";
    /** 连接游戏服务器 */
    NetAction.CONNECT_GS = "11100";
    /** 响应连接游戏服务器 */
    NetAction.RE_CONNECT_GS = "11103";
    /** 通知客户端操作 */
    NetAction.NOTICE_CLIENT_ACTION = "11049";
    /** 通知客户端玩家进入排队状态 */
    NetAction.NOTICE_CLIENT_WAITING_LIST = "11104";
    /** 加入比赛模式 */
    NetAction.JOIN_MATCH_GAME = "11601";
    /** 返回加入比赛模式 */
    NetAction.RE_JOIN_MATCH_GAME = "11602";
    /** 当前比赛连接数 */
    NetAction.MATCH_PLAYER_COUNT = "11603";
    /** 当前比赛玩家信息 */
    NetAction.MATCH_PLAYER_INFO = "11604";
    /** 比赛提示信息(系统配桌中) */
    NetAction.MATCH_HINT = "11605";
    /** 比赛结束信息 */
    NetAction.MATCH_OVER = "11607";
    /** 获取自己的比赛排名 */
    NetAction.REQ_PLAYER_RANK = "11610";
    /** 返回自己的比赛排名 */
    NetAction.RESP_PLAYER_RANK = "11611";
    /** 请求整场比赛的排名列表 */
    NetAction.REQ_MATCH_RANK = "11612";
    /** 返回整场比赛的排名列表 */
    NetAction.RESP_MATCH_RANK = "11613";
    /** 请求更新玩家积分(暂时当做READY在用，不支持单独发送) */
    NetAction.REQ_COIN = "11062";
    NetAction.RESP_COIN = "11063";
    /** 房间心跳 */
    NetAction.ROOM_CHECKACT = "11079";
    /** 服务端推送调试信息过来 */
    NetAction.MSGBOX = "11150";
    NetAction.POPUP_MSGBOX = "101";
    NetAction.PROCESS_CUT = "-";
    NetAction.SNG_LIST_PROCESS = "11" + NetAction.PROCESS_CUT;
    NetAction.SNG_PROCESS = "12" + NetAction.PROCESS_CUT;
    NetAction.MTT_LIST_PROCESS = "72" + NetAction.PROCESS_CUT;
    NetAction.MTT_PROCESS = "73" + NetAction.PROCESS_CUT;
    /** 加入前缀的process，将强制使用符合式的Action指令接收服务端消息 */
    NetAction.PROCESS_PREFIX = [11, 12, 72, 73];
    /** 模块服务端的PROCESSID */
    NetAction.MS_PROCESSID = 1006;
    /** 模块服务端的APPID */
    NetAction.MS_APPID = 0;
    /** 发送到模块服务端的指令，5位数字，21开头 */
    NetAction.TO_MS_PREFIX = "21";
    /** 从模块服务端接收的指令，5位数字，22开头 */
    NetAction.RE_MS_PREFIX = "22";
    /** 发送到公告服务器的指令，HTTP短连接，5位数字，3开头 */
    NetAction.NS_PREFIX = "3";
    /** 发送到模块服务端的指令，5位数字，23开头 */
    NetAction.TO_MS_PREFIX_2 = "23";
    /** 发送到模块服务端的指令，5位数字，24开头 */
    NetAction.RE_MS_PREFIX_2 = "24";
    NetAction.TEST = NetAction.TO_MS_PREFIX + "999";
    /** 连接比赛列表服(获取配置) */
    NetAction.SNG_REQJOIN = NetAction.MTT_LIST_PROCESS + "1";
    NetAction.MTT_REQJOIN = NetAction.MTT_LIST_PROCESS + "1";
    NetAction.SNG_RESPJOIN = NetAction.MTT_LIST_PROCESS + "2";
    NetAction.MTT_RESPJOIN = NetAction.MTT_LIST_PROCESS + "2";
    /** 推送比赛配置列表 */
    NetAction.SNG_RESPMATCHCONFIGLIST = NetAction.MTT_LIST_PROCESS + "3";
    NetAction.MTT_RESPMATCHCONFIGLIST = NetAction.MTT_LIST_PROCESS + "3";
    /** 客户端获取当前比赛的SUBID */
    NetAction.REQGETMATCHLIST = NetAction.MTT_LIST_PROCESS + "4";
    NetAction.SNG_RESPGETMATCHLIST = NetAction.MTT_LIST_PROCESS + "5";
    NetAction.MTT_RESPGETMATCHLIST = NetAction.MTT_LIST_PROCESS + "5";
    /** 比赛状态更新推送 */
    NetAction.UPDATEMATCHSTATUS = NetAction.MTT_LIST_PROCESS + "6";
    /** 更新比赛人数 */
    NetAction.SNG_UPDATEMATCHSIGNUPS = NetAction.MTT_LIST_PROCESS + "7";
    NetAction.MTT_UPDATEMATCHSIGNUPS = NetAction.MTT_LIST_PROCESS + "7";
    NetAction.MATCH_LIST_BATCH_COMPLETE = NetAction.MTT_LIST_PROCESS + "106";
    NetAction.MATCH_BATCH_COMPLETE = NetAction.MTT_PROCESS + "106";
    NetAction.SNG_CHECKAT = NetAction.MTT_LIST_PROCESS + "9";
    NetAction.MTT_CHECKAT = NetAction.MTT_LIST_PROCESS + "9";
    NetAction.MTT_RESPMATCHINFO = NetAction.MTT_LIST_PROCESS + "100";
    NetAction.REQJOINMATCH = NetAction.MTT_PROCESS + "1";
    NetAction.RESPJOINMATCH = NetAction.MTT_PROCESS + "2";
    NetAction.SNG_REQSIGNUP = NetAction.MTT_PROCESS + "3";
    NetAction.MTT_REQSIGNUP = NetAction.MTT_PROCESS + "3";
    NetAction.SNG_RESPSIGNUP = NetAction.MTT_PROCESS + "4";
    NetAction.MTT_RESPSIGNUP = NetAction.MTT_PROCESS + "4";
    /** 客户端发送取消报名 */
    NetAction.REQCANCELSIGNUP = NetAction.MTT_PROCESS + "5";
    /** 服务端返回发送取消报名 */
    NetAction.SNG_RESPCANCELSIGNUP = NetAction.MTT_PROCESS + "6";
    NetAction.MTT_RESPCANCELSIGNUP = NetAction.MTT_PROCESS + "6";
    NetAction.MTT_SYNC_SVR_TIME = NetAction.MTT_PROCESS + "7";
    NetAction.REQPLAYERLEAVE = NetAction.MTT_PROCESS + "9";
    NetAction.RESPPLAYERLEAVE = NetAction.MTT_PROCESS + "10";
    /** 服务端 */
    NetAction.SNG_AWARDINFO = NetAction.MTT_PROCESS + "11";
    NetAction.MTT_AWARDINFO = NetAction.MTT_PROCESS + "11";
    NetAction.PLAYERCHECKAT = NetAction.MTT_PROCESS + "12";
    /** 在比赛开始的时候发送给客户端（广播给报名过的玩家） */
    NetAction.SNG_REQADDCUSTOMERMATCH = NetAction.MTT_PROCESS + "15";
    /** 在比赛完成结算的时候发送给客户端 */
    NetAction.SNG_RESPADDCUSTOMERMATCH = NetAction.MTT_PROCESS + "16";
    /** 该场比赛被迫取消了 */
    NetAction.MTT_RESP_AUTO_CANCEL = NetAction.MTT_PROCESS + "41";
    // /** 请求比赛配置 */
    // static REQ_MATCHCONFIG              =  NetAction.MTT_PROCESS + "42";
    // /** 响应回复比赛配置 */
    // static RESP_MATCHCONFIG             =  NetAction.MTT_PROCESS + "43";
    /** 这条消息是从模块服过来的 PROCESS_XYID_RESP_MATCH_MESSAGE */
    NetAction.MTT_RESPMATCHMSG = "22031";
    NetAction.CHAT_MSG = "107"; //房间聊天
    /** 游戏服务器通信协议发送 */
    NetAction.TO_GS = "11201";
    /** 游戏服务器通信协议返回 */
    NetAction.RE_GS = "11200";
    /** 发送 游戏服务器二级通信协议 前缀 */
    NetAction.TO_GS_PREFIX = NetAction.TO_GS + ".";
    /** 接收 游戏服务器二级通信协议 前缀 */
    NetAction.RE_GS_PREFIX = NetAction.RE_GS + ".";
    /*服务器推送错误代*/
    NetAction.ERROR_CODE = NetAction.RE_GS_PREFIX + "2000";
    /*srs服务器推送错误代*/
    NetAction.ERROR_SRS_CODE = "ERROR_SRS_CODE";
    /** 准备开始 */
    NetAction.GAME_READY = NetAction.TO_GS_PREFIX + "9";
    /** 房间内夺宝 */
    NetAction.DO_TREASURE = NetAction.TO_GS_PREFIX + "1134";
    /** 获取牌桌具体信息 - 玩家、座位信息 */
    NetAction.MATCH_ADD = NetAction.RE_GS_PREFIX + "1100"; // 进入桌子
    /** 玩家操作 */
    NetAction.MATCH_ACTION = NetAction.TO_GS_PREFIX + "1101";
    /** 推送牌局开始 */
    NetAction.MATCH_S_START = NetAction.RE_GS_PREFIX + '1102';
    /** 推送新一圈开始 */
    NetAction.MATCH_S_NEWSTART = NetAction.RE_GS_PREFIX + '1103';
    /** 推送收到底牌 */
    NetAction.MATCH_S_GETCARD = NetAction.RE_GS_PREFIX + '1104';
    /** 收到玩家动作 */
    NetAction.MATCH_S_PLAYACT = NetAction.RE_GS_PREFIX + '1105';
    /** 牌局结束 */
    NetAction.MATCH_S_OVER = NetAction.RE_GS_PREFIX + '1106';
    /** 进入桌子 */
    //        static MATCH_ENTER_TABLE = NetAction.RE_GS_PREFIX + '1123';
    /** 系统发牌 */
    NetAction.TEXAS_SHOW_CARD = NetAction.RE_GS_PREFIX + '1107';
    /**推送桌子坐下*/
    NetAction.MATCH_S_SIT = NetAction.RE_GS_PREFIX + '1108';
    /**推送桌子站起*/
    NetAction.MATCH_S_UP = NetAction.RE_GS_PREFIX + '1109';
    /**推送请求带入*/
    NetAction.MATCH_S_TAKEIN = NetAction.RE_GS_PREFIX + '1111';
    /**收到请求带入*/
    NetAction.MATCH_TAKEIN = NetAction.TO_GS_PREFIX + '1110';
    /**牌局聊天客户端发*/
    NetAction.MATCH_CHAT = NetAction.TO_GS_PREFIX + '1112';
    /**牌局服务端推送聊天*/
    NetAction.MATCH_S_CHAT = NetAction.RE_GS_PREFIX + '1113';
    /**牌局打赏客户端发*/
    NetAction.MATCH_SEND_GIFT = NetAction.TO_GS_PREFIX + '1114';
    /**牌局服务端推送打赏*/
    NetAction.MATCH_S_SEND_GIFT = NetAction.RE_GS_PREFIX + '1115';
    /**牌局亮牌*/
    NetAction.MATCH_SHOW_CARD = NetAction.TO_GS_PREFIX + '1117';
    /**牌局内玩家银子变化 */
    NetAction.MATCH_MONEY_CHANGE = NetAction.RE_GS_PREFIX + '1118';
    /**站起围观后发送心跳 */
    NetAction.MATCH_HEART_BEAT = NetAction.TO_GS_PREFIX + '1119';
    /**私人房开启数据统计  (c->s)*/
    NetAction.MATCH_OPEN_INFO = NetAction.TO_GS_PREFIX + '1120';
    /** 获取数据统计(c->s)*/
    NetAction.MATCH_GET_INFO = NetAction.TO_GS_PREFIX + '1121';
    /**收到数据统计(S->C) */
    NetAction.MATCH_S_GET_INFO = NetAction.RE_GS_PREFIX + '1122';
    /**服务端推送修改过的前注额  (c->s)*/
    NetAction.MATCH_ANTE = NetAction.RE_GS_PREFIX + '1124';
    /** 是否在房间(c->s)*/
    NetAction.MATC_IN_TABLE = NetAction.TO_GS_PREFIX + '1127';
    /** 是否在房间(S->C)*/
    NetAction.MATC_S_IN_TABLE = NetAction.RE_GS_PREFIX + '1128';
    /**被托管(S->C) */
    NetAction.MATC_S_IS_TRUSTEE = NetAction.RE_GS_PREFIX + '1129';
    /** 房间坐下*/
    NetAction.MATCH_SIT = NetAction.TO_GS_PREFIX + "2002";
    /** 离开房间*/
    NetAction.MATCH_OUT = NetAction.TO_GS_PREFIX + "2003";
    /** 围观玩家进入*/
    NetAction.MATCH_S_SEENER_JOIN = NetAction.RE_GS_PREFIX + '3006';
    /***围观玩家离开 */
    NetAction.MATCH_S_SEENER_lEAVE = NetAction.RE_GS_PREFIX + '3007';
    // /** 创建房间 */
    // static MATCH_CREATE       = NetAction.TO_GS_PREFIX + "2004";
    /**房间站起(人在座位，但与淼鑫结算了，回1109)*/
    NetAction.MATCH_UP = NetAction.TO_GS_PREFIX + "1116";
    /**房主开始*/
    // static MATCH_START        = NetAction.TO_GS_PREFIX + "2008";
    /**牌局结束*/
    NetAction.PUSH_DISMISS_TABLE = NetAction.TO_GS_PREFIX + "2106";
    /**推送进入桌子*/
    NetAction.MATCH_S_ADDTABLE = NetAction.RE_GS_PREFIX + '2101';
    // /**推送离开桌子**/
    // static MATCH_S_OUTTABLE   = NetAction.RE_GS_PREFIX +'2102';     
    /**修改个人标签信息*/
    NetAction.MODIFY_LABEL_INFO = NetAction.TO_GS_PREFIX + '3002';
    /**修改个人标签信息*/
    NetAction.GIRL_KICK = NetAction.RE_GS_PREFIX + '3011';
    /** 保险购买(C->S)*/
    NetAction.REQ_BUYINSURE = NetAction.TO_GS_PREFIX + '1135';
    /**保险购买(S->C) */
    NetAction.RESP_BUYINSURE = NetAction.RE_GS_PREFIX + '1136';
    /**保险信息(S->C) */
    NetAction.RESP_INSURE_INFO = NetAction.RE_GS_PREFIX + '1137';
    /**心跳(c->s) */
    NetAction.GLXY_REQ_HEART_BEAT = NetAction.TO_GS_PREFIX + '10000';
    /** 下注(c->s)*/
    NetAction.GLXY_REQ_ANTE = NetAction.TO_GS_PREFIX + '10001';
    /**上庄(c->s) */
    NetAction.GLXY_REQ_BECOME_BANKER = NetAction.TO_GS_PREFIX + '10002';
    /**下庄(c->s) */
    NetAction.GLXY_REQ_CHANGE_BANKER = NetAction.TO_GS_PREFIX + '10003';
    /**桌面位置坐下(c->s) */
    NetAction.GLXY_REQ_ADD_SHOW_POS = NetAction.TO_GS_PREFIX + '10004';
    /**桌面位置站起(c->s) */
    NetAction.GLXY_REQ_SUB_SHOW_POS = NetAction.TO_GS_PREFIX + '10005';
    /**历史输赢(c->s) */
    NetAction.GLXY_REQ_WIN_HISTORY = NetAction.TO_GS_PREFIX + '10006';
    /**下注(s->c) */
    NetAction.GLXY_RESP_ANTE = NetAction.RE_GS_PREFIX + '20001';
    /**上庄(s->c) */
    NetAction.GLXY_RESP_BECOME_BANKER = NetAction.RE_GS_PREFIX + '20002';
    /**下庄(s->c) */
    NetAction.GLXY_RESP_CHANGE_BANKER = NetAction.RE_GS_PREFIX + '20003';
    /**桌子信息(s->c) */
    NetAction.GLXY_RESP_TABLE_VO = NetAction.RE_GS_PREFIX + '20004';
    /**有人进入(s->c) */
    NetAction.GLXY_RESP_PLAYER_ENTER = NetAction.RE_GS_PREFIX + '20005';
    /**有人离开(s->c) */
    NetAction.GLXY_RESP_PLAYER_LEAVE = NetAction.RE_GS_PREFIX + '20006';
    /**游戏结算(s->c) */
    NetAction.GLXY_RESP_GAME_END = NetAction.RE_GS_PREFIX + '20008';
    /**游戏开始(s->c)*/
    NetAction.GLXY_RESP_GAME_START = NetAction.RE_GS_PREFIX + '20007';
    /**上庄列表(s->c) */
    NetAction.GLXY_RESP_BANK_WAITER = NetAction.RE_GS_PREFIX + '20009';
    /**桌面位置坐下(s->c) */
    NetAction.GLXY_RESP_ADD_SHOW_POS = NetAction.RE_GS_PREFIX + '20010';
    /**桌面位置站起(s->c) */
    NetAction.GLXY_RESP_SUB_SHOW_POS = NetAction.RE_GS_PREFIX + '20011';
    /**欢乐城聊天客户端发*/
    NetAction.GLXY_REQ_CHAT = NetAction.TO_GS_PREFIX + '10007';
    /**欢乐城服务端推送聊天*/
    NetAction.GLXY_RESP_CHAT = NetAction.RE_GS_PREFIX + '20013';
    /**历史输赢(s->c)*/
    NetAction.GLXY_RESP_WIN_HISTORY = NetAction.RE_GS_PREFIX + '20012';
    /** 庄家选择幸运牌(c->s)*/
    NetAction.GLXY_REQ_LUCKY_CARD = NetAction.TO_GS_PREFIX + '10008';
    /**幸运牌推送(s->c) */
    NetAction.GLXY_RESP_LUCKY_CARD = NetAction.RE_GS_PREFIX + '20014';
    /**猜手牌(C->S */
    NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD = NetAction.TO_GS_PREFIX + '1130';
    /***猜手牌(S->C) */
    NetAction.GLXY_MESSAGEVO_RESP_GUESS_CARD = NetAction.RE_GS_PREFIX + '1131';
    /**猜手牌获奖(S->C) */
    NetAction.GLXY_MESSAGEVO_RESP_GUESS_CARD_WIN = NetAction.RE_GS_PREFIX + '1132';
    /**推送财神信息(S->C) */
    NetAction.GLXY_MESSAGEVO_RESP_CAISHEN_INFO = NetAction.RE_GS_PREFIX + "1133";
    /**推送一回合结束 回合信息(S->C)*/
    NetAction.RESP_PLAYER_TURN_INFO = NetAction.RE_GS_PREFIX + "1138";
    /**特定账号  举报玩家(C->S) */
    NetAction.REQ_REPORT_PLAYER = NetAction.TO_GS_PREFIX + '1139';
    /**特定账号  举报玩家(s->c) */
    NetAction.RESP_REPORT_PLAYER = NetAction.RE_GS_PREFIX + '1140';
    /**奖池 */
    NetAction.BULLETIN = "BULLETIN";
    /**公告信息*/
    NetAction.NOTICE_GET_MANY = '31003';
    /**新邮件数*/
    NetAction.IMS_READ_NUM = "31012";
    /**获取邮件*/
    NetAction.IMS_GETS = "31011";
    /**读邮件*/
    NetAction.IMS_READ = "31013";
    /** 刷新邮件 */
    NetAction.RESP_REFRESH_MAIL = "22030";
    /**保存收藏牌局*/
    NetAction.DZ_RECORD_ADD = "31004"; //加
    NetAction.DZ_RECORD_DEL = "31005"; //删
    NetAction.DZ_RECORD_GET = "31006";
    NetAction.DZ_RECORD_GET_MANY = "31007"; //获取全部
    /**举报*/
    NetAction.DZ_FEEDBACK_ADD = "31008";
    /**获取收藏录像数据 */
    NetAction.DZ_RECODE_GETVO = "31009";
    /**获取举报录像数据 */
    NetAction.DZ_FEEDBACK_GETVO = "31010";
    /**头像*/
    NetAction.GET_HEAD_INFO = NetAction.TO_MS_PREFIX + "001";
    NetAction.RE_GET_HEAD_INFO = NetAction.RE_MS_PREFIX + "001";
    NetAction.PROCESS_XYID_REQ_GET_USER_LIST = NetAction.TO_MS_PREFIX + "017"; //查看玩家数据
    NetAction.PROCESS_XYID_RESP_GET_USER_LIST = NetAction.RE_MS_PREFIX + "017"; //查看玩家数据
    NetAction.SET_HEAD_INFO = NetAction.TO_MS_PREFIX + "002"; //设置
    NetAction.RE_SET_HEAD_INFO = NetAction.RE_MS_PREFIX + "002"; //设置
    NetAction.SET_PLAY_INFO = NetAction.TO_MS_PREFIX + "003"; //查看玩家数据
    NetAction.RE_SET_PLAY_INFO = NetAction.RE_MS_PREFIX + "003"; //查看玩家数据
    NetAction.REQ_DI_BAO = "12049"; //任务列表
    NetAction.RESP_AWARD_INFO = "12046"; //领取任务奖励
    NetAction.BUY_SILVER = "400";
    NetAction.BUY_VIP = "401";
    //好友
    NetAction.REQ_GET_USER_FRIEND = "21004"; //获得用户好友
    NetAction.RESP_GET_USER_FRIEND = "22004"; //获得用户好友返回
    NetAction.REQ_SEARCH_USER_FRIEND = "21005"; //搜索用户ID
    NetAction.RESP_SEARCH_USER_FRIEND = "22005"; //搜索用户ID返回
    NetAction.REQ_ADD_USER_FRIEND_REQUEST = "21006"; //添加好友申请
    NetAction.RESP_ADD_USER_FRIEND_REQUEST = "22006"; //添加好友申请返回
    NetAction.REQ_ADD_USER_FRIEND_DELETE = "21008"; //删除好友
    NetAction.RESP_ADD_USER_FRIEND_DELETE = "22008"; //删除好友返回
    NetAction.REQ_ADD_USER_FRIEND = "21009"; //同意添加好友
    NetAction.RESP_ADD_USER_FRIEND = "22009"; //同意添加好友返回
    NetAction.REQ_ADD_USER_FRIEND_FACE2FACE = "21007"; //面对面加好友
    NetAction.RESP_ADD_USER_FRIEND_FACE2FACE = "22007"; //面对面加好友返回
    NetAction.REQ_GET_USER_FRIEND_REQUEST = "21010"; //获得好友申请列表
    NetAction.RESP_GET_USER_FRIEND_REQUEST = "22010"; //获得好友申请列表返回
    NetAction.REQ_ADD_FACE2FACE_FRIEND = "21011"; //互加好友
    NetAction.RESP_ADD_FACE2FACE_FRIEND = "22011"; //互加好友返回
    NetAction.REQ_INVITE_FRIEND = "21012"; //邀请好友
    NetAction.RESP_INVITE_FRIEND = "22012"; //邀请好友返回
    NetAction.REQ_REFUSE_ADD_FRIEND = "21013"; //拒绝添加好友
    NetAction.RESP_REFUSE_ADD_FRIEND = "22013"; //拒绝添加好友返回
    NetAction.REQ_CHANGE_USER_STATUS = "21015"; //更改玩家状态
    NetAction.RESP_CHANGE_USER_STATUS = "22015"; //更改玩家状态返回
    NetAction.GAME_CONFIG = "31015"; //获取登陆前游戏
    NetAction.GAME_LOGIN = "31016"; //登陆
    NetAction.GAME_LOGOUT = "31017"; //离开
    NetAction.GOGO_NOTICE_GET_MANY = "31018"; //播放跑马灯
    NetAction.GOGO_NOTICE_GET_REFLUSH = "22016"; //游戏内自定模块推
    NetAction.REQ_BILL_GET = "21014"; //账单
    NetAction.RESP_BILL_GET = "22014"; //账单返回
    NetAction.REQ_PHONE_VALIDATE = "21025"; //短信验证(c->s)
    NetAction.RESP_PHONE_VALIDATE = "22025"; //短信验证(c->s)
    NetAction.REQ_USER_REWARD = "21026"; //玩家成长奖励(c->s)/21026
    NetAction.RESP_USER_REWARD = "22026"; //玩家成长奖励(s->c)/22026
    NetAction.RESP_DEVELOP_SCORE = "22027"; //玩家成长积分改变(s->c)/22027
    NetAction.REQ_CHARM_WHEEL = NetAction.TO_MS_PREFIX + "018"; //魅力转轮请求
    NetAction.RESP_CHARM_WHEEL = NetAction.RE_MS_PREFIX + "018"; //魅力转轮返回
    NetAction.REQ_CHARM_WHEEL_LIST = NetAction.TO_MS_PREFIX + "019"; //魅力转轮获奖请求
    NetAction.RESP_CHARM_WHEEL_LIST = NetAction.RE_MS_PREFIX + "019"; //魅力转轮获奖返回
    /** 夺宝奇兵 */
    NetAction.REQ_GET_TREASURES = NetAction.TO_MS_PREFIX_2 + "001"; //大厅
    NetAction.RESP_GET_TREASURES = NetAction.RE_MS_PREFIX_2 + "001"; //大厅
    NetAction.REQ_DO_TREASURE = NetAction.TO_MS_PREFIX_2 + "002"; //夺宝
    NetAction.RESP_DO_TREASURE = NetAction.RE_MS_PREFIX_2 + "002"; //夺宝
    NetAction.REQ_GET_OPEN_TREASURES = NetAction.TO_MS_PREFIX_2 + "003"; //开奖
    NetAction.RESP_GET_OPEN_TREASURES = NetAction.RE_MS_PREFIX_2 + "003"; //开奖
    NetAction.REQ_GET_MY_ALL_TREASURES = NetAction.TO_MS_PREFIX_2 + "004"; //我的全部
    NetAction.RESP_GET_MY_ALL_TREASURES = NetAction.RE_MS_PREFIX_2 + "004"; //我的全部
    NetAction.REQ_GET_MY_NOW_TREASURES = NetAction.TO_MS_PREFIX_2 + "005"; //我的现在
    NetAction.RESP_GET_MY_NOW_TREASURES = NetAction.RE_MS_PREFIX_2 + "005"; //我的现在
    NetAction.REQ_MY_GET_REWARD_RECORD = NetAction.TO_MS_PREFIX_2 + "006"; //我的获奖
    NetAction.RESP_MY_GET_REWARD_RECORD = NetAction.RE_MS_PREFIX_2 + "006"; //我的获奖
    NetAction.REQ_MY_GET_REWARD = NetAction.TO_MS_PREFIX_2 + "007"; //我的领奖
    NetAction.RESP_MY_GET_REWARD = NetAction.RE_MS_PREFIX_2 + "007"; //我的领奖
    NetAction.REQ_TREASURE_RECORDS = NetAction.TO_MS_PREFIX_2 + "008"; //夺宝记录
    NetAction.RESP_TREASURE_RECORDS = NetAction.RE_MS_PREFIX_2 + "008"; //夺宝记录
    /** 用户标签 */
    NetAction.REQ_GET_USER_LABELS = NetAction.TO_MS_PREFIX_2 + "101"; //获取标签数据
    NetAction.RESP_GET_USER_LABELS = NetAction.RE_MS_PREFIX_2 + "101"; //获取标签数据
    NetAction.REQ_ADD_LABEL = NetAction.TO_MS_PREFIX_2 + "102"; //添加标签
    NetAction.RESP_ADD_LABEL = NetAction.RE_MS_PREFIX_2 + "102"; //添加标签
    // static REQ_DEL_LABEL: string = NetAction.TO_MS_PREFIX_2 + "103";//删除标签数据
    // static RESP_DEL_LABEL: string = NetAction.RE_MS_PREFIX_2 + "103";//删除标签数据
    // static REQ_DO_LABEL: string = NetAction.TO_MS_PREFIX_2 + "104";//标签玩家
    // static RESP_DO_LABEL: string = NetAction.RE_MS_PREFIX_2 + "104";//标签玩家
    // 关于荷官自己的模块
    NetAction.REQ_BECOME_DEALER = "21020"; //请求变成荷官，并且荷官登陆
    NetAction.RESP_BECOME_DEALER = "22020"; //返回 请求变成荷官，并且荷官登陆
    NetAction.REQ_DEALER_INFO = "21021"; //请求荷官信息
    NetAction.RESP_DEALER_INFO = "22021"; //返回 请求荷官信息
    NetAction.REQ_DEALER_LIST = "21022"; //请求所有荷官信息
    NetAction.RESP_DEALER_LIST = "22022"; //返回 请求所有荷官信息
    NetAction.REQ_DEALER_FOCUS = "21023"; //请求关注荷官
    NetAction.RESP_DEALER_FOCUS = "22023"; //返回 请求关注荷官
    NetAction.REQ_DEALER_FOCUS_LIST = "21024"; //请求关注荷官列表
    NetAction.RESP_DEALER_FOCUS_LIST = "22024"; //返回 请求关注荷官列表
    // --- 以下荷官操作 start ---
    /**
     * 流程为：1(正常); 2(发牌异常); 3(重新发牌)
     * 1: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; DEALER->SERVER:[2002]; SERVER->DEALER:[3002];
     * 2: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; SERVER->DEALER:[3003]; 这里直接跳到3
     * 3: DEALER->SERVER:[2003]; SERVER->DEALER:[3004];
     */
    /** 荷官告诉服务器 要开始发牌了 */
    NetAction.DTS_START_DEAL_CARD = NetAction.TO_GS_PREFIX + "2001";
    /** 荷官告诉服务器 每个座位具体的牌面数据，不同参数对应不同牌类型 [0手牌 1翻牌 2转牌 3河牌] */
    NetAction.DTS_CARD_DATA = NetAction.TO_GS_PREFIX + "2002";
    /** 荷官告诉服务器 荷官主动要求重新发牌 */
    NetAction.DTS_REPEAT_DEAL_CARD = NetAction.TO_GS_PREFIX + "2003";
    /** 荷官告诉服务器 荷官的战旗直播房间id 用于荷官端，这里不需要删除 */
    NetAction.DTS_REPEAT_DEAL_RTMP_ROOMID = NetAction.TO_GS_PREFIX + "2004";
    /** 服务器告诉荷官 可以发牌了 */
    NetAction.STD_CAN_START_DEAL_CARD = NetAction.RE_GS_PREFIX + '3001';
    /** 服务器告诉荷官 发牌结束，即：小型机停止检查牌面 */
    NetAction.STD_DEAL_CARD_END = NetAction.RE_GS_PREFIX + '3002';
    /** 服务器告诉荷官 发牌异常，可以准备重新发牌了 */
    NetAction.STD_DEAL_CARD_ERROR = NetAction.RE_GS_PREFIX + '3003';
    /** 服务器告诉荷官 收到重新发牌处理，同意荷官重新发牌，并且通知玩家清空桌面 */
    NetAction.STD_CAN_REPEAT_DEAL_CARD = NetAction.RE_GS_PREFIX + '3004';
    NetAction.GLXY_REAL_RESP_DEALER_KEY = NetAction.RE_GS_PREFIX + '3005'; //荷官标志
    NetAction.GLXY_REAL_RESP_SEENER_JOIN = NetAction.RE_GS_PREFIX + '3006'; //围观玩家进入
    NetAction.GLXY_REAL_RESP_SEENER_lEAVE = NetAction.RE_GS_PREFIX + '3007'; //围观玩家离开
    NetAction.GLXY_REAL_RESP_DEALER_STATE = NetAction.RE_GS_PREFIX + '3009'; //荷官状态
    // 老虎机slot相关 
    //用来判断是否是老虎机相关的报文
    NetAction.PROCESS_REQ_FIRST_ID = "2320"; //23200
    NetAction.PROCESS_RESP_FIRST_ID = "2420"; //24200
    //获取标签数据
    NetAction.PROCESS_XYID_REQ_GET_SLOT_INFO = "23201";
    NetAction.PROCESS_XYID_RESP_GET_SLOT_INFO = "24201";
    NetAction.PROCESS_XYID_REQ_DO_SLOT = "23202";
    NetAction.PROCESS_XYID_RESP_DO_SLOT = "24202";
    /**财神信息改变(s->c)/22028 */
    NetAction.PROCESS_XYID_RESP_CAISHEN_INFO = NetAction.RE_MS_PREFIX + "028";
    /**请求财神记录(c->s)/21027 */
    NetAction.PROCESS_XYID_REQ_CAISHEN_LIST = NetAction.TO_MS_PREFIX + "027";
    /**请求财神记录(s->c)/22029 */
    NetAction.PROCESS_XYID_RESP_CAISHEN_LIST = NetAction.RE_MS_PREFIX + "029";
    // --- end
    /**GuiChu */
    NetAction.GUICHU_REQ_HEART_BEAT = NetAction.TO_GS_PREFIX + "10100"; //心跳(c->s)
    NetAction.GUICHU_REQ_ANTE = NetAction.TO_GS_PREFIX + "10101"; //下注(c->s) int(0) 下注位置 1-7 long(0)下注额度
    NetAction.GUICHU_RESP_ANTE = NetAction.RE_GS_PREFIX + "20101"; //下注(s->c) int(0) 玩家 int(1) 下注位置 long(0)下注额度 long(1)剩余筹码
    NetAction.GUICHU_RESP_TABLE_VO = NetAction.RE_GS_PREFIX + "20102"; //桌子信息(s->c) data(0) ZPTableVO
    NetAction.GUICHU_RESP_GAME_START = NetAction.RE_GS_PREFIX + "20103"; //游戏开始(s->c) int(0) 倒计时
    NetAction.GUICHU_RESP_GAME_END = NetAction.RE_GS_PREFIX + "20104"; //游戏结束(s->c) int(0) 开盘花色 1-7 int(1) 随机值 data<> ZPGameEndVO
    NetAction.GUICHU_RESP_USER_COUNT = NetAction.RE_GS_PREFIX + "20105"; //人数变化(s->c) int(0) 人数
    NetAction.GUICHU_REQ_ANTE_TEST = NetAction.TO_GS_PREFIX + "10102"; //下注测试(c->s) int(0) 下注位置 int(1)下注次数 long(0) 下注金额
    NetAction.GUICHU_RESP_ANTE_TEST = NetAction.RE_GS_PREFIX + "20106"; //下注测试(c->s) int(0) 开奖花色 long(0) 输赢值
    /**JOKER */
    NetAction.JOKER_REQ_HEART_BEAT = NetAction.TO_GS_PREFIX + "10200"; //心跳(c->s)
    NetAction.JOKER_REQ_ANTE = NetAction.TO_GS_PREFIX + "10201"; //下注(c->s)int(0)下注金额 int(1)下注门数 int(2)下注倍数
    NetAction.JOKER_REQ_SAVE_CRAD = NetAction.TO_GS_PREFIX + "10202"; //确认换牌(c->s) int[]舍弃牌值 把不要的手牌发给服务端 
    NetAction.JOKER_RESP_ANTE = NetAction.RE_GS_PREFIX + "20201"; //下注(s->c) data(0) PMInfoVO 返回自己的手牌
    NetAction.JOKER_RESP_TABLE_VO = NetAction.RE_GS_PREFIX + "20202"; //桌子信息(s->c) data(0) PMTableVO
    NetAction.JOKER_REQ_CHANGE_CRAD = NetAction.RE_GS_PREFIX + "20203"; //结算结果(s->c) data(0) PMGameEndVO long(0) 当前奖池
    app.NetAction = NetAction;
    __reflect(NetAction.prototype, "app.NetAction");
})(app || (app = {}));
//# sourceMappingURL=NetAction.js.map