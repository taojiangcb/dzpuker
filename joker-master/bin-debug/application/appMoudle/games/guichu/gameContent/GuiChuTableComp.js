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
    var GuiChuTableComp = (function (_super) {
        __extends(GuiChuTableComp, _super);
        function GuiChuTableComp() {
            var _this = _super.call(this) || this;
            _this.intervalId = 0;
            _this.skinName = "GuiChuTableCompSkin";
            return _this;
        }
        GuiChuTableComp.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.choumas = [this.chouma1, this.chouma2, this.chouma3, this.chouma4, this.chouma5];
            for (var i = 0; i < this.choumas.length; i++) {
                this.bindButton(this.choumas[i], false);
            }
            this.choumaValues = [this.choumaValue1, this.choumaValue2, this.choumaValue3, this.choumaValue4, this.choumaValue5];
            // for (var i = 0; i < getProxy().CHOUMA_VALUES.length; i++) {
            //     this.choumaValues[i].text = this.choumaValues[i+getProxy().CHOUMA_VALUES.length].text = getProxy().CHOUMA_VALUES[i].toString();
            // }
            // var choumaIndex: number = getProxy().zpTable.totalMoney > getProxy().choumaValues[4]? 4: 0;
            // this.setChouma(choumaIndex);
            this.initItemGroup();
            // this.bindButton(this.button1);
            this.button1.addEventListener(eui.UIEvent.CHANGE, function () {
                guichu.getProxy().isAutoBet = _this.button1.selected;
                if (_this.button1.selected)
                    __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_AUTOBET);
                utils.SoundUtils.playEffectSound(utils.SoundUtils.chipAll);
            }, this);
            // this.countGroup.visible = false;
            this.addAnimation();
            this.addDB();
            // this.setChoumaValue();
        };
        GuiChuTableComp.prototype.initItemGroup = function () {
            for (var i = 0; i < 7; i++) {
                var item = new guichu.GuiChuTableItemComp(i);
                this.itemList.addChild(item);
                guichu.GuiChuTableItemComp.instance[i] = item;
            }
            this.itemGroup.mask = new egret.Rectangle(0, -40, this.itemGroup.width, 148);
            this.itemGroup.touchEnabled = false;
        };
        GuiChuTableComp.prototype.setChoumaValue = function () {
            for (var i = 0; i < guichu.getProxy().choumaValues.length; i++) {
                if (i == 0 && guichu.getProxy().freeNum && guichu.getProxy().freeNum > 0) {
                    this.choumaValues[i].text = "年x" + guichu.getProxy().freeNum;
                }
                else {
                    this.choumaValues[i].text = FormatUtils.wan(guichu.getProxy().choumaValues[i]);
                }
            }
        };
        GuiChuTableComp.prototype.changeItemList = function (isUp, callFunc) {
            var _this = this;
            if (callFunc === void 0) { callFunc = function () { }; }
            var self = this;
            var tarY = 0;
            var tarH = 148;
            var mask = new egret.Rectangle(0, -40, this.itemGroup.width, 148);
            if (isUp) {
                tarY = -40;
                tarH = this.itemGroup.height + 40;
                egret.Tween.get(this.itemGroupShadow).to({ alpha: 0 }, 200);
                egret.Tween.get(this.itemList).to({ y: tarY }, 200, egret.Ease.sineIn).call(function () {
                    mask.height = tarH;
                    _this.itemGroup.mask = mask;
                    callFunc();
                }, self);
            }
            else {
                egret.Tween.removeTweens(this.itemList);
                mask.height = tarH;
                this.itemGroup.mask = mask;
                egret.Tween.get(this.itemGroupShadow).to({ alpha: 1 }, 200);
                egret.Tween.get(this.itemList).to({ y: tarY }, 200, egret.Ease.sineIn);
            }
        };
        GuiChuTableComp.prototype.setChouma = function (index) {
            if (guichu.getProxy().selectChoumaIndex != undefined)
                egret.Tween.get(this.choumas[guichu.getProxy().selectChoumaIndex]).to({ y: 0 }, 200, egret.Ease.sineIn);
            guichu.getProxy().selectChoumaIndex = index;
            if (this.choumaAni == null) {
                this.choumaAni = new eui.Image("guichu_icon_chouma_ani_png");
                this.choumaAni.x = -12;
                this.choumaAni.y = -13;
            }
            if (this.choumaAni.parent)
                this.choumaAni.parent.removeChild(this.choumaAni);
            this.choumas[guichu.getProxy().selectChoumaIndex].addChildAt(this.choumaAni, 0);
            egret.Tween.get(this.choumas[guichu.getProxy().selectChoumaIndex]).to({ y: -10 }, 200, egret.Ease.sineIn);
        };
        GuiChuTableComp.prototype.touchBindButtonHandler = function (clickTarget) {
            var index = this.choumas.indexOf(clickTarget);
            if (index != -1 && index != guichu.getProxy().selectChoumaIndex) {
                this.setChouma(index);
                utils.SoundUtils.playEffectSound(utils.SoundUtils.chipOut);
            }
            switch (clickTarget) {
            }
        };
        GuiChuTableComp.prototype.betAnimate = function (data) {
            var tableItem = data;
            var choumaBtn = this.choumas[tableItem.choumaIndex];
            var startPoint = choumaBtn.localToGlobal(choumaBtn.width >> 1, choumaBtn.height >> 1);
            tableItem.choumaGroup.globalToLocal(startPoint.x, startPoint.y, startPoint);
            var chouma = guichu.GuiChuChoumaComp.produce(tableItem.choumaIndex);
            chouma.touchEnabled = false;
            // startPoint.x -= 32 / 2 * chouma.scaleX;
            // startPoint.y -= 32 / 2 * chouma.scaleY;
            chouma.x = startPoint.x;
            chouma.y = startPoint.y;
            var endPoint = new egret.Point(tableItem.choumaGroup.width >> 1, 65);
            var deg = Math.random() * Math.PI * 2;
            var r = Math.random() * 50;
            endPoint.x += r * Math.cos(deg); // - 32 / 2 * chouma.scaleX;
            endPoint.y += r * Math.sin(deg) * 30 / 50;
            tableItem.choumaGroup.addChild(chouma);
            tableItem.choumaRef.push(chouma);
            egret.Tween.get(chouma).to({ x: endPoint.x, y: endPoint.y }, 200, egret.Ease.sineIn);
        };
        GuiChuTableComp.prototype.waitStatus = function () {
            this.changeItemList(false);
            this.stopItemAni();
        };
        GuiChuTableComp.prototype.betStatus = function () {
            // this.clearBetInfo();
            // this.betCount = Math.floor(getProxy().zpTable.timeLast / 1000);
            // if (this.betCount <= 0) {
            //     this.betCount = getProxy().zpTable.nowTimeLast - getProxy().zpTable.nowTime;
            // }
            // if(this.betCountIntervalValue > 0) {
            //     egret.clearInterval(this.betCountIntervalValue);
            // }
            var _this = this;
            // this.countLabel.text = this.betCount.toString();
            // this.betCountIntervalValue = egret.setInterval(this.betCountInterval, this, 1000);
            // this.countGroup.visible = true;
            // this.showChountGroup();
            guichu.showCountdown(Math.max(0, guichu.getProxy().zpTable.timeLast), this.betCountdownFinish, this);
            // console.log(getProxy().zpTable.timeLast);
            this.changeItemList(true, function () {
                for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                    guichu.GuiChuTableItemComp.instance[i].qxzLabel.visible = true;
                }
                _this.autoBet();
                guichu.getProxy().changeStatus(guichu.GuiChuModuleProxy.STATUS_BET);
            });
        };
        GuiChuTableComp.prototype.betCountdownFinish = function () {
            guichu.getProxy().localBetCountFinish = true;
            this.stopBet();
        };
        // showChountGroup() {
        //     this.countScreen.width = this.countScreen.height = 5;
        //     this.countLabel.visible = false;
        //     this.countGroup.visible = true;
        //     egret.Tween.get(this.countScreen).to({width: 196}, 200).to({height: 54}, 200).call(()=>{
        //         this.countLabel.visible = true;
        //     }, this);
        // }
        // betCountInterval() {
        //     if (this.betCount < 0) return;
        //     this.betCount--;
        //     this.countLabel.text = this.betCount < 0? "0": this.betCount.toString();
        //     if (this.betCount < 0) {
        //         getProxy().localBetCountFinish = true;
        //         this.stopBet();
        //     }
        // }
        GuiChuTableComp.prototype.stopBet = function () {
            this.stopItemAni();
            if (guichu.getProxy().localBetCountFinish && guichu.getProxy().serverBetFinish) {
                // this.countGroup.visible = false;
                // egret.clearInterval(this.betCountIntervalValue);
                // this.stopItemAni();
                this.changeItemList(false);
                for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                    guichu.GuiChuTableItemComp.instance[i].qxzLabel.visible = false;
                }
                guichu.getProxy().changeStatus(guichu.GuiChuModuleProxy.STATUS_SPIN);
                __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_SPIN);
            }
        };
        GuiChuTableComp.prototype.endStatus = function () {
            this.changeItemList(true, this.clearChouma);
            // if(this.betCountIntervalValue > 0) {
            //     egret.clearInterval(this.betCountIntervalValue);
            // }
            // var downTime:number = Math.floor(guichu.getProxy().zpTable ? guichu.getProxy().zpTable.timeLast / 1000 - 10 : 0);
            // var countTime: number = guichu.getProxy().zpTable.timeLast - 10000 - 2000;
            // if (countTime > 0) {
            //     showCountdown(countTime);
            // } 
        };
        GuiChuTableComp.prototype.enterCount = function (time) {
            if (time > 0) {
                guichu.showCountdown(time);
            }
            ;
        };
        GuiChuTableComp.prototype.clearChouma = function () {
            for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                if (guichu.GuiChuTableItemComp.instance[i]) {
                    var item = guichu.GuiChuTableItemComp.instance[i];
                    item.endStatus();
                }
            }
        };
        GuiChuTableComp.prototype.autoBet = function () {
            if (!guichu.getProxy().isAutoBet)
                return;
            if (!guichu.getProxy().canAutoBet)
                return;
            for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                if (guichu.GuiChuTableItemComp.instance[i]) {
                    var item = guichu.GuiChuTableItemComp.instance[i];
                    item.autoBet();
                }
            }
        };
        // startItemAni() {
        //     for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
        //         if (GuiChuTableItemComp.instance[i]) {
        //             var item = GuiChuTableItemComp.instance[i];
        //             item.startAni();
        //         }
        //     }
        // }
        GuiChuTableComp.prototype.stopItemAni = function () {
            for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                if (guichu.GuiChuTableItemComp.instance[i]) {
                    var item = guichu.GuiChuTableItemComp.instance[i];
                    item.stopMC();
                }
            }
        };
        GuiChuTableComp.prototype.addAnimation = function () {
            var _this = this;
            if (this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
            }
            this.intervalId = egret.setInterval(function () {
                egret.Tween.get(_this.tableLightAni).to({ alpha: _this.tableLightAni.alpha > 0 ? 0 : 4 }, 1500);
            }, this, 1500);
        };
        GuiChuTableComp.prototype.updateMoney = function (money) {
            guichu.getProxy().myMoney = money;
            this.caifuBL.text = FormatUtils.wan1(money);
        };
        GuiChuTableComp.prototype.updateBetMoney = function (money) {
            guichu.getProxy().myMoney = money;
            this.updateMoney(guichu.getProxy().myMoney);
        };
        GuiChuTableComp.prototype.updatePro = function () {
            var pro = guichu.getProxy().winProfit;
            this.yinliBL.text = FormatUtils.wan1(pro);
        };
        GuiChuTableComp.prototype.clearBetInfo = function () {
            for (var i = 0; i < guichu.GuiChuTableItemComp.instance.length; i++) {
                if (guichu.GuiChuTableItemComp.instance[i]) {
                    var item = guichu.GuiChuTableItemComp.instance[i];
                    item.clearBetInfo();
                }
            }
        };
        GuiChuTableComp.prototype.freeEnd = function () {
            if (guichu.getProxy().freeNum > 0) {
                this.choumaValue1.text = "年x" + guichu.getProxy().freeNum;
            }
            else {
                this.choumaValue1.text = guichu.getProxy().choumaValues[0].toString();
            }
        };
        GuiChuTableComp.prototype.addDB = function () {
            gameabc.addMovieGroup("guichu_ziti_db_dbmv", "guichu_ziti_db_tex_png", AppReg.GUICHU_TABLE_DB);
            this.ziti1 = gameabc.buildMovie("yingli", AppReg.GUICHU_TABLE_DB);
            this.ziti1.x = 101;
            this.ziti1.y = -59;
            this.ziti1.blendMode = egret.BlendMode.ADD;
            this.ziti1.addEventListener(egret.Event.COMPLETE, this.ziti2Play, this);
            this.zitiGroup.addChild(this.ziti1);
            this.ziti2 = gameabc.buildMovie("caifu", AppReg.GUICHU_TABLE_DB);
            this.ziti2.x = 85;
            this.ziti2.y = -22;
            this.ziti2.blendMode = egret.BlendMode.ADD;
            this.ziti2.addEventListener(egret.Event.COMPLETE, this.ziti1Play, this);
            this.zitiGroup.addChild(this.ziti2);
            this.ziti1.play("newAnimation", 1);
        };
        GuiChuTableComp.prototype.ziti2Play = function () {
            var _this = this;
            egret.Tween.get(this).wait(5000).call(function () {
                _this.ziti2.play("newAnimation", 1);
            });
        };
        GuiChuTableComp.prototype.ziti1Play = function () {
            var _this = this;
            egret.Tween.get(this).wait(5000).call(function () {
                _this.ziti1.play("newAnimation", 1);
            });
        };
        GuiChuTableComp.prototype.dispose = function () {
            if (this.countScreen) {
                egret.Tween.removeTweens(this.countScreen);
            }
            egret.clearInterval(this.intervalId);
            if (this.tableLightAni) {
                egret.Tween.removeTweens(this.tableLightAni);
            }
            for (var i = 0; i < guichu.GuiChuTableItemComp.ins.length; i++) {
                guichu.GuiChuTableItemComp.ins[i].removeFromParent(true);
            }
            guichu.GuiChuTableItemComp.ins = [];
            guichu.clearCountdown();
            gameabc.removeMovieGroup(AppReg.GUICHU_TABLE_DB);
            this.ziti1.removeEventListener(egret.Event.COMPLETE, this.ziti2Play, this);
            this.ziti2.removeEventListener(egret.Event.COMPLETE, this.ziti1Play, this);
            if (this.ziti1)
                this.ziti1.removeFromParent(true);
            if (this.ziti2)
                this.ziti2.removeFromParent(true);
            _super.prototype.dispose.call(this);
        };
        return GuiChuTableComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuTableComp = GuiChuTableComp;
    __reflect(GuiChuTableComp.prototype, "guichu.GuiChuTableComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuTableComp.js.map