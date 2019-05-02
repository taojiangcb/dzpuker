module match {

    export const enum JOINTYPE {
        FREE,//免费
        COIN,//付费
        SCORE,//积分
        PROPS,//道具
        COIN_AND_PROPS,//付费+道具
        SCORE_AND_PROPS//积分+道具
    }

    export const enum CATEGORY{
        DEFAULT = 0, //默认
        SILVER = 1,  //德州金币
        ZHEPAI  = 2, //浙牌
        GIRL = 4,    //真人
        REDPACK = 8  //红包
    }
    
    export function getProxy():MatchProxy {
        return __GET_PROXY(MatchProxy);
    }


    export function setServer(cfgId:number):void {
        var sng_list;
        var mtt_list;
        var mttSubList;
        switch (cfgId) {
            case room.CONFIG.PUBLIC:
                sng_list = [12,13,14];
                mtt_list = [15];
                mttSubList = [1];
                break;
            case room.CONFIG.AUTO_SRS:
                sng_list = [11,13,14];
                mtt_list = [];
                mttSubList = [];
                break;
            default:
                sng_list =   [17,18];
                mtt_list =   [14,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
                mttSubList = [ 5, 4, 1, 1, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1];
        }
        var len = match.getProxy().sngList.length;
        for (var i=0; i<len; ++i) {
            match.getProxy().sngList[i].matchId = sng_list[i];
        }
        len = match.getProxy().mttList.length;
        for (i = 0; i<len; ++i) {
            match.getProxy().mttList[i].matchId = mtt_list[i];
            match.getProxy().mttList[i].orderId = mttSubList[i];
        }
    }

    export function getSvrTime():number {
        return new Date().getTime() + svrTimeOffset;
    }
    export var svrTimeOffset:number = 0;


    export class MatchProxy extends app.mvc.AbsractProxy {

        public static NAME:string = "match_proxy";
        constructor(){
            super(MatchProxy.NAME);
        }

        configList:cyvos.MatchConfigInfo[]; //服务端过来的数据，临时存放，查询用，客户端逻辑一律使用MatchVO
        matchList:cyvos.MatchPlazaInfo[]; //服务端过来的数据，临时存放，查询用，客户端逻辑一律使用MatchVO
        matchProcessList:number[] = []; //维护当前一共连着哪些matchProcess

        // getMatchConfig(matchId:number):cyvos.MatchConfigInfo {
        //     if (this.configList==null) return null;
        //     var i = this.configList.length;
        //     while (--i > -1) {
        //         if (this.configList[i].matchId == matchId) {
        //             return this.configList[i];
        //         }
        //     }
        //     return null;
        // }
        // getMatchInfo(matchId:number):cyvos.MatchPlazaInfo {
        //     if (this.matchList==null) return null;
        //     var i = this.myMatchList.length;
        //     while(--i > -1) {
        //         if (this.myMatchList[i].matchId == matchId) {
        //             return this.myMatchList[i]
        //         }
        //     }
        //     i = this.matchList.length;
        //     while (--i > -1) {
        //         if (this.matchList[i].matchId == matchId) {
        //             return this.matchList[i]
        //         }
        //     }
        //     return null;
        // }

        joinMatch(matchVO:appvos.MatchVO):void {
            matchVO.wheelBonus = matchVO.entryFee * this.wheelProb[0];
            this.currentMatchVO = matchVO;
        }

        getTicket(matchId:number):item.PropVO {
            var len = this.sngList.length;
            for (var i=0; i<len; ++i) {
                var matchVO = this.sngList[i];
                if (matchVO==null || matchVO.matchId==-1) {
                    return null;
                } else if(matchVO.matchId == matchId) {
                    return item.getProxy().getPropDataById(i+1);
                }
            }
            return null;
        }

        hasTicket(matchId:number):boolean {
            var ticket = this.getTicket(matchId);
            // return true; 
            return ticket!=null&&ticket.num>0;
        }


        getMatch(matchId:number):appvos.MatchVO {
            var len = this.sngList.length;
            for (var i=0; i<len; ++i) {
                if (this.sngList[i].matchId==matchId){
                    return this.sngList[i];
                }
            }
            len = this.mttList.length;
            for (var i=0; i<len; ++i) {
                if (this.mttList[i].matchId==matchId){
                    return this.mttList[i];
                }
            }
            return null;
        }

        getMatchByOrderId(orderId:number):appvos.MatchVO {
            var len = this.sngList.length;
            for (var i=0; i<len; ++i) {
                if (this.sngList[i].orderId==orderId){
                    return this.sngList[i];
                }
            }
            len = this.mttList.length;
            for (var i=0; i<len; ++i) {
                if (this.mttList[i].orderId==orderId){
                    return this.mttList[i];
                }
            }
            return null;
        }

        wheelProb = [2,1000,200,100,25,10,6,4];

        sngList:appvos.MatchVO[] = [
            this.createMatchVO(1000,  100, room.TYPE.SNG,  [],[]),
            this.createMatchVO(5000,  500, room.TYPE.SNG,  [],[]),
            this.createMatchVO(10000,  1000, room.TYPE.SNG,  [],[])
        ];
 
        mttList:appvos.MttMatchVO[] = [];



        createMatchVO(entryFee:number,tax:number,type:number,
        rewards:appvos.MatchRewardVO[],blinds:appvos.MatchBlindsVO[],name:string=""):appvos.MatchVO {
            var matchVO = new appvos.MatchVO();
            matchVO.rewards = rewards;
            matchVO.blinds = blinds;
            matchVO.entryFee = entryFee;
            matchVO.tax = tax;
            matchVO.type = type;
            matchVO.name = name;
            return matchVO;
        }

        createRewardVO(id:number,coin:number, score:number):appvos.MatchRewardVO {
            var reward = new appvos.MatchRewardVO();
            reward.rank = id;
            reward.coin = coin;
            reward.score = score;
            return reward;
        }

        createBlindsVO(id:number,sb:number,bb:number,ab:number,time:number):appvos.MatchBlindsVO {
            var blinds = new appvos.MatchBlindsVO();
            blinds.level = id;
            blinds.smallBlinds = sb;
            blinds.bigBlinds = bb;
            blinds.antiBlinds = ab;
            blinds.time = time;
            return blinds;
        }

        createMttMatchVO(allRewards:number,name:string,orderId:number,entryFee:number,tax:number,
        rewards:appvos.MatchRewardVO[],blinds:appvos.MatchBlindsVO[],min:number,max:number,bet:number):appvos.MttMatchVO {
            var matchVO = new appvos.MttMatchVO();
            matchVO.rewards = rewards;
            matchVO.blinds = blinds;
            matchVO.entryFee = entryFee;
            matchVO.tax = tax;
            matchVO.type = room.TYPE.MTT;
            matchVO.allRewards = allRewards;
            matchVO.name = name;
            matchVO.orderId = orderId;
            matchVO.minPlayers = min;
            matchVO.maxPlayers = max;
            matchVO.bet = bet;
            return matchVO;
        }


        getSvrMatchInfo(matchId:number):cyvos.MatchPlazaInfo {
            var len = this.matchList.length;
            for (var i=0; i<len; ++i) {
                var cfgVO = this.matchList[i];
                if (cfgVO.matchId == matchId) return cfgVO;
            }
            return null;
        }

        getSvrMatchConfig(matchId:number):cyvos.MatchConfigInfo {
            var len = this.configList.length;
            for (var i=0; i<len; ++i) {
                var cfgVO = this.configList[i];
                if (cfgVO.matchId == matchId) return cfgVO;
            }
            return null;
        }

        currentMatchVO: appvos.MatchVO;


        /** 同步这场比赛已经打了多久了(秒)，同时计算下次升盲的时间
         * 注意：传入的参数为秒，而记录的时间都是毫秒
        * 回调参数为 还有多久升盲，下级升盲对象，当前盲注序号         */
        setBetUpInterval(callbackFunc:Function, thisObj:any, timeout:number):void {
            var matchVO = match.getProxy().currentMatchVO;
            matchVO.startTime = match.getSvrTime()-timeout*1000;//同步开始时间
            var blinds = matchVO.blinds;
            var times: number = 0;
            for (var i: number = 0, len: number = blinds.length; i < len; i++){
                var vo = blinds[i];
                times += vo.time;
                if (times >= timeout) {
                    vo = blinds[i + 1];
                    if (vo) {
                        matchVO.blindsUpTime = matchVO.startTime + times*1000; //同步最近升盲时间
                        callbackFunc.call(thisObj, times - timeout , vo, i);
                    }
                    break;
                }                  
            }
        }

        blindsUp(matchVO:appvos.MatchVO):void {
            if (matchVO==null||matchVO.blinds==null)return;
            if (matchVO.blindsIndex < matchVO.blinds.length - 1) {
                ++matchVO.blindsIndex;
                matchVO.blindsUpTime += matchVO.blinds[matchVO.blindsIndex].time*1000;
            }
        }



        reConnectMatch(matchVO:appvos.MatchVO):void {
            match.getProxy().currentMatchVO = matchVO;
            var roomVO = new appvos.RoomVO();
            roomVO.svrOfsId = matchVO.gameAppId;
            roomVO.svrMode = room.SVR_MODE.MATCH;
            roomVO.smallBlinds = matchVO.blinds[0].smallBlinds;
            roomVO.bigBlinds = matchVO.blinds[0].bigBlinds;
            roomVO.type = matchVO.type;
            user.getProxy().exitToMoudle = AppReg.MTT;
            user.getProxy().willJoinMatchRoom = true;
            user.getProxy().joinRoom(roomVO);
            playcards.getProxy().openMoudle(playcards.OPEN_PARAM.WAITING);
        }

        /** 返回我的比赛  */
        getMyMttList():appvos.MatchVO[] {
            var list = [];
            var i = this.mttList.length;
            while (--i > -1) {
                if(this.mttList[i].isSigned) {
                    list.push(this.mttList[i]);
                }
            }
            return list;
        }


        /** 显示玩家可以报名或最近的比赛 */
        getAllMttList():appvos.MttMatchVO[] {
            var nowTime = getSvrTime();
            var list = [];
            var mttList = this.getNearMatchList();
            var i = mttList.length;
            while (--i > -1) {
                var matchVO = mttList[i];
                //比赛已经开始的，不再显示
                if(matchVO.startTime<nowTime) {
                    continue;
                //已报名，并且未开赛
                } else if(matchVO.isSigned&&nowTime<matchVO.startTime) {
                    var nextMatchVO = this.getNextMatch(matchVO);
                    if (nextMatchVO != null) list.push(nextMatchVO);
                //未报名，并且开赛前5分钟(关闭报名的时间)
                } else if(!matchVO.isSigned&&nowTime<matchVO.signupEndTime) {
                    list.push(matchVO);
                }
            }
            
            list.sort(this.sortMatchByTime);
            return list;
        }

        /** 返回某类型中，离当前时间最近的比赛(此逻辑略复杂)         */
        getNearMatchList():appvos.MatchVO[] {
            var nowTime = match.getSvrTime();
            var list = [];
            var allList = this.mttList.concat(); 
            while(allList.length > 0) { //每次挑一个比赛类型，选出一个最近时间，并删除其他时间的
                var i = allList.length - 1;
                var nearMatchVO = allList.pop();
                while (--i > -1) { //遍历删除相同的，并寻找最近时间的
                    var matchVO = allList[i];
                    if (matchVO.orderId == nearMatchVO.orderId) {
                        allList.splice(i,1); //如果subType一致则从候选列表中删除
                        if(matchVO.startTime < nearMatchVO.startTime && 
                        matchVO.startTime - (5*60*1000) > nowTime) { //提前五分钟关闭显示
                            nearMatchVO = matchVO;
                        }
                    }
                }
                list.push(nearMatchVO);
            }
            return list;
        }


        /** 根据显示标签分类查询所有比赛 */
        getSubList(category:number):appvos.MttMatchVO[] {
            var mttList = this.getAllMttList();
            var list = [];
            var len = mttList.length;
            var i:number = 0;
            for (; i < len; i++) {
                var mttVO = mttList[i];
                if(mttVO.category&category) {
                    list.push(mttVO);
                }
            }
            return list;
        }
        
        private sortMatchByTime(aMtt:appvos.MttMatchVO, bMtt:appvos.MttMatchVO):number {
            if (aMtt && bMtt) {
                if(aMtt.startTime < bMtt.startTime) {
                    return -1;
                } else if(aMtt.startTime > bMtt.startTime) {
                    return 1;
                } else {
                    return 0;
                }
            }
            return 0;
        }

        /** 获取比赛中玩家的的平均筹码 
         * 如果比赛排名信息空，则显示默认筹码 
         */
        getAverageCoin(matchVO:appvos.MatchVO):number {
            if(matchVO.rankList == null || matchVO.numPlayers == 0) return matchVO.bet;
            var len = matchVO.rankList.length;
            var total = 0;
            for (var i=0; i<len; ++i) {
                total += matchVO.rankList[i].bet;
            }
            return Math.floor(total / matchVO.numPlayers);
        }





        setMttRemind(matchVO:appvos.MatchVO):void {
            if (matchVO.remindStepVO != null) return;
            var mConst = app.constant.AppMediatorConst;
            var timerStepParam = app.SystemTimer.setTimesup(
                                    mConst.UPDATE_MTT_TIMESUP,
                                    matchVO.startTime-match.svrTimeOffset,
                                    mConst.UPDATE_MTT_TIME_STEP);
            timerStepParam.data = matchVO;
            matchVO.remindStepVO = timerStepParam;
            matchVO.wasRemind = false;
        }

        cancelMttRemind(matchVO:appvos.MatchVO):void {
            app.SystemTimer.removeListener(matchVO.remindStepVO);
            matchVO.remindStepVO = null;
        }

        setNotifSDK(matchVO:appvos.MatchVO):void {
            var title = gameabc.getMessage("PUSH_MTT_TITLE");
            var con = gameabc.getMessage("PUSH_MTT_CON", matchVO.name);
            var notiftime = matchVO.startTime - match.getSvrTime() - 5*60000;
            if (notiftime < 0) return;

            var lnNotification:Object = {
                title:title,              //提示title            
                time:notiftime,           //延时触发时间 时间单位:s(秒)
                content:con,              //本地推送消息的内容
                userData:{                //推送时带入的参数 可以在消息接收回时处理(例如{"param":"7799","identityKey":"keykeykey"})
                    identityKey:"mtt"     //消息的key 相同key的消息会被覆盖以最后一次的为准
                }
            }
            var sec = Math.floor(notiftime/1000);
            console.log(sec+"秒后推送消息："+con);
            var jsonNoti:string = JSON.stringify(lnNotification);
            utils.NativeUtils.nativeCall(utils.NATIVE_CMD.SLN,sec);
        }



        isShowSignButton(matchVO:appvos.MatchVO):boolean {
            if (matchVO.isSigned) return false;
            return match.getSvrTime()>matchVO.signupStartTime && match.getSvrTime()<matchVO.signupEndTime;
        }

        isShowCancelButton(matchVO:appvos.MatchVO):boolean {
            if (!matchVO.isSigned) return false;
            var time = matchVO.startTime - match.getSvrTime();
            return time > 120000;
        }

        /** 同类的比赛，在固定时间内是否还有下一场 */
        getNextMatch(currMatchVO:appvos.MatchVO, time:number=0):appvos.MatchVO {
            var similars:appvos.MatchVO[] = [];
            var i = this.mttList.length;
            var matchVO:appvos.MatchVO=null, nextVO:appvos.MatchVO=null;
            while(--i > -1) {
                matchVO = this.mttList[i];
                if (matchVO==currMatchVO) continue;
                if (matchVO.orderId != currMatchVO.orderId) continue;
                var delay = matchVO.startTime - match.getSvrTime();
                if (time==0 || delay<time) {
                    if (nextVO==null || matchVO.startTime<nextVO.startTime){
                        nextVO = matchVO;
                    }
                }
            }
            return nextVO;
        }


        signMatch(matchId:number):void {
            var matchVO = this.getMatch(matchId);
            if(matchVO.type==room.TYPE.MTT && matchVO.numPlayers>=matchVO.maxPlayers) {
                tip.Alert.show(gameabc.getMessage("MTT_MAX"));
                return;
            }

            //短信认证
            // if(matchVO instanceof appvos.MttMatchVO && <appvos.MttMatchVO>matchVO.isPhoneBind) {
            //     __OPEN_MOUDLE(AppReg.PHONE_VALIDATE);
            //     return;
            // }
            var ticket = match.getProxy().getTicket(matchId);
            if (ticket == null || ticket.num <= 0) {
                var needSilver = matchVO.entryFee+matchVO.tax;
                if (user.getProxy().svrGameData && user.getProxy().svrGameData.silver<needSilver) {
                    user.getProxy().openMoney();
                    return;
                }
            }

            //重复报名限制
            if (matchVO.isSignuping) {
                tip.popSysCenterTip("正在报名中，请勿重复点击");
                return;
            } else {
                matchVO.isSignuping = true;
            }

            var matchInfo = this.getSvrMatchInfo(matchId);
            if(matchInfo != null) {
               matchVO.subId = matchInfo.subId;
            }
            match.getProxy().joinMatch(matchVO);

            this.joinMatchProcess(matchVO.svrConfigInfo.matchAppId,true);
        }



        cancelMatch(matchId:number):void {
            __SEND_NOTIFICATION(app.NetAction.REQCANCELSIGNUP);
        }





        autoSignupAfterJoinMatch:boolean;
        joinMatchProcess(matchProcessAppId:number, autoSignup:boolean=false):void {
            if(this.matchProcessList.indexOf(matchProcessAppId)==-1) {
                this.autoSignupAfterJoinMatch = autoSignup;
                __SEND_NOTIFICATION(app.NetAction.REQJOINMATCH,matchProcessAppId);
            } else {
                __SEND_NOTIFICATION(app.NetAction.MTT_REQSIGNUP);
            }
        }
        leaveMatchProcess(matchProcessAppId:number):void {
            if (!this.hasMatchAboutProcess(matchProcessAppId)){
                this.sendNotification(app.NetAction.REQPLAYERLEAVE)
            }
        }
        hasMatchAboutProcess(matchProcessAppId:number):boolean {
            var len = this.sngList.length;
            for (var i=0; i<len; ++i) {
                var sngVO = this.sngList[i];
                if (sngVO.isSigned && 
                sngVO.svrConfigInfo.matchAppId==matchProcessAppId) {
                    return true;
                } 
            }
            len = this.mttList.length;
            for (var i=0; i<len; ++i) {
                var mttVO = this.mttList[i];
                if (mttVO.isSigned && 
                mttVO.svrConfigInfo.matchAppId==matchProcessAppId) {
                    return true;
                }
            }
            return false;
        }





        getRedpackStatusAlert(status:number):void {
            if (status==0) {
                var infoStr = "恭喜兑换成功，可前往微信查看红包";
                var btnImg = "iw_wozhidaole_png"
            } else if(status==2) {
                var infoStr = "首次兑换红包请先绑定微信号，并关注微信公众号游戏茶苑（gameteacom）";
                var btnImg = "iw_xiaciduihuan_png"
            }
            tip.Alert.show(infoStr,"",tip.CONFIRM,this.bindAlertCallback,
                    null,this,true,null,"iw_qianwangweixin_png",btnImg);
        }

        bindAlertCallback(type: number = 0):void {
            if (type == tip.YES) { //前往微信
                console.log("前往微信SDk");
                platform.toWeChat();
            } else if(type == tip.NO) { //下次兑换(关闭) 

            }
        }

        
        /** 
         *  注销清空数据
         */
        clearAllData(): void {
            match.svrTimeOffset = 0;
            this.configList = null;
            this.matchList = null;
            this.mttList = [];
            this.currentMatchVO = null;
            this.matchProcessList = [];
            this.sngList = [
                this.createMatchVO(1000,  100, room.TYPE.SNG,  [],[]),
                this.createMatchVO(5000,  500, room.TYPE.SNG,  [],[]),
                this.createMatchVO(10000,  1000, room.TYPE.SNG,  [],[])
            ];

        }
        

        
    }
}