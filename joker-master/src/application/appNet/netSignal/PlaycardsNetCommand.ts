module app {
	/**
	 *打牌消息
	 * @author 
	 *
	 */
     export class PlaycardsNetCommand extends GameCommand {
         static time: number=0;
		public constructor() {
    		super();
		}
//        public get methodName(): string {
//            return app.NetAction.MATCH_CREATE.toString();
//        }

        public get showLoading(): boolean {
            return true;
        }
        // public faultHandler(data: any = null): void {
        //     super.faultHandler(data);
        // }
        public sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            if (action == NetAction.DO_TREASURE) {
                paramVO.longValues[0] = data[0];
                paramVO.intValues[0] = data[1];
            } else {
                egret.clearTimeout(PlaycardsNetCommand.time);
                PlaycardsNetCommand.time = egret.setTimeout(this.timeout, this, 3000);
                // __OPEN_MOUDLE(AppReg.PRELOAD);
                __OPEN_PRELOAD();
            }
        }
        private timeout(): void{
            tip.Alert.show("您已经离开房间，请重新进入");
            playcards.getProxy().outbakfun();
            this.closeload();
        }
        private closeload(): void{
            // __CLOSE_MOUDLE(AppReg.PRELOAD);
            __CLOSE_PRELOAD();
            egret.clearTimeout(PlaycardsNetCommand.time);
         }
        public resultHandler(action: string, param: appvos.ParamVO): void {
          

            switch (action) {
                /** 玩家进入桌子
                 * 1. 玩家断线重连进来。不需要额外操作
                 * 2. 玩家进入一个桌子，有空位， 则发送坐下（9）指令
                 * 3. 玩家进入一个桌子，没有空位。不需要额外操作，玩家旁观状态。
                 */
                case NetAction.MATCH_ADD:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.ON_LOIGN_STEP_4);
                    playcards.getProxy().tableVO = new appvos.TexasTableVO(param.data[0]);
                    user.getProxy().messVersion = playcards.getProxy().tableVO.versionNum;
                    playcards.getProxy().playvideovo = null;
                    if (playcards.getProxy().tableVO.dealer)
                        playcards.getProxy().isLive = true;
                    var ui: playcards.PlayCardsUIMoudleComp = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS) as playcards.PlayCardsUIMoudleComp;
                    if (ui == null || ui.parent == null) {
                        console.log("ui == null || ui.parent == null");
                        __CLOSE_MOUDLE(AppReg.JOIN_VIP_ROOM);
                        // if (user.getProxy().exitToMoudle==-1) {
                        //     var arr = gameabc.UIManager.instance.getOpenList( [AppReg.APP_PLAYCARDS,AppReg.PRELOAD]);
                        //     // var except = [AppReg.APP_PLAYCARDS,AppReg.PRELOAD];
                        //     // var aid: number;
                        //     // for (var i: number = arr.length - 1; i > -1; i--){
                        //     //      aid = arr[i]
                        //     //      if (except.indexOf(aid)!=-1) {
                        //     //          arr.splice(i, 1);
                        //     //     } 
                        //     // }
                        //     __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                        // } else {
                        //     __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, [user.getProxy().exitToMoudle]);
                        // }
                        playcards.getProxy().openMoudle();
                    } else {
                        ui.refVO();
                    }
                    
                    if(playcards.getProxy().mySeat == -1) {
                        // 搜索有没有位置
                        // 有位置就坐下
                        this.sendNotification(app.NetAction.REQ_COIN);
                        // __PVO().to(app.NetAction.GAME_READY);//在RESP_COIN中
                    }
                    
                    if (playcards.getProxy().beginVipRoom) {//开始统计私人房
                        __PVO().i(playcards.getProxy().anteType).to(NetAction.MATCH_OPEN_INFO);
                        playcards.getProxy().beginVipRoom = false;
                    }
                    break;
                
                // case NetAction.MATCH_ANTE:
                   
                //     playcards.getProxy().tableVO.preBet = param.longValues[0];
                //     // 刷新前注信息
                //     __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_ANTE_UPDATE);
                //     if (param.intValues[0] != 1) {//统计私人房开放次数
                //          mc2sdk.event(mc2sdk.EVENT_TYPE.ON_RESP_OPEN_INFO);
                //     }
                //     break;
                // case NetAction.MATCH_START://房主点开始
                //     playcards.getProxy().tableVO.tableStatus = 1;
                //     __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_START);
                //     break;
                // case NetAction.MATCH_CREATE://创建房间
                //     if (param.intValues[0]) {
                //         playcards.getProxy().tableVO = new appvos.TexasTableVO(param.data[0]);
                //         var ui: playcards.PlayCardsUIMoudleComp = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS) as playcards.PlayCardsUIMoudleComp;
                //         if (ui == null || ui.parent == null) {
                //             var arr = gameabc.UIManager.instance.openList.concat();
                //             __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                //         } else
                //             ui.refVO();
                //     }
                //     break;
                case NetAction.MATCH_S_SIT://玩家入座                 
                    var playvo = new appvos.SeatPlayerVO(param.data[0]);
                    var seat: number = playvo.seatId;
                    var tablevo = playcards.getTableVO();
                    if (tablevo != null) {
                          for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len; i++) {
                            var play: appvos.SeatPlayerVO = tablevo.seatPlayerVO[i];
                            if (play.seatId == seat) {
                                tablevo.seatPlayerVO[i] = playvo;
                                break;
                            }
                        }
                        if (i == len) tablevo.seatPlayerVO.push(playvo);
                        // for (i = 0, len = tablevo.joinPlayerVO.length; i < len; i++) {
                        //     var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                        //     if (join.roleId == playvo.roleId) {
                        //         join.totalBringBet = playvo.totalBringBet;
                        //         join.nowBet = playvo.nowBet;
                        //         break;
                        //     }
                        // }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_SIT, playvo);
                        
                        // 自己坐下，播放扣筹码提示
                        // 当窗口未开启时，MATCH_S_SIT事件无法监听，所以将补充筹码文字丢在此处。
                        var currentType = room.getProxy().currentType;
                        if(  currentType!= room.TYPE.SNG && currentType != room.TYPE.FREE&&currentType!=room.TYPE.MTT && playvo.roleId == user.getProxy().svrRoleId && user.getProxy().svrGameData!=null) {
                            tip.popSysTopTip("自动补充" + FormatUtils.wan(playvo.nowBet) + "彩豆，当前账户余额为" + FormatUtils.wan(user.getProxy().svrGameData.silver - playvo.nowBet));
                        } else if (currentType == room.TYPE.FREE && playvo.roleId == user.getProxy().svrRoleId) {
                            tip.popSysTopTip("自动补充" + FormatUtils.wan(playvo.nowBet) + "金币，当前账户余额为" + FormatUtils.wan(user.getProxy().freeGold - playvo.nowBet));
                        }
                    }
                  
                    break;

                case NetAction.MATCH_S_UP://玩家座子站起       
                    var mySeat = playcards.getProxy().mySeat;
                    var seatid: number = param.intValues[0];
                    var tablevo = playcards.getTableVO();
                    if (tablevo != null) {
                         for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len; i++) {
                            var play: appvos.SeatPlayerVO = tablevo.seatPlayerVO[i];
                            if (play.seatId == seatid) {
                                tablevo.seatPlayerVO.splice(i, 1)
                                break;
                            }
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_UP, param.intValues);
                    }
                    if (user.getProxy().currentRoom.standInGirl && 
                    seatid==mySeat) {
                        user.getProxy().currentRoom.standInGirl = false;
                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[2]);//站起围观
                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[4,1,6]);//站起围观
                    }                 
                    break;
                case NetAction.MATCH_MONEY_CHANGE://推送同步钱                  
                    var svrMode = param.intValues[0];//1 银子 2 金币 3 积分
                    if (user.getProxy().svrGameData != null) {
                        if (svrMode == 1)
                             user.getProxy().svrGameData.silver = param.longValues[0];
                        else if(svrMode == 2)    
                           user.getProxy().freeGold = param.longValues[0];
                        else if (svrMode == 3)   
                            user.getProxy().svrGameData.score = param.longValues[0];
                        else  user.getProxy().svrGameData.silver = param.longValues[0];
                    }
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_COIN);
                    break; 
                case NetAction.MATC_S_IN_TABLE://最小化激活心跳
                    this.closeload();
                    break; 
               
                case NetAction.GIRL_KICK:
                    playcards.getProxy().outbakfun();
                    break;

            }
        }
	}
}
