var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var login;
(function (login) {
    //返回 1 第方平台登录，返回2 茶苑登录，返回 3 web回放不进游戏 返回0 等待玩家操作登录输入
    var LOGIN_ACTION;
    (function (LOGIN_ACTION) {
        LOGIN_ACTION[LOGIN_ACTION["Normal"] = 0] = "Normal";
        LOGIN_ACTION[LOGIN_ACTION["QQLogin"] = 1] = "QQLogin";
        LOGIN_ACTION[LOGIN_ACTION["GTlogin"] = 2] = "GTlogin";
        LOGIN_ACTION[LOGIN_ACTION["WebBackPlay"] = 3] = "WebBackPlay";
        LOGIN_ACTION[LOGIN_ACTION["DJ_AUTO_LOGON"] = 4] = "DJ_AUTO_LOGON"; //单机自动登录了
    })(LOGIN_ACTION = login.LOGIN_ACTION || (login.LOGIN_ACTION = {}));
    var LoginMoudle = (function (_super) {
        __extends(LoginMoudle, _super);
        function LoginMoudle() {
            var _this = _super.call(this) || this;
            _this.animationCount = 0;
            _this.timeintervalValue = 0;
            _this.inLogin = false;
            _this.sid = 0;
            /**
             * 是否要以缓存账号和密码,由于第三方平台登录 微信，QQ，AppStore 所以不能在界面中记录玩家的账号信息
             * 第loadingMediato第三方登录是为被标记为 false
             */
            _this.notCanCacheID$PD = false;
            _this.skinName = "LoginSkin";
            return _this;
        }
        LoginMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            mc2sdk.event(59002 /* ON_LOIGN_STEP_2 */);
            this.registerMediator(login.LoginUIMediator);
            this.uiInitConfig();
            app.mvc.AppFacade.getInstance().removeCommand(app.NetAction.SRS_CLOSE);
            if (this.versionCheck()) {
                this.loginPanelInit();
            }
        };
        /**
         * 平台切换账号后重新登录
         */
        LoginMoudle.prototype.reGamelogin = function () {
            if (this.versionCheck()) {
                this.loginPanelInit();
            }
        };
        /**
         * 登录界面准备完成,可以执行登录交互了
         */
        LoginMoudle.prototype.loginPanelInit = function () {
            var loginAction = this.autoLogin();
            if (loginAction != LOGIN_ACTION.DJ_AUTO_LOGON) {
                this.channelCheck();
            }
        };
        LoginMoudle.prototype.uiInitConfig = function () {
            //渠道登录界面
            this.loginGroup4.visible = false;
            this.addDebugTouch();
            gameabc.UIPreloadManager.UI_ASSETS_NAME = "uiTextureAtlas";
            if (false) {
                RES.loadGroup("uiTextureAtlas", 0);
            }
            this.serverlist.itemRenderer = login.LoginServerListItem;
            this.serverlist.dataProvider = new eui.ArrayCollection(cy.getChrooseSrsList());
            this.serverlist.selectedIndex = 0;
            this.iptext.text = this.serverlist.selectedItem.label;
            this.serverlist.visible = false;
            this.bindButton(this.iptext);
            this.serverlist.addEventListener(egret.Event.CHANGE, this.onSeverList, this);
            this.bindButton(this.loginbtn);
            this.bindButton(this.fastregbtn);
            this.bindButton(this.cancelbtn);
            this.bindButton(this.qqbtn, false);
            this.bindButton(this.qqbtn2, false);
            this.bindButton(this.weixinbtn, false);
            this.bindButton(this.weixinbtn2, false);
            this.bindButton(this.bfidbtn, false);
            this.bindButton(this.gameteabtn, false);
            this.bindButton(this.bfgamebtn, false);
            // this.bindButton(this.changebtn, false);
            this.cacheDate();
            this.checkBoxDate();
            if (this.isNativeDebug()) {
                AppConst.setServer(cy.getChrooseSrsList()[0]);
            }
            else {
                AppConst.setServer(cy.getChrooseSrsList()[0]);
            }
        };
        /**
         * 游戏进入登录界面之后的处理
         *  返回 1 第方平台登录，返回2 茶苑登录，返回 3 web回放不进游戏 返回0 等待玩家操作登录输入
         */
        LoginMoudle.prototype.autoLogin = function () {
            console.log("in to autoLogin");
            /**
             * url传入的参数
             */
            var obj = utils.NativeUtils.getURLObj();
            AppConst.LOGING_CAN_BOOL = false;
            /**
             * web回放端，不是游戏登录
             */
            if (obj["videoid"] != null || obj["feedbackid"] != null) {
                this.loginGroup1.visible = false;
                this.loginGroup2.visible = false;
                this.loginGroup3.visible = false;
                this.automess.visible = true;
                this.automess.text = "正在加载牌局数据..";
                if (obj["videoid"] != null) {
                    __SEND_NOTIFICATION(app.NetAction.DZ_RECODE_GETVO, obj["videoid"]);
                }
                else {
                    __SEND_NOTIFICATION(app.NetAction.DZ_FEEDBACK_GETVO, obj["feedbackid"]);
                }
                return LOGIN_ACTION.WebBackPlay;
            }
            /**
             * 单机渠道自动登录。。
             */
            if (platform.isDangji()) {
                this.loginPanel.visible = false;
                this.loginGroup4.visible = false;
                this.loginGroup1.visible = false;
                console.log("单机自动注册登录。。。。。。。。");
                if (cy.lastConnectWasError) {
                    this.loginGroup4.visible = true;
                }
                else {
                    this.quickLogin();
                    return LOGIN_ACTION.DJ_AUTO_LOGON;
                }
            }
            /**
             * 第三方平台h5登录
             */
            if (obj.hasOwnProperty("loginType")) {
                var loginType = obj["loginType"];
                if (loginType == "qqloginweb") {
                    var params_str = gameabc.StringUtils.formatHttpParams(obj);
                    console.log("h5第三方平台登录" + params_str);
                    tip.popSysTopTip("h5第三方平台登录");
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_SUCESS_TOHER, obj);
                }
                return LOGIN_ACTION.QQLogin;
            }
            /**
             * 边锋茶苑pc登录
             */
            if (obj["userid"] != null) {
                console.log("url param:" + location.search);
                this.loginGroup1.visible = false;
                this.loginGroup2.visible = false;
                this.loginGroup3.visible = false;
                this.automess.visible = true;
                user.getProxy().loginName = URI.decode(obj["userid"]);
                if (obj["srs"] != null) {
                    this.serverlist.selectedIndex = this.searchSrsInList(obj["srs"]);
                }
                else {
                    this.serverlist.selectedIndex = 0; //通过URL登录，强制切换到正式环境
                }
                if (obj["pass"] != null) {
                    user.getProxy().loginUserType = 0 /* GAMETEA */;
                    user.getProxy().loginPass = obj["pass"];
                }
                else if (obj["sessionid"] != null) {
                    user.getProxy().loginUserType = 7 /* SESSION */;
                    user.getProxy().loginPass = obj["sessionid"];
                    user.getProxy().svrSession = obj["sessionid"];
                }
                if (obj["hdid"] != null) {
                    user.getProxy().hardwareId = obj["hdid"];
                }
                this.loginEvent(false);
                AppConst.LOGING_CAN_BOOL = true;
                // __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
                return LOGIN_ACTION.GTlogin;
            }
            else {
                this.dzGameEvent();
            }
            utils.SoundUtils.loadSound();
            // __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
            return LOGIN_ACTION.Normal;
        };
        /**
         * 版本检查
         */
        LoginMoudle.prototype.versionCheck = function () {
            var _this = this;
            if (platform.CHANNE_ID == platform.CHANNE_IDS.OLD_CHANNEL.toString()) {
                tip.Alert.show("你的游戏客户端版本比较低,为了你能正常的快乐游戏，建议您去官网下载最新的终端", "提示", tip.CONFIRM, function (yesOrNo, params) {
                    if (yesOrNo == tip.YES) {
                        platform.updateDownload();
                        _this.loginPanelInit();
                    }
                    else {
                        _this.loginPanelInit();
                    }
                }, null, this);
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * 各种渠道功能检测处理
         */
        LoginMoudle.prototype.channelCheck = function () {
            /**
             * 其它渠道 native 登录
             */
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                if (!platform.isBfdzpkdrChannel()) {
                    this.loginPanel.visible = false;
                    this.loginGroup4.visible = false;
                    this.loginGroup1.visible = false;
                    this.bindButton(this.btnChannelLogin);
                    console.log("这里调登录了。。。。。。。。");
                    platform.login();
                }
            }
            if (platform.isGTChannel()) {
                this.bfgamebtn.removeFromParent(true);
            }
            else if (platform.isBFChannel()) {
                this.gameteabtn.removeFromParent(true);
            }
            else if (parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.H5) {
                this.weixinbtn.removeFromParent(true);
                this.bfgamebtn.removeFromParent(true);
                if (!egret.Capabilities.isMobile) {
                    this.phoneGroup.visible = true;
                    this.loginPanel.visible = false;
                }
            }
            if (platform.isUnitedNotTencent()) {
                this.qqbtn.removeFromParent(true);
                this.weixinbtn.removeFromParent(true);
            }
        };
        LoginMoudle.prototype.loginTypeCheck = function () {
            if (!platform.isGTChannel() && !platform.isBFChannel() && parseInt(platform.CHANNE_ID) != platform.CHANNE_IDS.DEBUG)
                return true;
            if (this.loginType == 6 /* PLATMENT */)
                return true;
            if (this.loginType == 0 /* PTGAME */ && platform.isGTChannel())
                return true;
            if (this.loginType == 0 /* GAMETEA */ && platform.isBFChannel())
                return true;
            return false;
        };
        LoginMoudle.prototype.searchSrsInList = function (info) {
            var i = this.serverlist.dataProvider.length;
            while (--i > -1) {
                var data = this.serverlist.dataProvider.getItemAt(i);
                if (data.ip.lastIndexOf("." + info) != -1) {
                    return i;
                }
            }
            return i;
        };
        LoginMoudle.prototype.dzGameEvent = function () {
            this.automess.visible = false;
            if (this.loginType == null || this.loginTypeCheck()) {
                this.showLoginGroup1();
            }
            else {
                this.showLoginGroup2();
            }
        };
        LoginMoudle.prototype.showSrsSelector = function () {
            return platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString();
        };
        LoginMoudle.prototype.isNativeDebug = function () {
            return this.showSrsSelector() && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        };
        LoginMoudle.prototype.checkBoxDate = function () {
            if (this.showSrsSelector()) {
                //只有渠道号为10000，测试情况下，显示服务器列表
                this.loginSelectGroup.visible = true;
                this.iptext.visible = true;
                this.testLoginLabel.visible = true;
            }
            else {
                this.loginSelectGroup.visible = false;
                this.iptext.visible = false;
                this.serverlist.visible = false;
                this.testLoginLabel.visible = false;
            }
        };
        LoginMoudle.prototype.cacheDate = function () {
            var loginType = gameabc.LocalSO.getItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE);
            if (loginType != null)
                this.loginType = parseInt(loginType);
        };
        LoginMoudle.prototype.getCacheData = function () {
            this.nameTextInput.text = gameabc.LocalSO.getItem("LOGINNAME" + this.loginType);
            this.passTextInput.text = gameabc.LocalSO.getItem("LOGINNAME_PASS" + this.loginType);
            var selectedIndex = gameabc.LocalSO.getItem("LOGINNAME_INDEX" + this.loginType);
            this.serverlist.selectedIndex = selectedIndex ? parseInt(selectedIndex) : 0;
            this.iptext.text = this.serverlist.selectedItem.label;
        };
        LoginMoudle.prototype.setCacheDate = function () {
            if (!this.notCanCacheID$PD) {
                gameabc.LocalSO.setItem(AppConst.SETTING_TYPE.GAME_LOGIN_TYPE, this.loginType);
                gameabc.LocalSO.setItem("LOGINNAME" + this.loginType, user.getProxy().loginName);
                gameabc.LocalSO.setItem("LOGINNAME_PASS" + this.loginType, user.getProxy().loginPass);
                gameabc.LocalSO.setItem("LOGINNAME_INDEX" + this.loginType, this.serverlist.selectedIndex);
            }
            this.notCanCacheID$PD = false;
            user.getProxy().isAutoLogin = false;
        };
        LoginMoudle.prototype.showLoginGroup1 = function () {
            this.loginGroup2.visible = false;
            this.loginGroup3.visible = false;
            this.loginGroup1.visible = true;
        };
        LoginMoudle.prototype.showLoginGroup2 = function () {
            if (this.loginType == 0 /* GAMETEA */)
                this.loginTitle.source = "iw_chayuanyonghudenglu_1001_png";
            else if (this.loginType == 1 /* PTID */)
                this.loginTitle.source = "iw_bianfengtongxingzheng_login_png";
            else if (this.loginType == 0 /* PTGAME */)
                this.loginTitle.source = "iw_bianfengyouxiyonghudenglu_login_png";
            this.getCacheData();
            this.TweenMovement([this.loGroup0, this.loGroup1, this.loGroup2]);
            this.loginGroup1.visible = false;
            this.loginGroup3.visible = false;
            this.loginGroup2.visible = true;
        };
        LoginMoudle.prototype.TweenMovement = function (btns) {
            var delay = 300;
            var i = 0;
            for (i = 0; i != btns.length; i++) {
                var ui = btns[i];
                var originX = ui.x;
                egret.Tween.removeTweens(ui);
                delay -= 200;
                ui.x = ui.parent.width + originX;
                egret.Tween.get(ui)
                    .wait(delay)
                    .to({ x: originX }, 300, egret.Ease.sineOut);
                delay += 300;
            }
        };
        LoginMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.loginbtn:
                    if (platform.canLoginByAccount()) {
                        user.getProxy().loginName = this.nameTextInput.text;
                        user.getProxy().loginPass = this.passTextInput.text;
                        if (user.getProxy().loginName == "") {
                            tip.popSysCenterTip("账户不能为空！", tip.TIPS_TYPE.TIPS_WARNING);
                            return;
                        }
                        else if (user.getProxy().loginPass == "") {
                            tip.popSysCenterTip("密码不能为空！", tip.TIPS_TYPE.TIPS_WARNING);
                            return;
                        }
                        this.loginEvent();
                    }
                    else {
                        var errorMsg = gameabc.getMessage("NONLICET_CHANNEL");
                        tip.popSysCenterTip(errorMsg, tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    return;
                case this.cancelbtn:
                    this.showLoginGroup1();
                    break;
                case this.btnChannelLogin:
                    this.quickLogin();
                    break;
                case this.fastregbtn:
                    this.quickLogin();
                    break;
                case this.iptext:
                    this.serverlist.visible = true;
                    break;
                case this.qqbtn:
                case this.qqbtn2:
                    console.log("sdk login start: qq");
                    // PlatformSdk.setListener(this.onCallback, this);
                    // platform.getFactory().startLogin("QQLogin");
                    platform.getFactory().startLogin(platform.LOGIN_TYPE.QQLogin);
                    break;
                case this.weixinbtn:
                case this.weixinbtn2:
                    console.log("sdk login start: wx");
                    // PlatformSdk.setListener(this.onCallback, this);
                    platform.getFactory().startLogin(platform.LOGIN_TYPE.WXLogin);
                    break;
                case this.bfidbtn:
                    this.loginType = 1 /* PTID */;
                    this.showLoginGroup2();
                    break;
                case this.bfgamebtn:
                    this.loginType = 0 /* PTGAME */;
                    this.showLoginGroup2();
                    break;
                case this.gameteabtn:
                    this.loginType = 0 /* GAMETEA */;
                    this.showLoginGroup2();
                    break;
                // case this.changebtn:
                //     if (this.autoLoginValue) egret.clearTimeout(this.autoLoginValue);
                //     if (this.timeintervalValue) egret.clearInterval(this.timeintervalValue);
                //     // this.autoLoginGroup.visible = false;
                //     user.getProxy().isAutoLogin = false;
                //     break;
                default:
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    break;
            }
        };
        LoginMoudle.prototype.onSeverList = function (p) {
            console.log(this.serverlist.selectedIndex);
            this.iptext.text = this.serverlist.selectedItem.label;
            this.serverlist.visible = false;
        };
        LoginMoudle.prototype.loginEvent = function (checkLoginType) {
            if (checkLoginType === void 0) { checkLoginType = true; }
            if (this.inLogin) {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("IN_LOGIN"));
                return;
            }
            this.inLogin = true;
            if (checkLoginType) {
                user.getProxy().loginUserType = this.loginType;
            }
            if (this.isNativeDebug()) {
                AppConst.setServer(this.serverlist.selectedItem);
                room.setServer(this.serverlist.selectedItem.roomType);
            }
            else {
                if (this.showSrsSelector() && this.serverlist.selectedIndex != 0) {
                    AppConst.setServer(this.serverlist.selectedItem);
                    room.setServer(this.serverlist.selectedItem.roomType);
                }
                else {
                    AppConst.setServer(cy.getSrsIp());
                    room.setServer(2 /* AUTO_SRS */);
                }
            }
            cy.connectSrsServer(AppConst.CONNECT_SERVER);
            // this.sid = egret.setTimeout(this.showLoading, this, 300);
            __OPEN_PRELOAD();
            // __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
        };
        // private showLoading():void {
        //     if (this.inLogin) __OPEN_PRELOAD();
        // }
        LoginMoudle.prototype.loginSuccess = function () {
            if (!AppGlobal.isLoginFlag) {
                AppGlobal.isLoginFlag = true;
            }
            if (setting.getProxy().gameConfigVOS.length > 0) {
                mc2sdk.event(59003 /* ON_LOIGN_STEP_3 */);
                app.mvc.AppFacade.getInstance().registerCommand(app.NetAction.SRS_CLOSE, cy.ConnectCommands);
                this.setCacheDate();
                gameabc.LocalSO.USERID = user.getProxy().svrRoleId.toString();
                if (setting.getProxy().playBool) {
                    setting.getProxy().playBool = false;
                    setting.getProxy().playsetBgSound();
                }
                __CLOSE_PRELOAD();
                // __CLOSE_MOUDLE(AppReg.BF_LOGIN);
                //本地推送
                // LocalNotificationInterface.send("边锋德州", Math.floor(DateUtils.getNearTime(20)/1000),
                //                                 "您今天还没有签到，快去签到吧", LocalNotificationInterface.LOCALNOTI_SIGN);
                LocalNotificationInterface.send("边锋德州", Math.floor((DateUtils.getNearDayTime(3, 12) - (new Date()).getTime()) / 1000), "您的牌友真焦急的等待着您，快回来看看吧", LocalNotificationInterface.LOCALNOTI_CALLBACK);
                record.getProxy().initDate();
                this.sysConfigInit();
                console.log("登录成功了，看看要不要进入新手引导");
                //进入新手引导
                var GREEN_FLAG = gameabc.LocalSO.getItem("greenFlag");
                if (user.getProxy().playInfoVO == null) {
                    console.log("用户信息是空的");
                }
                else {
                    console.log("用户第一次进游戏的玩局次数是" + user.getProxy().playInfoVO.totalHand);
                }
                if (!GREEN_FLAG && user.getProxy().isGreenHandler()) {
                    console.log("可以进入新手引导了");
                }
                else {
                    //console.log(GREEN_FLAG ? "&" + GREEN_FLAG.toString() + "&" : "");
                    console.log(GREEN_FLAG);
                    console.log("不用进了");
                }
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    if ((GREEN_FLAG == null || GREEN_FLAG == undefined || GREEN_FLAG == "") && user.getProxy().isGreenHandler()) {
                        gameabc.LocalSO.setItem("greenFlag", true);
                        this.visible = false;
                        __OPEN_PRE_MOUDLE(AppReg.GREEN_HANDLER, { callBack: this.gameRun, thisObj: this });
                    }
                    else {
                        this.gameRun();
                    }
                }
                else {
                    var urlObj = utils.NativeUtils.getURLObj();
                    var roomId = parseInt(urlObj["rid"] ? urlObj["rid"] : 0);
                    //99德州房间不进新手引导
                    var dz_99_roomids = [15050, 4096, 4098, 4102, 4103, 4104];
                    if ((GREEN_FLAG == null || GREEN_FLAG == undefined || GREEN_FLAG == "") && user.getProxy().isGreenHandler() && dz_99_roomids.indexOf(roomId) == -1) {
                        gameabc.LocalSO.setItem("greenFlag", true);
                        this.visible = false;
                        __OPEN_PRE_MOUDLE(AppReg.GREEN_HANDLER, { callBack: this.gameRun, thisObj: this });
                    }
                    else {
                        this.gameRun();
                    }
                }
            }
            else {
                //因为需要划分本地读取的信息所以在登录成功之前不能拿配置信息，本地读取需要账号信息做为前缀.
                __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
            }
        };
        LoginMoudle.prototype.loginFailed = function () {
            var _this = this;
            __CLOSE_PRELOAD();
            // this.autoLoginGroup.visible = false;
            if (user.getProxy().loginUserType == 7 /* SESSION */) {
                this.automess.visible = false;
                tip.Alert.show("您的账号已在别处登陆，请重新登陆茶苑大厅", null, tip.ALERT, function () {
                    _this.loginEvent(false);
                }, null, this);
            }
        };
        LoginMoudle.prototype.gameRun = function () {
            __SEND_NOTIFICATION(app.NetAction.REQ_FILE);
            this.autoGame = null;
            /*** 如果不是茶苑pc渠道*/
            if (!platform.isGTPCChannel()) {
                /**如果是新手则直接进入游戏房间则提示金币房的铵钮*/
                if (user.getProxy().isGreenHandler()) {
                    var silver = user.getProxy().svrGameData ? user.getProxy().svrGameData.silver : 0;
                    if (silver <= 1000) {
                        __OPEN_PRE_MOUDLE(AppReg.ROOM, { greenHandler: true });
                    }
                    else {
                        //进入极速游戏
                        room.getProxy().fastRoom();
                    }
                }
                else {
                    __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
                }
                //Var array = ["roleId","roleName","roleLevel","zoneId","zoneName"];            
                //UserInterface.callFunctionArray(UserInterface.FUNCTION_SUBMIT_DATA,array;
                //有猫腻api
                var user_ary = [user.getProxy().svrNumId.toString(), user.getProxy().svrName, user.getProxy().svrAreaId.toString(), ""];
                UserInterface.callFunctionArray(UserInterface.FUNCTION_SUBMIT_DATA, user_ary);
                if (!platform.isBfdzpkdrChannel()) {
                    //显示悬浮球
                    UserInterface.callFunction(UserInterface.FUNCTION_SHOW_TOOLBAR);
                }
                //不往下执行了
                return;
            }
            /** * webURL登录的参数*/
            var urlObj = utils.NativeUtils.getURLObj();
            /** * 第三方平台h5登录 */
            if (urlObj.hasOwnProperty("loginType")) {
                var loginType = urlObj["loginType"];
                if (loginType == "qqloginweb") {
                }
            }
            else {
                var stab = urlObj["stab"];
                var roomId = parseInt(urlObj["rid"]);
                var ofsId = parseInt(urlObj["oid"]);
                // stab = "game"; roomId = 4085; //强制写死，用于测试外网
                // stab = "game"; roomId = 15129; //强制写死，用于测试内网
                // stab = "game"; roomId = 4096; //强制写死，用于测试欢乐城外网
                // stab = "game"; roomId = 15050; //强制写死，用于测试欢乐城内网
                switch (stab) {
                    case "room":
                        __OPEN_PRE_MOUDLE(AppReg.ROOM);
                        break;
                    case "game":
                        mc2sdk.event(59002 /* ON_LOIGN_STEP_2 */);
                        var roomVO = room.getProxy().getRoomVOByOfsId(ofsId);
                        if (roomVO == null) {
                            roomVO = room.getProxy().getRoomVOByRoomId(roomId);
                        }
                        if (roomVO != null && !roomVO.isVip) {
                            this.autoGame = roomVO;
                            this.sendNotification(app.NetAction.TOOL_RILVER);
                        }
                        else {
                            __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
                        }
                        break;
                    case "sng":
                        __OPEN_PRE_MOUDLE(AppReg.SNG);
                        break;
                    case "mtt":
                        __OPEN_PRE_MOUDLE(AppReg.MTT);
                        break;
                    case "match":
                        __OPEN_PRE_MOUDLE(AppReg.MATCH_MAIN);
                        break;
                    default:
                        __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
                }
            }
        };
        LoginMoudle.prototype.rilverUpdate = function () {
            if (user.getProxy().svrGameData == null) {
                this.gotoAutoRoomList(); //拿不到玩家数据的情况，进房间列表
                this.autoGame = null;
            }
            else {
                if (room.getProxy().permit(this.autoGame)) {
                    user.gotoRoom(this.autoGame, AppReg.APP_MAIN_UI);
                    this.autoGame = null;
                }
                else if (this.autoGame != null) {
                    var tipStr = gameabc.ResourceBundleUtil.getMessage("ROOM_PERMIT", FormatUtils.wan(this.autoGame.minBank));
                    this.gotoAutoRoomList();
                    this.autoGame = null;
                    user.getProxy().notMoneyBank(tipStr); //玩家进游戏没钱 打开钱庄界面
                }
            }
        };
        /**
         * 系统模块初始化
         */
        LoginMoudle.prototype.sysConfigInit = function () {
            //与比赛服(列表服)建立连接
            __SEND_NOTIFICATION(app.NetAction.SNG_REQJOIN);
            //防沉迷时间校验
            antiSystem.getProxy().validateAntiInit();
            //开启防沉迷计时器
            __SEND_NOTIFICATION(antiSystem.AntiMediator.ANTI_BEGIN);
            //实名认证
            __SEND_NOTIFICATION(antiSystem.AntiMediator.VERIFICATION_NAME);
            //显示滚屏公告，如果有数据的话
            __SEND_PARAMVO(app.NetAction.GOGO_NOTICE_GET_MANY, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
        };
        /**
         * 快速注册登录游戏
         */
        LoginMoudle.prototype.quickLogin = function () {
            if (platform.canLoginByAccount()) {
                AppConst.setServer(this.serverlist.selectedItem);
                room.setServer(this.serverlist.selectedItem.roomType);
                // match.setServer(this.serverlist.selectedItem.roomType);
                user.getProxy().quickAccount.generateAccount();
            }
            else {
                var errorMsg = gameabc.getMessage("NONLICET_CHANNEL_2");
                tip.popSysCenterTip(errorMsg, tip.TIPS_TYPE.TIPS_WARNING);
            }
        };
        LoginMoudle.prototype.gotoAutoRoomList = function () {
            switch (this.autoGame.type) {
                case 6 /* HAPPY */:
                    __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY_MAIN);
                    return;
                case 1 /* NORMAL */:
                    __OPEN_PRE_MOUDLE(AppReg.ROOM);
                    return;
                default:
                    __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
            }
        };
        LoginMoudle.prototype.dispose = function () {
            if (this.serverlist) {
                this.serverlist.removeEventListener(egret.Event.CHANGE, this.onSeverList, this);
            }
            if (this.sid > 0)
                egret.clearTimeout(this.sid);
            this.sid = 0;
            if (this.autoLoginValue)
                egret.clearTimeout(this.autoLoginValue);
            if (this.timeintervalValue)
                egret.clearInterval(this.timeintervalValue);
            _super.prototype.dispose.call(this);
        };
        LoginMoudle.prototype.setMess = function (str) {
            this.automess.text = str;
        };
        return LoginMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    login.LoginMoudle = LoginMoudle;
    __reflect(LoginMoudle.prototype, "login.LoginMoudle");
})(login || (login = {}));
//# sourceMappingURL=LoginMoudle.js.map