module happy {
	export class HappyUIMediator extends puremvc.Mediator {
		public static NAME: string = "HappyUIMediator";
        public constructor(viewComponent: Object = null) {
            super(HappyUIMediator.NAME, viewComponent);
        }
        public get view(): HappyUIMoudleComp {
            return this.viewComponent;
        }
        public listNotificationInterests(): Array<any> {
			var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction
            return [
                netaction.GLXY_RESP_ANTE,//下注
                netaction.GLXY_RESP_BECOME_BANKER ,//上庄
                netaction.GLXY_RESP_CHANGE_BANKER ,//下庄
                netaction.GLXY_RESP_PLAYER_ENTER , //有人进入
                netaction.GLXY_RESP_PLAYER_LEAVE,//有人离开
                netaction.GLXY_RESP_ADD_SHOW_POS,//坐下
                netaction.GLXY_RESP_SUB_SHOW_POS,//站起
                netaction.GLXY_RESP_GAME_START,//游戏开始
                consts.UP_PLAY_INFO_DATA,//查询头像
                consts.MATCH_OUTROOM,//服务器推送退出房间
                netaction.GLXY_RESP_CHAT,//聊天
                netaction.GLXY_RESP_WIN_HISTORY,//历史记录
                netaction.GLXY_RESP_GAME_END,//结算
                consts.HAPPY_HOOK,//挂机刷新
                consts.HAPPY_WINBETS,//奖池更新
                netaction.GLXY_RESP_LUCKY_CARD,//更新幸运牌
                netaction.GLXY_REQ_LUCKY_CARD
			];
		}
		public handleNotification(notification: puremvc.INotification): void {
         
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
             if(body instanceof  cyvos.GamePackage)
                 var message: appvos.MessageVO = new appvos.MessageVO(body.data.buffer);
			 var proxy = getProxy();
            var act: string = notification.getName();
            switch (act) {
                case netaction.GLXY_RESP_ANTE://下注
                    var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    if (seatvo != null) {
                        var pos: number = message.data.intValues[1];
                        var addBet: number = message.data.longValues[0];
                        seatvo.addBet(pos, addBet);
                        seatvo.totalBet = message.data.longValues[1];
                        proxy.tableVO.allbets[pos] += addBet;
                        this.view.showAddBet(seatvo,pos,addBet);
                    }
                    break;
                case consts.MATCH_OUTROOM://服务端推送退出房间
                    tip.Alert.show("您已经离开房间，请重新进入",null,tip.ALERT,this.leaveRoom,null,this)
                break;
                case netaction.GLXY_RESP_BECOME_BANKER://上庄                    
                    var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    seatvo.showPos = 1;
                    this.view.addSeat(seatvo);     
                    break;
                case netaction.GLXY_RESP_CHANGE_BANKER://下庄                 
                    // var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    // seatvo.showPos = 0;
                     this.view.removeSeat(1);
                   break;
                case netaction.GLXY_RESP_PLAYER_ENTER://有人进入
                    var player: appvos.HLCPlayerVO = new appvos.HLCPlayerVO(message.data.data[0]);
                    var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[player.seatId];
                    if (seatvo != null) {
                        var index: number = proxy.tableVO.playerVO.indexOf(seatvo);
                        proxy.tableVO.playerVO[index] = player;
                        index = proxy.tableVO.noSeatPlayerVO.indexOf(seatvo);
                        if (index > -1) proxy.tableVO.noSeatPlayerVO.splice(index, 1);
                        index = proxy.tableVO.seatPlayerVO.indexOf(seatvo);
                        if (index > -1) proxy.tableVO.seatPlayerVO.splice(index, 1);
                        if (seatvo == getProxy().mySeatvo) {
                            getProxy().mySeatvo = player;
                        }
                    } 
                    else {                     
                        proxy.tableVO.playerVO.push(player);
                    }
                    
                    __SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST,[player.roleId]);


                    if (player.showPos > 0) proxy.tableVO.seatPlayerVO.push(player);
                    else proxy.tableVO.noSeatPlayerVO.push(player);
                    proxy.tableVO.allPlayerVO[player.seatId] = player;
                    this.view.addSeat(player);                	
                    break;
                case netaction.GLXY_RESP_PLAYER_LEAVE://有人离开                  
                    var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                     if (seatvo != null) {
                        var index: number = proxy.tableVO.playerVO.indexOf(seatvo);
                        proxy.tableVO.playerVO.splice(index, 1);
                        index = proxy.tableVO.noSeatPlayerVO.indexOf(seatvo);
                        if (index > -1) proxy.tableVO.noSeatPlayerVO.splice(index, 1);
                        index = proxy.tableVO.seatPlayerVO.indexOf(seatvo);
                        if (index > -1) proxy.tableVO.seatPlayerVO.splice(index, 1);
                        this.view.removeSeat(seatvo.showPos);
                        delete proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    }
                     break;
                case netaction.GLXY_RESP_ADD_SHOW_POS://坐下
                    var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    seatvo.showPos = message.data.intValues[1];
                    this.view.addSeat(seatvo);
                    break;   
                case netaction.GLXY_RESP_SUB_SHOW_POS://站起                
                    this.view.removeSeat(message.data.intValues[0])
                    break; 
                case netaction.GLXY_RESP_GAME_START://游戏开始
                    var tablevo: appvos.HLCTableVO = getTableVO();
                    tablevo.gameStatus = 1;
                    tablevo.clear();
                    getProxy().mySeatvo.clear();
                    tablevo.timeLast = message.data.intValues[0];
                    this.view.start();
                    break;    
                case netaction.GLXY_RESP_GAME_END://结算
                    var endvo: appvos.HLCGameEndVO = new appvos.HLCGameEndVO(message.data.data[0]);
                    this.view.playEnd(endvo);                  
                    break;
                case netaction.GLXY_RESP_CHAT://聊天
                    if(message.data)
                         this.view.showchat(message.data.intValues[0],message.data.intValues[1],message.data.strValues[0]);
                break;

                case  consts.UP_PLAY_INFO_DATA:
                    if(body)
                    {
                        var len = body.length
                        for(var i:number=0;i<len;i++)
                        {
                            var vo:appvos.UserInfoVO = body[i];
                            var le = proxy.tableVO.playerVO.length
                            while(--le > -1) {
                                if(proxy.tableVO.playerVO[le].roleId==vo.roleId)
                                {
                                    proxy.tableVO.playerVO[le].avatarID = vo.avatarID;
                                    break;
                                }
                            }
                        }
                        this.view.refAvatar();
                        var ui:any = __GET_MOUDLE_COMP(AppReg.APP_HAPPY_REWARD);
                        if (ui) {
                            ui.refList(body);
                        }
                    }
                
                break;  

                case netaction.GLXY_RESP_WIN_HISTORY://牌局记录拉取成功
                    happy.getProxy().historyValues =message.data.intValues;
                    // var  probability=happy.getProxy().getProcessingData();
                    break;   
                case consts.HAPPY_HOOK://挂机刷新
                    this.view.refView();
                    if (getProxy().hookingFlag&&getTableVO().gameStatus>0) {
                        this.view.startHook();
                    }
                    break;
                case consts.HAPPY_WINBETS:
                    if (room.getProxy().current) {
                        //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|发奖时奖金|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
                        var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
						if (bets) {
                            if (bets[6] != 0 && bets[6] == bets[8]) {//刚中奖
                                this.view.showWinResule = true;
								// __OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, bets);
							}
							//刷新奖池奖励
							this.view.refWinBets();
						}
                    }    
                    break;    
                case netaction.GLXY_RESP_LUCKY_CARD://幸运牌型
                    getProxy().nextLuckyCard = message.data.intValues[0];
                    if(getTableVO().gameStatus>0&&getProxy().nowLuckyCard==null){
                        getProxy().nowLuckyCard = getProxy().nextLuckyCard;
                        this.view.showLucyCard(false);
                    }                  
                    break;  
                case netaction.GLXY_REQ_LUCKY_CARD:
                    this.view.luckychangebtn.alpha = 0.5;
                    break;    
			}
        }
        private leaveRoom():void {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        }
	}
}