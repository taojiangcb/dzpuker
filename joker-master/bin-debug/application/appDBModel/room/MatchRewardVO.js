var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var MatchRewardVO = (function () {
        function MatchRewardVO() {
            /** 级别、序号 */
            this.rank = 0;
            /** 奖金 */
            this.coin = 0;
            /** 大师分 */
            this.score = 0;
            /** 道具ID */
            this.propId = 0;
            /** 道具个数 */
            this.propNum = 0;
        }
        return MatchRewardVO;
    }());
    appvos.MatchRewardVO = MatchRewardVO;
    __reflect(MatchRewardVO.prototype, "appvos.MatchRewardVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=MatchRewardVO.js.map