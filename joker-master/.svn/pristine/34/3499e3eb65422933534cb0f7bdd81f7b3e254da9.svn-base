module guichu {
    export class GuiChuTableComp extends gameabc.UICustomComponent {
        chouma1: eui.Group;
        chouma2: eui.Group;
        chouma3: eui.Group;
        chouma4: eui.Group;
        chouma5: eui.Group;
        choumas: eui.Group[];
        choumaValue1: eui.BitmapLabel;
        choumaValue2: eui.BitmapLabel;
        choumaValue3: eui.BitmapLabel;
        choumaValue4: eui.BitmapLabel;
        choumaValue5: eui.BitmapLabel;
        choumaAni: eui.Image;
        choumaValues: eui.BitmapLabel[];
        itemGroup: eui.Group;
        choumaGroup: eui.Group;
        itemList: eui.Group;
        itemGroupShadow: eui.Image;
        button1: eui.ToggleButton;
        // countGroup: eui.Group;
        // countLabel: eui.BitmapLabel;
        // betCount: number;
        // betCountIntervalValue: number;
        tableLightAni: eui.Image;
        caifuBL: eui.BitmapLabel;
        yinliBL: eui.BitmapLabel;
        countScreen: eui.Image;
        zitiGroup: eui.Group;
        ziti1: dragonBones.Movie;
        ziti2: dragonBones.Movie;
        constructor() {
            super();
            this.skinName = "GuiChuTableCompSkin";
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
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
            this.button1.addEventListener(eui.UIEvent.CHANGE, ()=>{
                getProxy().isAutoBet = this.button1.selected;
                if (this.button1.selected) __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_AUTOBET);
                utils.SoundUtils.playEffectSound(utils.SoundUtils.chipAll);
            }, this);
            // this.countGroup.visible = false;
            this.addAnimation();
            this.addDB();
            // this.setChoumaValue();
        }
        initItemGroup() {
            for (var i = 0; i < 7; i++) {
                var item = new GuiChuTableItemComp(i);
                this.itemList.addChild(item);
                GuiChuTableItemComp.instance[i] = item;
            }
            this.itemGroup.mask = new egret.Rectangle(0, -40, this.itemGroup.width, 148);
            this.itemGroup.touchEnabled = false;
        }
        setChoumaValue() {
            for (var i = 0; i < getProxy().choumaValues.length; i++) {
                if (i == 0 && getProxy().freeNum && getProxy().freeNum > 0) {
                    this.choumaValues[i].text = "年x" + getProxy().freeNum;
                } else {
                    this.choumaValues[i].text = FormatUtils.wan(getProxy().choumaValues[i]);
                }
            }
        }
        changeItemList(isUp: boolean, callFunc: Function = function(){}) {
            var self = this;
            var tarY = 0;
            var tarH = 148;
            var mask = new egret.Rectangle(0, -40, this.itemGroup.width, 148);
            if (isUp) {
                tarY = -40;
                tarH = this.itemGroup.height + 40;
                egret.Tween.get(this.itemGroupShadow).to({alpha: 0}, 200);
                egret.Tween.get(this.itemList).to({y: tarY}, 200, egret.Ease.sineIn).call(()=>{
                    mask.height = tarH;
                    this.itemGroup.mask = mask;
                    callFunc();
                }, self);
            } else {
                egret.Tween.removeTweens(this.itemList);
                mask.height = tarH;
                this.itemGroup.mask = mask;
                egret.Tween.get(this.itemGroupShadow).to({alpha: 1}, 200);
                egret.Tween.get(this.itemList).to({y: tarY}, 200, egret.Ease.sineIn);
            }
        }
        setChouma(index: number) {
            if (getProxy().selectChoumaIndex != undefined) egret.Tween.get(this.choumas[getProxy().selectChoumaIndex]).to({y: 0}, 200, egret.Ease.sineIn);
            getProxy().selectChoumaIndex = index;
            if (this.choumaAni == null) {
                this.choumaAni = new eui.Image("guichu_icon_chouma_ani_png");
                this.choumaAni.x = -12;
                this.choumaAni.y = -13;
            }
            if (this.choumaAni.parent) this.choumaAni.parent.removeChild(this.choumaAni);
            this.choumas[getProxy().selectChoumaIndex].addChildAt(this.choumaAni, 0);
            egret.Tween.get(this.choumas[getProxy().selectChoumaIndex]).to({y: -10}, 200, egret.Ease.sineIn);
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            var index: number = this.choumas.indexOf(<eui.Group>clickTarget);
            if (index != -1 && index != getProxy().selectChoumaIndex) {
                this.setChouma(index);
                utils.SoundUtils.playEffectSound(utils.SoundUtils.chipOut);
            }
            switch (clickTarget) {

            }
        }
        betAnimate(data: any) {
            var tableItem: GuiChuTableItemComp = data as GuiChuTableItemComp;
            var choumaBtn = this.choumas[tableItem.choumaIndex];
            var startPoint: egret.Point = choumaBtn.localToGlobal(choumaBtn.width >> 1, choumaBtn.height >> 1);
            tableItem.choumaGroup.globalToLocal(startPoint.x, startPoint.y, startPoint);
            var chouma = GuiChuChoumaComp.produce(tableItem.choumaIndex);
            chouma.touchEnabled = false;
            // startPoint.x -= 32 / 2 * chouma.scaleX;
            // startPoint.y -= 32 / 2 * chouma.scaleY;
            chouma.x = startPoint.x;
            chouma.y = startPoint.y;
            var endPoint: egret.Point = new egret.Point(tableItem.choumaGroup.width >> 1, 65);
            var deg = Math.random() * Math.PI * 2;
            var r = Math.random() * 50;
            endPoint.x += r * Math.cos(deg);// - 32 / 2 * chouma.scaleX;
            endPoint.y += r * Math.sin(deg) * 30 / 50;
            tableItem.choumaGroup.addChild(chouma);
            tableItem.choumaRef.push(chouma);
            egret.Tween.get(chouma).to({x: endPoint.x, y: endPoint.y}, 200, egret.Ease.sineIn);
        }
        waitStatus() {
            this.changeItemList(false);
            this.stopItemAni();
        }
        betStatus() {
            // this.clearBetInfo();
            // this.betCount = Math.floor(getProxy().zpTable.timeLast / 1000);
            // if (this.betCount <= 0) {
            //     this.betCount = getProxy().zpTable.nowTimeLast - getProxy().zpTable.nowTime;
            // }
            // if(this.betCountIntervalValue > 0) {
            //     egret.clearInterval(this.betCountIntervalValue);
            // }

            // this.countLabel.text = this.betCount.toString();
            // this.betCountIntervalValue = egret.setInterval(this.betCountInterval, this, 1000);
            // this.countGroup.visible = true;
            // this.showChountGroup();
            showCountdown(Math.max(0,getProxy().zpTable.timeLast), this.betCountdownFinish, this);
            // console.log(getProxy().zpTable.timeLast);
            this.changeItemList(true, ()=>{
                for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                    GuiChuTableItemComp.instance[i].qxzLabel.visible = true;
                }
                this.autoBet();
                getProxy().changeStatus(GuiChuModuleProxy.STATUS_BET);
            });
        }

        betCountdownFinish() {
            getProxy().localBetCountFinish = true;
            this.stopBet();
        }
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

        stopBet() {
            this.stopItemAni();
            if (getProxy().localBetCountFinish && getProxy().serverBetFinish) {
                // this.countGroup.visible = false;
                // egret.clearInterval(this.betCountIntervalValue);
                // this.stopItemAni();
                this.changeItemList(false);
                for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                    GuiChuTableItemComp.instance[i].qxzLabel.visible = false;
                }
                getProxy().changeStatus(GuiChuModuleProxy.STATUS_SPIN);
                __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_SPIN);
                // getProxy().canAutoBet = true;
            }
        }

        endStatus() {
            this.changeItemList(true, this.clearChouma);
            // if(this.betCountIntervalValue > 0) {
            //     egret.clearInterval(this.betCountIntervalValue);
            // }
            // var downTime:number = Math.floor(guichu.getProxy().zpTable ? guichu.getProxy().zpTable.timeLast / 1000 - 10 : 0);
            // var countTime: number = guichu.getProxy().zpTable.timeLast - 10000 - 2000;
            // if (countTime > 0) {
            //     showCountdown(countTime);
            // } 
        }
        enterCount(time: number) {
            if(time > 0) {
                showCountdown(time);
            };
        }

        clearChouma() {
            for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                if (GuiChuTableItemComp.instance[i]) {
                    var item = GuiChuTableItemComp.instance[i];
                    item.endStatus();
                }
            }
        }

        autoBet() {
            if (!getProxy().isAutoBet) return;
            if (!getProxy().canAutoBet) return;
            for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                if (GuiChuTableItemComp.instance[i]) {
                    var item = GuiChuTableItemComp.instance[i];
                    item.autoBet();
                }
            }
        }

        // startItemAni() {
        //     for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
        //         if (GuiChuTableItemComp.instance[i]) {
        //             var item = GuiChuTableItemComp.instance[i];
        //             item.startAni();
        //         }
        //     }
        // }

        stopItemAni() {
            for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                if (GuiChuTableItemComp.instance[i]) {
                    var item = GuiChuTableItemComp.instance[i];
                    item.stopMC();
                }
            }
        }
        
        intervalId:number = 0;
        addAnimation() {
            if(this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
            }
            this.intervalId = egret.setInterval(()=>{
                egret.Tween.get(this.tableLightAni).to({alpha: this.tableLightAni.alpha > 0? 0: 4}, 1500);
            }, this, 1500);
        }

        updateMoney(money: number) {
            getProxy().myMoney = money;
            this.caifuBL.text = FormatUtils.wan1(money);
        }

        updateBetMoney(money: number) {
            getProxy().myMoney = money;
            this.updateMoney(getProxy().myMoney);
        }

        updatePro() {
            var pro = getProxy().winProfit;
            this.yinliBL.text = FormatUtils.wan1(pro);
        }

        clearBetInfo() {
            for (var i = 0; i < GuiChuTableItemComp.instance.length; i++) {
                if (GuiChuTableItemComp.instance[i]) {
                    var item = GuiChuTableItemComp.instance[i];
                    item.clearBetInfo();
                }
            }
        }
        freeEnd() {
            if (getProxy().freeNum > 0) {
                this.choumaValue1.text = "年x" + getProxy().freeNum;
            } else {
                this.choumaValue1.text = getProxy().choumaValues[0].toString();
            }
        }
        addDB() {
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
        }
        ziti2Play() {
            egret.Tween.get(this).wait(5000).call(()=>{
                this.ziti2.play("newAnimation", 1);
            });
        }
        ziti1Play() {
            egret.Tween.get(this).wait(5000).call(()=>{
                this.ziti1.play("newAnimation", 1);
            });
        }
        dispose():void {
            if(this.countScreen) {
                egret.Tween.removeTweens(this.countScreen);
            }
            egret.clearInterval(this.intervalId);
            if(this.tableLightAni) {
                egret.Tween.removeTweens(this.tableLightAni);
            }
            for (var i = 0; i < GuiChuTableItemComp.ins.length; i++) {
                GuiChuTableItemComp.ins[i].removeFromParent(true);
            }
            GuiChuTableItemComp.ins = [];
            clearCountdown();
            gameabc.removeMovieGroup(AppReg.GUICHU_TABLE_DB);
            this.ziti1.removeEventListener(egret.Event.COMPLETE, this.ziti2Play, this);
            this.ziti2.removeEventListener(egret.Event.COMPLETE, this.ziti1Play, this);
            if (this.ziti1) this.ziti1.removeFromParent(true);
            if (this.ziti2) this.ziti2.removeFromParent(true);
            super.dispose();
        }
    }
}