module app {
    
	/**
	 * @author huangkan
	 *  与SRS连接的进入房间环节命令集，进入房间过程在此完成
	 */
	export class RoomCommands extends cy.SrsCommand {
        sendHandler(data: any,stream: cy.SrsStreamWriter): void {
            if (user.getProxy().currentRoom == null) {
                console.log("当前不在房间内，不能操作房间内行为");
                if(this.action == app.NetAction.ROOM_CHECKACT) {
                    cy.removeConnectHeart(app.NetAction.ROOM_CHECKACT);
                }
                return;
            }
            
            this.sendPackage.sProcessID = 1;
            this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            
            switch (this.action) {
                //设置坐下的密码
                case app.NetAction.PLAYER_SET_LIMIT:
                    var playerSet = new cyvos.PlayerSet();
                    playerSet.password = data;
                    stream.putSuruct(playerSet);
                    stream.putStr("");
                    stream.putStr("");
                    return;
                
                
                //房间动作(坐下，站起等)
                case app.NetAction.ROOM_ACTION:
                    stream.putByte(  data[0]);                      //动作
                    stream.putShort( data[1]==null ?  0 : data[1]); //桌子ID
                    stream.putByte(  data[2]==null ?  0 : data[2]); //座位ID
                    stream.putStr(   data[3]==null ? "" : data[3]); //密码内容
                    stream.putInt(   cy.addAskCommand(    data[0]));//创建指令缓存
                    return;
                    
                //进入游戏前，检查游戏版本号
                case app.NetAction.CHECK_VER:
                    //1.2011.07.18
                    // stream.putLong((1<<22)|(2011<<9)|(7<<5)|18); //版本号
                    stream.putInt(120110718);
                    return;
                
                
                //成功进入游戏，连接游戏服务器
                case app.NetAction.CONNECT_GS:
                    stream.putInt(user.getProxy().currentRoom.svrOfsId); //房间编号
                    // stream.putInt(user.getProxy().svrAreaId); //玩家区号
                    // stream.putInt(user.getProxy().svrUserId); //玩家数字账号
                    stream.putLong(user.getProxy().svrRoleId);
                    stream.putStr("");//sessionId(已停用)
                    return;


                //比赛模式进入房间后，发送的加入比赛指令
                case app.NetAction.JOIN_MATCH_GAME:
                    stream.putInt(user.getProxy().svrNumId)
                          .putInt(user.getProxy().svrAreaId)
                          .putInt(match.getProxy().currentMatchVO.matchId)
                          .putInt(match.getProxy().currentMatchVO.subId)
                          .putInt(0);
                    return;

                //请求更新玩家积分 
                case app.NetAction.REQ_COIN:
                    stream.putByte(0)
                          .putInt(user.getProxy().svrAreaId)
                          .putInt(user.getProxy().svrNumId);
                    return;

                case app.NetAction.ROOM_CHECKACT:
                    stream.putShort(0);
                    return;



                case app.NetAction.REQ_PLAYER_RANK:
                    stream.putInt(0)
                          .putInt(user.getProxy().svrNumId)
                          .putInt(user.getProxy().svrAreaId)
                          .putInt(match.getProxy().currentMatchVO.matchId)
                          .putInt(match.getProxy().currentMatchVO.subId);
                    return;

                //data参数为要查询的matchVo
                case app.NetAction.REQ_MATCH_RANK:
                    stream.putInt(0)
                          .putInt(data.matchId)
                          .putInt(data.subId);
                    return;
                
            } 
        } 
        
        callReadyLater():void {
            this.sendNotification(app.NetAction.REQ_COIN);
            // __PVO().to(app.NetAction.GAME_READY);//在RESP_COIN中
        }
        
        resultHandler(stream: cy.SrsStreamReader): void {

            switch(this.action) {
                //响应玩家进入房间
                case app.NetAction.RE_JOIN_ROOM:
                    var flag = stream.getByte();
                    var type = stream.getByte();
                    var roomId = stream.getInt();

                    if(flag == 0) {
                        if (user.getProxy().roomState == user.ROOM_STATE.IN) return;
                        user.getProxy().joinRoomSuccess();
                        room.getProxy().resetRoom();
                        if(user.getProxy().currentRoom!=null) {
                            cy.log("join success ofsid:"+user.getProxy().currentRoom.svrOfsId,cy.LOG_TYPE.ROOM);
                        }
                        
                        //进入房间成功
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED)
                    } 
                    else {
                        user.getProxy().joinRoomFailed();
                        if(flag == 1) {
                            var msgBox = <cyvos.MsgBox>stream.getSuruct(cyvos.MsgBox);
                            mc2sdk.event(mc2sdk.EVENT_TYPE.
                            ROOM_FAIELD,msgBox.szText);
                            tip.popSysCenterTip(msgBox.szText,tip.TIPS_TYPE.TIPS_WARNING);
                            // cy.log(msgBox.szText,cy.LOG_TYPE.UNDEFINE);
                        } else {
                            mc2sdk.event(mc2sdk.EVENT_TYPE.ROOM_FAIELD,flag);
                            tip.popSysCenterTip("进入房间失败，错误ID:" + flag,tip.TIPS_TYPE.TIPS_WARNING);
                            // cy.log("进入房间失败，错误ID:"+flag,cy.LOG_TYPE.ROOM);
                        }
                    }
                    return;

                //服务器推送房间桌子信息    
                case app.NetAction.RE_TABLE_INFO:
                    var tableInfo = <cyvos.TableInfo> stream.getSuruct(cyvos.TableInfo);
                    room.getProxy().updateTableInfo(tableInfo);
                    return;

                case app.NetAction.TABLESTATE:
                    var table = stream.getShort();
                    var state = stream.getByte();
                    // console.log("DeskState="+state);
                    if (state == cyvos.DeskState.DS_IDLE) {
                        //桌子上没人了
                    }
                    return;
                    
                //推送玩家数据变化
                case app.NetAction.RE_USER_INFO:
                    var playerInfo = <cyvos.PlayerInfo> stream.getSuruct(cyvos.PlayerInfo);
                    //console.log("playerinfo:"+playerInfo.nickname+" "+playerInfo.tableId+" "+playerInfo.sitorder);
                    if (playerInfo.roleId == user.getProxy().svrRoleId) {
                        user.getProxy().svrPlayerInfo = playerInfo;
                    }
                    room.getProxy().updatePlayerInfo(playerInfo);
                    return;
                    
                    
                //推送玩家状态变化    
                case app.NetAction.RE_ROOM_STATE:
                    if(user.getProxy().currentRoom&&user.getProxy().currentRoom.isVip) {
                        var stateInfo = <cyvos.PlayerStateInfo> stream.getSuruct(cyvos.PlayerStateInfo);
                        room.getProxy().updatePlayerInfo(stateInfo);
                    } else {
                        // console.log("自动房，客户端不处理广播的玩家状态变更");
                    }
                    return;


                //进入房间时的所有推送完成，可执行下一步操作    
                case app.NetAction.RE_JOIN_ROOM_COMPLETE:
                    cy.log("join complete ofsid:"+user.getProxy().currentRoom.svrOfsId,cy.LOG_TYPE.ROOM);
                    // 如果是排队机制
                    if (room.getProxy().isWaitingQueue) {
                        this.sendNotification(NetAction.ROOM_ACTION,[1]);
                    } else if (room.getProxy().isMatch) {
                        this.sendNotification(NetAction.JOIN_MATCH_GAME);
                    } else if (room.getProxy().currentType==room.TYPE.PK) {

                    }
                    this.sendNotification(NetAction.ROOM_ACTION,[1, 0, 1]);
                    return;


                //响应玩家动作
                case app.NetAction.RE_ROOM_ACTION:
                    var flag = stream.getByte();
                    if(flag == 1) {
                        var msgBox = <cyvos.MsgBox>stream.getSuruct(cyvos.MsgBox)
                        mc2sdk.event(mc2sdk.EVENT_TYPE.ROOM_ACT_FAILED, msgBox.szText);
                        tip.popSysCenterTip(msgBox.szText,tip.TIPS_TYPE.TIPS_WARNING);
                        cy.log(msgBox.szText,cy.LOG_TYPE.UNDEFINE);
                    } else if (flag != 0) {
                        mc2sdk.event(mc2sdk.EVENT_TYPE.ROOM_ACT_FAILED, flag);
                    }
                    if(stream.getAvailable()>0) {
                        var action = cy.getAskCommand(stream.getInt());
                       // if(action==5)tip.popSysTopTip(gameabc.ResourceBundleUtil.getMessage("CHANGE_TABLE_SUCCESS"));
                    }
                    return;
                    
                    
                //推送游戏可以开始的消息    
                case app.NetAction.RE_SERVER_READY:
                    var canStart = stream.getBool();
                    if (canStart) {
                        //游戏开始前，检查版本号
                        this.sendNotification(app.NetAction.CHECK_VER);
                    }
                    return;

                //响应版本号检查
                case app.NetAction.RE_CHECK_VER:
                    var flag = stream.getByte();
                    var ver = stream.getInt();
                    if (flag == 0) {
                        //通过版本号检查，连接具体的游戏服务器
                        this.sendNotification(app.NetAction.CONNECT_GS);
                    }
                //连接游戏服务器结果回复              
                case app.NetAction.RE_CONNECT_GS:
                    // var flag = stream.getByte();
                    // if (flag == 0) {
                    //     //更新用户信息
                    //     user.getProxy().isGamePlaying = true;
                    //     var roomType = user.getProxy().getRoomType(user.getProxy().currentRoom.type, user.getProxy().currentRoom.smallBlinds);
                    //     var roomNumber: number = -1;
                    //     if (roomType == user.ROOM_TYPE.PRIVATE) {
                    //         if (playcards.getProxy().joinNumber != null)
                    //             roomNumber = parseInt(playcards.getProxy().joinNumber);
                    //     } else {
                    //         if (user.getProxy().currentRoom.svrRoomId != null)
                    //             roomNumber = user.getProxy().currentRoom.svrRoomId;
                    //     }
                    //     user.getProxy().friendStatus = roomType;
                    //     var data: any[] = [roomType, roomNumber];
                    //     __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, data);
                    //     __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO,[user.getProxy().svrRoleId]);


                    //     // console.log("连接游戏服务器成功");
                    //     if (room.getProxy().currentType == room.TYPE.PK) {
                    //         __PVO().i(user.getProxy().PKDragInRoom).to(app.NetAction.MATCH_TAKEIN);  
                    //     }
                    //     else if (room.getProxy().isHappyCity) {
                            
                    //     } else if(room.getProxy().isNormal) { // 私人房类型需要ready
                    //         __PVO().to(app.NetAction.GAME_READY);
                    //     } else if (room.getProxy().isWaitingQueue) { // 
                    //         // __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, playcards.OPEN_PARAM.WAITING);
                    //          playcards.getProxy().openMoudle(playcards.OPEN_PARAM.WAITING);
                    //     }
                    //     else if (room.getProxy().currentType == room.TYPE.GRIL) {
                    //         __PVO().to(app.NetAction.GAME_READY);
                    //     }
                    // } else {
                    //     // console.log("连接游戏服务器失败");
                    // }
                    return;

                case app.NetAction.NOTICE_CLIENT_ACTION:
                    if (playcards.getProxy().mySeat != -1) {
                        egret.setTimeout(this.callReadyLater,this,1000);
                    }
                    return;
                    
                case  NetAction.NOTICE_CLIENT_WAITING_LIST://游戏服务要求玩家离开(gs->client)
//                    user.getProxy().leaveRoom();
                    if(room.getProxy().isNormal) {
                        user.getProxy().friendStatus = 1;
                        __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [1, -1]);
//                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[cyvos.ROOM_ACT.STANDUP])
                    } else if(room.getProxy().currentType!=room.TYPE.GRIL){
                        user.getProxy().leaveRoom();
                    }
                    return;

                //离开房间成功
                case app.NetAction.RE_LEAVE_ROOM:
                    if(user.getProxy().currentRoom==null) {
                        cy.log("leave success ofsid:unknown.",cy.LOG_TYPE.ROOM);
                    } else {
                        cy.log("leave success ofsid:"+user.getProxy().currentRoom.svrOfsId,cy.LOG_TYPE.ROOM);
                    }
                    user.getProxy().leaveRoomSuccess();
                    var flag = stream.getByte();
                    if (flag == 0) { //普通退出
                        // this.sendNotification(app.constant.AppMediatorConst.MATCH_OUTROOM);
                        if(user.getProxy().willJoinRoom == null) {
                        } 
                        else {
                            user.getProxy().joinRoom(user.getProxy().willJoinRoom);
                        }
                    } 
                    else if (flag == 1) { //被T了
                        this.sendNotification(app.constant.AppMediatorConst.MATCH_OUTROOM);
                    }
                    user.getProxy().friendStatus = 1;
                    __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [1, -1]);
                    return;


                //响应加入比赛指令
                case app.NetAction.RE_JOIN_MATCH_GAME:
                    var flag = stream.getByte();
                    if (flag==0) {
                        console.log("加入比赛成功");
                    }
                    return;

                case app.NetAction.MATCH_PLAYER_COUNT:
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var playerCnt = stream.getInt(); 
                    return;

                case app.NetAction.MATCH_PLAYER_INFO:

                    var areaId = stream.getInt();
                    var numId = stream.getInt();
                    var nickName = stream.getStr();
                    var ptnumId = stream.getStr();
                    var sex = stream.getByte();
                    var jy = stream.getInt();
                    var jf = stream.getInt();
                    var sr = stream.getInt();
                    var win = stream.getShort();
                    var lost = stream.getShort();
                    var peace = stream.getShort();
                    var escape = stream.getShort();
                    var clientType = stream.getByte();
                    var head = stream.getInt();
                    var rank = stream.getInt();

                    var mactchId = stream.getInt();
                    var subId = stream.getInt();
                    var totalCnt = stream.getShort();
                    var currCnt = stream.getShort();
                    // console.log(nickName+":"+jf);
                    return;

                case app.NetAction.MATCH_HINT: //配桌提示
                    var matchid = stream.getInt();
                    var subid = stream.getInt();
                    var msgType = stream.getInt();
                    var resulttype = stream.getInt();			//显示比赛结果的方式
                    var showtype = stream.getInt();				//显示的方式
                    var showtime = stream.getInt();				//显示时间
                    var msg = stream.getStr();		            //文本内容

                    console.log("收到提示协议，flag="+msgType+" msg="+msg);
                    if (msgType == 1) { //换桌等待提示
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS,3);
                    }
                    return;

                case app.NetAction.CHAT_MSG:
                    var channel:any = stream.getByte();
                    var color:number = stream.getInt();
                    var areaid:number = stream.getInt();
                    var numberid:number = stream.getInt();
                    var msg_str:string = stream.getStr();
                    
                    var split:string[] = msg_str.split("|");
                    var msgTitle:string = "";
                    var msgBody:string = "";

                    if (split.length > 1) {
                        msgTitle = split[0];
                        msgBody = split[1];
                    }
                    else if (split.length == 1) {
                        msgBody = split[0];
                    }
                    //任务信息
                    if (msgTitle == "TASKMSG") {
                        mission.getProxy().analysizeStrData(msgBody);
                    } else if (msgTitle == app.NetAction.BULLETIN) {
                        // console.log("room奖池"+split.length+"||||" + split);
                        //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|发奖时奖金|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
                       //         ARID,  cp,    cc,     ca,     ct,     cu,      cr,       uuid,   PNID[1],  PNID[2], PNID[3], PASR[1],  PASR[2], PASR[3], cpa,        cpu);

                        happy.getProxy().allWinBet[split[1]] = split;
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_WINBETS);
                        // __OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, split);
                    }
                    return;         

                //请求更新玩家积分 
                case app.NetAction.RESP_COIN:
                    var flag = stream.getByte();
                    var purse = stream.getLong();
                    var bank = stream.getLong();
                    var modifyBlankPwd = stream.getByte();
                    console.log("GameRespCoin:flag="+flag+",purse="+purse+",bank="+bank);
                    __PVO().to(app.NetAction.GAME_READY);
                    return;


                case app.NetAction.RESP_PLAYER_RANK: //返回自己排名
                    var flag = stream.getByte();
                    var varaskid = stream.getInt();		//序号
                    var varleaverank = stream.getInt(); //上次离开时排名
                    var varrank = stream.getInt();		// 当前排名			 	!!!<这个有值> 
                    var varmax = stream.getInt();		// 最多人数
                    var varcur = stream.getInt();		// 当日在线人数
                    var vartotal = stream.getInt();			//总局数
                    var varaverage = stream.getFloat();	//平均局数
                    var varmatchcnt = stream.getInt();   //当前比赛的人数  		!!!<这个有值> 
                    match.getProxy().currentMatchVO.myRank = varrank;
                    match.getProxy().currentMatchVO.numPlayers = varmatchcnt;
                    return;


                case app.NetAction.RESP_MATCH_RANK: //比赛排名
                    var askid = stream.getInt();
                    var flag = stream.getByte();
                    var total = stream.getShort();
                    var curr = stream.getShort();
                    var matchcnt = stream.getInt();
                    var size = stream.getInt();
                    match.getProxy().currentMatchVO.rankList = [];
                    match.getProxy().currentMatchVO.numSignups = size;
                    console.log("mtt numPlayers:"+total);
                    for (var i=0; i<size; ++i) {
                        var userid = stream.getStr();  //!!!<这个有值> 
                        var score = stream.getInt();   //!!!<这个有值> 
                        var right = stream.getLong();
                        var rank = stream.getInt();
                        var playerName = stream.getStr();
                        var rankVO = new appvos.MttRankVO();
                        rankVO.playerName = playerName;
                        rankVO.rank = rank;
                        rankVO.bet = score;
                        match.getProxy().currentMatchVO.rankList.push(rankVO);
                    }
                    return;



            }
        }
	}
}
