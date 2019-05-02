var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuiChuModuleMediator = (function (_super) {
        __extends(GuiChuModuleMediator, _super);
        function GuiChuModuleMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, GuiChuModuleMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(GuiChuModuleMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        GuiChuModuleMediator.prototype.listNotificationInterests = function () {
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
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION //重新登录\
            ];
        };
        GuiChuModuleMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                // case app.NetAction.REQ_CHANGE_USER_STATUS:              //离开房间之后判断下是否需要打开钱庄
                //     if(guichu.gameLogic().leaveAfterOpenBank) {
                //         guichu.gameLogic().openBanks();
                //     }
                //     break;
                case GuiChuModuleMediator.TABLE_UPDATE:
                case GuiChuModuleMediator.TABLE_INIT:
                    if (this.view.initialized) {
                        this.view.initTableInfo(data);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_BET:
                    if (this.view.initialized) {
                        this.view.betAnimate(data);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_SPIN:
                    if (this.view.initialized) {
                        this.view.preSpin();
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_END:
                    if (this.view.initialized) {
                        this.view.endStatus();
                    }
                    guichu.getProxy().serverBetFinish = false;
                    break;
                case GuiChuModuleMediator.CHANGE_STATE:
                    var newState = data[1];
                    switch (newState) {
                        case guichu.GAME_STATE.GAME_BET:
                            if (this.view.initialized) {
                                this.view.waitStatus(5000);
                            }
                            break;
                        case guichu.GAME_STATE.GAME_ROLL:
                            guichu.getProxy().serverBetFinish = true;
                            this.view.betFinish();
                        default:
                            break;
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_AUTOBET:
                    if (this.view.initialized) {
                        this.view.clickAutoBet();
                    }
                    break;
                case GuiChuModuleMediator.UPDATE_BET_POT_SIZE:
                    var ob = guichu.getProxy().statisticsBetPot(data);
                    guichu.GuiChuTableItemComp.instance[data - 1].updateBetInfo(ob["totaleBet"], ob["NOP"]);
                    break;
                case GuiChuModuleMediator.UPDATE_BET_MONEY:
                    if (this.view.initialized) {
                        this.view.updateBetMoney(data);
                    }
                    break;
                case GuiChuModuleMediator.UPDATE_REWARD_POOL:
                    // this.view.updateRewardPool(data);
                    break;
                case GuiChuModuleMediator.GUICHU_FREE_END:
                    if (this.view.initialized) {
                        this.view.freeEnd();
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_TEST_BACK:
                    if (this.view.initialized) {
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
                    if (this.view.initialized) {
                        this.view.updatePro();
                    }
                    break;
                case GuiChuModuleMediator.SHOW_PAIJIANG:
                    utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
                    if (this.view.initialized) {
                        this.view.showStateLabel(guichu.GuiChuModuleProxy.STATUS_END);
                    }
                    break;
                case GuiChuModuleMediator.GUICHU_TABLE_END:
                    if (this.view.initialized) {
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
        };
        return GuiChuModuleMediator;
    }(puremvc.Mediator));
    GuiChuModuleMediator.NAME = "GuiChuModuleMediator";
    /** 登录成功 */
    GuiChuModuleMediator.GUICHU_LOGIN_SUCCESS = "GUICHU_LOGIN_SUCCESS";
    /** 下注 */
    GuiChuModuleMediator.GUICHU_BET = "GUICHU_BET";
    /** 旋转 */
    GuiChuModuleMediator.GUICHU_SPIN = "GUICHU_SPIN";
    /** 结算 */
    GuiChuModuleMediator.GUICHU_END = "GUICHU_END";
    GuiChuModuleMediator.GUICHU_TABLE_END = "GUICHU_TABLE_END";
    /** 自动下注 */
    GuiChuModuleMediator.GUICHU_AUTOBET = "GUICHU_AUTOBET";
    /**
     * 桌子信息初始化
     */
    GuiChuModuleMediator.TABLE_INIT = "zpTableInit";
    /**
     * 桌子信息更新
     */
    GuiChuModuleMediator.TABLE_UPDATE = "zpTableUpdate";
    /**
     * 游戏状态变更
     */
    GuiChuModuleMediator.CHANGE_STATE = "changeState";
    GuiChuModuleMediator.SHOW_PAIJIANG = "SHOW_PAIJIANG";
    /**
     * 更新某个下注池的信息
     */
    GuiChuModuleMediator.UPDATE_BET_POT_SIZE = "updateBetPotSize";
    GuiChuModuleMediator.UPDATE_BET_MONEY = "UPDATE_BET_MONEY";
    /** 奖池变化 */
    GuiChuModuleMediator.UPDATE_REWARD_POOL = "UPDATE_REWARD_POOL";
    /** 免费次数用完 */
    GuiChuModuleMediator.GUICHU_FREE_END = "GUICHU_FREE_END";
    /** 测试返回 */
    GuiChuModuleMediator.GUICHU_TEST_BACK = "GUICHU_TEST_BACK";
    /** 激活 */
    GuiChuModuleMediator.GUICHU_ACTIVE = "GUICHU_ACTIVE";
    /** 非激活 */
    GuiChuModuleMediator.GUICHU_DEACTIVE = "GUICHU_DEACTIVE";
    /** 盈利变化 */
    GuiChuModuleMediator.GUICHU_PRO_CHANGE = "GUICHU_PRO_CHANGE";
    guichu.GuiChuModuleMediator = GuiChuModuleMediator;
    __reflect(GuiChuModuleMediator.prototype, "guichu.GuiChuModuleMediator");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuModuleMediator.js.map