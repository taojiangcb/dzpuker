var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    /**
     * @author huangkan
     *  与SRS连接的进入比赛环节的指令集
     */
    var MatchCommands = (function (_super) {
        __extends(MatchCommands, _super);
        function MatchCommands() {
            return _super.apply(this, arguments) || this;
        }
        MatchCommands.prototype.sendHandler = function (data, stream) {
            var matchProxy = match.getProxy();
            switch (this.process + app.NetAction.PROCESS_CUT) {
                case app.NetAction.SNG_LIST_PROCESS:
                case app.NetAction.MTT_LIST_PROCESS:
                    this.sendPackage.nAppID = 0;
                    break;
                case app.NetAction.SNG_PROCESS:
                case app.NetAction.MTT_PROCESS:
                    var matchAppId = 0;
                    var cmvo = match.getProxy().currentMatchVO;
                    if (cmvo != null) {
                        var ccvo = cmvo.svrConfigInfo;
                        if (ccvo != null)
                            matchAppId = ccvo.matchAppId;
                    }
                    this.sendPackage.nAppID = matchAppId;
                    break;
            }
            switch (this.pocsact) {
                case app.NetAction.SNG_REQJOIN: //加入列表服
                case app.NetAction.MTT_REQJOIN:
                    stream.putInt(0)
                        .putInt(user.getProxy().svrAreaId)
                        .putInt(user.getProxy().svrNumId);
                    return;
                case app.NetAction.REQGETMATCHLIST:
                    stream.putInt(0)
                        .putInt(0)
                        .putInt(0);
                    return;
                case app.NetAction.REQJOINMATCH:
                    this.sendPackage.nAppID = data;
                    stream.putInt(0);
                    return;
                case app.NetAction.SNG_REQSIGNUP:
                case app.NetAction.MTT_REQSIGNUP:
                    var hasTicket = matchProxy.hasTicket(match.getProxy().currentMatchVO.matchId);
                    var autoCoin = matchProxy.currentMatchVO.autoCoin;
                    matchProxy.currentMatchVO.autoCoin = false;
                    var isFree = false;
                    // isFree = match.getProxy().currentMatchVO.matchId == 17; //测试用，上线要注释
                    stream.putInt(0)
                        .putInt(matchProxy.currentMatchVO.matchId)
                        .putInt(matchProxy.currentMatchVO.subId)
                        .putByte(isFree ? 0 /* FREE */ :
                        autoCoin ? 1 /* COIN */ :
                            hasTicket ? 3 /* PROPS */ : 1 /* COIN */);
                    return;
                case app.NetAction.REQCANCELSIGNUP:
                    stream.putInt(0);
                    if (data instanceof appvos.MatchVO) {
                        stream.putInt(data.matchId)
                            .putInt(data.subId);
                    }
                    else {
                        stream.putInt(match.getProxy().currentMatchVO.matchId)
                            .putInt(match.getProxy().currentMatchVO.subId);
                    }
                    return;
                case app.NetAction.PLAYERCHECKAT:
                    this.sendPackage.nAppID = data;
                    return;
                case app.NetAction.REQPLAYERLEAVE:
                    stream.putInt(0);
                    return;
            }
        };
        MatchCommands.prototype.resultHandler = function (stream) {
            var nConst = app.NetAction;
            var mConst = app.constant.AppMediatorConst;
            switch (this.pocsact) {
                case nConst.SNG_RESPJOIN:
                case nConst.MTT_RESPJOIN:
                    var flag = stream.getByte(4);
                    if (flag == 0) {
                        cy.addConnectHeart(nConst.MTT_CHECKAT);
                    }
                    else {
                        console.log("获取比赛列表失败，flag=" + flag);
                    }
                    if (stream.getAvailable() >= 4) {
                        var svrTime = stream.getInt() * 1000;
                        var date = new Date(svrTime);
                        var curr = new Date();
                        match.svrTimeOffset = svrTime - curr.getTime();
                        console.log("[同步]远端:" + DateUtils.dateFormat(date, "hh:mm:ss") +
                            " 本地:" + DateUtils.dateFormat(curr, "hh:mm:ss") +
                            " 误差:" + Math.floor(match.svrTimeOffset / 1000) + "秒");
                    }
                    return;
                case nConst.SNG_RESPMATCHCONFIGLIST:
                case nConst.MTT_RESPMATCHCONFIGLIST:
                    // var totalcnt = stream.getInt();
                    // var curcnt = stream.getInt();
                    // 前8位不用读了，改用106收发
                    var configInfo = stream.getSuruct(cyvos.MatchConfigInfo, 8);
                    if (configInfo.gameId == AppConst.GAME_ID) {
                        match.getProxy().configList.push(configInfo);
                        console.log("matchId=" + configInfo.matchId + " appId=" + configInfo.matchAppId);
                    }
                    return;
                case nConst.SNG_RESPGETMATCHLIST:
                case nConst.MTT_RESPGETMATCHLIST:
                    // var totalcnt = stream.getInt(4);
                    // var curcnt = stream.getInt();
                    // console.log("totalcnt=" + totalcnt + " curcnt=" +curcnt);
                    // if (totalcnt == 0) return;
                    // 前12位不用读了，改用106收发
                    var flag = stream.getByte(12); //是否为自己的比赛
                    var matchInfo = stream.getSuruct(cyvos.MatchPlazaInfo);
                    matchInfo.flag = flag;
                    match.getProxy().matchList.push(matchInfo);
                    // console.log('matchId='+matchInfo.matchId+" subId="+matchInfo.subId);
                    // if (totalcnt == curcnt) {
                    //     match.getProxy().mttList = [];
                    // }
                    // var matchVO = match.getProxy().getMatch(matchInfo.matchId);
                    // if (matchVO != null) {
                    //     matchVO.subId = matchInfo.subId; //更新SUBID
                    //     matchVO.online = matchInfo.players; //更新人数
                    // }
                    // console.log("["+curcnt+"/"+totalcnt+"] matchId="+matchInfo.matchId+",subId="+
                    //         matchInfo.subId+",flag="+flag+" state="+matchInfo.status+" online="+matchInfo.players);
                    // if (flag == 1) {
                    //     if(matchVO!=null) {
                    //         matchVO.isSigned = true;
                    //         match.getProxy().setMttRemind(matchVO);
                    //     }
                    //     if(totalcnt == curcnt) {
                    //         // 如果是自己的比赛还在继续，则直接进入游戏(自动断线重连)
                    //         // match.getProxy().reConnectMatch(matchVO);
                    //     }
                    // } else if (flag == 0) {
                    //     if(matchVO!=null) matchVO.isSigned = false;
                    // }
                    // if (totalcnt == curcnt) {
                    //     match.getProxy().configLoadCompleteTime = egret.getTimer();
                    //     console.log("match list load complete");
                    //     match.getProxy().joinMatchVO = matchInfo;
                    //     this.sendNotification(NetAction.JOIN_MATCH);//连接到比赛服务
                    // }
                    return;
                // case nConst.MTT_RESPMATCHINFO:
                //     var gameId = stream.getInt();
                //     var matchId = stream.getInt();
                //     var startHour = stream.getInt();
                //     var startMin = stream.getInt();
                //     var isMtt = stream.getInt();
                //     var isPhonebind = stream.getInt();
                //     var isRealpeople = stream.getInt();
                //     var weekday = stream.getInt();
                //     var month = stream.getInt();
                //     var day = stream.getInt();
                //     var year = stream.getInt();
                //     var type = stream.getInt();//时间类型
                //     var signtime = stream.getInt(); //报名时间
                //     var isSng = stream.getInt(); //是否为SNG
                //     var orderId = stream.getInt(); //排序或折叠的标准
                //     // console.log("resp match info, matchId:"+matchId);
                //     if (isSng) {  //如果是SNG比赛，则维护SNG列表
                //         var sngVO = match.getProxy().sngList[orderId];
                //         sngVO.type = room.TYPE.SNG;
                //         sngVO.matchId = matchId;
                //     } else {  //如果是MTT比赛，则维护MTT列表
                //         if (match.getProxy().matchList == null) return;
                //         var cfgVO = match.getProxy().getSvrMatchInfo(matchId);
                //         if (cfgVO == null) {
                //             console.log("not find match config");
                //             return;
                //         }
                //         var mttVO = <appvos.MttMatchVO>match.getProxy().getMatch(matchId);
                //         if (mttVO == null) {
                //             mttVO = new appvos.MttMatchVO();
                //             mttVO.type = room.TYPE.MTT;
                //             mttVO.matchId = matchId;
                //             match.getProxy().mttList.push(mttVO);
                //         }
                //         mttVO.subId = cfgVO.subId;
                //         mttVO.online = cfgVO.players;
                //         mttVO.orderId = orderId;
                //         switch(type) {
                //             case 0: //每日循环
                //                 mttVO.startTime = DateUtils.getNearTime(startHour,startMin);
                //                 break;
                //             case 1: //每周同一时间循环
                //                 mttVO.startTime = DateUtils.getNearWeekTime(weekday,startHour,startMin);
                //                 break;
                //             case 2: //每月同一时间循环
                //                 break;
                //             case 3: //单次时间不循环
                //                 mttVO.startTime = new Date(year,month,day,startHour,startMin).getTime();
                //                 break;
                //         }
                //         //*测试用*/ mttVO.startTime = new Date().getTime()+7203000;//设定2小时3秒后开赛
                //         //*测试用*/ mttVO.startTime = cy.getServerTime().getTime()+5000;//设定5秒后开赛
                //         mttVO.signTime = mttVO.startTime - 60000 * signtime;
                //         if(mttVO.isSigned) {
                //             match.getProxy().setMttRemind(mttVO);
                //         }
                //     }
                //     return;
                case nConst.RESPJOINMATCH:
                    var flag = stream.getByte(4);
                    if (flag == 0) {
                        cy.addConnectHeart(app.NetAction.PLAYERCHECKAT, this.recvPackage.nAppID);
                        if (match.getProxy().autoSignupAfterJoinMatch) {
                            this.sendNotification(app.NetAction.MTT_REQSIGNUP);
                        }
                    }
                    else {
                        console.log("join match faild [flag=" + flag + "]");
                    }
                    match.getProxy().autoSignupAfterJoinMatch = false;
                    return;
                case nConst.RESPPLAYERLEAVE:
                    cy.removeConnectHeart(app.NetAction.PLAYERCHECKAT, this.recvPackage.nAppID);
                    return;
                case nConst.SNG_UPDATEMATCHSIGNUPS: //更新人数
                case nConst.MTT_UPDATEMATCHSIGNUPS:
                    var gameid = stream.getInt();
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var signups = stream.getInt();
                    // console.log("服务器推送人数变化");
                    matchVO = match.getProxy().getMatch(matchId);
                    if (matchVO != null && matchVO.subId == subId) {
                        matchVO.numPlayers = signups;
                    }
                    if (user.getProxy().currentRoom != null &&
                        user.getProxy().currentRoom.type == 4 /* SNG */ &&
                        match.getProxy().currentMatchVO != null &&
                        match.getProxy().currentMatchVO.subId == subId) {
                        this.sendNotification(mConst.UPDATE_MATCH_NUMPLAYERS);
                    }
                    return;
                // case nConst.MTT_SYNC_SVR_TIME:
                // var time = stream.getInt() * 1000;
                // var date = new Date(time);
                // var curr = new Date();
                // match.svrTimeOffset = time - curr.getTime();
                // console.log("[同步]远端:"+DateUtils.dateFormat(date,"hh:mm:ss")+
                //             " 本地:"+DateUtils.dateFormat(curr,"hh:mm:ss")+
                //             " 误差:"+Math.floor(match.svrTimeOffset/1000)+"秒");
                // return;
                case nConst.SNG_RESPSIGNUP: //SNG比赛报名成功
                case nConst.MTT_RESPSIGNUP:
                    var flag = stream.getByte(4);
                    var leftTime = stream.getInt();
                    var signups = stream.getInt();
                    var status = stream.getByte();
                    var gameAppId = stream.getInt();
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    console.log("resp signup matchId=" + matchId + " subId=" + subId + " flag=" + flag);
                    var matchVO = match.getProxy().getMatch(matchId);
                    matchVO.isSignuping = false; //报名通信过程结束
                    if (flag == 0) {
                        //报名成功，进入房间，准备开始比赛
                        matchVO.isSigned = true;
                        matchVO.subId = subId;
                        var roomVO = new appvos.RoomVO();
                        roomVO.svrOfsId = gameAppId;
                        roomVO.svrMode = 303 /* MATCH */;
                        if (matchVO.blinds.length > 0) {
                            roomVO.smallBlinds = matchVO.blinds[0].smallBlinds;
                            roomVO.bigBlinds = matchVO.blinds[0].bigBlinds;
                        }
                        roomVO.type = matchVO.type;
                        switch (matchVO.type) {
                            case 4 /* SNG */:
                                user.getProxy().exitToMoudle = AppReg.SNG;
                                user.getProxy().willJoinMatchRoom = true;
                                user.getProxy().joinRoom(roomVO); //报名成功自动加入房间
                                matchVO.wheelPlayed = false;
                                //LDY说，报名成功会马上通知准备，所以注释了。
                                // playcards.getProxy().openMoudle(playcards.OPEN_PARAM.WAITING);
                                break;
                            case 5 /* MTT */:
                                user.getProxy().exitToMoudle = AppReg.MTT;
                                match.getProxy().setMttRemind(matchVO); //报名成功，设置倒计时提示
                                match.getProxy().setNotifSDK(matchVO); //报名成功，设置客户端本地消息推送
                                break;
                        }
                        this.sendNotification(app.NetAction.TOOL_RILVER);
                        this.sendNotification(app.constant.AppMediatorConst.SIGNUP_SUCCESS);
                    }
                    else {
                        if (flag == 9 && matchVO.type == 5 /* MTT */) {
                            //MTT人满了，报名失败，SNG不会人满，出现错误，报ID错误，用于区分
                            var nextMatchVO = match.getProxy().getNextMatch(matchVO, 30 * 60000);
                            if (nextMatchVO == null) {
                                tip.Alert.show(gameabc.getMessage("MTT_MAX"));
                            }
                            else {
                                var tStr = DateUtils.dateFormat(nextMatchVO.startTime, "hh:mm");
                                var msg = gameabc.getMessage("MTT_MAX_AUTO_SIGN", tStr);
                                tip.Alert.show(msg, "", tip.CONFIRM, this.autoSignNextMatchAlertCallback, nextMatchVO, this);
                            }
                            return;
                        }
                        if (flag == 101) {
                            tip.Alert.show(gameabc.getMessage("SNG_TICKET_LIMIT"), "", tip.CONFIRM, this.onTicketLimit, matchId, this);
                            return;
                        }
                        this.tipError(flag, "比赛报名失败，错误ID:");
                    }
                    return;
                case nConst.SNG_RESPCANCELSIGNUP:
                case nConst.MTT_RESPCANCELSIGNUP:
                    var flag = stream.getByte(4);
                    var score = stream.getLong();
                    var sr = stream.getLong();
                    var propId = stream.getInt();
                    var propcnt = stream.getInt();
                    var signups = stream.getInt();
                    var status = stream.getByte();
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var matchVO = match.getProxy().getMatch(matchId);
                    if (flag == 0) {
                        matchVO.isSigned = false;
                        if (match.getProxy().currentMatchVO == matchVO) {
                            match.getProxy().currentMatchVO = null;
                        }
                        match.getProxy().leaveMatchProcess(matchVO.svrConfigInfo.matchAppId);
                        this.sendNotification(app.NetAction.TOOL_RILVER);
                        match.getProxy().cancelMttRemind(matchVO);
                        tip.clearSysCenterTimeTooltip();
                        tip.clearSysTopTimeTooltip();
                    }
                    return;
                case nConst.SNG_AWARDINFO:
                case nConst.MTT_AWARDINFO:
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var rank = stream.getInt();
                    var bestrank = stream.getInt();
                    var bestawardtime = stream.getInt();
                    var matchVO = match.getProxy().getMatch(matchId);
                    if (matchVO != null) {
                        matchVO.isSigned = false;
                        if (room.getProxy().current != null &&
                            match.getProxy().currentMatchVO != null &&
                            match.getProxy().currentMatchVO.matchId == matchId &&
                            match.getProxy().currentMatchVO.subId == subId) {
                            if (room.getProxy().currentType == 4 /* SNG */ /* && rank<=2*/) {
                                __OPEN_MOUDLE(AppReg.SNG_RESLUT, rank);
                            }
                            else if (room.getProxy().currentType == 5 /* MTT */) {
                                __OPEN_MOUDLE(AppReg.SNG_RESLUT, rank);
                            }
                        }
                        match.getProxy().leaveMatchProcess(matchVO.svrConfigInfo.matchAppId);
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_LIST);
                    }
                    return;
                case nConst.UPDATEMATCHSTATUS:
                    var gameId = stream.getInt();
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var status = stream.getByte();
                    var matchVO = match.getProxy().getMatch(matchId);
                    if (matchVO != null && matchVO.subId == subId) {
                        matchVO.svrStatus = status;
                    }
                    return;
                case nConst.SNG_REQADDCUSTOMERMATCH:
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var rate = stream.getInt();
                    var bonus = stream.getLong();
                    var matchVO = match.getProxy().getMatch(matchId);
                    matchVO.wheelBonus = bonus;
                    console.log("wheelBonus:" + bonus);
                    return;
                case nConst.SNG_RESPADDCUSTOMERMATCH:
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var bonus = stream.getLong();
                    return;
                case nConst.MTT_RESP_AUTO_CANCEL:
                    var matchId = stream.getInt();
                    var subId = stream.getInt();
                    var flag = stream.getInt();
                    if (flag == 0) {
                        tip.Alert.show(gameabc.getMessage("MTT_AUTO_CANCEL"));
                        var matchVO = match.getProxy().getMatch(matchId);
                        if (matchVO != null) {
                            matchVO.isSigned = false;
                        }
                        if (match.getProxy().currentMatchVO != null &&
                            match.getProxy().currentMatchVO == matchVO) {
                            playcards.getProxy().outbakfun();
                            match.getProxy().currentMatchVO = null;
                        }
                        tip.clearSysCenterTimeTooltip();
                        tip.clearSysTopTimeTooltip();
                    }
                    return;
                /*
                1.比赛奖励
                awardconfig='asr=100;ajf=100;apid="1001,1002";apcnt="1,2";adsf=8;'
                //asr 金币
                //ajf 积分
                //apid 道具id 逗号分割
                //apcnt 道具数量
                //adsf  大师分

                2.比赛房间配置
                roommoderule="matchids='14,40,41,42,43,44,45,46';waitenter=30;startgame=1;noesape=1;"
                //matchids 房间支持的比赛id
                gamerule="MatchAntes='200,400,600,800,1000,1200,1600,2000,3000,4000,6000,10000,20000,40000,80000';AddAnteTime='45';MatchRoomPreAntes='0,100,150,200,250,300,400,500,750,1000,1500,2500,5000,10000,20000';RoomType='5';"
                //MatchAntes 升盲
                //AddAnteTime 时间
                //MatchRoomPreAntes 前注

                3.比赛配置
                startparam="mincnt=4;maxcnt=6;signupdelay=30;signuplimit=10; maxsubmatch=1;subname="sub1='冠军赛';";outrule1='决赛';round1=1;outdesc1='积分最高者为冠军';startmatchhour=15;startmatchmin=0;ismtt=1;isphonebind=0;isrealpeople=1;weekday=-1;month=-1;day=-1;year=2016;matchtype=0;istest=0;signuptime=45;"
                //mincnt 最少开赛人数
                //maxcnt 最大报名人数
                signupparam="type1=3;id1='3003';cnt1='1';name1='3003号道具1个';type2=1;id2='1';cnt2='1000';name2='1000彩豆';signupcondition='fee=100;';"
                //配置是type1 id1 cnt1 ... type2 id2 cnt2 ...分组配置
                //fee=100; 服务费用
                //type的枚举值

                */
                // case nConst.RESP_MATCHCONFIG:
                //     var flag = stream.getInt();
                //     var szConfig = stream.getStr();
                //     var sep = "$$$";
                //     var param = szConfig.split(sep);
                //     var luaData;
                //     switch(flag){
                //         case 0: //房间配置
                //             var roomId          = param[0];
                //             var roomMode        = param[1];
                //             var roomName        = param[2];
                //             var keyword         = param[3];
                //             var gameRule        = param[4];
                //             var roomModeRule    = param[5];
                //             var tableChairCnt   = param[6];
                //             var roomOfsId       = param[7];
                //             // this.parseRoomConfig(gameRule, roomModeRule, roomOfsId);
                //             break;
                //         case 1: //奖励配置
                //             var matchId         = parseInt(param[0]);
                //             var startRank       = parseInt(param[1]);
                //             var endRank         = parseInt(param[2]);
                //             var awardConfig     = param[3];
                //             var description     = param[4];
                //             // this.parseRewardConfig(matchId,awardConfig,startRank,endRank);
                //             break;
                //         case 2: //比赛配置
                //             var matchId         = parseInt(param[0]);
                //             var name            = param[1];
                //             var gameIdStr       = param[2];
                //             var startType       = param[3];
                //             var startParam      = param[4];
                //             var ruleType        = param[5];
                //             var ruleParam       = param[6];
                //             var signupType      = param[7];
                //             var signupParam     = param[8];
                //             var intervalTime    = param[9];
                //             var startTime       = param[10];
                //             var endTime         = param[11];
                //             var matchTable      = param[12];
                //             var matchLogTable   = param[13];
                //             var matchUrl        = param[14];
                //             var description     = param[15];
                //             // this.parseMatchConfig(matchId,startParam,signupParam);
                //             break;
                //         case 3: //全部
                //             break;
                //     }
                //     // console.log(szConfig);
                //     // match.getProxy().getMatchByOrderId();
                //     return;
                case nConst.MATCH_LIST_BATCH_COMPLETE: //批量协议
                case nConst.MATCH_BATCH_COMPLETE:
                    var flag = stream.getByte();
                    var xyid = stream.getShort();
                    var count = stream.getShort();
                    this.action = String(xyid);
                    this.pocsact = this.process + app.NetAction.PROCESS_CUT + this.action;
                    this.batchHandler(flag, count);
                    return;
            }
        };
        MatchCommands.prototype.batchHandler = function (flag, count) {
            var nConst = app.NetAction;
            console.log("xyid=" + this.pocsact + " flag=" + (flag == 0 ? "start" : "end") + " len=" + count);
            switch (this.pocsact) {
                case nConst.MTT_RESPMATCHCONFIGLIST:
                    if (flag == 0) {
                        match.getProxy().configList = [];
                    }
                    else if (flag == 1) {
                        // this.sendNotification(NetAction.MTT_REQGETMATCHLIST);//获取当前可参与的比赛列表
                        this.parseAllConfig();
                    }
                    return;
                case nConst.MTT_RESPGETMATCHLIST:
                    if (flag == 0) {
                        match.getProxy().matchList = [];
                    }
                    else if (flag == 1) {
                        for (var i = 0; i < match.getProxy().matchList.length; ++i) {
                            var infoVO = match.getProxy().matchList[i];
                            var matchVO = match.getProxy().getMatch(infoVO.matchId);
                            if (matchVO == null) {
                                console.log("比赛配置不全 matchId=" + matchVO.matchId);
                                continue;
                            }
                            matchVO.isSigned = infoVO.flag == 1;
                            matchVO.subId = infoVO.subId;
                            matchVO.numPlayers = infoVO.players;
                            matchVO.svrStatus = infoVO.status;
                            if (matchVO.isSigned && matchVO.type == 5 /* MTT */) {
                                //如果当前时间比可报名的时间还早，视为该赛不是次日的，并且比赛已经开始了
                                if (match.getSvrTime() < matchVO.signupStartTime) {
                                    matchVO.startTime -= DateUtils.DAY_TIME;
                                }
                                else {
                                    match.getProxy().setMttRemind(matchVO);
                                }
                                match.getProxy().joinMatchProcess(matchVO.svrConfigInfo.matchAppId);
                            }
                            if (matchVO.type == 4 /* SNG */) {
                                console.log("sng:matchId=" + matchVO.matchId +
                                    " orderId=" + matchVO.orderId);
                            }
                            if (matchVO.type == 5 /* MTT */) {
                                var mttVO = matchVO;
                                console.log("mtt:matchId=" + mttVO.matchId +
                                    " subId=" + mttVO.subId +
                                    " signed=" + mttVO.isSigned +
                                    " plyaers=" + mttVO.numPlayers +
                                    " category=" + mttVO.category +
                                    " orderId=" + mttVO.orderId +
                                    " status=" + mttVO.svrStatus +
                                    " time=" + DateUtils.dateFormat(new Date(mttVO.startTime), "MM/dd-hh:mm"));
                            }
                        }
                    }
                    this.sendNotification(app.constant.AppMediatorConst.UPDATE_MATCH_LIST);
            }
        };
        MatchCommands.prototype.parseAllConfig = function () {
            var configList = match.getProxy().configList; //服务端的配置信息
            for (var i = 0; i < configList.length; ++i) {
                var cfgVO = configList[i];
                this.parseMatchConfig(cfgVO.matchId, cfgVO.startParam, cfgVO.signupDesc);
                this.parseMatchTime(cfgVO.matchId, cfgVO.startParam);
                var awardConfigStrs = cfgVO.matchReward.split('$$$');
                for (var j = 0; j < awardConfigStrs.length; ++j)
                    this.parseRewardConfig(cfgVO.matchId, awardConfigStrs[j]);
                this.parseRoomConfig(cfgVO.matchDesc, "matchids=" + cfgVO.matchId, cfgVO.gameAppId);
                var matchVO = match.getProxy().getMatch(cfgVO.matchId);
                matchVO.name = cfgVO.name;
                matchVO.svrConfigInfo = cfgVO;
            }
        };
        MatchCommands.prototype.parseRoomConfig = function (gameRuleStr, roomModeRuleStr, roomOfsId) {
            var luaData = gameabc.StringUtils.parseLuaString(gameRuleStr);
            var blinds = String(luaData.MatchAntes).split(","); //升盲列表
            var antis = String(luaData.MatchRoomPreAntes).split(","); //升盲前注
            var times = parseInt(luaData.AddAnteTime); //升盲时间
            var startBet = parseInt(luaData.defaults); //初始筹码
            var blindVOs = [];
            for (var i = 0; i < blinds.length; ++i) {
                var bb = parseInt(blinds[i]);
                var ab = parseInt(antis[i]);
                blindVOs[i] = match.getProxy().createBlindsVO(i + 1, bb / 2, bb, ab, times); //小盲、大盲、前注、升盲时间
            }
            luaData = gameabc.StringUtils.parseLuaString(roomModeRuleStr);
            var matchs = String(luaData.matchids).split(","); //当前这条升盲配置匹配的比赛列表
            for (var i = 0; i < matchs.length; ++i) {
                var matchId = parseInt(matchs[i]);
                var matchVO = match.getProxy().getMatch(matchId);
                if (matchVO == null)
                    return;
                matchVO.blinds = blindVOs;
                matchVO.gameAppId = roomOfsId;
                matchVO.bet = startBet;
            }
        };
        MatchCommands.prototype.parseRewardConfig = function (matchId, awardConfigStr) {
            var matchVO = match.getProxy().getMatch(matchId);
            if (matchVO == null)
                return;
            // console.log(awardConfigStr);
            if (matchVO.rewards == null)
                matchVO.rewards = [];
            awardConfigStr = awardConfigStr.replace("|", ""); //LDY的BUG，为什么有杠杠
            var luaData = gameabc.StringUtils.parseLuaString(awardConfigStr);
            var coin = 0, score = 0, propId = 0, propNum = 0;
            if (luaData.awardconfig != null) {
                coin = parseInt(luaData.awardconfig.asr) || 0; //金币(银子) 
                score = parseInt(luaData.awardconfig.adsf) || 0; //大师分
                propId = parseInt(luaData.awardconfig.apid) || 0; //道具ID
                propNum = parseInt(luaData.awardconfig.apcnt) || 0; //道具数量
            }
            var rankStart = parseInt(luaData.rankstart);
            var rankEnd = parseInt(luaData.rankend);
            for (var i = rankStart; i <= rankEnd; ++i) {
                var reward = match.getProxy().createRewardVO(i, coin, score);
                reward.propId = propId;
                reward.propNum = propNum;
                matchVO.rewards[i - 1] = reward;
            }
        };
        MatchCommands.prototype.parseMatchTime = function (matchId, startParamStr) {
            var matchVO = match.getProxy().getMatch(matchId);
            var luaData = gameabc.StringUtils.parseLuaString(startParamStr);
            var matchtype = parseInt(luaData.matchtype);
            var startHour = parseInt(luaData.startmatchhour);
            var startMin = parseInt(luaData.startmatchmin);
            var weekday = parseInt(luaData.weekday);
            var year = parseInt(luaData.year);
            var month = parseInt(luaData.month);
            var day = parseInt(luaData.day);
            var signupStartTime = parseInt(luaData.signuptime);
            var signupEndTime = parseInt(luaData.signupendtime);
            var cancelEndTime = parseInt(luaData.cancelendtime);
            switch (matchtype) {
                case 0:
                    matchVO.startTime = DateUtils.getNearTime(startHour, startMin);
                    break;
                case 1:
                    matchVO.startTime = DateUtils.getNearWeekTime(weekday, startHour, startMin);
                    break;
                case 2:
                    break;
                case 3:
                    matchVO.startTime = new Date(year, month, day, startHour, startMin).getTime();
                    break;
            }
            matchVO.signupStartTime = matchVO.startTime - (60000 * signupStartTime);
            matchVO.signupEndTime = matchVO.startTime - (60000 * signupEndTime);
            matchVO.cancelEndTime = matchVO.startTime - (60000 * cancelEndTime);
            //以下测试代码
            // matchVO.startTime = match.getSvrTime()+75000;//设定75秒后开赛
            // matchVO.signupStartTime = 0;
            // matchVO.signupEndTime = matchVO.startTime + 60000;
            // matchVO.startTime = match.getSvrTime()+7203000;//设定2小时3秒后开赛
            // matchVO.startTime = cy.getServerTime().getTime()+5000;//设定5秒后开赛
        };
        MatchCommands.prototype.parseMatchConfig = function (matchId, startParamStr, signupParamStr) {
            var luaData = gameabc.StringUtils.parseLuaString(startParamStr);
            if (luaData.issng == "1") {
                var matchVO = match.getProxy().sngList[parseInt(luaData.order)];
                matchVO.type = 4 /* SNG */;
                matchVO.matchId = matchId;
            }
            else {
                var matchVO = match.getProxy().getMatch(matchId);
                if (matchVO == null) {
                    matchVO = new appvos.MttMatchVO();
                    matchVO.type = 5 /* MTT */;
                    matchVO.matchId = matchId;
                    matchVO.orderId = parseInt(luaData.order);
                    match.getProxy().mttList.push(matchVO);
                }
            }
            matchVO.minPlayers = parseInt(luaData.mincnt); //最小报名人数
            matchVO.maxPlayers = parseInt(luaData.maxcnt); //最大报名人数
            if (matchVO instanceof appvos.MttMatchVO) {
                matchVO.allRewards = parseInt(luaData.allreward); //比赛的总奖池
                matchVO.category = parseInt(luaData.category) || 0; //MTT比赛分类
            }
            luaData = gameabc.StringUtils.parseLuaString(signupParamStr);
            matchVO.entryFee = this.getCoinInSignupParamType(luaData); //报名费
            matchVO.tax = parseInt(luaData.signupcondition.fee); //税费(服务费)
        };
        MatchCommands.prototype.getCoinInSignupParamType = function (luaData) {
            for (var i = 1; i < 9; ++i) {
                if (luaData["type" + i] == 1) {
                    return parseInt(luaData["cnt" + i]);
                }
            }
            return -1; //找不到返回-1，一般不太可能
        };
        MatchCommands.prototype.clearKeywordToString = function (param) {
            return "";
        };
        MatchCommands.prototype.clearKeywordToNumber = function (param) {
            return 0;
        };
        MatchCommands.prototype.onTicketLimit = function (yesOrNo, params) {
            if (yesOrNo == tip.YES) {
                var matchVO = match.getProxy().getMatch(params);
                if (matchVO == null)
                    console.log("auto coin error");
                if (user.getProxy().svrGameData.silver < matchVO.entryFee + matchVO.tax) {
                    user.getProxy().openMoney();
                }
                else {
                    matchVO.autoCoin = true;
                    this.sendNotification(app.NetAction.SNG_REQSIGNUP);
                }
            }
        };
        MatchCommands.prototype.autoSignNextMatchAlertCallback = function (type, params) {
            var nextMatchVO = params;
            if (type == tip.YES) {
                match.getProxy().signMatch(nextMatchVO.matchId);
            }
        };
        return MatchCommands;
    }(cy.SrsCommand));
    app.MatchCommands = MatchCommands;
    __reflect(MatchCommands.prototype, "app.MatchCommands");
})(app || (app = {}));
//# sourceMappingURL=MatchCommands.js.map