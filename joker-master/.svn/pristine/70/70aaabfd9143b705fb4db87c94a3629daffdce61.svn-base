module user {

    export function getProxy():user.UserProxy {
        return __GET_PROXY(UserProxy);
    }

    export function getPlayerInfo():cyvos.PlayerInfo {
        return getProxy().svrPlayerInfo;
    }

    export const enum LOGIN_TYPE {
        GAMETEA = 0, //茶苑账号          郑翼鹏说现在边锋和茶苑平台登录都是0
        PTID, //通行证账号
        PTGAME = 0, //边锋游戏账号        郑翼鹏说现在边锋和茶苑平台登录都是0
        PLATMENT = 6, //第三方登录
        SESSION = 7, //秘钥登录
        ANONYMITY = 255 //匿名登录
    }


    export const enum ROOM_STATE {
        NULL, //不存在任何房间
        JOIN, //加入房间的过程中
        IN, //在房间里
        LEAVE //离开房间的过程中
    }

    export const enum ROOM_TYPE {
        NULL = 1,   //不在房间中
        SMALL,      //小
        MIDDLE,     //中
        BIG,        //大
        PRIVATE,    //私人
        SNG,        //SNG
        MTT,        //MTT
        HAPPY,      //欢乐城
        PK,
        FREE
    }

    /** 改变所在房间状态，去目标房间，如已在房间，则退出 */
    export function gotoRoom(roomVO:appvos.RoomVO, exitMoudle:number = -1):void {
        if (antiSystem.getProxy().getHour() >= 3) {
            __SEND_NOTIFICATION(antiSystem.AntiMediator.ALERT_3HOUR_IN)
            return;
        }
        console.log("into gotoRoom exitMoudle:",exitMoudle);

        user.getProxy().exitToMoudle = exitMoudle;
        if (user.getProxy().roomState == user.ROOM_STATE.IN) {
            //如果已在目标房间，则忽略
            if (user.getProxy().currentRoom == roomVO) return;
            var roomType = user.getProxy().currentRoom.type; 
            if(roomType == room.TYPE.MTT || roomType == room.TYPE.SNG) {
                user.getProxy().leaveRoomSuccess();
                user.gotoRoom(roomVO);
                return;
            } else {
                user.getProxy().leaveRoom(roomVO);
            }
        } else if (user.getProxy().roomState == user.ROOM_STATE.NULL) {
            //如果不在房间内则进入
            user.getProxy().joinRoom(roomVO);
        } else if (user.getProxy().roomState == user.ROOM_STATE.LEAVE) {
            if(user.getProxy().currentRoom) {
                var roomType = user.getProxy().currentRoom.type;
                if(roomType == room.TYPE.MTT || roomType == room.TYPE.SNG) {
                    user.getProxy().leaveRoomSuccess();
                    user.gotoRoom(roomVO);
                    return;
                } else {
                    //如果正在离开房间，则不做任何操作
                    tip.popSysCenterTip("ON_LEAVE_ROOM",tip.TIPS_TYPE.TIPS_WARNING);
                }
            } else { //
                user.getProxy().joinRoom(roomVO);
            }
        } else if (user.getProxy().roomState == user.ROOM_STATE.JOIN) {
            //如果正在加入房间，则不做任何操作
            tip.popSysCenterTip("ON_GOTO_ROOM", tip.TIPS_TYPE.TIPS_WARNING);
        }
    }

    /**
     * @author
     */
    export class UserProxy extends app.mvc.AbsractProxy {

        public static NAME:string = "person_proxy";
        //小游戏开关 开的情况再去gameBool
        isGameOpen:number = 0;
        gameBool:boolean = false;
        // 手机充值开关
        isShopOpen:number = -1;
        /** 服务端推送的用户信息对象(结构由茶苑服务器定义，只读，不可修改) */
        svrPlayerInfo:cyvos.PlayerInfo;

        /** 服务端推送的用户状态对象(结构由茶苑服务器定义，只读，不可修改) */
        svrPlayerStateInfo:cyvos.PlayerStateInfo;

        /** 从服务端获取的玩家游戏数据(结构由茶苑服务器定义，只读，不可修改) */
        svrGameData:cyvos.PlayerGameData;

        /** 缓存用户信息的整个流，用于进入房间时回发给服务器 */
        svrUserInfoBytesCache:egret.ByteArray;

        reqPlayerPlusData:ReqPlayerPlusData;

        /** 自己的区域ID与数字ID结合 */
        svrRoleId:number;

        /** 自己数字ID */
        get svrNumId():number {
            return this.svrRoleId % 4294967296.0;
        }

        /** 自己区号 */
        get svrAreaId():number {
            return Math.floor(this.svrRoleId / 4294967296.0)
        }

        get vipId():number {
            return 0;
        }
         /** roleid转数字ID */
        getNumId(roleid:number): number{
            return roleid % 4294967296.0;
        }
        /**数字ID 转 roleid*/
        getRoleId(numid:number): number{
            return this.svrAreaId * 4294967296.0 + numid;
        }
        /** 自己头像ID默认是1 */
        svrHeadId:number = 0

        /***自己打牌的数据***/
        playInfoVO:appvos.UserInfoVO;

        //实名制认证
        propertURL:string = "";

        /***茶苑的银子和 12006返回回来银行数据不一样***/
        bankSilver:number = 0;

        /**免费金币房货币 */
        freeGold:number = 0;

        /** 自己昵称 */
        svrName:string;

        /** 自己的登录Session */
        svrSession:string;

        /** 从工具服获取的临时Session */
        svrTmpSession:string;

        get formatSvrTmpSession():string {
            var s = this.svrTmpSession.toUpperCase();
            return FormatUtils.subChangeEndian(s.substr(0, 8)) + "-" +
                FormatUtils.subChangeEndian(s.substr(8, 4)) + "-" +
                FormatUtils.subChangeEndian(s.substr(12, 4).toLowerCase()) + "-" +
                s.substr(16, 4) + "-" + s.substr(20);
        }

        /** 从工具服临时Session时间*/
        sessionTime:number;

        /** 从工具Http获取token*/
        httpToKen:string;

        /** 账户性别@HK */
        sex:number = 0;

        /** 服务器维护的玩家数据列表 */
        svrPlayerList:any = {};

        /** 客户端当前状态 */
        roomState:number = ROOM_STATE.NULL;

        /** 客户端即要进入的房间 */
        willJoinRoom:appvos.RoomVO;

        /** 客户端当前进入的房间 */
        currentRoom:appvos.RoomVO;

        /** 从游戏退出来时，要返回的路径 */
        exitToMoudle:number = -1;

        loginName:string;       //用户名
        loginPass:string;       //密码(可能是session)
        hardwareId:string;      //硬件码

        /** 登录的账号类型(0平台账号，1PT账号) */
        loginUserType:number = user.LOGIN_TYPE.GAMETEA;

        /** 是否自动登录 */
        isAutoLogin: boolean = false;

        /** 好友数量 */
        friendNum: number;
        MAXFRIENDNUM: number = 20;

        /**
         * 用户快速注岫和快登录登逻辑
         */
        quickAccount:user.BFQuickAccount;


        /** 是否主动请求刷新人数 */
        drivingNumPlayers:boolean;


        /** 是否正在游戏中
         * 当与具体的GameSO连上时(可以通信protobuff了)，该值为true
         * 退出游戏房间为false */
        isGamePlaying:boolean = false;


        /**
         *
         */
        places:cyvos.PlayerPlace[];


        /**
         * 是否已经签到过的标记
         */
        singFalg: boolean = false;

        /** 金币房没钱被弹出 */
        freeFlag: boolean = false;
        freeFlagCancel: boolean = false;

        // == 此阶段VO将弃用，客户端各业务单元自行逐步删除，先改完报错再上传 ====
        // public roleVo:appvos.RoleVO = new appvos.RoleVO();
        // public userInfo:appvos.UserVO = new appvos.UserVO();
        public vipInfo:appvos.VipVO = new appvos.VipVO();
        // =================================================================

        // public noticeInfo:appvos.NoticeVO[] = new Array();

        public ImsVO:appvos.ImsVO[];

        public friendRoomid:number = null;

        public friendStatus:ROOM_TYPE = 1;

        public myTipList: appvos.UserLabelVO[] = [null];// 我的自定标签列表
        //牌局信息版本号
        public messVersion: number;
        /**
         * PK房带入额
         * @type {number}
         */
        PKDragInRoom:number = 0;

        constructor() {
            super(UserProxy.NAME);
            this.quickAccount = new user.BFQuickAccount();
            this.reqPlayerPlusData = new ReqPlayerPlusData();
        }

        /**
         * 获取头像路径
         */
        getHeadStr(id:number = 1):string {
            if (id && id != NaN) {
                return "img_Default_Avatar_" + id + "_png";
            }
            else {
                id = 1;
                return "img_Default_Avatar_" + id + "_png"
            }
        }

        /**
         * 注销清空数据
         */
        clearAllData():void {
            this.httpToKen = "";
            this.svrSession = null;
            this.svrGameData = null
            this.svrRoleId = 0;
            this.svrName = "";
            this.svrPlayerList = null;
            this.svrPlayerInfo = null;
            this.svrPlayerStateInfo = null;
            this.svrUserInfoBytesCache = null;
            this.svrTmpSession = "";
            this.sessionTime = 0;
            this.roomState = ROOM_STATE.NULL;
            this.willJoinRoom = null;
            this.currentRoom = null;
            this.clearJoinRoomTimeout();
            this.myTipList = [null];
        }

        public dispose():void {
            super.dispose();
        }


        svrPlayerGameDataDepot:any = {};

        searchPlayerGameData(roleId:number):cyvos.PlayerGameData {
            return this.svrPlayerGameDataDepot[roleId];
        }


        searchPlayer(numId:number, add?:boolean):cyvos.PlayerInfo {
            var info = this.svrPlayerList[numId];
            if (info == null && add) {
                info = new cyvos.PlayerInfo();
                info.numId = numId;
                this.svrPlayerList[numId] = info;
            }
            return info;
        }

        /**
         * 会员是否已经过期了
         * @returns {number}
         *   0.会员正常
         *   1.会员已经过期了
         *   2.还不是会员
         */
        get vipIsExpired():number {
            if (this.vipInfo && this.vipInfo.vipId > 0) {
                var endTime:number = user.getProxy().vipInfo.rewardEndTime;
                var nowTime:number = app.SystemTimer.getServerTime();
                if (nowTime > endTime) {
                    return 1;
                }
            }
            else {
                return 2;
            }
            return 0;
        }

        get vipName():string {
            if (this.vipInfo) {
                var vipTemplate:shop.VIPTemplateVO = shop.getProxy().getVipTemplateById(this.vipInfo.vipTemplateId);
                if (vipTemplate) return vipTemplate.name;
            }
            return "";
        }

        openSNG():void {
            if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType3, egret.RuntimeType.WEB) == 0) {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
            } else {
                __OPEN_PRE_MOUDLE(AppReg.SNG);
            }
        }

        notMoney(tipStr:string = null, isFree: boolean = false):void {
            if (tipStr == null) tipStr = gameabc.ResourceBundleUtil.getMessage("GMAE_NO_MONEY_TIPS")
            if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                tip.Alert.show(tipStr);
            } else {
                if (isFree) { tip.Alert.show(tipStr, null, tip.CONFIRM, null, null, this);
                } else tip.Alert.show(tipStr, null, tip.CONFIRM, this.openbuy, null, this);
            }
        }

        /** 是否关闭钱庄的显示 */        
        isShowBank(): boolean{
            var show: boolean = true;// 默认显示
            var nowVer: number = gameabc.StringUtils.versionToNumberVersion(AppConst.VERSION_STR);
            var nowBusiness: number = parseInt(platform.CHANNE_ID);
            var len: number = setting.getProxy().gameConfigVOS.length;
            for (var i: number = 0; i < len; i++){
                var vo: appvos.GameConfigVO = setting.getProxy().gameConfigVOS[i];
                if (vo.gcId == AppConst.gameConfigType.gameType10) {
                    if (vo.business == 0) {
                        // vo.business == 0 意思为所有渠道
                        if (vo.gcValue == 0 || vo.gcValue == nowVer) {
                            show = false;// value为0是不显示 || value和自己的版本相同的时候，不显示
                            break;
                        }
                    } else if (vo.business == nowBusiness) {
                        //vo.business == nowBusiness 意思是：我的渠道和下发的渠道相同的时候，要判断
                        if (vo.gcValue == 0 || vo.gcValue == nowVer) {
                            show = false;// value为0是不显示 || value和自己的版本相同的时候，不显示
                            break;
                        }
                    }
                }
            }
            return show;
        }

        /**打开财富界面打牌游戏中 不能调用***/
        openMoney():void {
            tip.popSysCenterTip("剩余彩豆不足");

            // if (user.getProxy().roomState == user.ROOM_STATE.IN || !user.getProxy().isShowBank()) {
            //     tip.popSysCenterTip("剩余彩豆不足");
            // } else {
            //      __OPEN_PRE_MOUDLE(AppReg.APP_MONEY);
            // }
        }

        /**没钱弹钱庄***/
        notMoneyBank(tipStr:string = null):void {
            if (tipStr == null) tipStr = gameabc.ResourceBundleUtil.getMessage("GMAE_NO_MONEY_TIPS")
            if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                tip.Alert.show(tipStr, null, tip.CONFIRM, this.openBankbuy, null, this);
            } else {
                tip.Alert.show(tipStr, null, tip.CONFIRM, this.openbuy, null, this);
            }
        }

        private openBankbuy(type:number):void {
            if (type == tip.YES) {
                __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
            }
        }

        private openbuy(type:number):void {
            if (type == tip.YES) {
                if (AppConst.LOGING_CAN_BOOL) {//用sessionid登录  没钱打开钱庄（不能在玩牌游戏中）
                    __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
                } else {
                    this.openShop()
                }
            }
        }

        /**打开充值**/
        openShop():void {
            //用sessionid登录  充值功能不打开
            if (AppConst.LOGING_CAN_BOOL) {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
            } else {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    if (this.isShopOpen < 0) { //获取一次
                        this.isShopOpen = setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType2);
                    }
                        if (this.isShopOpen == 1) {
                            var hides = null
                        if (__IS_MOUDLE_OPEN(AppReg.APP_MAIN_UI))
                            hides = [AppReg.APP_MAIN_UI];  
                        __OPEN_PRE_MOUDLE(AppReg.SHOP_WIN, null,hides);
                        
                    }
                    //if (egret.Capabilities.os == "iOS") {
                    //    tip.popSysCenterTip("WX_CHONG_ZHI");
                    //}
                    //else {
                    //    if (this.isShopOpen < 0) { //获取一次
                    //        this.isShopOpen = setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType2);
                    //    }
                    //    if (this.isShopOpen == 1) {
                    //        __OPEN_PRE_MOUDLE(AppReg.SHOP_WIN, null, [AppReg.APP_MAIN_UI]);
                    //    }
                    //}
                } else {
                    // tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    var hides = null
                    if (__IS_MOUDLE_OPEN(AppReg.APP_MAIN_UI))
                        hides = [AppReg.APP_MAIN_UI];  
                    __OPEN_PRE_MOUDLE(AppReg.SHOP_WIN, null,hides);
                }
            }
        }

        resetRoomState():void {
            this.roomState = ROOM_STATE.NULL;
            this.willJoinRoom = null;
            this.currentRoom = null;
        }


        //标记是否将进入比赛房间，影响到桌面是否显示比赛的桌子
        willJoinMatchRoom:boolean;

        joinRoom(room:appvos.RoomVO):void {
            this.roomState = user.ROOM_STATE.JOIN;
            this.willJoinRoom = room;
            __SEND_NOTIFICATION(app.NetAction.JOIN_ROOM);
            this.joinTimeOut = egret.setTimeout(this.joinRoomFailed, this, 7000,1);
        }

        joinRoomFailed(flag:number = 0):void {
            this.clearJoinRoomTimeout();
            if (user.getProxy().roomState == user.ROOM_STATE.JOIN) {
                this.roomState = user.ROOM_STATE.NULL;
                this.currentRoom = null;
            }
            //进入房间失败抛出消息 --flag == 1 表示进入房间超时
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.JOIN_ROOM_FAULT,flag)
        }

        joinRoomSuccess():void {
            this.clearJoinRoomTimeout();
            this.currentRoom = getProxy().willJoinRoom;
            this.willJoinRoom = null;
            this.roomState = user.ROOM_STATE.IN;
            cy.addConnectHeart(app.NetAction.ROOM_CHECKACT);
        }

        joinTimeOut:number = -1;

        clearJoinRoomTimeout():void {
            if (this.joinTimeOut != -1) {
                egret.clearTimeout(this.joinTimeOut)
                this.joinTimeOut = -1;
            }
        }

        leaveRoom(willJoin:appvos.RoomVO = null):void {
            //如果在房间里先退出
            this.roomState = user.ROOM_STATE.LEAVE;
            //设置将要去的房间
            this.willJoinRoom = willJoin;
            __SRS().to(app.NetAction.LEAVE_ROOM);
            this.clearLeaveRoomTimeout();
            this.leaveTimeOut = egret.setTimeout(this.leaveRoomFailed, this, 7000);
        }


        leaveRoomSuccess():void {
            this.clearLeaveRoomTimeout();
            this.roomState = user.ROOM_STATE.NULL;
            this.currentRoom = null;
            //更新用户信息
            user.getProxy().friendStatus = 1;
            cy.removeConnectHeart(app.NetAction.ROOM_CHECKACT);
            __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [1, -1]);
        }

        leaveRoomFailed():void {
            this.clearLeaveRoomTimeout();
            this.resetRoomState();
        }

        leaveTimeOut:number = -1;

        clearLeaveRoomTimeout():void {
            if (this.leaveTimeOut != -1) {
                egret.clearTimeout(this.leaveTimeOut)
                this.leaveTimeOut = -1;
            }
        }

        getRoomType(type:room.TYPE, smallBlinds:number):number {
            var rv:number = ROOM_TYPE.NULL;
            if (type == room.TYPE.VIP) {
                rv = ROOM_TYPE.PRIVATE;
            } else if (type == room.TYPE.SNG) {
                rv = ROOM_TYPE.SNG;
            } else if (type == room.TYPE.MTT) {
                rv = ROOM_TYPE.MTT;
            } else if (type == room.TYPE.PK) {
                rv = ROOM_TYPE.PK;
            } else if (type == room.TYPE.FREE) {
                rv = ROOM_TYPE.FREE
            } else if (type == room.TYPE.HAPPY) {
                rv = ROOM_TYPE.HAPPY;
            } else {
                if (smallBlinds <= 100) {
                    rv = ROOM_TYPE.SMALL;
                } else if (smallBlinds <= 500) {
                    rv = ROOM_TYPE.MIDDLE;
                } else {
                    rv = ROOM_TYPE.BIG;
                }
            }
            return rv;
        }


        autoSit(tableId:number=-1, hasPass:boolean=true):void {
            if(tableId==-1) tableId = room.getProxy().searchEmptyTable();
            var sitId = room.getProxy().searchEmptySit(tableId);
            console.log("autoSit: tableId="+tableId+" sitId="+sitId);
            if (hasPass) {
                var joinNumber = room.getProxy().createJoinId(tableId);
                playcards.getProxy().joinNumber = joinNumber;
                var tablePsd = room.getProxy().parseTablePsd(joinNumber);
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, tablePsd);//加密
            } else {
                playcards.getProxy().joinNumber = null;
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, "");//去掉加密
            }
            // playcards.getProxy().beginVipRoom = true;
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]);//坐下
        }

        vipSit(joinNumber:string = null):void {
            user.getProxy().friendRoomid = null;
            var tableId, sitId;
            if (joinNumber == null) {
                tableId = room.getProxy().searchEmptyTable();
                joinNumber = room.getProxy().createJoinId(tableId);
            } else {
                tableId = room.getProxy().parseTableId(joinNumber);
                if (room.getProxy().isEmptyTable(tableId)) {
                    this.gotoVipRoomFiled("房间已满或房间ID错误");//其实是座位全满，私房人的房间，其实只是一张桌子
                    return;
                } else if (room.getProxy().searchEmptySit(tableId) == -1) {
                    this.gotoVipRoomFiled("房间不存在");
                    return;
                }
            }

            sitId = room.getProxy().searchEmptySit(tableId);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            playcards.getProxy().joinNumber = joinNumber;
            playcards.getProxy().beginVipRoom = true;
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]);//坐下
            // __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.ROOM_TYPE.PRIVATE, parseInt(joinNumber)]);
        }

        /**
         * 登录游戏后初始化游戏数据
         */
        loginDataInit():void {
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
        }

        gotoVipRoomFiled(tipStr:string):void {
            tip.popSysCenterTip(tipStr);
            playcards.getProxy().outbakfun();
        }

        /**
         * 是否是新手玩家
         * @returns {boolean}
         */
        isGreenHandler():boolean {
            return user.getProxy().playInfoVO == null || user.getProxy().playInfoVO.totalHand == undefined || user.getProxy().playInfoVO.totalHand <= 0
        }

        // public getMyCustomTips():void{
        //     __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_LABELS);
        // }
        
    }

    export class ReqPlayerPlusData {
        userid:string = "";             //平台账号
        ptid:string = "";               //盛大通行证
        ptnumid:string = "";            //盛大数字账号
        nickname:string = "";           //昵称
        identity:string = "";           //明文

        sex:number = 0;                 //性别
        head:number = 0;                //头像
        right:number = 0;               //权限
        regtime:number = 0;             //注册时间
        vipid:number = 0;               //会员类型
        vipendtime:number = 0;          //vip结束时间

        ip:number = 0;                  //客户端ip;
        osver:number = 0;               //客户端操作系统版本号
        clienttype:number = 0;          //客户端类型
        elimited:number = 0;
        eprotected:number = 0;
        protectedurl:string = "";
        keylen:number = 0;
        key:string = "";
    }

    
}
