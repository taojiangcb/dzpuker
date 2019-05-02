var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var joker;
(function (joker) {
    var JokerGameMediator = (function (_super) {
        __extends(JokerGameMediator, _super);
        function JokerGameMediator(view) {
            var _this = _super.call(this, JokerGameMediator.NAME, view) || this;
            /**上次的门数 */
            _this.oldCount = 1;
            return _this;
        }
        JokerGameMediator.prototype.listNotificationInterests = function () {
            return [
                JokerGameMediator.GAME_STAET,
                JokerGameMediator.GAME_CONT_CHANGE,
                JokerGameMediator.GAME_RATIO_CHANGE,
                JokerGameMediator.TABLE_INITIALIZED,
                JokerGameMediator.BET,
                JokerGameMediator.GAME_FA_PAI,
                JokerGameMediator.GAME_AWARD,
                JokerGameMediator.GAME_RE_STAET,
                app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION //重新登录
            ];
        };
        JokerGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case JokerGameMediator.TABLE_INITIALIZED:
                    break;
                case JokerGameMediator.BET:
                    break;
                case app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION:
                    joker.shareLoginC().onLoginOut();
                    joker.gameLogic().gameStart();
                    break;
                case JokerGameMediator.GAME_FA_PAI:
                    this.dealMaster(notification);
                    break;
                case JokerGameMediator.GAME_STAET:
                    this.gameStartState();
                    break;
                case JokerGameMediator.GAME_CONT_CHANGE:
                    this.changePokerContent(notification);
                    break;
                case JokerGameMediator.GAME_RATIO_CHANGE:
                    this.popGameRatio();
                    break;
                case JokerGameMediator.GAME_AWARD:
                    this.gameAwardState();
                    break;
                case JokerGameMediator.GAME_RE_STAET:
                    break;
            }
        };
        /**
         * 发手下牌
         */
        JokerGameMediator.prototype.dealMaster = function (notification) {
            var cardValues = notification.getBody();
            //一手牌的时候处理
            if (joker.getProxy().nowCount == joker.getProxy().handlerCount[0]) {
                this.viewComp.pokerComp.arrageAnimateion.masterHand(cardValues);
            }
            else {
                this.viewComp.pokerComp.tumover(cardValues);
            }
        };
        /**
         * 改变了门数
         */
        JokerGameMediator.prototype.changePokerContent = function (notification) {
            if (this.viewComp) {
                var newCount = notification.getBody();
                if (this.oldCount == 1 && newCount == 1) {
                    this.viewComp.JPCS.onePkContent();
                }
                else if (newCount == 1 && this.oldCount != 1) {
                    this.oldCount = newCount;
                    this.viewComp.JPCS.changePkContent(notification.getBody());
                    this.viewComp.JPCS.onePkContent();
                }
                else if (this.oldCount != newCount) {
                    this.oldCount = newCount;
                    this.viewComp.JPCS.denyOnePkContent();
                    this.viewComp.JPCS.changePkContent(notification.getBody());
                }
            }
            __CLOSE_MOUDLE(AppReg.JOKER_RATIO_MODULE);
        };
        /**
         * 游戏开始了
         */
        JokerGameMediator.prototype.gameStartState = function () {
            return __awaiter(this, void 0, void 0, function () {
                var pokerContent, pokerBg, handPoker, x, y;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.viewComp)
                                return [3 /*break*/, 2];
                            pokerContent = this.viewComp.handPokerContent;
                            pokerBg = this.viewComp.pokerBg;
                            handPoker = this.viewComp.pokerComp;
                            x = AppGlobal.stageFullWidth - pokerContent.width >> 1;
                            y = AppGlobal.stageFullHeight - pokerContent.height - this.viewComp.operationPanel.height - 10;
                            pokerContent.x = x;
                            pokerContent.y = y;
                            pokerBg.alpha = 0;
                            handPoker.visible = true;
                            //发牌
                            return [4 /*yield*/, handPoker.arrageAnimateion.flyIn()];
                        case 1:
                            //发牌
                            _a.sent();
                            __SEND_NOTIFICATION(JokerGameMediator.GAME_CONT_CHANGE, 1); //选择一手牌
                            __CLOSE_MOUDLE(AppReg.JOKER_RATIO_MODULE);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 进入结算状态
         */
        JokerGameMediator.prototype.gameAwardState = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(joker.getProxy().nowCount == joker.getProxy().handlerCount[0]))
                                return [3 /*break*/, 2];
                            return [4 /*yield*/, this.masterHandAward()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.awardDisplayUpdate()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        JokerGameMediator.prototype.masterHandAward = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            egret.Tween.removeTweens(_this.viewComp.pokerBg);
                            _this.viewComp.pokerComp.arrageAnimateion.normalArrage(true);
                            egret.Tween.get(_this.viewComp.pokerBg)
                                .set({ visible: true })
                                .to({ alpha: 1 }, 300)
                                .call(function () { resolve(); });
                        })];
                });
            });
        };
        //结算状态时的ui部局
        JokerGameMediator.prototype.awardDisplayUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var duration = 300;
                            var pokerContentRight = 5;
                            var pokerContentTx = AppGlobal.stageFullWidth - _this.viewComp.pokerContentGroup.width - pokerContentRight;
                            var a = _this.viewComp.handPokerContent.left;
                            egret.Tween.removeTweens(_this.viewComp.pokerContentGroup);
                            egret.Tween.get(_this.viewComp.pokerContentGroup)
                                .set({ horizontalCenter: NaN })
                                .to({ x: pokerContentTx }, duration, egret.Ease.quartOut)
                                .set({ right: pokerContentRight });
                            var pokerHandContentTx = AppGlobal.stageFullWidth - _this.viewComp.handPokerContent.width - pokerContentRight;
                            egret.Tween.removeTweens(_this.viewComp.handPokerContent);
                            egret.Tween.get(_this.viewComp.handPokerContent)
                                .set({ horizontalCenter: NaN })
                                .to({ x: pokerHandContentTx, bottom: 170 }, duration, egret.Ease.quartOut)
                                .set({ right: pokerContentRight });
                            var awardLeft = 5;
                            egret.Tween.removeTweens(_this.viewComp.awardTable);
                            egret.Tween.get(_this.viewComp.awardTable)
                                .to({ left: awardLeft }, duration, egret.Ease.backOut)
                                .wait(100)
                                .call(function () {
                                resolve();
                            });
                        })];
                });
            });
        };
        JokerGameMediator.prototype.gameRestartState = function () {
        };
        /**
         * 弹出选择的倍率窗口
         */
        JokerGameMediator.prototype.popGameRatio = function () {
            if (!__IS_MOUDLE_OPEN(AppReg.JOKER_RATIO_MODULE)) {
                __OPEN_PRE_MOUDLE(AppReg.JOKER_RATIO_MODULE, null, null, null, this.viewComp.ratioContent);
            }
            else {
                var jokerRatioModule = __GET_MOUDLE_COMP(AppReg.JOKER_RATIO_MODULE);
                jokerRatioModule.renderChroose();
            }
        };
        Object.defineProperty(JokerGameMediator.prototype, "viewComp", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        return JokerGameMediator;
    }(app.mvc.AbstractMediator));
    JokerGameMediator.NAME = "__JOKER_GAME_MEDIATOR__";
    JokerGameMediator.TABLE_INITIALIZED = "tableInit"; //桌子信息
    JokerGameMediator.BET = "bet"; //下注时信息返馈
    JokerGameMediator.GAME_FA_PAI = "gameFaPai"; //发牌
    JokerGameMediator.GAME_STAET = "gameStart"; //游戏开初始化
    JokerGameMediator.GAME_CONT_CHANGE = "gameCountChange"; //改变门数
    JokerGameMediator.GAME_RATIO_CHANGE = "gameRatioChange"; //游戏倍率发生了改变
    JokerGameMediator.GAME_AWARD = "gameAward";
    JokerGameMediator.GAME_RE_STAET = "gameRestart"; //
    joker.JokerGameMediator = JokerGameMediator;
    __reflect(JokerGameMediator.prototype, "joker.JokerGameMediator");
})(joker || (joker = {}));
//# sourceMappingURL=JokerGameMediator.js.map