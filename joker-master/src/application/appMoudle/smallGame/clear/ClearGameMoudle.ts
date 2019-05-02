module smallGame {

    export class ClearGameMoudle extends app.base.BaseSceneUIMoudleComponent {

        ic: eui.Image;
        cc: ClearCardItem; //独立的提示牌
        hc: ClearCardItem; //系统自动提示的缓存指向
        c00: ClearCardItem;
        c01: ClearCardItem;
        c02: ClearCardItem;
        c03: ClearCardItem;
        c04: ClearCardItem;
        c05: ClearCardItem;
        c10: ClearCardItem;
        c11: ClearCardItem;
        c12: ClearCardItem;
        c13: ClearCardItem;
        c14: ClearCardItem;
        c15: ClearCardItem;
        c20: ClearCardItem;
        c21: ClearCardItem;
        c22: ClearCardItem;
        c23: ClearCardItem;
        c24: ClearCardItem;
        c25: ClearCardItem;
        c30: ClearCardItem;
        c31: ClearCardItem;
        c32: ClearCardItem;
        c33: ClearCardItem;
        c34: ClearCardItem;
        c35: ClearCardItem;

        cardsItems: ClearCardItem[];
        startButton: eui.Button;

        cardsArea: eui.Group;
        resultArea: eui.Group;

        shareButton: eui.Button;
        resetButton: eui.Button;

        ruleIds: number[];
        f1Ids: number[];
        f2Ids: number[];
        f3Ids: number[];

        postion: number;

        timeLabel: eui.Label;
        bestLabel: eui.Label;
        hintCheckId: number; //提示计时器ID

        isPlaying:boolean;

        txtCou : eui.Label;
        rusultTimeLabel: eui.Label;
        rusultBestLabel: eui.Label;
        rusultLevelLabel: eui.Label;
        rusultCoinLabel: eui.Label;
        rusultCoinIcon:eui.Image;

        constructor() {
            super();
            this.skinName = "ClearGameSkin";

            // ID与牌型的对应定义详见 playcards.getProxy().m_cbCardData;
            // 数字从小大到为2~A，同牌点从小到大为方块、梅花、红桃、黑桃
            this.ruleIds = [];
            for (var i = 0; i < 13; ++i) {
                this.ruleIds[i * 4 + 0] = i + 1;
                this.ruleIds[i * 4 + 1] = i + 14;
                this.ruleIds[i * 4 + 2] = i + 27;
                this.ruleIds[i * 4 + 3] = i + 40;
            }
            this.f1Ids = [];
            this.f2Ids = [];
            this.f3Ids = [];

        }

        createComplete(): void {
            super.createComplete(null);
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
        }

        resetUI(): void {
            this.cardsArea.visible = true;
            this.resultArea.visible = false;
            this.ic.visible = this.cc.visible = false;
            this.startButton.visible = true;

            var bestTime = smallGame.getClearGameBestTime();
            this.bestLabel.text = bestTime == -1 ? "暂无" : (bestTime/1000).toFixed(2);
            this.timeLabel.text = "0.00";
        }


        gameStart(): void {
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

        }

        gameOver(): void {
            this.isPlaying = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            var time = egret.getTimer() - this.startTime;
            var bestTime = smallGame.getClearGameBestTime();
            var reword = Math.floor((90000 - time) / 5); //以90秒为单位，少1秒奖200
            if (reword < 100) reword = 100; //保底100个金币
            var coin = smallGame.getCoin(reword);


            if (bestTime == -1 || time < bestTime) {
                smallGame.setClearGameBestTime(time);
                bestTime = time;
                //此处应该有特效，ALert太戳了~
                tip.Alert.show("恭喜你，破纪录啦~");
            }
            this.timeLabel.text = (time/1000).toFixed(2);
            this.rusultTimeLabel.text = this.timeLabel.text + "秒";
            this.rusultBestLabel.text = (bestTime/1000).toFixed(2) + "秒";
            this.rusultLevelLabel.text = "SSS";
            this.rusultCoinLabel.text = String(reword);
            var xOffset = this.rusultCoinLabel.text.length*12;
            this.rusultCoinIcon.horizontalCenter = 255-xOffset;
            this.txtCou.text = String(coin);
            this.cardsArea.visible = false;
            this.resultArea.visible = true;
            
        }

        reStart(tipId: number, p?: any): void {
            if (tipId == tip.YES) this.gameStart();
            else if (tipId == tip.NO) this.close();
        }

        startTime: number;
        onFrame(evt: any): void {
            var time = egret.getTimer() - this.startTime;
            this.timeLabel.text = (time / 1000).toFixed(2);
        }

        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
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
                var cardItem = <ClearCardItem>clickTarget;
                var index = this.cardsItems.indexOf(cardItem);

                if (this.postion < 24) {
                    if (this.f1Ids[index] == this.ruleIds[this.postion]) {
                        this.resetHint();
                        if (this.f2Ids[index] != null) {
                            cardItem.tweenToCard(this.f2Ids[index])
                        } else {
                            cardItem.tweenToCard(-1);
                        }
                        this.cc.setCardId(this.ruleIds[++this.postion]);
                    }
                }

                else if (this.postion < 48) {
                    if (this.f2Ids[index] == this.ruleIds[this.postion]) {
                        this.resetHint();
                        if (this.f3Ids[index] != null) {
                            cardItem.tweenToCard(this.f3Ids[index])
                        } else {
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
                        } else {
                            this.resetHint();
                            this.cc.setCardId(this.ruleIds[++this.postion]);
                        }
                    }
                }
            }

        }

        hintCard(): void {
            var cardId = this.ruleIds[this.postion];  //需要点击牌
            if (this.postion < 24) { //第一页里找
                var index = this.f1Ids.indexOf(cardId);
            } else if (this.postion < 48) { //第二页里找
                var index = this.f2Ids.indexOf(cardId);
            } else { //第三页里找
                var index = this.f3Ids.indexOf(cardId);
            }
            this.hc = this.cardsItems[index];
            this.hc.startHint();
            this.hintCheckId = -1;
        }


        resetHint(): void {
            if (this.hintCheckId != -1) egret.clearTimeout(this.hintCheckId);
            this.hintCheckId = egret.setTimeout(this.hintCard, this, 2000);
        }


        randomArray(arr: any[]): void {
            var len = arr.length;
            for (var i = 0; i < len; ++i) {
                var tr = Math.floor(Math.random() * 24);
                var tn = arr[i];
                arr[i] = arr[tr];
                arr[tr] = tn;
            }
        }

        dispose():void {
            super.dispose();
            if (this.hintCheckId != -1) {
                egret.clearTimeout(this.hintCheckId);
            }
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }


    }


}