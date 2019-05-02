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
    var GuiChuTableItemComp = (function (_super) {
        __extends(GuiChuTableItemComp, _super);
        function GuiChuTableItemComp(index) {
            var _this = _super.call(this) || this;
            _this.choumaRef = [];
            _this.betCount = 0;
            _this.winClearChoumas = [];
            _this.skinName = "GuiChuTableItemCompSkin";
            _this.index = guichu.getProxy().TABLE_ITEMS[index]["id"];
            _this.valueLabel.text = "x" + guichu.getProxy().TABLE_ITEMS[index]["value"];
            _this.hsImage.source = "guichu_icon_hs_b_" + (_this.index + 1) + "_png";
            _this.addMC();
            return _this;
        }
        Object.defineProperty(GuiChuTableItemComp, "instance", {
            get: function () {
                if (this.ins == null)
                    this.ins = [];
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });
        GuiChuTableItemComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.qxzLabel.visible = false;
            this.bindButton(this.betGroup, false);
            this.setData();
        };
        GuiChuTableItemComp.prototype.setData = function () {
            this.betType = [];
            for (var i = 0; i < 7; i++) {
                this.betType.push(0);
            }
        };
        GuiChuTableItemComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.betGroup:
                    if (!guichu.getProxy().canBet)
                        return;
                    if (this.betCount >= 2000000) {
                        tip.popSysCenterTip("该下注已达最大值");
                    }
                    else {
                        this.reqBetAction(guichu.getProxy().selectChoumaIndex, 1);
                    }
                    break;
            }
        };
        GuiChuTableItemComp.prototype.reqBetAction = function (index, times) {
            if (times === void 0) { times = 1; }
            guichu.getProxy().canAutoBet = false;
            var betValue;
            if (index == 0 && guichu.getProxy().freeNum > 0) {
                betValue = 0;
            }
            else {
                betValue = guichu.getProxy().choumaValues[index];
            }
            __PVO().i(this.index + 1, times).l(betValue * times).to(app.NetAction.GUICHU_REQ_ANTE);
        };
        GuiChuTableItemComp.prototype.betAction = function (index) {
            this.choumaIndex = index;
            __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_BET, this);
            this.betCount += guichu.getProxy().choumaValues[index];
            this.betType[index]++;
            this.betCountLabel.text = this.betCount.toString();
            if (this.betCount > 0) {
                this.bg.source = "guichu_bg_tzq_xz_png";
                this.qxzLabel.visible = false;
                this.hsImage.alpha = 0.5;
                this.valueLabel.alpha = 0.5;
            }
        };
        GuiChuTableItemComp.prototype.endStatus = function () {
            this.betCount = 0;
            this.betCountLabel.text = "";
            // this.yxzImage.visible = false;
            // this.qxzLabel.visible = true;
            this.hsImage.alpha = 1;
            this.valueLabel.alpha = 1;
            this.bg.source = "guichu_bg_tzq_png";
            this.lastBetType = this.betType;
            this.clearBetInfo();
            this.setData();
            if ((guichu.getProxy().zpGamEndVO.card - 1) == this.index) {
                this.playMC();
            }
            else {
                this.clearChouma();
            }
        };
        GuiChuTableItemComp.prototype.clearChouma = function () {
            while (this.choumaRef.length > 0) {
                var chouma = this.choumaRef.pop();
                guichu.GuiChuChoumaComp.reclaim(chouma);
                chouma.removeFromParent();
            }
        };
        GuiChuTableItemComp.prototype.winChoumaAni = function () {
            var _this = this;
            var self = this;
            utils.SoundUtils.playEffectSound(utils.SoundUtils.chipAll);
            while (self.choumaRef.length > 0) {
                var chouma = self.choumaRef.pop();
                var endPoint = new egret.Point();
                var guichuModule = (__GET_MOUDLE(AppReg.GUICHU)).gui;
                guichuModule.tableComp.localToGlobal(guichu.getProxy().winChoumaPoint[0], guichu.getProxy().winChoumaPoint[1], endPoint);
                self.choumaGroup.globalToLocal(endPoint.x, endPoint.y, endPoint);
                // endPoint.x -= chouma.width / 2 * chouma.scaleX;
                // endPoint.y -= chouma.height / 2 * chouma.scaleY;
                self.winClearChoumas.push(chouma);
                egret.Tween.get(chouma).to({ x: endPoint.x, y: endPoint.y }, 400, egret.Ease.sineIn).call(function () {
                    // egret.Tween.removeTweens(chouma);
                    // egret.setTimeout(()=>{
                    var clearChouma = self.winClearChoumas.shift();
                    if (clearChouma) {
                        clearChouma.initPoint(_this.index);
                        egret.Tween.get(clearChouma).to({ factor: 1 }, 300).call(function () {
                            clearChouma.rePosition();
                            guichu.GuiChuChoumaComp.reclaim(clearChouma);
                            egret.Tween.removeTweens(clearChouma);
                            clearChouma.removeFromParent();
                            if (self.choumaRef.length == 0) {
                                __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_PRO_CHANGE);
                            }
                        }, self);
                    }
                    // }, this, 200, true);
                }, self);
            }
        };
        GuiChuTableItemComp.prototype.autoBet = function () {
            // if (!getProxy().canBet) return;
            if (guichu.getProxy().zpTable.gameStatus != guichu.GAME_STATE.GAME_BET)
                return;
            if (this.lastBetType) {
                for (var i = 0; i < this.lastBetType.length; i++) {
                    while (this.lastBetType[i] > 0) {
                        this.reqBetAction(i, this.lastBetType[i]);
                        this.lastBetType[i] = 0;
                    }
                }
            }
        };
        // startAni() {
        //     this.aniImage.alpha = 0;
        //     this.aniImage.visible = true;
        //     egret.Tween.get(this.aniImage).to({alpha: this.aniImage.alpha > 0? 0: 5}, 1500);
        //     this.aniTimeInterval = egret.setInterval(()=>{
        //         egret.Tween.get(this.aniImage).to({alpha: this.aniImage.alpha > 0? 0: 5}, 1500);
        //     }, this, 1500);
        // }
        // stopAni() {
        //     this.aniImage.visible = false;
        //     if (this.aniTimeInterval) egret.clearInterval(this.aniTimeInterval);
        // }
        GuiChuTableItemComp.prototype.updateBetInfo = function (bet, nop) {
            this.totalBet.text = bet.toString();
            this.totalPerson.text = nop.toString();
        };
        GuiChuTableItemComp.prototype.clearBetInfo = function () {
            this.totalBet.text = "";
            this.totalPerson.text = "0";
        };
        GuiChuTableItemComp.prototype.addMC = function () {
            this.aniGroup.visible = false;
            var data = RES.getRes("guichu_win_ti_json");
            var txtr = RES.getRes("guichu_win_ti_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.aniMc = new egret.MovieClip(mcFactory.generateMovieClipData("guichu_win_ti"));
            this.aniMc.width = 142;
            this.aniMc.height = 125;
            this.aniMc.x = -3;
            this.aniMc.y = -16;
            this.aniMc.blendMode = egret.BlendMode.ADD;
            this.aniGroup.addChild(this.aniMc);
        };
        GuiChuTableItemComp.prototype.playMC = function () {
            this.aniGroup.visible = true;
            this.aniMc.play(-1);
        };
        GuiChuTableItemComp.prototype.stopMC = function () {
            this.aniGroup.visible = false;
            this.aniMc.stop();
        };
        GuiChuTableItemComp.prototype.copyChouma = function () {
            var len = this.choumaRef.length * (guichu.getProxy().TABLE_ITEMS[this.index]["value"] - 1);
            for (var i = 0; i < len; i++) {
                var delayTime = 200 + Math.random() * 400;
                var aniTime = 200 + Math.random() * 400;
                var chouma = guichu.GuiChuChoumaComp.produce(0);
                var point = new egret.Point(this.choumaGroup.width >> 1, 65);
                var deg = Math.random() * Math.PI * 2;
                var r = Math.random() * 50;
                point.x += r * Math.cos(deg);
                point.y += r * Math.sin(deg) * 30 / 50;
                chouma.x = point.x;
                chouma.y = point.y;
                chouma.scaleX = chouma.scaleY = 0;
                this.choumaGroup.addChild(chouma);
                this.choumaRef.push(chouma);
                egret.Tween.get(chouma)
                    .wait(delayTime)
                    .to({ scaleX: 1, scaleY: 1 }, aniTime, egret.Ease.backOut)
                    .call(function (index) {
                    if (index <= 10) {
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.chipSkake);
                    }
                }, this, [i]);
            }
        };
        GuiChuTableItemComp.prototype.dispose = function () {
            if (this.aniMc)
                this.aniMc.removeFromParent(true);
            if (this.aniTimeInterval)
                egret.clearInterval(this.aniTimeInterval);
            this.winClearChoumas.forEach(function (element) {
                element.removeFromParent();
            });
            this.winClearChoumas = null;
            this.choumaRef.forEach(function (element) {
                element.removeFromParent();
            });
            this.choumaRef = null;
            _super.prototype.dispose.call(this);
        };
        return GuiChuTableItemComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuTableItemComp = GuiChuTableItemComp;
    __reflect(GuiChuTableItemComp.prototype, "guichu.GuiChuTableItemComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuTableItemComp.js.map