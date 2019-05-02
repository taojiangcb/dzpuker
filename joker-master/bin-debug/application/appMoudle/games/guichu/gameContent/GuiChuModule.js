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
    var GuiChuModule = (function (_super) {
        __extends(GuiChuModule, _super);
        function GuiChuModule() {
            var _this = _super.call(this) || this;
            _this.enterCountInterval = -1;
            _this.ANIMATION_GROUP = "animationGroup";
            //上一次的奖池
            _this.prevPool = 0;
            _this.tv = 0;
            _this.skinName = "GuiChuModuleSkin";
            _this.left = _this.right = _this.top = _this.bottom = 0;
            return _this;
        }
        /**
         * 王老板的要求，要在Tweb下显示奖池
         */
        GuiChuModule.prototype.isTweb = function () {
            if (true)
                return true;
            /**
             * 测试地址要显示奖池
             */
            if (document) {
                var href = document.location.href;
                if (href.toLowerCase().indexOf("\/tweb\/") > -1) {
                    return true;
                }
            }
            return false;
        };
        GuiChuModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            utils.SoundUtils.loadSound();
            __REGISTER_MEDIATOR(guichu.GuiChuModuleMediator, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.stateLabelGroup.visible = false;
            if (guichu.getProxy().zpTable != null) {
                this.initTableInfo(guichu.getProxy().zpTable);
            }
            if (this.isTweb()) {
                this.poolBar.visible = true;
            }
            if ($GAME_ID$ == GAME_IDS.BF_GUICHU_WHEEL) {
                this.noticePlate.selectedIndex = 0;
            }
            else {
                this.noticePlate.selectedIndex = 1;
            }
            this.userName.text = user.getProxy().loginName;
            this.testComp.visible = false;
            this.bindButton(this.back);
            this.bindButton(this.ruleBtn);
            this.bindButton(this.bankBtn);
            this.bindButton(this.setBtn, false);
            // this.bindButton(this.testZhuanpan, false);
            this.bindButton(this.testStart, false);
            this.bindButton(this.testBetGroup, false);
            this.bindButton(this.testBtn, false);
            this.preCreateInstance();
            // utils.SoundUtils.playBgSound(utils.SoundUtils.guichubg);
            gameabc.addMovieGroup("award_light_ske_dbmv", "award_light_tex_png", AppReg.GUICHU);
            this.award_light_mc = gameabc.buildMovie("奖池", AppReg.GUICHU);
            this.award_light_mc.x = 157;
            this.award_light_mc.y = 130;
            this.award_light_mc.blendMode = egret.BlendMode.ADD;
            this.award_light_mc.play("newAnimation");
            this.award_light_mc.visible = false;
            // this.award_light_mc.play();
            this.addChild(this.award_light_mc);
        };
        GuiChuModule.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.back:
                    __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN);
                    break;
                // case this.testZhuanpan:
                //     this.spin();
                //     break;
                case this.testBetGroup:
                    break;
                // case this.testStart:
                //     this.betStatus();
                //     break;
                case this.ruleBtn:
                    __OPEN_MOUDLE(AppReg.GUICHU_RULE);
                    // __OPEN_MOUDLE(AppReg.GUICHU_DAILY);
                    break;
                case this.bankBtn:
                    //guichu.gameLogic().openBankRemaining();
                    var imgFile = "award_1" + "_png";
                    guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.NORMAL_AWARD, 5000);
                    break;
                case this.setBtn:
                    this.showSetGroup();
                    break;
                case this.testBtn:
                    // showNotice(0);
                    var imgFile = "award_1" + "_png";
                    guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.BIG_AWARD, 5000);
                    break;
            }
        };
        GuiChuModule.prototype.showSetGroup = function () {
            this.setComp = new guichu.GuiChuSetComp();
            this.addChild(this.setComp);
        };
        GuiChuModule.prototype.preSpin = function () {
            guichu.showNotice(guichu.NOTICE_TYPE.WHEEL, this.spin, this);
        };
        GuiChuModule.prototype.spin = function () {
            this.wheelComp.rotate();
        };
        GuiChuModule.prototype.preCreateInstance = function () {
            var choumaKind = 5;
            var choumaArray = [];
            var chouma;
            var j = 0;
            var preNumber = 10;
            for (var i = 0; i < choumaKind; i++) {
                for (j = 0; j < preNumber; j++) {
                    chouma = guichu.GuiChuChoumaComp.produce(i);
                    choumaArray.push(chouma);
                }
                for (j = 0; j < preNumber; j++) {
                    chouma = choumaArray.pop();
                    guichu.GuiChuChoumaComp.reclaim(chouma);
                }
            }
        };
        GuiChuModule.prototype.betAnimate = function (data) {
            this.tableComp.betAnimate(data);
        };
        GuiChuModule.prototype.waitStatus = function (time) {
            this.waitRect.visible = true;
            this.tableComp.waitStatus();
            this.wheelComp.hideDB();
            utils.SoundUtils.playEffectSound(utils.SoundUtils.count_down);
            // this.hideStateLabel();
            this.showStateLabel(guichu.GuiChuModuleProxy.STATUS_WAIT);
            guichu.showCountdown(time, this.betPreStatus, this);
            guichu.getProxy().zpTable.timeLast = Math.max(0, guichu.getProxy().zpTable.timeLast - time);
        };
        GuiChuModule.prototype.betPreStatus = function () {
            utils.SoundUtils.minBgSound(1000);
            this.waitRect.visible = false;
            guichu.clearCountdown();
            this.hideStateLabel();
            guichu.showNotice(guichu.NOTICE_TYPE.BET, this.betStatus, this);
            guichu.getProxy().zpTable.timeLast = Math.max(guichu.getProxy().zpTable.timeLast - 2000, 0);
        };
        GuiChuModule.prototype.betStatus = function () {
            guichu.getProxy().canAutoBet = true;
            this.betRect.visible = true;
            egret.Tween.removeTweens(utils.SoundUtils);
            utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            this.showStateLabel(guichu.GuiChuModuleProxy.STATUS_BET);
            this.tableComp.betStatus();
        };
        GuiChuModule.prototype.betFinish = function () {
            this.betRect.visible = false;
            utils.SoundUtils.minBgSound(1000);
            guichu.clearCountdown();
            this.hideStateLabel();
            this.tableComp.stopBet();
        };
        GuiChuModule.prototype.endStatus = function () {
            this.updateEndInfo();
            // this.showStateLabel(GuiChuModuleProxy.STATUS_END);
            // this.tableComp.endStatus();
            guichu.getProxy().zpTable.PlayerVO = [];
            if (guichu.getProxy().winHistory == null)
                guichu.getProxy().winHistory = [];
            guichu.getProxy().winHistory.push(guichu.getProxy().zpGamEndVO.card);
            this.updateRecord();
            if (this.isTweb()) {
                this.updateRewardPool();
            }
        };
        GuiChuModule.prototype.tableEndStatus = function () {
            this.tableComp.endStatus();
        };
        GuiChuModule.prototype.initTableInfo = function (data) {
            var tableInfo = data;
            if (guichu.getProxy().zpTable == null)
                guichu.getProxy().zpTable = tableInfo;
            // getProxy().zpTable.timeLast = Math.max(0,tableInfo.nowTimeLast - app.SystemTimer.getServerTime() / 1000);
            if (guichu.getProxy().timeGet) {
                var delayTime = egret.getTimer() - guichu.getProxy().timeGet;
                guichu.getProxy().zpTable.timeLast -= delayTime;
            }
            this.tableComp.updateMoney(tableInfo.totalMoney);
            this.tableComp.updatePro();
            this.rewardPool.text = FormatUtils.k(tableInfo.stockNum);
            this.showDailyAward(tableInfo.FreeNum);
            this.setChoumaValue();
            var choumaIndex = tableInfo.totalMoney > guichu.getProxy().choumaValues[guichu.getProxy().choumaDef] ? guichu.getProxy().choumaDef : 0;
            this.tableComp.setChouma(choumaIndex);
            this.initRecord(tableInfo.winHistory);
            this.enterCountTime = tableInfo.nowTimeLast - tableInfo.nowTime;
            if (tableInfo.gameStatus == guichu.GAME_STATE.GAME_BET) {
                // getProxy().zpTable.timeLast *= 1000;
                // var delayTime = egret.getTimer() - getProxy().timeGet;
                // getProxy().zpTable.timeLast -= delayTime;
                var timeLast = Math.max(0, guichu.getProxy().zpTable.timeLast);
                this.initBetHandle(timeLast);
            }
            else {
                this.tableComp.enterCount(guichu.getProxy().zpTable.timeLast);
                this.showStateLabel(guichu.GuiChuModuleProxy.STATUS_ENTER);
            }
        };
        GuiChuModule.prototype.initBetHandle = function (timeLast) {
            if (timeLast > 15000) {
                this.waitStatus(5000); //timeLast - 15000);
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
            }
            else if (timeLast > 12000) {
                this.betPreStatus();
            }
            else {
                this.betStatus();
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            }
        };
        GuiChuModule.prototype.showDailyAward = function (n) {
            if (n == 3 && egret.localStorage.getItem(guichu.GuiChuModuleProxy.showDailyAward) != user.getProxy().loginName + guichu.getProxy().getDateString()) {
                __OPEN_MOUDLE(AppReg.GUICHU_DAILY);
                guichu.getProxy().freeNum = 0;
            }
            else {
                guichu.getProxy().freeNum = n;
            }
        };
        GuiChuModule.prototype.updateTableItemInfo = function () {
            for (var i = 0; i < 7; i++) {
                this.sendNotification(guichu.GuiChuModuleMediator.UPDATE_BET_POT_SIZE, i + 1);
            }
        };
        GuiChuModule.prototype.updateTableInfo = function (data) {
        };
        GuiChuModule.prototype.setChoumaValue = function () {
            guichu.getProxy().setChoumaValue();
            this.tableComp.setChoumaValue();
        };
        GuiChuModule.prototype.initRecord = function (data) {
            var winHistory = data;
            guichu.getProxy().winHistory = winHistory;
            this.updateRecord();
        };
        GuiChuModule.prototype.updateRecord = function () {
            var winHistory = guichu.getProxy().winHistory;
            if (winHistory.length > 100) {
                winHistory = winHistory.slice(-100);
            }
            var hRecord = [];
            for (var i = 0; i < guichu.getProxy().TABLE_ITEMS.length; i++) {
                hRecord.push(0);
            }
            for (var i = 0; i < winHistory.length; i++) {
                hRecord[winHistory[i] - 1]++;
            }
            var tRecord = [];
            tRecord = winHistory.slice(-10);
            if (this.recordComp) {
                this.recordComp.initTRecord(tRecord);
                this.recordComp.updateHRecord(hRecord);
            }
        };
        GuiChuModule.prototype.clickAutoBet = function () {
            this.tableComp.autoBet();
        };
        GuiChuModule.prototype.updateEndInfo = function () {
            var zpGamEndVO = guichu.getProxy().zpGamEndVO;
            var myInfoVO;
            for (var i = 0; i < zpGamEndVO.infoVO.length; i++) {
                if (zpGamEndVO.infoVO[i].seatId == guichu.getProxy().zpTable.seatID) {
                    myInfoVO = zpGamEndVO.infoVO[i];
                    break;
                }
            }
            if (myInfoVO != null) {
                // this.tableComp.updateMoney(myInfoVO.betNum);
                var profit = 0;
                var index = 1;
                var hasWin = false;
                guichu.getProxy().winProfit += myInfoVO.realWin;
                for (var i = 1; i <= 7; i++) {
                    // profit += myInfoVO.realWin;//myInfoVO["posWin" + i];
                    if (myInfoVO["posWin" + i] > 0) {
                        hasWin = true;
                        profit += myInfoVO["posWin" + i];
                        index = i > index ? i : index;
                    }
                }
                var imgFile = "award_" + index + "_png";
                if (hasWin) {
                    if (index >= 1 && index <= 3) {
                        //guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.NORMAL_AWARD,0);
                        //popAward(imgFile);
                        guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.SMALL_AWARD, profit);
                    }
                    else if (index == 4 || index == 5) {
                        guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.SMALL_AWARD, profit);
                    }
                    else if (index == 6 || index == 7) {
                        guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.BIG_AWARD, profit);
                    }
                }
                else {
                    var imgFile = "award_" + guichu.getProxy().zpGamEndVO.card + "_png";
                    guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.NORMAL_AWARD, 0);
                }
            }
            else {
                // this.showStateLabel(GuiChuModuleProxy.STATUS_END);
                var imgFile = "award_" + guichu.getProxy().zpGamEndVO.card + "_png";
                guichu.playAwardAnimation(imgFile, guichu.AWARD_TYPE.NORMAL_AWARD, 0);
            }
        };
        GuiChuModule.prototype.updateBetMoney = function (data) {
            this.tableComp.updateBetMoney(data);
        };
        GuiChuModule.prototype.updateRewardPool = function () {
            var _this = this;
            if (guichu.getProxy().rewardPool >= 0) {
                var s = this.rewardPool.text;
                this.prevPool = Number(s.replace(new RegExp("\,", "g"), ""));
                var oldPool = this.prevPool;
                var newPool = guichu.getProxy().rewardPool;
                var distance = Math.abs(oldPool - newPool);
                var changeTime = distance / 10;
                var waitTime = 0;
                this.tv = this.prevPool;
                this.prevPool = newPool;
                var MIN_TIME = 4000;
                if (changeTime > MIN_TIME) {
                    waitTime = 0;
                    changeTime = MIN_TIME;
                }
                else {
                    waitTime = MIN_TIME - changeTime;
                }
                egret.Tween.get(this)
                    .call(function () {
                    _this.award_light_mc.visible = true;
                    _this.award_light_mc.play("newAnimation", 16);
                }, this)
                    .to({ changePool: newPool }, changeTime, egret.Ease.sineOut)
                    .wait(waitTime)
                    .call(function () {
                    _this.award_light_mc.visible = false;
                    _this.award_light_mc.stop();
                    _this.rewardPool.text = FormatUtils.k(guichu.getProxy().rewardPool);
                }, this);
            }
        };
        Object.defineProperty(GuiChuModule.prototype, "changePool", {
            get: function () {
                return this.tv;
            },
            set: function (val) {
                this.tv = Math.floor(val);
                this.rewardPool.text = FormatUtils.k(this.tv);
            },
            enumerable: true,
            configurable: true
        });
        GuiChuModule.prototype.freeEnd = function () {
            this.tableComp.freeEnd();
        };
        GuiChuModule.prototype.showStateLabel = function (state, time) {
            var _this = this;
            if (time === void 0) { time = 0; }
            var source = "";
            if (state == guichu.GuiChuModuleProxy.STATUS_BET) {
                source = "guichu_word_zzxz_png";
            }
            else if (state == guichu.GuiChuModuleProxy.STATUS_END) {
                source = "guichu_word_zzpj_png";
            }
            else if (state == guichu.GuiChuModuleProxy.STATUS_ENTER) {
                source = "guichu_word_zzkj_png";
            }
            else if (state == guichu.GuiChuModuleProxy.STATUS_WAIT) {
                source = "guichu_word_ddxjks_png";
            }
            this.stateLabel.source = source;
            this.stateLabel.visible = false;
            this.stateLabelBg.height = 0;
            this.stateLabelGroup.visible = true;
            egret.Tween.get(this.stateLabelBg).to({ height: 56 }, 200).call(function () {
                _this.stateLabel.visible = true;
            }, this);
            // if (time > 0) {
            //     this.enterCountLabel.visible = true;
            //     this.enterCountLabel.text = time.toString();
            //     this.enterCountInterval = egret.setInterval(this.enterCount, this, 1000);
            // } else {
            //     this.enterCountLabel.visible = false;
            //     if (this.enterCountInterval != -1) {
            //         egret.clearInterval(this.enterCountInterval);
            //         this.enterCountInterval = -1;
            //     }
            // }
        };
        GuiChuModule.prototype.enterCount = function () {
            this.enterCountTime--;
            if (this.enterCountTime < 0)
                this.enterCountTime = 0;
            this.enterCountLabel.text = this.enterCountTime.toString();
        };
        GuiChuModule.prototype.hideStateLabel = function () {
            this.stateLabelGroup.visible = false;
        };
        GuiChuModule.prototype.updateTest = function (data) {
            this.testComp.result(data);
        };
        GuiChuModule.prototype.updatePro = function () {
            var zpGamEndVO = guichu.getProxy().zpGamEndVO;
            var myInfoVO;
            for (var i = 0; i < zpGamEndVO.infoVO.length; i++) {
                if (zpGamEndVO.infoVO[i].seatId == guichu.getProxy().zpTable.seatID) {
                    myInfoVO = zpGamEndVO.infoVO[i];
                    this.tableComp.updateMoney(myInfoVO.betNum);
                    break;
                }
            }
            this.tableComp.updatePro();
        };
        GuiChuModule.prototype.enterFrame = function () {
            // var nowTime: number = egret.getTimer();
            // var frameTime: number;
            // if (this.lastTime == null) this.lastTime = nowTime;
            // frameTime = nowTime - this.lastTime;
            // this.lastTime = nowTime;
            // if (frameTime >= 7000) {
            //     __CLOSE_MOUDLE(AppReg.GUICHU);
            //     tip.Alert.show("您已离线，请重新登录。", null, tip.ALERT, (type:number)=>{
            //         if (type == tip.YES) {
            //             guichu.gameLogic().gameStart();
            //         }
            //     }, null, this);
            // }
        };
        GuiChuModule.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            if (this.wheelComp) {
                this.wheelComp.removeFromParent(true);
            }
            if (this.tableComp) {
                this.tableComp.removeFromParent(true);
            }
            if (this.recordComp) {
                this.recordComp.removeFromParent(true);
            }
            egret.Tween.removeAllTweens();
            //guichu.clearAwardAnimation();
            if (this.award_light_mc) {
                this.award_light_mc.stop();
                this.award_light_mc.removeFromParent(true);
            }
            guichu.closeBigAward();
            guichu.closeAward();
            guichu.closeSmallAward();
            __REMOVE_MEDIATOR(guichu.GuiChuModuleMediator);
            guichu.getProxy().dispose();
            guichu.clearAwardAnimation();
            utils.SoundUtils.clearAllSound();
            _super.prototype.dispose.call(this);
        };
        return GuiChuModule;
    }(app.base.BaseSceneUIMoudleComponent));
    guichu.GuiChuModule = GuiChuModule;
    __reflect(GuiChuModule.prototype, "guichu.GuiChuModule");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuModule.js.map