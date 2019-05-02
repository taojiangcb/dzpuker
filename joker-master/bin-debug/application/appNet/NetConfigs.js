var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    /**
     * @author
     */
    var NetConfigs = (function () {
        function NetConfigs() {
        }
        /**初始化Commands*/
        NetConfigs.initCommands = function () {
            var __ACTION = app.NetAction;
            this.registerCommand(__ACTION.VIRTUAL_SERVER, app.VirtualServer);
            // 注册单级command
            //            __AppFacade.registerCommand(__ACTION.LOGIN_ACTION.toString(),app.login.LoginNetCommand);//登陆
            this.registerCommand(__ACTION.DEBUG_CMDT_CONNECT, svrDebug.DebugConnectCommands);
            this.registerCommand(__ACTION.DEBUG_CMDT_ENCRYPTVER, svrDebug.DebugConnectCommands);
            this.registerCommand(__ACTION.DEBUG_CMDT_REQKEY, svrDebug.DebugConnectCommands);
            this.registerCommand(__ACTION.DEBUG_CMDT__RESPKEY, svrDebug.DebugConnectCommands);
            this.registerCommand(__ACTION.DEBUG_CMDT_PLAYERCONNECT, svrDebug.DebugPlayConnectCommand);
            this.registerCommand(__ACTION.DEBUG_CMDT_RESP_PLAYERCONNECT, svrDebug.DebugPlayConnectCommand);
            this.registerCommand(__ACTION.SRS_CONNECT, cy.ConnectCommands);
            this.registerCommand(__ACTION.SRS_CLOSE, cy.ConnectCommands);
            this.registerCommand(__ACTION.SRS_ERROR, cy.ConnectCommands);
            this.registerCommand(__ACTION.CMDT_ENCRYPTVER, cy.ConnectCommands);
            this.registerCommand(__ACTION.CMDT_RESPKEY, cy.ConnectCommands);
            this.registerCommand(__ACTION.CMDT_CHECKACT, cy.SrsCommand);
            this.registerCommand(__ACTION.CMDT_REPORTSRSERR, cy.SrsErrorCommand);
            this.registerCommand(__ACTION.GET_SRS_LOAD, cy.LoginCommand);
            this.registerCommand(__ACTION.RE_GET_SRS_LOAD, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_PLAYERCONNECT, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_PLAYERDATA, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_REQEAUTH, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_RESPEAUTH, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_REQPLAYERPLUSDATA, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_RESPPLAYERPLUSDATA, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_PTPUSHMSG, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_REQPROCESSAPP, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_RESPPROCESSAPP, cy.LoginCommand);
            this.registerCommand(__ACTION.CMDT_REQSYNCDATA, cy.ChangeInfoCommand);
            this.registerCommand(__ACTION.TOOL_RILVER, cy.ToolCommand);
            this.registerCommand(__ACTION.RE_TOOL_RILVER, cy.ToolCommand);
            this.registerCommand(__ACTION.TOOL_TEMP_SESSION, cy.ToolCommand);
            this.registerCommand(__ACTION.RE_TOOL_TEMP_SESSION, cy.ToolCommand);
            this.registerCommand(__ACTION.TOOL_NUMPLAYERS, cy.ToolCommand);
            this.registerCommand(__ACTION.RE_TOOL_NUMPLAYERS, cy.ToolCommand);
            this.registerCommand(__ACTION.GET_PROP_ATTRS, cy.ToolCommand);
            this.registerCommand(__ACTION.RE_GET_PROP_ATTRS, cy.ToolCommand);
            this.registerCommand(__ACTION.USE_EPROPS, cy.ToolCommand);
            this.registerCommand(__ACTION.RE_USE_EPROPS, cy.ToolCommand);
            this.registerCommand(__ACTION.MSGBOX, cy.ToolCommand);
            this.registerCommand(__ACTION.POPUP_MSGBOX, cy.ToolCommand);
            this.registerCommand(__ACTION.REQ_PLAYERPLACE, cy.ToolCommand);
            this.registerCommand(__ACTION.RESP_PLAYERPLACE, cy.ToolCommand);
            this.registerCommand(__ACTION.REQ_FILEVER, cy.ToolCommand);
            this.registerCommand(__ACTION.RESP_FILEVER, cy.ToolCommand);
            this.registerCommand(__ACTION.REQ_FILE, cy.ToolCommand);
            this.registerCommand(__ACTION.RESP_FILE, cy.ToolCommand);
            this.registerCommand(__ACTION.TRANSFER_SILVER, cy.SilverCommand);
            this.registerCommand(__ACTION.RE_TRANSFER_SILVER, cy.SilverCommand);
            this.registerCommand(__ACTION.JOIN_ROOM, app.JoinRoomCommands); //进入房间
            this.registerCommand(__ACTION.RE_JOIN_ROOM, app.RoomCommands); //响应进入房间
            this.registerCommand(__ACTION.PLAYER_SET_LIMIT, app.RoomCommands); //设置桌子密码(跟着人走)
            this.registerCommand(__ACTION.ROOM_CHECKACT, app.RoomCommands); //房间心跳
            this.registerCommand(__ACTION.ROOM_ACTION, app.RoomCommands); //房间内操作
            this.registerCommand(__ACTION.RE_ROOM_ACTION, app.RoomCommands); //响应房间内操作
            this.registerCommand(__ACTION.RE_TABLE_INFO, app.RoomCommands); //推送桌子信息
            this.registerCommand(__ACTION.RE_USER_INFO, app.RoomCommands); //推送用户信息
            this.registerCommand(__ACTION.RE_JOIN_ROOM_COMPLETE, app.RoomCommands); //通知进入房间信息推送完成
            this.registerCommand(__ACTION.RE_SERVER_READY, app.RoomCommands); //服务器通知
            this.registerCommand(__ACTION.RE_ROOM_STATE, app.RoomCommands); //推送房间内玩家状态
            this.registerCommand(__ACTION.RE_LEAVE_ROOM, app.RoomCommands); //推送房间内玩家状态
            this.registerCommand(__ACTION.NOTICE_CLIENT_ACTION, app.RoomCommands); //推送房间内玩家状态
            this.registerCommand(__ACTION.TABLESTATE, app.RoomCommands); //推送房间内桌子状态
            this.registerCommand(__ACTION.SNG_REQJOIN, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_REQJOIN, app.MatchCommands); //
            // this.registerCommand(__ACTION.MTT_REQJOIN,               MatchVirtualCommands);//
            this.registerCommand(__ACTION.SNG_RESPJOIN, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPJOIN, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_RESPMATCHCONFIGLIST, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPMATCHCONFIGLIST, app.MatchCommands); //
            this.registerCommand(__ACTION.REQGETMATCHLIST, app.MatchCommands); //获取开赛的比赛列表
            // this.registerCommand(__ACTION.MTT_REQGETMATCHLIST,       MatchVirtualCommands);//
            this.registerCommand(__ACTION.SNG_RESPGETMATCHLIST, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPGETMATCHLIST, app.MatchCommands); //
            this.registerCommand(__ACTION.REQJOINMATCH, app.MatchCommands); //连接比赛服
            this.registerCommand(__ACTION.RESPJOINMATCH, app.MatchCommands); //连接比赛服成功
            this.registerCommand(__ACTION.REQPLAYERLEAVE, app.MatchCommands); //离开比赛服
            this.registerCommand(__ACTION.RESPPLAYERLEAVE, app.MatchCommands); //离开比赛服成功
            this.registerCommand(__ACTION.SNG_REQSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_REQSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_RESPSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_SYNC_SVR_TIME, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_CHECKAT, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_CHECKAT, app.MatchCommands); //
            this.registerCommand(__ACTION.PLAYERCHECKAT, app.MatchCommands); //比赛服心跳
            this.registerCommand(__ACTION.SNG_AWARDINFO, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_AWARDINFO, app.MatchCommands); //
            this.registerCommand(__ACTION.REQCANCELSIGNUP, app.MatchCommands); //退赛
            this.registerCommand(__ACTION.SNG_RESPCANCELSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPCANCELSIGNUP, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_UPDATEMATCHSIGNUPS, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_UPDATEMATCHSIGNUPS, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPMATCHINFO, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_REQADDCUSTOMERMATCH, app.MatchCommands); //
            this.registerCommand(__ACTION.SNG_RESPADDCUSTOMERMATCH, app.MatchCommands); //
            this.registerCommand(__ACTION.MTT_RESPMATCHMSG, app.MatchCommands); //
            this.registerCommand(__ACTION.MATCH_LIST_BATCH_COMPLETE, app.MatchCommands); //
            this.registerCommand(__ACTION.MATCH_BATCH_COMPLETE, app.MatchCommands); //
            this.registerCommand(__ACTION.UPDATEMATCHSTATUS, app.MatchCommands); //比赛状态更新推送
            this.registerCommand(__ACTION.JOIN_MATCH_GAME, app.RoomCommands); //
            this.registerCommand(__ACTION.RE_JOIN_MATCH_GAME, app.RoomCommands); //
            this.registerCommand(__ACTION.MATCH_PLAYER_COUNT, app.RoomCommands); //
            this.registerCommand(__ACTION.MATCH_PLAYER_INFO, app.RoomCommands); //
            this.registerCommand(__ACTION.MATCH_HINT, app.RoomCommands); //
            this.registerCommand(__ACTION.REQ_PLAYER_RANK, app.RoomCommands); //
            this.registerCommand(__ACTION.RESP_PLAYER_RANK, app.RoomCommands); //
            this.registerCommand(__ACTION.REQ_MATCH_RANK, app.RoomCommands); //
            this.registerCommand(__ACTION.RESP_MATCH_RANK, app.RoomCommands); //
            this.registerCommand(__ACTION.MTT_RESP_AUTO_CANCEL, app.MatchCommands); //被迫取消了比赛
            this.registerCommand(__ACTION.CHECK_VER, app.RoomCommands); //检查游戏客户端版本号
            this.registerCommand(__ACTION.RE_CHECK_VER, app.RoomCommands); //响应游戏客户端版本号
            this.registerCommand(__ACTION.CONNECT_GS, app.RoomCommands); //连接游戏服务器
            this.registerCommand(__ACTION.RE_CONNECT_GS, app.RoomCommands); //响应连接游戏服务器
            this.registerCommand(__ACTION.NOTICE_CLIENT_WAITING_LIST, app.RoomCommands);
            this.registerCommand(__ACTION.REQ_COIN, app.RoomCommands);
            this.registerCommand(__ACTION.RESP_COIN, app.RoomCommands);
            this.registerCommand(__ACTION.TO_GS, cy.TransCommand); //将数据发送到游戏服务器
            this.registerCommand(__ACTION.RE_GS, cy.TransCommand); //从游戏服务器收到数据
            // this.registerCommand(__ACTION.TEST,                   TestCommand);//通信测试
            // this.registerCommand(__ACTION.GAME_READY,                ProtobuffCommand);//发送准备开始
            this.registerCommand(__ACTION.DO_TREASURE, app.PlaycardsNetCommand);
            this.registerCommand(__ACTION.MATCH_ADD, app.PlaycardsNetCommand); //从游戏服务器收到数据 加入房间
            this.registerCommand(__ACTION.MATCH_S_SIT, app.PlaycardsNetCommand); //从游戏服务器收到数据 坐下
            this.registerCommand(__ACTION.MATCH_S_UP, app.PlaycardsNetCommand); //从游戏服务器收到数据 站起
            // this.registerCommand(__ACTION.MATCH_ANTE,                PlaycardsNetCommand);//从游戏服务器收到数据 更新前注
            this.registerCommand(__ACTION.MATC_IN_TABLE, app.PlaycardsNetCommand); //发送数据 验证是否在游戏中
            this.registerCommand(__ACTION.MATC_S_IN_TABLE, app.PlaycardsNetCommand); //从游戏服务器收到数据 验证是否在游戏中
            this.registerCommand(__ACTION.GLXY_RESP_TABLE_VO, app.HappyNetCommand); //推送加入房间
            this.registerCommand(__ACTION.GLXY_RESP_BANK_WAITER, app.HappyNetCommand); //推送上庄列表
            this.registerCommand(__ACTION.IMS_READ_NUM, app.MailCommand); //邮件
            this.registerCommand(__ACTION.IMS_GETS, app.MailCommand); //邮件
            this.registerCommand(__ACTION.IMS_READ, app.MailCommand); //邮件
            this.registerCommand(__ACTION.RESP_REFRESH_MAIL, app.MoudleCommand);
            this.registerCommand(__ACTION.ERROR_CODE, app.ErrorMessageCommand); //错误提示消息
            this.registerCommand(__ACTION.ERROR_SRS_CODE, app.ErrorMessageCommand); //错误提示消息
            this.registerCommand(__ACTION.MATCH_MONEY_CHANGE, app.PlaycardsNetCommand); //同步彩豆
            this.registerCommand(__ACTION.GIRL_KICK, app.PlaycardsNetCommand); //真人房被荷官T走了
            //购买筹码
            this.registerCommand(__ACTION.BUY_SILVER, app.ShopCommand);
            this.registerCommand(__ACTION.NOTICE_GET_MANY, app.NoticeGetCommand);
            this.registerCommand(__ACTION.DZ_RECORD_ADD, app.PlayRecordCommand);
            this.registerCommand(__ACTION.DZ_RECORD_DEL, app.PlayRecordCommand);
            this.registerCommand(__ACTION.DZ_RECORD_GET_MANY, app.PlayRecordCommand);
            this.registerCommand(__ACTION.DZ_RECODE_GETVO, app.PlayRecordCommand);
            this.registerCommand(__ACTION.DZ_FEEDBACK_GETVO, app.PlayRecordCommand);
            this.registerCommand(__ACTION.GET_HEAD_INFO, app.HeadNetCommand);
            this.registerCommand(__ACTION.RE_GET_HEAD_INFO, app.HeadNetCommand);
            this.registerCommand(__ACTION.PROCESS_XYID_REQ_GET_USER_LIST, app.HeadNetCommand);
            this.registerCommand(__ACTION.PROCESS_XYID_RESP_GET_USER_LIST, app.HeadNetCommand);
            this.registerCommand(__ACTION.SET_HEAD_INFO, app.HeadNetCommand);
            this.registerCommand(__ACTION.RE_SET_HEAD_INFO, app.HeadNetCommand);
            this.registerCommand(__ACTION.SET_PLAY_INFO, app.PlayInfoNetCommand);
            this.registerCommand(__ACTION.RE_SET_PLAY_INFO, app.PlayInfoNetCommand);
            this.registerCommand(__ACTION.DZ_FEEDBACK_ADD, app.DzFeedAddCommand);
            this.registerCommand(__ACTION.REQ_DI_BAO, cy.MissionCommand);
            this.registerCommand(__ACTION.RESP_AWARD_INFO, cy.MissionCommand);
            //好友
            // this.registerCommand(__ACTION.FRIEND_TEST, FriendCommand);
            this.registerCommand(__ACTION.REQ_GET_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_GET_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_SEARCH_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_SEARCH_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_ADD_USER_FRIEND_REQUEST, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_ADD_USER_FRIEND_REQUEST, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_ADD_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_ADD_USER_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_GET_USER_FRIEND_REQUEST, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_GET_USER_FRIEND_REQUEST, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_ADD_USER_FRIEND_DELETE, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_ADD_USER_FRIEND_DELETE, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_INVITE_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_INVITE_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_ADD_USER_FRIEND_FACE2FACE, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_ADD_USER_FRIEND_FACE2FACE, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_REFUSE_ADD_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_REFUSE_ADD_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_ADD_FACE2FACE_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.RESP_ADD_FACE2FACE_FRIEND, app.FriendCommand);
            this.registerCommand(__ACTION.REQ_CHANGE_USER_STATUS, app.ChangeStatusCommand);
            this.registerCommand(__ACTION.RESP_CHANGE_USER_STATUS, app.ChangeStatusCommand);
            this.registerCommand(__ACTION.REQ_PHONE_VALIDATE, app.MobileValidateCommand);
            this.registerCommand(__ACTION.RESP_PHONE_VALIDATE, app.MobileValidateCommand);
            this.registerCommand(__ACTION.GAME_CONFIG, app.GameConfigCommand);
            this.registerCommand(__ACTION.GAME_LOGIN, app.GameConfigCommand);
            this.registerCommand(__ACTION.GAME_LOGOUT, app.GameConfigCommand);
            this.registerCommand(__ACTION.GOGO_NOTICE_GET_MANY, app.RollNoticeCommand);
            this.registerCommand(__ACTION.GOGO_NOTICE_GET_REFLUSH, app.RFRollNoticeCommand);
            this.registerCommand(__ACTION.REQ_BILL_GET, app.BillCommand);
            this.registerCommand(__ACTION.RESP_BILL_GET, app.BillCommand);
            this.registerCommand(__ACTION.CHAT_MSG, app.RoomCommands);
            this.registerCommand(__ACTION.REQ_CHARM_WHEEL, app.CharmWheelCommand);
            this.registerCommand(__ACTION.RESP_CHARM_WHEEL, app.CharmWheelCommand);
            this.registerCommand(__ACTION.REQ_CHARM_WHEEL_LIST, app.CharmWheelCommand);
            this.registerCommand(__ACTION.RESP_CHARM_WHEEL_LIST, app.CharmWheelCommand);
            this.registerCommand(__ACTION.REQ_GET_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_GET_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_DO_TREASURE, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_DO_TREASURE, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_GET_OPEN_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_GET_OPEN_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_GET_MY_ALL_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_GET_MY_ALL_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_GET_MY_NOW_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_GET_MY_NOW_TREASURES, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_MY_GET_REWARD_RECORD, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_MY_GET_REWARD_RECORD, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_MY_GET_REWARD, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_MY_GET_REWARD, app.TreasureCommand);
            this.registerCommand(__ACTION.REQ_TREASURE_RECORDS, app.TreasureCommand);
            this.registerCommand(__ACTION.RESP_TREASURE_RECORDS, app.TreasureCommand);
            /** 用户标签 */
            this.registerCommand(__ACTION.MTT_RESPMATCHMSG, app.InfoTipCmd); //比赛的跑马灯，通过模块服转发
            this.registerCommand(__ACTION.REQ_GET_USER_LABELS, app.InfoTipCmd);
            this.registerCommand(__ACTION.RESP_GET_USER_LABELS, app.InfoTipCmd);
            this.registerCommand(__ACTION.REQ_ADD_LABEL, app.InfoTipCmd);
            this.registerCommand(__ACTION.RESP_ADD_LABEL, app.InfoTipCmd);
            // this.registerCommand(__ACTION.REQ_DEL_LABEL,InfoTipCmd);
            // this.registerCommand(__ACTION.RESP_DEL_LABEL,InfoTipCmd);
            // this.registerCommand(__ACTION.REQ_DO_LABEL,InfoTipCmd);
            // this.registerCommand(__ACTION.RESP_DO_LABEL,InfoTipCmd);
            this.registerCommand(__ACTION.REQ_DEALER_INFO, app.DealerListCommand);
            this.registerCommand(__ACTION.RESP_DEALER_INFO, app.DealerListCommand);
            // this.registerCommand(__ACTION.REQ_DEALER_LIST, DealerListCommand);
            this.registerCommand(__ACTION.RESP_DEALER_LIST, app.DealerListCommand);
            this.registerCommand(__ACTION.RESP_DEALER_FOCUS, app.DealerListCommand);
            this.registerCommand(__ACTION.RESP_DEALER_FOCUS_LIST, app.DealerListCommand);
            // -- 以下是荷官处理消息 start -- 
            this.registerCommand(__ACTION.DTS_START_DEAL_CARD, app.DealerCommands);
            this.registerCommand(__ACTION.DTS_CARD_DATA, app.DealerCommands);
            this.registerCommand(__ACTION.DTS_REPEAT_DEAL_CARD, app.DealerCommands);
            this.registerCommand(__ACTION.STD_CAN_START_DEAL_CARD, app.DealerCommands);
            this.registerCommand(__ACTION.STD_DEAL_CARD_END, app.DealerCommands);
            this.registerCommand(__ACTION.STD_DEAL_CARD_ERROR, app.DealerCommands);
            this.registerCommand(__ACTION.STD_CAN_REPEAT_DEAL_CARD, app.DealerCommands);
            // --- 财神消息  --
            this.registerCommand(__ACTION.PROCESS_XYID_REQ_CAISHEN_LIST, app.MammonCommand);
            this.registerCommand(__ACTION.PROCESS_XYID_RESP_CAISHEN_LIST, app.MammonCommand);
            this.registerCommand(__ACTION.GUICHU_REQ_HEART_BEAT, guichu.GuichuRoomCommand); //鬼畜心跳
            this.registerCommand(__ACTION.GUICHU_RESP_TABLE_VO, guichu.GuichuRoomCommand); //初始化桌子信息
            this.registerCommand(__ACTION.GUICHU_RESP_ANTE, guichu.GuichuRoomCommand);
            this.registerCommand(__ACTION.GUICHU_RESP_GAME_START, guichu.GuichuRoomCommand);
            this.registerCommand(__ACTION.GUICHU_RESP_GAME_END, guichu.GuichuRoomCommand);
            this.registerCommand(__ACTION.GUICHU_RESP_USER_COUNT, guichu.GuichuRoomCommand);
            // this.registerCommand(__ACTION.GUICHU_REQ_ANTE_TEST,     guichu.GuichuRoomCommand);
            this.registerCommand(__ACTION.GUICHU_RESP_ANTE_TEST, guichu.GuichuRoomCommand);
            /**JOKER */
            this.registerCommand(__ACTION.JOKER_REQ_HEART_BEAT, joker.JokerRoomCommand); //心跳(c->s)
            this.registerCommand(__ACTION.JOKER_REQ_ANTE, joker.JokerRoomCommand); //下注(c->s)int(0)下注金额 int(1)下注门数 int(2)下注倍数
            this.registerCommand(__ACTION.JOKER_REQ_SAVE_CRAD, joker.JokerRoomCommand); //确认换牌(c->s) int[] 舍弃牌值
            this.registerCommand(__ACTION.JOKER_RESP_ANTE, joker.JokerRoomCommand); //下注(s->c) data(0) PMInfoVO
            this.registerCommand(__ACTION.JOKER_RESP_TABLE_VO, joker.JokerRoomCommand); //桌子信息(s->c) data(0) PMTableVO
            this.registerCommand(__ACTION.JOKER_REQ_CHANGE_CRAD, joker.JokerRoomCommand); //确认换牌(s->c) data(0) PMGameEndVO long(0) 当前奖池
            // -- end --
            // this.registerCommand(__ACTION.PROCESS_XYID_RESP_GET_SLOT_INFO, SlotNetCommand);
        };
        NetConfigs.registerCommand = function (notificationName, commandClassRef) {
            app.mvc.AppFacade.getInstance().registerCommand(notificationName, commandClassRef);
        };
        NetConfigs.hasommand = function (notificationName) {
            return app.mvc.AppFacade.getInstance().hasCommand(notificationName);
        };
        return NetConfigs;
    }());
    NetConfigs.SOCKET_ADDRESS = "10.224.32.114"; //"123.59.14.4";//
    NetConfigs.PORT = 8081; //9998;//
    NetConfigs.serverid = 0;
    NetConfigs.VIRTUAL_SERVER_ENABLED = true;
    NetConfigs.connCache = {}; //发送数据的缓存列表(用于实现首发逻辑在同一个实例中)
    app.NetConfigs = NetConfigs;
    __reflect(NetConfigs.prototype, "app.NetConfigs");
})(app || (app = {}));
var __PVO = function () {
    return new app.ParamVoWriter();
};
var __SRS = function () {
    return new app.SrsPackWriter();
};
//# sourceMappingURL=NetConfigs.js.map