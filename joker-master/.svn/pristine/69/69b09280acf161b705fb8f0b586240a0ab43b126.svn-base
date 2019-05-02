module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardsUIEffect {
        public view: PlayCardsUIMoudleComp;
        private allbets: number[];
        private allVO: appvos.GameEndInfoVO[];
        private isturnover: boolean;
        /*正在播放结算动画*/
        public isPlayover: boolean;
        // private armature: dragonBones.FastArmature;//发牌动画
        // public fapaimv: egret.MovieClip;//发牌动画
        public fapaimv: gameabc.MovieClip;//发牌动画
        public eyemv: gameabc.MovieClip;//眨眼动画
        private cardx: number = 560;//发牌x
        private cardy: number = 230;//发牌y;
        private playtime: number = 0.15;//发单张牌时间
        private isSaveVideo: boolean;//录像是否保存
        public constructor(view: PlayCardsUIMoudleComp) {
            this.view = view;
            // this.fapaimv = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("fapai"));
          
            //  var factory: dragonBones.EgretFactory = getProxy().dBfactory;
            // var key: string = "dbfapai";
            // if (factory.getDragonBonesData(key) == null) {
            //     factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(RES.getRes("dbfapai_json")),key)

            //     factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(RES.getRes("dbfapai_texture_png"),RES.getRes("dbfapai_texture_json")),key)
            // }
            //  var bonedata = factory.getDragonBonesData(key); 
            // var armature = this.armature = factory.buildFastArmature("Armature", key);//bonedata.armatureDataList[1].name
            // view.tableGroup.addChildAt(armature.display, 1); 
            // armature.display.scaleX = 2;
            // armature.display.scaleY = 2;
            // armature.display.x = 566;
            // armature.display.y = 150;
            // armature.animation.advanceTime(0);

        }
        public show(): void {
            if (this.fapaimv)
                this.fapaimv.removeFromParent(true);     
            this.fapaimv = new gameabc.MovieClip(getProxy().getTextures("fapai"), 32);
            this.view.tableGroup.addChildAt(this.fapaimv, 1);
            // this.fapaimv.x = 502;
            // this.fapaimv.y = 197;
            if (this.eyemv)
                this.eyemv.removeFromParent(true); 
            this.eyemv = new gameabc.MovieClip(getProxy().getTextures("mv_play_dealer"));
            this.view.tableGroup.addChildAt(this.eyemv, 1);
            // this.eyemv.x = 543;
            // this.eyemv.y = 111;
            this.eyemv.loopdelayTime = 3;
            this.eyemv.loop = true;
            this.eyemv.play(-1);
            egret.Tween.removeTweens(this.view);
            this.view.alpha = 0;
            egret.Tween.get(this.view).to({ alpha: 1 }, 300);
        }
        /**播放发牌 */
        private playArmature(totletime: number, delay: number = 0): void {
            if (this.fapaimv.visible) {
                if (delay > 0) gameabc.setTimeout(this.addClock, this, delay);
                else this.addClock();
                gameabc.setTimeout(this.stopArmature, this, totletime + delay - 30);
            }

        }
        private addClock(): void {
            // var armature = this.armature;
            //  var curAnimationName = armature.animation.animationList[0];
            // armature.animation.gotoAndPlay(curAnimationName);
            // dragonBones.WorldClock.clock.add(armature);

            this.fapaimv.play(-1);
        }
        /**停止发牌 */
        private stopArmature(): void {
            // var armature = this.armature;
            //  var curAnimationName = armature.animation.animationList[0];
            //  armature.animation.gotoAndStop(curAnimationName,0);
            // dragonBones.WorldClock.clock.remove(this.armature);
            // this.armature.advanceTime(1);

            // this.fapaimv.gotoAndStop(0);
            this.fapaimv.stopAt(0);
            // egret.Ticker.getInstance().unregister(this.armatureAdvanceTime, this);
        }
        // private armatureAdvanceTime(time:number): void{
        //     dragonBones.WorldClock.clock.advanceTime(time/1000);
        // }
        /**
          * 显示公共牌 新的一圈开始
          * @param cards
          */
        public addGlobalCards(cards: number[], allbets: number[], playeffect: boolean = true): void {
            
            this.allbets = allbets;
            var delay: number = 0;
            if (getTableVO().gameStatus != getProxy().GAME_STATUS_PERFLOP) {
                delay = this.getAllMoney(playeffect);
                if (playeffect) {
                    getProxy().nowMaxBet = 0;
                    getProxy().nowMaxAddBet = getTableVO().bbBet;
                    getProxy().nowMaxAddBetAll = 0;
                }
            }
            if (delay == 0) {
                this.setalldata();
            }
            for (var i: number = 0; i < 5; i++) {
                if (this.view.allCard[i].parent == null)
                    break;
            }
            this.isturnover = false;
            playeffect = playeffect && this.fapaimv.visible;
            for (var j: number = 0; j < cards.length; j++) {
                var card: CardItem = this.view.allCard[i + j];
                if (card) {
                    if (playeffect ) {
                        card.setBackId(cards[j]);
                        var img: MoveImage = MoveImage.fromPool();
                        img.source = CardItem.backSrc;//"card-1-0_png";
                        img.soundSrc = utils.SoundUtils.fapai;
                        img.scaleX = img.scaleY = 0.4;
                        this.view.effectui.addChild(img);
                        img.data = card;
                        this.view.setChildVisable(card, true, this.view.allcardsGroup);
                        card.visible = false;
                        img.goto(this.cardx, this.cardy, card.x + this.view.allcardsGroup.x, card.y + this.view.allcardsGroup.y, delay + j * this.playtime, this.turnovercard, this, [img])
                    } else {
                        card.hideLight();
                        card.setCardId(cards[j]);
                        this.view.setChildVisable(card, true, this.view.allcardsGroup);
                    }
                }
            }
            if (j > 0 && playeffect) this.playArmature(j * this.playtime * 1000, delay * 1000);
            if (getTableVO().gameStatus == getProxy().GAME_STATUS_PERFLOP) {
                var isTalk: boolean = Math.random() < 0.1;
                if (isTalk) {
                    var talkDelay: number = (delay + getTableVO().tableSize*0.2 + Math.random()*2 + 1) * 1000;
                    this.dealerNormalTalk(talkDelay);
                }
            }
            if (!playeffect || cards.length == 0) {
                this.turnovercard(null);
            }
            if (this.view.safecomp &&getProxy().buySafe ==1){
                this.view.safecomp.showGlobalCards();
           }
        }
        /**加筹码动画 */
        public showAddBet(seatid: number, bet: number, addbet: number): void {
            if (addbet > 0) {
                var rm: PlayCardMoneyComp = this.view.allmoney[seatid];
                var money: MoveImage = MoveImage.fromPool();
                money.source = PlayCardMoneyComp.getIcon(addbet, false);
                this.view.effectui.addChild(money);
                money.goto(this.view.allItem[seatid].x + 50, this.view.allItem[seatid].y + 60, rm.x, rm.y, 0, this.view.showBetNum, this.view, [seatid, bet], 0.3);
            } else this.view.showBetNum(seatid, bet);
        }
        // /**回合结束 收筹码 */
        // public turninfo(allbets: number[],playeffect: boolean): void{
        //     this.allbets = allbets;
        //     if (getTableVO().gameStatus != getProxy().GAME_STATUS_PERFLOP) 
        //          this.getAllMoney(playeffect);
        // }
        /*收筹码动画*/
        private getAllMoney(playeffect: boolean): number {
            var delay: number = 0;
            for (var i: number = this.view.effectui.numChildren - 1; i > -1; i--) { //移除正在加筹码动画
                var item = this.view.effectui.getChildAt(i);
                if (item instanceof MoveImage && item.recallfun == this.view.showBetNum) {
                    item.stop();
                }
            }

            var tableSize = getTableVO().tableSize;
            for (var i: number = 0; i < tableSize; i++) {
                this.view.allItem[i].restturn();
                var money = this.view.allmoney[i]
                if (money.parent) {
                    if (playeffect) {
                        this.view.setChildVisable(money, false, this.view.tableGroup);
                        var img: MoveImage = MoveImage.fromPool();
                        img.source = money.getIconSource();//"icon_play_zhuomianchouma_png";
                        img.delayremove = 0.3;
                        this.view.effectui.addChild(img);
                        if (delay == 0) {
                            img.goto(money.x, money.y, this.view.sidepot.x, this.view.sidepot.y, 0, this.setalldata, this)
                            delay = 0.25 + 0.3;
                        } else {
                            img.goto(money.x, money.y, this.view.sidepot.x, this.view.sidepot.y - i * 3)
                        }
                    }
                }
            }
            if (delay > 0) utils.SoundUtils.playEffectSound(utils.SoundUtils.chipfly);
            return delay;
        }
        private turnovercard(item: MoveImage): void {
            if (item != null) {
                item.data.visible = true;
                item.data.turnOver();
            }
            if (!this.isturnover) {
                this.isturnover = true;
                this.view.playComp.setBtns();
                if (getProxy().mySeat > -1)
                    this.view.allItem[getProxy().mySeat].showCardType();
            }
            if (getProxy().safeResult != null) {//有人买保险
                if (getProxy().safeResult[1] > 0) {
                    this.showSafeItem(getProxy().safeResult[0], getProxy().safeResult[1]);
                }
                getProxy().safeResult = null;    
            }
                        
        }
        //        private showTween(target:egret.DisplayObject,fromx:number,fromy:number,tox:number,toy:number){
        //            target.x = fromx;
        //            target.y = fromy;
        //            egret.Tween.get(target).to({ x: tox,y: toy},300)
        //        }
        public setalldata(): void {
            this.view.sidepot.setalldata(this.allbets);
        }
        /**显示保险赔付 */
        public showSafeItem(seat:number,result:number): void{
            var item = this.view.allItem[seat];
            var safe: PlayCardsSafeItem = new PlayCardsSafeItem();
            item.parent.parent.addChild(safe);
            safe.showXY(item.x+3,item.y+20,FormatUtils.wan(result));
        }
        /**
      * 显示玩家牌
      * @param cards
      */
        public showPlaysCards(playeffect: boolean): void {
            var tableSize = getTableVO().tableSize;
            var banker: number = getTableVO().banker;
            var index: number;
            var item: PlayCardsItemComp;
            var img: MoveImage;
            var showindex: number = 0;
            for (var j: number = 0; j < 2; j++) {
                for (var i: number = 0; i < tableSize; i++) {
                    index = (banker + i) % tableSize;
                    item = this.view.allItem[index];
                    if (item.playvo != null && item.playvo.isPlay) {
                        if (playeffect && this.fapaimv.visible) {
                            item.showindex = 0;
                            img = MoveImage.fromPool();
                            img.source = CardItem.backSrc;// "card-1-0_png";
                            img.soundSrc = utils.SoundUtils.fapai;
                            img.scaleX = img.scaleY = 0.3;
                            this.view.effectui.addChild(img);
                            img.data = item;
                            img.goto(this.cardx, this.cardy, item.x + 120, item.y + 20, showindex * this.playtime, this.turnoveritem, this, [img]);
                        } else item.showCard(false);
                        showindex++;
                    }
                }
            }
            if (playeffect && showindex > 0) this.playArmature(showindex * this.playtime * 1000);
        }

        private turnoveritem(item: MoveImage): void {
            if (item != null)
                item.data.showCard();
            //                this.view.setChildVisable(item.data,true,this.view.tableGroup);
        }
        /**
         * 牌局结束
         * @param all
         */
        public playover(all: appvos.GameEndInfoVO[], allbets: number[], winnerCanShowCard: boolean = false): void {
            var min = getTableVO().bbBet;
            var delay: number = 0;
            this.allbets = allbets;
            if (allbets != null) {
                delay = this.getAllMoney(true);
                // this.view.sidepot.clearAll();
                getTableVO().whoplay = -1;
                getTableVO().tableStatus = 0;
                this.view.playComp.winnerCanShowCard = winnerCanShowCard;
                this.view.playComp.setBtns(true);
                this.isPlayover = true;
                this.isSaveVideo = false;
            }
            this.allVO = all;
            if (delay > 0) gameabc.setTimeout(this.showOpenCard, this, delay * 1000)
            else this.showOpenCard();
        }
        /*显示翻牌*/
        private showOpenCard(isGoOn: boolean = true): void {
            this.isSaveVideo = true;
            var all: appvos.GameEndInfoVO[] = this.allVO;
            var allbets: number[] = this.allbets;
            if (allbets != null) {//记录牌局回顾
                var allResultVO: CardResultVO[] = [];
                var allResultOBJ: Object = {};
                for (var i: number = 0, len: number = this.view.allItem.length; i < len; i++) {
                    var item: PlayCardsItemComp = this.view.allItem[i];
                    if (item.playvo && (item.playvo.isPlay || item.playvo.isFold)) {
                        var resvo: CardResultVO = new CardResultVO();
                        resvo.avatarID = item.playvo.avatarID;
                        resvo.isFold = item.playvo.isFold;
                        resvo.name = item.playvo.name;
                        resvo.globalCards = getTableVO().globalCards;
                        resvo.roleId = item.playvo.roleId;
                        resvo.bet = item.playvo.totalBet;
                        // resvo.safeAdd = item.playvo.safeAdd;
                        allResultVO.push(resvo);
                        allResultOBJ[item.playvo.seatId] = resvo;
                    }
                }
                getProxy().allResultVO = allResultVO;
            }
            var wintype: number = 0;
            var mywin: boolean = false;
            for (i = 0, len = all.length; i < len; i++) {
                var vo = all[i];
                item = this.view.allItem[vo.seatId];
                if (item.playvo) {
                    item.playvo.canContinue = vo.canContinue;
                    item.playvo.huntFlag = vo.huntFlag;
            
                    if (vo.gameResult == 1)
                        item.playvo.numWins++;
                    if (vo.gameResult == 2)
                        item.playvo.numLosts++;
                    if (vo.gameResult == 3)
                        item.playvo.numPeaces++;
                    if (vo.card.length > 0) {
                        item.playvo.myCard = vo.card;
                        item.showOpenCard(true);
                    } else if (item.playvo.myCard.length > 0)
                        item.showOpenCard(true);
                    if (allbets != null) {
                        resvo = allResultOBJ[item.playvo.seatId];
                        if (vo.winlostnum != null)
                           var  winlostnum= vo.winlostnum;
                        else winlostnum = vo.betNum - item.playvo.nowBet - item.playvo.totalBet//记录筹码变化值
                        if (winlostnum>=0 && !item.playvo.isFold) {//"赢";
                            item.showCardType(true);
                            item.showLight();
                            if (item.playvo.result) wintype = Math.max(item.playvo.result.type, wintype);
                            if (item.isMy()) mywin = true;
                        } else if (item.playvo.isFold && vo.card.length > 0) {//显示亮牌
                            item.setTopImage("img_word_play_lianpai_png");
                        } else
                            item.setTopImage(null);
                        item.showWinPect(false);
                        // item.playvo.nowBet = vo.betNum;
                        item.playvo.totalBet = winlostnum;// vo.betNum - item.playvo.nowBet - item.playvo.totalBet;//记录筹码变化值
                        if (resvo) {
                            resvo.myCard = item.playvo.myCard;
                            resvo.bet = item.playvo.totalBet;// vo.betNum-item.playvo.nowBet-item.playvo.totalBet;
                            resvo.safeAdd = vo.insurnum;
                            if (this.view.videoComp.nowvideo != null && resvo.roleId == user.getProxy().svrRoleId) {
                                var dzvo: appvos.DZRecordVO = new appvos.DZRecordVO();
                                dzvo.myCard = item.playvo.myCard;
                                dzvo.id = 0;
                                dzvo.handNum = 0;
                                dzvo.type = room.getProxy().currentType;
                                dzvo.smallBlinds = getTableVO().sbBet; //room.getProxy().current.smallBlinds;
                                dzvo.bigBlinds = getTableVO().bbBet;// room.getProxy().current.bigBlinds;
                                dzvo.roleId = user.getProxy().svrRoleId;
                                dzvo.winNum = resvo.bet;
                                record.getProxy().addRecord(dzvo, this.view.videoComp.nowvideo);
                                win.getProxy().playOven(resvo.bet, dzvo.bigBlinds);
                                resvo.record = dzvo;
                                this.view.videoComp.endVideo();
                            }
                        }
                    }
                }
                // item.playover(); 
                item.removeCD();
            }
            if (allbets == null) {//显示胜率

            } else if (isGoOn) {
                var play: boolean = PlaycardsTypeEffect.showType(wintype, this.view.effectui);
                if (!play && mywin) this.playMyWin();
                if (allbets.length < 4)
                    this.betTime = 1200;
                else this.betTime = 300;
                this.showBetEffect();
            }

        }
        /*刷新胜率*/
        public showPect(): void {
            playcards.getProxy().updateRate();
            for (var i: number = 0, len = this.view.allItem.length; i < len; i++) {
                var item = this.view.allItem[i];
                item.showWinPect();
            }
        }
        /**玩家亮牌 */
        public showOverOpenCard(vo: appvos.GameEndInfoVO): void {
            var item = this.view.allItem[vo.seatId];
            if (item.playvo) {
                if (vo.card.length > 0) {
                    item.playvo.myCard = vo.card;
                    item.showOpenCard(true);
                } else if (item.playvo.myCard.length > 0)
                    item.showOpenCard(true);
                if (getProxy().allResultVO) {
                    var resvo: CardResultVO = getProxy().allResultVO[item.playvo.seatId];
                    if (resvo) resvo.myCard = item.playvo.myCard;
                }

            }
        }
        private betTime: number = 300;
        /*分奖池动画 */
        private showBetEffect(): void {
            if (this.allbets.length > 0) {
                var bet = this.allbets.pop();
                var lastmoney = this.view.sidepot.removeLastMoney();
                var src = PlayCardMoneyComp.getIcon(bet, false);
                var all: appvos.GameEndInfoVO[] = this.allVO;
                var index: number = this.allbets.length;
                var allset: number[] = [];
                if (lastmoney != null) {
                    for (var i: number = 0, len: number = all.length; i < len; i++) {
                        var vo = all[i];
                        for (var j: number = 0, jlen: number = vo.winPool.length; j < jlen; j++) {
                            if (vo.winPool[j] == index) {
                                allset.push(vo.seatId);
                                var item = this.view.allItem[vo.seatId];
                                if (item == null) {
                                    continue;
                                }
                                for (var k: number = 0; k < 3; k++) {
                                    var img: MoveImage = MoveImage.fromPool();
                                    img.delayremove = 0.3;
                                    img.source = src;//"icon_play_zhuomianchouma_png";
                                    this.view.effectui.addChild(img);
                                    img.goto(this.view.sidepot.x + lastmoney.x, this.view.sidepot.y + lastmoney.y, item.x + 50, item.y + 100, 0.15 * k, null, null, null, 0.40);
                                }
                            }
                        }
                    }
                }

                if (allset.length > 0) {
                    var add: number = Math.floor(bet / allset.length)
                    for (i = 0, len = allset.length; i < len; i++) {
                        var item = this.view.allItem[allset[i]];
                        if (item.playvo) {
                            item.playvo.nowBet += add;
                            item.refMoneylab();
                            if (item.isShowLight() && item.playvo.result != null) {//显示牌型
                                for (k = 0; k < 5; k++) {
                                    this.view.allCard[k].setResult(item.playvo.result);
                                }
                                var islight = item.card1.setResult(item.playvo.result);
                                if (!item.card2.setResult(item.playvo.result) && islight)
                                    item.changeCardIndex();
                            }
                        }
                    }
                }
                if (this.allbets.length > 0)
                    gameabc.setTimeout(this.showBetEffect, this, this.betTime);
                else
                    gameabc.setTimeout(this.showAllAddBet, this, 300);
            } else this.showAllAddBet();
        }
        private showAllAddBet(): void {
            var all: appvos.GameEndInfoVO[] = this.allVO;
            var hasleave: boolean;
            var hunter: number[] = [];
            var hunted: number[] = [];
            for (var i: number = 0, len: number = all.length; i < len; i++) {
                var vo = all[i];
                var item = this.view.allItem[vo.seatId];
                if (item.playvo) {
                    if (item.playvo.totalBet > 0) {//"飘字";
                        var text: MoveText = MoveText.fromPool();
                        text.text = "+" + FormatUtils.wan(item.playvo.totalBet);
                        text.width = 120;
                        this.view.effectui.addChild(text);
                        text.goto(item.x, item.y + 30, item.x, item.y - 20);
                    }
                    item.playvo.nowBet = vo.betNum;
                    item.refMoneylab();
                    /**模拟显示sng结算*/
                    // if (room.getProxy().currentType == room.TYPE.SNG && item.playvo.seatId == getProxy().mySeat) {
                    //     console.log("betNum=" + vo.betNum);
                    //     if (vo.betNum < -2) {
                    //         __OPEN_MOUDLE(AppReg.SNG_RESLUT, -vo.betNum);
                    //     }
                    // }
                    if (vo.betNum <= 0) {//有人淘汰
                        hasleave = true;
                        if (vo.gameResult == 2) hunted.push(vo.seatId);
                    }
                    if (vo.gameResult == 1) hunter.push(vo.seatId);
                }
                item.playover();
            }
            if (hasleave && room.getProxy().currentType == room.TYPE.SNG) {
                this.showCurrentRankTip();
            }
            utils.SoundUtils.playEffectSound(utils.SoundUtils.jiesuantishi);
            this.view.checkBanker();
            gameabc.setTimeout(this.checkHurt, this, 1000);
        }
        private checkHurt(): void {
            var myhunt: boolean = getProxy().mySeatvo != null && getProxy().mySeatvo.huntFlag == 1;//我是猎杀者
            if (!myhunt) this.checkWait();
            else {
                this.view.allItem[getProxy().mySeatvo.seatId].showHuntMC();
                egret.setTimeout(()=>this.checkWait(), this, 2000, true);
                var huntedNumber: number = 0;
                for (var i: number = 0, len: number = this.view.allItem.length; i < len; i++) {
                    var itemvo: appvos.SeatPlayerVO = this.view.allItem[i].playvo;
                    if (itemvo != null) {
                        if (myhunt && (itemvo.huntFlag == 2 || itemvo.huntFlag == 1)) {//播放猎杀效果的
                            if (itemvo.huntFlag == 2) {//被猎杀 播放特效
                                huntedNumber++;
                                this.view.allItem[itemvo.seatId].showHuntedMC();
                                this.view.allItem[itemvo.seatId].resizeCard(1);
                            }
                        }
                        itemvo.huntFlag = 0;//重置 
                    }
                }
                if (huntedNumber > 0) {
                    //  tip.popSysCenterTip("恭喜你成功猎杀" + huntedNumber + "个对手");
                    this.showHuntLabel(huntedNumber);
                }
            }
        }
        /***结算动画播放结束 */
        public checkWait(): void {
            this.isPlayover = false;
            this.view.checkdealer();
            this.view.showWait();
            __SEND_NOTIFICATION(antiSystem.AntiMediator.ALERT_3HOUR);
            if (getProxy().playvideovo != null) {
                this.view.videoComp.playover();
            }
            for (var i: number = 0, len: number = this.view.allItem.length; i < len; i++) {
                var item: PlayCardsItemComp = this.view.allItem[i];
                if (item.playvo && item.playvo.outType > -1) {
                    this.view.removeSeat(item.playvo.seatId, item.playvo.outType);
                }
            }
            if (getProxy().nextLeave) { // 如果下局离开则离开牌局
                getProxy().outbakfun();
            }
             getProxy().safeResult = null;  
        }
        /**结束特效播放 */
        public playOverEnd(): void {
            gameabc.clearAllTimeout();
            if (!this.isSaveVideo) this.showOpenCard(false)
            this.view.effectui.removeChildren();
            var all: appvos.GameEndInfoVO[] = this.allVO;
            this.allbets = null;
            this.view.sidepot.clearAll();
            this.checkWait();
        }
        /**
         * 弃牌
         * @param item
         */
        public playfold(item: PlayCardsItemComp): void {
            var img: MoveImage;
            for (var i: number = 0; i < 2; i++) {
                img = MoveImage.fromPool();
                img.source = CardItem.backSrc;//"card-1-0_png";
                img.scaleX = img.scaleY = 0.3;
                this.view.effectui.addChild(img);
                img.data = item;
                img.goto(item.x + 50 + i * 40, item.y + 50, this.cardx, this.cardy, 0, null, null, null, 0.45);
            }
            var isTalk: boolean = Math.random() < 0.05;
            if (this.isFlodTalk && isTalk) {
                var talkDelay: number = (Math.random()*2 + 1) * 1000;
                this.dealerNormalTalk(talkDelay);
            }
        }
        /** 播放我赢*/
        public playMyWin(): void {
            // var mv = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("youwin"));
            //     mv.x = 568;
            //    mv.y = 370;
            var mv = new gameabc.MovieClip(getProxy().getTextures("shengli"));
             mv.x = 201;
            //mv.x = 320;
            mv.y = 236;
            //    mv.scaleX = mv.scaleY = 1.5;
            mv.addEventListener(egret.Event.COMPLETE, this.hideMovieClip, this);
            this.view.effectui.addChild(mv);
            mv.play(1);
            utils.SoundUtils.playEffectSound(utils.SoundUtils.ying);
        }
        // private hideMyWin(evt: egret.Event): void {
        //     evt.target.removeFromParent(true);
        // }
        public sendMess: MessItem;
        /**播放打赏 */
        public playdashang(seat: number, mess: string,gift:number[]): void {
            if (seat > -1) {
                var item = this.view.allItem[seat];

                var img: PlayCardMoneyComp = PlayCardMoneyComp.fromPool();
                img.isMany = true;
                var rewardData = room.getProxy().rewardData;
                var mlNum = rewardData[0] * room.getProxy().current.charmList[0];
                if (mlNum) {
                    img.setMoney(mlNum);
                } else {
                    img.setMoney(getTableVO().bbBet);
                }

                img.x = item.x + 50;
                img.y = item.y + 60;
                egret.Tween.get(img).to({ x: this.view.sidepot.x, y: this.fapaimv.y }, 1500, egret.Ease.circOut).call(this.removMoney, this, [img, seat])
                //  img.source = PlayCardMoneyComp.icon + "0_png";//"icon_play_zhuomianchouma_png";
                this.view.effectui.addChild(img);
                 this.rewardDataTxt(this.view.allItem[seat],gift);//打赏魅力
                //   img.goto(item.x+50, item.y+60, this.view.sidepot.x, this.fapaimv.y,0,null,null,null,0.5); 
            }
            this.showMess(605, 95, gameabc.ResourceBundleUtil.getMessage(mess), this.fapaimv.parent,"left");
        }
        /**显示提示文字
         *
         *currentState left right bottom top
         */
        public showMess(x,y,mess,parent,currentState): void{
            if (this.sendMess == null) {
                this.sendMess = new MessItem();
                parent.addChild(this.sendMess);
            }else  if (parent != this.sendMess.parent) {
                this.sendMess.removeFromParent();
                parent.addChild(this.sendMess);
            }
            this.sendMess.showXY(x,y,mess,currentState);
        }
        /**播放荷官送礼 */
        public playGift(roleid: number,char:number ): void{
            if (getProxy().getMyJoin()) {
                var data = getProxy().getGiftdata(char);
                if (data) {
                    if (data.type == 1) {
                          var face = new MagicFaceItem(data.label);
                          this.view.effectui.addChild(face);                  
                         face.show(1000, 640, 560, 200);
                    } else {
                        var mv = new gameabc.MovieClip(getProxy().getGiftTextures(data.label));
                        mv.x = Math.random()*800+100;
                        mv.y = Math.random()*400+100;
                        mv.addEventListener(egret.Event.COMPLETE, this.hideMovieClip, this);
                        this.view.effectui.addChild(mv);
                        mv.play(1);
                    }
                    this.view.playComp.addMess(roleid,"", char);
                }
            } else {
                
            }
        }
        /** 荷官说话 */
        isFlodTalk: boolean  = true;
        dealerNormalTalk(talkDelay: number = 0) {
            var talkTypes: string[] = ["CHAT_407", "CHAT_408", "CHAT_411"];
            var talkType: number = Math.floor(Math.random()*3);
            egret.setTimeout(this.dealerTalk, this, talkDelay, talkTypes[talkType], true);
        }
        dealerCDOverTalk() {
            this.isFlodTalk = false;
            var talkDelay: number = Math.random()*2 + 1;
            var talkTypes: string[] = ["CHAT_409", "CHAT_410"];
            var talkType: number = Math.floor(Math.random()*2);
            egret.setTimeout(this.dealerTalk, this, talkDelay, talkTypes[talkType], true);
        }
        dealerTalk(mess: string) {
            if (room.getProxy().currentType == -1 ||
                room.getProxy().currentType == room.TYPE.SNG ||
                room.getProxy().currentType == room.TYPE.MTT ||
                room.getProxy().currentType == room.TYPE.FREE ||　room.getProxy().current.maxBank <= 10000) return;
            this.isFlodTalk = true;
            this.showMess(605, 95, gameabc.ResourceBundleUtil.getMessage(mess),this.fapaimv.parent,"left")
            // if (this.sendMess == null) {
            //     this.sendMess = new MessItem(this, gameabc.ResourceBundleUtil.getMessage(mess));
            //     this.fapaimv.parent.addChild(this.sendMess);
            // }
            // this.sendMess.showXY(605, 95, gameabc.ResourceBundleUtil.getMessage(mess));
        }
        /**财神中奖 */
        public getMoney(seat: number, num: number): void{           
            // var px = (1136 - AppGlobal.stageFullWidth) * 0.5 + 50;
            // var py = AppGlobal.stageFullHeight - (768 - AppGlobal.stageFullHeight) * 0.5 - 90;
           var p = this.view.playComp.btnCaiShen.localToGlobal(0, 0);
           p = this.view.effectui.globalToLocal(p.x, p.y);
           var item = this.view.allItem[seat]; 
            for (var i: number = 0; i < 5; i++){
                var moveimg = MoveImage.fromPool();
                moveimg.source = "icon_caoma_png";
                this.view.effectui.addChild(moveimg);
                var move = moveimg.move;
                var time = 40 + Math.random() * 10;
                // moveimg.move = new gameabc.ParabolaMove(time, 0.1);
                moveimg.goto(p.x+20, p.y+20, item.x + 50,  item.y + 60, 0.05*i, i==4?this.moneymoveComp:null,  i==4?this:null,[seat,num],0.5);
            }
              
        }
        private moneymoveComp(seat:number,num:number): void {
            // moveimg.alpha = 1;
             var item = this.view.allItem[seat];
             var text: MoveLabel = MoveLabel.fromPool();
            //  text.text = "+" + FormatUtils.wan(num);
             text.textFlow = utils.HtmlTextUtils.appendHtmlText(null, "+" +  FormatUtils.wan(num), AppConst.TextColors.yellow);
            text.width = 120;
            this.view.effectui.addChild(text);
            text.goto(item.x, item.y + 30, item.x, item.y - 30);
        }
        
        private removMoney(img: PlayCardMoneyComp, seat: number): void {
            egret.setTimeout(function () {
                img.removeFromParent();
                PlayCardMoneyComp.toPool(img);
            }, null, 300);
            var item = this.view.allItem[seat];
            var moveimg = MoveImage.fromPool();
            moveimg.source = "btn_play_dashang1_png";
            // moveimg.alpha = 0.3;
            // moveimg.scaleX = moveimg.scaleY = 0.5;
            this.view.effectui.addChild(moveimg);
            // var move = moveimg.move;
            // moveimg.move = new gameabc.ParabolaMove(120, 0.1);
            moveimg.goto(this.cardx - 20, this.cardy - 100, item.x + 35, item.y + 60,0,null,null,null,0.8);//, 0, this.moveComp, this, [moveimg, move], 120
        }
        // private moveComp(moveimg: MoveImage, move): void {
     
        //     moveimg.move = move;
        // }
        private showMyTurnTweenTime: number = 130;
        /***轮到我 */
        public showIsMyTurn(value: boolean): void {
            if (value) {

                // this.view.mainview.y = 0;
                // egret.Tween.get(this.view.mainview).to({ y: -this.view.height }, 300);
                this.tweenHideWnd();
                this.view.playComp.leftbtns.y = 90;
                this.view.playComp.rightbtns.y = 90;
                this.view.setChildVisable(this.view.playComp.leftbtns, true, this.view.playComp.bottombtns);
                this.view.setChildVisable(this.view.playComp.rightbtns, true, this.view.playComp.bottombtns);
                egret.Tween.get(this.view.playComp.leftbtns).to({ y: 0 }, this.showMyTurnTweenTime);
                egret.Tween.get(this.view.playComp.rightbtns).to({ y: 0 }, this.showMyTurnTweenTime);
                __SEND_NOTIFICATION(gameabc.UIConstants.PRE_LOAD_VISABLE,false);
            } else {

                // if (this.view.mainview.y < 0) 
                //     egret.Tween.get(this.view.mainview).to({ y: 0 }, 300); 
                this.tweenShowWnd();
                this.btntweenComp();
                 __SEND_NOTIFICATION(gameabc.UIConstants.PRE_LOAD_VISABLE,true);
                //                if (this.view.leftbtns.parent != null) 
                //                    egret.Tween.get(this.view.leftbtns).to({ y: 90 },this.showMyTurnTweenTime);               
                //                if (this.view.rightbtns.parent != null)
                //                    egret.Tween.get(this.view.rightbtns).to({ y: 90 },this.showMyTurnTweenTime).call(this.btntweenComp,this);              
            }
        }
        public tweenShowWnd(): void{
            if (getProxy().buySafe==1)
                return;    
             for (var i: number = 0, len: number = this.view.mainview.numChildren; i < len; i++) {
                    var aa: any = this.view.mainview.getChildAt(i);
                    if (aa instanceof app.base.BaseUIMoudleComponent)
                        aa.uiMoudle.tweenShow();
                    else if (aa instanceof PlaycardsUIComp)
                        aa.tweenShow();
                }

        }
         public tweenHideWnd(): void{
              for (var i: number = 0, len: number = this.view.mainview.numChildren; i < len; i++) {
                    var aa: any = this.view.mainview.getChildAt(i);
                    if (aa instanceof app.base.BaseUIMoudleComponent)
                        aa.uiMoudle.tweenHide();
                    else if (aa instanceof PlaycardsUIComp)
                        aa.tweenHide();
                }
        }
        private btntweenComp(): void {
            this.view.setChildVisable(this.view.playComp.leftbtns, false, this.view.playComp.bottombtns);
            this.view.setChildVisable(this.view.playComp.rightbtns, false, this.view.playComp.bottombtns);
        }
        /**
         * 显示聊天
         * @param str
         */
        public showchat(send: number, to: number, mess: string,gift:number[]): void {
            if (to == -1) {//普通表情
                this.showItemFace(this.view.allItem[send], mess);
            } else if (to == -2) {//文字信息
                this.showItemMess(this.view.allItem[send],gameabc.ResourceBundleUtil.getMessage(mess));
            } else if (to == -3) {//旁观聊天
                this.view.playComp.addMess(send, mess);
            } else { //魔法表情
                this.showMagicFace(this.view.allItem[send], this.view.allItem[to], mess,gift);
            }
        }
        /**
         * 设置聊天表情
         * @param str
         */
        public showItemFace(send: PlayCardsItemComp, str: string): void {
            // var chatimg = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("face"));
            // chatimg.x =send.x+ 65;
            // chatimg.y = send.y + 70;
            var chatimg = new gameabc.MovieClip(getProxy().getFaceTextures(str));
            chatimg.x = send.x + 5;
            chatimg.y = send.y;
            chatimg.addEventListener(egret.Event.COMPLETE, this.hideMovieClip, this);
            send.parent.addChild(chatimg);
            // chatimg.gotoAndPlay(str, 2);
            chatimg.play(2);
        }
        private hideMovieClip(evt: egret.Event): void {
            evt.target.removeFromParent(true);
            evt.target.removeEventListener(egret.Event.COMPLETE, this.hideMovieClip, this)
        }
        /**显示魔法表情 */
        private showMagicFace(send: PlayCardsItemComp, to: PlayCardsItemComp, str: string,gift:number[]): void {
            var face = new MagicFaceItem(str);
            send.parent.addChild(face);
            if (send.isMy()) {
                this.showCharm(send, to, str,gift);
            }
            face.show(send.x + 60, send.y + 60, to.x + 60, to.y + 60);
        }
        /***魅力 */
        private showCharm(send: PlayCardsItemComp, to: PlayCardsItemComp = null, str: string = "",gift:number[]): void {
            var text: MoveLabel = MoveLabel.fromPool();

            var magiclistdata = room.getProxy().magiclistdata;
            var len: number = magiclistdata.length;
            var mlNum: number = 0;
            var mljfNum: number = 0;
            var mlNumT: number = 0;
            var mljfNumT: number = 0;
            var mStr: any;
            if (gift.length > 3) {
                mlNum = gift[0];
                mljfNum = gift[1];
                mlNumT = gift[2];
                mljfNumT = gift[3];
            } else {
                 while (--len >= 0) {
                    if (magiclistdata[len]["label"] == str) {
                        mlNum = magiclistdata[len]["charmList"][1] * room.getProxy().current.charmList[1];
                        mljfNum = magiclistdata[len]["charmList"][2] * room.getProxy().current.charmList[2];

                        mlNumT = magiclistdata[len]["charmList"][3] * room.getProxy().current.charmList[3];
                        mljfNumT = magiclistdata[len]["charmList"][4] * room.getProxy().current.charmList[4];
                    }
                }
            }
           
            this.toShowCharmTxt(send, mlNum, mljfNum);
            if (to) {
                this.toShowCharmTxt(to, mlNumT, mljfNumT);
            }
        }
        private rewardDataTxt(send: PlayCardsItemComp,gift:number[]): void {
            var rewardData = room.getProxy().rewardData;
            if (gift.length > 1){
                mlNum = gift[0];
                mljfNum = gift[1];
            } else {
                var mlNum = rewardData[1] * room.getProxy().current.charmList[1];
                 var mljfNum = rewardData[2] * room.getProxy().current.charmList[2];
            }
            this.toShowCharmTxt(send, mlNum, mljfNum);
        }
        private toShowCharmTxt(comp: PlayCardsItemComp, ml: number, mljf: number): void {
            var mStrT: any;
            var textT: MoveLabel = MoveLabel.fromPool();
            var haoS: string = "";
            if (ml > 0) {
                mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, "魅力+" + ml, AppConst.TextColors.yellow);
            } else if (ml < 0) {
                mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, "魅力" + ml, AppConst.TextColors.pink);
            }
            if (mljf > 0) {
                if (mStrT) haoS = ","
                mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, haoS + "魅力积分+" + mljf, AppConst.TextColors.yellow);
            } else if (mljf < 0) {
                if (mStrT) haoS = ","
                mStrT = utils.HtmlTextUtils.appendHtmlText(mStrT, haoS + "魅力积分" + mljf, AppConst.TextColors.pink);
            }
            if (mStrT) {
                textT.textFlow = mStrT;
                //textT.text = "魅力+100，魅力积分+100"//mStrT;
                textT.bold = true;
                textT.width = 200;
                textT.textAlign = "center"
                textT.size = 18;
                this.view.effectui.addChild(textT);
                textT.goto(comp.x - 35, comp.y + 60, comp.x - 35, comp.y - 20)
            }

        }
        /**显示文字信息 */
        public showItemMess(send: PlayCardsItemComp, str: string): void { 
            if (send.sendMess != null) {
                send.sendMess.show(send, str);
            } else {
                var mess: MessItem = new MessItem();
                send.parent.parent.addChild(mess);
                mess.show(send, str);
            }
        }

        /**测试发牌 */
        public testcard(): void {
            var tableSize = 9;
            var banker: number = 0;
            var index: number;
            var item: PlayCardsItemComp;
            var img: MoveImage;
            var showindex: number = 0;
            for (var j: number = 0; j < 2; j++) {
                for (var i: number = 0; i < tableSize; i++) {
                    index = (banker + i) % tableSize;
                    item = this.view.allItem[index];
                    img = MoveImage.fromPool();
                    img.source = CardItem.backSrc;//"card-1-0_png";
                    img.soundSrc = utils.SoundUtils.fapai;
                    img.scaleX = img.scaleY = 0.3;
                    this.view.effectui.addChild(img);
                    img.data = item;
                    img.goto(this.cardx, this.cardy, item.x + 120, item.y + 20, showindex * this.playtime);
                    showindex++;
                }
            }
            this.playArmature(showindex * this.playtime * 1000);
        }
        /**SNG淘汰提示 */
        showCurrentRankTip(): void {
            var rank: number = 1;
            var tablevo = getTableVO();
            var seatvo: appvos.SeatPlayerVO;
            var seat = getProxy().mySeat;
            var bet = getProxy().mySeatvo.nowBet;
            var num: number = 0;
            for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len; i++) {
                seatvo = tablevo.seatPlayerVO[i];
                if (seatvo.seatId != seat && seatvo.nowBet > bet) {
                    rank++;
                }
                if (seatvo.nowBet > 0)
                    num++;
            }
            //比赛结束 关闭升盲提示
            if (num <= 1) egret.clearInterval(this.view.timeoutAlertTime);
            //提示显示排名
            if (num > 1 && bet > 0) tip.popSysCenterTip("当前还剩" + num + "名选手，" + "您的排名第" + rank + "。请加油！");
        }
        /**猎杀效果 */
        // huntGunMC: gameabc.MovieClip;
        // huntSmokeMC: gameabc.MovieClip;
        // huntedAimMC: gameabc.MovieClip;
        // huntedScreenMC: gameabc.MovieClip;
        // huntSmokeInterval: number = -1;
        // showHunter(player: PlayCardsItemComp): void {
        //     var textures: Array<egret.Texture> = getProxy().getTextures("hunt_gun");
        //     this.huntGunMC = new gameabc.MovieClip(textures, 10);
        //     this.huntGunMC.x = player.x + 5;
        //     this.huntGunMC.y = player.y - 50;
        //     this.huntGunMC.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //         this.huntGunMC.stopAt(0);
        //         // egret.setTimeout(()=>this.huntGunMC.removeFromParent(true), this, 600, true);
        //     }, this);
        //     this.huntSmokeInterval = egret.setTimeout(()=>this.showSmoke(player), this, 1000);
        //     player.parent.addChild(this.huntGunMC);
        //     this.huntGunMC.delay = 1;
        //     this.huntGunMC.play(1);
        // }
        // showSmoke(player: PlayCardsItemComp): void {
        //     var textures: Array<egret.Texture> = getProxy().getTextures("hunt_smoke");
        //     this.huntSmokeMC = new gameabc.MovieClip(textures, 9);
        //     this.huntSmokeMC.x = player.x - 85;
        //     this.huntSmokeMC.y = player.y - 85;
        //     this.huntSmokeMC.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //         evt.target.removeFromParent(true);
        //         this.checkWait();
        //         //  if (player.playvo!=null&&player.playvo.outType > -1){//离开                    
        //         //     this.view.removeSeat(player.playvo.seatId,player.playvo.outType);
        //         // }
        //     }, this);
        //     player.parent.addChild(this.huntSmokeMC);
        //     this.huntSmokeMC.play(1);
        // }
        // showHunted(player: PlayCardsItemComp): void {
        //     var textures: Array<egret.Texture> = getProxy().getTextures("hunt_aim");
        //     var mc = new gameabc.MovieClip(textures, 10);
        //     mc.x = player.x - 5;
        //     mc.y = player.y;
        //     mc.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //         evt.target.removeFromParent(true);
        //         utils.SoundUtils.playEffectSound(utils.SoundUtils.hunt_gun);
        //         this.showScreenbroken(player);
        //     }, this);
        //     player.parent.addChild(mc);
        //     mc.play(1);
        // }
        // showScreenbroken(player: PlayCardsItemComp): void {
        //     var textures: Array<egret.Texture> = getProxy().getTextures("hunt_screenbroken");
        //     var mc = new gameabc.MovieClip(textures, 10);
        //     mc.x = player.x + 20;
        //     mc.y = player.y + 20;
        //     mc.addEventListener(egret.Event.COMPLETE, this.hideMovieClip, this);
        //     // mc.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
        //     //     evt.target.removeFromParent(true);
        //     //     // this.checkWait();
        //     //     // if (player.playvo!=null&&player.playvo.outType > -1){//离开                    
        //     //     //     this.view.removeSeat(player.playvo.seatId,player.playvo.outType);
        //     //     // }
        //     // }, this);
        //     player.parent.addChild(mc);
        //     mc.play(1);
        // }
        // showLog() {
        //     console.log(this.huntGunMC == null);
        // }
        // stopShowHunt() {
        //     if (this.huntSmokeInterval != -1) {
        //         egret.clearInterval(this.huntSmokeInterval);
        //         this.huntSmokeInterval = -1;
        //     }
        //     this.huntGunMC.removeFromParent(true);
        //     this.huntSmokeMC.removeFromParent(true);
        // }
        showHuntLabel(count: number): void {
            var group: eui.Group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            group.alpha = 0;
            var bg: eui.Image = new eui.Image("icon_happy_hj_dt_png");
            bg.width = 720;
            bg.horizontalCenter = 0;
            bg.verticalCenter = 0;
            var lb: eui.Label = new eui.Label("恭喜你成功猎杀" + count + "个对手");
            lb.horizontalCenter = 0;
            lb.verticalCenter = 0;
            group.addChild(bg);
            group.addChild(lb);
            AppRoot.gameLayer.addChild(group);
            egret.Tween.get(group).to({ alpha: 1 }, 500);
            egret.setTimeout(() => { egret.Tween.get(group).to({ alpha: 0 }, 500).call(() => group.removeFromParent(true)) }, this, 1500, true);
        }
        
        /**猜牌获胜 */
        showCardGuessWin(): void {
            var money = playcards.getProxy().getCardGuessReward();
            this.view.cgLabel.text = "+" + money;
            var cgReward = this.view.cgReward;
            cgReward.visible = true;
            cgReward.alpha = 0;
            egret.Tween.get(cgReward).to({ alpha: 1 }, 500);
            egret.setTimeout(() => { egret.Tween.get(cgReward).to({ alpha: 0 }, 500).call(function () { cgReward.visible = false }, this) }, this, 1500, true);
            cgReward.y = 495;
            egret.Tween.get(cgReward).to({ y: 445 }, 500).wait(1000).to({ y: 395 }, 500);
        }
        /**金币房成长值变化 */
        public showAddChengZhang(key: string): void{
                if (key&&key != ""&&getProxy().mySeat>-1) {
                    var item: PlayCardsItemComp = this.view.allItem[getProxy().mySeat];
                    var bonesFactory:dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_PLAYCARDS,
                    "mianfeifang_json",
                    "mianfeifangtexture_png",
                    "mianfeifangtexture_json");
                var armature = bonesFactory.buildFastArmature("MovieClip","mianfeifang");
                armature.display.x = 66;
                armature.display.y = 48;
                item.addChild(armature.display);
                armature.addEventListener(dragonBones.EgretEvent.COMPLETE, this.removeChengZhang, this);
                dragonBones.WorldClock.clock.add(armature);
                armature.animation.play(key, 1);
                  
              
            }
        }
        private removeChengZhang(evt:dragonBones.EgretEvent): void{
            var armature = evt.target;
            armature.removeEventListener(dragonBones.EgretEvent.COMPLETE, this.removeChengZhang, this);
            dragonBones.WorldClock.clock.remove(armature);
            if(armature.display)
                armature.display.removeFromParent(true);
            // armature.dispose();
        }
        dispose(): void{
            if (this.fapaimv)
                this.fapaimv.dispose();
            if (this.eyemv)
                this.fapaimv.dispose();    
        }
    }
}
