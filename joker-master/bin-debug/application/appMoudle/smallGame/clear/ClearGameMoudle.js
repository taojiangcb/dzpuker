var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var smallGame;
(function (smallGame) {
    var ClearGameMoudle = (function (_super) {
        __extends(ClearGameMoudle, _super);
        function ClearGameMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClearGameSkin";
            // ID与牌型的对应定义详见 playcards.getProxy().m_cbCardData;
            // 数字从小大到为2~A，同牌点从小到大为方块、梅花、红桃、黑桃
            _this.ruleIds = [];
            for (var i = 0; i < 13; ++i) {
                _this.ruleIds[i * 4 + 0] = i + 1;
                _this.ruleIds[i * 4 + 1] = i + 14;
                _this.ruleIds[i * 4 + 2] = i + 27;
                _this.ruleIds[i * 4 + 3] = i + 40;
            }
            _this.f1Ids = [];
            _this.f2Ids = [];
            _this.f3Ids = [];
            return _this;
        }
        ClearGameMoudle.prototype.createComplete = function () {
            _super.prototype.createComplete.call(this, null);
            this.cardsItems = [
                this.c00, this.c01, this.c02, this.c03, this.c04, this.c05,
                this.c10, this.c11, this.c12, this.c13, this.c14, this.c15,
                this.c20, this.c21, this.c22, this.c23, this.c24, this.c25,
                this.c30, this.c31, this.c32, this.c33, this.c34, this.c35
            ];
            for (var i = 0; i < 24; ++i) {
                this.f1Ids[i] = this.ruleIds[i];
                this.f2Ids[i] = this.ruleIds[i + 24];
                this.f3Ids[i] = i < 4 ? this.ruleIds[i + 48] : null;
                this.cardsItems[i].touchEnabled = true;
                this.cardsItems[i].setCardBack();
                this.bindButton(this.cardsItems[i]);
            }
            this.bindButton(this.shareButton);
            this.bindButton(this.resetButton);
            this.bindButton(this.startButton);
            this.resetUI();
            this.txtCou.text = String(smallGame.getCoin());
        };
        ClearGameMoudle.prototype.resetUI = function () {
            this.cardsArea.visible = true;
            this.resultArea.visible = false;
            this.ic.visible = this.cc.visible = false;
            this.startButton.visible = true;
            var bestTime = smallGame.getClearGameBestTime();
            this.bestLabel.text = bestTime == -1 ? "暂无" : (bestTime / 1000).toFixed(2);
            this.timeLabel.text = "0.00";
        };
        ClearGameMoudle.prototype.gameStart = function () {
            this.ic.visible = this.cc.visible = true;
            this.startButton.visible = false;
            this.startTime = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            this.randomArray(this.f1Ids);
            this.randomArray(this.f2Ids);
            this.randomArray(this.f3Ids);
            for (var i = 0; i < 24; ++i) {
                this.cardsItems[i].flip(this.f1Ids[i]);
            }
            this.postion = 0;
            this.cc.setCardId(this.ruleIds[this.postion]);
            this.hintCheckId = egret.setTimeout(this.hintCard, this, 2000);
            this.isPlaying = true;
        };
        ClearGameMoudle.prototype.gameOver = function () {
            this.isPlaying = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            var time = egret.getTimer() - this.startTime;
            var bestTime = smallGame.getClearGameBestTime();
            var reword = Math.floor((90000 - time) / 5); //以90秒为单位，少1秒奖200
            if (reword < 100)
                reword = 100; //保底100个金币
            var coin = smallGame.getCoin(reword);
            if (bestTime == -1 || time < bestTime) {
                smallGame.setClearGameBestTime(time);
                bestTime = time;
                //此处应该有特效，ALert太戳了~
                tip.Alert.show("恭喜你，破纪录啦~");
            }
            this.timeLabel.text = (time / 1000).toFixed(2);
            this.rusultTimeLabel.text = this.timeLabel.text + "秒";
            this.rusultBestLabel.text = (bestTime / 1000).toFixed(2) + "秒";
            this.rusultLevelLabel.text = "SSS";
            this.rusultCoinLabel.text = String(reword);
            var xOffset = this.rusultCoinLabel.text.length * 12;
            this.rusultCoinIcon.horizontalCenter = 255 - xOffset;
            this.txtCou.text = String(coin);
            this.cardsArea.visible = false;
            this.resultArea.visible = true;
        };
        ClearGameMoudle.prototype.reStart = function (tipId, p) {
            if (tipId == tip.YES)
                this.gameStart();
            else if (tipId == tip.NO)
                this.close();
        };
        ClearGameMoudle.prototype.onFrame = function (evt) {
            var time = egret.getTimer() - this.startTime;
            this.timeLabel.text = (time / 1000).toFixed(2);
        };
        ClearGameMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.startButton:
                    this.gameStart();
                    return;
                case this.resetButton:
                    this.resetUI();
                    return;
                case this.shareButton:
                    this.close();
                    return;
            }
            if (this.isPlaying && clickTarget instanceof playcards.CardItem) {
                var cardItem = clickTarget;
                var index = this.cardsItems.indexOf(cardItem);
                if (this.postion < 24) {
                    if (this.f1Ids[index] == this.ruleIds[this.postion]) {
                        this.resetHint();
                        if (this.f2Ids[index] != null) {
                            cardItem.tweenToCard(this.f2Ids[index]);
                        }
                        else {
                            cardItem.tweenToCard(-1);
                        }
                        this.cc.setCardId(this.ruleIds[++this.postion]);
                    }
                }
                else if (this.postion < 48) {
                    if (this.f2Ids[index] == this.ruleIds[this.postion]) {
                        this.resetHint();
                        if (this.f3Ids[index] != null) {
                            cardItem.tweenToCard(this.f3Ids[index]);
                        }
                        else {
                            cardItem.tweenToCard(-1);
                        }
                        this.cc.setCardId(this.ruleIds[++this.postion]);
                    }
                }
                else {
                    if (this.f3Ids[index] == this.ruleIds[this.postion]) {
                        cardItem.tweenToCard(-1);
                        if (this.postion == 51) {
                            this.gameOver();
                            if (this.hintCheckId != -1) {
                                egret.clearTimeout(this.hintCheckId);
                            }
                        }
                        else {
                            this.resetHint();
                            this.cc.setCardId(this.ruleIds[++this.postion]);
                        }
                    }
                }
            }
        };
        ClearGameMoudle.prototype.hintCard = function () {
            var cardId = this.ruleIds[this.postion]; //需要点击牌
            if (this.postion < 24) {
                var index = this.f1Ids.indexOf(cardId);
            }
            else if (this.postion < 48) {
                var index = this.f2Ids.indexOf(cardId);
            }
            else {
                var index = this.f3Ids.indexOf(cardId);
            }
            this.hc = this.cardsItems[index];
            this.hc.startHint();
            this.hintCheckId = -1;
        };
        ClearGameMoudle.prototype.resetHint = function () {
            if (this.hintCheckId != -1)
                egret.clearTimeout(this.hintCheckId);
            this.hintCheckId = egret.setTimeout(this.hintCard, this, 2000);
        };
        ClearGameMoudle.prototype.randomArray = function (arr) {
            var len = arr.length;
            for (var i = 0; i < len; ++i) {
                var tr = Math.floor(Math.random() * 24);
                var tn = arr[i];
                arr[i] = arr[tr];
                arr[tr] = tn;
            }
        };
        ClearGameMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.hintCheckId != -1) {
                egret.clearTimeout(this.hintCheckId);
            }
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        };
        return ClearGameMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    smallGame.ClearGameMoudle = ClearGameMoudle;
    __reflect(ClearGameMoudle.prototype, "smallGame.ClearGameMoudle");
})(smallGame || (smallGame = {}));
//# sourceMappingURL=ClearGameMoudle.js.map