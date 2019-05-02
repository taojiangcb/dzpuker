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
    function getProxy() {
        return __GET_PROXY(GuiChuModuleProxy);
    }
    guichu.getProxy = getProxy;
    /**
     * 服务器发送的几个游戏状态常量
     */
    var GAME_STATE;
    (function (GAME_STATE) {
        GAME_STATE[GAME_STATE["GAME_INIT"] = 1] = "GAME_INIT";
        GAME_STATE[GAME_STATE["GAME_BET"] = 2] = "GAME_BET";
        GAME_STATE[GAME_STATE["GAME_ROLL"] = 3] = "GAME_ROLL";
    })(GAME_STATE = guichu.GAME_STATE || (guichu.GAME_STATE = {}));
    var GuiChuModuleProxy = (function (_super) {
        __extends(GuiChuModuleProxy, _super);
        function GuiChuModuleProxy(name, data) {
            var _this = _super.call(this, GuiChuModuleProxy.NAME, data) || this;
            _this.winType = 3;
            _this.BET_COUNT = 5;
            _this.CHOUMA_LEVEL = [100000, 1000000, 5000000];
            _this.CHOUMA_VALUES = [[10, 100, 500, 1000, 10000],
                [10, 1000, 5000, 10000, 100000],
                [10, 5000, 10000, 50000, 500000],
                [10, 10000, 50000, 100000, 1000000]];
            _this.choumaDef = 0;
            _this.choumaValues = [];
            _this.TABLE_ITEMS = [
                { id: 0, value: 1 },
                { id: 1, value: 3 },
                { id: 2, value: 6 },
                { id: 3, value: 12 },
                { id: 4, value: 25 },
                { id: 5, value: 50 },
                { id: 6, value: 50 } //黑Jacker50
            ];
            _this.WHEEL_ITEMS = [
                6, 0, 1, 3, 2, 0, 4, 0, 2, 1, 2, 0, 5, 0, 3, 1, 2, 1, 4, 0, 1, 0, 1, 0
            ];
            _this.itemPosition = [];
            _this.isAutoBet = false;
            _this.winChoumaPoint = [205, 230];
            _this.localBetCountFinish = false;
            _this.serverBetFinish = false;
            _this.winHistory = [];
            _this.winProfit = 0;
            _this.initItemPosition();
            return _this;
        }
        GuiChuModuleProxy.prototype.initItemPosition = function () {
            for (var i = 0; i < this.TABLE_ITEMS.length; i++) {
                this.itemPosition.push([]);
            }
            for (var i = 0; i < this.WHEEL_ITEMS.length; i++) {
                var j = this.WHEEL_ITEMS[i];
                if (this.itemPosition[j] == null)
                    this.itemPosition[j] = [];
                this.itemPosition[j].push(i);
            }
        };
        GuiChuModuleProxy.prototype.getItemPosition = function (card, showrand) {
            // console.log("client: card = " + card + " showrand = " + showrand);
            var len = this.itemPosition[card - 1].length;
            var rand = showrand % len;
            var rv = this.itemPosition[card - 1][rand];
            // console.log(rv);
            // console.log(this.WHEEL_ITEMS[rv]);
            return rv;
        };
        GuiChuModuleProxy.prototype.updateTableInfo = function (info) {
            if (this.zpTable == null && info != null) {
                this.zpTable = info;
                this.sendNotification(guichu.GuiChuModuleMediator.TABLE_INIT, info);
            }
            else if (info != this.zpTable) {
                this.zpTable = info;
                this.sendNotification(guichu.GuiChuModuleMediator.TABLE_UPDATE, info);
            }
        };
        /**
         * 更新其它玩家下注时的池子包括了自己
         */
        GuiChuModuleProxy.prototype.updatePlayInfo = function (roleId, betIndex, betValue, betRemain, freeIndex, betTimes) {
            if (this.zpTable) {
                var exist = false;
                this.zpTable.PlayerVO.forEach(function (element) {
                    if (roleId == element.roleId) {
                        element["posBet" + betIndex.toString()] += betValue;
                        exist = true;
                    }
                });
                if (!exist) {
                    var playInfo = new appvos.ZPPlayerVO();
                    playInfo.roleId = roleId;
                    playInfo.name = "";
                    playInfo.posBet1 = 0;
                    playInfo.posBet2 = 0;
                    playInfo.posBet3 = 0;
                    playInfo.posBet4 = 0;
                    playInfo.posBet5 = 0;
                    playInfo.posBet6 = 0;
                    playInfo.posBet7 = 0;
                    playInfo["posBet" + betIndex.toString()] += betValue;
                    this.zpTable.PlayerVO.push(playInfo);
                }
                //发送某个下注池的信息变更了。
                this.sendNotification(guichu.GuiChuModuleMediator.UPDATE_BET_POT_SIZE, betIndex);
                if (roleId == getProxy().zpTable.seatID) {
                    var betSingleValue = betValue / betTimes;
                    for (var i = 0; i < betTimes; i++) {
                        guichu.getProxy().playChoumaAni(betIndex - 1, betSingleValue);
                    }
                    if (freeIndex == 1) {
                        getProxy().freeNum--;
                        __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_FREE_END);
                    }
                    __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.UPDATE_BET_MONEY, betRemain);
                }
            }
        };
        GuiChuModuleProxy.prototype.playChoumaAni = function (betIndex, betValue) {
            guichu.GuiChuTableItemComp.instance[betIndex].betAction(getProxy().choumaValues.indexOf(betValue));
            utils.SoundUtils.playEffectSound(utils.SoundUtils.chipSkake);
        };
        /**
         * 根据某个池子获取其它下注的所有筹码和人数
         */
        GuiChuModuleProxy.prototype.statisticsBetPot = function (betIndex) {
            var bet = 0; //总下注池
            var nop = 0; //总人数
            this.zpTable.PlayerVO.forEach(function (element) {
                var betValue = element["posBet" + betIndex.toString()];
                if (betValue > 0) {
                    bet += betValue;
                    nop += 1;
                }
            });
            return { totaleBet: bet, NOP: nop };
        };
        /**
         * 游戏状态变更
         * 抛出状态变更消息 GuiChuModuleMediator.CHANGE_STATE ，[0]变更前的状态,[1]变更之后的状态
         * true 变更成功 false 没有发生变更
         * 每一局下始下注的时候都要手动清理 tableVO.play里的数据
         */
        GuiChuModuleProxy.prototype.changeStage = function (state, downTime) {
            var oldState = this.zpTable ? this.zpTable.gameStatus : 0;
            if (this.zpTable && state != oldState) {
                this.zpTable.timeLast = Math.max(0, downTime);
                this.zpTable.gameStatus = state;
                this.sendNotification(guichu.GuiChuModuleMediator.CHANGE_STATE, [oldState, state]);
                return true;
            }
            return false;
        };
        GuiChuModuleProxy.prototype.changeStatus = function (status) {
            this.status = status;
        };
        GuiChuModuleProxy.prototype.getDateString = function () {
            var date = new Date();
            return date.getFullYear() + date.getMonth() + date.getDate() + "";
        };
        GuiChuModuleProxy.prototype.betStatus = function () {
        };
        GuiChuModuleProxy.prototype.setChoumaValue = function () {
            if (this.zpTable.totalMoney < this.CHOUMA_LEVEL[0]) {
                this.choumaValues = this.CHOUMA_VALUES[0];
                this.choumaDef = 1;
            }
            else if (this.zpTable.totalMoney < this.CHOUMA_LEVEL[1]) {
                this.choumaValues = this.CHOUMA_VALUES[1];
                this.choumaDef = 2;
            }
            else if (this.zpTable.totalMoney < this.CHOUMA_LEVEL[2]) {
                this.choumaValues = this.CHOUMA_VALUES[2];
                this.choumaDef = 1;
            }
            else {
                this.choumaValues = this.CHOUMA_VALUES[3];
                this.choumaDef = 2;
            }
        };
        Object.defineProperty(GuiChuModuleProxy.prototype, "canBet", {
            get: function () {
                return this.status == GuiChuModuleProxy.STATUS_BET;
            },
            enumerable: true,
            configurable: true
        });
        GuiChuModuleProxy.prototype.playWinChoumaAni = function () {
            var index = this.zpGamEndVO ? this.zpGamEndVO.card - 1 : -1;
            if (index > -1) {
                guichu.GuiChuTableItemComp.instance[index].winChoumaAni();
            }
        };
        /**
         * 清理所有的数据对象
         */
        GuiChuModuleProxy.prototype.dispose = function () {
            this.zpTable = null;
            this.myMoney = 0;
            this.zpGamEndVO = null;
            this.status = null;
            this.choumaDef = 0;
            this.choumaValues = [];
            this.selectChoumaIndex = null;
            this.isAutoBet = false;
            this.canAutoBet = false;
            this.localBetCountFinish = false;
            this.serverBetFinish = false;
            this.winHistory = [];
            this.rewardPool = 0;
            this.freeNum = 0;
            this.winProfit = 0;
            _super.prototype.dispose.call(this);
        };
        return GuiChuModuleProxy;
    }(app.mvc.AbsractProxy));
    GuiChuModuleProxy.showDailyAward = "showDailyAward";
    GuiChuModuleProxy.STATUS_NULL = "STATUS_NULL";
    GuiChuModuleProxy.STATUS_ENTER = "STATUS_ENTER";
    GuiChuModuleProxy.STATUS_BET = "STATUS_BET";
    GuiChuModuleProxy.STATUS_SPIN = "STATUS_SPIN";
    GuiChuModuleProxy.STATUS_END = "STATUS_END";
    GuiChuModuleProxy.STATUS_WAIT = "STATUS_WAIT";
    GuiChuModuleProxy.NAME = "GuiChuModuleProxy";
    // static RULE_1: string = "1、玩家开始在下注时间进行下注，放上合理的金额筹码。\n2、轮盘开始转动。当轮盘停止后，滚球就会落入1-24其中一个细沟，该细沟所显示的图形即为开出的图形。\n3、开出图形结果后，即可判断您的输赢结果。这个简单的游戏流程就完成了。"
    GuiChuModuleProxy.RULE_1 = "1. 图形下注：游戏中有方片、草花、红桃、黑桃、四张、红杰克、黑杰克7种图形，每种图形的倍率固定，一局可以对单个多个或者全部图形同时进行下注\n2. 下注阶段：游戏每局开始后进入下注阶段。此时即可下注图形。下注阶段有倒计时，请在倒计时归零之前完成下注\n3. 转盘阶段：下注倒计时归零后，游戏转盘开始转动并给出本局的开奖结果。\n4. 出奖说明：方片1倍、草花3倍、红桃6倍、黑桃12倍、四张25倍、红杰克50倍、黑杰克50倍。中奖后将获得下注彩豆*倍率的彩豆，并且返还在中奖图形下注的彩豆。\n5. 本活动不可直接充值，每日首次登陆可获得3枚面值10彩豆的新年币，当日有效。";
    GuiChuModuleProxy.RULE_2 = "1. 下注阶段，选取您的彩豆，在下注区放下合理的彩豆。\n2. 下注单个图形，即押注区每个您认为这把可能中奖的图形都可以押注。\n3. 多次押注，每个图形多次点击既可。";
    guichu.GuiChuModuleProxy = GuiChuModuleProxy;
    __reflect(GuiChuModuleProxy.prototype, "guichu.GuiChuModuleProxy");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuModuleProxy.js.map