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
    /***
* @author
*
*/
    var GameTurnUIMoudle = (function (_super) {
        __extends(GameTurnUIMoudle, _super);
        function GameTurnUIMoudle() {
            var _this = _super.call(this) || this;
            _this.cardArr = [];
            _this.ovenArr = [];
            _this.consume = 100;
            _this.clickNum = 0;
            _this.firstData = [];
            _this.clikcBool = true;
            _this.plArr = [0, 2, 3, 4, 5, 6, 7, 8, 20, 50];
            _this.plNum = 0;
            //钱钱钱 
            _this.monyNum = 0;
            _this.LOC_KEY = "SmallGameCoin" + AppReg.GAME_FIRST;
            _this.ovenTimeOut = -1;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/smallGame/GameTurnUIMoudleSkin.exml";
            return _this;
        }
        GameTurnUIMoudle.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            // this.card0.setBackId(3)
            //  this.card0.turnOver()
            this.bindButton(this.okBtn, false);
            this.cardArr.push(this.card0);
            this.cardArr.push(this.card1);
            this.cardArr.push(this.card2);
            this.cardArr.push(this.card3);
            this.cardArr.push(this.card4);
            this.bindButton(this.card0, false);
            this.bindButton(this.card1, false);
            this.bindButton(this.card2, false);
            this.bindButton(this.card3, false);
            this.bindButton(this.card4, false);
            this.bindButton(this.btnClose);
            this.bindButton(this.btnHllp);
            this.bindButton(this.successGroup, false);
            this.bindButton(this.plGroup, false);
            this.monyNum = smallGame.getCoin(); // = 1000;
            if (!this.monyNum) {
                this.monyNum = 0;
            }
            this.initialEvent();
        };
        GameTurnUIMoudle.prototype.opening = function () {
            //             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        };
        GameTurnUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.clikcBool) {
                switch (clickTarget) {
                    case this.okBtn:
                        this.firstEvent();
                        break;
                    case this.btnClose:
                        this.close();
                        break;
                    case this.successGroup:
                        this.initialEvent();
                        break;
                    case this.btnHllp:
                        this.plGroup.visible = true;
                        ;
                        break;
                    case this.plGroup:
                        this.plGroup.visible = false;
                        ;
                        break;
                    default:
                        this.cilckEvent(clickTarget);
                        break;
                }
            }
        };
        GameTurnUIMoudle.prototype.initialEvent = function () {
            this.spImag.visible = false;
            this.plNum = 0;
            this.clikcBool = true;
            this.successGroup.visible = false;
            this.okBtn.touchEnabled = true;
            this.clearTimeout();
            this.showNumEvent();
            this.clickNum = 0;
            this.winGroup.visible = false;
            this.firstData = playcards.getProxy().m_cbCardData.concat();
            this.card0.hideLight();
            this.card1.hideLight();
            this.card2.hideLight();
            this.card3.hideLight();
            this.card4.hideLight();
        };
        GameTurnUIMoudle.prototype.clearTimeout = function () {
            if (this.ovenTimeOut != -1) {
                egret.clearTimeout(this.ovenTimeOut);
                this.ovenTimeOut = -1;
            }
        };
        GameTurnUIMoudle.prototype.firstEvent = function () {
            var okArr = [];
            if (this.clickNum == 0) {
                this.ovenArr = playcards.getProxy().getRoamdCards(5);
                var len = this.cardArr.length;
                this.card0.setBackId(this.ovenArr[0]);
                this.card0.turnOver();
                this.card1.setBackId(this.ovenArr[1]);
                this.card1.turnOver();
                this.card2.setBackId(this.ovenArr[2]);
                this.card2.turnOver();
                this.card3.setBackId(this.ovenArr[3]);
                this.card3.turnOver();
                this.card4.setBackId(this.ovenArr[4]);
                this.card4.turnOver();
                this.monyNum -= this.consume;
                this.showNumEvent();
            }
            else {
                var newArr = playcards.getProxy().getRoamdCards(this.clickNum);
                var len = this.cardArr.length;
                for (var i = 0; i != len; i++) {
                    var item = this.cardArr[i];
                    if (item && item.cardid == null) {
                        this.ovenArr[i] = newArr[0];
                        item.setBackId(newArr[0]);
                        item.turnOver();
                        newArr.splice(0, 1);
                    }
                }
            }
            this.info = playcards.getProxy().getCardResult(this.ovenArr);
            if (this.info.type) {
                this.winGroup.visible = true;
                this.winImag.source = "img_word_poker_win_" + Number(this.info.type + 1) + "_png";
                this.plNum = this.plArr[this.info.type] * this.consume;
                this.monyNum += this.plNum;
                this.okBtn.touchEnabled = false;
                this.clearTimeout();
                this.clikcBool = false;
                this.playTxtEvent(false);
                this.ovenTimeOut = egret.setTimeout(this.successEvent, this, 2000);
            }
            else {
                if (this.clickNum == 0) {
                    this.clearTimeout();
                    this.ovenTimeOut = egret.setTimeout(this.playTxtEvent, this, 500);
                }
                else {
                    this.okBtn.touchEnabled = false;
                    this.clikcBool = false;
                    this.clearTimeout();
                    this.spImag.visible = true;
                    this.playTxtEvent(false);
                    this.ovenTimeOut = egret.setTimeout(this.ovenOutEvent, this, 2000);
                }
            }
        };
        GameTurnUIMoudle.prototype.successEvent = function () {
            this.showNumEvent();
            this.cuccTxt.text = "恭喜获得：" + this.plNum;
            this.successGroup.visible = true;
            this.clikcBool = true;
        };
        GameTurnUIMoudle.prototype.ovenOutEvent = function () {
            this.initialEvent();
        };
        GameTurnUIMoudle.prototype.playTxtEvent = function (bool) {
            if (bool === void 0) { bool = true; }
            for (var i = 0; i != 5; i++) {
                var item = this.cardArr[i];
                if (item) {
                    item.txtLabel.visible = bool;
                }
            }
        };
        GameTurnUIMoudle.prototype.cilckEvent = function (item) {
            // this.tableMesslab.visible =false;
            var clickItem = item;
            if (clickItem.cardid) {
                clickItem.txtLabel.visible = false;
                clickItem.hideLight();
                this.clickNum++;
            }
        };
        GameTurnUIMoudle.prototype.showNumEvent = function () {
            this.numTxt.text = this.monyNum.toString();
            smallGame.setCoin(this.monyNum);
        };
        GameTurnUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        GameTurnUIMoudle.prototype.dispose = function () {
            this.clearTimeout();
            _super.prototype.dispose.call(this);
        };
        return GameTurnUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    smallGame.GameTurnUIMoudle = GameTurnUIMoudle;
    __reflect(GameTurnUIMoudle.prototype, "smallGame.GameTurnUIMoudle");
})(smallGame || (smallGame = {}));
//# sourceMappingURL=GameTurnUIMoudle.js.map