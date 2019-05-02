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
    var MttStateMoudle = (function (_super) {
        __extends(MttStateMoudle, _super);
        function MttStateMoudle() {
            var _this = _super.call(this) || this;
            _this.timerStepId = -1;
            _this.skinName = "MttStateSkin";
            _this.bindTabButton(_this.tab1Button, _this.tab5Button, _this.tab2Button, _this.tab3Button, _this.tab4Button);
            _this.bindButton(_this.signButton);
            _this.bindButton(_this.cancelButton);
            _this.noMatchLabel.visible = false;
            return _this;
        }
        MttStateMoudle.prototype.createComplete = function () {
            _super.prototype.createComplete.call(this, null);
            this.registerMediator(match.MttStateMediator);
            this.bindButton(this.closeButton);
            if (match.getProxy().currentMatchVO != null) {
                this.signButton.visible = false;
                this.cancelButton.visible = false;
                __SEND_NOTIFICATION(app.NetAction.REQ_MATCH_RANK, this.viewMatchVO);
            }
            this.line1Label.text = this.viewMatchVO.entryFee + "+" + this.viewMatchVO.tax;
            if (this.viewMatchVO.startTime)
                this.line2Label.text = DateUtils.dateFormat(new Date(this.viewMatchVO.startTime), "MM月dd日 hh:mm ");
            else
                this.line2Label.text = "";
            this.line3Label.text = this.viewMatchVO.minPlayers + "-" + this.viewMatchVO.maxPlayers + "人";
            this.line4Label.text = this.viewMatchVO.bet + "";
            // var isMatchStarted: boolean = (match.getSvrTime() >= this.viewMatchVO.startTime) && playcards.getTableVO() != null;
            var isMatchStarted = (match.getSvrTime() >= this.viewMatchVO.startTime) && playcards.getProxy().isPlayCard != null;
            // var isMatchStarted: boolean = playcards.getTableVO() != null;
            if (isMatchStarted) {
                this.timerStep(); //比赛用时
                this.timerStepId = egret.setInterval(this.timerStep, this, 150);
                this.updatePlayersInfoInMatch(); //人数、筹码信息刷新
                this.updateBlindsInfoInMatch(); //盲注信息刷新
            }
            else {
                this.updatePlayersInfoWithoutMatch(); //人数、筹码信息刷新
                this.updateBlindsInfoWithoutMatch(); //盲注信息刷新
            }
            this.selectTabButton(parseInt(this.uiOpenData) || 0);
            console.log("[info] matchId=" + this.viewMatchVO.matchId + " subId=" + this.viewMatchVO.subId);
        };
        Object.defineProperty(MttStateMoudle.prototype, "viewMatchVO", {
            get: function () {
                if (this.uiOpenData instanceof appvos.MttMatchVO) {
                    return this.uiOpenData;
                }
                else if (match.getProxy().currentMatchVO != null) {
                    return match.getProxy().currentMatchVO;
                }
                else {
                    return match.getProxy().mttList[0];
                }
            },
            enumerable: true,
            configurable: true
        });
        MttStateMoudle.prototype.timerStep = function () {
            var matchTime = match.getSvrTime() - this.viewMatchVO.startTime;
            this.right3Label.text = DateUtils.dateFormat(matchTime, "mm:ss");
            var matchVO = this.viewMatchVO;
            if (matchVO.blinds && matchVO.blinds.length - 1 > matchVO.blindsIndex) {
                if (matchVO.blindsUpTime < match.getSvrTime()) {
                    match.getProxy().blindsUp(matchVO);
                    this.updateBlindsInfoInMatch();
                }
                matchTime = matchVO.blindsUpTime - match.getSvrTime();
                this.timeLabel.text = DateUtils.dateFormat(matchTime, "mm:ss");
            }
        };
        MttStateMoudle.prototype.updatePlayersInfoInMatch = function () {
            this.left1Label.text = this.viewMatchVO.myRank + '/' + this.viewMatchVO.numPlayers; //剩余人数
            this.left2Label.text = String(this.viewMatchVO.rewards.length); //钱圈人数
            this.left3Label.text = String(this.viewMatchVO.numSignups); //参赛人数(报名人数)
            var seatVO = playcards.getProxy().mySeatvo;
            var bet = seatVO == null ? this.viewMatchVO.bet : seatVO.nowBet + seatVO.totalBet;
            this.right1Label.text = String(bet); //自己的筹码
            this.right2Label.text = String(match.getProxy().getAverageCoin(this.viewMatchVO)); //平均筹码
            // this.right3Label.text; //在timestep中更新
        };
        MttStateMoudle.prototype.updatePlayersInfoWithoutMatch = function () {
            this.left1Label.text = "祝君好运"; //排名
            this.left2Label.text = String(this.viewMatchVO.rewards.length); //钱圈人数
            this.left3Label.text = " > " + this.viewMatchVO.minPlayers; //参赛人数(报名人数)
            this.right1Label.text = String(this.viewMatchVO.bet); //自己的筹码
            this.right2Label.text = String(this.viewMatchVO.bet); //平均筹码
            this.right3Label.text = "00:00";
        };
        MttStateMoudle.prototype.updateBlindsInfoInMatch = function () {
            var blinds = this.viewMatchVO.blinds;
            var i = this.viewMatchVO.blindsIndex;
            this.top1Label.text = "级别" + (i + 1) + "/" + blinds.length; //盲注级别
            if (blinds[i] != null) {
                this.top2Label.text = "前注 " + blinds[i].antiBlinds;
                this.top3Label.text = "盲注 " + blinds[i].smallBlinds + '/' + blinds[i].bigBlinds;
            }
            if (blinds[i + 1] != null) {
                this.bottom1Label.text = "前注 " + blinds[i + 1].antiBlinds;
                this.bottom2Label.text = "盲注 " + blinds[i + 1].smallBlinds + '/' + blinds[i + 1].bigBlinds;
            }
        };
        MttStateMoudle.prototype.updateBlindsInfoWithoutMatch = function () {
            var blinds = this.viewMatchVO.blinds;
            this.top1Label.text = "级别1/" + blinds.length; //盲注级别
            this.top2Label.text = "前注 " + blinds[0].antiBlinds;
            this.top3Label.text = "盲注 " + blinds[0].smallBlinds + '/' + blinds[0].bigBlinds;
            this.bottom1Label.text = "前注 " + blinds[1].antiBlinds;
            this.bottom2Label.text = "盲注 " + blinds[1].smallBlinds + '/' + blinds[1].bigBlinds;
            this.timeLabel.text = DateUtils.DayTimeStampFormat2(blinds[0].time);
        };
        MttStateMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            console.log("svrTime=" + DateUtils.dateFormat(match.getSvrTime(), "hh:mm"));
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    return;
                case this.tab5Button:
                    this.resetDisplay();
                    //                    if (playcards.getTableVO()==null) {
                    //                        this.noMatchLabel.visible = true;
                    //                    } else {
                    //                        this.stateGroup.visible = true;
                    //                    }
                    this.stateGroup.visible = true;
                    return;
                case this.tab1Button:
                    this.resetDisplay();
                    this.infoGroup.visible = true;
                    this.signButton.visible = match.getProxy().isShowSignButton(this.viewMatchVO);
                    this.cancelButton.visible = match.getProxy().isShowCancelButton(this.viewMatchVO);
                    return;
                case this.tab4Button:
                    this.resetDisplay();
                    this.infoList.itemRenderer = sng.SngRankRenderer;
                    this.infoList.dataProvider = new eui.ArrayCollection(this.viewMatchVO.rewards);
                    this.infoScroller.visible = true;
                    this.rewardGroup.visible = true;
                    return;
                case this.tab3Button:
                    this.resetDisplay();
                    this.infoList.dataProvider = new eui.ArrayCollection(this.viewMatchVO.blinds);
                    this.infoList.itemRenderer = sng.SngBlindsRenderer;
                    this.infoScroller.visible = true;
                    this.blindsGroup.visible = true;
                    return;
                case this.tab2Button:
                    this.resetDisplay();
                    if (playcards.getProxy().isPlayCard) {
                        var players = match.getProxy().currentMatchVO.rankList;
                        players.sort(this.playersSort);
                        this.infoScroller.visible = true;
                        this.infoList.dataProvider = new eui.ArrayCollection(players);
                        this.infoList.itemRenderer = sng.SngPlayerRenderer;
                    }
                    else {
                        this.noMatchLabel.visible = true;
                    }
                    this.rankGroup.visible = true;
                    return;
                case this.signButton:
                    mc2sdk.event(50089 /* MTT_SIGN */);
                    match.getProxy().signMatch(this.viewMatchVO.matchId);
                    this.close();
                    return;
                case this.cancelButton:
                    mc2sdk.event(50090 /* MTT_CANCEL */);
                    __SEND_NOTIFICATION(app.NetAction.REQCANCELSIGNUP, this.viewMatchVO);
                    this.close();
                    return;
            }
        };
        MttStateMoudle.prototype.playersSort = function (a, b) {
            return a.rank > b.rank ? 1 : -1;
        };
        MttStateMoudle.prototype.resetDisplay = function () {
            this.stateGroup.visible = false;
            this.noMatchLabel.visible = false;
            this.infoGroup.visible = false;
            this.infoScroller.visible = false;
            this.blindsGroup.visible = false;
            this.rankGroup.visible = false;
            this.rewardGroup.visible = false;
            this.signButton.visible = false;
            this.cancelButton.visible = false;
        };
        MttStateMoudle.prototype.dispose = function () {
            if (this.timerStepId != -1) {
                egret.clearInterval(this.timerStepId);
            }
        };
        return MttStateMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttStateMoudle = MttStateMoudle;
    __reflect(MttStateMoudle.prototype, "match.MttStateMoudle");
})(match || (match = {}));
//# sourceMappingURL=MttStateMoudle.js.map