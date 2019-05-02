module guichu {
    export class GuiChuModuleMediator extends puremvc.Mediator {
        
        
        static NAME: string = "GuiChuModuleMediator";


        /** 登录成功 */
        static GUICHU_LOGIN_SUCCESS: string = "GUICHU_LOGIN_SUCCESS";
        
        /** 下注 */
        static GUICHU_BET: string = "GUICHU_BET";
        /** 旋转 */
        static GUICHU_SPIN: string = "GUICHU_SPIN";
        /** 结算 */
        static GUICHU_END: string = "GUICHU_END";
        static GUICHU_TABLE_END: string = "GUICHU_TABLE_END";
        /** 自动下注 */
        static GUICHU_AUTOBET: string = "GUICHU_AUTOBET";


        /**
         * 桌子信息初始化
         */
        static TABLE_INIT: string = "zpTableInit";

        /**
         * 桌子信息更新
         */
        static TABLE_UPDATE:string = "zpTableUpdate";


        /**
         * 游戏状态变更
         */
        static CHANGE_STATE:string = "changeState";
        static SHOW_PAIJIANG: string = "SHOW_PAIJIANG";

        /**
         * 更新某个下注池的信息
         */
        static UPDATE_BET_POT_SIZE:string = "updateBetPotSize";
        static UPDATE_BET_MONEY: string = "UPDATE_BET_MONEY";
        /** 奖池变化 */
        static UPDATE_REWARD_POOL: string = "UPDATE_REWARD_POOL";
        /** 免费次数用完 */
        static GUICHU_FREE_END: string = "GUICHU_FREE_END";
        /** 测试返回 */
        static GUICHU_TEST_BACK: string = "GUICHU_TEST_BACK";
        /** 激活 */
        static GUICHU_ACTIVE: string = "GUICHU_ACTIVE";
        /** 非激活 */
        static GUICHU_DEACTIVE: string = "GUICHU_DEACTIVE";
        /** 盈利变化 */
        static GUICHU_PRO_CHANGE: string = "GUICHU_PRO_CHANGE";
		constructor(viewComponent: Object = null) {
            super(GuiChuModuleMediator.NAME, viewComponent);
        }

        public get view(): GuiChuModule {
            return this.viewComponent;
        }

        public listNotificationInterests(): any[] {
            return [
                GuiChuModuleMediator.GUICHU_BET,
                GuiChuModuleMediator.GUICHU_SPIN,
                GuiChuModuleMediator.GUICHU_END,
                GuiChuModuleMediator.TABLE_INIT,
                GuiChuModuleMediator.TABLE_UPDATE,
                GuiChuModuleMediator.CHANGE_STATE,
                // app.NetAction.REQ_CHANGE_USER_STATUS,
                GuiChuModuleMediator.GUICHU_AUTOBET,
                GuiChuModuleMediator.UPDATE_BET_POT_SIZE,
                GuiChuModuleMediator.UPDATE_BET_MONEY,
                GuiChuModuleMediator.UPDATE_REWARD_POOL,
                GuiChuModuleMediator.GUICHU_FREE_END,
                GuiChuModuleMediator.GUICHU_TEST_BACK,
                GuiChuModuleMediator.GUICHU_ACTIVE,
                GuiChuModuleMediator.GUICHU_DEACTIVE,
                GuiChuModuleMediator.GUICHU_PRO_CHANGE,
                GuiChuModuleMediator.SHOW_PAIJIANG,
                GuiChuModuleMediator.GUICHU_TABLE_END,
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION		//重新登录\
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                // case app.NetAction.REQ_CHANGE_USER_STATUS:              //离开房间之后判断下是否需要打开钱庄
                //     if(guichu.gameLogic().leaveAfterOpenBank) {
                //         guichu.gameLogic().openBanks();
                //     }
                //     break;

                case GuiChuModuleMediator.TABLE_UPDATE:
                case GuiChuModuleMediator.TABLE_INIT:
                    if(this.view.initialized) {
                        this.view.initTableInfo(data);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_BET:
                    if(this.view.initialized) {
                        this.view.betAnimate(data);
                    }
                    break;
                    
                case GuiChuModuleMediator.GUICHU_SPIN:
                    if(this.view.initialized) {
                        this.view.preSpin();
                    }
                    break;

                case GuiChuModuleMediator.GUICHU_END:
                    if(this.view.initialized) {
                        this.view.endStatus();
                    }
                    getProxy().serverBetFinish = false;
                    break;

                case GuiChuModuleMediator.CHANGE_STATE:
                    var newState = data[1];
                    switch (newState) {
                        case guichu.GAME_STATE.GAME_BET:
                            if(this.view.initialized) {
                                this.view.waitStatus(5000);
                            }
                            break;
                        case guichu.GAME_STATE.GAME_ROLL:
                            getProxy().serverBetFinish = true;
                            this.view.betFinish();
                        default:
                            break;
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_AUTOBET:
                    if(this.view.initialized) {
                        this.view.clickAutoBet();
                    }
                    break;
                case GuiChuModuleMediator.UPDATE_BET_POT_SIZE:
                    var ob = getProxy().statisticsBetPot(data);
                    GuiChuTableItemComp.instance[data-1].updateBetInfo(ob["totaleBet"], ob["NOP"]);
                    break;
                case GuiChuModuleMediator.UPDATE_BET_MONEY:
                    if(this.view.initialized) {
                        this.view.updateBetMoney(data);
                    }
                    break;
                case GuiChuModuleMediator.UPDATE_REWARD_POOL:
                    // this.view.updateRewardPool(data);
                    break;
                case GuiChuModuleMediator.GUICHU_FREE_END:
                    if(this.view.initialized) {
                            this.view.freeEnd();
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_TEST_BACK:
                    if(this.view.initialized) {
                        this.view.updateTest(data);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_ACTIVE:
                    console.log("active: " + egret.getTimer());
                    break;
                case GuiChuModuleMediator.GUICHU_DEACTIVE:
                    console.log("deactive: " + egret.getTimer());
                    break;
                case GuiChuModuleMediator.GUICHU_PRO_CHANGE:
                    if(this.view.initialized) {
                        this.view.updatePro();
                    }
                    break;
                case GuiChuModuleMediator.SHOW_PAIJIANG:
                    utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
                    if(this.view.initialized) {
                        this.view.showStateLabel(GuiChuModuleProxy.STATUS_END);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_TABLE_END:
                    if(this.view.initialized) {
                        this.view.tableEndStatus();
                    }
                    break;
                case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
					guichu.loginLogiC().onLoginOut();
					guichu.gameLogic().gameStart();
					break;
                default:
                    break;
            }
        }
	}
}