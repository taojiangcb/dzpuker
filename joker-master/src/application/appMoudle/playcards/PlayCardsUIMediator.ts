module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardsUIMediator extends puremvc.Mediator {
        public static NAME: string = "PlayCardsUIMediator";
      
        
        public constructor(viewComponent: Object = null) {
            super(PlayCardsUIMediator.NAME,viewComponent);
        }
        public get view(): PlayCardsUIMoudleComp {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction
            return [
                netaction.MATCH_S_ADDTABLE,//进入桌子
                consts.MATCH_S_SIT,//坐下
                // netaction.MATCH_S_OUTTABLE,//玩家离开座子
                consts.MATCH_S_UP,//座子站起
                netaction.MATCH_S_START,//牌局开始
                netaction.MATCH_S_NEWSTART,//新一圈开
                netaction.MATCH_S_GETCARD,//收到底牌
                netaction.MATCH_S_PLAYACT,//玩家动作
                netaction.MATCH_S_OVER,//牌局结束
                netaction.TEXAS_SHOW_CARD,//系统发牌
                netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD,//猜手牌
                netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD_WIN,//猜手牌胜
                consts.MATCH_CDOVER,//cd结束
                consts.MATCH_SHOWBTNS,//显示下面按钮
                consts.MATCH_SHOWCG,//显示猜牌
                consts.MATCH_SHOWTIP,//牌局提示
                consts.MATCH_OUTROOM,//服务器推送退出房间
                netaction.MATCH_S_SEND_GIFT,//打赏
                netaction.MATCH_S_GET_INFO,//获取统计信息
                netaction.MATCH_S_CHAT,//聊天
                // consts.MATCH_S_ANTE_UPDATE, // 更新前注信息
                consts.UPDATE_MATCH_NUMPLAYERS, //更新玩家人数
                netaction.MTT_AWARDINFO,//mtt比赛结束
                consts.AWAKEN_MISSION_BOX, //刷新MissionBox的状态
                netaction.GLXY_MESSAGEVO_RESP_CAISHEN_INFO,          //推送财神信息
                netaction.PROCESS_XYID_RESP_CAISHEN_INFO,            // 推送财神信息 新
                // app.NetAction.PROCESS_XYID_REQ_CAISHEN_LIST,         // 请求财神获奖记录
                // app.NetAction.PROCESS_XYID_RESP_CAISHEN_LIST,        // 推送财神获奖记录   
                consts.UPDATE_MAMMON_POOL_RECORD, // 更新财神奖池信息

                consts.INFO_TIP_UPDATE,// 标签修改
                consts.CLEAR_TABLE_PLAYER_UI,//清理牌桌
                netaction.GLXY_REAL_RESP_DEALER_KEY,
				netaction.MATCH_S_SEENER_JOIN,//旁观进入
                netaction.MATCH_S_SEENER_lEAVE,//旁观离开
                netaction.MATCH_ANTE,//更新前注信息
                netaction.GLXY_REAL_RESP_DEALER_STATE,
                netaction.RESP_PLAYER_RANK,
                mission.MissionMediator.UPDATE_MISSION,         //更新任务状态
                mission.MissionMediator.MISSION_LEVEL_UP,        //任务进阶
                mission.MissionMediator.ADD_MISSION,
                netaction.RESP_DEVELOP_SCORE, //玩家成长积分改变
                netaction.RESP_USER_REWARD,
                netaction.RESP_BUYINSURE,
                netaction.RESP_INSURE_INFO,
                netaction.RESP_REPORT_PLAYER
            ];   
        }

        public handleNotification(notification: puremvc.INotification): void {
         
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
            var effect: boolean = true;
            if (body instanceof cyvos.GamePackage) {
                var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
                if (getProxy().tableVO == null)
                    return;    
            } else if (body instanceof appvos.MessageVO){
                 message = body;
                 if (message.seqNum == 1)//不播动画
                     effect = false;    
            }
            var proxy = getProxy();
            var act: string = notification.getName();
            switch(act) {
                // 新加的
                case consts.INFO_TIP_UPDATE://标签
					this.view.updateInfoTip(body)
					break;
                // case netaction.MATCH_S_ADDTABLE:
                //     var joinvo = new appvos.JoinPlayerVO(message.data.data[0]);
                //     this.view.addJoin(joinvo);
                //     break;
                case consts.MATCH_S_SIT://玩家入座                 
                    // var playvo = new appvos.SeatPlayerVO(message.data.data[0]);
                    this.view.addPlay(body);
                    break;
                // case consts.MATCH_S_ANTE_UPDATE://更新前注信息              
                //     this.view.refreshAnteAndBlind(getProxy().tableVO);
                //     break;
                // case consts.MATCH_S_OUTTABLE://玩家离开座子                              
                //    this.view.removePlay(message.data.longValues[0]);
                //     break;
                case consts.MATCH_S_UP://玩家座子站起
                    if (body.length > 1)
                        var type: number = body[1]; //1 超时站起
                    else
                        type = 0;
                        this.view.removeSeat(body[0],type);
                break;
                // case consts.MATCH_START://房主开始
                //     this.view.checkStart();
                //     break;
                case consts.MATCH_OUTROOM://服务端推送退出房间
                    tip.Alert.show("您已经离开房间，请重新进入",null,tip.ALERT,this.leaveRoom,null,this)
                break;
                case consts.MATCH_CDOVER://cd时间到 自动操作
                    this.view.cdover();
                    break;
                case  consts.MATCH_SHOWBTNS://显示下面按钮
                    this.view.playComp.showBtns(body);
                    break;
                case consts.MATCH_SHOWCG://显示猜牌
                    this.view.playComp.showCardGuess(body);
                    break;
                case consts.MATCH_SHOWTIP  ://牌局提示
                    this.view.showTip();
                break; 
                case netaction.MATCH_S_START://牌局开始  
                    // __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO,[user.getProxy().svrRoleId]);
                    __SEND_NOTIFICATION(consts.MATCH_SHOWCG, false);//关闭猜牌
                    if (this.view.effect.isPlayover)
                        this.view.effect.playOverEnd();
                    var tableVO = proxy.tableVO;
                    tableVO.globalCards = [];
                    tableVO.totalBet = 0;
                    if (proxy.mySeat != -1&&proxy.playvideovo==null) {
                        this.view.videoComp.startVideo(message.data.longValues[0]);
                        this.view.videoComp.addAction(message, act,true);
                    }                  
                    tableVO.tableStatus = 1;
                    tableVO.isAllIN = false;
                    tableVO.banker = message.data.intValues[0];
                    tableVO.whoplay = message.data.intValues[1];
                    var sb: number = message.data.intValues[2];//小盲位
                    var bb: number = message.data.intValues[3];//大盲位
                    if (message.data.longValues.length > 2) {
                        tableVO.bbBet = message.data.longValues[1];                     
                        tableVO.sbBet = tableVO.bbBet / 2;
                        // if (room.getProxy().current) {
                        //     room.getProxy().current.bigBlinds = tableVO.bbBet;
                        //     room.getProxy().current.smallBlinds = tableVO.sbBet;
                        // }
                        if(match.getProxy().currentMatchVO)
                             this.view.timeoutAlert(message.data.longValues[2]);
                        this.view.refreshAnteAndBlind(tableVO);
                    } else if (room.TYPE.PK == room.getProxy().currentType) {
                         this.view.refreshAnteAndBlind(tableVO);
                    }
                    var allvo:Object = {};
                    for(i = 0;i < message.data.data.length;i++){
                        var infovo =new appvos.GameEndInfoVO(message.data.data[i])
                        allvo[infovo.seatId] = infovo;
                    }
                    this.view.videoComp.reset(allvo);
                    this.view.myIsAct = false;
                    this.view.playComp.isLiangpaiClick = false;
                    this.view.playComp.winnerCanShowCard = false;
                    this.view.playComp.clearLiangPaiTimer();
                    this.view.start(sb,bb,allvo,tableVO.preBet);
                    if (message.data.strValues.length > 1) {
                        proxy.mySeatvo.myCard[0] = Number(message.data.strValues[0]);
                        proxy.mySeatvo.myCard[1] = Number(message.data.strValues[1]);
                        this.view.effect.showPlaysCards(effect);
                    } else if(proxy.mySeatvo) proxy.mySeatvo.myCard=[];
                    break;
                case netaction.MATCH_S_NEWSTART://新一圈开始
                    // this.view.hideSafe();
                    this.view.videoComp.addAction(message, act);
                    proxy.tableVO.gameStatus = message.data.intValues[0];
                    proxy.tableVO.whoplay = message.data.intValues[1];
                    if (proxy.mySeatvo != null) proxy.mySeatvo.raiseTime = 0;
                    if( getTableVO().whoplay==proxy.mySeat)
                         proxy.AntePower =  message.data.intValues[2];
                    var addcards:number[] = [];
                    for(var i: number = 3;i < message.data.intValues.length;i++){
                        addcards.push(message.data.intValues[i]);
                    }
                    proxy.tableVO.globalCards = proxy.tableVO.globalCards.concat(addcards);
                    this.view.playComp.updateCheckBox(this.view.playComp.rangqicheck,false);
                    this.view.playComp.updateCheckBox(this.view.playComp.rangpaicheck,false);
                    this.view.playComp.updateCheckBox(this.view.playComp.gencheck,false);
                    this.view.playComp.genNum = 0;
                    this.view.myIsAct = false;
                    this.view.effect.addGlobalCards(addcards, message.data.longValues, effect); 
                    if (proxy.tableVO.isAllIN) {
                        this.view.effect.showPect();
                    }
                    if (proxy.tableVO.dealerstate != dealer.DealerState.LEAVE_SHORT_TIME) {
                         proxy.tableVO.dealerstate = dealer.DealerState.IDLE;
                        this.view.checkdealer();
                    } 
                    if (proxy.playvideovo == null && proxy.mySeat == -1)//不在入座 发心跳
                           __PVO().to(app.NetAction.MATCH_HEART_BEAT);
                    break;
                    
                case netaction.MATCH_S_GETCARD://收到玩家底牌
                    // proxy.myCards = message.data.intValues;
                    this.view.videoComp.addAction(message, act);
                    if (proxy.mySeatvo) {
                         if (proxy.mySeatvo.myCard.length == 0) {
                            if(message.data!=null){
                                proxy.mySeatvo.myCard = message.data.intValues;
                            }
                            this.view.effect.showPlaysCards(effect);
                        }
                    }else 
                        this.view.effect.showPlaysCards(effect);
                    break;
                case netaction.MATCH_S_PLAYACT://收到玩家动作
                    this.view.videoComp.addAction(message, act);
                    getTableVO().whoplay = message.data.intValues[2];
                    if(getTableVO().whoplay==proxy.mySeat)
                         proxy.AntePower =  message.data.intValues[4];//权限 todo
                    this.view.playAction(message.data.intValues[0],message.data.intValues[1],message.data.intValues[3],effect);    
                    break;
                case netaction.MATCH_S_OVER://牌局结结束      
                    this.view.hideSafe();
                    this.view.videoComp.addAction(message, act,true);
                    var all: appvos.GameEndInfoVO[] = [];
                    for (i = 0; i < message.data.data.length; i++){
                        var vo: appvos.GameEndInfoVO = new appvos.GameEndInfoVO(message.data.data[i]);                     
                        all.push(vo);
                       // 我输光弹出提示是否买入(注释后, 将不提示带入窗口,默认继续带入)
//                        if(proxy.playvideovo == null && vo.seatId == proxy.mySeat && vo.canContinue != 0 && room.getProxy().current && room.getProxy().isAntiCheating) {
//                            if (vo.canContinue == 1) {//余额不足弹出提示带人
//                                proxy.timoOutClose();
//                                // tip.SystemCenterTooltip.showTip("已帮您自动带入" + room.getProxy() + "彩豆");
//                            }
//                        }
                    }
                    this.view.effect.playover(all,message.data.longValues,message.data.intValues[0] == 1);
                    // if (getProxy() && getProxy().mySeat > -1)
                    //     getProxy().lineHistory.push(getProxy().mySeatvo.nowBet);
                    proxy.tableVO.dealerstate = dealer.DealerState.SHUFFLE_CARDS;                 
                    break;
                case netaction.TEXAS_SHOW_CARD://都allin  结束亮牌 发玩家牌
                    this.view.videoComp.addAction(message, act,true);
                    var all: appvos.GameEndInfoVO[] = [];
                    for(i = 0;i < message.data.data.length;i++) {
                        all.push(new appvos.GameEndInfoVO(message.data.data[i]))
                    } 
                    if (message.data.intValues[0] == 1 && all.length > 0)//结束亮牌
                        this.view.effect.showOverOpenCard(all[0])
                    else{   //都allin发玩家牌                 
                        this.view.effect.playover(all, null);
                         proxy.tableVO.isAllIN = true;
                         if (this.view.safecomp &&getProxy().buySafe ==1){
                                this.view.safecomp.showItemCards();
                        }
                    }
                break;
                case netaction.MATCH_S_CHAT://聊天
                    if(message.data)
                         this.view.effect.showchat(message.data.intValues[0],message.data.intValues[1],message.data.strValues[0],message.data.longValues);
                    break;
                case netaction.MATCH_S_SEND_GIFT://打赏
                    if(message.data.intValues.length==0||getProxy().dashangchar==message.data.intValues[1])    
                        this.view.effect.playdashang(message.data.intValues[0], message.data.strValues[0],message.data.longValues);
                    else this.view.effect.playGift(message.data.intValues[0],message.data.intValues[1]);
                    break;
                case netaction.MATCH_S_GET_INFO://获取统计信息
                    this.openCount(message.data);
                    break;
                case netaction.MATC_S_IS_TRUSTEE://推送托管
                    this.view.playComp.showTrust();
                    break;
                case netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD:// 猜手牌
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
                    if (message.data.longValues.length > 0) {//返回扣钱数量
                       this.view.playComp.finishCardGuess();
                    }
                    break;
                     case netaction.MATCH_ANTE:  // 刷新前注信息                 
                        proxy.tableVO.preBet = message.data.longValues[0];                     
                        // __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_ANTE_UPDATE);
                        this.view.refreshAnteAndBlind(proxy.tableVO);
                        if (message.data.intValues[0] != 1) {//统计私人房开放次数
                            mc2sdk.event(mc2sdk.EVENT_TYPE.ON_RESP_OPEN_INFO);
                        }
                    break;
                    case netaction.GLXY_MESSAGEVO_RESP_GUESS_CARD_WIN:
                        this.view.effect.showCardGuessWin();
                        break;
					case consts.CLEAR_TABLE_PLAYER_UI://荷官发牌 清理牌桌
					case netaction.STD_CAN_REPEAT_DEAL_CARD:
                         getTableVO().tableStatus = 0;
						 this.view.showWait(true);
					break;
					case netaction.GLXY_REAL_RESP_DEALER_KEY://荷官进入
                        if (message.data!=null&&message.data.strValues.length > 0) {
                            if (proxy.tableVO)
                                proxy.tableVO.dealer = message.data.strValues[0];
                            proxy.isLive = true;
                            
                        } else {
                            if (proxy.tableVO)
                                proxy.tableVO.dealer = null;
                            proxy.isLive = false;
                        }
                        this.view.checkLive();
                    break;
                    case netaction.GLXY_REAL_RESP_DEALER_STATE://荷官状态变更
                         if (proxy.tableVO) {
                              proxy.tableVO.dealerstate = message.data.intValues[0];
                              this.view.checkdealer();
                         }
                           
                        break;
                // case netaction.NOTICE_CLIENT_WAITING_LIST:// 玩家进入排队，需要发坐下, 只在防作弊房会收到。
                //      this.view.removeAllItem();
                //      break;    

                case consts.UPDATE_MATCH_NUMPLAYERS:
                    if (this.view.wait!=null) {
                        if (room.TYPE.SNG == room.getProxy().currentType) {
                            if (body == -1) this.view.wait.removeFromParent();
                            var matchVO = match.getProxy().currentMatchVO;
                            this.view.wait.setSng(matchVO.minPlayers - matchVO.numPlayers);
                        }
                        else {
                            if (body != null) {
                                this.view.showWait(true);
                                this.view.wait.showType(body);//3显示系统配桌  2比赛即将开始
                            }  else this.view.wait.removeFromParent();
                        }
                    }
                    break;
                case  consts.AWAKEN_MISSION_BOX:
                    if(this.view == null) return;
                    if(this.view.playComp == null) return;
                    if(this.view.playComp.missionBox == null) return;
                    this.view.playComp.missionBox.openTheBox();
                    this.view.playComp.missionBox.openTheTip();
                    break;
				case netaction.MATCH_S_SEENER_JOIN://旁观进入
					if (message.data.data.length > 0) {
						var playvo = new appvos.JoinPlayerVO(message.data.data[0]);
						var len: number;
						var tablevo = getTableVO();
						 for (i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
                            var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
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
			
				
				case netaction.MATCH_S_SEENER_lEAVE://旁观离开
                    var id = message.data.longValues[0];
                    var tablevo = getTableVO();
					 for (i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
                            var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                            if (join.roleId == id) {
								tablevo.joinPlayerVO.splice(i, 1);
                                break;
                            }
					}
					this.view.playComp.refJoin();
					break;	
                case netaction.GLXY_MESSAGEVO_RESP_CAISHEN_INFO: // 推送财神信息
                    playcards.getTableVO().caishenround = message.data.intValues[0]; //当前轮数
                    if(message.data.intValues.length > 1) {
                        var winingIndex:number = message.data.intValues[1]; //中奖人的位置
                        var winingCount:number = message.data.intValues[2]; //中奖金额
                        var playInfo:appvos.SeatPlayerVO = playcards.getProxy().getPlayVOBySeat(winingIndex);
                        if(playInfo) {
                            var award_msg:string = gameabc.getMessage("MAMMON_AWARD",playInfo.name,winingCount);
                            tip.popSysRollTopTip(award_msg);                        
                        }
                    }

                    // if(this.view == null) return;
                    // if(this.view.playComp == null) return;
                    if(this.view.playComp.btnCaiShen == null) return;
                    this.view.playComp.updateBtnCaiShen();
                    if (playInfo)
                         this.view.effect.getMoney(winingIndex,winingCount);    
                    if(__IS_MOUDLE_OPEN(AppReg.MAMMON)) {
                        var mammonUI:mammon.MammonUIMoudle = <mammon.MammonUIMoudle>__GET_MOUDLE_COMP(AppReg.MAMMON);
                        if(mammonUI) {
                            mammonUI.fullDataUI();
                        }
                    }
                    break;
                case netaction.PROCESS_XYID_RESP_CAISHEN_INFO: // 新的财神推送
                    var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
                    if(message.data.intValues.length>1 && message.data.longValues.length > 0 ){
                        var currentRound :number = message.data.intValues[0];       // 当前财神轮数
                        var totalRound :number = message.data.intValues[1];         // 发奖轮数
                        var totalPoolNum : number = message.data.longValues[0];     // 总的奖池数，这里的long已经转好了
                        var farToWinningNum:number = Math.abs(totalRound-currentRound);
                        this.view.playComp.updateCaishenDesc(farToWinningNum)
                        mammon.getProxy()._setData(totalPoolNum,farToWinningNum);  // 缓存数据
                        if(message.data.strValues.length > 0 && message.data.longValues.length > 1){ // 如果开奖
                            var winningNum :number = message.data.longValues[1];     // 奖金
                            var userName :string = message.data.strValues[0];        // 玩家名称
                            if(DEBUG){
				                 userName = userName.length>0?userName:"robot";
			                }
                            var time:number = new Date().getTime()/1000;
                            mammon.getProxy()._setPoolRecords(time,userName,winningNum);
                            if(__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                                var newMammon:mammon.newMammonUIModule = <mammon.newMammonUIModule>__GET_MOUDLE_COMP(AppReg.newMammon);
                                if(newMammon) {
                                    newMammon._addRecordList(time,userName,winningNum);
                                }
                            }
                            tip.popSysRollTopTip(mammon.getProxy()._getWinningStr(userName,winningNum)); 
                            //this.view.effect.getMoney(winingIndex,winingCount);// 播放动画
                            
                        }
                    }
                    if(this.view.playComp.btnCaiShen == null) return;
                    this.view.playComp.updateBtnCaiShen();
                    this.view.playComp._showCaishen(); // 有推送则显示财神按钮 

                    if(__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                        var newMammon:mammon.newMammonUIModule = <mammon.newMammonUIModule>__GET_MOUDLE_COMP(AppReg.newMammon);
                        if(newMammon) {
                            newMammon._updateUIData();
                        }
                    }
                    break;

                case consts.UPDATE_MAMMON_POOL_RECORD: // 获取财神获奖记录
                    if(__IS_MOUDLE_OPEN(AppReg.newMammon)) {
                        var newMammon:mammon.newMammonUIModule = <mammon.newMammonUIModule>__GET_MOUDLE_COMP(AppReg.newMammon);
                        if(newMammon) {
                            newMammon.init();
                        }
                    }
                    break;
                case mission.MissionMediator.MISSION_LEVEL_UP:
                case mission.MissionMediator.UPDATE_MISSION:
                case mission.MissionMediator.ADD_MISSION:
                    var missionInfo:mission.MissionVO = notification.getBody();
                    if(this.view.playComp && this.view.playComp.btnGoldTreen) {
                        if(missionInfo.type == mission.MissionType.godTree && missionInfo.subtype == mission.MissionSubType.god_tree) {
                            this.view.playComp.btnGoldTreen.updateMission(missionInfo);
                        }
                    }
                    break;
                case netaction.RESP_PLAYER_RANK:
                      this.view.playComp.ranklab.text = match.getProxy().currentMatchVO.myRank+"/"+match.getProxy().currentMatchVO.numPlayers;//  "第"+ match.getProxy().currentMatchVO.myRank +"名";
                     //this.view.playComp.leftNumlab.text = "剩余玩家"+match.getProxy().currentMatchVO.numPlayers;
                     break;
                case netaction.MTT_AWARDINFO:
                      //MTT比赛结束 关闭升盲提示
                       egret.clearInterval(this.view.timeoutAlertTime);
                         break;
                case netaction.RESP_DEVELOP_SCORE://玩家成长积分改变
                    var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
                    var userinfo: appvos.UserInfoVO = new appvos.UserInfoVO(message.data.data[0]);
                    var myuserinfo = user.getProxy().playInfoVO;
                    var keys = ["foldright", "raiseright", "raiseperfect", "havethreesheet"]//弃牌 加注 价值下注
                    var effects = ["youxiuqipai","dadepiaoliang","dadepiaoliang",""];//
                    for (var i: number = 0; i < 4; i++){
                        var key = keys[i];
                         if (userinfo[key]) {
                            var add = userinfo[key] - myuserinfo[key];
                            myuserinfo[key] = userinfo[key];       			//弃牌
                            if (add > 0) {
                                this.view.effect.showAddChengZhang(effects[i]);
                                this.view.playComp.checkChengzhang();
                            }
                        }
                    }          
                    break;   
                case netaction.RESP_USER_REWARD://玩家成长奖励
                     var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
                    if (message.data) {
                        user.getProxy().playInfoVO.rewardrecord.push(message.data.intValues[0] + "");
                        if (__IS_MOUDLE_OPEN(AppReg.APP_ChengZhang)) {
                            var goldTreeUI: playcards.PlaycardsChengZhangComp = <playcards.PlaycardsChengZhangComp>__GET_MOUDLE_COMP(AppReg.APP_ChengZhang);
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
                        item.getProxy().getItemDate();//刷新道具
                        this.sendNotification(app.NetAction.TOOL_RILVER);//刷新银两
                    } else if (message.errorCode > 0)
                        this.sendNotification(app.NetAction.ERROR_SRS_CODE, message.errorCode); 
                    break; 
                case netaction.RESP_BUYINSURE://保险购买
                    this.view.hideSafe();
                    if (message.data.longValues[0] > 0) {
                        //  if (getProxy().safeResult == null)
                        //     getProxy().safeResult = [];
                        this.view.videoComp.addAction(message, act);
                        getProxy().safeResult = [message.data.intValues[0], message.data.longValues[1]];
                        var safeitem = this.view.allItem[message.data.intValues[0]];                      
                        this.view.effect.showItemMess(safeitem, "投保" + FormatUtils.wan(message.data.longValues[0]));
                        // var addsafe:number
                        // if(message.data.longValues[1]>0)
                        //     addsafe = message.data.longValues[1];
                        // else addsafe = -message.data.longValues[0];
                        // safeitem.playvo.safeAdd += addsafe;
                    }
                  
                    break;
                case netaction.RESP_INSURE_INFO://保险信息
                    this.view.videoComp.addAction(message, act);
                    this.view.showSafe(message.data);
                    break;
                case netaction.RESP_REPORT_PLAYER://举报成功
                     tip.popSysCenterTip("GM举报成功",tip.TIPS_TYPE.TIPS_CORRECT);
                    break;     
            }
        }
        static index: number=null;
        private openCount(vo: appvos.ParamVO): void{
            var alldata: CountVO[] = [];
            var cvo: CountVO;
            var index: number;
            for (var i: number = 0, len: number = vo.data.length; i < len; i++){
                cvo = new CountVO();
                index = i * 3;
                cvo.roleid = vo.longValues[index];
                cvo.total = FormatUtils.wan(vo.longValues[index + 1]);
                cvo.winNum = vo.longValues[index + 2] - vo.longValues[index + 1];
                cvo.win = FormatUtils.wan(cvo.winNum);
                cvo.name = FormatUtils.protoToGBK(vo.data[i]);
                for (var j: number = 0,jlen:number =alldata.length ; j < jlen; j++){
                    if (cvo.winNum > alldata[j].winNum) {
                        alldata.splice(j, 0, cvo);
                        break;
                    }
                }
                if (j == jlen) 
                    alldata.push(cvo);
            }
            for ( j = 0,jlen =alldata.length ; j < jlen; j++){
                alldata[j].rank = (j + 1).toString();
             }
            __OPEN_MOUDLE(AppReg.APP_PLAY_COUNT,alldata,null,null,this.view.mainview);;
        }
        
        private leaveRoom():void {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        }
	}
}
