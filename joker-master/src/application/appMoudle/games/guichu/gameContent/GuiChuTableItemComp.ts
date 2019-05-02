module guichu {
    export class GuiChuTableItemComp extends gameabc.UICustomComponent {
        betGroup: eui.Group;
        choumaGroup: eui.Group;
        choumaRef: GuiChuChoumaComp[] = [];
        valueLabel: eui.Label;
        betCountLabel: eui.Label;
        hsImage: eui.Image;
        betCount: number = 0; 
        betType: number[];
        lastBetType: number[];
        index: number;
        choumaIndex: number;
        aniTimeInterval: number;
        bg: eui.Image;
        qxzLabel: eui.Label;
        winClearChoumas: GuiChuChoumaComp[] = [];
        totalBet: eui.Label;
        totalPerson: eui.Label; 
        aniGroup: eui.Group;
        aniMc: egret.MovieClip;
        static ins: GuiChuTableItemComp[];
        static get instance(): GuiChuTableItemComp[] {
            if (this.ins == null) this.ins = [];
            return this.ins;
        }
        constructor(index: number) {
            super();
            this.skinName = "GuiChuTableItemCompSkin";
            this.index = getProxy().TABLE_ITEMS[index]["id"];
            this.valueLabel.text = "x" + getProxy().TABLE_ITEMS[index]["value"];
            this.hsImage.source = "guichu_icon_hs_b_" + (this.index + 1) + "_png";
            this.addMC();
		}
        createComplete(evt: egret.Event): void {     
            super.createComplete(evt);
            this.qxzLabel.visible = false;
            this.bindButton(this.betGroup, false);
            this.setData();
        }
        setData() {
            this.betType = [];
            for (var i = 0; i < 7; i++) {
                this.betType.push(0);
            }
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.betGroup:
                    if (!getProxy().canBet) return;
                    if (this.betCount >= 2000000) {
                        tip.popSysCenterTip("该下注已达最大值");
                    } else {
                        this.reqBetAction(getProxy().selectChoumaIndex, 1);
                    }
                    break;
            }
        }
        reqBetAction(index: number, times: number = 1) {
            getProxy().canAutoBet = false;
            var betValue: number;
            if (index == 0 && getProxy().freeNum > 0) {
                betValue = 0
            } else {
                betValue = getProxy().choumaValues[index];
            }
            __PVO().i(this.index + 1, times).l(betValue * times).to(app.NetAction.GUICHU_REQ_ANTE);
        }
        betAction(index: number) {
            this.choumaIndex = index;
            __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_BET, this);
            this.betCount += getProxy().choumaValues[index];
            this.betType[index]++;
            this.betCountLabel.text = this.betCount.toString();
            if (this.betCount > 0) {
                this.bg.source = "guichu_bg_tzq_xz_png";
                this.qxzLabel.visible = false;
                this.hsImage.alpha = 0.5;
                this.valueLabel.alpha = 0.5;
            }
        }
        endStatus() {
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
            if ((getProxy().zpGamEndVO.card - 1) == this.index) {
                this.playMC();
                // this.copyChouma();
            }else {
                this.clearChouma();
            }
        }
        clearChouma() {
            while (this.choumaRef.length > 0) {
                var chouma = this.choumaRef.pop();
                GuiChuChoumaComp.reclaim(chouma);
                chouma.removeFromParent();
            }
        }
        winChoumaAni() {
            var self = this;
            utils.SoundUtils.playEffectSound(utils.SoundUtils.chipAll);
            while (self.choumaRef.length > 0) {
                var chouma = self.choumaRef.pop();
                var endPoint: egret.Point = new egret.Point();
                var guichuModule = <GuiChuModule>(__GET_MOUDLE(AppReg.GUICHU)).gui;
                guichuModule.tableComp.localToGlobal(getProxy().winChoumaPoint[0], getProxy().winChoumaPoint[1], endPoint);
                self.choumaGroup.globalToLocal(endPoint.x, endPoint.y, endPoint);
                // endPoint.x -= chouma.width / 2 * chouma.scaleX;
                // endPoint.y -= chouma.height / 2 * chouma.scaleY;
                self.winClearChoumas.push(chouma);
                egret.Tween.get(chouma).to({x: endPoint.x, y: endPoint.y}, 400, egret.Ease.sineIn).call(()=>{
                    // egret.Tween.removeTweens(chouma);
                    // egret.setTimeout(()=>{
                        var clearChouma = self.winClearChoumas.shift();
                        if (clearChouma) {
                            clearChouma.initPoint(this.index);
                            egret.Tween.get(clearChouma).to({factor: 1}, 300).call(()=>{
                                clearChouma.rePosition();
                                GuiChuChoumaComp.reclaim(clearChouma);
                                egret.Tween.removeTweens(clearChouma);
                                clearChouma.removeFromParent();
                                if (self.choumaRef.length == 0) {
                                    __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_PRO_CHANGE);
                                }
                            }, self);
                        }   
                    // }, this, 200, true);
                }, self);
            }
        }
        autoBet() {
            // if (!getProxy().canBet) return;
            if (getProxy().zpTable.gameStatus != guichu.GAME_STATE.GAME_BET) return;
            if (this.lastBetType) {
                for (var i = 0; i < this.lastBetType.length; i++) {
                    while (this.lastBetType[i] > 0) {
                        this.reqBetAction(i, this.lastBetType[i]);
                        this.lastBetType[i] = 0;
                    }
                }
            }
        }
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
        updateBetInfo(bet: number, nop: number) {
            this.totalBet.text = bet.toString();
            this.totalPerson.text = nop.toString();
        }
        clearBetInfo() {
            this.totalBet.text = "";
            this.totalPerson.text = "0";
        }
        addMC() {
            this.aniGroup.visible = false;
            var data = RES.getRes("guichu_win_ti_json");
            var txtr = RES.getRes("guichu_win_ti_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        
            this.aniMc = new egret.MovieClip(mcFactory.generateMovieClipData("guichu_win_ti"));
            this.aniMc.width = 142;
            this.aniMc.height = 125;
            this.aniMc.x = -3;
            this.aniMc.y = -16;
            this.aniMc.blendMode = egret.BlendMode.ADD;
            this.aniGroup.addChild(this.aniMc);
        }
        playMC() {
            this.aniGroup.visible = true;
            this.aniMc.play(-1);
        }
        stopMC() {
            this.aniGroup.visible = false;
            this.aniMc.stop();
        }
        copyChouma() {
            var len: number = this.choumaRef.length * (getProxy().TABLE_ITEMS[this.index]["value"] - 1);
            for (var i = 0; i < len; i++) {
                var delayTime: number = 200 + Math.random() * 400;
                var aniTime: number = 200 + Math.random() * 400;
                var chouma = GuiChuChoumaComp.produce(0);
                var point: egret.Point = new egret.Point(this.choumaGroup.width >> 1, 65);
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
                    .to({scaleX: 1, scaleY: 1}, aniTime,egret.Ease.backOut)
                    .call((index:number)=>{
                        if(index <= 10) {
                            utils.SoundUtils.playEffectSound(utils.SoundUtils.chipSkake);
                        }
                    },this,[i]);
            }
        }
        dispose() {
            if (this.aniMc) this.aniMc.removeFromParent(true);
            if (this.aniTimeInterval) egret.clearInterval(this.aniTimeInterval);
            this.winClearChoumas.forEach(element => {
                element.removeFromParent()
            });
            this.winClearChoumas = null;
            this.choumaRef.forEach(element => {
                element.removeFromParent()
            });
            this.choumaRef = null;
            super.dispose();
        }
    }
}