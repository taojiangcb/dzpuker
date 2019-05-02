var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cardMemory;
(function (cardMemory) {
    var GAME_SCENE;
    (function (GAME_SCENE) {
        GAME_SCENE[GAME_SCENE["RULE"] = 0] = "RULE";
        GAME_SCENE[GAME_SCENE["PLAY"] = 1] = "PLAY";
        GAME_SCENE[GAME_SCENE["RESULT"] = 2] = "RESULT";
    })(GAME_SCENE = cardMemory.GAME_SCENE || (cardMemory.GAME_SCENE = {}));
    var CardMemoryUIMoudle = (function (_super) {
        __extends(CardMemoryUIMoudle, _super);
        function CardMemoryUIMoudle() {
            var _this = _super.call(this) || this;
            _this.historyHighScoreName = "cardMemoryHistoryHighScore";
            _this.tableSize = [3, 6];
            _this.top = 0;
            _this.left = 0;
            _this.right = 0;
            _this.bottom = 0;
            _this.skinName = "resource/app_skin/cardMemory/CardMemoryUIMoudleSkin.exml";
            return _this;
        }
        CardMemoryUIMoudle.prototype.createComplete = function (event) {
            if (!smallGame.getCoin()) {
                smallGame.setCoin(0);
            }
            this.moneyLabel.text = smallGame.getCoin().toString();
            if (egret.localStorage.getItem(this.historyHighScoreName)) {
                this.historyHighScoreLabel.text = egret.localStorage.getItem(this.historyHighScoreName) + "分";
            }
            else {
                this.historyHighScoreLabel.text = "0分";
                egret.localStorage.setItem(this.historyHighScoreName, "0");
            }
            // this.applyBlur(this.bg);
            // this.applyBlur(this.rolebg);背景模糊化
            _super.prototype.createComplete.call(this, event);
            this.changeSence(GAME_SCENE.RULE);
            this.bindButton(this.gameButton);
            this.bindButton(this.closeButton);
            this.bindButton(this.retryButton);
        };
        CardMemoryUIMoudle.prototype.touchHandler = function (event) {
            var tag = event.currentTarget;
            this.touchBindButtonHandler(tag);
            switch (tag) {
                case this.backButton:
                    this.close();
                    break;
                case this.gameButton:
                    this.onClickGameButton();
                    break;
                case this.closeButton:
                    this.close();
                    break;
                case this.retryButton:
                    this.changeSence(GAME_SCENE.PLAY);
                    break;
                default:
                    break;
            }
        };
        CardMemoryUIMoudle.prototype.onClickGameButton = function () {
            if (this.curScene == GAME_SCENE.RULE) {
                this.changeSence(GAME_SCENE.PLAY);
            }
            else if (this.curScene == GAME_SCENE.PLAY) {
                if (this.gameChoosing)
                    return;
                this.startGameChoose();
            }
        };
        CardMemoryUIMoudle.prototype.changeSence = function (scene) {
            this.curScene = scene;
            this.ruleGroup.visible = false;
            this.playGroup.visible = false;
            this.resultGroup.visible = false;
            this.startTipGroup.visible = false;
            this.gameTipGroup.visible = false;
            switch (scene) {
                case GAME_SCENE.RULE:
                    this.ruleGroup.visible = true;
                    this.startTipGroup.visible = true;
                    break;
                case GAME_SCENE.PLAY:
                    this.cleanGameData();
                    this.startGameRemember();
                    this.playGroup.visible = true;
                    this.gameTipGroup.visible = true;
                    break;
                case GAME_SCENE.RESULT:
                    this.resultGroup.visible = true;
                    this.gameTipGroup.visible = true;
                    this.gameChoosing = false;
                    //                    this.winGroup.visible = true;
                    //                    this.loseGroup.visible = false;
                    break;
                default:
                    break;
            }
        };
        CardMemoryUIMoudle.prototype.cleanGameData = function () {
            this.tableCardArray = [];
            this.chooseCardArray = [];
            this.chooseCardNumber = 0;
            this.chooseFailNumber = 0;
            this.chooseSuccessNumber = 0;
            this.wrongCount = 0;
            this.leftChanceLabel.text = "9次";
            this.usedTime = 0;
            this.usedTimeLabel.text = "0秒";
            //获取本地最高分
        };
        CardMemoryUIMoudle.prototype.startGameRemember = function () {
            //开始游戏 扣除游戏币
            this.initDeck();
            this.topTipLabel.visible = false;
            this.countDownLabel.visible = true;
            this.countDownTitle.visible = true;
            this.countDown = 30;
            this.countDownLabel.text = this.countDown + "秒";
            this.countDownTimer = new egret.Timer(1000, this.countDown);
            this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.countDownFunc, this);
            this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.countDownComFunc, this);
            this.countDownTimer.start();
            this.gameButtonLabel.source = "img_word_gameUI_tqgp_png";
            this.gameButton.alpha = 1;
            //            this.gameButton.enabled = true;
            this.gameButton.touchEnabled = true;
        };
        CardMemoryUIMoudle.prototype.countDownFunc = function () {
            this.countDown--;
            this.countDownLabel.text = this.countDown + "秒";
        };
        CardMemoryUIMoudle.prototype.countDownComFunc = function () {
            this.startGameChoose();
        };
        CardMemoryUIMoudle.prototype.initDeck = function () {
            this.tabelDeck = [];
            for (var i = 0; i < 9;) {
                var random = Math.floor(Math.random() * 52 + 1);
                for (var j = 0; j < this.tabelDeck.length; j++) {
                    if (this.tabelDeck[j] == random)
                        break;
                }
                if (j == this.tabelDeck.length) {
                    this.tabelDeck.push(random);
                    i++;
                }
            }
            this.tabelDeck = this.tabelDeck.concat(this.tabelDeck);
            for (var i = 0; i < this.tabelDeck.length; i++) {
                var random = Math.floor(Math.random() * this.tabelDeck.length);
                var temp = this.tabelDeck[i];
                this.tabelDeck[i] = this.tabelDeck[random];
                this.tabelDeck[random] = temp;
            }
            this.initTabel();
        };
        CardMemoryUIMoudle.prototype.startGameChoose = function () {
            this.gameChoosing = true;
            this.gameButton.touchEnabled = false;
            this.gameButton.alpha = 0.4;
            this.countDownTimer.stop();
            this.countDownLabel.visible = false;
            this.countDownTitle.visible = false;
            this.gameCountTimer = new egret.Timer(1000, 0);
            this.gameCountTimer.addEventListener(egret.TimerEvent.TIMER, function () {
                this.usedTime++;
                this.usedTimeLabel.text = this.usedTime + "秒";
            }, this);
            this.gameCountTimer.start();
            for (var i = 0; i < this.tableCardArray.length; i++) {
                this.tableCardArray[i].turnBack();
            }
        };
        CardMemoryUIMoudle.prototype.initTabel = function () {
            this.tabelGroup.removeChildren();
            for (var i = 0; i < this.tableSize[0] * this.tableSize[1]; i++) {
                var card = new cardMemory.CardMemoryCardItem(this.tabelDeck[i], this);
                this.tableCardArray.push(card);
                this.tabelGroup.addChild(card);
            }
        };
        CardMemoryUIMoudle.prototype.chooseCard = function (card) {
            if (this.chooseCardArray.length >= 2)
                return;
            this.chooseCardArray.push(card);
            if (this.chooseCardArray.length == 2) {
                if (this.chooseCardArray[0] !== this.chooseCardArray[1]) {
                    if (this.chooseCardArray[0].index == this.chooseCardArray[1].index) {
                        this.chooseCardArray[0].visible = this.chooseCardArray[1].visible = false;
                        this.chooseSuccessNumber++;
                        this.showTipLabel(true);
                        if (this.chooseSuccessNumber == 9)
                            this.win();
                    }
                    else {
                        this.chooseCardArray[0].turnBack();
                        this.chooseCardArray[1].turnBack();
                        this.showTipLabel(false);
                        this.wrongCount++;
                        this.leftChanceLabel.text = (9 - this.wrongCount) + "次";
                        if (this.wrongCount >= 9) {
                            this.lose();
                        }
                    }
                }
                this.chooseCardArray = [];
                this.chooseCardNumber = 0;
            }
        };
        CardMemoryUIMoudle.prototype.win = function () {
            this.gameCountTimer.stop();
            this.getWinResult();
            this.loseGroup.visible = false;
            this.winGroup.visible = true;
            this.changeSence(GAME_SCENE.RESULT);
        };
        CardMemoryUIMoudle.prototype.getWinResult = function () {
            this.memoryTimeRSLabel.text = (30 - this.countDown).toString();
            this.gameTimeRSLabel.text = this.usedTime.toString();
            this.wrongTimeRSLabel.text = this.wrongCount.toString();
            var score = Math.floor((this.countDown / this.usedTime + (9 - this.wrongCount)) * 10);
            this.scoreGetRSLabel.text = score.toString();
            this.coinGetRSLabel.text = (score * 100).toString();
            if (score > parseInt(egret.localStorage.getItem(this.historyHighScoreName))) {
                egret.localStorage.setItem(this.historyHighScoreName, score.toString());
                this.historyHighScoreLabel.text = score.toString() + "分";
            }
            //增加本地货币
        };
        CardMemoryUIMoudle.prototype.lose = function () {
            this.gameCountTimer.stop();
            this.winGroup.visible = false;
            this.loseGroup.visible = true;
            this.changeSence(GAME_SCENE.RESULT);
        };
        CardMemoryUIMoudle.prototype.showTipLabel = function (success) {
            if (this.topTipLabel.visible)
                return;
            var text = success ? "配对成功，请再接再厉" : "匹配失败，扣除1次错误机会";
            this.topTipLabel.text = text;
            this.topTipLabel.visible = true;
            var timer = new egret.Timer(500, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                this.topTipLabel.visible = false;
            }, this);
            timer.start();
        };
        return CardMemoryUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    cardMemory.CardMemoryUIMoudle = CardMemoryUIMoudle;
    __reflect(CardMemoryUIMoudle.prototype, "cardMemory.CardMemoryUIMoudle");
})(cardMemory || (cardMemory = {}));
//# sourceMappingURL=CardMemoryUIMoudle.js.map