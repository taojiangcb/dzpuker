var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    function getProxy() {
        return __GET_PROXY(MatchProxy);
    }
    match.getProxy = getProxy;
    function setServer(cfgId) {
        var sng_list;
        var mtt_list;
        var mttSubList;
        switch (cfgId) {
            case 1 /* PUBLIC */:
                sng_list = [12, 13, 14];
                mtt_list = [15];
                mttSubList = [1];
                break;
            case 2 /* AUTO_SRS */:
                sng_list = [11, 13, 14];
                mtt_list = [];
                mttSubList = [];
                break;
            default:
                sng_list = [17, 18];
                mtt_list = [14, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88];
                mttSubList = [5, 4, 1, 1, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1];
        }
        var len = match.getProxy().sngList.length;
        for (var i = 0; i < len; ++i) {
            match.getProxy().sngList[i].matchId = sng_list[i];
        }
        len = match.getProxy().mttList.length;
        for (i = 0; i < len; ++i) {
            match.getProxy().mttList[i].matchId = mtt_list[i];
            match.getProxy().mttList[i].orderId = mttSubList[i];
        }
    }
    match.setServer = setServer;
    function getSvrTime() {
        return new Date().getTime() + match.svrTimeOffset;
    }
    match.getSvrTime = getSvrTime;
    match.svrTimeOffset = 0;
    var MatchProxy = (function (_super) {
        __extends(MatchProxy, _super);
        function MatchProxy() {
            var _this = _super.call(this, MatchProxy.NAME) || this;
            _this.matchProcessList = []; //维护当前一共连着哪些matchProcess
            _this.wheelProb = [2, 1000, 200, 100, 25, 10, 6, 4];
            _this.sngList = [
                _this.createMatchVO(1000, 100, 4 /* SNG */, [], []),
                _this.createMatchVO(5000, 500, 4 /* SNG */, [], []),
                _this.createMatchVO(10000, 1000, 4 /* SNG */, [], [])
            ];
            _this.mttList = [];
            return _this;
        }
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
        MatchProxy.prototype.joinMatch = function (matchVO) {
            matchVO.wheelBonus = matchVO.entryFee * this.wheelProb[0];
            this.currentMatchVO = matchVO;
        };
        MatchProxy.prototype.getTicket = function (matchId) {
            var len = this.sngList.length;
            for (var i = 0; i < len; ++i) {
                var matchVO = this.sngList[i];
                if (matchVO == null || matchVO.matchId == -1) {
                    return null;
                }
                else if (matchVO.matchId == matchId) {
                    return item.getProxy().getPropDataById(i + 1);
                }
            }
            return null;
        };
        MatchProxy.prototype.hasTicket = function (matchId) {
            var ticket = this.getTicket(matchId);
            // return true; 
            return ticket != null && ticket.num > 0;
        };
        MatchProxy.prototype.getMatch = function (matchId) {
            var len = this.sngList.length;
            for (var i = 0; i < len; ++i) {
                if (this.sngList[i].matchId == matchId) {
                    return this.sngList[i];
                }
            }
            len = this.mttList.length;
            for (var i = 0; i < len; ++i) {
                if (this.mttList[i].matchId == matchId) {
                    return this.mttList[i];
                }
            }
            return null;
        };
        MatchProxy.prototype.getMatchByOrderId = function (orderId) {
            var len = this.sngList.length;
            for (var i = 0; i < len; ++i) {
                if (this.sngList[i].orderId == orderId) {
                    return this.sngList[i];
                }
            }
            len = this.mttList.length;
            for (var i = 0; i < len; ++i) {
                if (this.mttList[i].orderId == orderId) {
                    return this.mttList[i];
                }
            }
            return null;
        };
        MatchProxy.prototype.createMatchVO = function (entryFee, tax, type, rewards, blinds, name) {
            if (name === void 0) { name = ""; }
            var matchVO = new appvos.MatchVO();
            matchVO.rewards = rewards;
            matchVO.blinds = blinds;
            matchVO.entryFee = entryFee;
            matchVO.tax = tax;
            matchVO.type = type;
            matchVO.name = name;
            return matchVO;
        };
        MatchProxy.prototype.createRewardVO = function (id, coin, score) {
            var reward = new appvos.MatchRewardVO();
            reward.rank = id;
            reward.coin = coin;
            reward.score = score;
            return reward;
        };
        MatchProxy.prototype.createBlindsVO = function (id, sb, bb, ab, time) {
            var blinds = new appvos.MatchBlindsVO();
            blinds.level = id;
            blinds.smallBlinds = sb;
            blinds.bigBlinds = bb;
            blinds.antiBlinds = ab;
            blinds.time = time;
            return blinds;
        };
        MatchProxy.prototype.createMttMatchVO = function (allRewards, name, orderId, entryFee, tax, rewards, blinds, min, max, bet) {
            var matchVO = new appvos.MttMatchVO();
            matchVO.rewards = rewards;
            matchVO.blinds = blinds;
            matchVO.entryFee = entryFee;
            matchVO.tax = tax;
            matchVO.type = 5 /* MTT */;
            matchVO.allRewards = allRewards;
            matchVO.name = name;
            matchVO.orderId = orderId;
            matchVO.minPlayers = min;
            matchVO.maxPlayers = max;
            matchVO.bet = bet;
            return matchVO;
        };
        MatchProxy.prototype.getSvrMatchInfo = function (matchId) {
            var len = this.matchList.length;
            for (var i = 0; i < len; ++i) {
                var cfgVO = this.matchList[i];
                if (cfgVO.matchId == matchId)
                    return cfgVO;
            }
            return null;
        };
        MatchProxy.prototype.getSvrMatchConfig = function (matchId) {
            var len = this.configList.length;
            for (var i = 0; i < len; ++i) {
                var cfgVO = this.configList[i];
                if (cfgVO.matchId == matchId)
                    return cfgVO;
            }
            return null;
        };
        /** 同步这场比赛已经打了多久了(秒)，同时计算下次升盲的时间
         * 注意：传入的参数为秒，而记录的时间都是毫秒
        * 回调参数为 还有多久升盲，下级升盲对象，当前盲注序号         */
        MatchProxy.prototype.setBetUpInterval = function (callbackFunc, thisObj, timeout) {
            var matchVO = match.getProxy().currentMatchVO;
            matchVO.startTime = match.getSvrTime() - timeout * 1000; //同步开始时间
            var blinds = matchVO.blinds;
            var times = 0;
            for (var i = 0, len = blinds.length; i < len; i++) {
                var vo = blinds[i];
                times += vo.time;
                if (times >= timeout) {
                    vo = blinds[i + 1];
                    if (vo) {
                        matchVO.blindsUpTime = matchVO.startTime + times * 1000; //同步最近升盲时间
                        callbackFunc.call(thisObj, times - timeout, vo, i);
                    }
                    break;
                }
            }
        };
        MatchProxy.prototype.blindsUp = function (matchVO) {
            if (matchVO == null || matchVO.blinds == null)
                return;
            if (matchVO.blindsIndex < matchVO.blinds.length - 1) {
                ++matchVO.blindsIndex;
                matchVO.blindsUpTime += matchVO.blinds[matchVO.blindsIndex].time * 1000;
            }
        };
        MatchProxy.prototype.reConnectMatch = function (matchVO) {
            match.getProxy().currentMatchVO = matchVO;
            var roomVO = new appvos.RoomVO();
            roomVO.svrOfsId = matchVO.gameAppId;
            roomVO.svrMode = 303 /* MATCH */;
            roomVO.smallBlinds = matchVO.blinds[0].smallBlinds;
            roomVO.bigBlinds = matchVO.blinds[0].bigBlinds;
            roomVO.type = matchVO.type;
            user.getProxy().exitToMoudle = AppReg.MTT;
            user.getProxy().willJoinMatchRoom = true;
            user.getProxy().joinRoom(roomVO);
            playcards.getProxy().openMoudle(1 /* WAITING */);
        };
        /** 返回我的比赛  */
        MatchProxy.prototype.getMyMttList = function () {
            var list = [];
            var i = this.mttList.length;
            while (--i > -1) {
                if (this.mttList[i].isSigned) {
                    list.push(this.mttList[i]);
                }
            }
            return list;
        };
        /** 显示玩家可以报名或最近的比赛 */
        MatchProxy.prototype.getAllMttList = function () {
            var nowTime = getSvrTime();
            var list = [];
            var mttList = this.getNearMatchList();
            var i = mttList.length;
            while (--i > -1) {
                var matchVO = mttList[i];
                //比赛已经开始的，不再显示
                if (matchVO.startTime < nowTime) {
                    continue;
                }
                else if (matchVO.isSigned && nowTime < matchVO.startTime) {
                    var nextMatchVO = this.getNextMatch(matchVO);
                    if (nextMatchVO != null)
                        list.push(nextMatchVO);
                }
                else if (!matchVO.isSigned && nowTime < matchVO.signupEndTime) {
                    list.push(matchVO);
                }
            }
            list.sort(this.sortMatchByTime);
            return list;
        };
        /** 返回某类型中，离当前时间最近的比赛(此逻辑略复杂)         */
        MatchProxy.prototype.getNearMatchList = function () {
            var nowTime = match.getSvrTime();
            var list = [];
            var allList = this.mttList.concat();
            while (allList.length > 0) {
                var i = allList.length - 1;
                var nearMatchVO = allList.pop();
                while (--i > -1) {
                    var matchVO = allList[i];
                    if (matchVO.orderId == nearMatchVO.orderId) {
                        allList.splice(i, 1); //如果subType一致则从候选列表中删除
                        if (matchVO.startTime < nearMatchVO.startTime &&
                            matchVO.startTime - (5 * 60 * 1000) > nowTime) {
                            nearMatchVO = matchVO;
                        }
                    }
                }
                list.push(nearMatchVO);
            }
            return list;
        };
        /** 根据显示标签分类查询所有比赛 */
        MatchProxy.prototype.getSubList = function (category) {
            var mttList = this.getAllMttList();
            var list = [];
            var len = mttList.length;
            var i = 0;
            for (; i < len; i++) {
                var mttVO = mttList[i];
                if (mttVO.category & category) {
                    list.push(mttVO);
                }
            }
            return list;
        };
        MatchProxy.prototype.sortMatchByTime = function (aMtt, bMtt) {
            if (aMtt && bMtt) {
                if (aMtt.startTime < bMtt.startTime) {
                    return -1;
                }
                else if (aMtt.startTime > bMtt.startTime) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            return 0;
        };
        /** 获取比赛中玩家的的平均筹码
         * 如果比赛排名信息空，则显示默认筹码
         */
        MatchProxy.prototype.getAverageCoin = function (matchVO) {
            if (matchVO.rankList == null || matchVO.numPlayers == 0)
                return matchVO.bet;
            var len = matchVO.rankList.length;
            var total = 0;
            for (var i = 0; i < len; ++i) {
                total += matchVO.rankList[i].bet;
            }
            return Math.floor(total / matchVO.numPlayers);
        };
        MatchProxy.prototype.setMttRemind = function (matchVO) {
            if (matchVO.remindStepVO != null)
                return;
            var mConst = app.constant.AppMediatorConst;
            var timerStepParam = app.SystemTimer.setTimesup(mConst.UPDATE_MTT_TIMESUP, matchVO.startTime - match.svrTimeOffset, mConst.UPDATE_MTT_TIME_STEP);
            timerStepParam.data = matchVO;
            matchVO.remindStepVO = timerStepParam;
            matchVO.wasRemind = false;
        };
        MatchProxy.prototype.cancelMttRemind = function (matchVO) {
            app.SystemTimer.removeListener(matchVO.remindStepVO);
            matchVO.remindStepVO = null;
        };
        MatchProxy.prototype.setNotifSDK = function (matchVO) {
            var title = gameabc.getMessage("PUSH_MTT_TITLE");
            var con = gameabc.getMessage("PUSH_MTT_CON", matchVO.name);
            var notiftime = matchVO.startTime - match.getSvrTime() - 5 * 60000;
            if (notiftime < 0)
                return;
            var lnNotification = {
                title: title,
                time: notiftime,
                content: con,
                userData: {
                    identityKey: "mtt" //消息的key 相同key的消息会被覆盖以最后一次的为准
                }
            };
            var sec = Math.floor(notiftime / 1000);
            console.log(sec + "秒后推送消息：" + con);
            var jsonNoti = JSON.stringify(lnNotification);
            utils.NativeUtils.nativeCall(12 /* SLN */, sec);
        };
        MatchProxy.prototype.isShowSignButton = function (matchVO) {
            if (matchVO.isSigned)
                return false;
            return match.getSvrTime() > matchVO.signupStartTime && match.getSvrTime() < matchVO.signupEndTime;
        };
        MatchProxy.prototype.isShowCancelButton = function (matchVO) {
            if (!matchVO.isSigned)
                return false;
            var time = matchVO.startTime - match.getSvrTime();
            return time > 120000;
        };
        /** 同类的比赛，在固定时间内是否还有下一场 */
        MatchProxy.prototype.getNextMatch = function (currMatchVO, time) {
            if (time === void 0) { time = 0; }
            var similars = [];
            var i = this.mttList.length;
            var matchVO = null, nextVO = null;
            while (--i > -1) {
                matchVO = this.mttList[i];
                if (matchVO == currMatchVO)
                    continue;
                if (matchVO.orderId != currMatchVO.orderId)
                    continue;
                var delay = matchVO.startTime - match.getSvrTime();
                if (time == 0 || delay < time) {
                    if (nextVO == null || matchVO.startTime < nextVO.startTime) {
                        nextVO = matchVO;
                    }
                }
            }
            return nextVO;
        };
        MatchProxy.prototype.signMatch = function (matchId) {
            var matchVO = this.getMatch(matchId);
            if (matchVO.type == 5 /* MTT */ && matchVO.numPlayers >= matchVO.maxPlayers) {
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
                var needSilver = matchVO.entryFee + matchVO.tax;
                if (user.getProxy().svrGameData && user.getProxy().svrGameData.silver < needSilver) {
                    user.getProxy().openMoney();
                    return;
                }
            }
            //重复报名限制
            if (matchVO.isSignuping) {
                tip.popSysCenterTip("正在报名中，请勿重复点击");
                return;
            }
            else {
                matchVO.isSignuping = true;
            }
            var matchInfo = this.getSvrMatchInfo(matchId);
            if (matchInfo != null) {
                matchVO.subId = matchInfo.subId;
            }
            match.getProxy().joinMatch(matchVO);
            this.joinMatchProcess(matchVO.svrConfigInfo.matchAppId, true);
        };
        MatchProxy.prototype.cancelMatch = function (matchId) {
            __SEND_NOTIFICATION(app.NetAction.REQCANCELSIGNUP);
        };
        MatchProxy.prototype.joinMatchProcess = function (matchProcessAppId, autoSignup) {
            if (autoSignup === void 0) { autoSignup = false; }
            if (this.matchProcessList.indexOf(matchProcessAppId) == -1) {
                this.autoSignupAfterJoinMatch = autoSignup;
                __SEND_NOTIFICATION(app.NetAction.REQJOINMATCH, matchProcessAppId);
            }
            else {
                __SEND_NOTIFICATION(app.NetAction.MTT_REQSIGNUP);
            }
        };
        MatchProxy.prototype.leaveMatchProcess = function (matchProcessAppId) {
            if (!this.hasMatchAboutProcess(matchProcessAppId)) {
                this.sendNotification(app.NetAction.REQPLAYERLEAVE);
            }
        };
        MatchProxy.prototype.hasMatchAboutProcess = function (matchProcessAppId) {
            var len = this.sngList.length;
            for (var i = 0; i < len; ++i) {
                var sngVO = this.sngList[i];
                if (sngVO.isSigned &&
                    sngVO.svrConfigInfo.matchAppId == matchProcessAppId) {
                    return true;
                }
            }
            len = this.mttList.length;
            for (var i = 0; i < len; ++i) {
                var mttVO = this.mttList[i];
                if (mttVO.isSigned &&
                    mttVO.svrConfigInfo.matchAppId == matchProcessAppId) {
                    return true;
                }
            }
            return false;
        };
        MatchProxy.prototype.getRedpackStatusAlert = function (status) {
            if (status == 0) {
                var infoStr = "恭喜兑换成功，可前往微信查看红包";
                var btnImg = "iw_wozhidaole_png";
            }
            else if (status == 2) {
                var infoStr = "首次兑换红包请先绑定微信号，并关注微信公众号游戏茶苑（gameteacom）";
                var btnImg = "iw_xiaciduihuan_png";
            }
            tip.Alert.show(infoStr, "", tip.CONFIRM, this.bindAlertCallback, null, this, true, null, "iw_qianwangweixin_png", btnImg);
        };
        MatchProxy.prototype.bindAlertCallback = function (type) {
            if (type === void 0) { type = 0; }
            if (type == tip.YES) {
                console.log("前往微信SDk");
                platform.toWeChat();
            }
            else if (type == tip.NO) {
            }
        };
        /**
         *  注销清空数据
         */
        MatchProxy.prototype.clearAllData = function () {
            match.svrTimeOffset = 0;
            this.configList = null;
            this.matchList = null;
            this.mttList = [];
            this.currentMatchVO = null;
            this.matchProcessList = [];
            this.sngList = [
                this.createMatchVO(1000, 100, 4 /* SNG */, [], []),
                this.createMatchVO(5000, 500, 4 /* SNG */, [], []),
                this.createMatchVO(10000, 1000, 4 /* SNG */, [], [])
            ];
        };
        return MatchProxy;
    }(app.mvc.AbsractProxy));
    MatchProxy.NAME = "match_proxy";
    match.MatchProxy = MatchProxy;
    __reflect(MatchProxy.prototype, "match.MatchProxy");
})(match || (match = {}));
//# sourceMappingURL=MatchProxy.js.map