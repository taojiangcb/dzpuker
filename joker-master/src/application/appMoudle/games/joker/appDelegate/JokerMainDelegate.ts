module app {
	export class JokerMainDelegate implements IAppDelegate {

		private stage: egret.Stage;
        private loadingView: LoadingUI;
        private verLoad: egret.URLLoader;

        constructor() {
        }

        /**
        * 初始化有猫腻Sdk
        */
        initYouMaoNiSdk():void {
            //初始化有猫腻sdk
            PlatformSdk.setListener(this.onCallback,this);
            PlatformSdk.init();
        }

		/**
		 * 设置常量定义
		 */
        setAppConst():void {

            AppGlobal.pageMinWidth = 1136;
            AppGlobal.pageMinHeight = 768;

            AppGlobal.pageMaxWidth = 1280;
            AppGlobal.pageMaxHeight = 768;


			AppConst.GAME_ID = 502;
			AppConst.OUT_SVR =  new cy.SrsIp(0, "61.164.152.71",   5601,  502,   3790, "123.59.14.4:9091",  "123.59.14.4:9092",  "外网71",  room.CONFIG.PUBLIC);
    		AppConst.IN_SVR2  = new cy.SrsIp(0, "192.168.135.57",  4102,  502,   4001,  "192.168.138.131:9091", "192.168.138.131:9092", "内网57",  room.CONFIG.MINE_57);
        }

		/**
		 * 设置srs连接的ip
		 */
        setSrsConfig():void {
			cy.getSrsIp = function():cy.SrsIp {
				if(cy.srsList == null) {
					cy.srsList = [
						new cy.SrsIp(3809,    "118.178.85.188",  5601,   502,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092"),
						new cy.SrsIp(3810,    "118.178.85.188",  5602,   502,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092")
					];
        		}
        		var i:number = Math.floor(Math.random() * cy.srsList.length);
        		return cy.srsList[i]; //如果想强行只指定一个IP，可直接修改i变量
			}

			cy.getChrooseSrsList = function():cy.SrsIp[] {
				var srsIps = [
					AppConst.IN_SVR2,AppConst.OUT_SVR,cy.getSrsIp()
				]
				return srsIps;
			}
        }

		/**
		 * 设置房间
		 */
	    setRoomConfig():void{
			//内网房间配置 57 
			room.getProxy().mRoom1 = [
				room.getProxy().createNormalRoom(101,    10,    20,     500,     2000,   5002, 201,   6, false, 0,[1,1,1,1,1]),
			] 
        }


        /**
         * 应用启动
         */
        appLanuch(): void {

			this.setAppConst();
            this.setSrsConfig();
            this.setRoomConfig();

            this.stage = AppRoot.gameLayer.stage;
            var assetAdapter = new AssetAdapter();
            this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            // initialize the Resource loading library
            //初始化Resource资源加载库
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

            if (DEBUG) {
                RES.loadConfig("resource_art/" + $DEFAULT_RES$, "resource_art/");
                return;
            }

            var url: string = "resource_publish/" + $DEFAULT_RES$;
            var urlRoot: string = "resource_publish/";
            RES.loadConfig(url, urlRoot);

        }

        private onStageChange(event: egret.Event): void {
            AppRoot.gameLayer.setFullScreen();
        }
        /**
         * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
         * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
         */
        private onConfigComplete(event: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource_publish/" + $DEFAULT_THM$, this.stage);
           
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //Config loading process interface

            // 设置加载进度界面
            this.loadingView = new LoadingUI();
            this.loadingView.logoimg.source = "guichu_logo_png";
            AppRoot.gameLayer.addChild(this.loadingView);

            RES.loadGroup("preload", 3);
            RES.loadGroup("card",2);
            RES.loadGroup("joker",1);
            this.createScene();
        }

        private gameCfgEvent(evt: any): void {
        }

        private gameErrorEvent(evt: any): void {
            gameabc.ResourceBundleUtil.setErrorSourceData(evt);
        }

        private gameMsgEvent(evt: any): void {
            gameabc.ResourceBundleUtil.setMsgSourceData(evt);
        }

        private isThemeLoadEnd: boolean = false;
        /**
         * 主题文件加载完成,开始预加载
         * Loading of theme configuration file is complete, start to pre-load the 
         */
        private onThemeLoadComplete(): void {
            this.isThemeLoadEnd = true;
            this.createScene();
        }

        private isResourceLoadEnd: boolean = false;

        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                gameabc.ResourceBundleUtil.setErrorSourceData(RES.getRes("GameError_js"));
                gameabc.ResourceBundleUtil.setMsgSourceData(RES.getRes("GameMsg_js"));
                gameabc.ResourceBundleUtil.setCfgSourceData(RES.getRes("GameCfg_js"));
                utils.NativeUtils.removeloading();
            }
            else if (event.groupName == "joker") {
                this.loadingView.setText("正在初始化皮肤请稍候...");
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.isResourceLoadEnd = true;
                this.createScene();
            }
        }

        private createScene() {
            if (this.isThemeLoadEnd && this.isResourceLoadEnd) { this.startCreateScene(); }
            // //当前app的状态监听
            this.stage.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
        }

        //最小化时处理
        deactivateHandler(event: egret.Event): void {
            // console.log("deactivate");
            __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_DEACTIVE);
            this.stage.addEventListener(egret.Event.ACTIVATE, this.activeHandler, this);
            this.stage.removeEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
        }

        //激活时处理
        activeHandler(event: egret.Event): void {
            // console.log("active");
            __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_ACTIVE);
            this.stage.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
            this.stage.removeEventListener(egret.Event.ACTIVATE, this.activeHandler, this);
        }

        /**
         * 资源组加载出错
         * The resource group loading failed
         */
        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }

        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //ignore loading failed projects
            this.onResourceLoadComplete(event);
        }

        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onResourceProgress(event: RES.ResourceEvent): void {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }

        /**
         * 创建场景界面
         * Create scene interface
         */
        protected startCreateScene(): void {
            AppRoot.gameLayer.removeChild(this.loadingView);
            AppRoot.gameLayer.setFullScreen();
            /*** 游戏开始 ****/
            // joker.gameLogic().gameStart();
            __OPEN_PRE_MOUDLE(AppReg.JOKER_MODULE);
        }

        onCallback(code: string, msg: string): void {
            console.log("platform call back code:" + code + " msg:" + msg)
            console.log("code " + code);
            var tip_str: string = "";
            switch (parseInt(code)) {
                case UserWrapper.ACTION_RET_INIT_SUCCESS:
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "用户中心初始化成功";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    break;
                case UserWrapper.ACTION_RET_INIT_FAIL:
                    //用户中心初始化失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "用户中心初始化失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_LOGIN_SUCCESS:
                    //登录成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "登录成功";
                    }
                    tip_str = "登录成功";
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    var obj = JSON.parse(msg);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_SUCESS_TOHER, obj);
                    break;
                case UserWrapper.ACTION_RET_LOGIN_TIMEOUT:
                    //登录超时
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "登录超时";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_LOGIN_NO_NEED:
                    //无需登录
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "无需登录";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_LOGIN_FAIL:
                    //登录失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "登录失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);   //强行弹登录
                    platform.login();
                    break;
                case UserWrapper.ACTION_RET_LOGIN_CANCEL:
                    //取消登录
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "取消登录";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    //强行弹登录
                    platform.login();
                    break;
                case UserWrapper.ACTION_RET_LOGOUT_SUCCESS:
                    //退出登录成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "退出登录成功";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    //注销
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_OUT);
                    break;
                case UserWrapper.ACTION_RET_LOGOUT_FAIL:
                    //退出登录失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "退出登录失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_PLATFORM_ENTER:
                    //进入平台
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "进入平台";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_PLATFORM_BACK:
                    //退出平台
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "退出平台";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_PAUSE_PAGE:
                    //应用程序暂停
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "应用程序暂停";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_EXIT_PAGE:
                    //用户选择推出应用程序回调
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "用户选择推出应用程序回调";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    // tip.popSysTopTip(tip_str);
                    //退出程序
                    utils.NativeUtils.nativeCall(utils.NATIVE_CMD.CLOSE_NATIVE);
                    break;
                case UserWrapper.ACTION_RET_ANTIADDICTIONQUERY:
                    //防沉迷系统
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "防沉迷系统";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_REALNAMEREGISTER:
                    //实名注册
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "实名注册";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.ACTION_RET_ACCOUNTSWITCH_SUCCESS:
                    //切换账号成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "切换账号成功";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    //注销
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
                    break;
                case UserWrapper.ACTION_RET_ACCOUNTSWITCH_FAIL:
                    //切换账号失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "切换账号失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.WX_FLAG_SHARERESULT_DENY:
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "分享拒绝权限";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.WX_FLAG_SHARERESULT_FAIL:
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "分享失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.WX_FLAG_SHARERESULT_SUCCESS:
                    //分享成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "分享成功";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case UserWrapper.WX_FLAG_SHARERESULT_UNKNOWN:
                    //分享未知状态
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "分享未知状态";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_SUCCESS:
                    //支付成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "支付成功";
                    }
                    tip_str = msg;
                    console.log(code.toString + ":" + msg);
                    tip.popSysCenterTip(msg, tip.TIPS_TYPE.TIPS_CORRECT);
                    //刷下钱
                    egret.setTimeout(() => {
                        __SEND_NOTIFICATION(app.NetAction.TOOL_RILVER);
                    }, this, 5000)
                    break;
                case PaymentWrapper.PAYRESULT_FAIL:
                    //支付失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "支付失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_CANCEL:
                    //取消支付
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "取消支付";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_NETWORK_ERROR:
                    //支付时网络出错
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "支付时网络出错";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_PRODUCTIONINFOR_INCOMPLETE:
                    //产品信息不完整
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "产品信息不完整";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_INIT_SUCCESS:
                    //支付初始化成功
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "支付初始化成功";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    // tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_INIT_FAIL:
                    //支付初始化失败
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "支付初始化失败";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    // tip.popSysTopTip(tip_str);
                    break;
                case PaymentWrapper.PAYRESULT_NOW_PAYING:
                    //正在支付
                    if (msg == "" || msg == undefined || msg == null) {
                        msg = "正在支付";
                    }
                    tip_str = msg;
                    console.log(code.toString() + ":" + msg);
                    tip.popSysTopTip(tip_str);
                    break;
            }
		}
	}
}