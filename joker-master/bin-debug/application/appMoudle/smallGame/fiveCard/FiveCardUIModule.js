var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/7/1.
 */
var fiveCard;
(function (fiveCard) {
    var STATUS;
    (function (STATUS) {
        STATUS[STATUS["open"] = 0] = "open";
        STATUS[STATUS["run"] = 1] = "run";
        STATUS[STATUS["over"] = 2] = "over";
    })(STATUS = fiveCard.STATUS || (fiveCard.STATUS = {}));
    var FiveCardUIModule = (function (_super) {
        __extends(FiveCardUIModule, _super);
        function FiveCardUIModule() {
            var _this = _super.call(this) || this;
            /**
             * 当前随机的扑克
             */
            _this.pkCards = [];
            /**
             * 当前的牌型选择按钮
             */
            _this.chrooseBtns = [];
            /**
             * 当前游戏的状态
             */
            _this.status = fiveCard.STATUS.open;
            /**
             * 游戏时间
             */
            _this.GAME_TIME = 60;
            _this.TIME = 0;
            //计时器
            _this.intervalId = 0;
            //正确的次数
            _this.RIGHT_COUNT = 0;
            /**
             * 消耗
             */
            _this.CONSUME = 1000;
            _this.skinName = "resource/app_skin/fiveCard/FiveCardUIModuleSkin.exml";
            __REGISTER_PROXY(fiveCard.FiveCardProxy);
            return _this;
        }
        FiveCardUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnStart);
            this.bindButton(this.btnAgin);
            this.bindButton(this.btnClose0);
            this.chrooseBtns = [
                this.chrooseBtn1, this.chrooseBtn2, this.chrooseBtn3
            ];
            this.chrooseBar.addChild(this.chrooseBtn1);
            this.chrooseBar.addChild(this.chrooseBtn2);
            this.chrooseBar.addChild(this.chrooseBtn3);
            this.bindButton(this.chrooseBtn1);
            this.bindButton(this.chrooseBtn2);
            this.bindButton(this.chrooseBtn3);
            for (var i = 0; i != fiveCard.getProxy().COUNT; i++) {
                var cardItem = new playcards.CardItem();
                this.pkCards.push(cardItem);
                this.cardBox.addChild(cardItem);
            }
            var silverCount = smallGame.getCoin();
            this.numTxt0.text = silverCount.toString();
        };
        FiveCardUIModule.prototype.opening = function () {
            this.changeState();
        };
        FiveCardUIModule.prototype.timeBegin = function () {
            var _this = this;
            this.txtDonwTime.text = Math.max(0, this.GAME_TIME).toString();
            if (this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
                this.intervalId = 0;
            }
            this.intervalId = egret.setInterval(function () {
                _this.TIME++;
                _this.txtDonwTime.text = Math.max(_this.GAME_TIME - _this.TIME, 0).toString();
                if (_this.GAME_TIME - _this.TIME <= 0) {
                    _this.gameOver();
                }
            }, this, 1000);
        };
        //游戏结速
        FiveCardUIModule.prototype.gameOver = function () {
            egret.clearInterval(this.intervalId);
            this.intervalId = 0;
            this.setStatus(STATUS.over);
            this.txtRightCount.text = this.RIGHT_COUNT.toString() + "次";
            this.txtReward.text = String(this.RIGHT_COUNT * 50);
            var silverCount = smallGame.getCoin(this.RIGHT_COUNT * 50);
            this.numTxt0.text = silverCount.toString();
        };
        FiveCardUIModule.prototype.startGame = function () {
            this.RIGHT_COUNT = 0;
            this.TIME = 0;
            this.next();
            this.timeBegin();
            var silverCount = smallGame.getCoin();
            this.numTxt0.text = silverCount.toString();
        };
        FiveCardUIModule.prototype.next = function () {
            var cardNums = fiveCard.getProxy().randomCard();
            for (var i = 0; i != fiveCard.getProxy().COUNT; i++) {
                this.pkCards[i].setCardId(cardNums[i]);
            }
            this.pkResult = playcards.getProxy().getCardResult(cardNums);
            var rt = this.pkResult.type;
            var otTypes = [];
            while (true) {
                var rdt = Math.round(Math.random() * 9);
                if (otTypes.indexOf(rdt) == -1 && rdt != rt) {
                    otTypes.push(rdt);
                    if (otTypes.length == 2) {
                        break;
                    }
                }
            }
            var rs = [];
            var pos = Math.round(Math.random() * 2);
            if (pos == 0) {
                rs[0] = rt;
                rs[1] = otTypes[0];
                rs[2] = otTypes[1];
            }
            else if (pos == 1) {
                rs[0] = otTypes[0];
                rs[1] = rt;
                rs[2] = otTypes[1];
            }
            else {
                rs[0] = otTypes[0];
                rs[1] = otTypes[1];
                rs[2] = rt;
            }
            this.chrooseBtns[0].setTypeData(rs[0]);
            this.chrooseBtns[1].setTypeData(rs[1]);
            this.chrooseBtns[2].setTypeData(rs[2]);
        };
        FiveCardUIModule.prototype.changeState = function () {
            if (this.status == STATUS.open) {
                this.descGroup.visible = true;
                this.btnBars.visible = true;
                this.consumeBar.visible = true;
                this.btnStart.visible = true;
                this.btnStart.includeInLayout = true;
                this.btnAgin.includeInLayout = false;
                this.btnAgin.visible = false;
                this.reportGroup.visible = false;
                this.chrooseBar.visible = false;
                this.cardBox.visible = false;
            }
            else if (this.status == STATUS.run) {
                this.reportGroup.visible = false;
                this.descGroup.visible = false;
                this.btnBars.visible = false;
                this.consumeBar.visible = false;
                this.chrooseBar.visible = true;
                this.cardBox.visible = true;
            }
            else {
                this.reportGroup.visible = true;
                this.chrooseBar.visible = false;
                this.cardBox.visible = false;
                this.descGroup.visible = false;
                this.btnBars.visible = true;
                this.btnStart.visible = false;
                this.btnStart.includeInLayout = false;
                this.btnAgin.includeInLayout = true;
                this.btnAgin.visible = true;
                this.consumeBar.visible = true;
            }
        };
        FiveCardUIModule.prototype.setStatus = function (val) {
            this.status = val;
            this.changeState();
        };
        FiveCardUIModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this.btnStart) {
                this.runGame();
            }
            else if (tag == this.btnAgin) {
                this.runGame();
            }
            else if (tag == this.btnClose0) {
                this.close();
            }
            else if (tag == this.chrooseBtns[0] || tag == this.chrooseBtns[1] || tag == this.chrooseBtns[2]) {
                var type = tag.typeData;
                var chroose_result = type == this.pkResult.type;
                /**选择错误倒计时-3秒 */
                if (!chroose_result) {
                    this.TIME += 3;
                }
                this.rightOrError(chroose_result);
                this.next();
            }
        };
        FiveCardUIModule.prototype.runGame = function () {
            var silver = smallGame.getCoin();
            if (silver > this.CONSUME) {
                this.setStatus(STATUS.run);
                smallGame.getCoin(-this.CONSUME);
                this.startGame();
            }
            else {
                tip.popSysTopTip("您的银子不足不能进行游戏，请去其它游戏赚点再来玩吧！");
            }
        };
        FiveCardUIModule.prototype.dispose = function () {
            __REMOVE_PROXY(fiveCard.FiveCardProxy);
            while (this.pkCards.length > 0) {
                this.pkCards.shift().removeFromParent(true);
            }
            if (this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
                this.intervalId = 0;
            }
            egret.Tween.removeTweens(this.yesOrNo);
            _super.prototype.dispose.call(this);
        };
        FiveCardUIModule.prototype.rightOrError = function (val) {
            if (val)
                this.RIGHT_COUNT++;
            if (val)
                this.yesOrNo.source = "img_word_gameUI_playxzzq_png";
            else
                this.yesOrNo.source = "img_word_gameUI_playxzcw_png";
            egret.Tween.removeTweens(this.yesOrNo);
            egret.Tween.get(this.yesOrNo)
                .set({ alpha: 1 })
                .wait(500)
                .to({ alpha: 0 }, 300, egret.Ease.sineOut);
        };
        return FiveCardUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    fiveCard.FiveCardUIModule = FiveCardUIModule;
    __reflect(FiveCardUIModule.prototype, "fiveCard.FiveCardUIModule");
})(fiveCard || (fiveCard = {}));
//# sourceMappingURL=FiveCardUIModule.js.map