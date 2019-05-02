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
    /**
     *
     * @author
     *
     */
    var PlayCardsUIMediator = (function (_super) {
        __extends(PlayCardsUIMediator, _super);
        function PlayCardsUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, PlayCardsUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(PlayCardsUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        PlayCardsUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            return [
                netaction.MATCH_S_ADDTABLE,
                consts.MATCH_S_SIT,
                // netaction.MATCH_S_OUTTABLE,//玩家离开座子
                consts.MATCH_S_UP,
                netaction.MATCH_S_START,
                netaction.MATCH_S_NEWSTART,
                netaction.MATCH_S_GETCARD,
                netaction.MATCH_S_PLAYACT,
                netaction.MATCH_S_OVER,
                netaction.TEXAS_SHOW_CARD,
                netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD,
                netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD_WIN,
                consts.MATCH_CDOVER,
                consts.MATCH_SHOWBTNS,
                consts.MATCH_SHOWCG,
                consts.MATCH_SHOWTIP,
                consts.MATCH_OUTROOM,
                netaction.MATCH_S_SEND_GIFT,
                netaction.MATCH_S_GET_INFO,
                netaction.MATCH_S_CHAT,
                // consts.MATCH_S_ANTE_UPDATE, // 更新前注信息
                consts.UPDATE_MATCH_NUMPLAYERS,
                netaction.MTT_AWARDINFO,
                consts.AWAKEN_MISSION_BOX,
                netaction.GLXY_MESSAGEVO_RESP_CAISHEN_INFO,
                netaction.PROCESS_XYID_RESP_CAISHEN_INFO,
                // app.NetAction.PROCESS_XYID_REQ_CAISHEN_LIST,         // 请求财神获奖记录
                // app.NetAction.PROCESS_XYID_RESP_CAISHEN_LIST,        // 推送财神获奖记录   
                consts.UPDATE_MAMMON_POOL_RECORD,
                consts.INFO_TIP_UPDATE,
                consts.CLEAR_TABLE_PLAYER_UI,
                netaction.GLXY_REAL_RESP_DEALER_KEY,
                netaction.MATCH_S_SEENER_JOIN,
                netaction.MATCH_S_SEENER_lEAVE,
                netaction.MATCH_ANTE,
                netaction.GLXY_REAL_RESP_DEALER_STATE,
                netaction.RESP_PLAYER_RANK,
                mission.MissionMediator.UPDATE_MISSION,
                mission.MissionMediator.MISSION_LEVEL_UP,
                mission.MissionMediator.ADD_MISSION,
                netaction.RESP_DEVELOP_SCORE,
                netaction.RESP_USER_REWARD,
                netaction.RESP_BUYINSURE,
                netaction.RESP_INSURE_INFO,
                netaction.RESP_REPORT_PLAYER
            ];
        };
        PlayCardsUIMediator.prototype.handleNotification = function (notification) {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
            var effect = true;
            if (body instanceof cyvos.GamePackage) {
                var message = new appvos.MessageVO(body.data.buffer);
                if (playcards.getProxy().tableVO == null)
                    return;
            }
            else if (body instanceof appvos.MessageVO) {
                message = body;
                if (message.seqNum == 1)
                    effect = false;
            }
            var proxy = playcards.getProxy();
            var act = notification.getName();
            switch (act) {
                // 新加的
                case consts.INFO_TIP_UPDATE:
                    this.view.updateInfoTip(body);
                    break;
                // case netaction.MATCH_S_ADDTABLE:
                //     var joinvo = new appvos.JoinPlayerVO(message.data.data[0]);
                //     this.view.addJoin(joinvo);
                //     break;
                case consts.MATCH_S_SIT:
                    // var playvo = new appvos.SeatPlayerVO(message.data.data[0]);
                    this.view.addPlay(body);
                    break;
                // case consts.MATCH_S_ANTE_UPDATE://更新前注信息              
                //     this.view.refreshAnteAndBlind(getProxy().tableVO);
                //     break;
                // case consts.MATCH_S_OUTTABLE://玩家离开座子                              
                //    this.view.removePlay(message.data.longValues[0]);
                //     break;
                case consts.MATCH_S_UP:
                    if (body.length > 1)
                        var type = body[1]; //1 超时站起
                    else
                        type = 0;
                    this.view.removeSeat(body[0], type);
                    break;
                // case consts.MATCH_START://房主开始
                //     this.view.checkStart();
                //     break;
                case consts.MATCH_OUTROOM:
                    tip.Alert.show("您已经离开房间，请重新进入", null, tip.ALERT, this.leaveRoom, null, this);
                    break;
                case consts.MATCH_CDOVER:
                    this.view.cdover();
                    break;
                case consts.MATCH_SHOWBTNS:
                    this.view.playComp.showBtns(body);
                    break;
                case consts.MATCH_SHOWCG:
                    this.view.playComp.showCardGuess(body);
                    break;
                case consts.MATCH_SHOWTIP:
                    this.view.showTip();
                    break;
                case netaction.MATCH_S_START:
                    // __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO,[user.getProxy().svrRoleId]);
                    __SEND_NOTIFICATION(consts.MATCH_SHOWCG, false); //关闭猜牌
                    if (this.view.effect.isPlayover)
                        this.view.effect.playOverEnd();
                    var tableVO = proxy.tableVO;
                    tableVO.globalCards = [];
                    tableVO.totalBet = 0;
                    if (proxy.mySeat != -1 && proxy.playvideovo == null) {
                        this.view.videoComp.startVideo(message.data.longValues[0]);
                        this.view.videoComp.addAction(message, act, true);
                    }
                    tableVO.tableStatus = 1;
                    tableVO.isAllIN = false;
                    tableVO.banker = message.data.intValues[0];
                    tableVO.whoplay = message.data.intValues[1];
                    var sb = message.data.intValues[2]; //小盲位
                    var bb = message.data.intValues[3]; //大盲位
                    if (message.data.longValues.length > 2) {
                        tableVO.bbBet = message.data.longValues[1];
                        tableVO.sbBet = tableVO.bbBet / 2;
                        // if (room.getProxy().current) {
                        //     room.getProxy().current.bigBlinds = tableVO.bbBet;
                        //     room.getProxy().current.smallBlinds = tableVO.sbBet;
                        // }
                        if (match.getProxy().currentMatchVO)
                            this.view.timeoutAlert(message.data.longValues[2]);
                        this.view.refreshAnteAndBlind(tableVO);
                    }
                    else if (7 /* PK */ == room.getProxy().currentType) {
                        this.view.refreshAnteAndBlind(tableVO);
                    }
                    var allvo = {};
                    for (i = 0; i < message.data.data.length; i++) {
                        var infovo = new appvos.GameEndInfoVO(message.data.data[i]);
                        allvo[infovo.seatId] = infovo;
                    }
                    this.view.videoComp.reset(allvo);
                    this.view.myIsAct = false;
                    this.view.playComp.isLiangpaiClick = false;
                    this.view.playComp.winnerCanShowCard = false;
                    this.view.playComp.clearLiangPaiTimer();
                    this.view.start(sb, bb, allvo, tableVO.preBet);
                    if (message.data.strValues.length > 1) {
                        proxy.mySeatvo.myCard[0] = Number(message.data.strValues[0]);
                        proxy.mySeatvo.myCard[1] = Number(message.data.strValues[1]);
                        this.view.effect.showPlaysCards(effect);
                    }
                    else if (proxy.mySeatvo)
                        proxy.mySeatvo.myCard = [];
                    break;
                case netaction.MATCH_S_NEWSTART:
                    // this.view.hideSafe();
                    this.view.videoComp.addAction(message, act);
                    proxy.tableVO.gameStatus = message.data.intValues[0];
                    proxy.tableVO.whoplay = message.data.intValues[1];
                    if (proxy.mySeatvo != null)
                        proxy.mySeatvo.raiseTime = 0;
                    if (playcards.getTableVO().whoplay == proxy.mySeat)
                        proxy.AntePower = message.data.intValues[2];
                    var addcards = [];
                    for (var i = 3; i < message.data.intValues.length; i++) {
                        addcards.push(message.data.intValues[i]);
                    }
                    proxy.tableVO.globalCards = proxy.tableVO.globalCards.concat(addcards);
                    this.view.playComp.updateCheckBox(this.view.playComp.rangqicheck, false);
                    this.view.playComp.updateCheckBox(this.view.playComp.rangpaicheck, false);
                    this.view.playComp.updateCheckBox(this.view.playComp.gencheck, false);
                    this.view.playComp.genNum = 0;
                    this.view.myIsAct = false;
                    this.view.effect.addGlobalCards(addcards, message.data.longValues, effect);
                    if (proxy.tableVO.isAllIN) {
                        this.view.effect.showPect();
                    }
                    if (proxy.tableVO.dealerstate != 3 /* LEAVE_SHORT_TIME */) {
                        proxy.tableVO.dealerstate = 0 /* IDLE */;
                        this.view.checkdealer();
                    }
                    if (proxy.playvideovo == null && proxy.mySeat == -1)
                        __PVO().to(app.NetAction.MATCH_HEART_BEAT);
                    break;
                case netaction.MATCH_S_GETCARD:
                    // proxy.myCards = message.data.intValues;
                    this.view.videoComp.addAction(message, act);
                    if (proxy.mySeatvo) {
                        if (proxy.mySeatvo.myCard.length == 0) {
                            if (message.data != null) {
                                proxy.mySeatvo.myCard = message.data.intValues;
                            }
                            this.view.effect.showPlaysCards(effect);
                        }
                    }
                    else
                        this.view.effect.showPlaysCards(effect);
                    break;
                case netaction.MATCH_S_PLAYACT:
                    this.view.videoComp.addAction(message, act);
                    playcards.getTableVO().whoplay = message.data.intValues[2];
                    if (playcards.getTableVO().whoplay == proxy.mySeat)
                        proxy.AntePower = message.data.intValues[4]; //权限 todo
                    this.view.playAction(message.data.intValues[0], message.data.intValues[1], message.data.intValues[3], effect);
                    break;
                case netaction.MATCH_S_OVER:
                    this.view.hideSafe();
                    this.view.videoComp.addAction(message, act, true);
                    var all = [];
                    for (i = 0; i < message.data.data.length; i++) {
                        var vo = new appvos.GameEndInfoVO(message.data.data[i]);
                        all.push(vo);
                    }
                    this.view.effect.playover(all, message.data.longValues, message.data.intValues[0] == 1);
                    // if (getProxy() && getProxy().mySeat > -1)
                    //     getProxy().lineHistory.push(getProxy().mySeatvo.nowBet);
                    proxy.tableVO.dealerstate = 2 /* SHUFFLE_CARDS */;
                    break;
                case netaction.TEXAS_SHOW_CARD:
                    this.view.videoComp.addAction(message, act, true);
                    var all = [];
                    for (i = 0; i < message.data.data.length; i++) {
                        all.push(new appvos.GameEndInfoVO(message.data.data[i]));
                    }
                    if (message.data.intValues[0] == 1 && all.length > 0)
                        this.view.effect.showOverOpenCard(all[0]);
                    else {
                        this.view.effect.playover(all, null);
                        proxy.tableVO.isAllIN = true;
                        if (this.view.safecomp && playcards.getProxy().buySafe == 1) {
                            this.view.safecomp.showItemCards();
                        }
                    }
                    break;
                case netaction.MATCH_S_CHAT:
                    if (message.data)
                        this.view.effect.showchat(message.data.intValues[0], message.data.intValues[1], message.data.strValues[0], message.data.longValues);
                    break;
                case netaction.MATCH_S_SEND_GIFT:
                    if (message.data.intValues.length == 0 || playcards.getProxy().dashangchar == message.data.intValues[1])
                        this.view.effect.playdashang(message.data.intValues[0], message.data.strValues[0], message.data.longValues);
                    else
                        this.view.effect.playGift(message.data.intValues[0], message.data.intValues[1]);
                    break;
                case netaction.MATCH_S_GET_INFO:
                    this.openCount(message.data);
                    break;
                case netaction.MATC_S_IS_TRUSTEE:
                    this.view.playComp.showTrust();
                    break;
                case netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD:
                    //  if (message.data.intValues.length > 0) {
                    // if (PlayCardsUIMediator.index == null) {
                    //  PlayCardsUIMediator.index = message.data.intValues[0];
                    // } // else {
                    // PlayCardsUIMediator.index++;
                    //if (PlayCardsUIMediator.index != message.data.intValues[0]) {
                    // tip.Alert.show(PlayCardsUIMediator.index + "  mess index error " + message.data.intValues[0]);
                    // }
                    //  console.log("mess index "+PlayCardsUIMediator.index+","+ message.data.intValues[0]);
                    // if (PlayCardsUIMediator.index % 1000==0) {
                    //     var i = 0;
                    //     var time: number = egret.getTimer();
                    //     while (i == 0) {
                    //         if (egret.getTimer() - time > 1000)
                    //             i = 1;
                    //         }
                    //     }
                    // }
                    // return;
                    // }
                    if (message.data.longValues.length > 0) {
                        this.view.playComp.finishCardGuess();
                    }
                    break;
                case netaction.MATCH_ANTE:
                    proxy.tableVO.preBet = message.data.longValues[0];
                    // __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_ANTE_UPDATE);
                    this.view.refreshAnteAndBlind(proxy.tableVO);
                    if (message.data.intValues[0] != 1) {
                        mc2sdk.event(53124 /* ON_RESP_OPEN_INFO */);
                    }
                    break;
                case netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD_WIN:
                    this.view.effect.showCardGuessWin();
                    break;
                case consts.CLEAR_TABLE_PLAYER_UI: //荷官发牌 清理牌桌
                case netaction.STD_CAN_REPEAT_DEAL_CARD:
                    playcards.getTableVO().tableStatus = 0;
                    this.view.showWait(true);
                    break;
                case netaction.GLXY_REAL_RESP_DEALER_KEY:
                    if (message.data != null && message.data.strValues.length > 0) {
                        if (proxy.tableVO)
                            proxy.tableVO.dealer = message.data.strValues[0];
                        proxy.isLive = true;
                    }
                    else {
                        if (proxy.tableVO)
                            proxy.tableVO.dealer = null;
                        proxy.isLive = false;
                    }
                    this.view.checkLive();
                    break;
                case netaction.GLXY_REAL_RESP_DEALER_STATE:
                    if (proxy.tableVO) {
                        proxy.tableVO.dealerstate = message.data.intValues[0];
                        this.view.checkdealer();
                    }
                    break;
                // case netaction.NOTICE_CLIENT_WAITING_LIST:// 玩家进入排队，需要发坐下, 只在防作弊房会收到。
                //      this.view.removeAllItem();
                //      break;    
                case consts.UPDATE_MATCH_NUMPLAYERS:
                    if (this.view.wait != null) {
                        if (4 /* SNG */ == room.getProxy().currentType) {
                            if (body == -1)
                                this.view.wait.removeFromParent();
                            var matchVO = match.getProxy().currentMatchVO;
                            this.view.wait.setSng(matchVO.minPlayers - matchVO.numPlayers);
                        }
                        else {
                            if (body != null) {
                                this.view.showWait(true);
                                this.view.wait.showType(body); //3显示系统配桌  2比赛即将开始
                            }
                            else
                                this.view.wait.removeFromParent();
                        }
                    }
                    break;
                case consts.AWAKEN_MISSION_BOX:
                    if (this.view == null)
                        return;
                    if (this.view.playComp == null)
                        return;
                    if (this.view.playComp.missionBox == null)
                        return;
                    this.view.playComp.missionBox.openTheBox();
                    this.view.playComp.missionBox.openTheTip();
                    break;
                case netaction.MATCH_S_SEENER_JOIN:
                    if (message.data.data.length > 0) {
                        var playvo = new appvos.JoinPlayerVO(message.data.data[0]);
                        var len;
                        var tablevo = playcards.getTableVO();
                        for (i = 0, len = tablevo.joinPlayerVO.length; i < len; i++) {
                            var join = tablevo.joinPlayerVO[i];
                            if (join.roleId == playvo.roleId) {
                                break;
                            }
                        }
                        if (i >= len) {
                            tablevo.joinPlayerVO.push(playvo);
                        }
                    }
                    this.view.playComp.refJoin();
                    break;
                case netaction.MATCH_S_SEENER_lEAVE:
                    var id = message.data.longValues[0];
                    var tablevo = playcards.getTableVO();
                    for (i = 0, len = tablevo.joinPlayerVO.length; i < len; i++) {
                        var join = tablevo.joinPlayerVO[i];
                        if (join.roleId == id) {
                            tablevo.joinPlayerVO.splice(i, 1);
                            break;
                        }
                    }
                    this.view.playComp.refJoin();
                    break;
                case netaction.GLXY_MESSAGEVO_RESP_CAISHEN_INFO:
                    playcards.getTableVO().caishenround = message.data.intValues[0]; //当前轮数
                    if (message.data.intValues.length > 1) {
                        var winingIndex = message.data.intValues[1]; //中奖人的位置
                        var winingCount = message.data.intValues[2]; //中奖金额
                        var playInfo = playcards.getProxy().getPlayVOBySeat(winingIndex);
                        if (playInfo) {
                            var award_msg = gameabc.getMessage("MAMMON_AWARD", playInfo.name, winingCount);
                            tip.popSysRollTopTip(award_msg);
                        }
                    }
                    // if(this.view == null) return;
                    // if(this.view.playComp == null) return;
                    if (this.view.playComp.btnCaiShen == null)
                        return;
                    this.view.playComp.updateBtnCaiShen();
                    if (playInfo)
                        this.view.effect.getMoney(winingIndex, winingCount);
                    if (__IS_MOUDLE_OPEN(AppReg.MAMMON)) {
                        var mammonUI = __GET_MOUDLE_COMP(AppReg.MAMMON);
                        if (mammonUI) {
                            mammonUI.fullDataUI();
                        }
                    }
                    break;
                case netaction.PROCESS_XYID_RESP_CAISHEN_INFO:
                    var message = new appvos.MessageVO(body.data.buffer);
                    if (message.data.intValues.length > 1 && message.data.longValues.length > 0) {
                        var currentRound = message.data.intValues[0]; // 当前财神轮数
                        var totalRound = message.data.intValues[1]; // 发奖轮数
                        var totalPoolNum = message.data.longValues[0]; // 总的奖池数，这里的long已经转好了
                        var farToWinningNum = Math.abs(totalRound - currentRound);
                        this.view.playComp.updateCaishenDesc(farToWinningNum);
                        mammon.getProxy()._setData(totalPoolNum, farToWinningNum); // 缓存数据
                        if (message.data.strValues.length > 0 && message.data.longValues.length > 1) {
                            var winningNum = message.data.longValues[1]; // 奖金
                            var userName = message.data.strValues[0]; // 玩家名称
                            if (true) {
                                userName = userName.length > 0 ? userName : "robot";
                            }
                            var time = new Date().getTime() / 1000;
                            mammon.getProxy()._setPoolRecords(time, userName, winningNum);
                            if (__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                                var newMammon = __GET_MOUDLE_COMP(AppReg.newMammon);
                                if (newMammon) {
                                    newMammon._addRecordList(time, userName, winningNum);
                                }
                            }
                            tip.popSysRollTopTip(mammon.getProxy()._getWinningStr(userName, winningNum));
                        }
                    }
                    if (this.view.playComp.btnCaiShen == null)
                        return;
                    this.view.playComp.updateBtnCaiShen();
                    this.view.playComp._showCaishen(); // 有推送则显示财神按钮 
                    if (__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                        var newMammon = __GET_MOUDLE_COMP(AppReg.newMammon);
                        if (newMammon) {
                            newMammon._updateUIData();
                        }
                    }
                    break;
                case consts.UPDATE_MAMMON_POOL_RECORD:
                    if (__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                        var newMammon = __GET_MOUDLE_COMP(AppReg.newMammon);
                        if (newMammon) {
                            newMammon.init();
                        }
                    }
                    break;
                case mission.MissionMediator.MISSION_LEVEL_UP:
                case mission.MissionMediator.UPDATE_MISSION:
                case mission.MissionMediator.ADD_MISSION:
                    var missionInfo = notification.getBody();
                    if (this.view.playComp && this.view.playComp.btnGoldTreen) {
                        if (missionInfo.type == mission.MissionType.godTree && missionInfo.subtype == mission.MissionSubType.god_tree) {
                            this.view.playComp.btnGoldTreen.updateMission(missionInfo);
                        }
                    }
                    break;
                case netaction.RESP_PLAYER_RANK:
                    this.view.playComp.ranklab.text = match.getProxy().currentMatchVO.myRank + "/" + match.getProxy().currentMatchVO.numPlayers; //  "第"+ match.getProxy().currentMatchVO.myRank +"名";
                    //this.view.playComp.leftNumlab.text = "剩余玩家"+match.getProxy().currentMatchVO.numPlayers;
                    break;
                case netaction.MTT_AWARDINFO:
                    //MTT比赛结束 关闭升盲提示
                    egret.clearInterval(this.view.timeoutAlertTime);
                    break;
                case netaction.RESP_DEVELOP_SCORE:
                    var message = new appvos.MessageVO(body.data.buffer);
                    var userinfo = new appvos.UserInfoVO(message.data.data[0]);
                    var myuserinfo = user.getProxy().playInfoVO;
                    var keys = ["foldright", "raiseright", "raiseperfect", "havethreesheet"]; //弃牌 加注 价值下注
                    var effects = ["youxiuqipai", "dadepiaoliang", "dadepiaoliang", ""]; //
                    for (var i = 0; i < 4; i++) {
                        var key = keys[i];
                        if (userinfo[key]) {
                            var add = userinfo[key] - myuserinfo[key];
                            myuserinfo[key] = userinfo[key]; //弃牌
                            if (add > 0) {
                                this.view.effect.showAddChengZhang(effects[i]);
                                this.view.playComp.checkChengzhang();
                            }
                        }
                    }
                    break;
                case netaction.RESP_USER_REWARD:
                    var message = new appvos.MessageVO(body.data.buffer);
                    if (message.data) {
                        user.getProxy().playInfoVO.rewardrecord.push(message.data.intValues[0] + "");
                        if (__IS_MOUDLE_OPEN(AppReg.APP_ChengZhang)) {
                            var goldTreeUI = __GET_MOUDLE_COMP(AppReg.APP_ChengZhang);
                            if (goldTreeUI) {
                                // console.log("领取成长奖励");
                                // if(message.data.intValues[0]>=(goldTreeUI._getTotalGiftNum()-1)){//出师
                                //     win.getProxy()._isApprenticeship = true;
                                // }
                                //领取奖励
                                goldTreeUI.getItem(message.data.intValues[0]);
                            }
                        }
                        this.view.playComp.checkChengzhang();
                        item.getProxy().getItemDate(); //刷新道具
                        this.sendNotification(app.NetAction.TOOL_RILVER); //刷新银两
                    }
                    else if (message.errorCode > 0)
                        this.sendNotification(app.NetAction.ERROR_SRS_CODE, message.errorCode);
                    break;
                case netaction.RESP_BUYINSURE:
                    this.view.hideSafe();
                    if (message.data.longValues[0] > 0) {
                        //  if (getProxy().safeResult == null)
                        //     getProxy().safeResult = [];
                        this.view.videoComp.addAction(message, act);
                        playcards.getProxy().safeResult = [message.data.intValues[0], message.data.longValues[1]];
                        var safeitem = this.view.allItem[message.data.intValues[0]];
                        this.view.effect.showItemMess(safeitem, "投保" + FormatUtils.wan(message.data.longValues[0]));
                    }
                    break;
                case netaction.RESP_INSURE_INFO:
                    this.view.videoComp.addAction(message, act);
                    this.view.showSafe(message.data);
                    break;
                case netaction.RESP_REPORT_PLAYER:
                    tip.popSysCenterTip("GM举报成功", tip.TIPS_TYPE.TIPS_CORRECT);
                    break;
            }
        };
        PlayCardsUIMediator.prototype.openCount = function (vo) {
            var alldata = [];
            var cvo;
            var index;
            for (var i = 0, len = vo.data.length; i < len; i++) {
                cvo = new playcards.CountVO();
                index = i * 3;
                cvo.roleid = vo.longValues[index];
                cvo.total = FormatUtils.wan(vo.longValues[index + 1]);
                cvo.winNum = vo.longValues[index + 2] - vo.longValues[index + 1];
                cvo.win = FormatUtils.wan(cvo.winNum);
                cvo.name = FormatUtils.protoToGBK(vo.data[i]);
                for (var j = 0, jlen = alldata.length; j < jlen; j++) {
                    if (cvo.winNum > alldata[j].winNum) {
                        alldata.splice(j, 0, cvo);
                        break;
                    }
                }
                if (j == jlen)
                    alldata.push(cvo);
            }
            for (j = 0, jlen = alldata.length; j < jlen; j++) {
                alldata[j].rank = (j + 1).toString();
            }
            __OPEN_MOUDLE(AppReg.APP_PLAY_COUNT, alldata, null, null, this.view.mainview);
            ;
        };
        PlayCardsUIMediator.prototype.leaveRoom = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        };
        return PlayCardsUIMediator;
    }(puremvc.Mediator));
    PlayCardsUIMediator.NAME = "PlayCardsUIMediator";
    PlayCardsUIMediator.index = null;
    playcards.PlayCardsUIMediator = PlayCardsUIMediator;
    __reflect(PlayCardsUIMediator.prototype, "playcards.PlayCardsUIMediator");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsUIMediator.js.map