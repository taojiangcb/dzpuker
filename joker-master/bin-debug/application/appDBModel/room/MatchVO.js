var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var MatchVO = (function () {
        function MatchVO() {
            /** 比赛ID */
            this.matchId = -1;
            /** 报名成功后，会获得subId */
            this.subId = 0;
            /** 转轮奖励 */
            this.wheelBonus = 0;
            /** 复用房间类型的枚举变量 */
            this.type = 0;
            /** 用户排序、折叠 */
            this.orderId = 0;
            this.myRank = 0;
            /** 比赛在线人数 */
            this.numPlayers = 0; //比赛中的玩家人数
            this.numSignups = 0; //报名人数
            this.maxPlayers = 7;
            this.rankList = [];
            this.bet = 0; //初始筹码
            this.blindsIndex = 0; //盲注级别
            this.blindsUpTime = 0; //下次升盲时间
            this.isSignuping = false; //正在报名
            this.wasRemind = false; //是否显示过开赛提醒
        }
        return MatchVO;
    }());
    appvos.MatchVO = MatchVO;
    __reflect(MatchVO.prototype, "appvos.MatchVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=MatchVO.js.map