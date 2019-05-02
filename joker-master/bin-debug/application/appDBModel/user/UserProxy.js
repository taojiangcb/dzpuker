var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var user;
(function (user) {
    function getProxy() {
        return __GET_PROXY(UserProxy);
    }
    user.getProxy = getProxy;
    function getPlayerInfo() {
        return getProxy().svrPlayerInfo;
    }
    user.getPlayerInfo = getPlayerInfo;
    /** 改变所在房间状态，去目标房间，如已在房间，则退出 */
    function gotoRoom(roomVO, exitMoudle) {
        if (exitMoudle === void 0) { exitMoudle = -1; }
        if (antiSystem.getProxy().getHour() >= 3) {
            __SEND_NOTIFICATION(antiSystem.AntiMediator.ALERT_3HOUR_IN);
            return;
        }
        console.log("into gotoRoom exitMoudle:", exitMoudle);
        user.getProxy().exitToMoudle = exitMoudle;
        if (user.getProxy().roomState == 2 /* IN */) {
            //如果已在目标房间，则忽略
            if (user.getProxy().currentRoom == roomVO)
                return;
            var roomType = user.getProxy().currentRoom.type;
            if (roomType == 5 /* MTT */ || roomType == 4 /* SNG */) {
                user.getProxy().leaveRoomSuccess();
                user.gotoRoom(roomVO);
                return;
            }
            else {
                user.getProxy().leaveRoom(roomVO);
            }
        }
        else if (user.getProxy().roomState == 0 /* NULL */) {
            //如果不在房间内则进入
            user.getProxy().joinRoom(roomVO);
        }
        else if (user.getProxy().roomState == 3 /* LEAVE */) {
            if (user.getProxy().currentRoom) {
                var roomType = user.getProxy().currentRoom.type;
                if (roomType == 5 /* MTT */ || roomType == 4 /* SNG */) {
                    user.getProxy().leaveRoomSuccess();
                    user.gotoRoom(roomVO);
                    return;
                }
                else {
                    //如果正在离开房间，则不做任何操作
                    tip.popSysCenterTip("ON_LEAVE_ROOM", tip.TIPS_TYPE.TIPS_WARNING);
                }
            }
            else {
                user.getProxy().joinRoom(roomVO);
            }
        }
        else if (user.getProxy().roomState == 1 /* JOIN */) {
            //如果正在加入房间，则不做任何操作
            tip.popSysCenterTip("ON_GOTO_ROOM", tip.TIPS_TYPE.TIPS_WARNING);
        }
    }
    user.gotoRoom = gotoRoom;
    /**
     * @author
     */
    var UserProxy = (function (_super) {
        __extends(UserProxy, _super);
        function UserProxy() {
            var _this = _super.call(this, UserProxy.NAME) || this;
            //小游戏开关 开的情况再去gameBool
            _this.isGameOpen = 0;
            _this.gameBool = false;
            // 手机充值开关
            _this.isShopOpen = -1;
            /** 自己头像ID默认是1 */
            _this.svrHeadId = 0;
            //实名制认证
            _this.propertURL = "";
            /***茶苑的银子和 12006返回回来银行数据不一样***/
            _this.bankSilver = 0;
            /**免费金币房货币 */
            _this.freeGold = 0;
            /** 账户性别@HK */
            _this.sex = 0;
            /** 服务器维护的玩家数据列表 */
            _this.svrPlayerList = {};
            /** 客户端当前状态 */
            _this.roomState = 0 /* NULL */;
            /** 从游戏退出来时，要返回的路径 */
            _this.exitToMoudle = -1;
            /** 登录的账号类型(0平台账号，1PT账号) */
            _this.loginUserType = 0 /* GAMETEA */;
            /** 是否自动登录 */
            _this.isAutoLogin = false;
            _this.MAXFRIENDNUM = 20;
            /** 是否正在游戏中
             * 当与具体的GameSO连上时(可以通信protobuff了)，该值为true
             * 退出游戏房间为false */
            _this.isGamePlaying = false;
            /**
             * 是否已经签到过的标记
             */
            _this.singFalg = false;
            /** 金币房没钱被弹出 */
            _this.freeFlag = false;
            _this.freeFlagCancel = false;
            // == 此阶段VO将弃用，客户端各业务单元自行逐步删除，先改完报错再上传 ====
            // public roleVo:appvos.RoleVO = new appvos.RoleVO();
            // public userInfo:appvos.UserVO = new appvos.UserVO();
            _this.vipInfo = new appvos.VipVO();
            _this.friendRoomid = null;
            _this.friendStatus = 1;
            _this.myTipList = [null]; // 我的自定标签列表
            /**
             * PK房带入额
             * @type {number}
             */
            _this.PKDragInRoom = 0;
            _this.svrPlayerGameDataDepot = {};
            _this.joinTimeOut = -1;
            _this.leaveTimeOut = -1;
            _this.quickAccount = new user.BFQuickAccount();
            _this.reqPlayerPlusData = new ReqPlayerPlusData();
            return _this;
        }
        Object.defineProperty(UserProxy.prototype, "svrNumId", {
            /** 自己数字ID */
            get: function () {
                return this.svrRoleId % 4294967296.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProxy.prototype, "svrAreaId", {
            /** 自己区号 */
            get: function () {
                return Math.floor(this.svrRoleId / 4294967296.0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProxy.prototype, "vipId", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /** roleid转数字ID */
        UserProxy.prototype.getNumId = function (roleid) {
            return roleid % 4294967296.0;
        };
        /**数字ID 转 roleid*/
        UserProxy.prototype.getRoleId = function (numid) {
            return this.svrAreaId * 4294967296.0 + numid;
        };
        Object.defineProperty(UserProxy.prototype, "formatSvrTmpSession", {
            get: function () {
                var s = this.svrTmpSession.toUpperCase();
                return FormatUtils.subChangeEndian(s.substr(0, 8)) + "-" +
                    FormatUtils.subChangeEndian(s.substr(8, 4)) + "-" +
                    FormatUtils.subChangeEndian(s.substr(12, 4).toLowerCase()) + "-" +
                    s.substr(16, 4) + "-" + s.substr(20);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取头像路径
         */
        UserProxy.prototype.getHeadStr = function (id) {
            if (id === void 0) { id = 1; }
            if (id && id != NaN) {
                return "img_Default_Avatar_" + id + "_png";
            }
            else {
                id = 1;
                return "img_Default_Avatar_" + id + "_png";
            }
        };
        /**
         * 注销清空数据
         */
        UserProxy.prototype.clearAllData = function () {
            this.httpToKen = "";
            this.svrSession = null;
            this.svrGameData = null;
            this.svrRoleId = 0;
            this.svrName = "";
            this.svrPlayerList = null;
            this.svrPlayerInfo = null;
            this.svrPlayerStateInfo = null;
            this.svrUserInfoBytesCache = null;
            this.svrTmpSession = "";
            this.sessionTime = 0;
            this.roomState = 0 /* NULL */;
            this.willJoinRoom = null;
            this.currentRoom = null;
            this.clearJoinRoomTimeout();
            this.myTipList = [null];
        };
        UserProxy.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        UserProxy.prototype.searchPlayerGameData = function (roleId) {
            return this.svrPlayerGameDataDepot[roleId];
        };
        UserProxy.prototype.searchPlayer = function (numId, add) {
            var info = this.svrPlayerList[numId];
            if (info == null && add) {
                info = new cyvos.PlayerInfo();
                info.numId = numId;
                this.svrPlayerList[numId] = info;
            }
            return info;
        };
        Object.defineProperty(UserProxy.prototype, "vipIsExpired", {
            /**
             * 会员是否已经过期了
             * @returns {number}
             *   0.会员正常
             *   1.会员已经过期了
             *   2.还不是会员
             */
            get: function () {
                if (this.vipInfo && this.vipInfo.vipId > 0) {
                    var endTime = user.getProxy().vipInfo.rewardEndTime;
                    var nowTime = app.SystemTimer.getServerTime();
                    if (nowTime > endTime) {
                        return 1;
                    }
                }
                else {
                    return 2;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProxy.prototype, "vipName", {
            get: function () {
                if (this.vipInfo) {
                    var vipTemplate = shop.getProxy().getVipTemplateById(this.vipInfo.vipTemplateId);
                    if (vipTemplate)
                        return vipTemplate.name;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        UserProxy.prototype.openSNG = function () {
            if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType3, egret.RuntimeType.WEB) == 0) {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
            }
            else {
                __OPEN_PRE_MOUDLE(AppReg.SNG);
            }
        };
        UserProxy.prototype.notMoney = function (tipStr, isFree) {
            if (tipStr === void 0) { tipStr = null; }
            if (isFree === void 0) { isFree = false; }
            if (tipStr == null)
                tipStr = gameabc.ResourceBundleUtil.getMessage("GMAE_NO_MONEY_TIPS");
            if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                tip.Alert.show(tipStr);
            }
            else {
                if (isFree) {
                    tip.Alert.show(tipStr, null, tip.CONFIRM, null, null, this);
                }
                else
                    tip.Alert.show(tipStr, null, tip.CONFIRM, this.openbuy, null, this);
            }
        };
        /** 是否关闭钱庄的显示 */
        UserProxy.prototype.isShowBank = function () {
            var show = true; // 默认显示
            var nowVer = gameabc.StringUtils.versionToNumberVersion(AppConst.VERSION_STR);
            var nowBusiness = parseInt(platform.CHANNE_ID);
            var len = setting.getProxy().gameConfigVOS.length;
            for (var i = 0; i < len; i++) {
                var vo = setting.getProxy().gameConfigVOS[i];
                if (vo.gcId == AppConst.gameConfigType.gameType10) {
                    if (vo.business == 0) {
                        // vo.business == 0 意思为所有渠道
                        if (vo.gcValue == 0 || vo.gcValue == nowVer) {
                            show = false; // value为0是不显示 || value和自己的版本相同的时候，不显示
                            break;
                        }
                    }
                    else if (vo.business == nowBusiness) {
                        //vo.business == nowBusiness 意思是：我的渠道和下发的渠道相同的时候，要判断
                        if (vo.gcValue == 0 || vo.gcValue == nowVer) {
                            show = false; // value为0是不显示 || value和自己的版本相同的时候，不显示
                            break;
                        }
                    }
                }
            }
            return show;
        };
        /**打开财富界面打牌游戏中 不能调用***/
        UserProxy.prototype.openMoney = function () {
            tip.popSysCenterTip("剩余彩豆不足");
            // if (user.getProxy().roomState == user.ROOM_STATE.IN || !user.getProxy().isShowBank()) {
            //     tip.popSysCenterTip("剩余彩豆不足");
            // } else {
            //      __OPEN_PRE_MOUDLE(AppReg.APP_MONEY);
            // }
        };
        /**没钱弹钱庄***/
        UserProxy.prototype.notMoneyBank = function (tipStr) {
            if (tipStr === void 0) { tipStr = null; }
            if (tipStr == null)
                tipStr = gameabc.ResourceBundleUtil.getMessage("GMAE_NO_MONEY_TIPS");
            if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                tip.Alert.show(tipStr, null, tip.CONFIRM, this.openBankbuy, null, this);
            }
            else {
                tip.Alert.show(tipStr, null, tip.CONFIRM, this.openbuy, null, this);
            }
        };
        UserProxy.prototype.openBankbuy = function (type) {
            if (type == tip.YES) {
                __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
            }
        };
        UserProxy.prototype.openbuy = function (type) {
            if (type == tip.YES) {
                if (AppConst.LOGING_CAN_BOOL) {
                    __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
                }
                else {
                    this.openShop();
                }
            }
        };
        /**打开充值**/
        UserProxy.prototype.openShop = function () {
            //用sessionid登录  充值功能不打开
            if (AppConst.LOGING_CAN_BOOL) {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
            }
            else {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    if (this.isShopOpen < 0) {
                        this.isShopOpen = setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType2);
                    }
                    if (this.isShopOpen == 1) {
                        var hides = null;
                        if (__IS_MOUDLE_OPEN(AppReg.APP_MAIN_UI))
                            hides = [AppReg.APP_MAIN_UI];
                        __OPEN_PRE_MOUDLE(AppReg.SHOP_WIN, null, hides);
                    }
                }
                else {
                    // tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    var hides = null;
                    if (__IS_MOUDLE_OPEN(AppReg.APP_MAIN_UI))
                        hides = [AppReg.APP_MAIN_UI];
                    __OPEN_PRE_MOUDLE(AppReg.SHOP_WIN, null, hides);
                }
            }
        };
        UserProxy.prototype.resetRoomState = function () {
            this.roomState = 0 /* NULL */;
            this.willJoinRoom = null;
            this.currentRoom = null;
        };
        UserProxy.prototype.joinRoom = function (room) {
            this.roomState = 1 /* JOIN */;
            this.willJoinRoom = room;
            __SEND_NOTIFICATION(app.NetAction.JOIN_ROOM);
            this.joinTimeOut = egret.setTimeout(this.joinRoomFailed, this, 7000, 1);
        };
        UserProxy.prototype.joinRoomFailed = function (flag) {
            if (flag === void 0) { flag = 0; }
            this.clearJoinRoomTimeout();
            if (user.getProxy().roomState == 1 /* JOIN */) {
                this.roomState = 0 /* NULL */;
                this.currentRoom = null;
            }
            //进入房间失败抛出消息 --flag == 1 表示进入房间超时
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.JOIN_ROOM_FAULT, flag);
        };
        UserProxy.prototype.joinRoomSuccess = function () {
            this.clearJoinRoomTimeout();
            this.currentRoom = getProxy().willJoinRoom;
            this.willJoinRoom = null;
            this.roomState = 2 /* IN */;
            cy.addConnectHeart(app.NetAction.ROOM_CHECKACT);
        };
        UserProxy.prototype.clearJoinRoomTimeout = function () {
            if (this.joinTimeOut != -1) {
                egret.clearTimeout(this.joinTimeOut);
                this.joinTimeOut = -1;
            }
        };
        UserProxy.prototype.leaveRoom = function (willJoin) {
            if (willJoin === void 0) { willJoin = null; }
            //如果在房间里先退出
            this.roomState = 3 /* LEAVE */;
            //设置将要去的房间
            this.willJoinRoom = willJoin;
            __SRS().to(app.NetAction.LEAVE_ROOM);
            this.clearLeaveRoomTimeout();
            this.leaveTimeOut = egret.setTimeout(this.leaveRoomFailed, this, 7000);
        };
        UserProxy.prototype.leaveRoomSuccess = function () {
            this.clearLeaveRoomTimeout();
            this.roomState = 0 /* NULL */;
            this.currentRoom = null;
            //更新用户信息
            user.getProxy().friendStatus = 1;
            cy.removeConnectHeart(app.NetAction.ROOM_CHECKACT);
            __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [1, -1]);
        };
        UserProxy.prototype.leaveRoomFailed = function () {
            this.clearLeaveRoomTimeout();
            this.resetRoomState();
        };
        UserProxy.prototype.clearLeaveRoomTimeout = function () {
            if (this.leaveTimeOut != -1) {
                egret.clearTimeout(this.leaveTimeOut);
                this.leaveTimeOut = -1;
            }
        };
        UserProxy.prototype.getRoomType = function (type, smallBlinds) {
            var rv = 1 /* NULL */;
            if (type == 3 /* VIP */) {
                rv = 5 /* PRIVATE */;
            }
            else if (type == 4 /* SNG */) {
                rv = 6 /* SNG */;
            }
            else if (type == 5 /* MTT */) {
                rv = 7 /* MTT */;
            }
            else if (type == 7 /* PK */) {
                rv = 9 /* PK */;
            }
            else if (type == 8 /* FREE */) {
                rv = 10 /* FREE */;
            }
            else if (type == 6 /* HAPPY */) {
                rv = 8 /* HAPPY */;
            }
            else {
                if (smallBlinds <= 100) {
                    rv = 2 /* SMALL */;
                }
                else if (smallBlinds <= 500) {
                    rv = 3 /* MIDDLE */;
                }
                else {
                    rv = 4 /* BIG */;
                }
            }
            return rv;
        };
        UserProxy.prototype.autoSit = function (tableId, hasPass) {
            if (tableId === void 0) { tableId = -1; }
            if (hasPass === void 0) { hasPass = true; }
            if (tableId == -1)
                tableId = room.getProxy().searchEmptyTable();
            var sitId = room.getProxy().searchEmptySit(tableId);
            console.log("autoSit: tableId=" + tableId + " sitId=" + sitId);
            if (hasPass) {
                var joinNumber = room.getProxy().createJoinId(tableId);
                playcards.getProxy().joinNumber = joinNumber;
                var tablePsd = room.getProxy().parseTablePsd(joinNumber);
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, tablePsd); //加密
            }
            else {
                playcards.getProxy().joinNumber = null;
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, ""); //去掉加密
            }
            // playcards.getProxy().beginVipRoom = true;
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]); //坐下
        };
        UserProxy.prototype.vipSit = function (joinNumber) {
            if (joinNumber === void 0) { joinNumber = null; }
            user.getProxy().friendRoomid = null;
            var tableId, sitId;
            if (joinNumber == null) {
                tableId = room.getProxy().searchEmptyTable();
                joinNumber = room.getProxy().createJoinId(tableId);
            }
            else {
                tableId = room.getProxy().parseTableId(joinNumber);
                if (room.getProxy().isEmptyTable(tableId)) {
                    this.gotoVipRoomFiled("房间已满或房间ID错误"); //其实是座位全满，私房人的房间，其实只是一张桌子
                    return;
                }
                else if (room.getProxy().searchEmptySit(tableId) == -1) {
                    this.gotoVipRoomFiled("房间不存在");
                    return;
                }
            }
            sitId = room.getProxy().searchEmptySit(tableId);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            playcards.getProxy().joinNumber = joinNumber;
            playcards.getProxy().beginVipRoom = true;
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]); //坐下
            // __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.ROOM_TYPE.PRIVATE, parseInt(joinNumber)]);
        };
        /**
         * 登录游戏后初始化游戏数据
         */
        UserProxy.prototype.loginDataInit = function () {
            //获取平台银两
            // this.sendNotification(app.NetAction.TOOL_RILVER);
            //获取免费金币
            // this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
            // //获取手牌信息
            // this.sendNotification(app.NetAction.GET_HEAD_INFO, [user.getProxy().svrRoleId]);
            // //获取签到任务
            // mission.getProxy().getServerList();
            // //获取金币任务
            // mission.getProxy().getServerList(AppConst.GAME_ID_FREE);
            // //获取道具相关数据
            // item.getProxy().getItemDate();
        };
        UserProxy.prototype.gotoVipRoomFiled = function (tipStr) {
            tip.popSysCenterTip(tipStr);
            playcards.getProxy().outbakfun();
        };
        /**
         * 是否是新手玩家
         * @returns {boolean}
         */
        UserProxy.prototype.isGreenHandler = function () {
            return user.getProxy().playInfoVO == null || user.getProxy().playInfoVO.totalHand == undefined || user.getProxy().playInfoVO.totalHand <= 0;
        };
        return UserProxy;
    }(app.mvc.AbsractProxy));
    UserProxy.NAME = "person_proxy";
    user.UserProxy = UserProxy;
    __reflect(UserProxy.prototype, "user.UserProxy");
    var ReqPlayerPlusData = (function () {
        function ReqPlayerPlusData() {
            this.userid = ""; //平台账号
            this.ptid = ""; //盛大通行证
            this.ptnumid = ""; //盛大数字账号
            this.nickname = ""; //昵称
            this.identity = ""; //明文
            this.sex = 0; //性别
            this.head = 0; //头像
            this.right = 0; //权限
            this.regtime = 0; //注册时间
            this.vipid = 0; //会员类型
            this.vipendtime = 0; //vip结束时间
            this.ip = 0; //客户端ip;
            this.osver = 0; //客户端操作系统版本号
            this.clienttype = 0; //客户端类型
            this.elimited = 0;
            this.eprotected = 0;
            this.protectedurl = "";
            this.keylen = 0;
            this.key = "";
        }
        return ReqPlayerPlusData;
    }());
    user.ReqPlayerPlusData = ReqPlayerPlusData;
    __reflect(ReqPlayerPlusData.prototype, "user.ReqPlayerPlusData");
})(user || (user = {}));
//# sourceMappingURL=UserProxy.js.map