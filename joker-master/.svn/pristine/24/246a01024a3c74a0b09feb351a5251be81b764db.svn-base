/**
 * Created by JiangTao on 2016/7/1.
 */
module fiveCard {

    export enum STATUS {
        open,run,over
    }

    export class FiveCardUIModule extends app.base.BaseWndUIMoudleComponent {

        cardBox:eui.Group;
        consumeBar:eui.Group;
        btnBars:eui.Group;
        chrooseBar:eui.Group;

        btnStart:eui.Group;
        btnClose0:eui.Image;
        btnAgin:eui.Group;
        descGroup:eui.Group;
        reportGroup:eui.Group; //成绩单

        chrooseBtn1:fiveCard.ChrooseItemButton;
        chrooseBtn2:fiveCard.ChrooseItemButton;
        chrooseBtn3:fiveCard.ChrooseItemButton;

        yesOrNo:eui.Image;
        txtDonwTime:eui.BitmapLabel;

        txtReward:eui.Label;
        txtRightCount:eui.Label;

        //当前银子的显示
        numTxt0:eui.Label;

        /**
         * 当前随机的扑克
         */
        pkCards:playcards.CardItem[] = [];
        pkResult:playcards.CardsResult;

        /**
         * 当前的牌型选择按钮
         */
        chrooseBtns:fiveCard.ChrooseItemButton[] = [];

        /**
         * 当前游戏的状态
         */
        status:number = fiveCard.STATUS.open;

        /**
         * 游戏时间
         */
        GAME_TIME:number = 60;
        TIME:number = 0;

        //计时器
        intervalId:number = 0;

        //正确的次数
        RIGHT_COUNT:number = 0;

        /**
         * 消耗
         */
        CONSUME:number = 1000;

        constructor(){
            super();
            this.skinName = "resource/app_skin/fiveCard/FiveCardUIModuleSkin.exml";
            __REGISTER_PROXY(fiveCard.FiveCardProxy);
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.bindButton(this.btnStart);
            this.bindButton(this.btnAgin);
            this.bindButton(this.btnClose0);

            this.chrooseBtns = [
                this.chrooseBtn1,this.chrooseBtn2,this.chrooseBtn3
            ];

            this.chrooseBar.addChild(this.chrooseBtn1);
            this.chrooseBar.addChild(this.chrooseBtn2);
            this.chrooseBar.addChild(this.chrooseBtn3);

            this.bindButton(this.chrooseBtn1);
            this.bindButton(this.chrooseBtn2);
            this.bindButton(this.chrooseBtn3);

            for(var i:number = 0; i != fiveCard.getProxy().COUNT; i++) {
                 var cardItem:playcards.CardItem = new playcards.CardItem();
                 this.pkCards.push(cardItem);
                 this.cardBox.addChild(cardItem);
            }

            var silverCount:number = smallGame.getCoin();
            this.numTxt0.text = silverCount.toString();


        }

        opening():void {
            this.changeState();
        }

        timeBegin():void {
            this.txtDonwTime.text = Math.max(0,this.GAME_TIME).toString();
            if(this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
                this.intervalId = 0;
            }

            this.intervalId = egret.setInterval( ()=>  {
                this.TIME++;
                this.txtDonwTime.text = Math.max(this.GAME_TIME - this.TIME,0).toString();
                if(this.GAME_TIME - this.TIME <= 0) {
                    this.gameOver();
                }
            },this,1000);
        }

        //游戏结速
        gameOver():void {

            egret.clearInterval(this.intervalId);
            this.intervalId = 0;
            this.setStatus(STATUS.over);

            this.txtRightCount.text = this.RIGHT_COUNT.toString() + "次";
            this.txtReward.text = String(this.RIGHT_COUNT * 50);

            var silverCount:number = smallGame.getCoin(this.RIGHT_COUNT * 50);
            this.numTxt0.text = silverCount.toString();
        }

        startGame():void {
           this.RIGHT_COUNT = 0;
           this.TIME = 0;
           this.next();
           this.timeBegin();

           var silverCount:number = smallGame.getCoin();
           this.numTxt0.text = silverCount.toString();
        }

        next():void {
            var cardNums:number[] = fiveCard.getProxy().randomCard();
            for(var i:number = 0; i != fiveCard.getProxy().COUNT; i++) {
                this.pkCards[i].setCardId(cardNums[i]);
            }

            this.pkResult = playcards.getProxy().getCardResult(cardNums);
            var rt:number = this.pkResult.type;
            var otTypes:number[] = [];

            while(true) {
                var rdt:number = Math.round(Math.random() * 9);
                if(otTypes.indexOf(rdt) == -1 && rdt != rt) {
                    otTypes.push(rdt);
                    if(otTypes.length == 2) {
                        break;
                    }
                }
            }

            var rs:number[] = [];
            var pos:number = Math.round(Math.random() * 2);
            if(pos == 0) {
              rs[0] = rt; rs[1] = otTypes[0]; rs[2] = otTypes[1];  
            }  
            else if(pos == 1) {
                rs[0] = otTypes[0]; rs[1] = rt; rs[2] = otTypes[1];
            }
            else {
                rs[0] = otTypes[0]; rs[1] = otTypes[1]; rs[2] = rt;
            }

            this.chrooseBtns[0].setTypeData(rs[0]);
            this.chrooseBtns[1].setTypeData(rs[1]);
            this.chrooseBtns[2].setTypeData(rs[2]);
        }

        changeState() {
            if(this.status == STATUS.open) {
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
            else if(this.status == STATUS.run) {
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
        }

        setStatus(val:number):void {
            this.status = val;
            this.changeState();
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            if(tag == this.btnStart) {
               this.runGame();
            }
            else if(tag == this.btnAgin) {
               this.runGame();
            }
            else if(tag == this.btnClose0) {
                this.close();
            }
            else if(tag == this.chrooseBtns[0] || tag == this.chrooseBtns[1] || tag == this.chrooseBtns[2]) {
                var type:number = (<ChrooseItemButton>tag).typeData;
                var chroose_result:boolean = type == this.pkResult.type;

                /**选择错误倒计时-3秒 */
                if(!chroose_result) {
                    this.TIME += 3;
                } 

                this.rightOrError(chroose_result);
                this.next();
            }
        }

        runGame():void {
            var silver = smallGame.getCoin();
            if(silver > this.CONSUME) {
                this.setStatus(STATUS.run);
                smallGame.getCoin(-this.CONSUME);
                this.startGame();
            } 
            else {
                tip.popSysTopTip("您的银子不足不能进行游戏，请去其它游戏赚点再来玩吧！");
            }
        }

        dispose():void {
            __REMOVE_PROXY(fiveCard.FiveCardProxy);
            while(this.pkCards.length > 0) {
                this.pkCards.shift().removeFromParent(true);
            }

            if(this.intervalId > 0) {
                egret.clearInterval(this.intervalId);
                this.intervalId = 0;
            }

            egret.Tween.removeTweens(this.yesOrNo);
            super.dispose();
        }

        rightOrError(val:boolean):void {
            if(val) this.RIGHT_COUNT++;
            if(val) this.yesOrNo.source = "img_word_gameUI_playxzzq_png";
            else    this.yesOrNo.source = "img_word_gameUI_playxzcw_png";

            egret.Tween.removeTweens(this.yesOrNo)
            egret.Tween.get(this.yesOrNo)
            .set({alpha:1})
            .wait(500)
            .to({alpha:0},300,egret.Ease.sineOut);
        }
    }
}