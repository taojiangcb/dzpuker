module cardMemory {
    
    export enum GAME_SCENE {
        RULE,
        PLAY,
        RESULT
    }
    
    
    export class CardMemoryUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private bg: eui.Image;
        private rolebg: eui.Image;
        private curScene: GAME_SCENE;
        private historyHighScoreName = "cardMemoryHistoryHighScore";
        
        private countDownTimer: egret.Timer;
        private gameCountTimer: egret.Timer;
        
        private historyHighScore: number;
        private wrongCount: number;
        private usedTime: number;
        private countDown: number;
        
        private historyHighScoreLabel: eui.Label;
        private leftChanceLabel: eui.Label;
        private usedTimeLabel: eui.Label;
        private countDownLabel: eui.Label;
        
        private gameButton: eui.Button;
        private closeButton: eui.Button;
        private retryButton: eui.Button;
//        private backButton: eui.Button;
        
        private ruleGroup: eui.Group;
        private playGroup: eui.Group;
        private resultGroup: eui.Group;
        
        private winGroup: eui.Group;
        private loseGroup: eui.Group;
        
        private startTipGroup: eui.Group;
        private gameTipGroup: eui.Group;

        private tabelGroup: eui.Group;
        
        private countDownTitle: eui.Image;
        private topTipLabel: eui.Label;
        
        private memoryTimeRSLabel: eui.Label;
        private gameTimeRSLabel: eui.Label;
        private wrongTimeRSLabel: eui.Label;
        private scoreGetRSLabel: eui.Label;
        private coinGetRSLabel: eui.Label;
        
        private gameButtonLabel: eui.Image;
        private moneyLabel: eui.Label;
        
        private tableSize: number[] = [3,6];
        private tabelDeck: number[];
        
        private tableCardArray: CardMemoryCardItem[];
        private chooseCardArray: CardMemoryCardItem[];
        public chooseCardNumber: number;
        private chooseSuccessNumber: number;
        private chooseFailNumber: number;
        private gameChoosing: boolean;
        
        public constructor() {
            super();
            this.top = 0;
            this.left = 0;
            this.right = 0;
            this.bottom = 0;
            this.skinName = "resource/app_skin/cardMemory/CardMemoryUIMoudleSkin.exml";
        }
        
        createComplete(event: egret.Event): void {
            if (!smallGame.getCoin()) {
                smallGame.setCoin(0);
            }
            this.moneyLabel.text = smallGame.getCoin().toString();
            if(egret.localStorage.getItem(this.historyHighScoreName)) {
                this.historyHighScoreLabel.text = egret.localStorage.getItem(this.historyHighScoreName) + "分";
            }else {
                this.historyHighScoreLabel.text = "0分";
                egret.localStorage.setItem(this.historyHighScoreName, "0");
            }
            // this.applyBlur(this.bg);
            // this.applyBlur(this.rolebg);背景模糊化
            super.createComplete(event);
            this.changeSence(GAME_SCENE.RULE);
            this.bindButton(this.gameButton);
            this.bindButton(this.closeButton);
            this.bindButton(this.retryButton);
        }
        
        touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget;
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
        }
        
        private onClickGameButton(): void {
            if (this.curScene == GAME_SCENE.RULE) {
                this.changeSence(GAME_SCENE.PLAY);
            }else if (this.curScene == GAME_SCENE.PLAY) {
                if (this.gameChoosing) return;
                this.startGameChoose();
            }
        }
        
        private changeSence(scene: GAME_SCENE): void {
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
        }
        
        private cleanGameData(): void {
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
        }
        
        private startGameRemember(): void {
            //开始游戏 扣除游戏币
            this.initDeck();
            this.topTipLabel.visible = false;
            this.countDownLabel.visible = true;
            this.countDownTitle.visible = true;
            this.countDown = 30;
            this.countDownLabel.text = this.countDown + "秒";
            this.countDownTimer = new egret.Timer(1000,this.countDown);
            this.countDownTimer.addEventListener(egret.TimerEvent.TIMER,this.countDownFunc,this);
            this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.countDownComFunc,this);
            this.countDownTimer.start();
            this.gameButtonLabel.source =  "img_word_gameUI_tqgp_png";
            this.gameButton.alpha = 1;
//            this.gameButton.enabled = true;
            this.gameButton.touchEnabled = true;
        }
        
        private countDownFunc(): void {
            this.countDown--;
            this.countDownLabel.text = this.countDown + "秒";
        }
        
        private countDownComFunc(): void {
            this.startGameChoose();
        }
        
        private initDeck(): void {
            this.tabelDeck = [];
            for(var i = 0;i < 9;) {
                var random = Math.floor(Math.random() * 52 + 1);
                for(var j = 0;j < this.tabelDeck.length;j++) {
                    if(this.tabelDeck[j] == random) break;
                }
                if(j == this.tabelDeck.length) {
                    this.tabelDeck.push(random);
                    i++;
                }
            }
            this.tabelDeck = this.tabelDeck.concat(this.tabelDeck);
            for(var i = 0;i < this.tabelDeck.length;i++) {
                var random = Math.floor(Math.random() * this.tabelDeck.length);
                var temp = this.tabelDeck[i];
                this.tabelDeck[i] = this.tabelDeck[random];
                this.tabelDeck[random] = temp;
            }
            this.initTabel();
        }
        
        private startGameChoose(): void {
            this.gameChoosing = true;
            this.gameButton.touchEnabled = false;
            this.gameButton.alpha = 0.4;
            this.countDownTimer.stop();
            this.countDownLabel.visible = false;
            this.countDownTitle.visible = false;
            
            this.gameCountTimer = new egret.Timer(1000, 0);
            this.gameCountTimer.addEventListener(egret.TimerEvent.TIMER,function() {
                this.usedTime++;
                this.usedTimeLabel.text = this.usedTime + "秒";
            },this);
            this.gameCountTimer.start();
            
            for (var i = 0; i < this.tableCardArray.length; i++) {
                this.tableCardArray[i].turnBack();
            }
        }
        
        private initTabel(): void {
            this.tabelGroup.removeChildren();
            for (var i = 0; i < this.tableSize[0] * this.tableSize[1]; i++) {
                var card = new CardMemoryCardItem(this.tabelDeck[i], this);
                this.tableCardArray.push(card);
                this.tabelGroup.addChild(card);
            }
        }
        
        public chooseCard(card: CardMemoryCardItem): void {
            if (this.chooseCardArray.length >= 2) return;
            this.chooseCardArray.push(card);
            if(this.chooseCardArray.length == 2) {
                if(this.chooseCardArray[0] !== this.chooseCardArray[1]) {
                    if(this.chooseCardArray[0].index == this.chooseCardArray[1].index) {
                        this.chooseCardArray[0].visible = this.chooseCardArray[1].visible = false;
                        this.chooseSuccessNumber++;
                        this.showTipLabel(true);
                        if (this.chooseSuccessNumber == 9) this.win();
                    }else {
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
        }
        
        private win(): void {
            this.gameCountTimer.stop();
            this.getWinResult();
            this.loseGroup.visible = false;
            this.winGroup.visible = true;
            this.changeSence(GAME_SCENE.RESULT);
        }
        
        private getWinResult(): void {
            this.memoryTimeRSLabel.text = (30 - this.countDown).toString();
            this.gameTimeRSLabel.text = this.usedTime.toString();
            this.wrongTimeRSLabel.text = this.wrongCount.toString();
            var score = Math.floor((this.countDown / this.usedTime + (9 - this.wrongCount)) * 10);
            this.scoreGetRSLabel.text = score.toString();
            this.coinGetRSLabel.text =  (score * 100).toString();
            if (score > parseInt(egret.localStorage.getItem(this.historyHighScoreName))) {
                egret.localStorage.setItem(this.historyHighScoreName, score.toString());
                this.historyHighScoreLabel.text = score.toString() + "分";
            }
            //增加本地货币
        }
        
        private lose(): void {
            this.gameCountTimer.stop();
            this.winGroup.visible = false;
            this.loseGroup.visible = true;
            this.changeSence(GAME_SCENE.RESULT);
        }
        
        private showTipLabel(success: boolean): void {
            if(this.topTipLabel.visible) return;
            var text: string = success? "配对成功，请再接再厉" : "匹配失败，扣除1次错误机会";
            this.topTipLabel.text = text;
            this.topTipLabel.visible = true;
            var timer: egret.Timer = new egret.Timer(500,1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){
                this.topTipLabel.visible = false;
                },this);
            timer.start();
        }
        
        // private applyBlur(disp: egret.DisplayObject): void {
        //     var blurX: number = 3.5;
        //     var blurY: number = 3.5;
        //     var blurFilter: egret.BlurFilter = new egret.BlurFilter(blurX,blurY);
        //     disp.filters = [blurFilter];
        // }
    }
}