module guichu {
    export class GuiChuModule extends app.base.BaseSceneUIMoudleComponent {
        back: eui.Image;
        wheelComp: GuiChuWheelComp;
        tableComp: GuiChuTableComp;
        recordComp: GuiChuRecordComp;
        ruleBtn: eui.Group;
        bankBtn: eui.Group;
        setBtn: eui.Group;
        userName: eui.Label;
        rewardPool: eui.BitmapLabel;
        testStart: eui.Label;
        testBetGroup: eui.Group;
        stateLabelGroup: eui.Group;
        stateLabel: eui.Image;
        stateLabelBg: eui.Image;
        enterCountLabel: eui.BitmapLabel;
        enterCountTime: number;
        enterCountInterval: number = -1;
        setComp: GuiChuSetComp;
        testComp: GuiChuTestComp;
        testBtn: eui.Image;
        betRect: eui.Rect;
        waitRect: eui.Rect;
        countdownGroup: eui.Group;
        lastTime: number;
        poolBar:eui.Group;
        
        noticePlate:eui.ViewStack;
        //奖池闪灯动画
        award_light_mc:dragonBones.Movie;
        ANIMATION_GROUP:string = "animationGroup";

        constructor() {
            super();
            this.skinName = "GuiChuModuleSkin";
            this.left = this.right = this.top = this.bottom = 0;
        }

        /**
         * 王老板的要求，要在Tweb下显示奖池
         */
        isTweb():boolean {

            if(DEBUG) return true;
            /**
             * 测试地址要显示奖池
             */
            if(document) {
                var href:string = document.location.href;
                if(href.toLowerCase().indexOf("\/tweb\/") > -1) {
                    return true;
                }
            }
            return false;
        }

        createComplete(event:egret.Event) {
            super.createComplete(event);
            utils.SoundUtils.loadSound();
            __REGISTER_MEDIATOR(GuiChuModuleMediator, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.stateLabelGroup.visible = false;
            if(getProxy().zpTable != null) {
                this.initTableInfo(getProxy().zpTable);
            }

            if(this.isTweb()) {
                this.poolBar.visible = true;
            }

            if($GAME_ID$ == GAME_IDS.BF_GUICHU_WHEEL) {
                this.noticePlate.selectedIndex = 0;
            }
            else {
                this.noticePlate.selectedIndex = 1;
            }

            this.userName.text = user.getProxy().loginName;
            this.testComp.visible = false;
            this.bindButton(this.back);
            this.bindButton(this.ruleBtn);
            this.bindButton(this.bankBtn);
            this.bindButton(this.setBtn, false);
            // this.bindButton(this.testZhuanpan, false);
            this.bindButton(this.testStart, false);
            this.bindButton(this.testBetGroup, false);
            this.bindButton(this.testBtn, false);
            this.preCreateInstance();
            // utils.SoundUtils.playBgSound(utils.SoundUtils.guichubg);


            gameabc.addMovieGroup("award_light_ske_dbmv","award_light_tex_png",AppReg.GUICHU);
            this.award_light_mc = gameabc.buildMovie("奖池", AppReg.GUICHU);
            this.award_light_mc.x = 157
            this.award_light_mc.y = 130;
            this.award_light_mc.blendMode = egret.BlendMode.ADD;
            this.award_light_mc.play("newAnimation");
			this.award_light_mc.visible = false;
            // this.award_light_mc.play();
            this.addChild(this.award_light_mc);

        }
       
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.back:
                    __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN);
                    break;
                // case this.testZhuanpan:
                //     this.spin();
                //     break;
                case this.testBetGroup:
                    break;
                // case this.testStart:
                //     this.betStatus();
                //     break;
                case this.ruleBtn:
                    __OPEN_MOUDLE(AppReg.GUICHU_RULE);
                    // __OPEN_MOUDLE(AppReg.GUICHU_DAILY);
                    break;
                case this.bankBtn:
                    //guichu.gameLogic().openBankRemaining();
                    var imgFile:string = "award_1"+"_png";
                    guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.NORMAL_AWARD,5000);
                    break;
                case this.setBtn:
                     this.showSetGroup();
                    break;
                case this.testBtn:
                    // showNotice(0);
                    var imgFile:string = "award_1"+"_png";
                    guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.BIG_AWARD,5000);
                    
                    break;
            }
        }
        showSetGroup() {
            this.setComp = new GuiChuSetComp();
            this.addChild(this.setComp);
        }
        preSpin() {
            showNotice(NOTICE_TYPE.WHEEL, this.spin, this);
        }
        spin() {
            this.wheelComp.rotate();
        }

        preCreateInstance() {
            var choumaKind: number = 5;
            var choumaArray: any[] = [];
            var chouma: guichu.GuiChuChoumaComp;
            var j: number = 0;
            var preNumber: number = 10;
            for (var i = 0; i < choumaKind; i++) {
                for (j = 0; j < preNumber; j++) {
                    chouma = guichu.GuiChuChoumaComp.produce(i);
                    choumaArray.push(chouma);
                }
                for (j = 0; j < preNumber; j++) {
                    chouma = choumaArray.pop();
                    guichu.GuiChuChoumaComp.reclaim(chouma);
                }
            }
        }
        betAnimate(data: any) {
            this.tableComp.betAnimate(data);
        }
        waitStatus(time: number) {
            this.waitRect.visible = true;
            this.tableComp.waitStatus();
            this.wheelComp.hideDB();
            utils.SoundUtils.playEffectSound(utils.SoundUtils.count_down);
            // this.hideStateLabel();
            this.showStateLabel(GuiChuModuleProxy.STATUS_WAIT);
            showCountdown(time, this.betPreStatus, this);
            getProxy().zpTable.timeLast = Math.max(0,getProxy().zpTable.timeLast - time);
        }
        betPreStatus() {
            utils.SoundUtils.minBgSound(1000);
            this.waitRect.visible = false;
            clearCountdown();
            this.hideStateLabel();
            showNotice(NOTICE_TYPE.BET, this.betStatus, this);
            getProxy().zpTable.timeLast = Math.max(getProxy().zpTable.timeLast - 2000,0);
        }
        betStatus() {
            getProxy().canAutoBet = true;
            this.betRect.visible = true;
            egret.Tween.removeTweens(utils.SoundUtils);
            utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            this.showStateLabel(GuiChuModuleProxy.STATUS_BET);
            this.tableComp.betStatus();
        }
        betFinish() {
            this.betRect.visible = false;
            utils.SoundUtils.minBgSound(1000);
            clearCountdown();
            this.hideStateLabel();
            this.tableComp.stopBet();
        }

        endStatus() {
            this.updateEndInfo();
            // this.showStateLabel(GuiChuModuleProxy.STATUS_END);
            // this.tableComp.endStatus();
            getProxy().zpTable.PlayerVO = [];
            if(getProxy().winHistory == null) getProxy().winHistory = [];
            getProxy().winHistory.push(getProxy().zpGamEndVO.card);
            this.updateRecord();
            if(this.isTweb()) {
                this.updateRewardPool();
            }
        }

        tableEndStatus() {
            this.tableComp.endStatus();
        }

        initTableInfo(data: any) {
            var tableInfo: appvos.ZPTableVO = data as appvos.ZPTableVO;
            if (getProxy().zpTable == null) getProxy().zpTable = tableInfo;
            // getProxy().zpTable.timeLast = Math.max(0,tableInfo.nowTimeLast - app.SystemTimer.getServerTime() / 1000);
            if (getProxy().timeGet) {
                var delayTime = egret.getTimer() - getProxy().timeGet;
                getProxy().zpTable.timeLast -= delayTime;
            }
            this.tableComp.updateMoney(tableInfo.totalMoney);
            this.tableComp.updatePro();
            this.rewardPool.text = FormatUtils.k(tableInfo.stockNum);
            this.showDailyAward(tableInfo.FreeNum);
            this.setChoumaValue();
            var choumaIndex: number = tableInfo.totalMoney > getProxy().choumaValues[getProxy().choumaDef]? getProxy().choumaDef: 0;
            this.tableComp.setChouma(choumaIndex);
            this.initRecord(tableInfo.winHistory);
            this.enterCountTime = tableInfo.nowTimeLast - tableInfo.nowTime;
            if (tableInfo.gameStatus == guichu.GAME_STATE.GAME_BET) {
                // getProxy().zpTable.timeLast *= 1000;
                // var delayTime = egret.getTimer() - getProxy().timeGet;
                // getProxy().zpTable.timeLast -= delayTime;
                var timeLast: number = Math.max(0,getProxy().zpTable.timeLast);
                this.initBetHandle(timeLast);
            } else {
                this.tableComp.enterCount(getProxy().zpTable.timeLast);
                this.showStateLabel(GuiChuModuleProxy.STATUS_ENTER);
                // utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
            }
        }

        initBetHandle(timeLast: number) {
            if (timeLast > 15000) {
                this.waitStatus(5000);//timeLast - 15000);
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
            } else if (timeLast > 12000) {
                this.betPreStatus();
            } else {
                this.betStatus();
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            }
        }
        
        showDailyAward(n: number) {
            if (n == 3 && egret.localStorage.getItem(GuiChuModuleProxy.showDailyAward) != user.getProxy().loginName + getProxy().getDateString()) {
                __OPEN_MOUDLE(AppReg.GUICHU_DAILY);
                getProxy().freeNum = 0;
            } else {
                getProxy().freeNum = n;
            }
        }
        updateTableItemInfo() {
            for (var i = 0; i < 7; i++) {
                this.sendNotification(GuiChuModuleMediator.UPDATE_BET_POT_SIZE, i + 1);
            }
        }
        
        updateTableInfo(data: any) {

        }

        setChoumaValue() {
            getProxy().setChoumaValue();
            this.tableComp.setChoumaValue();
        }

        initRecord(data: any) {
            var winHistory: number[] = data as number[];
            getProxy().winHistory = winHistory;
            this.updateRecord();
        }

        updateRecord() {
            var winHistory: number[] = getProxy().winHistory;
            if (winHistory.length > 100) {
                winHistory = winHistory.slice(-100);
            }

            var hRecord: number[] = [];
            for (var i = 0; i < getProxy().TABLE_ITEMS.length; i++) {
                hRecord.push(0);
            }

            for (var i = 0; i < winHistory.length; i++) {
                hRecord[winHistory[i]-1]++;
            }

            var tRecord: number[] = [];
            tRecord = winHistory.slice(-10);
            if(this.recordComp) {
                this.recordComp.initTRecord(tRecord);
                this.recordComp.updateHRecord(hRecord);
            }
        }

        clickAutoBet() {
            this.tableComp.autoBet();
        }

        updateEndInfo() {
            var zpGamEndVO = getProxy().zpGamEndVO;
            var myInfoVO:appvos.ZPInfoVO;
            for (var i = 0; i < zpGamEndVO.infoVO.length; i++) {
                if (zpGamEndVO.infoVO[i].seatId == getProxy().zpTable.seatID) {
                    myInfoVO = zpGamEndVO.infoVO[i];
                    break;
                }
            }
            if (myInfoVO != null) {
                // this.tableComp.updateMoney(myInfoVO.betNum);
                var profit: number = 0;
                var index: number = 1;
                var hasWin: boolean = false;
                getProxy().winProfit += myInfoVO.realWin;
                for (var i = 1; i <= 7; i++) {
                    // profit += myInfoVO.realWin;//myInfoVO["posWin" + i];
                    if (myInfoVO["posWin" + i] > 0) {
                        hasWin = true;
                        profit += myInfoVO["posWin" + i]
                        index = i > index? i: index;
                    }
                }
                var imgFile:string = "award_"+index+"_png";
                if (hasWin) {
                    if(index >= 1 && index <=3) {
                        //guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.NORMAL_AWARD,0);
                        //popAward(imgFile);
                        guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.SMALL_AWARD,profit);
                    } 
                    else if (index == 4 || index == 5) {
                        guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.SMALL_AWARD,profit);
                        //popSmallAward(profit, imgFile);
                    } 
                    else if (index == 6 || index == 7) {
                        guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.BIG_AWARD,profit);
                        //popBigAward(profit);
                    }
                    // this.tableComp.updatePro();
                } else {
                    var imgFile:string = "award_" + getProxy().zpGamEndVO.card + "_png";
                    guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.NORMAL_AWARD,0);
                }
            } else {
                // this.showStateLabel(GuiChuModuleProxy.STATUS_END);
                var imgFile:string = "award_" + getProxy().zpGamEndVO.card + "_png";
                guichu.playAwardAnimation(imgFile,guichu.AWARD_TYPE.NORMAL_AWARD,0);
            }
        }

        updateBetMoney(data: any) {
            this.tableComp.updateBetMoney(data);
        }

        //上一次的奖池
        private prevPool:number = 0;
        updateRewardPool() {
            if (getProxy().rewardPool >= 0)  {
                var s:string = this.rewardPool.text;
                this.prevPool = Number(s.replace(new RegExp("\,","g"),""));
                var oldPool:number = this.prevPool;
                var newPool:number = getProxy().rewardPool;
                var distance:number = Math.abs(oldPool - newPool);
                var changeTime:number = distance / 10;
                var waitTime:number = 0;
                this.tv = this.prevPool;
                this.prevPool = newPool;
                const MIN_TIME:number = 4000;
                if(changeTime > MIN_TIME) {
                    waitTime = 0;
                    changeTime = MIN_TIME;
                } 
                else {
                    waitTime = MIN_TIME - changeTime;
                }

                egret.Tween.get(this)
                .call(()=>{
                    this.award_light_mc.visible = true;
                    this.award_light_mc.play("newAnimation",16);
                },this)
                .to({changePool:newPool},changeTime,egret.Ease.sineOut)
                .wait(waitTime)
                .call(()=>{
                    this.award_light_mc.visible = false;
                    this.award_light_mc.stop();
                    this.rewardPool.text = FormatUtils.k(getProxy().rewardPool);
                },this)
            }
        }

        private tv:number = 0;
        set changePool(val:number) {
            this.tv = Math.floor(val);
            this.rewardPool.text =  FormatUtils.k(this.tv);
        }

        get changePool():number {
            return this.tv;
        }

        freeEnd() {
            this.tableComp.freeEnd();
        }

        showStateLabel(state: string, time: number = 0) {
            var source: string = "";
            if (state == GuiChuModuleProxy.STATUS_BET) {
                source = "guichu_word_zzxz_png";
            } else if (state == GuiChuModuleProxy.STATUS_END) {
                source = "guichu_word_zzpj_png";
            } else if (state == GuiChuModuleProxy.STATUS_ENTER) {
                source = "guichu_word_zzkj_png";
            } else if (state == GuiChuModuleProxy.STATUS_WAIT) {
                source = "guichu_word_ddxjks_png";
            }
            this.stateLabel.source = source;
            this.stateLabel.visible = false;
            this.stateLabelBg.height = 0;
            this.stateLabelGroup.visible = true;
            egret.Tween.get(this.stateLabelBg).to({height: 56}, 200).call(()=>{
                this.stateLabel.visible = true;
            }, this);
            // if (time > 0) {
            //     this.enterCountLabel.visible = true;
            //     this.enterCountLabel.text = time.toString();
            //     this.enterCountInterval = egret.setInterval(this.enterCount, this, 1000);
            // } else {
            //     this.enterCountLabel.visible = false;
            //     if (this.enterCountInterval != -1) {
            //         egret.clearInterval(this.enterCountInterval);
            //         this.enterCountInterval = -1;
            //     }
            // }
        }

        enterCount() {
            this.enterCountTime--;
            if (this.enterCountTime < 0) this.enterCountTime = 0;
            this.enterCountLabel.text = this.enterCountTime.toString();
        }

        hideStateLabel() {
            this.stateLabelGroup.visible = false;
        }

        updateTest(data: any) {
            this.testComp.result(data);
        }
        updatePro() {
            var zpGamEndVO = getProxy().zpGamEndVO;
            var myInfoVO:appvos.ZPInfoVO;
            for (var i = 0; i < zpGamEndVO.infoVO.length; i++) {
                if (zpGamEndVO.infoVO[i].seatId == getProxy().zpTable.seatID) {
                    myInfoVO = zpGamEndVO.infoVO[i];
                    this.tableComp.updateMoney(myInfoVO.betNum);
                    break;
                }
            }
            this.tableComp.updatePro();
        }

        enterFrame() {
            // var nowTime: number = egret.getTimer();
            // var frameTime: number;
            // if (this.lastTime == null) this.lastTime = nowTime;
            // frameTime = nowTime - this.lastTime;
            // this.lastTime = nowTime;
            // if (frameTime >= 7000) {
            //     __CLOSE_MOUDLE(AppReg.GUICHU);
            //     tip.Alert.show("您已离线，请重新登录。", null, tip.ALERT, (type:number)=>{
            //         if (type == tip.YES) {
            //             guichu.gameLogic().gameStart();
            //         }
            //     }, null, this);
            // }
        }

        dispose():void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            if(this.wheelComp) {
                this.wheelComp.removeFromParent(true);
            }
            if(this.tableComp) {
                this.tableComp.removeFromParent(true);
            }
            if(this.recordComp) {
                this.recordComp.removeFromParent(true);
            }

            egret.Tween.removeAllTweens();
            //guichu.clearAwardAnimation();

            if(this.award_light_mc) {
                this.award_light_mc.stop();
                this.award_light_mc.removeFromParent(true);
            }

            guichu.closeBigAward();
            guichu.closeAward();
            guichu.closeSmallAward();

            __REMOVE_MEDIATOR(GuiChuModuleMediator);
            getProxy().dispose();
            clearAwardAnimation();
            utils.SoundUtils.clearAllSound();
            super.dispose();
        }
    }
}