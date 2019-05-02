var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**打牌操作 */
    var PlayCardsPlayComp = (function (_super) {
        __extends(PlayCardsPlayComp, _super);
        function PlayCardsPlayComp() {
            var _this = _super.call(this) || this;
            _this.genNum = 0;
            _this.isLiangpaiClick = false; //点击过亮牌按钮
            _this.winnerCanShowCard = false;
            _this.is2Blind = false;
            _this.is3Blind = false;
            _this.is4Blind = false;
            _this.skinName = "PlayCardsPlaySkin";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
            // this.view = view;
        }
        PlayCardsPlayComp.prototype.setChildVisable = function (dis, visable, parent) {
            if (dis != null) {
                if (visable) {
                    if (dis.parent == null)
                        parent.addChild(dis);
                }
                else if (dis.parent != null)
                    dis.parent.removeChild(dis);
            }
        };
        PlayCardsPlayComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnbak);
            this.bindButton(this.paijubtn);
            this.bindButton(this.goumaibtn);
            this.bindButton(this.l1btn);
            this.bindButton(this.l2btn);
            this.bindButton(this.l3btn);
            this.bindButton(this.r1btn);
            this.bindButton(this.r2btn);
            this.bindButton(this.r3btn);
            this.bindButton(this.r4btn);
            this.bindButton(this.r5btn);
            this.bindButton(this.biaoqingbtn);
            this.bindButton(this.fastFoldBtn);
            this.bindButton(this.btnrank);
            this.bindButton(this.trustview, false);
            //猜牌按钮
            this.bindButton(this.cgbtn1);
            this.bindButton(this.cgbtn2);
            this.bindButton(this.cgbtn3);
            this.bindButton(this.cgbtn4);
            this.bindButton(this.liaotianbtn);
            this.bindButton(this.sitbtn);
            this.bindButton(this.giftbtn);
            this.bindButton(this.btnCaiShen);
            this.bindButton(this.btnGoldTreen);
            this.bindButton(this.btnChengzhang);
            //           this.bindButton(this.btntask);
            //            var missionTipData = tip.createOrGetTipData(AppConst.COUNT_SUB_TAG.MISSION_MOUDLE);
            //            this.missionTipUI= new tip.CountTipUI(missionTipData);
            //            this.missionTipUI.x = 60;
            //            this.missionTipUI.y = 10;
            //            this.btntask.addChild(this.missionTipUI);
            this.setChildVisable(this.sngWheel, false, this);
            this.setChildVisable(this.sngWheelGroup, false, this);
            this.setChildVisable(this.trustview, false, this);
            this.setChildVisable(this.btnGoldTreen, false, this);
            this.removeBtnChengzhang();
            this.setChildVisable(this.leftbtns, false, this.bottombtns);
            this.setChildVisable(this.rightbtns, false, this.bottombtns);
            this.setChildVisable(this.right2btns, false, this.bottombtns);
            this.setChildVisable(this.cggp, false, this.bottombtns);
            this.setChildVisable(this.dealergroup, false, this);
            this.allcheck = [this.rangqicheck, this.rangpaicheck, this.gencheck];
            this.rangqicheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);
            this.rangpaicheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);
            this.gencheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);
            this.missionBox.fatherGroup = this;
            var bonesFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_PLAYCARDS, "caishensongfu1_json", "caishensongfu1_texture_png", "caishensongfu1_texture_json");
            this.armatureCaiShen = bonesFactory.buildArmature("MovieClip", "caishensongfu");
            this.armatureCaiShen.display.x = 38;
            this.armatureCaiShen.display.y = 48;
            this.btnCaiShen.addChildAt(this.armatureCaiShen.display, 0);
            dragonBones.WorldClock.clock.add(this.armatureCaiShen);
            this.armatureCaiShen.animation.gotoAndStop("caishensongfu");
            this.addBtnChengzhang();
            // this.armatureCaiShen.addEventListener(dragonBones.AnimationEvent.COMPLETE,()=> {
            //     console.log("play end !!!");
            //     this.armatureCaiShen.display.visible = false;
            //     dragonBones.WorldClock.clock.remove(this.armatureCaiShen);
            // },this)
        };
        PlayCardsPlayComp.prototype.removeParent = function () {
            if (this.outmenu)
                this.outmenu.removeFromParent();
            egret.clearTimeout(this.timeout);
            this.chatlab.text = "";
            this.messTextFlow = null;
        };
        PlayCardsPlayComp.prototype.checkChange = function (evt) {
            var check = evt.target;
            if (check.selected) {
                for (var i = 0; i < 3; i++) {
                    if (this.allcheck[i] != check) {
                        this.updateCheckBox(this.allcheck[i], false);
                    }
                    else {
                        this.updateCheckBox(this.allcheck[i], true);
                    }
                }
            }
            else {
                this.updateCheckBox(check, false);
            }
        };
        PlayCardsPlayComp.prototype.updateCheckBox = function (chkBox, selected) {
            chkBox.selected = selected;
        };
        /**初始化设置按钮 */
        PlayCardsPlayComp.prototype.refVOBtns = function () {
            var tablevo = playcards.getTableVO();
            this.isLiangpaiClick = false;
            var roomtype = room.getProxy().currentType;
            //  roomtype = room.TYPE.SNG;//测试用
            //             if (roomtype == room.TYPE.NORMAL || roomtype == room.TYPE.FAST)
            //                 this.setChildVisable(this.btntask, true, this);
            //             else {
            //                 this.setChildVisable(this.btntask, false, this);          
            //             }           
            this.setChildVisable(this.sngWheel, false, this);
            this.setChildVisable(this.sngWheelGroup, false, this);
            if (tablevo == null) {
                // this.setChildVisable(this.bottombtns, false, this);
                this.bottomview.visible = false;
                this.setChildVisable(this.paijubtn, false, this);
                this.setChildVisable(this.goumaibtn, false, this);
                this.setChildVisable(this.btnrank, false, this.righttopbtns);
                this.setChildVisable(this.btnCaiShen, false, this);
                this.setChildVisable(this.btnGoldTreen, false, this);
                this.removeBtnChengzhang();
            }
            else {
                // this.setChildVisable(this.bottombtns, true, this);
                this.bottomview.visible = true;
                this.setChildVisable(this.paijubtn, true, this.righttopbtns);
                this.setChildVisable(this.goumaibtn, roomtype == 3 /* VIP */ && !playcards.getProxy().isSingle, this.righttopbtns);
                this.setChildVisable(this.btnrank, roomtype == 4 /* SNG */ || roomtype == 5 /* MTT */, this.righttopbtns);
                this.setBtns(false, tablevo.nowTime);
                if (roomtype == 2 /* FAST */) {
                    this.setChildVisable(this.fastFoldBtn, true, this.right2btns);
                }
                else {
                    this.setChildVisable(this.fastFoldBtn, false, this.right2btns);
                }
                if (roomtype == 4 /* SNG */) {
                    if (!match.getProxy().currentMatchVO.wheelPlayed) {
                        if (this.sngWheel == null) {
                            this.sngWheel = new playcards.SngWheelComp();
                            this.sngWheel.horizontalCenter = this.sngWheel.verticalCenter = 0;
                        }
                        this.setChildVisable(this.sngWheel, true, this);
                        this.sngWheel.completeListener = this.onSngWheelComplete;
                        this.sngWheel.completeThisObj = this;
                        this.sngWheel.playAndGoto(match.getProxy().currentMatchVO.wheelBonus);
                        match.getProxy().currentMatchVO.wheelPlayed = true;
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS, -1);
                    }
                    else {
                        this.setChildVisable(this.sngWheelGroup, true, this);
                    }
                }
                if (roomtype == 4 /* SNG */
                    || roomtype == 5 /* MTT */
                    || roomtype == 3 /* VIP */
                    || roomtype == 7 /* PK */
                    || roomtype == 8 /* FREE */
                    || roomtype == 9 /* GRIL */) {
                    this.setChildVisable(this.btnCaiShen, false, this);
                }
                else {
                }
                /**摇钱树按钮只在金币房显示*/
                if (room.getProxy().currentType == 8 /* FREE */) {
                    this.setChildVisable(this.btnGoldTreen, true, this);
                    this.btnGoldTreen.initData();
                    if (this.checkChengzhang()) {
                        this.removeBtnChengzhang();
                    }
                    else
                        this.addBtnChengzhang();
                }
            }
            this.resetLive();
            this.refRank();
            this.refJoin();
            if (this.chatMessview) {
                this.chatMessview.removeFromParent(true);
                this.chatMessview = null;
            }
        };
        PlayCardsPlayComp.prototype.refJoin = function () {
            // var id = user.getProxy().svrRoleId;
            // var tablevo = getTableVO();
            // var myinJoin: boolean = false;
            // if (tablevo) {
            //      for (var i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
            //         var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
            //         if (join.roleId == id) {
            //             myinJoin = true;
            //             break;
            //         }
            //     }
            // }
            this.bottomview.selectedIndex = playcards.getProxy().getMyJoin() ? 1 : 0;
        };
        PlayCardsPlayComp.prototype.resetLive = function () {
            if (playcards.getProxy().isLive) {
                // this.btnCaiShen.bottom = NaN;
                this.btnCaiShen.x = 150;
                this.missionBox.right = 200;
                this.bottombg.alpha = 1;
            }
            else {
                this.btnCaiShen.x = 12;
                // this.btnCaiShen.bottom = 82;
                this.missionBox.right = 20;
                this.bottombg.alpha = 0.45;
            }
        };
        PlayCardsPlayComp.prototype.onSngWheelComplete = function () {
            this.setChildVisable(this.sngWheelGroup, true, this);
            this.sngWheelLabel.text = String(match.getProxy().currentMatchVO.wheelBonus);
        };
        /**刷新排名 */
        PlayCardsPlayComp.prototype.refRank = function () {
            if (this.btnrank.parent != null) {
                var roomtype = room.getProxy().currentType;
                if (roomtype == 4 /* SNG */) {
                    var rank = 1;
                    if (playcards.getProxy().mySeatvo != null) {
                        //  var mybet: number = getProxy().mySeatvo.nowBet+getProxy().mySeatvo.totalBet;
                        //  var tablevo = getProxy().tableVO;
                        //  var seat: number = getProxy().mySeat;
                        //  var seatvo: appvos.SeatPlayerVO;
                        //  for (var i: number = 0,len:number = tablevo.seatPlayerVO.length; i < len; i++){
                        //      seatvo = tablevo.seatPlayerVO[i];
                        //      if (seatvo.seatId != seat&&seatvo.nowBet+seatvo.totalBet>mybet) {
                        //          rank++;
                        //      }
                        //  }
                        rank = playcards.getProxy().getRank(playcards.getProxy().mySeatvo.nowBet + playcards.getProxy().mySeatvo.totalBet, playcards.getProxy().mySeat);
                    }
                    this.ranklab.text = "第" + rank + "名";
                }
                else if (roomtype == 5 /* MTT */) {
                    __SEND_NOTIFICATION(app.NetAction.REQ_PLAYER_RANK);
                }
            }
        };
        /**涨盲倒计时 */
        PlayCardsPlayComp.prototype.setLeftTime = function (num) {
            this.leftNumlab.textFlow = [
                { text: "涨盲时间:" },
                { text: DateUtils.DayTimeStampFormat2(num), style: { "textColor": 0xffffff } }
            ];
        };
        /**
         * 设置按钮
         */
        PlayCardsPlayComp.prototype.setBtns = function (isPlayOver, nowtime) {
            if (isPlayOver === void 0) { isPlayOver = false; }
            if (nowtime === void 0) { nowtime = 0; }
            var tablevo = playcards.getTableVO();
            if (tablevo.whoplay > -1)
                this.view.allItem[tablevo.whoplay].playcd(nowtime);
            if (this.view.isVideo()) {
                return;
            }
            var proxy = playcards.getProxy();
            var currentType = room.getProxy().currentType;
            // 玩家站起时，不现实购买筹码按钮
            this.goumaibtn.visible = proxy.mySeat > -1;
            this.setChildVisable(this.r5btn, !playcards.getProxy().isHuanZhuoClick
                && currentType == 2 /* FAST */ && proxy.mySeatvo && proxy.mySeatvo.isFold, this.bottombtns);
            if (tablevo.whoplay != -1 && tablevo.whoplay == proxy.mySeat) {
                // // @ch自动弃牌
                // var flag = true;
                //@ch 自动弃牌
                if (true && mammon.getProxy()._zidongqipai) {
                    proxy.sendAction([playcards.getProxy().ACT_FOLD]);
                    return;
                }
                utils.SoundUtils.playEffectSound(utils.SoundUtils.kaishixingdong);
                this.view.myIsAct = true;
                if (proxy.isTrust) {
                    this.trustAction();
                    return;
                }
                if (this.right2btns.parent != null) {
                    this.setChildVisable(this.right2btns, false, this.bottombtns);
                    this.setChildVisable(this.right3btns, false, this.bottombtns);
                    if (this.rangqicheck.selected) {
                        if (this.isRangpai()) {
                            proxy.sendAction([proxy.ACT_CHECK]);
                        }
                        else {
                            proxy.sendAction([proxy.ACT_FOLD]);
                        }
                        return;
                    }
                    else if (this.rangpaicheck.selected) {
                        if (this.isRangpai()) {
                            proxy.sendAction([proxy.ACT_CHECK]);
                            return;
                        }
                        else if (this.genNum == this.getGenNum() /*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/) {
                            if (this.isAllin()) {
                                proxy.sendAction([proxy.ACT_ALLIN]);
                            }
                            else
                                proxy.sendAction([proxy.ACT_CALL]);
                            return;
                        }
                    }
                    else if (this.gencheck.selected) {
                        if (this.isRangpai())
                            proxy.sendAction([proxy.ACT_CHECK]);
                        else if (this.isAllin()) {
                            proxy.sendAction([proxy.ACT_ALLIN]);
                        }
                        else
                            proxy.sendAction([proxy.ACT_CALL]);
                        return;
                    }
                }
                this.view.effect.showIsMyTurn(true);
                this.r3btn.touchEnabled = proxy.canaddBet() || this.isAllin();
                this.r3btn.alpha = this.r3btn.touchEnabled ? 1 : 0.5;
                this.setChildVisable(this.biaoqingbtn, false, this.bottombtns);
                if (this.isRangpai()) {
                    this.r2btnfnt.text = "";
                    this.r2btnlab.source = "img_word_play_ranpai_png"; //让牌
                }
                else if (this.isAllin()) {
                    this.r2btnlab.source = "img_word_play_allin_png"; //显示Allin
                    this.r2btnfnt.text = "";
                }
                else {
                    this.r2btnfnt.text = "跟" + FormatUtils.wan(this.getGenNum() /*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/); //显示跟  紫色跟
                    this.r2btnlab.source = ""; // "img_word_play_gengzhu1_png"//显示跟注
                }
                this.setChildVisable(this.leftbtns, true, this.bottombtns);
                var max = proxy.addMaxBet();
                var min = proxy.addMinBet();
                this.isShowDichi();
                var bet = proxy.getTotalBet();
                if (this.is2Blind) {
                    this.l1btnlab.source = "img_word_play_2dm_png";
                    this.setLab(bet + bet, this.l1btnlab, this.l1btn, min, max);
                }
                else {
                    this.l1btnlab.source = "img_word_play_2dc_png";
                    this.setLab(Math.floor(bet / 2), this.l1btnlab, this.l1btn, min, max);
                }
                if (this.is3Blind) {
                    this.l2btnlab.source = "img_word_play_3dm_png";
                    this.setLab(bet + bet + bet, this.l2btnlab, this.l2btn, min, max);
                }
                else {
                    this.l2btnlab.source = "img_word_play_3dc_png";
                    this.setLab(Math.floor(bet * 2 / 3), this.l2btnlab, this.l2btn, min, max);
                }
                if (currentType == 7 /* PK */) {
                    this.l3btn.touchEnabled = true;
                    this.l3btn.alpha = 1;
                    this.l3btnlab.source = "img_word_play_allin_png";
                }
                else if (this.is4Blind) {
                    this.l3btnlab.source = "img_word_play_4dm_png";
                    this.setLab(bet + bet + bet + bet, this.l3btnlab, this.l3btn, min, max);
                }
                else {
                    this.l3btnlab.source = "img_word_play_1dc_png";
                    this.setLab(bet, this.l3btnlab, this.l3btn, min, max);
                }
            }
            else {
                //                this.servermes.text = "";  
                this.view.effect.showIsMyTurn(false);
                if (tablevo.whoplay > -1 && tablevo.tableStatus > 0 && proxy.mySeat > -1 && proxy.mySeatvo.isPlay && !proxy.mySeatvo.isFold && !proxy.mySeatvo.isAllIn && !this.view.myIsAct) {
                    this.setChildVisable(this.right2btns, true, this.bottombtns); //快捷按钮
                    if (this.isRangpai()) {
                        this.r2btnfnt.text = "";
                        this.r2btnlab.source = "img_word_play_ranpai_png"; //让牌
                        this.r2checkimg.visible = true; //自动让牌文字
                        this.r2checkfnt.text = ""; //自动跟文字
                    }
                    else {
                        this.r2checkimg.visible = false; //自动让牌文字
                        var gen = this.getGenNum();
                        if (this.genNum != gen /*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/) {
                            this.updateCheckBox(this.rangpaicheck, false);
                        }
                        this.genNum = gen;
                        this.r2checkfnt.text = "跟" + FormatUtils.wan4(gen); //自动根文字 黄色跟字
                    }
                }
                else {
                    this.setChildVisable(this.right2btns, false, this.bottombtns);
                }
                if (isPlayOver) {
                    this.clearLiangPaiTimer();
                    this.liangPaiTimer = egret.setTimeout(this.liangPaiEndFunc, this, PlayCardsPlayComp.LIANG_PAI_TIME);
                }
                this.setChildVisable(this.right3btns, (room.getProxy().current && (currentType == 3 /* VIP */ || currentType == 7 /* PK */) && proxy.mySeat == -1) || this.isLiangpai(), this.bottombtns);
                if (proxy.mySeat == -1) {
                    this.r4btnlab.source = "img_word_play_sitdown_png"; //坐下
                }
                else
                    this.r4btnlab.source = "img_word_play_jiesuliangpai_png"; //结束亮牌
                this.setChildVisable(this.biaoqingbtn, playcards.getProxy().mySeat > -1, this.bottombtns);
                if (this.moneySelect != null && this.moneySelect.parent)
                    this.moneySelect.removeFromParent();
                this.showBtns(true);
            }
        };
        PlayCardsPlayComp.prototype.setLab = function (value, lbtnlab, lbtn, min, max) {
            lbtn.touchEnabled = value >= min && value <= max && playcards.getProxy().canaddBet();
            lbtn.alpha = lbtn.touchEnabled ? 1 : 0.5;
        };
        /**可以跟的筹码数量 */
        PlayCardsPlayComp.prototype.getGenNum = function () {
            var proxy = playcards.getProxy();
            return Math.min(proxy.nowMaxBet - proxy.mySeatvo.turnBet, proxy.mySeatvo.nowBet);
        };
        /**
         * 是否是让牌   true 让牌 false 跟注
         */
        PlayCardsPlayComp.prototype.isRangpai = function () {
            var p = playcards.getProxy();
            return p.nowMaxBet <= p.mySeatvo.turnBet;
        };
        /**
         * 是否allin
         */
        PlayCardsPlayComp.prototype.isAllin = function () {
            return playcards.getProxy().nowMaxBet - playcards.getProxy().mySeatvo.turnBet >= playcards.getProxy().mySeatvo.nowBet;
        };
        /**
         * 坐标按钮显示底池文字
         * X2盲 vs 1/3底池， 谁大显示谁
         */
        PlayCardsPlayComp.prototype.isShowDichi = function () {
            if (playcards.getTableVO().globalCards && playcards.getTableVO().globalCards.length > 0) {
                this.is2Blind = this.is3Blind = this.is4Blind = false;
                return;
            }
            var bet = playcards.getProxy().getTotalBet();
            var bb = playcards.getTableVO().bbBet;
            var myTurnBet = playcards.getProxy().mySeatvo.turnBet;
            this.is2Blind = 2 * bb - myTurnBet >= bet / 2;
            this.is3Blind = this.is2Blind && 3 * bb - myTurnBet >= bet * 2 / 3;
            this.is4Blind = this.is3Blind && 4 * bb - myTurnBet >= bet;
        };
        /**
         *  首先玩家坐下 + 没点过亮牌
         *  并且：
         *  1. 弃牌状态 or 2. 玩家胜利(未比牌)+牌局结束状态
         *
         */
        PlayCardsPlayComp.prototype.isLiangpai = function () {
            var theProxy = playcards.getProxy();
            return !this.isLiangpaiClick && theProxy.mySeatvo != null
                && (theProxy.mySeatvo.isFold || (playcards.getTableVO().tableStatus == 0 && theProxy.mySeatvo.myCard.length > 0 && this.winnerCanShowCard));
        };
        PlayCardsPlayComp.prototype.clearLiangPaiTimer = function () {
            egret.clearTimeout(this.liangPaiTimer);
            this.liangPaiTimer = 0;
        };
        /**
         * 5秒后，如果亮牌按钮还在，则关闭
         */
        PlayCardsPlayComp.prototype.liangPaiEndFunc = function () {
            this.liangPaiTimer = 0;
            if (this.right3btns && this.right3btns.parent && playcards.getProxy().mySeat != -1) {
                this.setChildVisable(this.right3btns, false, this.bottombtns);
            }
        };
        /*显示按钮*/
        PlayCardsPlayComp.prototype.showBtns = function (value) {
            this.leftbtns.visible = value;
            this.rightbtns.visible = value;
        };
        /**显示加注界面 */
        PlayCardsPlayComp.prototype.showAddBet = function () {
            if (this.moneySelect == null)
                this.moneySelect = new playcards.PlayCardSelectMoneyComp();
            if (this.moneySelect.parent == null) {
                this.addChild(this.moneySelect);
                this.moneySelect.show();
                this.showBtns(false);
            }
        };
        /**显示托管 */
        PlayCardsPlayComp.prototype.showTrust = function () {
            this.setChildVisable(this.trustview, true, this);
            this.trustview.visible = true;
            playcards.getProxy().isTrust = true;
        };
        /**取消托管 */
        PlayCardsPlayComp.prototype.hideTrust = function () {
            this.setChildVisable(this.trustview, false, this);
            __PVO().to(app.NetAction.MATCH_HEART_BEAT);
            playcards.getProxy().isTrust = false;
            playcards.getProxy().outTime = 0;
        };
        /**托管操作 */
        PlayCardsPlayComp.prototype.trustAction = function () {
            // if (DEBUG) {
            //     if (this.isRangpai()) //加
            //         getProxy().addBet(0);
            //     else//跟
            //         getProxy().sendAction([getProxy().ACT_CALL], false);
            //     return;
            // }
            if (this.isRangpai())
                playcards.getProxy().sendAction([playcards.getProxy().ACT_CHECK], false);
            else
                playcards.getProxy().sendAction([playcards.getProxy().ACT_FOLD], false);
        };
        PlayCardsPlayComp.prototype.showCardGuess = function (show) {
            if (show) {
                // var playvo: appvos.SeatPlayerVO = getProxy().mySeatvo;
                // var total = playvo.numWins + playvo.numLosts + playvo.numPeaces;
                // if (total <= 10) return;
                if (user.getProxy().playInfoVO && user.getProxy().playInfoVO.totalHand >= 10) {
                    playcards.getProxy().cgTime = null;
                    playcards.getProxy().cgMoney = null;
                    this.setCardGuess();
                    this.cggp.y = 90;
                    this.cglb6.visible = false;
                    this.cggp.visible = this.cgbtns.visible = true;
                    this.setChildVisable(this.cggp, true, this.bottombtns);
                    egret.Tween.get(this.cggp).to({ y: -5 }, 130);
                }
                else {
                    __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
                }
            }
            else {
                this.setChildVisable(this.cggp, false, this.bottombtns);
            }
        };
        PlayCardsPlayComp.prototype.setCardGuess = function () {
            if (playcards.getProxy().cgNumber === null || playcards.getProxy().cgNumber === undefined)
                playcards.getProxy().cgNumber = Math.floor(Math.random() * playcards.getProxy().cgStakeRules.length);
            var cgNumber = playcards.getProxy().cgNumber;
            this.cglb1.text = playcards.getProxy().cgStakeRules[cgNumber][0];
            var mb = user.getProxy().currentRoom.maxBank;
            var i = mb == 40000 ? 1 : 2;
            this.cglb2.text = playcards.getProxy().cgStakeRules[cgNumber][i] + "倍";
            var bb = user.getProxy().currentRoom.bigBlinds;
            this.cglb3.text = (playcards.getProxy().cgStakeTimes[0] * bb).toString();
            this.cglb4.text = (playcards.getProxy().cgStakeTimes[1] * bb).toString();
            this.cglb5.text = (playcards.getProxy().cgStakeTimes[2] * bb).toString();
        };
        PlayCardsPlayComp.prototype.sendCardGuess = function () {
            __PVO().i(playcards.getProxy().cgNumber + 1, playcards.getProxy().cgTime).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
        };
        PlayCardsPlayComp.prototype.finishCardGuess = function () {
            mc2sdk.event(50061 /* CARD_GUESS */, [playcards.getProxy().cgNumber + 1, playcards.getProxy().cgTime]);
            this.cgbtns.visible = false;
            playcards.getProxy().cgMoney = playcards.getProxy().cgStakeTimes[playcards.getProxy().cgTime] * user.getProxy().currentRoom.bigBlinds;
            this.cglb6.textFlow = [
                { text: "投注\"", style: { "textColor": AppConst.TextColors.white } },
                {
                    text: playcards.getProxy().cgStakeRules[playcards.getProxy().cgNumber][0],
                    style: { "textColor": AppConst.TextColors.yellow }
                },
                { text: "\"", style: { "textColor": AppConst.TextColors.white } },
                { text: playcards.getProxy().cgMoney.toString(), style: { "textColor": AppConst.TextColors.yellow } },
                { text: "金额成功，请等待下局开奖", style: { "textColor": AppConst.TextColors.white } }
            ];
            this.cglb6.visible = true;
        };
        PlayCardsPlayComp.prototype.addMess = function (id, mess, char) {
            if (char === void 0) { char = 0; }
            var rname;
            var tablevo = playcards.getTableVO();
            id = user.getProxy().getRoleId(id);
            for (var i = 0, len = tablevo.joinPlayerVO.length; i < len; i++) {
                var join = tablevo.joinPlayerVO[i];
                if (join.roleId == id) {
                    rname = join.name;
                    break;
                }
            }
            if (rname) {
                if (this.messTextFlow == null) {
                    this.messTextFlow = [];
                }
                if (char > 0) {
                    mess = gameabc.ResourceBundleUtil.getMessage("CHAT_" + char);
                    this.messTextFlow.push({ text: rname + "：", style: { "textColor": 0xff9900 } });
                    this.messTextFlow.push({ text: mess + "\n", style: { "textColor": 0xFFFFCC } });
                    this.chatlab.textFlow = [
                        { text: rname + "：", style: { "textColor": 0xff9900 } },
                        { text: mess + "\n", style: { "textColor": 0xFFFFCC } }
                    ];
                }
                else {
                    this.messTextFlow.push({ text: rname + "：", style: { "textColor": 0xAF8EBB } });
                    this.messTextFlow.push({ text: mess + "\n" });
                    this.chatlab.textFlow = [
                        { text: rname + "：", style: { "textColor": 0xAF8EBB } },
                        { text: mess + "\n" }
                    ];
                }
                while (this.messTextFlow.length > 100) {
                    this.messTextFlow.shift();
                }
                if (this.chatMessview && this.chatMessview.parent) {
                    this.chatMessview.refText(this.messTextFlow);
                }
                egret.clearTimeout(this.timeout);
                this.timeout = egret.setTimeout(this.clearChatlab, this, 10000);
            }
        };
        PlayCardsPlayComp.prototype.clearChatlab = function () {
            this.chatlab.text = "";
        };
        PlayCardsPlayComp.prototype.touchBindButtonHandler = function (clickTarget) {
            _super.prototype.touchBindButtonHandler.call(this, clickTarget);
            switch (clickTarget) {
                case this.btnbak:
                    //    if (this.view.isVideo()) {
                    //        getProxy().outbakfun();
                    //    } else {
                    mc2sdk.event(50011 /* PLAYCARD_MENU */);
                    if (user.getProxy().willJoinMatchRoom) {
                        if (room.getProxy().currentType == 5 /* MTT */) {
                            var mttVO = match.getProxy().currentMatchVO;
                            if (mttVO.startTime > match.getSvrTime()) {
                                playcards.getProxy().outbakfun(); //比赛没开始直接退
                            }
                            else {
                                playcards.getProxy().outAlert();
                            }
                        }
                        else {
                            playcards.getProxy().out();
                        }
                    }
                    else {
                        if (this.outmenu == null) {
                            this.outmenu = new playcards.PlayCardOutMenuComp();
                            this.outmenu.view = this.view;
                        }
                        this.addChild(this.outmenu);
                        this.outmenu.refBtns();
                    }
                    break;
                case this.paijubtn:
                    __OPEN_MOUDLE(AppReg.APP_PLAY_REVIEW, null, null, null, this.view.mainview);
                    break;
                //  case this.startbtn://房主开始
                //     __SEND_MESSAGE_COMMAD(app.NetAction.MATCH_START);
                //  break;
                case this.goumaibtn:
                    // if(this.test==null)
                    //     this.test = new TestPlaycardsUIComp();
                    // this.mainview.addChild(this.test);
                    __OPEN_MOUDLE(AppReg.APP_PLAY_BUY, null, null, null, this.view.mainview);
                    // if (DEBUG) {               
                    //     PlayCardsUIMediator.index = null;
                    //   __PVO().i(1, 0,5).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
                    //    return;
                    //    }
                    break;
                case this.l1btn:
                    if (!this.is2Blind) {
                        var totalBet = Math.floor(playcards.getProxy().getTotalBet() / 2);
                    }
                    else {
                        totalBet = playcards.getTableVO().bbBet + playcards.getTableVO().bbBet - playcards.getProxy().mySeatvo.turnBet;
                    }
                    playcards.getProxy().addBet(totalBet);
                    mc2sdk.event(50039 /* ADDBET_B1 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l2btn:
                    if (!this.is3Blind) {
                        totalBet = Math.floor(playcards.getProxy().getTotalBet() * 2 / 3);
                    }
                    else {
                        totalBet = playcards.getTableVO().bbBet + playcards.getTableVO().bbBet + playcards.getTableVO().bbBet - playcards.getProxy().mySeatvo.turnBet;
                    }
                    playcards.getProxy().addBet(totalBet);
                    mc2sdk.event(50040 /* ADDBET_B2 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l3btn:
                    if (room.getProxy().currentType == 7 /* PK */) {
                        totalBet = playcards.getProxy().mySeatvo.nowBet;
                    }
                    else if (!this.is4Blind) {
                        totalBet = playcards.getProxy().getTotalBet();
                    }
                    else {
                        totalBet = playcards.getTableVO().bbBet + playcards.getTableVO().bbBet + playcards.getTableVO().bbBet + playcards.getTableVO().bbBet - playcards.getProxy().mySeatvo.turnBet;
                    }
                    playcards.getProxy().addBet(totalBet);
                    mc2sdk.event(50041 /* ADDBET_B3 */, room.getProxy().current.svrOfsId);
                    break;
                case this.biaoqingbtn:
                    if (this.chatview == null) {
                        this.chatview = new playcards.PlayCardsChatComp();
                    }
                    if (this.chatview.parent == null) {
                        this.view.mainview.addChild(this.chatview);
                        this.chatview.show();
                    }
                    else
                        this.chatview.close();
                    break;
                case this.liaotianbtn:
                    if (this.chatMessview == null) {
                        this.chatMessview = new playcards.PlaycardsChatMessComp();
                    }
                    if (this.chatMessview.parent == null) {
                        this.view.mainview.addChild(this.chatMessview);
                        this.chatMessview.refText(this.messTextFlow);
                    }
                    else
                        this.chatMessview.close();
                    break;
                case this.r1btn:
                    playcards.getProxy().sendAction([playcards.getProxy().ACT_FOLD]);
                    break;
                case this.r2btn:
                    if (this.isRangpai()) {
                        playcards.getProxy().sendAction([playcards.getProxy().ACT_CHECK]);
                    }
                    else if (this.isAllin()) {
                        playcards.getProxy().sendAction([playcards.getProxy().ACT_ALLIN]);
                    }
                    else {
                        playcards.getProxy().sendAction([playcards.getProxy().ACT_CALL]);
                    }
                    break;
                case this.r3btn:
                    this.showAddBet();
                    break;
                case this.r4btn:
                    if (this.isLiangpai()) {
                        this.isLiangpaiClick = true;
                        __PVO().to(app.NetAction.MATCH_SHOW_CARD);
                        this.setChildVisable(this.right3btns, false, this.bottombtns);
                    }
                    else {
                        if (room.getProxy().currentType == 7 /* PK */) {
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN);
                        }
                        else {
                            var value = playcards.getTableVO().minJoinMoney * playcards.getTableVO().maxMagnification;
                            __PVO().i(value).to(app.NetAction.MATCH_TAKEIN);
                        }
                    }
                    break;
                case this.sitbtn:
                    // __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SITE);
                    __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION, [2]); //从旁观荷官的状态站起
                    user.getProxy().autoSit(1, false);
                    break;
                case this.giftbtn:
                    if (this.giftview == null) {
                        this.giftview = new playcards.PlayCardsGiftComp();
                    }
                    if (this.giftview.parent == null) {
                        this.view.mainview.addChild(this.giftview);
                    }
                    else
                        this.giftview.close();
                    break;
                case this.r5btn: // 快速换桌
                case this.fastFoldBtn:
                    playcards.getProxy().change();
                    break;
                //              case this.btntask://任务
                //                    __OPEN_PRE_MOUDLE(AppReg.APP_MISSION,[mission.OPEN_TYPE.room],null,null, this.view.mainview);//,
                //                  break;     
                case this.btnrank:
                    if (room.getProxy().currentType == 4 /* SNG */)
                        __OPEN_PRE_MOUDLE(AppReg.CURRENT_MATCH_INFO, null, null, null, this.view.mainview);
                    else if (room.getProxy().currentType == 5 /* MTT */)
                        __OPEN_PRE_MOUDLE(AppReg.MTT_STATE, 1, null, null, this.view.mainview);
                    break;
                case this.trustview:
                    this.hideTrust();
                    break;
                case this.cgbtn1:
                    playcards.getProxy().cgTime = 0;
                    this.sendCardGuess();
                    break;
                case this.cgbtn2:
                    playcards.getProxy().cgTime = 1;
                    this.sendCardGuess();
                    break;
                case this.cgbtn3:
                    playcards.getProxy().cgTime = 2;
                    this.sendCardGuess();
                    break;
                case this.cgbtn4:
                    if (++playcards.getProxy().cgNumber >= playcards.getProxy().cgStakeRules.length)
                        playcards.getProxy().cgNumber = 0;
                    this.setCardGuess();
                    break;
                case this.btnCaiShen:
                    //__OPEN_PRE_MOUDLE(AppReg.MAMMON, null, null, null, this.view.mainview);
                    __OPEN_PRE_MOUDLE(AppReg.newMammon, null, null, null, this.view.mainview);
                    break;
                case this.btnChengzhang:
                    __OPEN_PRE_MOUDLE(AppReg.APP_ChengZhang, null, null, null, this.view.mainview);
                    break;
                case this.btnGoldTreen:
                    __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE, null, null, null, this.view.mainview);
                    break;
            }
        };
        /**财神按钮显示走服务器配置
         * 无推送不显示
         */
        PlayCardsPlayComp.prototype._showCaishen = function () {
            this.setChildVisable(this.btnCaiShen, true, this);
        };
        /**更新财神btn相关内容及特效 */
        PlayCardsPlayComp.prototype.updateBtnCaiShen = function () {
            // var totalRound:number = playcards.getTableVO().caishentime;
            // var nowRound:number = playcards.getTableVO().caishenround;
            // // 更改财神显示的文字
            // this.txtCaiShen.text = gameabc.StringUtils.formatString("{0}/{1}", nowRound, totalRound);
            // // dragonBones.WorldClock.clock.add(this.armatureCaiShen);
            // // this.armatureCaiShen.display.visible = true;
            // this.armatureCaiShen.animation.play("caishensongfu",1);
            var totalNum = mammon.getProxy()._totalPoolNum >= 0 ? mammon.getProxy()._totalPoolNum : 0;
            // 更改财神显示的文字
            this.txtCaiShen.text = gameabc.StringUtils.formatString("{0}", totalNum);
            this.armatureCaiShen.animation.play("caishensongfu", 1);
        };
        /**更新财神倒计时的描述框 */
        PlayCardsPlayComp.prototype.updateCaishenDesc = function (lastNum) {
            //改成通用冒泡方法 zhj
            if (lastNum <= 10 && lastNum >= 0) {
                // this._group_caishenDes.visible = true;
                this.view.effect.showMess(-5, this.height - 250, "财神奖励\n即将开奖", this, "bottom");
            }
            // else {
            //     this._group_caishenDes.visible = false;
            // }
            // egret.setTimeout(()=>{this._group_caishenDes.visible = false;},this,3000);
        };
        PlayCardsPlayComp.prototype.addBtnChengzhang = function () {
            if (this.mvChengzhang == null) {
                gameabc.addMovieGroup("chengzhang_ske_dbmv", "chengzhang_tex_png", AppReg.APP_PLAYCARDS);
                this.mvChengzhang = gameabc.buildMovie("MovieClip", AppReg.APP_PLAYCARDS);
                this.mvChengzhang.x = this.mvChengzhang.y = 30;
                this.btnChengzhang.addChild(this.mvChengzhang);
            }
            if (this.cangetChengzhang)
                this.mvChengzhang.play(null);
            this.setChildVisable(this.btnChengzhang, true, this);
        };
        /**移除成长按钮 */
        PlayCardsPlayComp.prototype.removeBtnChengzhang = function () {
            if (this.mvChengzhang) {
                this.mvChengzhang.stop();
            }
            this.setChildVisable(this.btnChengzhang, false, this);
        };
        /**检查是否有成长可领 */
        PlayCardsPlayComp.prototype.checkChengzhang = function () {
            this.cangetChengzhang = false; //当前是否可领取
            var json = RES.getRes("chengzhang_json");
            var myuser = user.getProxy().playInfoVO;
            if (json && myuser) {
                var data = json.data;
                var totalget = 0; //已经获得积分          
                for (var i = 0, len = data.length; i < len; i++) {
                    totalget += Math.min(Number(myuser[data[i].num]), Number(data[i].maxnum)) * Number(data[i].mark);
                }
                var gift = json.gift; //可领奖积分列表 可能不是顺序
                var giftItem = json.giftItem; //可领奖物品列表
                var getgift = myuser.rewardrecord;
                var max = 0; //积分上限
                var giftindex = gift.length - 1; //当前显示
                for (var i = 0, len = gift.length; i < len; i++) {
                    var g = Number(gift[i]);
                    max = Math.max(g, max);
                    if (totalget >= g) {
                        var nohas = getgift.indexOf(i + "") == -1;
                        if (nohas) {
                            giftindex = i;
                            this.cangetChengzhang = true;
                            break;
                        }
                    }
                    else if (!this.cangetChengzhang && i < giftindex) {
                        giftindex = i;
                    }
                }
            }
            if (this.cangetChengzhang) {
                this.view.effect.showMess(-5, this.height - 250, "成长奖励\n可领取", this, "bottom");
                if (this.mvChengzhang)
                    this.mvChengzhang.play(null);
            }
            else {
                if (this.mvChengzhang)
                    this.mvChengzhang.stop();
            }
            return totalget >= max && !this.cangetChengzhang; //出师
        };
        PlayCardsPlayComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.clearLiangPaiTimer();
            if (this.missionBox)
                this.missionBox.removeFromParent(true);
            if (this.armatureCaiShen) {
                dragonBones.WorldClock.clock.remove(this.armatureCaiShen);
                gameabc.destoryFactory(AppReg.APP_PLAYCARDS);
                this.armatureCaiShen.dispose();
            }
            if (this.mvChengzhang) {
                this.mvChengzhang.stop();
                this.mvChengzhang.dispose();
                this.btnChengzhang.addChild(this.mvChengzhang);
                this.mvChengzhang = null;
            }
            //           if (this.missionTipUI)
            //               this.missionTipUI.dispose();  
            if (this.sngWheel)
                this.sngWheel.dispose();
            this.sngWheel = null;
            if (this.moneySelect)
                this.moneySelect.dispose();
            if (this.outmenu)
                this.outmenu.dispose();
            if (this.btnGoldTreen)
                this.btnGoldTreen.dispose();
            if (gameabc.hasMovieGroup(AppReg.APP_PLAYCARDS)) {
                gameabc.removeMovieGroup(AppReg.APP_PLAYCARDS);
            }
        };
        return PlayCardsPlayComp;
    }(gameabc.UICustomComponent));
    PlayCardsPlayComp.LIANG_PAI_TIME = 5000;
    playcards.PlayCardsPlayComp = PlayCardsPlayComp;
    __reflect(PlayCardsPlayComp.prototype, "playcards.PlayCardsPlayComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsPlayComp.js.map